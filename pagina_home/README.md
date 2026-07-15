# Handoff: Nova Home — Soluções Inteligentes 83

Redesign SOMENTE da home page: layout editorial de viewport única com uma **esfera de rede neural 3D animada** (three.js) no centro, labels de navegação orbitando ao redor, stats na base e a paleta escura já existente do site. As demais páginas do site não mudam.

---

## ⚠️ O que é este pacote

`designs/Home Imersiva v2.dc.html` é um **protótipo de referência em HTML** — mostra o visual e o comportamento finais. **Não é para copiar para produção.** A tarefa é recriá-lo como componente(s) no site real (Next.js / React, detectado pelas metatags do site).

- O arquivo abre direto no navegador (o `support.js` ao lado faz o protótipo renderizar). `support.js` é só do protótipo — **não vai para produção**.
- Toda a lógica 3D está em JS puro na classe `Component` no fim do arquivo (bloco `<script data-dc-script>`) — porta quase 1:1 para um componente React com `useRef`/`useEffect`.
- three.js: o protótipo usa **r128 via CDN**. Em Next.js, use `npm i three` e monte num componente client-side (`'use client'` + dynamic import sem SSR).

## Fidelidade
Hi-fi. Cores, tipografia, espaçamentos e a animação são finais. Traduza os estilos inline para a abordagem do projeto (Tailwind/CSS Modules/etc.).

---

## Arquitetura sugerida

```
app/page.tsx               ← nova home (substitui a atual)
components/NeuralSphere.tsx ← canvas three.js (rede neural esférica)
```

A página é **uma viewport única** (100vh, overflow hidden), sem scroll. Nav própria no topo (não reutiliza o header padrão do site nesta tela, se houver).

## Design tokens (paleta existente do site)

- Fundo base: `#05070f`; glow central: `radial-gradient(1100px 700px at 50% 45%, rgba(34,224,255,.07), transparent 62%)`
- Grade sutil: `repeating-linear-gradient` 0° e 90°, linha `rgba(140,170,255,.05)` a cada 56px
- Texto: `#e8eeff` · secundário `#aab6d6` · mono/dim `#6b78a0`
- Acentos: cyan `#22e0ff` · violeta `#8b5cff` · verde `#2bff9a` (não usado nesta tela) · hairline `rgba(140,170,255,.16)`
- Gradiente da marca (span do headline): `linear-gradient(100deg,#22e0ff,#8b5cff)` com `background-clip:text`
- Fontes (Google Fonts / next/font): **Space Grotesk** (display, weight 500, letter-spacing -1.5px), **Manrope** (corpo), **JetBrains Mono** (labels 10.5–11px, letter-spacing 1.5–2.5px, uppercase)

## Layout (todas as posições no protótipo, resumo)

