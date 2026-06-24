# Handoff: Plataforma Imersiva — Soluções Inteligentes 83

Upgrade visual do site **solucoesinteligentes83.com** para uma experiência "ultra high-tech": fundo de rede neural animada e interativa, glassmorphism, parallax no mouse, animações de entrada e um mini-jogo repensado.

---

## ⚠️ Leia primeiro — o que é este pacote

Os arquivos em `designs/` são **referências de design feitas em HTML** (protótipos que mostram o visual e o comportamento pretendidos). **NÃO são para copiar/colar em produção.**

A tarefa é **recriar estes designs dentro do ambiente atual do site**. O site é **Next.js / React** (detectado pelas metatags `next-size-adjust`). Portanto:

- Recrie cada tela como **componentes React/Next.js**, usando os padrões já existentes no repositório (estrutura de pastas, componente de layout, sistema de rotas do `app/` ou `pages/`).
- Os arquivos `.dc.html` usam um mini-runtime próprio (`support.js`) só para o protótipo renderizar no navegador. **Ignore o `support.js` na implementação** — ele não vai para o site. Use-o apenas para abrir os arquivos e ver o design rodando.
- Toda a lógica (canvas da rede neural, parallax, jogo) está escrita em **JavaScript puro** dentro de uma classe `Component` no fim de cada `.dc.html`. Esse código pode ser portado quase 1:1 para um componente React (com `useRef`/`useEffect`).

### Como visualizar os protótipos
Abra qualquer arquivo `designs/*.dc.html` direto no navegador (o `support.js` ao lado já faz renderizar). Comece por `Plataforma Imersiva.dc.html` (home).

### Referência visual (`screenshots/`)
Capturas em alta resolução de cada tela, para conferência rápida sem abrir os arquivos:
- `01-home.png` … `04-home.png` — Home: hero → pilares → mini-jogo → blog.
- `01-produtos.png`, `02-produtos.png` — Produtos (topo e cards).
- `01-ferramentas.png`, `02-ferramentas.png` — Ferramentas (topo e grade).
- `01-cursos.png`, `02-cursos.png` — Cursos (o embed do YouTube não aparece na captura, mas está no layout).
- `01-blog.png` — Blog.
- `01-sobre.png`, `02-sobre.png` — Sobre.

> As capturas são feitas com a timeline de animação pausada, então o fundo de rede neural aparece "congelado" num quadro — no navegador real ele é animado e interativo.

---

## Fidelidade

**Alta fidelidade (hi-fi).** Cores, tipografia, espaçamentos, sombras e interações são finais. Recrie pixel-a-pixel usando as libs do projeto. Onde o protótipo usa estilos inline, traduza para a abordagem de estilo do projeto (CSS Modules, Tailwind, styled-components — o que já existir).

---

## Arquitetura recomendada (Next.js)

```
app/
  layout.tsx            ← <NeuralBackground/> + <Navbar/> + {children} + <Footer/>
  page.tsx              ← Home (hero + pilares + jogo + blog + sugestão)
  produtos/page.tsx
  cursos-online/page.tsx
  ferramentas/page.tsx
  blog/page.tsx
  sobre/page.tsx
components/
  NeuralBackground.tsx  ← canvas fixo + parallax + (opcional) reveal
  Navbar.tsx            ← prop `active` para destacar a aba
  Footer.tsx
  FirewallGame.tsx      ← o mini-jogo
  Reveal.tsx            ← wrapper de animação de entrada (ver "Gotchas")
```

`NeuralBackground`, `Navbar` e `Footer` são **chrome compartilhado** — coloque-os no `layout.tsx` raiz para repetir em todas as páginas (no protótipo eles estão duplicados em cada arquivo por limitação da ferramenta; no React, centralize).

---

## Design Tokens

### Cores
| Token | Hex | Uso |
|---|---|---|
| `--bg` | `#05070f` | Fundo base (quase preto azulado) |
| `--text` | `#e8eeff` | Texto principal |
| `--text-muted` | `#aab6d6` | Parágrafos secundários |
| `--text-dim` | `#8a97b5` | Texto terciário / descrições de card |
| `--text-faint` | `#6b78a0` | Rodapé / labels mono |
| `--cyan` (primária) | `#22e0ff` | Destaque principal, links, CTAs |
| `--violet` (secundária) | `#8b5cff` | Gradientes, acento secundário |
| `--green` (sucesso) | `#2bff9a` | "Gratuito", checks, núcleos do jogo |
| `--pink` | `#ff5db1` / `#ff6b6b` | Acento do jogo / bugs |

Gradiente de marca: `linear-gradient(135deg, #22e0ff, #8b5cff)`.
Gradiente de texto (título): `linear-gradient(100deg,#22e0ff,#8b5cff 50%,#2bff9a)` com `background-clip:text`.

