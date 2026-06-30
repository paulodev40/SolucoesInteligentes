// Fix: Import `ComponentType` to resolve 'React' namespace error.
import type { ComponentType } from 'react';

export interface FaqItem {
  q: string;
  a: string;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  problem: string;
  targetAudience: string;
  useCases: string[];
  /** Texto longo opcional com a visão geral aprofundada do produto. */
  overview?: string;
  /** Principais funcionalidades do produto. */
  features?: string[];
  /** Perguntas frequentes específicas do produto. */
  faq?: FaqItem[];
  /** Plataforma (ex.: "iOS", "Web") usada nos cards de listagem. */
  platform?: string;
  // Fix: Use `ComponentType` instead of `React.ComponentType`.
  icon: ComponentType<{ className?: string }>;
  image?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  relatedProductSlug?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  imageUrl: string;
  productUsed: string;
}
