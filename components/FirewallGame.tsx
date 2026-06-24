'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

type Bug = { id: number; x: number; y: number; type: 'bug' | 'safe' };
type Burst = { id: number; x: number; y: number };
type GameState = 'idle' | 'playing' | 'over';

const GAME_MS = 30000;

const FirewallGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [best, setBest] = useState(0);
  const [misses, setMisses] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerPct, setTimerPct] = useState(100);
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const [isRecord, setIsRecord] = useState(false);

  const endAt = useRef(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const spawn = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bugId = useRef(0);
  const burstId = useRef(0);
  const bugTimers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());
  const stateRef = useRef<GameState>('idle');
  stateRef.current = gameState;

  useEffect(() => {
    try {
      const b = parseInt(localStorage.getItem('fnb_best') || '0', 10);
      if (b) setBest(b);
    } catch {
      /* ignore */
    }
    return () => {
      if (timer.current) clearInterval(timer.current);
      if (spawn.current) clearTimeout(spawn.current);
      bugTimers.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  const endGame = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    if (spawn.current) clearTimeout(spawn.current);
    bugTimers.current.forEach((t) => clearTimeout(t));
    bugTimers.current.clear();
    setBugs([]);
    setScore((s) => {
      setBest((prevBest) => {
        const record = s > prevBest && s > 0;
        setIsRecord(record);
        const newBest = Math.max(prevBest, s);
        try {
          localStorage.setItem('fnb_best', String(newBest));
        } catch {
          /* ignore */
        }
        return newBest;
      });
      return s;
    });
    setGameState('over');
  }, []);

  const tick = useCallback(() => {
    const rem = Math.max(0, endAt.current - performance.now());
    setTimeLeft(Math.ceil(rem / 1000));
    setTimerPct((rem / GAME_MS) * 100);
    if (rem <= 0) endGame();
  }, [endGame]);

  const escapeBug = useCallback((id: number, wasSafe: boolean) => {
    bugTimers.current.delete(id);
    setBugs((prev) => {
      if (!prev.find((b) => b.id === id)) return prev;
      return prev.filter((b) => b.id !== id);
    });
    if (!wasSafe) {
      setCombo(0);
      setMisses((m) => m + 1);
    }
  }, []);

  const spawnBug = useCallback(() => {
    const id = ++bugId.current;
    const isSafe = Math.random() < 0.26;
    const x = 7 + Math.random() * 82;
    const y = 12 + Math.random() * 72;
    const life = isSafe ? 1750 : 1350;
    setBugs((prev) => [...prev, { id, x, y, type: isSafe ? 'safe' : 'bug' }]);
    const t = setTimeout(() => escapeBug(id, isSafe), life);
    bugTimers.current.set(id, t);
  }, [escapeBug]);

  const scheduleSpawn = useCallback(() => {
    if (stateRef.current !== 'playing') return;
    const rem = Math.max(0, endAt.current - performance.now());
    const frac = 1 - rem / GAME_MS;
    const interval = 800 - frac * 440;
    spawn.current = setTimeout(() => {
      spawnBug();
      scheduleSpawn();
    }, interval);
  }, [spawnBug]);

  const start = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    if (spawn.current) clearTimeout(spawn.current);
    bugTimers.current.forEach((t) => clearTimeout(t));
    bugTimers.current.clear();
    endAt.current = performance.now() + GAME_MS;
    setScore(0);
    setCombo(0);
    setBestCombo(0);
    setMisses(0);
    setTimeLeft(30);
    setTimerPct(100);
    setBugs([]);
    setBursts([]);
    setIsRecord(false);
    setGameState('playing');
    stateRef.current = 'playing';
    timer.current = setInterval(tick, 100);
    scheduleSpawn();
  }, [tick, scheduleSpawn]);

  const hitBug = useCallback((id: number) => {
    const t = bugTimers.current.get(id);
    if (t) {
      clearTimeout(t);
      bugTimers.current.delete(id);
    }
    setBugs((prev) => {
      const bug = prev.find((b) => b.id === id);
      if (!bug) return prev;
      const rest = prev.filter((b) => b.id !== id);
      if (bug.type === 'safe') {
        setCombo(0);
        setMisses((m) => m + 1);
        setScore((s) => Math.max(0, s - 5));
      } else {
        setCombo((c) => {
          const next = c + 1;
          setBestCombo((bc) => Math.max(bc, next));
          setScore((s) => s + 10 + c * 2);
          return next;
        });
        const bid = ++burstId.current;
        setBursts((b) => [...b, { id: bid, x: bug.x, y: bug.y }]);
        setTimeout(() => setBursts((b) => b.filter((x) => x.id !== bid)), 650);
      }
      return rest;
    });
  }, []);

  const isIdle = gameState === 'idle';
  const isOver = gameState === 'over';
  const verdictLabel =
    score >= 200 ? 'Hacker lendário' : score >= 100 ? 'Defensor da rede' : 'Tempo esgotado';

  const hud = (label: string, value: React.ReactNode, color?: string, minW = 70) => (
    <div className="flex flex-col gap-[2px]" style={{ minWidth: minW }}>
      <span className="font-mono" style={{ fontSize: 10, letterSpacing: '1.5px', color: '#7c87a8' }}>
        {label}
      </span>
      <span className="font-display font-bold text-2xl" style={color ? { color } : undefined}>
        {value}
      </span>
    </div>
  );

  return (
    <div
      className="overflow-hidden glass"
      style={{
        borderRadius: 26,
        background: 'rgba(12,16,30,.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(140,170,255,.16)',
        boxShadow: '0 30px 80px -30px rgba(0,0,0,.8), inset 0 1px 0 rgba(255,255,255,.07)',
      }}
    >
      {/* HUD */}
      <div
        className="flex flex-wrap gap-[14px] items-center px-[22px] py-4"
        style={{ borderBottom: '1px solid rgba(140,170,255,.12)', background: 'rgba(255,255,255,.02)' }}
      >
        {hud('TEMPO', `${timeLeft}s`, '#22e0ff')}
        {hud('SCORE', score)}
        {hud('COMBO', `x${combo + 1}`, '#ff5db1')}
        {hud('FUGAS', misses, '#ffb14d')}
        <div className="flex-1" style={{ minWidth: 120 }} />
        {hud('🏆 RECORDE', best, '#2bff9a', 0)}
      </div>

      {/* Timer bar */}
      <div style={{ height: 4, background: 'rgba(255,255,255,.05)' }}>
        <div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg,#22e0ff,#8b5cff)',
            transition: 'width .1s linear',
            boxShadow: '0 0 12px rgba(34,224,255,.7)',
            width: `${timerPct}%`,
          }}
        />
      </div>

      {/* Play area */}
      <div
        className="relative overflow-hidden"
        style={{
          height: 440,
          background:
            'radial-gradient(700px 400px at 50% 40%,rgba(34,224,255,.06),transparent 70%),linear-gradient(180deg,rgba(8,11,22,.4),rgba(8,11,22,.7)),repeating-linear-gradient(0deg,transparent 0 38px,rgba(140,170,255,.04) 38px 39px),repeating-linear-gradient(90deg,transparent 0 38px,rgba(140,170,255,.04) 38px 39px)',
        }}
      >
        <div
          className="absolute left-0 right-0 top-0 pointer-events-none"
          style={{
            height: 60,
            background: 'linear-gradient(180deg,rgba(34,224,255,.1),transparent)',
            animation: 'scanlineMove 5s linear infinite',
          }}
        />

        {bugs.map((b) => {
          const safe = b.type === 'safe';
          return (
            <button
              key={b.id}
              onClick={() => hitBug(b.id)}
              aria-label="alvo"
              style={{
                position: 'absolute',
                width: 58,
                height: 58,
                border: 'none',
                cursor: 'pointer',
                display: 'grid',
                placeItems: 'center',
                fontSize: 28,
                borderRadius: '50%',
                transform: 'translate(-50%,-50%)',
                animation: 'bugIn .25s ease-out, bugFloat 2s ease-in-out infinite',
                left: `${b.x}%`,
                top: `${b.y}%`,
                background: safe
                  ? 'radial-gradient(circle at 35% 30%,rgba(43,255,154,.95),rgba(20,160,90,.85))'
                  : 'radial-gradient(circle at 35% 30%,rgba(255,120,120,.95),rgba(210,40,90,.9))',
                boxShadow: safe
                  ? '0 0 22px rgba(43,255,154,.7),inset 0 -4px 10px rgba(0,0,0,.25)'
                  : '0 0 22px rgba(255,80,120,.75),inset 0 -4px 10px rgba(0,0,0,.25)',
              }}
            >
              {safe ? '◆' : '🐛'}
            </button>
          );
        })}

        {bursts.map((bu) => (
          <div
            key={bu.id}
            className="pointer-events-none"
            style={{
              position: 'absolute',
              left: `${bu.x}%`,
              top: `${bu.y}%`,
              width: 70,
              height: 70,
              borderRadius: '50%',
              border: '3px solid rgba(34,224,255,.9)',
              animation: 'pulseRing .6s ease-out forwards',
              boxShadow: '0 0 24px rgba(34,224,255,.6)',
            }}
          />
        ))}

        {isIdle && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-[18px] text-center p-6"
            style={{ background: 'rgba(8,11,22,.55)', backdropFilter: 'blur(3px)' }}
          >
            <div style={{ fontSize: 54 }}>🐛</div>
            <h3 className="font-display font-bold" style={{ fontSize: 26 }}>
              Pronto para o caos?
            </h3>
            <p className="max-w-[42ch] text-si-muted" style={{ fontSize: 14.5, lineHeight: 1.55 }}>
              Você tem <b className="text-si-cyan">30 segundos</b>. Cada bug dá pontos e aumenta o
              combo. Deixar fugir ou tocar num núcleo zera o combo.
            </p>
            <button onClick={start} className="cta-grad mt-[6px]" style={{ padding: '15px 34px', fontSize: 16 }}>
              Começar →
            </button>
          </div>
        )}

        {isOver && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-[14px] text-center p-6"
            style={{ background: 'rgba(8,11,22,.66)', backdropFilter: 'blur(4px)' }}
          >
            <div className="font-mono uppercase" style={{ fontSize: 12, letterSpacing: '3px', color: '#7c87a8' }}>
              {verdictLabel}
            </div>
            <div
              className="font-display font-bold"
              style={{
                fontSize: 64,
                lineHeight: 1,
                background: 'linear-gradient(120deg,#22e0ff,#8b5cff,#2bff9a)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {score}
            </div>
            <div className="text-si-muted" style={{ fontSize: 14 }}>
              pontos · combo máx <b style={{ color: '#ff5db1' }}>x{bestCombo}</b> · {misses} fugas
            </div>
            {isRecord && (
              <div className="font-display font-bold" style={{ color: '#2bff9a', fontSize: 16 }}>
                🏆 Novo recorde!
              </div>
            )}
            <button onClick={start} className="cta-grad mt-2" style={{ padding: '14px 32px', fontSize: 15 }}>
              Jogar de novo ↻
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FirewallGame;
