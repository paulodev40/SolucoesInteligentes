'use client';

import React, { useState } from 'react';
import Link from 'next/link';

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
          <h1 className="section-title">Verificador de CNPJ</h1>
          <p className="section-desc">
            Consulte dados cadastrais de qualquer empresa diretamente na base da Receita Federal do Brasil,
            de forma gratuita e instantânea.
          </p>
        </div>

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
