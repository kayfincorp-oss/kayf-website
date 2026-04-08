'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Demo.module.css';

const CHROME_URL =
  'https://chromewebstore.google.com/detail/kayf/npeikeenbibceplhpjponnolapbogjbn';

// ─── Snake game constants ─────────────────────────────────
const COLS = 20;
const ROWS = 16;
const CELL = 22;
const CANVAS_W = COLS * CELL; // 440
const CANVAS_H = ROWS * CELL; // 352
const TICK_MS = 140;

type Phase = 'idle' | 'thinking' | 'answered';
type Dir = 'U' | 'D' | 'L' | 'R';
type Vec = { x: number; y: number };
type Particle = { x: number; y: number; vx: number; vy: number; life: number; color: string };

interface GameState {
  snake: Vec[];
  dir: Dir;
  nextDir: Dir;
  food: Vec;
  score: number;
  particles: Particle[];
  alive: boolean;
  started: boolean;
}

function randomFood(snake: Vec[]): Vec {
  let pos: Vec;
  do {
    pos = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (snake.some(s => s.x === pos.x && s.y === pos.y));
  return pos;
}

function spawnParticles(x: number, y: number, particles: Particle[]) {
  const colors = ['#7da882', '#a8d4ab', '#c07c5e', '#b0d4b4'];
  for (let i = 0; i < 10; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1 + Math.random() * 3;
    particles.push({
      x: x * CELL + CELL / 2,
      y: y * CELL + CELL / 2,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(x, y, w, h, r);
  } else {
    r = Math.min(r, w / 2, h / 2);
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
  }
}

function render(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  time: number
) {
  // 1. Background
  ctx.fillStyle = '#0f0e0d';
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // 2. Subtle grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
  ctx.lineWidth = 0.5;
  for (let x = 0; x <= COLS; x++) {
    ctx.beginPath();
    ctx.moveTo(x * CELL, 0);
    ctx.lineTo(x * CELL, CANVAS_H);
    ctx.stroke();
  }
  for (let y = 0; y <= ROWS; y++) {
    ctx.beginPath();
    ctx.moveTo(0, y * CELL);
    ctx.lineTo(CANVAS_W, y * CELL);
    ctx.stroke();
  }

  // 3. Food — rust circle with glow + pulse
  const pulse = 0.85 + 0.15 * Math.sin(time / 400);
  const fx = state.food.x * CELL + CELL / 2;
  const fy = state.food.y * CELL + CELL / 2;
  const foodR = (CELL / 2 - 3) * pulse;

  // Outer glow
  const foodGlow = ctx.createRadialGradient(fx, fy, 0, fx, fy, CELL);
  foodGlow.addColorStop(0, 'rgba(192, 124, 94, 0.35)');
  foodGlow.addColorStop(1, 'rgba(192, 124, 94, 0)');
  ctx.fillStyle = foodGlow;
  ctx.beginPath();
  ctx.arc(fx, fy, CELL, 0, Math.PI * 2);
  ctx.fill();

  // Inner dot
  ctx.shadowBlur = 12;
  ctx.shadowColor = '#c07c5e';
  ctx.fillStyle = '#c07c5e';
  ctx.beginPath();
  ctx.arc(fx, fy, foodR, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  // 4. Snake
  const snakeLen = state.snake.length;
  state.snake.forEach((seg, i) => {
    const isHead = i === 0;
    const ratio = 1 - i / snakeLen;
    const gx = seg.x * CELL + 2;
    const gy = seg.y * CELL + 2;
    const gw = CELL - 4;
    const gh = CELL - 4;

    if (isHead) {
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#7da882';
    } else {
      ctx.shadowBlur = 8 * ratio;
      ctx.shadowColor = `rgba(125, 168, 130, ${ratio * 0.6})`;
    }

    // Color gradient from head (bright sage) to tail (dim)
    const alpha = isHead ? 1 : 0.35 + ratio * 0.55;
    const r = Math.floor(125 * ratio + 80 * (1 - ratio));
    const g = Math.floor(168 * ratio + 110 * (1 - ratio));
    const b = Math.floor(130 * ratio + 85 * (1 - ratio));
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;

    ctx.beginPath();
    roundRect(ctx, gx, gy, gw, gh, isHead ? 6 : 4);
    ctx.fill();
  });
  ctx.shadowBlur = 0;

  // 5. Particles
  state.particles.forEach(p => {
    ctx.globalAlpha = p.life;
    ctx.fillStyle = p.color;
    ctx.shadowBlur = 4;
    ctx.shadowColor = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3 * p.life, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;

  // 6. Score
  ctx.fillStyle = 'rgba(125, 168, 130, 0.6)';
  ctx.font = `500 12px var(--font-jetbrains-var, monospace)`;
  ctx.textAlign = 'left';
  ctx.fillText(`SCORE  ${String(state.score).padStart(4, '0')}`, 12, 22);

  // 7. Start overlay
  if (!state.started) {
    ctx.fillStyle = 'rgba(15, 14, 13, 0.75)';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    ctx.fillStyle = 'rgba(125, 168, 130, 0.9)';
    ctx.font = `400 14px var(--font-jetbrains-var, monospace)`;
    ctx.textAlign = 'center';
    ctx.fillText('Click or press any key to start', CANVAS_W / 2, CANVAS_H / 2 - 10);

    ctx.fillStyle = 'rgba(138, 123, 104, 0.7)';
    ctx.font = `300 11px var(--font-outfit-var, sans-serif)`;
    ctx.fillText('Arrow keys or WASD to steer', CANVAS_W / 2, CANVAS_H / 2 + 12);
  }

  // 8. Game over overlay
  if (!state.alive && state.started) {
    ctx.fillStyle = 'rgba(15, 14, 13, 0.8)';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    ctx.fillStyle = '#c07c5e';
    ctx.font = `500 18px var(--font-fraunces-var, serif)`;
    ctx.textAlign = 'center';
    ctx.fillText('Game over', CANVAS_W / 2, CANVAS_H / 2 - 20);

    ctx.fillStyle = 'rgba(125, 168, 130, 0.8)';
    ctx.font = `400 13px var(--font-jetbrains-var, monospace)`;
    ctx.fillText(`Score: ${state.score}`, CANVAS_W / 2, CANVAS_H / 2 + 8);

    ctx.fillStyle = 'rgba(138, 123, 104, 0.7)';
    ctx.font = `300 11px var(--font-outfit-var, sans-serif)`;
    ctx.fillText('Click to try again', CANVAS_W / 2, CANVAS_H / 2 + 32);
  }
}

// ─── The code block shown in the answered state ─────────
const pythonCode = `def is_prime(n: int) -> bool:
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    for i in range(3, int(n**0.5) + 1, 2):
        if n % i == 0:
            return False
    return True`;

export default function Demo() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [timeLeft, setTimeLeft] = useState(5);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const totalTimeRef = useRef<number>(5);
  const gameRef = useRef<GameState>({
    snake: [{ x: 10, y: 8 }, { x: 9, y: 8 }, { x: 8, y: 8 }],
    dir: 'R',
    nextDir: 'R',
    food: { x: 15, y: 8 },
    score: 0,
    particles: [],
    alive: false,
    started: false,
  });

  const resetGame = useCallback(() => {
    const state = gameRef.current;
    state.snake = [{ x: 10, y: 8 }, { x: 9, y: 8 }, { x: 8, y: 8 }];
    state.dir = 'R';
    state.nextDir = 'R';
    state.food = { x: 15, y: 8 };
    state.score = 0;
    state.particles = [];
    state.alive = false;
    state.started = false;
  }, []);

  const startGame = useCallback(() => {
    const state = gameRef.current;
    if (state.alive) return;
    if (!state.started) {
      state.started = true;
    } else {
      // restart
      state.snake = [{ x: 10, y: 8 }, { x: 9, y: 8 }, { x: 8, y: 8 }];
      state.dir = 'R';
      state.nextDir = 'R';
      state.food = randomFood(state.snake);
      state.score = 0;
      state.particles = [];
    }
    state.alive = true;
  }, []);

  const gameTick = useCallback(() => {
    const state = gameRef.current;
    if (!state.alive) return;

    state.dir = state.nextDir;
    const head = state.snake[0];
    const newHead: Vec = { x: head.x, y: head.y };

    if (state.dir === 'U') newHead.y -= 1;
    if (state.dir === 'D') newHead.y += 1;
    if (state.dir === 'L') newHead.x -= 1;
    if (state.dir === 'R') newHead.x += 1;

    // Wall collision
    if (newHead.x < 0 || newHead.x >= COLS || newHead.y < 0 || newHead.y >= ROWS) {
      state.alive = false;
      return;
    }

    // Self collision
    if (state.snake.some(s => s.x === newHead.x && s.y === newHead.y)) {
      state.alive = false;
      return;
    }

    state.snake.unshift(newHead);

    // Food eaten
    if (newHead.x === state.food.x && newHead.y === state.food.y) {
      state.score += 10;
      spawnParticles(state.food.x, state.food.y, state.particles);
      state.food = randomFood(state.snake);
    } else {
      state.snake.pop();
    }

    // Age particles
    state.particles = state.particles
      .map(p => ({ ...p, x: p.x + p.vx, y: p.y + p.vy, life: p.life - 0.06 }))
      .filter(p => p.life > 0);
  }, []);

  // ─── RAF render loop ────────────────────────────────────
  const startRenderLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    startTimeRef.current = performance.now();

    function loop() {
      const elapsed = performance.now() - startTimeRef.current;
      render(ctx!, gameRef.current, elapsed);
      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);
  }, []);

  const stopRenderLoop = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  // ─── Phase transitions ──────────────────────────────────
  const enterThinking = useCallback(() => {
    setPhase('thinking');
    const randomTime = Math.floor(Math.random() * 4) + 3; // 3–6 seconds
    totalTimeRef.current = randomTime;
    setTimeLeft(randomTime);
    resetGame();
  }, [resetGame]);

  const enterAnswered = useCallback(() => {
    setPhase('answered');
    stopRenderLoop();
    if (tickRef.current) clearInterval(tickRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [stopRenderLoop]);

  const enterIdle = useCallback(() => {
    setPhase('idle');
    stopRenderLoop();
    if (tickRef.current) clearInterval(tickRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(5);
  }, [stopRenderLoop]);

  // ─── Thinking phase effects ─────────────────────────────
  useEffect(() => {
    if (phase !== 'thinking') return;

    // Start render loop
    startRenderLoop();

    // Game tick
    tickRef.current = setInterval(gameTick, TICK_MS);

    // Countdown timer
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      stopRenderLoop();
      if (tickRef.current) clearInterval(tickRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, startRenderLoop, stopRenderLoop, gameTick]);

  // Auto-transition when timer hits 0
  useEffect(() => {
    if (phase === 'thinking' && timeLeft === 0) {
      enterAnswered();
    }
  }, [timeLeft, phase, enterAnswered]);

  // ─── Keyboard controls ──────────────────────────────────
  useEffect(() => {
    if (phase !== 'thinking') return;

    const dirMap: Record<string, Dir> = {
      ArrowUp: 'U', KeyW: 'U',
      ArrowDown: 'D', KeyS: 'D',
      ArrowLeft: 'L', KeyA: 'L',
      ArrowRight: 'R', KeyD: 'R',
    };
    const opposites: Record<Dir, Dir> = { U: 'D', D: 'U', L: 'R', R: 'L' };

    const onKey = (e: KeyboardEvent) => {
      const newDir = dirMap[e.code];
      if (newDir) {
        e.preventDefault();
        const state = gameRef.current;
        if (!state.started || !state.alive) {
          startGame();
          if (newDir) state.nextDir = newDir;
          return;
        }
        if (opposites[newDir] !== state.dir) {
          state.nextDir = newDir;
        }
      } else if (!gameRef.current.started) {
        startGame();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, startGame]);

  // ─── Touch swipe controls ───────────────────────────────
  useEffect(() => {
    if (phase !== 'thinking') return;

    const container = containerRef.current;
    if (!container) return;

    let touchStartX = 0;
    let touchStartY = 0;
    const opposites: Record<Dir, Dir> = { U: 'D', D: 'U', L: 'R', R: 'L' };

    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      if (Math.max(absDx, absDy) < 20) {
        startGame();
        return;
      }

      let newDir: Dir;
      if (absDx > absDy) {
        newDir = dx > 0 ? 'R' : 'L';
      } else {
        newDir = dy > 0 ? 'D' : 'U';
      }

      const state = gameRef.current;
      if (!state.started || !state.alive) {
        startGame();
        state.nextDir = newDir;
        return;
      }
      if (opposites[newDir] !== state.dir) {
        state.nextDir = newDir;
      }
    };

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchend', onTouchEnd);
    };
  }, [phase, startGame]);

  // ─── Canvas click ────────────────────────────────────────
  const handleCanvasClick = () => {
    startGame();
  };

  const timerPercent = (timeLeft / totalTimeRef.current) * 100;

  return (
    <section id="demo" className={styles.section}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 className={styles.heading}>Try it</h2>
          <p className={styles.sub}>
            Hit &ldquo;Send prompt&rdquo; — play snake while the AI thinks, then get pulled back automatically.
          </p>
        </div>

        {/* Device frame */}
        <div className={styles.frame}>
          {/* Frame header bar */}
          <div className={styles.frameHeader}>
            {phase === 'thinking' ? (
              <>
                <div className={styles.dot} />
                <span>kayf is active</span>
              </>
            ) : (
              <>
                <div className={styles.dotGray} />
                <span>ChatGPT</span>
              </>
            )}
          </div>

          {/* ── Idle phase ── */}
          {phase === 'idle' && (
            <div className={styles.chatArea}>
              <div className={styles.userMsg}>
                Write me a Python function to check if a number is prime
              </div>

              <div className={styles.aiThinking}>
                <div className={styles.thinkingDot} />
                <div className={styles.thinkingDot} />
                <div className={styles.thinkingDot} />
              </div>

              <div className={styles.inputRow}>
                <div className={styles.fakeInput}>
                  <span className={styles.cursor}>|</span>
                </div>
                <button
                  className={styles.sendBtn}
                  onClick={enterThinking}
                  aria-label="Send prompt and start demo"
                >
                  Send prompt →
                </button>
              </div>
              <p className={styles.demoHint}>Click to watch Kayf take over</p>
            </div>
          )}

          {/* ── Thinking / snake phase ── */}
          {phase === 'thinking' && (
            <div className={styles.gameArea} ref={containerRef}>
              <canvas
                ref={canvasRef}
                width={CANVAS_W}
                height={CANVAS_H}
                className={styles.canvas}
                onClick={handleCanvasClick}
                tabIndex={0}
                aria-label="Snake game — click or press any key to start"
              />
            </div>
          )}

          {/* ── Answered phase ── */}
          {phase === 'answered' && (
            <div className={styles.answeredArea}>
              <div className={styles.userMsg}>
                Write me a Python function to check if a number is prime
              </div>

              <div className={styles.aiMsg}>
                <p style={{ marginBottom: '10px', color: 'var(--color-text-muted)', fontSize: '14px' }}>
                  Here&apos;s a clean, efficient implementation:
                </p>
                <pre className={styles.codeBlock}>
                  <code>{pythonCode}</code>
                </pre>
                <p style={{ marginTop: '10px', fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
                  This runs in <code className={styles.inlineCode}>O(√n)</code> time by only checking
                  divisors up to the square root. Handles edge cases for{' '}
                  <code className={styles.inlineCode}>n &lt; 2</code> and even numbers upfront.
                </p>
              </div>

              <div className={styles.answeredActions}>
                <button className={styles.resetBtn} onClick={enterIdle}>
                  ↺ Reset demo
                </button>
                <a
                  href={CHROME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.chromeCta}
                >
                  Add Kayf to Chrome →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