### Vidro (glassmorphism) — padrão dos cards/nav
```css
background: rgba(16, 22, 40, 0.5);          /* nav usa rgba(14,19,34,0.55) */
backdrop-filter: blur(16px) saturate(140%);  /* nav: blur(20px) */
-webkit-backdrop-filter: blur(16px) saturate(140%);
border: 1px solid rgba(140, 170, 255, 0.14); /* nav: 0.16 */
box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
border-radius: 20px;                          /* cards 20–24px, nav 18px */
```
Hover de card: `transform: translateY(-6px); border-color: rgba(34,224,255,.4); box-shadow: 0 22px 50px -22px rgba(34,224,255,.5);`

### Fundo da página (gradientes radiais sobre `--bg`)
```css
background:
  radial-gradient(1200px 700px at 78% -8%, rgba(34,224,255,.12), transparent 60%),
  radial-gradient(1000px 800px at 12% 18%, rgba(139,92,255,.13), transparent 60%),
  #05070f;
```
(Cursos troca cyan↔violet na ordem; Ferramentas adiciona um leve verde.)

### Tipografia (Google Fonts)
- **Display / títulos:** `'Space Grotesk'`, pesos 400–700. Títulos com `letter-spacing:-1.5px` e `line-height:1.05`.
- **Corpo:** `'Manrope'`, pesos 400–800.
- **Labels / mono:** `'JetBrains Mono'`, usado em "// seção", "TEMPO", letter-spacing 2–3px, uppercase, cor cyan/dim.
- Escala de título hero: `clamp(36px, 5.4vw, 64px)`. H2 de seção: `clamp(28px, 3.6vw, 44px)`. Corpo: 15–19px.

Import:
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

### Raio / espaçamento / sombra
- Raios: nav 18px, cards 20–24px, CTAs/botões 12–14px, pills 999px.
- Largura de conteúdo: `max-width: 1180px` centralizado, padding lateral 24px.
- Topo das páginas internas: `padding-top: 160px` (compensa a nav fixa).
- Sombra de elevação: `0 20px 60px -20px rgba(0,0,0,.6)`; glow CTA: `0 14px 38px -10px rgba(34,224,255,.65)`.

---

## Componentes de chrome

### Navbar (fixa, flutuante, glass)
- `position: fixed; top: 18px;` centralizada, `width: min(1180px, calc(100% - 32px))`, glass (ver token), `border-radius: 18px`.
- Conteúdo: logo (38px, com `drop-shadow(0 0 10px rgba(34,224,255,.5))`) + "Soluções Inteligentes **83**" (o "83" em cyan) → links → botão CTA gradiente.
- Links: Home, Produtos, Cursos, Ferramentas, Blog, Sobre. O da página atual recebe `background: rgba(34,224,255,.12); color:#fff`. Hover dos demais: `background: rgba(255,255,255,.06)`.
- Fonte dos links: 13.5px, weight 600, cor base `#aeb9d6`.

### Footer
- Grid `1.6fr 1fr 1fr`: bloco da marca (logo + tagline "Inteligência artificial, soluções reais.") | Navegação | Legal.
- Linha inferior: `© 2026 Soluções Inteligentes 83…` à esquerda, `Powered by AI · Made in Brazil 🇧🇷` à direita, em JetBrains Mono 12.5px cor `#6b78a0`.

---

## NeuralBackground (o destaque visual)

Canvas `position: fixed; inset: 0; z-index: 0; pointer-events: none` atrás de todo o conteúdo (conteúdo em `z-index: 2`). Código completo em `designs/NeuralBg.dc.html` (método `initBg`). Resumo do algoritmo:

- ~`min(120, w*h/15000)` partículas com posição e velocidade aleatórias (vx/vy ≈ ±0.28).
- A cada frame: move partículas (quica nas bordas); desenha **linhas entre pares** a < 128px (`rgba(90,180,255, alpha)`, alpha cresce com a proximidade).
- **Interação com o mouse:** guarda `mx,my`; partículas a < 170px do cursor são levemente atraídas e ganham linha cyan (`rgba(34,224,255, alpha)`).
- **Parallax:** todo o campo desloca ~`(mouse - centro) * 0.012`.
- Nós desenhados com `shadowBlur: 6` cyan para o glow.
- Use `devicePixelRatio` (cap 2) no resize. `requestAnimationFrame` no loop; **cancele no unmount** (`cancelAnimationFrame` + remover listeners de `resize`/`mousemove`).

**Parallax dos elementos:** qualquer elemento com `data-parallax data-depth="N"` recebe, no `mousemove`, `transform: translate(nx*N, ny*N)` onde `nx,ny ∈ [-0.5,0.5]` (posição do mouse normalizada). Usado nos "orbs" de brilho do hero (blobs radiais desfocados) e no logo. Profundidades positivas e negativas criam camadas.

