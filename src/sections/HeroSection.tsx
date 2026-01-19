import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="full-screen">
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
