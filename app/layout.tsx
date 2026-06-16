import type { Metadata } from 'next';
import { Syne, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  CustomCursor,
  ParticleField,
  Scanlines,
  ScrollProgress,
  Spotlight,
} from '../components/effects';
import HashRedirect from '../components/HashRedirect';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-space',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://solucoesinteligentes83.com'),
  title: {
    default: 'Soluções Inteligentes 83 — Ferramentas e IA para o seu dia a dia',
    template: '%s | Soluções Inteligentes 83',
  },
  description:
    'Ferramentas gratuitas, calculadoras, verificadores e recursos de inteligência artificial para profissionais, empreendedores e entusiastas de tecnologia.',
  openGraph: {
    siteName: 'Soluções Inteligentes 83',
    locale: 'pt_BR',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${syne.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17945581089"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17945581089');
          gtag('config', 'AW-17964509171');
        `}</Script>
      </head>
      <body className="bg-si-bg text-si-text font-body">
        <HashRedirect />
        <ScrollProgress />
        <CustomCursor />
        <Spotlight />
        <ParticleField />
        <Scanlines />
        <div className="flex flex-col min-h-screen bg-si-bg text-si-text font-body">
          <Header />
          <main className="flex-grow relative z-10">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
