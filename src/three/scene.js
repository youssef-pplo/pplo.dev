import * as THREE from 'three';

export function initScene() {
  const canvas = document.querySelector('#bg-canvas');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Mouse Uniforms
  const mouse = new THREE.Vector2();

  // Abstract Gradient Mesh
  const geometry = new THREE.PlaneGeometry(20, 20, 64, 64); // Increased segments for smoother distortion
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color(0x111111) },
      uColor2: { value: new THREE.Color(0x222222) },
      uMouse: { value: new THREE.Vector2(0, 0) }
    },
    vertexShader: `
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2 uMouse;
      
      void main() {
        vUv = uv;
        vec3 pos = position;
        
        // Base wave
        pos.z += sin(pos.x * 2.0 + uTime) * 0.5;
        pos.z += cos(pos.y * 2.0 + uTime) * 0.5;
        
        // Mouse interaction (ripple/bulge)
        float dist = distance(uv, uMouse);
        float effect = smoothstep(0.5, 0.0, dist);
        pos.z += effect * 2.0; // Bulge effect
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec2 uMouse;
      
      void main() {
        float dist = distance(vUv, uMouse);
        vec3 color = mix(uColor1, uColor2, vUv.y);
        
        // Highlight around mouse
        color += vec3(0.1) * smoothstep(0.3, 0.0, dist);
        
        gl_FragColor = vec4(color, 0.5);
      }
    `,
    wireframe: true,
    transparent: true
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 3;
  scene.add(mesh);

  // Mouse Event Listener
  document.addEventListener('mousemove', (e) => {
    // Normalize mouse coordinates to 0..1
    mouse.x = e.clientX / window.innerWidth;
    mouse.y = 1.0 - (e.clientY / window.innerHeight); // Invert Y for UVs
  });

  const clock = new THREE.Clock();

  function animate() {
    const elapsedTime = clock.getElapsedTime();
    material.uniforms.uTime.value = elapsedTime * 0.5;

    // Smoothly interpolate mouse uniform
    material.uniforms.uMouse.value.lerp(mouse, 0.1);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();

  camera.position.z = 5;

  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
