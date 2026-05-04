import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import NotFoundPage from './NotFoundPage';

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) return <NotFoundPage />;

  const isSlideGeniusUnavailable = product.slug === 'slidegenius';
  const Icon = product.icon;

  const planButtons =
    product.slug === 'copymaster-pro'
      ? [
          { label: 'Basic', href: 'https://pay.kiwify.com.br/BadUXsr' },
          { label: 'Pro', href: 'https://pay.kiwify.com.br/p3buLC7' },
        ]
      : product.slug === 'slidegenius'
        ? [
            { label: 'Basic', href: 'https://pay.kiwify.com.br/uEquEjp' },
            { label: 'Plus', href: 'https://pay.kiwify.com.br/pdMtBm4' },
            { label: 'Pro', href: 'https://pay.kiwify.com.br/U5cVhL5' },
          ]
        : product.slug === 'read-write'
          ? [
              { label: 'Basic', href: 'https://pay.kiwify.com.br/rOo2dmI' },
              { label: 'Pro', href: 'https://pay.kiwify.com.br/JKEpzY1' },
              { label: 'Business', href: 'https://pay.kiwify.com.br/8SQLEgM' },
            ]
          : [];

  const videoEmbedId =
    product.slug === 'copymaster-pro'
      ? 'D_86O9BsSUw'
      : product.slug === 'slidegenius'
        ? 'CMEhFIfeC-s'
        : product.slug === 'read-write'
          ? 'vnTgHZIZO1g'
          : null;

  const trialHref =
    product.slug === 'copymaster-pro'
      ? 'https://copymasterpro.com/'
      : product.slug === 'read-write'
        ? 'https://geraata.com/'
        : product.slug === 'briefy'
          ? 'https://briefy-site.vercel.app/'
          : '#';

  return (
    <section className="relative py-20 sm:py-24 px-5">
      <div className="max-w-7xl mx-auto">
        {(product.slug === 'rememberme' || product.slug === 'scei') && (
          <div className="mb-8 flex justify-center reveal">
            <span className="badge badge--yellow">🚧 Em Construção</span>
          </div>
        )}

        <div className="lg:grid lg:grid-cols-12 lg:gap-10 items-start">
          <div className="lg:col-span-7 reveal">
            <div className="flex items-center gap-5 mb-6">
              {product.slug === 'copymaster-pro' ? (
                <img src="/assets/images/corujasabia.jpeg" alt={product.name}
                  className="h-24 w-24 object-cover rounded-full border-2 border-si-cyan flex-shrink-0"
                  style={{ boxShadow: '0 0 24px var(--cyan-glow)' }} />
              ) : product.slug === 'slidegenius' ? (
                <img src="/assets/images/mascote-camaleao.png" alt={product.name}
                  className="h-24 w-24 object-cover rounded-full border-2 border-si-cyan flex-shrink-0"
                  style={{ boxShadow: '0 0 24px var(--cyan-glow)' }} />
              ) : product.slug === 'read-write' ? (
                <img src="/assets/images/lobo_guara2.png" alt={product.name}
                  className="h-24 w-24 object-cover rounded-full border-2 border-si-cyan flex-shrink-0"
                  style={{ boxShadow: '0 0 24px var(--cyan-glow)' }} />
              ) : (
                <Icon className="h-16 w-16 text-si-cyan flex-shrink-0" />
              )}
              <div>
                <div className="section-label">Produto</div>
                <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-si-text leading-tight">
                  {product.name}
                </h1>
                <p className="mt-2 text-lg text-si-cyan font-mono">{product.tagline}</p>
              </div>
            </div>

            <p className="text-lg text-si-muted leading-relaxed">{product.description}</p>

            {videoEmbedId && (
              <div className="mt-8 rounded-xl overflow-hidden border border-[var(--border-strong)] bg-[var(--bg)]"
                style={{ boxShadow: '0 0 32px var(--cyan-dim)' }}>
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${videoEmbedId}`}
                    title={`${product.name} Demo`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              {isSlideGeniusUnavailable ? (
                <button type="button" disabled
                  className="btn-primary opacity-60 cursor-not-allowed">
                  Faça teste gratuito
                </button>
              ) : (
                <a href={trialHref}
                  target={product.slug === 'copymaster-pro' || product.slug === 'read-write' || product.slug === 'briefy' ? '_blank' : undefined}
                  rel={product.slug === 'copymaster-pro' || product.slug === 'read-write' || product.slug === 'briefy' ? 'noopener noreferrer' : undefined}
                  className="btn-primary">
                  {product.slug === 'briefy' ? 'Baixar na App Store →' : 'Faça teste gratuito →'}
                </a>
              )}
              {planButtons.map((plan) =>
                isSlideGeniusUnavailable ? (
                  <button key={plan.label} type="button" disabled
                    className="btn-ghost opacity-50 cursor-not-allowed">
                    {plan.label}
                  </button>
                ) : (
                  <a key={plan.label} href={plan.href} target="_blank" rel="noopener noreferrer"
                    className="btn-ghost">
                    {plan.label}
                  </a>
                )
              )}
            </div>
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

        <div className="mt-16 text-center">
          <Link to="/produtos" className="btn-ghost">
            <i className="fas fa-arrow-left mr-2" /> Voltar para todos os produtos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailPage;
