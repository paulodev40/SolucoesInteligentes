# Instruções de Atualização — Google AdSense

**Publisher ID:** `ca-pub-3198120470271949`

---

## Status atual

- ✅ Script `adsbygoogle.js` adicionado em `app/layout.tsx`
- ✅ `public/ads.txt` criado com publisher ID correto
- ✅ `public/app-ads.txt` atualizado com publisher ID correto
- ✅ Slots `<AdSlot>` implementados em todas as páginas (placeholders visuais)
- ✅ **5 unidades de anúncio criadas no painel do AdSense**
- ⏳ Aguardando aprovação do site pelo AdSense para ativar os anúncios reais

---

## 1. IDs das Unidades de Anúncio (data-ad-slot)

| Unidade                    | Tipo              | `data-ad-slot` |
|----------------------------|-------------------|----------------|
| `si-horizontal-geral`      | Display Responsivo | `4454955178`   |
| `si-in-article-blog`       | In-article        | `7064511494`   |
| `si-in-feed-blog`          | In-feed           | `5341537140`   |
| `si-ferramentas-individual`| Display Responsivo | `7069510224`   |
| `si-conversao-discreto`    | Display Responsivo | `7994449781`   |

---

## 2. Atualizar `components/AdSlot.tsx`

Substituir o componente atual pelo código abaixo, preenchendo o mapa `AD_SLOTS` com os IDs acima:

```tsx
'use client';

import { useEffect } from 'react';

type AdUnit =
  | 'si-horizontal-geral'
  | 'si-in-article-blog'
  | 'si-in-feed-blog'
  | 'si-ferramentas-individual'
  | 'si-conversao-discreto';

const AD_SLOTS: Record<AdUnit, string> = {
  'si-horizontal-geral':       '4454955178',
  'si-in-article-blog':        '7064511494',
  'si-in-feed-blog':           '5341537140',
  'si-ferramentas-individual': '7069510224',
  'si-conversao-discreto':     '7994449781',
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

---

## 3. Atualizar chamadas `<AdSlot>` nas views

Substituir todas as ocorrências de `<AdSlot className="..." label="Anúncio" />` pela versão com a prop `unit` correta:

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

## 4. Posições dos Anúncios por Página

### 4.1 Home — `views/HomePage.tsx`
- Slot 1 — Entre "Caça ao Bug" e "Últimas Notícias" → `si-horizontal-geral`
- Slot 2 — Entre "Notícias" e "Blog" → `si-horizontal-geral`

### 4.2 Blog — Listagem `views/BlogPage.tsx`
- Slot 1 — Acima do grid de posts → `si-horizontal-geral`
- Slot 2 — Intercalado no grid a cada 6 posts (span full-width) → `si-in-feed-blog`

### 4.3 Blog — Artigo individual `views/BlogPostPage.tsx`
- Slot 1 — Entre a imagem de capa e o corpo do artigo → `si-in-article-blog`
- Slot 2 — Ao final do artigo, antes do bloco de produto relacionado → `si-in-article-blog`

### 4.4 Ferramentas — Hub `views/ToolsPage.tsx`
- Slot 1 — Antes do grid de ferramentas interativas → `si-horizontal-geral`
- Slot 2 — Entre ferramentas interativas e ferramentas de IA externas → `si-horizontal-geral`

### 4.5 Ferramentas — Páginas individuais `/ferramentas/*`
Cada ferramenta já possui 2–3 slots implementados. Usar `si-ferramentas-individual` em todos.

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

### 4.6 Produtos — `views/ProductsPage.tsx`
- Slot 1 — Antes do grid de produtos → `si-horizontal-geral`
- Slot 2 — Após o grid de produtos → `si-horizontal-geral`

### 4.7 Cursos Online — `views/OnlineCoursesPage.tsx`
- Slot 1 — Antes do bloco de CTA final → `si-conversao-discreto`

### 4.8 Consultoria — `views/ConsultingPage.tsx`
- Slot 1 — Entre os "3 passos" e o formulário de CTA → `si-conversao-discreto`

---

## 5. Script no layout (já adicionado ✅)

```html
<Script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3198120470271949"
  crossOrigin="anonymous"
  strategy="afterInteractive"
/>
```

---

## 6. Checklist de Execução

- [x] Script `adsbygoogle.js` em `app/layout.tsx`
- [x] `public/ads.txt` com publisher ID
- [x] `<AdSlot>` (placeholders) em todas as páginas
- [x] 5 unidades de anúncio criadas no AdSense
- [ ] Aguardar aprovação do site pelo AdSense
- [ ] Preencher `AD_SLOTS` em `components/AdSlot.tsx` com os IDs da seção 1
- [ ] Atualizar todas as chamadas `<AdSlot>` com a prop `unit` correta (seção 3)
- [ ] Fazer deploy final
- [ ] Verificar impressões no painel do AdSense