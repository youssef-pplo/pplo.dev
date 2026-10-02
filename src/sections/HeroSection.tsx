import React, { useEffect } from 'react';
import { initHeroTitleAnimation } from '../ui/heroTitleAnimation';

const HeroSection: React.FC = () => {
  useEffect(() => initHeroTitleAnimation(), []);

  return (
    <section id="hero" className="full-screen hero-section">
      <div className="hero-depth-field" aria-hidden="true">
        <span className="hero-depth-ring hero-depth-ring--outer" />
        <span className="hero-depth-ring hero-depth-ring--inner" />
        <span className="hero-depth-orb" />
        <span className="hero-depth-caption">SCROLL TO EXPLORE</span>
      </div>
      <div className="hero-content">
        <span className="hero-label">Available for hire</span>
        <h1 id="hero-title">Youssef Elsaid</h1>
        <p className="subtitle">Youssef Elsaid — Software Engineer & AI Architect.</p>
        <a href="#projects" className="primary-btn">View Work</a>
      </div>
    </section>
  );
};

export default HeroSection;
