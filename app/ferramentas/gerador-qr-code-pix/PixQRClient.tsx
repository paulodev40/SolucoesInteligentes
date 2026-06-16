﻿'use client';

import { useState } from 'react';
import AdSlot from '../../../components/AdSlot';

type TipoChave = 'cpf' | 'cnpj' | 'email' | 'celular' | 'aleatoria';

const TIPOS_CHAVE: { id: TipoChave; label: string; placeholder: string }[] = [
  { id: 'cpf',       label: 'CPF',        placeholder: '12345678901' },
  { id: 'cnpj',      label: 'CNPJ',       placeholder: '12345678000195' },
  { id: 'email',     label: 'E-mail',     placeholder: 'seuemail@exemplo.com' },
  { id: 'celular',   label: 'Celular',    placeholder: '+5511999999999' },
  { id: 'aleatoria', label: 'Aleatória',  placeholder: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' },
];

// CRC-16/CCITT-FALSE: poly 0x1021, init 0xFFFF, no RefIn, no RefOut, no XorOut
// Sanity check: crc16ccitt("123456789") === "29B1"
function crc16ccitt(data: string): string {
  let crc = 0xffff;
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) : crc << 1;
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

// TLV: ID (2) + LEN (2, decimal, zero-padded) + VALUE
function emv(id: string, value: string): string {
  return `${id}${value.length.toString().padStart(2, '0')}${value}`;
}

// Remove acentos, converte para maiúsculas, remove chars inválidos, trunca
function normalizeEMV(s: string, maxLen: number): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toUpperCase()
    .replace(/[̀-ͯ]/g, '')
    .trim()
    .slice(0, maxLen);
}

function normalizeChave(chave: string, tipo: TipoChave): string {
  if (tipo === 'cpf' || tipo === 'cnpj') return chave.replace(/\D/g, '');
  if (tipo === 'email' || tipo === 'aleatoria') return chave.trim().toLowerCase();
  return chave.trim(); // celular: manter como digitado (ex: +5511999999999)
}

function buildPayload(
  chave: string,
  tipo: TipoChave,
  nome: string,
  cidade: string,
  valor: string,
  descricao: string,
): string {
  const chaveNorm = normalizeChave(chave, tipo);
  const nomeNorm  = normalizeEMV(nome, 25);
  const cidadeNorm = normalizeEMV(cidade, 15);

  // Descrição no campo 26.02 (opcional) e txid no campo 62.05
  const descNorm = descricao.trim() ? normalizeEMV(descricao.trim(), 25) : '';
  const txid = descNorm || '***';

  // Campo 26 — Merchant Account Info
  const merchantAccount =
    emv('00', 'br.gov.bcb.pix') +
    emv('01', chaveNorm) +
    (descNorm ? emv('02', descNorm) : '');

  // Campo 62 — Additional Data Field Template
  const additionalData = emv('05', txid);

  // Valor: formatar com ponto decimal, 2 casas, sem separador de milhar
  let valorStr = '';
  if (valor.trim()) {
    const num = parseFloat(valor.replace(',', '.'));
    if (isFinite(num) && num > 0) valorStr = num.toFixed(2);
  }

  // Montar payload sem o valor do CRC (mas com o campo 6304 para o cálculo)
  const body =
    emv('00', '01') +
    emv('26', merchantAccount) +
    emv('52', '0000') +
    emv('53', '986') +
    (valorStr ? emv('54', valorStr) : '') +
    emv('58', 'BR') +
    emv('59', nomeNorm) +
    emv('60', cidadeNorm) +
    emv('62', additionalData) +
    '6304'; // ID + LEN do CRC (valor calculado abaixo)

  return body + crc16ccitt(body);
}

