import React, { useCallback, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

const orbitSkills = [
  { name: 'Python', detail: 'AI, automation, and backend systems.' },
  { name: 'TypeScript', detail: 'Type-safe application development.' },
  { name: 'React', detail: 'Reusable, interactive web interfaces.' },
  { name: 'Three.js', detail: 'Real-time 3D experiences for the web.' },
  { name: 'PyTorch', detail: 'Machine learning and neural networks.' },
  { name: 'Node.js', detail: 'JavaScript services and APIs.' },
  { name: 'PostgreSQL', detail: 'Reliable relational data storage.' },
  { name: 'Docker', detail: 'Portable development and deployment.' },
  { name: 'FastAPI', detail: 'Fast Python APIs.' },
  { name: 'GSAP', detail: 'Expressive interface and scroll motion.' },
  { name: 'AWS', detail: 'Cloud infrastructure and services.' },
  { name: 'OpenCV', detail: 'Computer vision and image processing.' },
];

const orbitPositions = orbitSkills.map((_, index) => {
  const y = 1 - (index / (orbitSkills.length - 1)) * 2;
  const radius = Math.sqrt(1 - y * y);
  const angle = index * Math.PI * (3 - Math.sqrt(5));

  return {
    x: Math.cos(angle) * radius * 1.24,
    y: y * 1.1,
    z: Math.sin(angle) * radius * 1.24,
  };
});

type OrbitRotation = { x: number; y: number };

const OrbitScene: React.FC<{
  rotation: React.MutableRefObject<OrbitRotation>;
  setInvalidate: (invalidate: () => void) => void;
  onSelect: (skill: typeof orbitSkills[number]) => void;
  selectedName: string;
}> = ({ rotation, setInvalidate, onSelect, selectedName }) => {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const invalidate = useThree((state) => state.invalidate);

  React.useEffect(() => setInvalidate(invalidate), [invalidate, setInvalidate]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.set(rotation.current.x, rotation.current.y, 0);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1.02, 28, 20]} />
        <meshBasicMaterial color="#72e4d8" wireframe transparent opacity={0.18} depthWrite={false} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0.25, 0]}>
        <torusGeometry args={[1.3, 0.003, 4, 100]} />
        <meshBasicMaterial color="#72e4d8" transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[0.42, 0, 0.8]}>
        <torusGeometry args={[1.38, 0.002, 4, 100]} />
        <meshBasicMaterial color="#9c9cff" transparent opacity={0.32} />
      </mesh>
      {orbitSkills.map((skill, index) => {
        const point = orbitPositions[index];
        return (
          <group key={skill.name} position={[point.x, point.y, point.z]}>
            <mesh>
              <sphereGeometry args={[selectedName === skill.name ? 0.055 : 0.032, 10, 8]} />
              <meshBasicMaterial color={selectedName === skill.name ? '#72e4d8' : '#a5b2c4'} />
            </mesh>
            <Html center distanceFactor={4} occlude={[sphereRef]} zIndexRange={[20, 0]}>
              <button
                className={`tech-orbit-chip ${selectedName === skill.name ? 'is-selected' : ''}`}
                type="button"
                onMouseEnter={() => onSelect(skill)}
                onFocus={() => onSelect(skill)}
                onClick={() => onSelect(skill)}
                aria-pressed={selectedName === skill.name}
              >
                {skill.name}
              </button>
            </Html>
          </group>
        );
      })}
    </group>
  );
};

