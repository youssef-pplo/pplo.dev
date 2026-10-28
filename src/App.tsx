import React, { Suspense, lazy } from 'react';
import '../style.css';
import CustomCursor from './components/CustomCursor';
import ThemeToggle from './components/ThemeToggle';
import BackToTop from './components/BackToTop';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import FaqSection from './sections/FaqSection';
import ContactSection from './sections/ContactSection';
import { useScrollAnimations } from './hooks/useScrollAnimations';

// Lazy-load Three.js components to keep initial bundle tiny and minimize main thread blocking
const BackgroundScene = lazy(() => import('./components/BackgroundScene'));
const TechStackSection = lazy(() => import('./sections/TechStackSection'));

const App: React.FC = () => {
  useScrollAnimations();

  return (
    <>
      <CustomCursor />
      <Suspense fallback={null}>
        <BackgroundScene />
      </Suspense>
      <ThemeToggle />
      <BackToTop />
      <Navbar />
      <main id="app">
        <HeroSection />
        <AboutSection />
        <Suspense fallback={<div className="content-section" style={{ minHeight: '340px' }} />}>
          <TechStackSection />
        </Suspense>
        <ProjectsSection />
        <FaqSection />
        <ContactSection />
      </main>
    </>
  );
};

export default App;
