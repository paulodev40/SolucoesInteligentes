import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS, PRODUCTS } from '../constants';
import BlogPostCard from '../components/BlogPostCard';
import NewsCard from '../components/NewsCard';
import BugHuntGame from '../components/games/BugHuntGame';
import { AnimCounter, AuroraBackground } from '../components/effects';
import { fetchVisitors } from '../services/analyticsApi';
import { fetchAINews, type NewsArticle } from '../services/newsApi';

const NEWS_CACHE_KEY = 'si_home_news_v1';
const NEWS_CACHE_TTL = 10 * 60 * 1000; // 10 min

const HomePage: React.FC = () => {
  const [visitors, setVisitors] = useState<number | null>(null);
  const [isLoadingVisitors, setIsLoadingVisitors] = useState<boolean>(true);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [newsLoading, setNewsLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const total = await fetchVisitors();
      if (mounted) {
        setVisitors(total);
        setIsLoadingVisitors(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      // tenta cache
      try {
        const raw = sessionStorage.getItem(NEWS_CACHE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as { ts: number; data: NewsArticle[] };
          if (Date.now() - parsed.ts < NEWS_CACHE_TTL && parsed.data.length > 0) {
            if (mounted) {
              setNews(parsed.data);
              setNewsLoading(false);
              return;
            }
          }
        }
      } catch { /* ignore */ }

      const data = await fetchAINews(3);
      if (!mounted) return;
      setNews(data);
      setNewsLoading(false);
      try {
        sessionStorage.setItem(NEWS_CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
      } catch { /* ignore */ }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div>
      {/* ─────── HERO ─────── */}
      <section
        id="hero"
        className="relative overflow-hidden flex flex-col items-center justify-center text-center px-5 py-32 sm:py-40 min-h-[88vh]"
      >
        <AuroraBackground />
        <div className="hero-glow hero-glow-cyan" />
        <div className="hero-glow hero-glow-violet" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <span className="hero-badge">
            <span className="dot" /> IA · AUTOMAÇÃO · INOVAÇÃO
          </span>

          <div className="mb-8">
            <img
              src="/assets/images/logotipo.png"
              alt="Soluções Inteligentes 83"
              className="mx-auto h-24 sm:h-32 md:h-40 w-auto"
              style={{ filter: 'drop-shadow(0 0 30px rgba(0,212,255,0.35))' }}
            />
          </div>

          <h1 className="hero-title">
            <span className="block">Inteligência Artificial,</span>
            <span className="line2 glitch" data-text="Soluções Reais.">Soluções Reais.</span>
          </h1>

          <p
            className="mt-6 max-w-2xl text-lg sm:text-xl text-si-muted leading-relaxed"
            style={{ animation: 'fade-up 0.8s 0.3s ease both' }}
          >
            Descomplicando o futuro com IA. Nossas ferramentas automatizam tarefas, impulsionam suas vendas
            e otimizam seu tempo para que você possa focar no que realmente importa.
          </p>

          <div
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
            style={{ animation: 'fade-up 0.8s 0.45s ease both' }}
          >
            <Link to="/produtos" className="btn-primary">Ver Produtos →</Link>
            <Link to="/blog" className="btn-ghost">Últimas Notícias</Link>
          </div>

          <div className="mt-8 visitors-pill">
            <span className="dot-pulse dot-pulse--green" />
            Visitantes:{' '}
            <strong className="text-si-text">
              {isLoadingVisitors
                ? 'carregando...'
                : visitors !== null
                  ? visitors.toLocaleString('pt-BR')
                  : 'indisponível'}
            </strong>
            <span className="text-si-cyan">· Desde Fev 26</span>
          </div>

          <div className="hidden sm:flex scroll-hint mt-16">
            <span>scroll</span>
            <div className="scroll-line" />
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ─────── MINI-JOGO ─────── */}
      <section className="relative py-20 sm:py-24 px-5" style={{ background: 'linear-gradient(180deg, transparent, rgba(0,212,255,0.03) 50%, transparent)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="reveal text-center mx-auto" style={{ maxWidth: 720 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Pausa para diversão</div>
            <h2 className="section-title">🐛 Caça ao Bug</h2>
            <p className="section-desc mx-auto">
              Todo desenvolvedor sabe: o melhor código é o que tem zero bugs. Veja quantos você consegue eliminar em 30 segundos.
            </p>
          </div>
          <BugHuntGame />
        </div>
      </section>

      <div className="section-divider" />

      {/* ─────── ÚLTIMAS NOTÍCIAS ─────── */}
      <section className="relative py-20 sm:py-24 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="reveal">
            <div className="section-label">🌐 Notícias</div>
            <h2 className="section-title">Últimas do mundo da IA</h2>
            <p className="section-desc">
              As principais novidades sobre Inteligência Artificial, atualizadas em tempo real para você ficar sempre por dentro.
            </p>
          </div>

          {newsLoading ? (
            <div className="grid gap-8 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="surface overflow-hidden animate-pulse">
                  <div className="w-full h-48 bg-[var(--surface2)]" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-[var(--surface2)] rounded w-3/4" />
                    <div className="h-4 bg-[var(--surface2)] rounded w-1/2" />
                    <div className="h-20 bg-[var(--surface2)] rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : news.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-3 reveal">
              {news.map((article, index) => (
                <NewsCard key={`${article.url}-${index}`} article={article} />
              ))}
            </div>
          ) : (
            <div className="surface text-center py-10">
              <p className="text-si-muted">Não foi possível carregar as notícias no momento.</p>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link to="/blog" className="btn-ghost">Ver mais notícias →</Link>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ─────── SUGESTÕES ─────── */}
      <section className="relative py-20 sm:py-24 px-5" style={{ background: 'var(--bg2)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="surface p-8 sm:p-12 relative overflow-hidden reveal" style={{
            background: 'linear-gradient(135deg, var(--cyan-dim), var(--violet-dim))',
            border: '1px solid var(--border-strong)',
          }}>
            <div
              aria-hidden
              className="absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl opacity-50"
              style={{ background: 'radial-gradient(circle, var(--cyan), transparent 70%)' }}
            />
            <div
              aria-hidden
              className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-50"
              style={{ background: 'radial-gradient(circle, var(--violet), transparent 70%)' }}
            />
            <div className="relative z-10 text-center">
              <div
                className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full"
                style={{ background: 'linear-gradient(135deg, var(--cyan), var(--violet))', boxShadow: '0 0 32px var(--cyan-glow)' }}
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-si-text mb-4">
                Tem uma Ideia? Compartilhe Conosco!
              </h3>
              <p className="text-si-text/85 text-lg max-w-2xl mx-auto mb-8">
                Queremos ouvir <span className="font-bold text-si-cyan">você</span>!
                Qual problema você gostaria de resolver com Inteligência Artificial?
                Suas sugestões são fundamentais para criarmos as próximas soluções inteligentes.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 mb-8 max-w-3xl mx-auto">
                {[
                  { icon: '💡', text: 'Sugira novas ferramentas' },
                  { icon: '🎯', text: 'Proponha novos recursos' },
                  { icon: '🚀', text: 'Ajude a moldar o futuro' },
                ].map((item) => (
                  <div key={item.text} className="surface p-5 text-center">
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <p className="text-sm text-si-muted">{item.text}</p>
                  </div>
                ))}
              </div>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSefilKN4FAEBcBkJNLZOIzUJBqe0SHY7tW2t3ZqTN2dXXWW0g/viewform?usp=publish-editor"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                💬 Envie Sua Sugestão Agora
              </a>
              <p className="mt-6 text-sm text-si-muted italic">
                Todas as ideias são bem-vindas! Juntos, construímos soluções que realmente importam.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ─────── BLOG ─────── */}
      <section id="blog" className="relative py-20 sm:py-24 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="reveal text-center mx-auto" style={{ maxWidth: 720 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Blog</div>
            <h2 className="section-title">Últimas do Nosso Blog</h2>
            <p className="section-desc mx-auto" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              Notícias, tendências e dicas práticas sobre o universo da IA.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 reveal">
            {BLOG_POSTS.slice(0, 2).map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/blog" className="btn-ghost">Ver Todos os Posts →</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