const TechOrbit: React.FC = () => {
  const rotation = useRef({ x: -0.18, y: 0 });
  const drag = useRef({ active: false, x: 0, y: 0, rotationX: -0.18, rotationY: 0 });
  const invalidateRef = useRef<(() => void) | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(orbitSkills[0]);
  const setInvalidate = useCallback((invalidate: () => void) => {
    invalidateRef.current = invalidate;
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('button')) return;
    drag.current = {
      active: true,
      x: event.clientX,
      y: event.clientY,
      rotationX: rotation.current.x,
      rotationY: rotation.current.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    rotation.current.x = drag.current.rotationX + (event.clientY - drag.current.y) * 0.006;
    rotation.current.y = drag.current.rotationY + (event.clientX - drag.current.x) * 0.006;
    invalidateRef.current?.();
  };

  const handlePointerUp = () => {
    drag.current.active = false;
    setIsDragging(false);
    invalidateRef.current?.();
  };

  return (
    <div className="tech-orbit-wrap">
      <div
        className={`tech-orbit-stage ${isDragging ? 'is-dragging' : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onLostPointerCapture={handlePointerUp}
        aria-label="Interactive 3D technology sphere. Swipe or drag to rotate; tap a label to see details."
      >
        <Canvas
          className="tech-orbit-canvas"
          frameloop="demand"
          dpr={[1, 1.35]}
          camera={{ position: [0, 0, 4.3], fov: 42 }}
          gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
        >
          <OrbitScene
            rotation={rotation}
            setInvalidate={setInvalidate}
            onSelect={setSelectedSkill}
            selectedName={selectedSkill.name}
          />
        </Canvas>
        <span className="tech-orbit-hint">DRAG OR SWIPE TO ROTATE</span>
      </div>
      <div className="tech-orbit-detail" aria-live="polite">
        <span>IN FOCUS</span>
        <strong>{selectedSkill.name}</strong>
        <p>{selectedSkill.detail}</p>
      </div>
    </div>
  );
};

const TechStackSection: React.FC = () => {
  return (
    <section id="tech" className="content-section">
      <h2>Arsenal</h2>
      <TechOrbit />
      <div className="bento-grid">
        <div className="bento-card">
          <h3>Languages</h3>
          <div className="tech-tags">
            <span className="tech-tag">Python</span>
            <span className="tech-tag">JavaScript</span>
            <span className="tech-tag">TypeScript</span>
            <span className="tech-tag">PHP</span>
            <span className="tech-tag">C++</span>
            <span className="tech-tag">Lua</span>
            <span className="tech-tag">Dart</span>
            <span className="tech-tag">Java</span>
            <span className="tech-tag">Go</span>
            <span className="tech-tag">Rust</span>
            <span className="tech-tag">SQL</span>
            <span className="tech-tag">Bash</span>
          </div>
        </div>
        <div className="bento-card">
          <h3>AI / ML</h3>
          <div className="tech-tags">
            <span className="tech-tag">TensorFlow</span>
            <span className="tech-tag">PyTorch</span>
            <span className="tech-tag">OpenCV</span>
            <span className="tech-tag">NumPy</span>
            <span className="tech-tag">Pandas</span>
            <span className="tech-tag">Scikit-learn</span>
            <span className="tech-tag">Keras</span>
            <span className="tech-tag">Hugging Face</span>
            <span className="tech-tag">LangChain</span>
            <span className="tech-tag">YOLO</span>
          </div>
        </div>
        <div className="bento-card">
          <h3>Full Stack</h3>
          <div className="tech-tags">
            <span className="tech-tag">Django</span>
            <span className="tech-tag">Flask</span>
            <span className="tech-tag">FastAPI</span>
            <span className="tech-tag">Express</span>
            <span className="tech-tag">Node.js</span>
            <span className="tech-tag">React</span>
            <span className="tech-tag">Next.js</span>
            <span className="tech-tag">Vue</span>
            <span className="tech-tag">Tailwind</span>
            <span className="tech-tag">Three.js</span>
          </div>
        </div>
        <div className="bento-card">
          <h3>DevOps & Tools</h3>
          <div className="tech-tags">
            <span className="tech-tag">Git</span>
            <span className="tech-tag">Docker</span>
            <span className="tech-tag">Kubernetes</span>
            <span className="tech-tag">Linux</span>
            <span className="tech-tag">AWS</span>
            <span className="tech-tag">Google Cloud</span>
            <span className="tech-tag">Vercel</span>
            <span className="tech-tag">PostgreSQL</span>
            <span className="tech-tag">MongoDB</span>
            <span className="tech-tag">Redis</span>
            <span className="tech-tag">Figma</span>
          </div>
        </div>
        <div className="bento-card">
          <h3>Mobile & Desktop</h3>
          <div className="tech-tags">
            <span className="tech-tag">Flutter</span>
            <span className="tech-tag">React Native</span>
            <span className="tech-tag">Electron</span>
            <span className="tech-tag">Android SDK</span>
            <span className="tech-tag">iOS</span>
            <span className="tech-tag">Xamarin</span>
          </div>
        </div>
        <div className="bento-card">
          <h3>Design & Content</h3>
          <div className="tech-tags">
            <span className="tech-tag">Photoshop</span>
            <span className="tech-tag">Illustrator</span>
            <span className="tech-tag">After Effects</span>
            <span className="tech-tag">Blender</span>
            <span className="tech-tag">GSAP</span>
            <span className="tech-tag">WebGL</span>
          </div>
        </div>
        <div className="bento-card">
          <h3>Problem Solving</h3>
          <div className="tech-tags">
            <span className="tech-tag">Algorithms</span>
            <span className="tech-tag">Data Structures</span>
            <span className="tech-tag">System Design</span>
            <span className="tech-tag">Code Review</span>
            <span className="tech-tag">Debugging</span>
            <span className="tech-tag">Optimization</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
