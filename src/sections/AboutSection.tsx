import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="content-section">
      <div className="bento-card profile-section">
        <img src="https://s6.imgcdn.dev/YBxHLg.png" alt="Youssef Elsaid" className="profile-pic" />
        <div>
          <h2>About Me</h2>
          <p className="about-text">
            I'm Youssef Elsaid, a passionate software engineer and AI architect from Alexandria, Egypt.
            My journey in technology began at age 8, and over the past decade, I've mastered over 30 programming
            languages including Python, JavaScript, C++, and more.
          </p>
          <p className="about-text">
            I specialize in building intelligent systems that solve real-world problems. From developing AI-powered
            educational platforms to creating scalable web applications, I combine cutting-edge technology with
            practical solutions. My expertise spans artificial intelligence, machine learning, full-stack development,
            and cloud architecture.
          </p>
          <p className="about-text">
            When I'm not coding, you'll find me diving into psychoanalysis, playing chess, or supporting Real Madrid.
            I'm currently pursuing higher education with a focus on AI and aspiring to contribute to groundbreaking
            innovations in the field of artificial intelligence.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
