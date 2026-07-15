'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export type NeuralTone = 'cyan' | 'violet' | 'duo';

interface NeuralSphereProps {
  tone?: NeuralTone;
  rotationSpeed?: number;
  /** Span onde a rotação Y atual (em graus, "042") é escrita a cada frame, sem setState. */
  degreesRef?: React.RefObject<HTMLSpanElement | null>;
  /**
   * Centro horizontal da esfera como fração da largura do viewport (0.5 = centro).
   * Aplicado apenas em viewports >= 1024px; abaixo disso a esfera volta ao centro.
   */
  centerX?: number;
  className?: string;
}

function paletteFor(name: NeuralTone) {
  if (name === 'violet') return { node: 0xc9b4ff, core: 0xffffff, line: 0x8b5cff, pulse: 0xffffff };
  if (name === 'duo') return { node: 0x7fe9ff, core: 0xc9b4ff, line: 0x22e0ff, pulse: 0xffffff };
  return { node: 0x7fe9ff, core: 0xffffff, line: 0x22e0ff, pulse: 0xffffff };
}

function glowTexture(color: string) {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.25, 'rgba(255,255,255,.85)');
  grad.addColorStop(0.6, color);
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

const NeuralSphere: React.FC<NeuralSphereProps> = ({
  tone = 'cyan',
  rotationSpeed = 1,
  degreesRef,
  centerX = 0.5,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    cam.position.z = 6.2;

    const group = new THREE.Group();
    scene.add(group);

    const size = () => {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      cam.aspect = w / h;
      cam.updateProjectionMatrix();
      // Desloca o centro da esfera em coordenadas de mundo no plano z=0
      const frac = w >= 1024 ? centerX : 0.5;
      const halfH = Math.tan(((cam.fov / 2) * Math.PI) / 180) * cam.position.z;
      group.position.x = (frac - 0.5) * 2 * halfH * cam.aspect;
    };
    size();
    window.addEventListener('resize', size);
    const pal = paletteFor(tone);

    // Nós distribuídos na casca da esfera via espiral de Fibonacci + jitter radial
    const N = 150;
    const R = 1.15;
    const GA = Math.PI * (3 - Math.sqrt(5));
    const nodes: { base: THREE.Vector3; ph: number; sp: number; amp: number }[] = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const th = GA * i;
      const v = new THREE.Vector3(Math.cos(th) * rad, y, Math.sin(th) * rad);
      v.multiplyScalar(R * (0.96 + Math.random() * 0.08));
      nodes.push({
        base: v,
        ph: Math.random() * Math.PI * 2,
        sp: 0.4 + Math.random() * 0.7,
        amp: 0.04 + Math.random() * 0.04,
      });
    }

    // Arestas: k-vizinhos dentro do raio, grau máx 3–4, sem duplicatas
    const edges: [number, number][] = [];
    const degree = new Array<number>(N).fill(0);
    for (let i = 0; i < N; i++) {
      const cand: { j: number; d: number }[] = [];
      for (let j = 0; j < N; j++) {
        if (j !== i) cand.push({ j, d: nodes[i].base.distanceTo(nodes[j].base) });
      }
      cand.sort((a, b) => a.d - b.d);
      for (let k = 0; k < cand.length && degree[i] < 3; k++) {
        const j = cand[k].j;
        if (cand[k].d > 0.48) break;
        if (degree[j] >= 4) continue;
        if (edges.some((e) => e[0] === j && e[1] === i)) continue;
        edges.push([i, j]);
        degree[i]++;
        degree[j]++;
      }
    }

    // Adjacência por nó, para roteamento dos pulsos
    const adj: number[][] = new Array(N).fill(0).map(() => []);
    edges.forEach((e, idx) => {
      adj[e[0]].push(idx);
      adj[e[1]].push(idx);
    });

    const texNode = glowTexture('rgba(34,224,255,.9)');
    const texCore = glowTexture('rgba(139,92,255,.9)');
    const texPulse = glowTexture('rgba(255,255,255,.95)');

    const nodePos = new Float32Array(N * 3);
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePos, 3));
    const nodeMat = new THREE.PointsMaterial({
      size: 0.09, map: texNode, color: pal.node, transparent: true, opacity: 0.95,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
    });
    group.add(new THREE.Points(nodeGeo, nodeMat));

    // Núcleos: os 14 nós mais conectados, maiores
    const coreIdx = degree
      .map((d, i) => ({ d, i }))
      .sort((a, b) => b.d - a.d)
      .slice(0, 14)
      .map((o) => o.i);
    const corePos = new Float32Array(coreIdx.length * 3);
    const coreGeo = new THREE.BufferGeometry();
    coreGeo.setAttribute('position', new THREE.BufferAttribute(corePos, 3));
    const coreMat = new THREE.PointsMaterial({
      size: 0.2, map: texCore, color: pal.core, transparent: true, opacity: 1,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
    });
    group.add(new THREE.Points(coreGeo, coreMat));

    const linePos = new Float32Array(edges.length * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: pal.line, transparent: true, opacity: 0.3,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    group.add(new THREE.LineSegments(lineGeo, lineMat));

    // Pulsos que percorrem as arestas — sinapses disparando
    const P = 22;
    const pulses = Array.from({ length: P }, () => ({
      e: Math.floor(Math.random() * edges.length),
      t: Math.random(),
      sp: 0.008 + Math.random() * 0.014,
      dir: Math.random() < 0.5 ? 1 : -1,
    }));
    const pulsePos = new Float32Array(P * 3);
    const pulseGeo = new THREE.BufferGeometry();
    pulseGeo.setAttribute('position', new THREE.BufferAttribute(pulsePos, 3));
    const pulseMat = new THREE.PointsMaterial({
      size: 0.14, map: texPulse, color: pal.pulse, transparent: true, opacity: 1,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
    });
    group.add(new THREE.Points(pulseGeo, pulseMat));

    let stopped = false;
    let raf = 0;
    let t = 0;
    let drift = 1;
    let driftT = 1;
    let trx = 0;
    let tryY = 0;
    let lastMX = 0;
    let lastMY = 0;

    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      tryY = nx * 0.9;
      trx = ny * 0.7;
      const sp = Math.hypot(e.clientX - lastMX, e.clientY - lastMY);
      lastMX = e.clientX;
      lastMY = e.clientY;
      driftT = Math.min(2.2, 1 + sp * 0.02);
    };
    window.addEventListener('mousemove', onMove);

    const cur = new Array(N).fill(0).map(() => new THREE.Vector3());
    const degEl = degreesRef?.current ?? null;

    const loop = () => {
      if (stopped) return;
      const speed = rotationSpeed;
      t += 0.01 * (0.5 + speed * 0.5);
      driftT += (1 - driftT) * 0.01;
      drift += (driftT - drift) * 0.06;

      for (let i = 0; i < N; i++) {
        const nd = nodes[i];
        cur[i].set(
          nd.base.x + Math.sin(t * nd.sp + nd.ph) * nd.amp * drift,
          nd.base.y + Math.sin(t * nd.sp * 1.3 + nd.ph * 2) * nd.amp * drift,
          nd.base.z + Math.cos(t * nd.sp * 0.8 + nd.ph) * nd.amp * drift
        );
        nodePos[i * 3] = cur[i].x;
        nodePos[i * 3 + 1] = cur[i].y;
        nodePos[i * 3 + 2] = cur[i].z;
      }
      for (let k = 0; k < coreIdx.length; k++) {
        const c = cur[coreIdx[k]];
        corePos[k * 3] = c.x;
        corePos[k * 3 + 1] = c.y;
        corePos[k * 3 + 2] = c.z;
      }
      for (let k = 0; k < edges.length; k++) {
        const a = cur[edges[k][0]];
        const b = cur[edges[k][1]];
        linePos[k * 6] = a.x; linePos[k * 6 + 1] = a.y; linePos[k * 6 + 2] = a.z;
        linePos[k * 6 + 3] = b.x; linePos[k * 6 + 4] = b.y; linePos[k * 6 + 5] = b.z;
      }
      for (let k = 0; k < P; k++) {
        const pu = pulses[k];
        pu.t += pu.sp * (0.5 + speed * 0.5);
        if (pu.t >= 1) {
          const end = pu.dir === 1 ? edges[pu.e][1] : edges[pu.e][0];
          const opts = adj[end];
          pu.e = opts[Math.floor(Math.random() * opts.length)];
          pu.dir = edges[pu.e][0] === end ? 1 : -1;
          pu.t = 0;
        }
        const a = cur[edges[pu.e][0]];
        const b = cur[edges[pu.e][1]];
        const tt = pu.dir === 1 ? pu.t : 1 - pu.t;
        pulsePos[k * 3] = a.x + (b.x - a.x) * tt;
        pulsePos[k * 3 + 1] = a.y + (b.y - a.y) * tt;
        pulsePos[k * 3 + 2] = a.z + (b.z - a.z) * tt;
      }

      nodeGeo.attributes.position.needsUpdate = true;
      coreGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.position.needsUpdate = true;
      pulseGeo.attributes.position.needsUpdate = true;

      group.rotation.y += (tryY - group.rotation.y) * 0.04 + 0.0016 * speed;
      group.rotation.x += (trx - group.rotation.x) * 0.04;

      if (degEl) {
        const d = Math.round((((group.rotation.y * 180) / Math.PI) % 360 + 360) % 360);
        degEl.textContent = String(d).padStart(3, '0');
      }

      renderer.render(scene, cam);
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', size);
      window.removeEventListener('mousemove', onMove);
      nodeGeo.dispose();
      coreGeo.dispose();
      lineGeo.dispose();
      pulseGeo.dispose();
      nodeMat.dispose();
      coreMat.dispose();
      lineMat.dispose();
      pulseMat.dispose();
      texNode.dispose();
      texCore.dispose();
      texPulse.dispose();
      renderer.dispose();
    };
  }, [tone, rotationSpeed, degreesRef, centerX]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
};

export default NeuralSphere;
