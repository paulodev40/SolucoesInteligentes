
import React from 'react';

const ContactPage: React.FC = () => {

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
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-cyan-500/10 text-cyan-300 text-2xl">
                                💬
                            </div>
                            <h2 className="mt-4 text-2xl font-bold text-white">Suporte rapido e direto</h2>
                            <p className="mt-2 text-base text-gray-400">
                                Abra um chamado pelo nosso formulario e responda em poucos passos.
                            </p>
                        </div>
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-300">
                            <div className="rounded-lg border border-cyan-400/20 bg-gray-900/40 px-4 py-3">
                                Resposta organizada e clara
                            </div>
                            <div className="rounded-lg border border-cyan-400/20 bg-gray-900/40 px-4 py-3">
                                Envio de arquivos e detalhes
                            </div>
                            <div className="rounded-lg border border-cyan-400/20 bg-gray-900/40 px-4 py-3">
                                Atendimento mais rapido
                            </div>
                        </div>
                        <div className="mt-8">
                            <a
                                href="https://docs.google.com/forms/d/e/1FAIpQLSfcLsTyJ3CKwtEZU2TYuSoBrECGLgfLoPv1fTyPOVm9rMsgpA/viewform?usp=publish-editor"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                            >
                                Acessar formulario de suporte
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
