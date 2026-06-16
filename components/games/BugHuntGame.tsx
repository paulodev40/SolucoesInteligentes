'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

type Bug = { id: number; x: number; y: number; born: number; squashed?: boolean };

const GAME_DURATION = 30; // segundos
const BUG_LIFE = 1400; // ms cada bug visível
const SPAWN_INTERVAL = 700; // ms entre spawns
const SQUASH_DURATION = 420; // ms animação de esmagar
const STORAGE_KEY = 'si_bug_hunt_high_v1';

const BugHuntGame: React.FC = () => {
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [highScore, setHighScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const arenaRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);
  const tickRef = useRef<number | null>(null);
  const spawnRef = useRef<number | null>(null);
  const cleanRef = useRef<number | null>(null);

  // carrega high score
  useEffect(() => {
    const saved = Number(localStorage.getItem(STORAGE_KEY) || 0);
    if (!Number.isNaN(saved)) setHighScore(saved);
  }, []);

  const stopAllTimers = useCallback(() => {
    if (tickRef.current) { window.clearInterval(tickRef.current); tickRef.current = null; }
    if (spawnRef.current) { window.clearInterval(spawnRef.current); spawnRef.current = null; }
    if (cleanRef.current) { window.clearInterval(cleanRef.current); cleanRef.current = null; }
  }, []);

  useEffect(() => () => stopAllTimers(), [stopAllTimers]);

  const finish = useCallback((finalScore: number) => {
    stopAllTimers();
    setRunning(false);
    setFinished(true);
    setBugs([]);
    if (finalScore > highScore) {
      setHighScore(finalScore);
      try { localStorage.setItem(STORAGE_KEY, String(finalScore)); } catch { /* ignore */ }
    }
  }, [highScore, stopAllTimers]);

  const start = useCallback(() => {
    stopAllTimers();
    setScore(0);
    setMisses(0);
    setBugs([]);
    setTimeLeft(GAME_DURATION);
    setFinished(false);
    setRunning(true);

    const startedAt = Date.now();

    tickRef.current = window.setInterval(() => {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000);
      const remaining = GAME_DURATION - elapsed;
      if (remaining <= 0) {
        setTimeLeft(0);
        // usa setScore callback p/ pegar último valor
        setScore((s) => { finish(s); return s; });
      } else {
        setTimeLeft(remaining);
      }
    }, 250);

    spawnRef.current = window.setInterval(() => {
      const arena = arenaRef.current;
      if (!arena) return;
      const rect = arena.getBoundingClientRect();
      const pad = 28;
      const x = Math.random() * (rect.width - pad * 2) + pad;
      const y = Math.random() * (rect.height - pad * 2) + pad;
      const id = ++idRef.current;
      setBugs((prev) => [...prev, { id, x, y, born: Date.now() }]);
    }, SPAWN_INTERVAL);

    cleanRef.current = window.setInterval(() => {
      const now = Date.now();
      setBugs((prev) => {
        const expired = prev.filter((b) => !b.squashed && now - b.born >= BUG_LIFE);
        if (expired.length > 0) {
          setMisses((m) => m + expired.length);
        }
        return prev.filter((b) => b.squashed || now - b.born < BUG_LIFE);
      });
    }, 200);
  }, [finish, stopAllTimers]);

  const hitBug = (id: number) => {
    setBugs((prev) => {
      const target = prev.find((b) => b.id === id);
      if (!target || target.squashed) return prev;
      setScore((s) => s + 1);
      // marca como esmagado para tocar a animação, depois remove
      window.setTimeout(() => {
        setBugs((curr) => curr.filter((b) => b.id !== id));
      }, SQUASH_DURATION);
      return prev.map((b) => (b.id === id ? { ...b, squashed: true } : b));
    });
  };

  return (
    <div className="surface p-6 sm:p-8 reveal">
      {/* HUD */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-5 mb-5">
        <div className="chip chip--cyan font-mono">⏱ {timeLeft}s</div>
        <div className="chip font-mono">🐛 Score: <strong className="text-si-cyan ml-1">{score}</strong></div>
        <div className="chip font-mono">⚠ Fugas: <strong className="text-[var(--pink)] ml-1">{misses}</strong></div>
        <div className="chip font-mono ml-auto">🏆 Recorde: <strong className="text-[var(--green)] ml-1">{highScore}</strong></div>
      </div>

      {/* Arena */}
      <div
        ref={arenaRef}
        className="bug-arena relative w-full overflow-hidden rounded-xl border border-[var(--border-strong)] select-none"
        style={{
          height: 'clamp(280px, 50vw, 420px)',
          background:
            'radial-gradient(ellipse at center, rgba(0,212,255,0.08), transparent 70%), var(--bg)',
          boxShadow: 'inset 0 0 32px rgba(0,212,255,0.08)',
        }}
      >
        {/* grid overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,212,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.18) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* idle / finished overlay */}
        {!running && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20"
            style={{ background: 'rgba(5,8,16,0.55)', backdropFilter: 'blur(6px)' }}>
            {finished ? (
              <>
                <div className="section-label" style={{ justifyContent: 'center' }}>Fim de jogo</div>
                <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-si-text">
                  Você debugou {score} {score === 1 ? 'bug' : 'bugs'}!
                </h3>
                <p className="mt-2 text-si-muted">
                  {misses === 0
                    ? 'Nenhum escapou — engenheiro implacável 🚀'
                    : `${misses} ${misses === 1 ? 'bug escapou' : 'bugs escaparam'}.`}
                </p>
                <div className="mt-2 font-mono text-sm text-si-dim">
                  Recorde local: <span className="text-[var(--green)]">{highScore}</span>
                </div>
                <button onClick={start} className="btn-primary mt-6">Jogar de novo →</button>
              </>
            ) : (
              <>
                <div className="section-label" style={{ justifyContent: 'center' }}>Mini-jogo</div>
                <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-si-text">
                  Caça ao Bug
                </h3>
                <p className="mt-3 max-w-md text-si-muted">
                  Clique nos bugs antes que eles fujam. Você tem <strong className="text-si-cyan">{GAME_DURATION}s</strong>.
                </p>
                <button onClick={start} className="btn-primary mt-6">Começar →</button>
              </>
            )}
          </div>
        )}

        {/* bugs */}
        {bugs.map((b) => (
          <button
            key={b.id}
            type="button"
            aria-label="Eliminar bug"
            disabled={b.squashed}
            onClick={(e) => { e.stopPropagation(); hitBug(b.id); }}
            onTouchStart={(e) => { e.stopPropagation(); hitBug(b.id); }}
            className={`bug-target absolute z-10${b.squashed ? ' squashed' : ''}`}
            style={{ left: b.x, top: b.y, transform: 'translate(-50%, -50%)' }}
          >
            <span className="bug-emoji" aria-hidden>🐛</span>
            {b.squashed && (
              <>
                <span className="bug-splat" aria-hidden>💥</span>
                <span className="bug-pop-text" aria-hidden>+1</span>
              </>
            )}
          </button>
        ))}
      </div>

      <p className="mt-4 text-xs text-si-dim font-mono text-center">
        Dica: bugs ficam visíveis por ~{Math.round(BUG_LIFE / 100) / 10}s antes de fugir.
      </p>
    </div>
  );
};

export default BugHuntGame;
