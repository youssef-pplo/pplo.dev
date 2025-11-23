import { gsap } from 'gsap';

export function initHeroTitleAnimation() {
    const heroTitle = document.getElementById('hero-title');
    if (!heroTitle) return;

    const titles = [
        'Youssef Elsaid',
        'Youssef pplo',
        'pplo.dev',
        'Youssef dev'
    ];

    let currentIndex = 0;
    let isAnimating = false;

    // Glitch characters for the scramble effect
    const glitchChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

    // Find the longest common prefix
    const findCommonPrefix = (str1, str2) => {
        let i = 0;
        while (i < str1.length && i < str2.length && str1[i] === str2[i]) {
            i++;
        }
        return i;
    };

    // Smart glitchy morphing - only glitch the parts that change
    const morphText = async (fromText, toText) => {
        if (isAnimating) return;
        isAnimating = true;

        const commonPrefixLength = findCommonPrefix(fromText, toText);
        const stablePart = fromText.substring(0, commonPrefixLength);
        const fromChanging = fromText.substring(commonPrefixLength);
        const toChanging = toText.substring(commonPrefixLength);

        // Subtle shake
        gsap.to(heroTitle, {
            x: 1,
            duration: 0.1,
            repeat: 2,
            yoyo: true,
            ease: 'power2.inOut'
        });

        // If we're removing characters (like "Youssef " -> "")
        if (fromChanging.length > toChanging.length) {
            // Fade out the extra part
            for (let i = fromChanging.length - 1; i >= toChanging.length; i--) {
                await new Promise(resolve => setTimeout(resolve, 30));
                const fadingPart = fromChanging.substring(0, i);
                heroTitle.textContent = stablePart + fadingPart + toChanging;
            }
        }

        // Glitch morph the changing part character by character
        const maxLength = Math.max(fromChanging.length, toChanging.length);
        for (let charIndex = 0; charIndex < toChanging.length; charIndex++) {
            // Glitch iterations for this specific character
            const iterations = 6;
            for (let iter = 0; iter < iterations; iter++) {
                await new Promise(resolve => setTimeout(resolve, 25));

                let morphedChanging = '';
                for (let j = 0; j < toChanging.length; j++) {
                    if (j < charIndex) {
                        // Already resolved
                        morphedChanging += toChanging[j];
                    } else if (j === charIndex) {
                        // Currently glitching
                        if (iter === iterations - 1) {
                            // Final iteration - lock in correct character
                            morphedChanging += toChanging[j];
                        } else {
                            // Random glitch character
                            morphedChanging += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                        }
                    } else if (j < fromChanging.length) {
                        // Not yet processed - show original or glitch
                        morphedChanging += fromChanging[j];
                    } else {
                        // New characters not yet glitched
                        morphedChanging += ' ';
                    }
                }

                heroTitle.textContent = (stablePart + morphedChanging).trim();
            }
        }

        // Ensure final text is correct
        heroTitle.textContent = toText;

        // Reset position
        gsap.to(heroTitle, {
            x: 0,
            duration: 0.2,
            ease: 'power2.out',
            onComplete: () => {
                isAnimating = false;
            }
        });
    };

    // Main animation loop
    const animateTitle = async () => {
        if (isAnimating) return;

        const currentText = titles[currentIndex];
        currentIndex = (currentIndex + 1) % titles.length;
        const nextText = titles[currentIndex];

        await morphText(currentText, nextText);
    };

    // Initial delay, then start morphing
    setTimeout(() => {
        setInterval(animateTitle, 5000);
    }, 2000);
}
