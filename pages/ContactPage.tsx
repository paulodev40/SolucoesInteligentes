
import React, { useState } from 'react';

const ContactPage: React.FC = () => {
    const [status, setStatus] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('Enviando...');
        // Simulating a network request
        setTimeout(() => {
            setStatus('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            (e.target as HTMLFormElement).reset();
             setTimeout(() => setStatus(''), 5000);
        }, 1000);
    };

    return (
        <div className="bg-gray-900 py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-lg mx-auto lg:max-w-none">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold text-white sm:text-5xl">Contato e Suporte</h1>
                        <p className="mt-4 text-xl text-gray-400">
                            Tem alguma dúvida ou precisa de ajuda? Fale conosco.
                        </p>
                    </div>
                    <div className="mt-12 bg-gray-800 p-8 rounded-lg shadow-xl max-w-3xl mx-auto">
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
                            <div>
                                <label htmlFor="full-name" className="sr-only">Nome Completo</label>
                                <input type="text" name="full-name" id="full-name" autoComplete="name" required className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 bg-gray-700 border-gray-600 rounded-md text-white focus:ring-cyan-500 focus:border-cyan-500" placeholder="Nome Completo" />
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input id="email" name="email" type="email" autoComplete="email" required className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 bg-gray-700 border-gray-600 rounded-md text-white focus:ring-cyan-500 focus:border-cyan-500" placeholder="Email" />
                            </div>
                             <div>
                                <label htmlFor="subject" className="sr-only">Assunto</label>
                                <input type="text" name="subject" id="subject" required className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 bg-gray-700 border-gray-600 rounded-md text-white focus:ring-cyan-500 focus:border-cyan-500" placeholder="Assunto" />
                            </div>
                            <div>
                                <label htmlFor="message" className="sr-only">Mensagem</label>
                                <textarea id="message" name="message" rows={4} required className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 bg-gray-700 border-gray-600 rounded-md text-white focus:ring-cyan-500 focus:border-cyan-500" placeholder="Sua mensagem"></textarea>
                            </div>
                            <div>
                                <button type="submit" className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                                    Enviar Mensagem
                                </button>
                            </div>
                            {status && <p className="text-center text-cyan-400 mt-4">{status}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