export default function PixQRClient() {
  const [tipoChave, setTipoChave] = useState<TipoChave>('cpf');
  const [chave, setChave]         = useState('');
  const [nome, setNome]           = useState('');
  const [cidade, setCidade]       = useState('');
  const [valor, setValor]         = useState('');
  const [descricao, setDescricao] = useState('');

  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copiaCola, setCopiaCola] = useState('');
  const [copiado, setCopiado]     = useState(false);
  const [gerando, setGerando]     = useState(false);
  const [erro, setErro]           = useState('');

  const canGerar = chave.trim() && nome.trim() && cidade.trim();

  const gerar = async () => {
    setErro('');
    setGerando(true);
    try {
      const payload = buildPayload(chave, tipoChave, nome, cidade, valor, descricao);
      // Dynamic import — carregado só quando o usuário clica, nunca envia dados externamente
      const QRCode = (await import('qrcode')).default;
      const url = await QRCode.toDataURL(payload, {
        width: 288,
        margin: 2,
        errorCorrectionLevel: 'M',
        color: { dark: '#000000', light: '#ffffff' },
      });
      setCopiaCola(payload);
      setQrDataUrl(url);
    } catch (e) {
      setErro('Erro ao gerar QR Code. Verifique os dados e tente novamente.');
      console.error(e);
    } finally {
      setGerando(false);
    }
  };

  const copiar = async () => {
    await navigator.clipboard.writeText(copiaCola);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  const baixar = () => {
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = 'pix-qrcode.png';
    a.click();
  };

  const tabCls = (active: boolean) =>
    `px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
      active
        ? 'bg-si-cyan/10 border-si-cyan text-si-cyan'
        : 'border-si-dim text-si-muted hover:border-si-cyan/50 hover:text-si-text'
    }`;

  const tipoAtual = TIPOS_CHAVE.find(t => t.id === tipoChave);

  return (
    <div className="space-y-6">
      <AdSlot label="Anúncio" className="my-2" />

      {/* Formulário */}
      <div className="surface p-7 sm:p-8 space-y-6 reveal">

        {/* Tipo de chave */}
        <div>
          <p className="text-sm font-semibold text-si-muted mb-3">Tipo de chave PIX</p>
          <div className="flex flex-wrap gap-2">
            {TIPOS_CHAVE.map(t => (
              <button
                key={t.id}
                onClick={() => { setTipoChave(t.id); setChave(''); }}
                className={tabCls(tipoChave === t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chave PIX */}
        <label className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-si-muted">Chave PIX</span>
          <input
            type="text"
            className="form-field"
            placeholder={tipoAtual?.placeholder}
            value={chave}
            onChange={e => setChave(e.target.value)}
          />
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-si-muted">
              Nome do recebedor <span className="text-si-dim font-normal">(máx. 25 chars)</span>
            </span>
            <input
              type="text"
              className="form-field"
              placeholder="Ex: JOAO SILVA"
              maxLength={25}
              value={nome}
              onChange={e => setNome(e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-si-muted">
              Cidade <span className="text-si-dim font-normal">(máx. 15 chars)</span>
            </span>
            <input
              type="text"
              className="form-field"
              placeholder="Ex: SAO PAULO"
              maxLength={15}
              value={cidade}
              onChange={e => setCidade(e.target.value)}
            />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-si-muted">
              Valor (R$) <span className="text-si-dim font-normal">opcional</span>
            </span>
            <input
              type="text"
              inputMode="decimal"
              className="form-field"
              placeholder="Ex: 50,00 — deixe vazio para o pagador definir"
              value={valor}
              onChange={e => setValor(e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-si-muted">
              Descrição / txid <span className="text-si-dim font-normal">opcional, máx. 25</span>
            </span>
            <input
              type="text"
              className="form-field"
              placeholder="Ex: PEDIDO 001"
              maxLength={25}
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
            />
          </label>
        </div>

        {erro && <p className="text-sm" style={{ color: '#f87171' }}>{erro}</p>}

        <button
          className="btn-primary w-full"
          onClick={gerar}
          disabled={!canGerar || gerando}
          style={{ opacity: canGerar ? 1 : 0.5, cursor: canGerar ? 'pointer' : 'not-allowed' }}
        >
          {gerando ? 'Gerando…' : '⚡ Gerar QR Code PIX'}
        </button>
      </div>

      {/* Resultado */}
      {qrDataUrl && (
        <div className="surface p-7 sm:p-8 reveal space-y-6">
          <div className="flex flex-col items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrDataUrl}
              alt="QR Code PIX gerado"
              width={288}
              height={288}
              className="rounded-lg border border-si-dim/30"
            />
            <p className="text-xs text-si-dim text-center">
              🔒 Gerado 100% no seu navegador — sua chave PIX não é enviada a nenhum servidor.
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-si-muted">Pix Copia e Cola</p>
            <textarea
              readOnly
              rows={5}
              className="form-field font-mono text-xs resize-none"
              value={copiaCola}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button className="btn-primary" onClick={copiar}>
              {copiado ? '✅ Copiado!' : '📋 Copiar Pix Copia e Cola'}
            </button>
            <button className="btn-ghost" onClick={baixar}>
              ⬇ Baixar QR Code PNG
            </button>
          </div>
        </div>
      )}

      <AdSlot label="Anúncio" className="my-2" />
    </div>
  );
}