Em React: um `useEffect` com `ref` no canvas, listeners em `window`, cleanup no retorno.

---

## Animação de entrada (Reveal) — ⚠️ GOTCHA IMPORTANTE

Elementos com `data-reveal` sobem suavemente ao aparecer, via:
```css
@keyframes riseIn { from { transform: translateY(22px) } to { transform: none } }
/* no elemento: */ animation: riseIn .7s cubic-bezier(.2,.7,.2,1) both;
```

**Regra de ouro: NUNCA anime `opacity` de 0 → 1 para revelar conteúdo.** Na primeira versão usamos `opacity:0` + `transition`/IntersectionObserver e o conteúdo ficava **invisível** quando a animação não disparava (ex.: aba em segundo plano, timeline pausada, observer que não fira). A correção foi animar **apenas `transform`**, mantendo a opacidade sempre 1 — assim o conteúdo é visível por padrão e a animação é só enriquecimento.

No React, se quiser reveal **on-scroll** (mais elegante para páginas longas), use IntersectionObserver **mas garanta um fallback** que torne o conteúdo visível mesmo se o observer não disparar (timeout de segurança + estado inicial visível). Nunca deixe o estado-base como invisível.

---

## Mini-jogo: "Firewall Neural — Caça ao Bug"

Reimaginação do jogo original. Código completo em `Plataforma Imersiva.dc.html` (métodos `start`, `tick`, `scheduleSpawn`, `spawnBug`, `hitBug`, `escapeBug`, `endGame`). Extraia para `components/FirewallGame.tsx`.

**Objetivo:** em 30s, clicar nos **bugs 🐛 (vermelhos)** e **evitar os núcleos de dados ◆ (verdes)**.

**Estado:** `gameState` (`idle`|`playing`|`over`), `score`, `combo`, `bestCombo`, `best` (recorde), `misses`, `timeLeft`, `timerPct`, `bugs[]`, `bursts[]`.

**Regras:**
- Alvos surgem em posições %-relativas aleatórias na área de jogo (`x: 7–89%`, `y: 12–84%`).
- Intervalo de spawn diminui com o tempo: `800ms → ~360ms` (dificuldade crescente). ~26% dos alvos são "núcleos" verdes.
- Vida do alvo: bug 1350ms, núcleo 1750ms (depois somem).
- **Acertar bug:** `score += 10 + combo*2`, `combo++`, dispara um "burst" (anel `pulseRing` + glow cyan, removido após ~650ms).
- **Bug fugiu (expirou):** `combo = 0`, `misses++`.
- **Clicar núcleo verde:** penalidade — `combo = 0`, `misses++`, `score -= 5` (mín. 0).
- **Núcleo verde expira:** sem efeito (era pra deixar passar).
- Recorde salvo em `localStorage` (chave `fnb_best`).
- Timer com barra fina no topo (`width: timerPct%`, gradiente cyan→violet, glow).

**Visual dos alvos** (58px, círculo, `transform: translate(-50%,-50%)`, animação `bugIn` ao surgir + `bugFloat` flutuando):
- Bug: `radial-gradient(circle at 35% 30%, rgba(255,120,120,.95), rgba(210,40,90,.9))`, glow vermelho, glifo 🐛.
- Núcleo: `radial-gradient(circle at 35% 30%, rgba(43,255,154,.95), rgba(20,160,90,.85))`, glow verde, glifo ◆.

**HUD:** TEMPO · SCORE · COMBO (x) · FUGAS · 🏆 RECORDE (labels em JetBrains Mono 10px, valores em Space Grotesk 24px). Overlays de início ("Pronto para o caos?") e fim (score grande em gradiente + "Novo recorde!" condicional + "Jogar de novo").

Área de jogo: 440px de altura, fundo com grade sutil (`repeating-linear-gradient`) + uma `scanline` animada descendo.

---

## Telas (conteúdo e layout)

> O conteúdo de texto/links abaixo é o real do site — reutilize.

### 1. Home (`Plataforma Imersiva.dc.html`)
- **Hero** centralizado: pill "IA · Automação · Inovação" (com ponto pulsante `badgePulse`) → logo flutuante (130px, `floatY 6s`) → H1 "Inteligência Artificial, **Soluções Reais.**" (2ª linha em gradiente com `shimmer`) → parágrafo → 2 CTAs ("Ver Produtos →" gradiente, "Ver Ferramentas" glass) → indicador de scroll animado. Orbs com parallax atrás.
- **Faixa de valor** (3 colunas glass): "100% Gratuito", "Tempo Real", "Feito no Brasil 🇧🇷".
- **Pilares** (grid 4): Produtos, Cursos Online, Ferramentas, Conteúdo Digital — cada card com ícone (emoji ⚡🎓🛠️✨ em fundo gradiente suave), título, descrição, CTA. Hover eleva.
- **Mini-jogo** (seção completa — ver acima).
- **Blog** (grid 2): cards com imagem, tag, título, excerpt, data, "Ler mais →".
- **Sugestão**: painel gradiente com 3 chips (💡🎯🚀) + botão para o Google Forms.

