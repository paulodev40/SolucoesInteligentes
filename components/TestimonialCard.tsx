import React from 'react';
import type { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <figure className="surface surface-hover p-8 flex flex-col items-center text-center relative">
      <span
        aria-hidden
        className="absolute top-4 left-6 font-display text-7xl leading-none text-si-cyan/20 select-none"
      >
        “
      </span>
      <img
        src={testimonial.imageUrl}
        alt={testimonial.name}
        className="w-24 h-24 rounded-full mb-6 border-2 border-si-cyan"
        style={{ boxShadow: '0 0 24px var(--cyan-glow)' }}
      />
      <blockquote className="text-si-text/90 italic text-base leading-relaxed mb-6 flex-grow font-body">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-auto">
        <p className="font-display font-bold text-si-text text-lg">{testimonial.name}</p>
        <p className="font-mono text-xs uppercase tracking-wider text-si-cyan mt-1">
          Usuário de {testimonial.productUsed}
        </p>
      </figcaption>
    </figure>
  );
};

export default TestimonialCard;
