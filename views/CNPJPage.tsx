'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AdSlot from '../components/AdSlot';
import ComoUsar from '../components/ComoUsar';

interface CNPJData {
  cnpj: string;
  razao_social: string;
  nome_fantasia?: string;
  descricao_situacao_cadastral?: string;
  situacao_cadastral?: number;
  data_situacao_cadastral?: string;
  data_inicio_atividade?: string;
  cnae_fiscal?: number;
  cnae_fiscal_descricao?: string;
  descricao_tipo_de_logradouro?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  municipio?: string;
  uf?: string;
  cep?: number | string;
  ddd_telefone_1?: string;
  email?: string;
  capital_social?: number;
  descricao_porte?: string;
  descricao_natureza_juridica?: string;
  opcao_pelo_simples?: boolean;
  opcao_pelo_mei?: boolean;
  qsa?: { nome_socio: string; qualificacao_socio?: string }[];
}

function mascaraCNPJ(v: string): string {
  const d = v.replace(/\D/g, '').slice(0, 14);
  return d
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
}

function formatarCEP(cep: number | string): string {
  const s = String(cep).replace(/\D/g, '').padStart(8, '0');
  return `${s.slice(0, 5)}-${s.slice(5)}`;
}

function formatarTelefone(tel: string): string {
  const d = tel.replace(/\D/g, '');
  if (d.length === 10) return `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`;
  if (d.length === 11) return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
  return tel;
}

function badgeSituacao(cod?: number): string {
  if (cod === 2) return 'badge--green';
  if (cod === 8 || cod === 4) return 'badge--yellow';
  return 'badge--violet';
}

