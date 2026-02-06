
import React from 'react';
import type { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center text-center">
      <img
        className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-cyan-500"
        src={testimonial.imageUrl}
        alt={testimonial.name}
      />
      <blockquote className="text-gray-300 italic mb-6 flex-grow">
        <p>&ldquo;{testimonial.quote}&rdquo;</p>
      </blockquote>
      <footer className="mt-auto">
        <p className="font-bold text-white text-lg">{testimonial.name}</p>
        <p className="text-gray-400">{testimonial.role}</p>
        <p className="text-sm text-cyan-400 mt-1">Usuário de {testimonial.productUsed}</p>
      </footer>
    </div>
  );
};

export default TestimonialCard;