- **Top bar** (absolute, padding 24px 36px): logo 26px com glow cyan + "SOLUÇÕES INTELIGENTES®" à esquerda; links mono à direita (PRODUTOS · CURSOS · FERRAMENTAS · BLOG · SOBRE → rotas reais do site: `/produtos`, `/cursos-online`, `/ferramentas`, `/blog`, `/sobre`).
- **Pill central** (top 76px): "● ECOSSISTEMA SI·83", fundo `rgba(14,19,34,.85)`, borda cyan `.3`, texto `#7fe9ff`, ponto com animação de blink.
- **Headline** (left 36px, top 19%, max-width 520px): label mono cyan "01 — ECOSSISTEMA" → H1 clamp(34px,3.8vw,54px) "Inteligência artificial, *soluções reais.*" (span em gradiente) → parágrafo 29ch → **CTAs**: botão "EXPLORAR FERRAMENTAS →" (borda cyan .45, bg cyan .08) + link "VER PRODUTOS" sublinhado.
- **Canvas 3D**: fixed/absolute inset 0, z-index 1, `pointer-events:none`. Conteúdo em z-index 2–3.
- **4 labels orbitando a esfera** — ancorados ao CENTRO da tela com offsets em `vmin` (escalam com a esfera; foi a solução para não colidir com nada em nenhum viewport — não usar %-de-borda):
  - 02 — PRODUTOS `left:calc(50% + 24vmin); top:calc(50% - 24vmin)`
  - 03 — ACADEMY `left:calc(50% + 29vmin); top:calc(50% - 2vmin)`
  - 05 — STUDIO `left:calc(50% + 20vmin); top:calc(50% + 22vmin)`
  - 04 — FERRAMENTAS `left:calc(50% - 28vmin); top:calc(50% + 20vmin); transform:translateX(-100%)` (alinhado à direita, texto voltado para a esfera)
  - Anatomia: ponto cyan 6px com glow + "0N — NOME" (mono 11px, #e8eeff) + sublabel (mono 10.5px, #6b78a0). Hover: opacity .6.
- **Stats** (left 36px, bottom 30px, flex gap `clamp(20px,3.5vw,48px)`): 15+ FERRAMENTAS · 04 PRODUTOS · 100% SEM LOGIN · BR FEITO NO BRASIL. Números Space Grotesk 30px, sufixos (+/%) em cyan.
- **Hairline** left/right 36px, bottom 78px.
- **Readout de graus** (right 120px, bottom 32px): rotação Y atual da esfera, "042°" mono. Atualizar via ref direto no DOM (sem setState por frame).
- **Equalizer** (right 36px, bottom 30px): 8 barras 3px cyan, animação CSS `scaleY` com durações/delays dessincronizados.
- **Marcas "+"** decorativas em 4 posições da grade (mono 13px, #6b78a0, opacity .55).

## NeuralSphere — algoritmo (código completo no protótipo)

1. **Nós**: 150 pontos na CASCA de uma esfera raio 1.15 via espiral de Fibonacci (`y = 1-(i/(N-1))*2; rad=√(1-y²); θ=i·π(3-√5)`), com jitter radial ×(0.96–1.04). Cada nó tem fase/velocidade/amplitude próprias para deriva senoidal (amp .04–.08).
2. **Arestas**: k-vizinhos mais próximos, distância ≤ 0.48, grau máx 3–4 por nó, sem duplicatas. Guardar adjacência por nó.
3. **Render** (tudo com `AdditiveBlending`, `depthWrite:false`, texturas de glow geradas em canvas — radial gradient branco→cor→transparente):
   - Nós: `THREE.Points`, size .09, cor `#7fe9ff` (paleta cyan)
   - Núcleos: os 14 nós de maior grau em um segundo `Points`, size .2, cor branca/violeta
   - Arestas: `LineSegments`, `LineBasicMaterial` cyan, opacity .30
   - **Pulsos**: 22 pontos (size .14, brancos) que percorrem arestas (lerp a→b); ao chegar num nó, escolhem aleatoriamente uma aresta adjacente e continuam — efeito de sinapses disparando
4. **Loop** (`requestAnimationFrame`): atualiza posições dos nós (deriva senoidal), reescreve os buffers de nós/núcleos/arestas/pulsos (`needsUpdate`), rotaciona o grupo (`+0.0016·speed` + tilt suave em direção ao mouse `lerp 0.04`), escreve os graus no ref.
5. **Mouse**: `mousemove` global → tilt (nx·0.9 / ny·0.7) e "drift boost" (velocidade do mouse amplia a vibração dos nós até 2.2×, decai de volta a 1).
6. **Câmera**: PerspectiveCamera fov 38, z 6.2. Renderer `alpha:true, antialias:true`, pixelRatio cap 2. Cleanup completo no unmount (cancelAnimationFrame, listeners, renderer.dispose()).

Paletas alternativas (prop `blobTone` no protótipo): `cyan` (default), `violet`, `duo` — só trocam as cores dos 4 materiais.

## Gotchas aprendidos (não repetir)

- **Nunca revele conteúdo animando opacity 0→1** — se a animação não disparar, o conteúdo fica invisível. Anime só transform.
- **Não misture âncoras opostas na mesma coluna** (um elemento top-%, outro bottom-px) — cruzam em viewports baixos. Os labels orbitais em `calc(50% ± Nvmin)` existem por isso.
- three.js r128: envMap equirect exige PMREMGenerator; PolyhedronGeometry é não-indexada (flat shading) — irrelevante aqui (rede usa Points/Lines), mas vale se reintroduzirem malhas.

## Responsivo (a fazer na implementação)
Protótipo é desktop-first. Em mobile: nav vira hambúrguer; esconder os 4 labels orbitais (ou listá-los como grid abaixo da esfera); reduzir stats para 2×2; esfera ocupa ~60vw.

## Assets
- Logo: `designs/uploads/logo-1782297911799.png` (usar o do repositório).
- Sem imagens externas — a esfera é 100% procedural.