const CNPJPage: React.FC = () => {
  const [cnpj, setCnpj] = useState('');
  const [data, setData] = useState<CNPJData | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const buscar = async () => {
    const digits = cnpj.replace(/\D/g, '');
    if (digits.length !== 14) {
      setErro('Informe um CNPJ com 14 dígitos.');
      return;
    }
    setLoading(true);
    setErro('');
    setData(null);
    try {
      const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${digits}`);
      if (!res.ok) throw new Error('not found');
      const json: CNPJData = await res.json();
      setData(json);
    } catch {
      setErro('CNPJ não encontrado ou serviço temporariamente indisponível. Verifique o número e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-20 sm:py-24 px-5">
      <div className="max-w-3xl mx-auto">
        <Link href="/ferramentas" className="btn-ghost mb-8 inline-flex">← Voltar às ferramentas</Link>

        <div className="reveal">
          <div className="section-label">Empresarial</div>
          <h1 className="section-title">Consultar CNPJ</h1>
          <p className="section-desc">
            Consulte dados cadastrais de qualquer empresa diretamente na base da Receita Federal do Brasil,
            de forma gratuita e instantânea.
          </p>
        </div>

        <ComoUsar
          className="mt-8"
          steps={[
            'Digite o CNPJ da empresa no campo (a máscara é aplicada automaticamente).',
            'Clique em "Buscar" ou pressione Enter.',
          ]}
          output="Os dados públicos da empresa: razão social, nome fantasia, situação cadastral, natureza jurídica, porte, capital social, CNAE, endereço e quadro de sócios."
          example="00.000.000/0000-00"
        />

        <AdSlot label="Anúncio" className="my-6" />

        <div className="surface p-7 sm:p-8 reveal">
          <label className="field-label">CNPJ</label>
          <div className="flex gap-3">
            <input
              type="text"
              className="field"
              placeholder="00.000.000/0000-00"
              value={cnpj}
              maxLength={18}
              onChange={(e) => setCnpj(mascaraCNPJ(e.target.value))}
              onKeyDown={(e) => e.key === 'Enter' && buscar()}
            />
            <button
              className="btn-primary whitespace-nowrap"
              onClick={buscar}
              disabled={loading}
              style={{ minWidth: 110 }}
            >
              {loading ? 'Buscando…' : 'Buscar'}
            </button>
          </div>
          {erro && (
            <p className="mt-3 text-sm" style={{ color: '#f87171' }}>{erro}</p>
          )}
        </div>

        {data && (
          <div className="mt-8 space-y-4 reveal">

            {/* Cabeçalho */}
            <div className="surface p-7">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="font-display font-extrabold text-2xl text-si-text break-words">
                    {data.razao_social}
                  </h2>
                  {data.nome_fantasia && data.nome_fantasia !== data.razao_social && (
                    <p className="text-si-muted mt-1 text-sm">
                      Nome fantasia: <strong className="text-si-text">{data.nome_fantasia}</strong>
                    </p>
                  )}
                  <p className="font-mono text-sm text-si-dim mt-1">{mascaraCNPJ(data.cnpj)}</p>
                </div>
                {data.descricao_situacao_cadastral && (
                  <span className={`badge ${badgeSituacao(data.situacao_cadastral)} text-xs px-3 py-1.5 whitespace-nowrap`}>
                    {data.descricao_situacao_cadastral}
                  </span>
                )}
              </div>
            </div>

            {/* Dados cadastrais */}
            <div className="surface p-7">
              <h3 className="section-label mb-5">Informações cadastrais</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                {data.data_inicio_atividade && (
                  <InfoField label="Abertura" value={data.data_inicio_atividade} />
                )}
                {data.descricao_natureza_juridica && (
                  <InfoField label="Natureza jurídica" value={data.descricao_natureza_juridica} />
                )}
                {data.descricao_porte && (
                  <InfoField label="Porte" value={data.descricao_porte} />
                )}
                {data.capital_social !== undefined && data.capital_social !== null && (
                  <InfoField
                    label="Capital social"
                    value={data.capital_social.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  />
                )}
                {data.opcao_pelo_simples !== undefined && (
                  <InfoField label="Simples Nacional" value={data.opcao_pelo_simples ? 'Sim' : 'Não'} />
                )}
                {data.opcao_pelo_mei !== undefined && (
                  <InfoField label="MEI" value={data.opcao_pelo_mei ? 'Sim' : 'Não'} />
                )}
                {data.cnae_fiscal && data.cnae_fiscal_descricao && (
                  <InfoField
                    label="Atividade principal (CNAE)"
                    value={`${data.cnae_fiscal} — ${data.cnae_fiscal_descricao}`}
                    full
                  />
                )}
              </dl>
            </div>

            {/* Endereço */}
            {data.logradouro && (
              <div className="surface p-7">
                <h3 className="section-label mb-5">Endereço</h3>
                <p className="text-si-text text-sm leading-relaxed">
                  {data.descricao_tipo_de_logradouro ? `${data.descricao_tipo_de_logradouro} ` : ''}
                  {data.logradouro}
                  {data.numero ? `, ${data.numero}` : ''}
                  {data.complemento ? ` — ${data.complemento}` : ''}
                  <br />
                  {data.bairro && `${data.bairro} — `}
                  {data.municipio}/{data.uf}
                  {data.cep ? ` — CEP ${formatarCEP(data.cep)}` : ''}
                </p>
                {data.ddd_telefone_1 && (
                  <p className="text-si-muted text-sm mt-3">
                    Tel: {formatarTelefone(data.ddd_telefone_1)}
                  </p>
                )}
                {data.email && (
                  <p className="text-si-muted text-sm">E-mail: {data.email}</p>
                )}
              </div>
            )}

            {/* Quadro societário */}
            {data.qsa && data.qsa.length > 0 && (
              <div className="surface p-7">
                <h3 className="section-label mb-5">Quadro societário</h3>
                <ul className="space-y-2">
                  {data.qsa.map((socio, i) => (
                    <li key={i} className="flex flex-wrap items-center justify-between gap-2 text-sm">
                      <span className="text-si-text">{socio.nome_socio}</span>
                      {socio.qualificacao_socio && (
                        <span className="chip">{socio.qualificacao_socio}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="text-xs text-si-dim text-center leading-relaxed">
              Dados fornecidos pela Brasil API com base nos registros da Receita Federal do Brasil.
            </p>
          </div>
        )}

        <AdSlot label="Anúncio" className="my-8" />

        {/* Conteúdo SEO */}
        <article className="mt-4 space-y-10 text-si-muted leading-relaxed reveal">
          <div className="section-divider" />

          <div>
            <h2 className="text-xl font-display font-bold text-si-text mb-3">
              O que é o CNPJ e para que serve?
            </h2>
            <p>
              O <strong className="text-si-text">Cadastro Nacional da Pessoa Jurídica (CNPJ)</strong>{' '}
              é o registro obrigatório de empresas, associações e outros entes jurídicos perante
              a Receita Federal do Brasil. É o equivalente ao CPF das pessoas físicas — um
              identificador único de 14 dígitos atribuído no momento da abertura do negócio.
            </p>
            <p className="mt-3">
              Consultar o CNPJ é essencial antes de fechar negócios, emitir nota fiscal, cadastrar
              fornecedores ou verificar a idoneidade de um parceiro comercial. Empresas com CNPJ
              irregular podem ter dificuldades para emitir documentos fiscais e acessar crédito.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-display font-bold text-si-text mb-3">
              Como verificar a situação cadastral de uma empresa
            </h2>
            <p>
              A situação cadastral indica o status atual do CNPJ perante a Receita Federal.
              Os principais status são:
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {[
                { status: 'Ativa', desc: 'Empresa regularmente inscrita e em funcionamento.' },
                { status: 'Suspensa', desc: 'CNPJ com pendências cadastrais. A empresa pode ainda funcionar, mas deve regularizar a situação.' },
                { status: 'Inapta', desc: 'Empresa que não entregou declarações por dois ou mais anos. Não pode emitir NF.' },
                { status: 'Baixada', desc: 'Empresa encerrada. O CNPJ não está mais em vigor.' },
                { status: 'Nula', desc: 'Registro cancelado por irregularidade grave na abertura.' },
              ].map(({ status, desc }) => (
                <li key={status} className="flex gap-3">
                  <strong className="text-si-text whitespace-nowrap">{status}:</strong>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-display font-bold text-si-text mb-3">
              O que é CNAE?
            </h2>
            <p>
              A <strong className="text-si-text">Classificação Nacional de Atividades Econômicas (CNAE)</strong>{' '}
              é o código que define qual é a atividade principal de uma empresa. Ele é composto
              por 7 dígitos (ex.: 6201-5/01 — Desenvolvimento de programas de computador sob
              encomenda) e determina aspectos como tributação, obrigações acessórias e
              enquadramento em regimes especiais como o Simples Nacional.
            </p>
            <p className="mt-3">
              Ao consultar um CNPJ, verificar o CNAE ajuda a confirmar se o fornecedor
              ou parceiro realmente exerce a atividade que declara.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-display font-bold text-si-text mb-6">
              Perguntas frequentes
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: 'Como saber se um CNPJ é real e está ativo?',
                  a: 'Use esta ferramenta: informe o CNPJ e clique em "Buscar". Os dados vêm diretamente da Receita Federal via Brasil API. Se a situação cadastral for "Ativa", o CNPJ está regular. Se retornar erro, o número pode estar errado ou o CNPJ não existe.',
                },
                {
                  q: 'Qual a diferença entre razão social e nome fantasia?',
                  a: 'A razão social é o nome jurídico oficial da empresa, registrado na Receita Federal e nos contratos. O nome fantasia é como a empresa se apresenta ao mercado — o nome da marca ou loja. Uma mesma razão social pode ter vários nomes fantasia.',
                },
                {
                  q: 'O que é o Quadro de Sócios e Administradores (QSA)?',
                  a: 'O QSA lista as pessoas físicas ou jurídicas que compõem o quadro societário da empresa, com seus percentuais de participação e qualificações. É usado para verificar quem são os responsáveis legais pelo negócio e detectar sócios em comum entre empresas.',
                },
              ].map(({ q, a }) => (
                <div key={q} className="border-l-2 border-si-cyan pl-5">
                  <p className="font-semibold text-si-text mb-1">{q}</p>
                  <p className="text-sm">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </article>

        <AdSlot label="Anúncio" className="mt-16" />
      </div>
    </section>
  );
};

interface InfoFieldProps {
  label: string;
  value: string;
  full?: boolean;
}

const InfoField: React.FC<InfoFieldProps> = ({ label, value, full }) => (
  <div className={full ? 'sm:col-span-2' : ''}>
    <dt className="text-si-dim text-xs uppercase tracking-wider font-mono mb-1">{label}</dt>
    <dd className="text-si-text">{value}</dd>
  </div>
);

export default CNPJPage;
