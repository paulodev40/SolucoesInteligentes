
import React from 'react';
import { Link } from 'react-router-dom';
import type { BlogPost } from '../types';

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col transform hover:-translate-y-2 transition-transform duration-300">
      <Link to={`/blog/${post.slug}`}>
        <img className="w-full h-48 object-cover" src={post.imageUrl} alt={post.title} />
      </Link>
      <div className="p-6 flex-grow flex flex-col">
        <div>
          <span className="text-xs font-semibold text-cyan-400 uppercase">{post.category}</span>
          <Link to={`/blog/${post.slug}`}>
            <h3 className="mt-2 text-xl font-bold text-white hover:text-cyan-300 transition-colors duration-200">{post.title}</h3>
          </Link>
          <p className="mt-2 text-gray-400">{post.excerpt}</p>
        </div>
        <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
           <p>{post.date}</p>
           <Link to={`/blog/${post.slug}`} className="font-semibold text-cyan-400 hover:text-cyan-300">
             Ler mais <i className="fas fa-arrow-right ml-1"></i>
           </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
