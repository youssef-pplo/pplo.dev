import React, { useEffect } from 'react';
import { gsap } from 'gsap';

const CustomCursor: React.FC = () => {
  useEffect(() => {
    const cursor = document.querySelector('.custom-cursor');
    const links = document.querySelectorAll('a, button, .bento-card, .nav-links a');

    // Move cursor
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });
    };

    // Hover effects
    const handleMouseEnter = () => {
      cursor?.classList.add('hovered');
    };
    const handleMouseLeave = () => {
      cursor?.classList.remove('hovered');
    };

    links.forEach(link => {
      link.addEventListener('mouseenter', handleMouseEnter);
      link.addEventListener('mouseleave', handleMouseLeave);
    });

    document.addEventListener('mousemove', moveCursor);

    return () => {
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleMouseEnter);
        link.removeEventListener('mouseleave', handleMouseLeave);
      });
      document.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return <div className="custom-cursor"></div>;
};

export default CustomCursor;
