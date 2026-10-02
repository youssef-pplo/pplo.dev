import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimations = () => {
  useEffect(() => {
    const heroMotion = gsap.matchMedia();

    heroMotion.add('(prefers-reduced-motion: no-preference)', () => {
      const hero = document.querySelector('#hero');
      if (!hero) return;

      const depthTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      depthTimeline
        .to('.hero-depth-field', {
          z: -260,
          y: 80,
          rotateX: 14,
          rotateZ: -12,
          scale: 0.82,
          opacity: 0.12,
          ease: 'none',
        }, 0)
        .to('.hero-label', {
          z: -90,
          y: -28,
          opacity: 0.4,
          ease: 'none',
        }, 0)
        .to('#hero-title', {
          z: 180,
          y: -95,
          rotateX: -5,
          scale: 1.12,
          ease: 'none',
        }, 0)
        .to('.hero-content .subtitle', {
          z: 70,
          y: -58,
          opacity: 0.55,
          ease: 'none',
        }, 0)
        .to('.hero-content .primary-btn', {
          z: -120,
          y: -22,
          scale: 0.9,
          opacity: 0.45,
          ease: 'none',
        }, 0);

      return () => depthTimeline.kill();
    });

    const sectionMotion = gsap.matchMedia();
    sectionMotion.add('(prefers-reduced-motion: no-preference)', () => {
      // Layered section reveals: the section moves forward as its cards follow in sequence.
      gsap.utils.toArray('.content-section').forEach((section: any) => {
        gsap.fromTo(section,
          { opacity: 0, y: 64, z: -90, rotateX: 3, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            z: 0,
            rotateX: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'top 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        const sectionCards = section.querySelectorAll('.bento-card');
        if (sectionCards.length) {
          gsap.fromTo(sectionCards,
            { opacity: 0, y: 24, z: -35, scale: 0.985 },
            {
              opacity: 1,
              y: 0,
              z: 0,
              scale: 1,
              duration: 0.7,
              stagger: 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 72%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    });

    // Card Hover Animations (3D Tilt)
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
          duration: 0.5,
          rotateX: rotateX,
          rotateY: rotateY,
          transformPerspective: 1000,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          duration: 0.5,
          rotateX: 0,
          rotateY: 0,
          ease: 'power2.out',
        });
      });
    });

    // Button scroll-to (optional)
    const btn = document.querySelector('#init-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        gsap.to(window, { duration: 1, scrollTo: '#about', ease: 'power2.inOut' });
      });
    }

    // Cleanup
    return () => {
      heroMotion.revert();
      sectionMotion.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      cards.forEach(card => {
        card.removeEventListener('mousemove', () => {});
        card.removeEventListener('mouseleave', () => {});
      });
      if (btn) btn.removeEventListener('click', () => {});
    };
  }, []);
};
