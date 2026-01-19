import React from 'react';

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="content-section">
      <h2>Selected Work</h2>
      <div className="bento-grid">
        <div className="bento-card">
          <div>
            <h3 className="project-title">I3RBLY</h3>
            <p className="project-desc">AI system for Arabic grammatical analysis. 4 years of R&D.</p>
          </div>
          <a href="https://i3rbly.com" target="_blank" rel="noopener noreferrer" className="project-link">Visit Site →</a>
        </div>
        <div className="bento-card">
          <div>
            <h3 className="project-title">Steam1st Store</h3>
            <p className="project-desc">Gaming top-up store with Flask backend and PostgreSQL.</p>
          </div>
          <a href="https://steam1st.store" target="_blank" rel="noopener noreferrer" className="project-link">Visit Site →</a>
        </div>
        <div className="bento-card">
          <div>
            <h3 className="project-title">AlCoders</h3>
            <p className="project-desc">Developer community and coding platform.</p>
          </div>
          <a href="https://alcoders.com" target="_blank" rel="noopener noreferrer" className="project-link">Visit Site →</a>
        </div>
        <div className="bento-card">
          <div>
            <h3 className="project-title">EasyBio - Dr. Abdelrahman</h3>
            <p className="project-desc">Educational platform for biology students in Egyptian secondary schools.</p>
          </div>
          <a href="https://easybio-drabdelrahman.com" target="_blank" rel="noopener noreferrer" className="project-link">Visit Site →</a>
        </div>
        <div className="bento-card">
          <div>
            <h3 className="project-title">PPLO GPT</h3>
            <p className="project-desc">AI ChatBot using Python and ML to assist users.</p>
          </div>
          <a href="https://pplo.vercel.app" target="_blank" rel="noopener noreferrer" className="project-link">Visit Site →</a>
        </div>
        <div className="bento-card">
          <div>
            <h3 className="project-title">Kotobee</h3>
            <p className="project-desc">Backend development for e-learning platform.</p>
          </div>
          <a href="https://kotobee.com" target="_blank" rel="noopener noreferrer" className="project-link">Visit Site →</a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
