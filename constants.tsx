
import React from 'react';
import type { Product, BlogPost, Testimonial } from './types';
import { CopyMasterProIcon, SlideGeniusIcon, ReadWriteIcon, RememberMeIcon } from './components/IconComponents';

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Produtos', path: '/produtos' },
  { name: 'Blog', path: '/blog' },
  { name: 'Sobre', path: '/sobre' },
  { name: 'Contato', path: '/contato' },
];

export const PRODUCTS: Product[] = [
  {
    slug: 'copymaster-pro',
    name: 'CopyMaster Pro',
    tagline: 'Crie textos, imagens e vídeos que vendem no automático com IA.',
    description: 'A ferramenta definitiva para marketing digital. Gere conteúdo persuasivo em segundos, desde copys para anúncios até roteiros de vídeo, tudo otimizado para conversão.',
    problem: 'Dificuldade em criar conteúdo de marketing eficaz e em escala, resultando em baixas vendas e engajamento.',
    targetAudience: 'Empreendedores digitais, agências de marketing, freelancers e gestores de e-commerce.',
    useCases: [
      'Gerar copys para anúncios no Facebook e Instagram.',
      'Criar imagens de produtos com apelo visual.',
      'Desenvolver roteiros para vídeos de vendas.',
      'Escrever e-mails de marketing que convertem.',
    ],
    icon: CopyMasterProIcon,
  },
  {
    slug: 'slidegenius',
    name: 'SlideGenius',
    tagline: 'Gere apresentações prontas com imagens em poucos cliques.',
    description: 'Transforme suas ideias em apresentações profissionais e visualmente impactantes. A IA cuida do design e da busca de imagens, para que você foque no conteúdo.',
    problem: 'Perda de tempo excessiva na formatação e design de slides, resultando em apresentações monótonas.',
    targetAudience: 'Estudantes, profissionais corporativos, palestrantes e consultores.',
    useCases: [
      'Criar apresentações para reuniões de negócios.',
      'Desenvolver slides para aulas e seminários.',
      'Montar pitches de vendas para investidores.',
      'Elaborar relatórios visuais de resultados.',
    ],
    icon: SlideGeniusIcon,
  },
  {
    slug: 'read-write',
    name: 'Read&Write',
    tagline: 'Grave reuniões, transcreva e gere atas organizadas automaticamente.',
    description: 'Nunca mais perca uma informação importante. Grave suas reuniões, obtenha transcrições precisas e receba uma ata com os principais pontos e ações a serem tomadas.',
    problem: 'Dificuldade em tomar notas durante reuniões e organizar as decisões e tarefas discutidas.',
    targetAudience: 'Gerentes de projeto, equipes remotas, executivos e qualquer pessoa que participe de reuniões.',
    useCases: [
      'Gravar e transcrever entrevistas com clientes.',
      'Gerar atas automáticas de reuniões de equipe.',
      'Documentar decisões importantes de brainstormings.',
      'Manter um registro pesquisável de todas as conversas.',
    ],
    icon: ReadWriteIcon,
  },
  {
    slug: 'rememberme',
    name: 'RememberMe',
    tagline: 'Restaure e colore fotos antigas com qualidade profissional usando IA.',
    description: 'Resgate suas memórias mais preciosas. Nossa IA remove arranhões, melhora a nitidez e adiciona cores vibrantes a fotos antigas, trazendo o passado de volta à vida.',
    problem: 'Fotos de família antigas estão danificadas, desbotadas ou em preto e branco, perdendo seu valor emocional.',
    targetAudience: 'Famílias, entusiastas de genealogia, fotógrafos e qualquer pessoa que queira preservar memórias.',
    useCases: [
      'Colorir fotos em preto e branco de avós e bisavós.',
      'Restaurar fotos de infância danificadas pelo tempo.',
      'Melhorar a qualidade de imagens antigas para impressão.',
      'Criar presentes emocionantes e personalizados.',
    ],
    icon: RememberMeIcon,
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: '5-jeitos-de-usar-ia-para-vender-mais',
    title: '5 jeitos de usar IA para vender mais no Instagram',
    author: 'Equipe Soluções Inteligentes',
    date: '10 de Julho de 2024',
    category: 'Marketing e Vendas com IA',
    excerpt: 'Descubra como a inteligência artificial pode turbinar suas estratégias de vendas no Instagram, desde a criação de conteúdo até a análise de resultados.',
    content: `
      <p class="mb-4">O Instagram é uma potência para vendas, mas se destacar exige criatividade e consistência. A Inteligência Artificial (IA) surge como uma aliada poderosa para automatizar tarefas e otimizar suas campanhas. Aqui estão 5 maneiras práticas de usá-la:</p>
      <h3 class="text-xl font-bold text-cyan-400 mb-2">1. Geração de Legendas (Copys) Persuasivas</h3>
      <p class="mb-4">Criar legendas que engajam e vendem é um desafio. Ferramentas de IA podem analisar seu público e gerar textos com a linguagem e os gatilhos mentais certos para converter.</p>
      <h3 class="text-xl font-bold text-cyan-400 mb-2">2. Criação de Imagens e Vídeos para Anúncios</h3>
      <p class="mb-4">Não tem um designer? Sem problemas. A IA pode gerar imagens e até vídeos curtos para seus anúncios, com base em descrições simples. Isso permite testar diferentes criativos rapidamente.</p>
      <h3 class="text-xl font-bold text-cyan-400 mb-2">3. Análise de Sentimento dos Comentários</h3>
      <p class="mb-4">Entenda o que seu público realmente pensa. A IA pode analisar os comentários em seus posts e classificar o sentimento (positivo, negativo, neutro), fornecendo insights valiosos sobre seus produtos e marca.</p>
      <h3 class="text-xl font-bold text-cyan-400 mb-2">4. Otimização de Hashtags</h3>
      <p class="mb-4">Encontrar as hashtags certas é crucial para o alcance. Ferramentas de IA analisam tendências e sugerem as hashtags mais relevantes para cada post, aumentando sua visibilidade.</p>
      <h3 class="text-xl font-bold text-cyan-400 mb-2">5. Agendamento Inteligente de Posts</h3>
      <p class="mb-4">A IA pode analisar os padrões de atividade dos seus seguidores e determinar os melhores horários para postar, maximizando o engajamento e o alcance de cada publicação.</p>
      <div class="mt-6 p-4 bg-gray-800 rounded-lg border border-cyan-500">
        <h4 class="font-bold text-lg text-white">Como isso te ajuda?</h4>
        <p class="text-gray-300">Ferramentas como o <strong>CopyMaster Pro</strong> integram várias dessas funcionalidades, permitindo que você crie textos, imagens e vídeos de alta conversão de forma automatizada. Experimente e veja suas vendas no Instagram decolarem.</p>
      </div>
    `,
    imageUrl: 'https://picsum.photos/seed/instagram/800/400',
    relatedProductSlug: 'copymaster-pro',
  },
  {
    slug: 'como-montar-uma-apresentacao-em-10-minutos',
    title: 'Como montar uma apresentação em 10 minutos com IA',
    author: 'Equipe Soluções Inteligentes',
    date: '08 de Julho de 2024',
    category: 'Apresentações e Reuniões Inteligentes',
    excerpt: 'Aprenda o passo a passo para criar apresentações profissionais e visualmente atraentes em tempo recorde, deixando a IA fazer o trabalho pesado.',
    content: `
      <p class="mb-4">Reunião de última hora? Precisa de uma apresentação para ontem? A Inteligência Artificial pode ser sua salvação. Com as ferramentas certas, é possível criar slides impactantes em apenas 10 minutos.</p>
      <h3 class="text-xl font-bold text-cyan-400 mb-2">Passo 1: Defina seu Tópico (2 minutos)</h3>
      <p class="mb-4">Escreva um breve resumo ou os pontos principais que você quer abordar. A IA usará isso como base para estruturar toda a apresentação.</p>
      <h3 class="text-xl font-bold text-cyan-400 mb-2">Passo 2: Gere o Conteúdo dos Slides (4 minutos)</h3>
      <p class="mb-4">Insira seu resumo na ferramenta de IA. Ela irá expandir seus pontos em slides individuais, com títulos, tópicos e até sugestões de texto para cada um.</p>
      <h3 class="text-xl font-bold text-cyan-400 mb-2">Passo 3: Design e Imagens Automáticas (3 minutos)</h3>
      <p class="mb-4">A IA irá sugerir um layout, paleta de cores e fontes profissionais. Além disso, ela buscará e inserirá imagens de alta qualidade que sejam relevantes para o conteúdo de cada slide, economizando um tempo precioso.</p>
      <h3 class="text-xl font-bold text-cyan-400 mb-2">Passo 4: Revisão Final (1 minuto)</h3>
      <p class="mb-4">Dê uma última olhada, ajuste pequenos detalhes se necessário e sua apresentação está pronta para impressionar.</p>
      <div class="mt-6 p-4 bg-gray-800 rounded-lg border border-cyan-500">
        <h4 class="font-bold text-lg text-white">Como isso te ajuda?</h4>
        <p class="text-gray-300">O <strong>SlideGenius</strong> foi projetado exatamente para isso. Ele transforma suas ideias em apresentações prontas e com design profissional em poucos cliques. Diga adeus às horas gastas no PowerPoint e foque no que realmente importa: sua mensagem.</p>
      </div>
    `,
    imageUrl: 'https://picsum.photos/seed/slides/800/400',
    relatedProductSlug: 'slidegenius',
  },
  {
    slug: 'ia-em-reunioes',
    title: 'IA em reuniões: nunca mais perca decisões importantes',
    author: 'Equipe Soluções Inteligentes',
    date: '05 de Julho de 2024',
    category: 'Apresentações e Reuniões Inteligentes',
    excerpt: 'Veja como a IA está revolucionando as reuniões, garantindo que todas as informações sejam capturadas, organizadas e transformadas em ações claras.',
    content: `
      <p class="mb-4">Reuniões são essenciais, mas muitas vezes improdutivas. Decisões se perdem, tarefas são esquecidas e o tempo é desperdiçado. A IA pode mudar esse cenário drasticamente.</p>
      <h3 class="text-xl font-bold text-cyan-400 mb-2">Transcrição em Tempo Real</h3>
      <p class="mb-4">Esqueça a necessidade de um anotador. A IA pode transcrever toda a conversa em tempo real, identificando quem disse o quê. Isso permite que todos participem ativamente da discussão.</p>
      <h3 class="text-xl font-bold text-cyan-400 mb-2">Resumos e Atas Automáticas</h3>
      <p class="mb-4">Ao final da reunião, a IA analisa a transcrição e gera um resumo com os pontos-chave, as decisões tomadas e uma lista de tarefas com os responsáveis e prazos. A ata fica pronta instantaneamente.</p>
      <h3 class="text-xl font-bold text-cyan-400 mb-2">Busca Inteligente</h3>
      <p class="mb-4">Precisa lembrar o que foi decidido sobre o "projeto X" há três meses? Com todas as reuniões transcritas, você pode simplesmente pesquisar por palavras-chave e encontrar a informação exata em segundos.</p>
      <div class="mt-6 p-4 bg-gray-800 rounded-lg border border-cyan-500">
        <h4 class="font-bold text-lg text-white">Como isso te ajuda?</h4>
        <p class="text-gray-300">O <strong>Read&Write</strong> é a solução perfeita para reuniões mais inteligentes. Ele grava, transcreve e gera atas organizadas, garantindo que nenhuma informação valiosa seja perdida e que todas as equipes estejam alinhadas.</p>
      </div>
    `,
    imageUrl: 'https://picsum.photos/seed/meeting/800/400',
    relatedProductSlug: 'read-write',
  },
  {
    slug: 'como-a-ia-esta-resgatando-memorias',
    title: 'Como a IA está resgatando memórias em fotos antigas',
    author: 'Equipe Soluções Inteligentes',
    date: '02 de Julho de 2024',
    category: 'Memória e Imagem',
    excerpt: 'A tecnologia de IA está trazendo o passado de volta à vida, restaurando fotos danificadas e colorindo imagens em preto e branco com um realismo impressionante.',
    content: `
      <p class="mb-4">Caixas de sapatos cheias de fotos antigas guardam nossas histórias mais preciosas. No entanto, o tempo é implacável: fotos rasgam, desbotam e perdem sua cor. A Inteligência Artificial oferece uma maneira mágica de reverter esses danos.</p>
      <h3 class="text-xl font-bold text-cyan-400 mb-2">Restauração de Danos</h3>
      <p class="mb-4">Algoritmos de IA são treinados para identificar e corrigir imperfeições como arranhões, dobras e manchas. Eles "preenchem" as áreas danificadas de forma inteligente, resultando em uma imagem limpa e restaurada.</p>
      <h3 class="text-xl font-bold text-cyan-400 mb-2">Colorização Realista</h3>
      <p class="mb-4">O processo mais impressionante é a colorização. A IA analisa os tons de cinza e, com base em um vasto banco de dados de imagens coloridas, aplica cores que são historicamente precisas e realistas, desde o tom da pele até a cor das roupas.</p>
      <h3 class="text-xl font-bold text-cyan-400 mb-2">Aumento de Resolução (Upscaling)</h3>
      <p class="mb-4">Fotos antigas geralmente têm baixa resolução. A IA pode aumentar a nitidez e o detalhe da imagem, permitindo que sejam impressas em tamanhos maiores sem perder a qualidade.</p>
      <div class="mt-6 p-4 bg-gray-800 rounded-lg border border-cyan-500">
        <h4 class="font-bold text-lg text-white">Como isso te ajuda?</h4>
        <p class="text-gray-300">Com o <strong>RememberMe</strong>, você pode fazer tudo isso de forma fácil e rápida. Basta enviar sua foto antiga e deixar nossa IA fazer a mágica. É a maneira perfeita de preservar e compartilhar suas memórias com as novas gerações.</p>
      </div>
    `,
    imageUrl: 'https://picsum.photos/seed/memories/800/400',
    relatedProductSlug: 'rememberme',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Ana Costa',
    role: 'Gerente de Marketing',
    quote: 'O CopyMaster Pro transformou nossa produção de conteúdo. Criamos campanhas 3x mais rápido e o engajamento nunca foi tão alto. Essencial!',
    imageUrl: 'https://picsum.photos/seed/ana/100',
    productUsed: 'CopyMaster Pro',
  },
  {
    name: 'Bruno Lima',
    role: 'Consultor de Negócios',
    quote: 'Com o SlideGenius, minhas apresentações passaram para outro nível. Economizo horas e o resultado final é sempre impressionante e profissional.',
    imageUrl: 'https://picsum.photos/seed/bruno/100',
    productUsed: 'SlideGenius',
  },
  {
    name: 'Carla Dias',
    role: 'Coordenadora de Projetos',
    quote: 'O Read&Write é indispensável para nossa equipe remota. As atas automáticas garantem que todos estejam alinhados, sem perder nenhuma decisão.',
    imageUrl: 'https://picsum.photos/seed/carla/100',
    productUsed: 'Read&Write',
  },
];
