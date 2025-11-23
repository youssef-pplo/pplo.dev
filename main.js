import './style.css'
import { initScene } from './src/three/scene.js'
import { initAnimations } from './src/ui/animations.js'
import { initCursor } from './src/ui/cursor.js'
import { initTitleAnimation } from './src/ui/titleAnimation.js'
import { initHeroTitleAnimation } from './src/ui/heroTitleAnimation.js'
import { initThemeToggle, initBackToTop } from './src/ui/themeAndScroll.js'
import { gsap } from 'gsap'

console.log('Portfolio 2200 Initialized')

initScene();
initAnimations();
initCursor();
initTitleAnimation();
initHeroTitleAnimation();
initThemeToggle();
initBackToTop();
