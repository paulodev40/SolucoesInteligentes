# Instruções de Configuração — Google AdSense

Publisher ID: **pub-3198120470271949**

---

## 1. Visão Geral

O site usa um componente central chamado `AdSlot` (`components/AdSlot.tsx`) como espaço reservado em todas as posições de anúncio. Após a criação das unidades de anúncio no painel do AdSense e obtenção dos IDs, o componente deve ser atualizado com o código `<ins class="adsbygoogle">` correspondente.

**Status atual:**
- ✅ Script `adsbygoogle.js` adicionado em `app/layout.tsx`
- ✅ `public/ads.txt` criado com publisher ID correto
- ✅ `public/app-ads.txt` atualizado com publisher ID correto
- ✅ Slots `<AdSlot>` implementados em todas as páginas (placeholders visuais)
- ⏳ Aguardando aprovação do AdSense para ativar as unidades reais

---

## 2. Unidades de Anúncio a Criar no AdSense

Crie as seguintes unidades em **Anúncios → Por unidade de anúncio** no painel do AdSense. Use exatamente os nomes abaixo para facilitar o mapeamento.

| # | Nome da Unidade              | Tipo               | Tamanho / Formato      | Páginas que utilizam                          |
|---|------------------------------|--------------------|------------------------|-----------------------------------------------|
| 1 | `si-horizontal-geral`        | Exibição           | Responsivo automático  | Home, Ferramentas (hub), Produtos, Blog       |
| 2 | `si-in-article-blog`         | No artigo          | Automático             | Artigos individuais do Blog (`/blog/[slug]`)  |
| 3 | `si-in-feed-blog`            | No feed            | Automático             | Listagem do Blog (intercalado a cada 6 posts) |
| 4 | `si-ferramentas-individual`  | Exibição           | Responsivo automático  | Cada ferramenta individual (`/ferramentas/*`) |
| 5 | `si-conversao-discreto`      | Exibição           | Responsivo automático  | Cursos Online, Consultoria                    |

> **Nota:** As ferramentas individuais (`/ferramentas/*`) já possuem slots implementados. O mesmo código da unidade `si-ferramentas-individual` deve ser usado em todos eles.

---

## 3. Posições dos Anúncios por Página

### 3.1 Home (`views/HomePage.tsx`)
- **Slot 1** — Entre a seção "Caça ao Bug" e "Últimas Notícias" → unidade `si-horizontal-geral`
- **Slot 2** — Entre a seção "Notícias" e "Blog" → unidade `si-horizontal-geral`

### 3.2 Blog — Listagem (`views/BlogPage.tsx`)
- **Slot 1** — Acima do grid de posts → unidade `si-horizontal-geral`
- **Slot 2** — Intercalado no grid a cada 6 posts (span full-width) → unidade `si-in-feed-blog`

### 3.3 Blog — Artigo individual (`views/BlogPostPage.tsx`)
- **Slot 1** — Entre a imagem de capa e o corpo do artigo → unidade `si-in-article-blog`
- **Slot 2** — Ao final do artigo, antes do bloco de produto relacionado → unidade `si-in-article-blog`

### 3.4 Ferramentas — Hub (`views/ToolsPage.tsx`)
- **Slot 1** — Antes do grid de ferramentas interativas → unidade `si-horizontal-geral`
- **Slot 2** — Entre ferramentas interativas e ferramentas de IA externas → unidade `si-horizontal-geral`

### 3.5 Ferramentas — Páginas individuais (`/ferramentas/*`)
Cada ferramenta já possui 2–3 slots implementados. Usar unidade `si-ferramentas-individual` em todos.

Arquivos:
- `app/ferramentas/calculadora-ferias-13/` → via `views/FeriasPage.tsx`
- `app/ferramentas/cnpj/` → via `views/CNPJPage.tsx`
- `app/ferramentas/gerador-de-prompts/` → via `views/PromptPage.tsx`
- `app/ferramentas/calculadora-juros-compostos/JurosCompostosClient.tsx`
- `app/ferramentas/calculadora-porcentagem/PorcentagemClient.tsx`
- `app/ferramentas/gerador-qr-code-pix/PixQRClient.tsx`
- `app/ferramentas/comprimir-imagem/ComprimirClient.tsx`
- `app/ferramentas/redimensionar-imagem/RedimensionarClient.tsx`
- `app/ferramentas/converter-imagem/ConverterClient.tsx`
- `app/ferramentas/remover-fundo-de-imagem/RemoverFundoClient.tsx`
- `app/ferramentas/juntar-pdf/JuntarPdfClient.tsx`
- `app/ferramentas/dividir-pdf/DividirPdfClient.tsx`

### 3.6 Produtos (`views/ProductsPage.tsx`)
- **Slot 1** — Antes do grid de produtos → unidade `si-horizontal-geral`
- **Slot 2** — Após o grid de produtos → unidade `si-horizontal-geral`

### 3.7 Cursos Online (`views/OnlineCoursesPage.tsx`)
- **Slot 1** — Antes do bloco de CTA final → unidade `si-conversao-discreto`

