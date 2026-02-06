
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-gray-900 text-center px-4">
      <div>
        <h1 className="text-9xl font-extrabold text-cyan-500">404</h1>
        <p className="text-2xl md:text-3xl font-semibold text-white mt-4">Página Não Encontrada</p>
        <p className="mt-4 text-lg text-gray-400">
            A página que você está procurando não existe ou foi movida.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-block px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700"
          >
            Voltar para a Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
