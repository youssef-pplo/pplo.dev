import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';

// Define the shader material using drei's shaderMaterial helper
const GradientShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor1: new THREE.Color(0x111111),
    uColor2: new THREE.Color(0x222222),
    uMouse: new THREE.Vector2(0, 0),
  },
  // vertex shader
  `
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
      pos.z += effect * 2.0;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // fragment shader
  `
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
  `
);

extend({ GradientShaderMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      gradientShaderMaterial: any;
    }
  }
}

function AnimatedMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = elapsedTime * 0.5;
      // Smoothly interpolate mouse uniform
      materialRef.current.uniforms.uMouse.value.lerp(mouse.current, 0.1);
    }
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to 0..1
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = 1.0 - (e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 3, 0, 0]}>
      <planeGeometry args={[20, 20, 64, 64]} />
      <gradientShaderMaterial
        ref={materialRef}
        wireframe
        transparent
        attach="material"
      />
    </mesh>
  );
}

const BackgroundScene: React.FC = () => {
  return (
    <Canvas
      id="bg-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        opacity: 0.5,
      }}
      camera={{ position: [0, 0, 5], fov: 75 }}
    >
      <AnimatedMesh />
    </Canvas>
  );
};

export default BackgroundScene;
