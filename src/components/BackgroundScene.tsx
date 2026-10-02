import React, { useRef, useEffect, useMemo } from 'react';
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

function CursorParticles() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const positions = useMemo(() => {
    const points = new Float32Array(360 * 3);
    for (let index = 0; index < 360; index += 1) {
      const seed = index + 1;
      points[index * 3] = ((seed * 127.1) % 2000) / 100 - 10;
      points[index * 3 + 1] = ((seed * 311.7) % 1200) / 100 - 6;
      points[index * 3 + 2] = ((seed * 74.7) % 150) / 100 + 0.7;
    }
    return points;
  }, []);

  useEffect(() => {
    const updateMouse = (event: MouseEvent) => {
      mouse.current.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        1 - (event.clientY / window.innerHeight) * 2,
      );
    };

    window.addEventListener('mousemove', updateMouse);
    return () => window.removeEventListener('mousemove', updateMouse);
  }, []);

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uMouse.value.lerp(mouse.current, 0.1);
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{ uTime: { value: 0 }, uMouse: { value: new THREE.Vector2() } }}
        vertexShader={`
          uniform float uTime;
          uniform vec2 uMouse;
          varying float vAlpha;
          void main() {
            vec3 pointPosition = position;
            pointPosition.z += sin(uTime * 0.7 + position.x * 1.4 + position.y) * 0.035;
            vec4 viewPosition = modelViewMatrix * vec4(pointPosition, 1.0);
            vec4 clipPosition = projectionMatrix * viewPosition;
            float cursorDistance = distance(clipPosition.xy / clipPosition.w, uMouse);
            float influence = 1.0 - smoothstep(0.0, 0.42, cursorDistance);
            viewPosition.z += influence * 0.55;
            gl_Position = projectionMatrix * viewPosition;
            gl_PointSize = clamp((2.0 + influence * 5.0) * (5.0 / -viewPosition.z), 1.5, 8.0);
            vAlpha = 0.18 + influence * 0.58;
          }
        `}
        fragmentShader={`
          varying float vAlpha;
          void main() {
            float distanceFromCenter = length(gl_PointCoord - vec2(0.5));
            float pointAlpha = 1.0 - smoothstep(0.22, 0.5, distanceFromCenter);
            gl_FragColor = vec4(0.35, 0.82, 0.8, pointAlpha * vAlpha);
          }
        `}
      />
    </points>
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
      <CursorParticles />
      <AnimatedMesh />
    </Canvas>
  );
};

export default BackgroundScene;
