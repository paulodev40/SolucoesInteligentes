
import React, { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import {
  CustomCursor,
  ParticleField,
  Scanlines,
  ScrollProgress,
  Spotlight,
  useReveal,
} from './components/effects';
import HomePage from './views/HomePage';
import ProductsPage from './views/ProductsPage';
import OnlineCoursesPage from './views/OnlineCoursesPage';
import ProductDetailPage from './views/ProductDetailPage';
import BlogPage from './views/BlogPage';
import BlogPostPage from './views/BlogPostPage';
import AboutPage from './views/AboutPage';
import ConsultingPage from './views/ConsultingPage';
import ToolsPage from './views/ToolsPage';
import FeriasPage from './views/FeriasPage';
import CNPJPage from './views/CNPJPage';
import PromptPage from './views/PromptPage';
import DigitalContentPage from './views/DigitalContentPage';
import PrivacyPolicyPage from './views/PrivacyPolicyPage';
import TermsPage from './views/TermsPage';
import NotFoundPage from './views/NotFoundPage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const RouteEffects: React.FC = () => {
  useReveal();
  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <RouteEffects />
      <ScrollProgress />
      <CustomCursor />
      <Spotlight />
      <ParticleField />
      <Scanlines />
      <div className="flex flex-col min-h-screen bg-si-bg text-si-text font-body">
        <Header />
        <main className="flex-grow relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/produtos" element={<ProductsPage />} />
            <Route path="/cursos-online" element={<OnlineCoursesPage />} />
            <Route path="/consultoria" element={<ConsultingPage />} />
            <Route path="/ferramentas" element={<ToolsPage />} />
            <Route path="/ferramentas/ferias-13" element={<FeriasPage />} />
            <Route path="/ferramentas/cnpj" element={<CNPJPage />} />
            <Route path="/ferramentas/prompt-ia" element={<PromptPage />} />
            <Route path="/conteudo-digital" element={<DigitalContentPage />} />
            <Route path="/produtos/:slug" element={<ProductDetailPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/sobre" element={<AboutPage />} />
            <Route path="/privacidade" element={<PrivacyPolicyPage />} />
            <Route path="/termos" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Analytics />
    </HashRouter>
  );
};

export default App;
