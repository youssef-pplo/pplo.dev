import React from 'react';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="content-section">
      <footer className="footer">
        <div className="contact-links">
          <a href="mailto:youssefdev74@gmail.com" className="contact-item">Email</a>
          <a href="https://github.com/youssef-pplo" target="_blank" rel="noopener noreferrer" className="contact-item">GitHub</a>
          <a href="https://instagram.com/pplo.dev" target="_blank" rel="noopener noreferrer" className="contact-item">Instagram</a>
          <a href="https://wa.me/+201091734838" target="_blank" rel="noopener noreferrer" className="contact-item">WhatsApp</a>
        </div>
        <p>&copy; 2016 - 2026 | Youssef Elsaid.</p>
      </footer>
    </section>
  );
};

export default ContactSection;