### 2. Produtos (`Produtos.dc.html`)
Hero "Nossos **Produtos**" + grid 2 colunas de cards (ícone do app 86px + badge plataforma + nome + descrição + "Saiba mais →"):
- Macaquito Runner (iOS) · Briefy (iOS) · WordClimb (Web) · AnaFlow Keys (App). CTA final de sugestão.

### 3. Cursos (`Cursos.dc.html`)
Hero "Aprenda programação com **I.A.**…" + bloco principal 2 colunas: à esquerda **embed do YouTube** (`https://www.youtube.com/embed/J5SSLrWO05g`) + descrição "Programação Turbo com I.A." + chips (Nível: Iniciante / Online / Kiwify); à direita card "Inscrições abertas" com 3 checks e CTA "Comprar curso agora →" (`https://pay.kiwify.com.br/JPfyumd`). Abaixo: 2 listas ("O que você vai aprender" 6 itens, "Para quem é ideal" 4 itens) + CTA final.

### 4. Ferramentas (`Ferramentas.dc.html`)
Hero "Recursos para o seu **dia a dia**" + grid 3 colunas com **15 ferramentas** (card: ícone emoji + tag de categoria no topo + título + descrição + "Acessar →"). Lista e links exatos no arquivo (`renderVals`). Hover eleva com borda cyan.

### 5. Blog (`Blog.dc.html`)
Hero "Tendências de **IA**" + grid 2 de posts (mesmo card da home, imagem 230px) + CTA "Ver todos os posts →". Os 2 posts reais estão no arquivo.

### 6. Sobre (`Sobre.dc.html`)
Hero com logo flutuante + "Inteligência artificial, **soluções reais**" + parágrafo de missão. Seções: 2 cards (Missão / Para quem) → grid 3 "Nossos valores" (🎯🚀🤝) → CTA final (sugestão + explorar ferramentas).

---

## Interações & comportamento (resumo)
- **Nav:** fixa, sempre visível; aba ativa destacada. Considere encolher/colapsar em mobile (o protótipo é desktop-first — veja "Responsivo").
- **Hover:** cards sobem 6px + borda/sombra cyan; botões `brightness(1.08)` + `translateY(-2px)`.
- **Parallax:** orbs e logo seguem o mouse (sutil).
- **Reveal:** entrada `riseIn` (só transform).
- **Animações de hero:** `floatY` (logo), `shimmer` (texto gradiente), `badgePulse` (ponto), `glitch` leve no H1 (a cada ~7s), `scrollDot`.
- **Jogo:** ver seção dedicada. Persistência do recorde em `localStorage`.

## Responsivo (a fazer na implementação)
O protótipo é **desktop-first** (sem media queries, por limitação da ferramenta de estilo inline). Na implementação real:
- Nav: vira menu hambúrguer abaixo de ~860px.
- Grids: pilares 4→2→1, ferramentas 3→2→1, blog/produtos 2→1, cursos 2 colunas→empilhado.
- Reduzir `padding-top` do hero e tamanhos de fonte (já usam `clamp`, ajuste os mínimos).

## Assets
- **Logo:** `designs/uploads/logo-1782297911799.png` (o mesmo logo atual do site — `assets/images/logotipo.png`). Use o do repositório.
- **Imagens de produto/blog:** referenciadas por URL absoluta do próprio site (ex.: `…/briefy.png`, `…/artigo_image1.png`). Já estão no servidor; mantenha esses caminhos ou mova para `/public`.
- **Ícones:** emojis (parte do tom da marca) — sem dependência de biblioteca de ícones.
- **Fontes:** Google Fonts (Space Grotesk, Manrope, JetBrains Mono) — `next/font` recomendado.

## Arquivos neste pacote (`designs/`)
- `Plataforma Imersiva.dc.html` — Home (inclui o jogo e a lógica do canvas/parallax/reveal).
- `Produtos.dc.html`, `Cursos.dc.html`, `Ferramentas.dc.html`, `Blog.dc.html`, `Sobre.dc.html` — páginas internas (dados reais em `renderVals` no fim de cada arquivo).
- `NeuralBg.dc.html` — componente do fundo de rede neural (canvas + parallax).
- `support.js` — runtime só do protótipo; **não vai para produção**.
- `uploads/logo-1782297911799.png` — logo.

> Onde ler a lógica: em cada `.dc.html`, role até o bloco `<script ... data-dc-script>` no final — lá está a classe `Component` com todo o JS (canvas, jogo, parallax). É JS puro, fácil de portar para React.
