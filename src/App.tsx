import React from 'react';
import '../style.css';
import BackgroundScene from './components/BackgroundScene';
import CustomCursor from './components/CustomCursor';
import ThemeToggle from './components/ThemeToggle';
import BackToTop from './components/BackToTop';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import TechStackSection from './sections/TechStackSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';
import { useScrollAnimations } from './hooks/useScrollAnimations';

const App: React.FC = () => {
  useScrollAnimations();

  return (
    <>
      <CustomCursor />
      <BackgroundScene />
      <ThemeToggle />
      <BackToTop />
      <Navbar />
      <main id="app">
        <HeroSection />
        <AboutSection />
        <TechStackSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  );
};

export default App;
