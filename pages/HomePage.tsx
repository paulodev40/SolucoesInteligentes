
import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, BLOG_POSTS, TESTIMONIALS } from '../constants';
import ProductCard from '../components/ProductCard';
import BlogPostCard from '../components/BlogPostCard';
import TestimonialCard from '../components/TestimonialCard';

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-900">
      {/* Hero Section */}
      <section className="relative text-center py-20 sm:py-32 px-4 bg-gradient-to-b from-gray-800 to-gray-900">
         <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"></div>
         <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
                <span className="block">Inteligência Artificial,</span>
                <span className="block text-cyan-400">Soluções Reais.</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-300">
                Descomplicando o futuro com IA. Nossas ferramentas automatizam tarefas, impulsionam suas vendas e otimizam seu tempo para que você possa focar no que realmente importa.
            </p>
            <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                <Link
                    to="/produtos"
                    className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 md:py-4 md:text-lg md:px-10 transition-transform transform hover:scale-105"
                >
                    Conheça Nossos Produtos
                </Link>
            </div>
         </div>
      </section>

      {/* Products Section */}
      <section id="produtos" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Nossas Ferramentas Inteligentes</h2>
            <p className="mt-4 text-lg text-gray-400">Soluções que pensam com você.</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 bg-gradient-to-r from-cyan-900/20 via-purple-900/20 to-cyan-900/20 border-y border-cyan-500/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-400/30 backdrop-blur-sm p-8 sm:p-12">
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 animate-pulse"></div>
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 animate-bounce">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Novas Soluções em Desenvolvimento
              </h3>
              
              <p className="text-lg sm:text-xl text-cyan-100 mb-6 max-w-2xl mx-auto">
                Estamos preparando <span className="font-bold text-cyan-300">ferramentas revolucionárias</span> que vão transformar ainda mais o seu dia a dia. 
                Em breve, você terá acesso a tecnologias que nem imagina!
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <div className="flex items-center gap-2 text-yellow-300">
                  <svg className="w-6 h-6 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-semibold text-lg">Novidades Exclusivas</span>
                </div>
              </div>
              
              <div className="mt-8">
                <Link
                  to="/contato"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300"
                >
                  🚀 Não Fique de Fora! Entre em Contato
                </Link>
              </div>
              
              <p className="mt-6 text-sm text-gray-400 italic">
                Seja um dos primeiros a experimentar o futuro da automação inteligente
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">O que nossos clientes dizem</h2>
            <p className="mt-4 text-lg text-gray-400">Resultados reais de pessoas que confiam em nossas soluções.</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-3">
            {TESTIMONIALS.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
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
