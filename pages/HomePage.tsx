
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