### 3.8 Consultoria (`views/ConsultingPage.tsx`)
- **Slot 1** — Entre os "3 passos" e o formulário de CTA → unidade `si-conversao-discreto`

---

## 4. Como Atualizar o Componente `AdSlot` (após aprovação)

Após a aprovação do AdSense e obtenção dos IDs (`data-ad-slot`) de cada unidade, atualize `components/AdSlot.tsx`.

### 4.1 Novo código do componente

```tsx
'use client';

import { useEffect } from 'react';

type AdUnit =
  | 'si-horizontal-geral'
  | 'si-in-article-blog'
  | 'si-in-feed-blog'
  | 'si-ferramentas-individual'
  | 'si-conversao-discreto';

// Preencher com os data-ad-slot gerados pelo AdSense após aprovação
const AD_SLOTS: Record<AdUnit, string> = {
  'si-horizontal-geral':       'SUBSTITUIR_PELO_ID',
  'si-in-article-blog':        'SUBSTITUIR_PELO_ID',
  'si-in-feed-blog':           'SUBSTITUIR_PELO_ID',
  'si-ferramentas-individual': 'SUBSTITUIR_PELO_ID',
  'si-conversao-discreto':     'SUBSTITUIR_PELO_ID',
};

interface AdSlotProps {
  unit: AdUnit;
  className?: string;
}

export default function AdSlot({ unit, className = '' }: AdSlotProps) {
  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {}
  }, []);

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-3198120470271949"
        data-ad-slot={AD_SLOTS[unit]}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
```

### 4.2 Script no layout ✅ (já adicionado)

O script abaixo já está presente em `app/layout.tsx`:

```html
<Script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3198120470271949"
  crossOrigin="anonymous"
  strategy="afterInteractive"
/>
```

### 4.3 Atualizar as chamadas nos arquivos de view

Substituir todas as ocorrências de:
```tsx
<AdSlot className="..." label="Anúncio" />
```

Pelo formato com a prop `unit` correta. Exemplos:

```tsx
// Home / Ferramentas (hub) / Produtos / Blog (listagem topo)
<AdSlot unit="si-horizontal-geral" className="mb-10" />

// Blog — artigo individual
<AdSlot unit="si-in-article-blog" className="mb-10" />

// Blog — intercalado no feed
<AdSlot unit="si-in-feed-blog" />

// Ferramentas individuais
<AdSlot unit="si-ferramentas-individual" className="mb-6" />

// Cursos e Consultoria
<AdSlot unit="si-conversao-discreto" className="mt-4" />
```

---

## 5. Checklist de Execução

- [x] ~~Adicionar o script `adsbygoogle.js` em `app/layout.tsx`~~ ✅ feito
- [x] ~~Criar `public/ads.txt` com publisher ID~~ ✅ feito (`google.com, pub-3198120470271949, DIRECT, f08c47fec0942fa0`)
- [x] ~~Implementar `<AdSlot>` (placeholders) em todas as páginas~~ ✅ feito
- [ ] Aguardar aprovação do site pelo AdSense
- [ ] Criar as 5 unidades de anúncio no painel do AdSense (seção 2)
- [ ] Anotar os `data-ad-slot` gerados para cada unidade
- [ ] Preencher o mapa `AD_SLOTS` em `components/AdSlot.tsx` com os IDs coletados
- [ ] Atualizar todas as chamadas `<AdSlot>` com a prop `unit` correta (seção 4.3)
- [ ] Fazer deploy final e verificar impressões no painel do AdSense

---

## 6. Referências de Arquivos

| Arquivo                          | Status | Unidades utilizadas                                   |
|----------------------------------|--------|-------------------------------------------------------|
| `components/AdSlot.tsx`          | ⏳     | Componente central — atualizar após aprovação         |
| `app/layout.tsx`                 | ✅     | Script AdSense já inserido                            |
| `public/ads.txt`                 | ✅     | Arquivo de autorização para sites                     |
| `public/app-ads.txt`             | ✅     | Arquivo de autorização para apps                      |
| `views/HomePage.tsx`             | ✅     | `si-horizontal-geral` (×2)                           |
| `views/BlogPage.tsx`             | ✅     | `si-horizontal-geral` (×1) + `si-in-feed-blog` (×N)  |
| `views/BlogPostPage.tsx`         | ✅     | `si-in-article-blog` (×2)                            |
| `views/ToolsPage.tsx`            | ✅     | `si-horizontal-geral` (×2)                           |
| `views/ProductsPage.tsx`         | ✅     | `si-horizontal-geral` (×2)                           |
| `views/OnlineCoursesPage.tsx`    | ✅     | `si-conversao-discreto` (×1)                         |
| `views/ConsultingPage.tsx`       | ✅     | `si-conversao-discreto` (×1)                         |
| `views/FeriasPage.tsx`           | ✅     | `si-ferramentas-individual` (×3)                     |
| `views/CNPJPage.tsx`             | ✅     | `si-ferramentas-individual` (×3)                     |
| `views/PromptPage.tsx`           | ✅     | `si-ferramentas-individual` (×3)                     |
| `app/ferramentas/*/` (demais)    | ✅     | `si-ferramentas-individual` (×2–3 cada)              |
