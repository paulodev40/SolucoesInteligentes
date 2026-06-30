'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { PRODUCTS } from '../constants';
import NotFoundPage from './NotFoundPage';

const ProductDetailPage: React.FC = () => {
  const params = useParams();
  const slug = params?.slug as string | undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) return <NotFoundPage />;

  const Icon = product.icon;

  const trialHref =
    product.slug === 'macaquito-runner'
      ? 'https://apps.apple.com/br/app/macaquito/id6769919474'
      : product.slug === 'briefy'
        ? 'https://briefy-site.vercel.app/'
        : product.slug === 'wordclimb'
          ? 'https://word-climb-beta.vercel.app/'
          : product.slug === 'anaflow-keys'
            ? 'https://www.anaflowkeys.com/'
            : '#';

  const hasExternalLink = trialHref !== '#';
  const isAppStore = product.slug === 'macaquito-runner' || product.slug === 'briefy' || product.slug === 'anaflow-keys';

  return (
    <section className="relative py-20 sm:py-24 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-12 lg:gap-10 items-start">
          <div className="lg:col-span-7 reveal">
            <div className="flex items-center gap-5 mb-6">
              <Icon className="h-16 w-16 text-si-cyan flex-shrink-0" />
              <div>
                <div className="section-label">Produto</div>
                <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-si-text leading-tight">
                  {product.name}
                </h1>
                <p className="mt-2 text-lg text-si-cyan font-mono">{product.tagline}</p>
              </div>
            </div>

            <p className="text-lg text-si-muted leading-relaxed">{product.description}</p>

            {hasExternalLink && (
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={trialHref} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  {isAppStore ? 'Baixar na App Store →' : 'Faça teste gratuito →'}
                </a>
              </div>
            )}
          </div>

          <div className="mt-12 lg:mt-0 lg:col-span-5 reveal" style={{ transitionDelay: '0.1s' }}>
            <div className="surface p-7 sm:p-8 space-y-6">
              <div>
                <h3 className="font-display font-bold text-xl text-si-text flex items-center gap-3">
                  <i className="fas fa-bullseye text-si-cyan" /> Problema que resolve
                </h3>
                <p className="mt-2 text-si-muted">{product.problem}</p>
              </div>
              <div className="border-t border-[var(--border)]" />
              <div>
                <h3 className="font-display font-bold text-xl text-si-text flex items-center gap-3">
                  <i className="fas fa-users text-si-cyan" /> Para quem é
                </h3>
                <p className="mt-2 text-si-muted">{product.targetAudience}</p>
              </div>
              <div className="border-t border-[var(--border)]" />
              <div>
                <h3 className="font-display font-bold text-xl text-si-text flex items-center gap-3">
                  <i className="fas fa-check-circle text-si-cyan" /> Exemplos de uso
                </h3>
                <ul className="mt-3 space-y-2">
                  {product.useCases.map((useCase, index) => (
                    <li key={index} className="flex items-start gap-3 text-si-muted">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-si-cyan flex-shrink-0"
                        style={{ boxShadow: '0 0 6px var(--cyan)' }} />
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Visão geral aprofundada */}
        {product.overview && (
          <div className="mt-16 reveal">
            <div className="section-label">Visão geral</div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-si-text mb-4">
              Sobre o {product.name}
            </h2>
            <p className="text-lg text-si-muted leading-relaxed max-w-4xl">{product.overview}</p>
          </div>
        )}

        {/* Funcionalidades */}
        {product.features && product.features.length > 0 && (
          <div className="mt-14 reveal">
            <div className="section-label">Funcionalidades</div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-si-text mb-6">
              O que o {product.name} oferece
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.features.map((feature, index) => (
                <div key={index} className="surface p-5 flex items-start gap-4">
                  <i className="fas fa-bolt text-si-cyan mt-1 flex-shrink-0" />
                  <span className="text-si-muted">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ */}
        {product.faq && product.faq.length > 0 && (
          <div className="mt-14 reveal">
            <div className="section-label">Perguntas frequentes</div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-si-text mb-6">
              Dúvidas comuns sobre o {product.name}
            </h2>
            <div className="space-y-4 max-w-4xl">
              {product.faq.map((item, index) => (
                <div key={index} className="surface p-6">
                  <h3 className="font-display font-bold text-lg text-si-text flex items-start gap-3">
                    <i className="fas fa-circle-question text-si-cyan mt-1 flex-shrink-0" />
                    {item.q}
                  </h3>
                  <p className="mt-3 text-si-muted leading-relaxed pl-8">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 text-center">
          <Link href="/produtos" className="btn-ghost">
            <i className="fas fa-arrow-left mr-2" /> Voltar para todos os produtos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailPage;
