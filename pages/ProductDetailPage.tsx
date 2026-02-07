
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

  if (!product) {
    return <NotFoundPage />;
  }
  
  const Icon = product.icon;

  return (
    <div className="bg-gray-900 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <div className="lg:col-span-6">
            <div className="flex items-center mb-4">
               {product.slug === 'copymaster-pro' ? (
                 <img 
                   src="/assets/images/corujasabia.jpeg" 
                   alt={product.name}
                   className="h-24 w-24 object-cover rounded-full mr-5 border-4 border-cyan-400"
                 />
               ) : product.slug === 'slidegenius' ? (
                 <img 
                   src="/assets/images/mascote-camaleao.png" 
                   alt={product.name}
                   className="h-24 w-24 object-cover rounded-full mr-5 border-4 border-cyan-400"
                 />
               ) : (
                 <Icon className="h-16 w-16 text-cyan-400 mr-5" />
               )}
               <div>
                  <h1 className="text-4xl font-extrabold text-white sm:text-5xl">{product.name}</h1>
                  <p className="mt-2 text-xl text-cyan-400">{product.tagline}</p>
               </div>
            </div>
            
            <p className="mt-6 text-lg text-gray-300">{product.description}</p>
            
            {product.slug === 'copymaster-pro' && (
              <div className="mt-8">
                <div className="relative w-full rounded-lg overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/D_86O9BsSUw"
                    title="CopyMaster Pro Demo"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
            
            {product.slug === 'slidegenius' && (
              <div className="mt-8">
                <div className="relative w-full rounded-lg overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/CMEhFIfeC-s"
                    title="SlideGenius Demo"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
            
            <div className="mt-8">
              <a
                href="#"
                className="inline-block px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 transition-transform transform hover:scale-105"
              >
                Testar Agora / Comprar
              </a>
            </div>
          </div>
          
          <div className="mt-12 lg:mt-0 lg:col-span-6">
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl space-y-8">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center"><i className="fas fa-bullseye text-cyan-400 mr-3"></i> Problema que resolve</h3>
                <p className="mt-2 text-gray-400">{product.problem}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white flex items-center"><i className="fas fa-users text-cyan-400 mr-3"></i> Para quem é</h3>
                <p className="mt-2 text-gray-400">{product.targetAudience}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white flex items-center"><i className="fas fa-check-circle text-cyan-400 mr-3"></i> Exemplos de uso</h3>
                <ul className="mt-3 list-disc list-inside text-gray-400 space-y-2">
                  {product.useCases.map((useCase, index) => (
                    <li key={index}>{useCase}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 text-center">
          <Link to="/produtos" className="text-cyan-400 font-semibold hover:text-cyan-300">
            <i className="fas fa-arrow-left mr-2"></i> Voltar para todos os produtos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
