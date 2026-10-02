import { gsap } from 'gsap';

export function initHeroTitleAnimation() {
    const heroTitle = document.getElementById('hero-title');
    if (!heroTitle) return () => {};
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};

    const titles = [
        'Youssef Elsaid',
        'Youssef pplo',
        'pplo.dev',
        'Youssef dev'
    ];
    const glitchChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let currentIndex = 0;
    let intervalId;
    let startDelayId;
    let activeTimeline;
    let isAnimating = false;

    heroTitle.textContent = titles[0];

    const animateTitle = () => {
        if (isAnimating) return;
        isAnimating = true;

        currentIndex = (currentIndex + 1) % titles.length;
        const nextTitle = titles[currentIndex];
        const length = nextTitle.length;

        activeTimeline = gsap.timeline({
            onComplete: () => {
                heroTitle.textContent = nextTitle;
                isAnimating = false;
            }
        });

        activeTimeline
            .to(heroTitle, {
                x: 1,
                duration: 0.08,
                repeat: 2,
                yoyo: true,
                ease: 'power2.inOut'
            }, 0)
            .to(heroTitle, {
                duration: 0.72,
                ease: 'none',
                onUpdate: function () {
                    const revealed = Math.floor(this.progress() * length);
                    heroTitle.textContent = Array.from(nextTitle, (character, index) => {
                        if (index < revealed) return character;
                        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                    }).join('');
                }
            }, 0)
            .to(heroTitle, {
                opacity: 0.55,
                duration: 0.12,
                yoyo: true,
                repeat: 1,
                ease: 'power1.inOut'
            }, 0.1)
            .set(heroTitle, { x: 0, opacity: 1 });
    };

    startDelayId = window.setTimeout(() => {
        animateTitle();
        intervalId = window.setInterval(animateTitle, 5000);
    }, 1800);

    return () => {
        window.clearTimeout(startDelayId);
        window.clearInterval(intervalId);
        activeTimeline?.kill();
        gsap.set(heroTitle, { x: 0, opacity: 1 });
        heroTitle.textContent = titles[0];
    };
}
