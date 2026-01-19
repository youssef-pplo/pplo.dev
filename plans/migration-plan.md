# Migration Plan: GSAP + Three.js on React

## Objective
Transform the existing vanilla JavaScript portfolio into a modern React application that seamlessly integrates GSAP animations with Three.js via React Three Fiber, following best practices for performance, maintainability, and developer experience.

## Technology Stack
- **React 18** – Component‑based UI
- **TypeScript** (optional) – Type safety, better DX
- **Vite** – Build tool (already used)
- **@react‑three/fiber** – React renderer for Three.js
- **@react‑three/drei** – Useful Three.js helpers
- **GSAP 3** + `@gsap/react` (optional) – Animation library with React hooks
- **Existing CSS** – Keep current styles (CSS variables, glass‑morphism)
- **CSS Modules / styled‑components** (optional) – For scoped styling if needed

## Architecture Overview

### Component Hierarchy
```
App
├── ThemeProvider (context)
├── BackgroundCanvas (React Three Fiber)
├── CustomCursor (GSAP‑driven)
├── GlassNavigation
├── HeroSection (GSAP title morphing)
├── AboutSection
├── TechStackSection (bento grid)
├── ProjectsSection
├── ContactSection
├── ThemeToggle
└── BackToTop
```

### Key Design Decisions
1. **Three.js Integration**
   - Port the existing shader‑based background mesh to a React component using `@react‑three/fiber`.
   - Use `useFrame` for real‑time updates (mouse, time uniforms).
   - Expose uniforms as reactive state where needed.

2. **GSAP Integration**
   - Use `useGSAP` hook (or custom `useEffect` + `useRef`) to attach GSAP timelines to DOM elements.
   - Keep scroll‑triggered animations via `gsap.registerPlugin(ScrollTrigger)`.
   - Drive Three.js object animations via GSAP by updating refs inside `useFrame`.

3. **State Management**
   - React Context for theme (light/dark) and maybe scroll position.
   - Local state for UI interactions (hover, active section).

4. **Performance Optimizations**
   - Memoize static components with `React.memo`.
   - Use `useRef` for mutable values that shouldn’t trigger re‑renders.
   - Separate the Three.js canvas into a dedicated `BackgroundCanvas` that renders independently of the rest of the UI.
   - Implement `useCallback` for event handlers.

5. **Styling Approach**
   - Keep the existing `style.css` and import it globally.
   - Use CSS variables for theming (already implemented).
   - Consider CSS Modules for component‑specific styles if the codebase grows.

## Migration Steps

### Phase 1: Project Setup & Dependencies
1. Install React, React‑DOM, and TypeScript (if chosen).
2. Install `@react‑three/fiber`, `@react‑three/drei`.
3. Install `@gsap/react` (or keep GSAP as is).
4. Update `vite.config.js` for React/TypeScript.
5. Convert `index.html` to React entry point (`main.jsx`).

### Phase 2: Core Component Structure
1. Create `App.jsx` with basic layout.
2. Create `BackgroundScene.jsx` – port the shader mesh from `scene.js`.
3. Create `CustomCursor.jsx` – move cursor logic from `cursor.js`.
4. Create `ThemeToggle.jsx` and `BackToTop.jsx` – port existing functionality.
5. Create section components (Hero, About, Tech, Projects, Contact).

### Phase 3: Animation Migration
1. Move hero‑title morphing (`heroTitleAnimation.js`) to `HeroSection` with `useGSAP`.
2. Move scroll animations (`animations.js`) to respective sections using `ScrollTrigger`.
3. Move card hover 3D tilt to each card component.
4. Move title‑bar animation (`titleAnimation.js`) to a custom hook.

### Phase 4: Three.js + GSAP Integration
1. In `BackgroundScene`, create refs for mesh uniforms.
2. Use GSAP timelines to animate uniforms (e.g., color transitions, distortion strength) triggered by scroll or mouse.
3. Ensure proper cleanup of GSAP instances and Three.js resources.

### Phase 5: Polish & Optimization
1. Implement theme context and apply to Three.js materials.
2. Add responsive improvements.
3. Test performance (Lighthouse, frame‑rate).
4. Bundle analysis and code‑splitting where needed.

## Risk Mitigation
- **Three.js learning curve** – Use react‑three/fiber’s declarative API.
- **GSAP memory leaks** – Always return cleanup functions in `useEffect`.
- **Bundle size** – Monitor inclusion of Three.js and GSAP; consider lazy‑loading `BackgroundScene` if necessary.

## Success Criteria
- All existing visual features work identically (or better).
- Smooth 60 fps animations on mid‑range devices.
- Code is modular, well‑documented, and follows React best practices.
- Easy to extend with new sections or animations.

## Next Steps
1. Review this plan with the user.
2. Adjust based on feedback.
3. Switch to **Code** mode and begin implementation.