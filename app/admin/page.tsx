'use client';

import React, { useEffect, useState } from 'react';
import type { BlogPost } from '../../types';

export default function AdminPage() {
  const [key, setKey] = useState('');
  const [authed, setAuthed] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [topic, setTopic] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  async function api(method: 'GET' | 'POST', body?: unknown) {
    const res = await fetch('/api/admin', {
      method,
      headers: { 'x-admin-key': key, 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error || `Erro ${res.status}`);
    return data;
  }

  async function refresh() {
    const data = await api('GET');
    setPosts(data.posts || []);
  }

  async function login(e?: React.FormEvent) {
    e?.preventDefault();
    setError('');
    setLoading(true);
    try {
      await refresh();
      setAuthed(true);
      try { sessionStorage.setItem('si_admin_key', key); } catch {}
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao entrar.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('si_admin_key');
      if (saved) setKey(saved);
    } catch {}
  }, []);

  async function act(action: string, slug?: string) {
    setError('');
    setLoading(true);
    try {
      await api('POST', { action, slug });
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha na ação.');
    } finally {
      setLoading(false);
    }
  }

  async function generate() {
    setError('');
    setGenerating(true);
    try {
      await api('POST', { action: 'generate', topic: topic.trim() || undefined });
      setTopic('');
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao gerar.');
    } finally {
      setGenerating(false);
    }
  }

  if (!authed) {
    return (
      <section className="relative py-28 px-5">
        <div className="max-w-md mx-auto surface p-8">
          <div className="section-label">Painel</div>
          <h1 className="font-display font-bold text-2xl text-si-text mb-4">Administração do blog</h1>
          <form onSubmit={login} className="space-y-4">
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Senha do painel"
              className="w-full rounded-lg px-4 py-3 bg-[var(--surface2)] border border-[var(--border)] text-si-text outline-none focus:border-si-cyan"
            />
            <button type="submit" disabled={loading || !key} className="btn-primary w-full justify-center">
              {loading ? 'Entrando…' : 'Entrar'}
            </button>
          </form>
          {error && <p className="mt-4 text-sm" style={{ color: '#ff8088' }}>{error}</p>}
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 px-5">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="section-label">Painel</div>
            <h1 className="font-display font-bold text-2xl text-si-text">Posts gerados</h1>
          </div>
          <button onClick={() => refresh()} className="btn-ghost" disabled={loading}>Atualizar</button>
        </div>

        {/* Gerar novo */}
        <div className="surface p-5 mb-8">
          <h2 className="font-display font-bold text-lg text-si-text mb-3">Gerar novo rascunho</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Tema (opcional — em branco, a IA escolhe)"
              className="flex-1 rounded-lg px-4 py-3 bg-[var(--surface2)] border border-[var(--border)] text-si-text outline-none focus:border-si-cyan"
            />
            <button onClick={generate} disabled={generating} className="btn-primary justify-center">
              {generating ? 'Gerando… (até 1 min)' : 'Gerar rascunho'}
            </button>
          </div>
        </div>

        {error && <p className="mb-4 text-sm" style={{ color: '#ff8088' }}>{error}</p>}

        {posts.length === 0 ? (
          <p className="text-si-muted">Nenhum post gerado ainda. Use o botão acima para criar o primeiro.</p>
        ) : (
          <div className="space-y-5">
            {posts.map((p) => (
              <div key={p.slug} className="surface p-5">
                <div className="flex flex-col sm:flex-row gap-4">
                  {p.imageUrl && (
                    <img src={p.imageUrl} alt="" className="w-full sm:w-40 h-28 object-cover rounded-lg border border-[var(--border)]" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-xs font-mono px-2 py-0.5 rounded-full"
                        style={
                          p.status === 'published'
                            ? { background: 'rgba(43,255,154,.15)', color: '#2bff9a' }
                            : { background: 'rgba(255,210,80,.15)', color: '#ffd250' }
                        }
                      >
                        {p.status === 'published' ? '🟢 publicado' : '🟡 rascunho'}
                      </span>
                      <span className="text-xs text-si-muted font-mono">{p.category} · {p.date}</span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-si-text leading-snug">{p.title}</h3>
                    <p className="text-sm text-si-muted mt-1">{p.excerpt}</p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {p.status === 'published' ? (
                        <button onClick={() => act('unpublish', p.slug)} disabled={loading} className="btn-ghost text-sm">Despublicar</button>
                      ) : (
                        <button onClick={() => act('publish', p.slug)} disabled={loading} className="btn-primary text-sm">Publicar</button>
                      )}
                      <button onClick={() => setExpanded(expanded === p.slug ? null : p.slug)} className="btn-ghost text-sm">
                        {expanded === p.slug ? 'Ocultar' : 'Ver conteúdo'}
                      </button>
                      <button
                        onClick={() => { if (confirm('Excluir este post permanentemente?')) act('delete', p.slug); }}
                        disabled={loading}
                        className="btn-ghost text-sm"
                        style={{ color: '#ff8088' }}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>

                {expanded === p.slug && (
                  <div
                    className="prose prose-invert max-w-none mt-5 pt-5 text-si-muted"
                    style={{ borderTop: '1px solid var(--border)' }}
                    dangerouslySetInnerHTML={{ __html: p.content }}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
