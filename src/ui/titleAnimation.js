export function initTitleAnimation() {
    const titles = [
        'Youssef Elsaid',
        'Youssef pplo',
        'pplo.dev',
        'Youssef dev'
    ];

    let currentIndex = 0;

    setInterval(() => {
        currentIndex = (currentIndex + 1) % titles.length;
        document.title = titles[currentIndex];
    }, 2000); // Change every 2 seconds
}
