
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';
import BlogPostCard from '../components/BlogPostCard';
import { fetchVisitors } from '../services/analyticsApi';

const HomePage: React.FC = () => {
  const [visitors, setVisitors] = useState<number | null>(null);
  const [isLoadingVisitors, setIsLoadingVisitors] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const loadVisitors = async () => {
      setIsLoadingVisitors(true);
      const totalVisitors = await fetchVisitors();
      if (isMounted) {
        setVisitors(totalVisitors);
        setIsLoadingVisitors(false);
      }
    };

    loadVisitors();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="home-modern bg-gray-900">
      <style>{`
        @keyframes homeFadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes homeFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        @keyframes homeLogoPulse {
          0%,
          100% {
            transform: scale(1);
            filter: drop-shadow(0 0 0 rgba(34, 211, 238, 0));
          }
          50% {
            transform: scale(1.035);
            filter: drop-shadow(0 0 20px rgba(34, 211, 238, 0.26));
          }
        }

        @keyframes homeShimmer {
          from {
            transform: translateX(-120%);
          }
          to {
            transform: translateX(120%);
          }
        }

        .home-modern .home-fade-in {
          opacity: 0;
          animation: homeFadeInUp 0.75s cubic-bezier(0.22, 0.8, 0.26, 1) forwards;
        }

        .home-modern .home-delay-1 { animation-delay: 0.1s; }
        .home-modern .home-delay-2 { animation-delay: 0.2s; }
        .home-modern .home-delay-3 { animation-delay: 0.3s; }
        .home-modern .home-delay-4 { animation-delay: 0.4s; }

        .home-modern .home-float {
          animation: homeFloat 5.5s ease-in-out infinite;
        }

        .home-modern .home-logo-animated {
          animation: homeFadeInUp 0.75s cubic-bezier(0.22, 0.8, 0.26, 1) forwards,
            homeFloat 5.5s ease-in-out 0.75s infinite,
            homeLogoPulse 3.2s ease-in-out 0.75s infinite;
        }

        .home-modern .home-hover-lift {
          transition: transform 280ms ease, box-shadow 280ms ease, border-color 280ms ease;
        }

        .home-modern .home-hover-lift:hover {
          transform: translateY(-4px);
        }

        .home-modern .home-shimmer-btn {
          position: relative;
          overflow: hidden;
        }

        .home-modern .home-shimmer-btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 40%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          transform: translateX(-120%);
          transition: none;
          pointer-events: none;
        }

        .home-modern .home-shimmer-btn:hover::after {
          animation: homeShimmer 0.9s ease;
        }

        @media (prefers-reduced-motion: reduce) {
          .home-modern .home-fade-in,
          .home-modern .home-float,
          .home-modern .home-logo-animated,
          .home-modern .home-hover-lift,
          .home-modern .home-shimmer-btn::after {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative text-center py-20 sm:py-32 px-4 bg-gradient-to-b from-gray-800 to-gray-900">
         <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"></div>
         <div className="pointer-events-none absolute -top-16 left-1/3 h-60 w-60 rounded-full bg-cyan-500/10 blur-3xl"></div>
         <div className="pointer-events-none absolute -bottom-10 right-1/4 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl"></div>
         <div className="relative z-10 max-w-4xl mx-auto">
            <div className="mb-8 flex justify-center">
              <img 
                src="/assets/images/logotipo.png" 
                alt="Soluções Inteligentes 83 Logo" 
                className="mx-auto h-28 sm:h-36 md:h-44 w-auto home-logo-animated"
              />
            </div>
            <h1 className="home-fade-in home-delay-1 text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
                <span className="block">Inteligência Artificial,</span>
                <span className="block text-cyan-400">Soluções Reais.</span>
            </h1>
            <p className="home-fade-in home-delay-2 mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-300">
                Descomplicando o futuro com IA. Nossas ferramentas automatizam tarefas, impulsionam suas vendas e otimizam seu tempo para que você possa focar no que realmente importa.
            </p>
            <div className="home-fade-in home-delay-3 mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                <Link
                to="/cursos-online"
                    className="home-shimmer-btn home-hover-lift px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 md:py-4 md:text-lg md:px-10 transition-transform transform hover:scale-105"
                >
                Conheca o Curso Programando com I.A.
                </Link>
            </div>
            <div className="home-fade-in home-delay-4 mt-8 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/40 bg-gray-800/70 text-sm sm:text-base text-cyan-200">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-cyan-400"></span>
              <span>
                Visitantes (total):{' '}
                <strong className="text-white">
                  {isLoadingVisitors
                    ? 'carregando...'
                    : visitors !== null
                      ? visitors.toLocaleString('pt-BR')
                      : 'indisponível'}
                </strong>
                {' '}<span className="text-cyan-300">• Desde 9 FEV 26</span>
              </span>
            </div>
         </div>
      </section>

      {/* Online Course Highlight Section */}
      <section className="py-14 bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-cyan-400/25 bg-gradient-to-br from-gray-800/85 to-gray-900/85 p-7 sm:p-10 shadow-xl home-hover-lift">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              <div className="lg:col-span-8">
                <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">Cursos Online</p>
                <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">Programando com I.A. para Iniciantes</h2>
                <p className="mt-4 text-lg text-gray-300 leading-relaxed">
                  Troque a travação por prática guiada: aprenda do zero com apoio da Inteligência Artificial,
                  construa seu primeiro projeto real e acelere sua evolução com um método direto ao ponto.
                </p>
                <div className="mt-6">
                  <Link
                    to="/cursos-online"
                    className="home-shimmer-btn inline-flex items-center justify-center px-7 py-3.5 rounded-lg bg-cyan-600 text-white text-lg font-semibold hover:bg-cyan-700 transition-colors"
                  >
                    Ver detalhes do curso
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="rounded-xl border border-cyan-400/25 bg-gray-950/70 p-3">
                  <div className="aspect-video w-full overflow-hidden rounded-lg">
                    <img
                      src="/assets/images/coruja.png"
                      alt="Curso Programando com I.A. para Iniciantes"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Consulting Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800 border-y border-cyan-500/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="home-fade-in rounded-2xl border border-cyan-400/25 bg-gradient-to-br from-gray-800/90 to-gray-900/90 p-8 sm:p-10 lg:p-12 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              <div className="lg:col-span-7 home-fade-in home-delay-1">
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                  Consultoria em I.A. para soluções sob medida
                </h3>
                <p className="mt-4 text-lg text-gray-300 leading-relaxed">
                  Precisa de um software específico para sua demanda? Nós analisamos o seu cenário,
                  propomos uma solução ideal e orientamos todo o processo para transformar a ideia em um resultado real.
                </p>
                <img
                  src="/assets/images/consultoria.png"
                  alt="Consultoria em Inteligência Artificial"
                  className="mt-6 w-full max-w-lg rounded-xl border border-cyan-400/20 home-hover-lift"
                />
              </div>

              <div className="lg:col-span-5 rounded-xl border border-cyan-400/30 bg-gray-900/70 p-7 sm:p-8 lg:p-9 min-h-[430px] flex flex-col justify-between shadow-lg home-fade-in home-delay-2 home-hover-lift">
                <div>
                  <h4 className="text-3xl font-extrabold text-white">Como funciona</h4>
                  <ul className="mt-6 space-y-5 text-xl text-gray-200 leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-cyan-400"></span>
                    <span>Você descreve sua necessidade e o objetivo do projeto.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-cyan-400"></span>
                    <span>Planejamos uma solução personalizada com IA para seu negócio.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-cyan-400"></span>
                    <span>Entramos em contato para avançar com próximos passos.</span>
                  </li>
                </ul>
                <div className="mt-8 flex justify-center" aria-hidden="true">
                  <img
                    src="/assets/images/logotipo2.png"
                    alt=""
                    className="h-28 w-28 rounded-full border border-cyan-400/30 p-1 shadow-md shadow-cyan-900/30 home-float"
                  />
                </div>
                </div>

                <Link
                  to="/consultoria"
                  className="home-shimmer-btn mt-8 inline-flex w-full items-center justify-center px-7 py-3.5 rounded-lg bg-cyan-600 text-white text-lg font-semibold hover:bg-cyan-700 transition-colors home-hover-lift"
                >
                  Conhecer Consultoria em I.A.
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suggestions Section */}
      <section className="py-16 bg-gradient-to-r from-cyan-900/20 via-purple-900/20 to-cyan-900/20 border-y border-cyan-500/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-400/30 backdrop-blur-sm p-8 sm:p-12">
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 animate-pulse"></div>
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Tem uma Ideia? Compartilhe Conosco!
              </h3>
              
              <p className="text-lg sm:text-xl text-cyan-100 mb-6 max-w-2xl mx-auto">
                Queremos ouvir <span className="font-bold text-cyan-300">você</span>! 
                Qual problema você gostaria de resolver com Inteligência Artificial? 
                Suas sugestões são fundamentais para criarmos as próximas soluções inteligentes.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 mb-8 max-w-3xl mx-auto">
                <div className="bg-gray-800/50 rounded-lg p-4 border border-cyan-400/20">
                  <div className="text-3xl mb-2">💡</div>
                  <p className="text-sm text-gray-300">Sugira novas ferramentas</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 border border-cyan-400/20">
                  <div className="text-3xl mb-2">🎯</div>
                  <p className="text-sm text-gray-300">Proponha novos recursos</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 border border-cyan-400/20">
                  <div className="text-3xl mb-2">🚀</div>
                  <p className="text-sm text-gray-300">Ajude a moldar o futuro</p>
                </div>
              </div>
              
              <div className="mt-8">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSefilKN4FAEBcBkJNLZOIzUJBqe0SHY7tW2t3ZqTN2dXXWW0g/viewform?usp=publish-editor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-shimmer-btn inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300"
                >
                  💬 Envie Sua Sugestão Agora
                </a>
              </div>
              
              <p className="mt-6 text-sm text-gray-400 italic">
                Todas as ideias são bem-vindas! Juntos, construímos soluções que realmente importam.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Blog Section */}
      <section id="blog" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Últimas do Nosso Blog</h2>
                <p className="mt-4 text-lg text-gray-400">Notícias, tendências e dicas práticas sobre o universo da IA.</p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                {BLOG_POSTS.slice(0, 2).map((post) => (
                    <BlogPostCard key={post.slug} post={post} />
                ))}
            </div>
            <div className="mt-10 text-center">
                 <Link
                    to="/blog"
                    className="inline-block px-6 py-3 border border-cyan-500 text-base font-medium rounded-md text-cyan-400 hover:bg-cyan-500 hover:text-white transition"
                >
                    Ver Todos os Posts
                </Link>
            </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
