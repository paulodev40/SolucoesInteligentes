
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS, PRODUCTS } from '../constants';
import NotFoundPage from './NotFoundPage';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return <NotFoundPage />;
  }
  
  const relatedProduct = post.relatedProductSlug ? PRODUCTS.find(p => p.slug === post.relatedProductSlug) : null;

  return (
    <div className="bg-gray-900 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
            <Link to="/blog" className="text-cyan-400 font-semibold hover:text-cyan-300">
                <i className="fas fa-arrow-left mr-2"></i> Voltar para o blog
            </Link>
        </div>

        <article>
          <header className="mb-8">
            <span className="text-cyan-400 font-semibold">{post.category}</span>
            <h1 className="mt-2 text-4xl font-extrabold text-white leading-tight sm:text-5xl">{post.title}</h1>
            <div className="mt-4 text-sm text-gray-400 flex items-center space-x-4">
              <span>Por {post.author}</span>
              <span>&bull;</span>
              <span>{post.date}</span>
            </div>
          </header>
          
          <img className="w-full h-auto rounded-lg shadow-lg mb-8" src={post.imageUrl} alt={post.title} />

          <div 
            className="prose prose-invert prose-lg max-w-none text-gray-300"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {relatedProduct && (
            <div className="mt-12 bg-gray-800 p-6 rounded-lg shadow-lg flex items-center">
                <div className="flex-shrink-0">
                    <relatedProduct.icon className="h-12 w-12 text-cyan-400"/>
                </div>
                <div className="ml-4 flex-grow">
                    <h4 className="text-lg font-bold text-white">Gostou do que leu?</h4>
                    <p className="text-gray-400">Leve sua produtividade ao próximo nível com o {relatedProduct.name}.</p>
                </div>
                <div className="ml-4 flex-shrink-0">
                    <Link to={`/produtos/${relatedProduct.slug}`} className="px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700">
                        Saiba Mais
                    </Link>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default BlogPostPage;
