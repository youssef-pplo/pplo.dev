import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="glass-nav">
      <div className="nav-links">
        <a href="#about">About</a>
        <a href="#tech">Arsenal</a>
        <a href="#projects">Work</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
