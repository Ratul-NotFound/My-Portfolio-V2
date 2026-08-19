'use client';
import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleNetwork({ count = 85 }) {
  const pointsRef = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const color1 = new THREE.Color('#f4efe6'); // Sand/Cream
    const color2 = new THREE.Color('#38bdf8'); // Sky Blue
    const color3 = new THREE.Color('#a39e93'); // Warm Slate

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const mixColor = Math.random() < 0.4 ? color1 : (Math.random() < 0.7 ? color2 : color3);
      col[i * 3] = mixColor.r;
      col[i * 3 + 1] = mixColor.g;
      col[i * 3 + 2] = mixColor.b;
    }
    return [pos, col];
  }, [count]);

  const mouse = useRef({ x: 0, y: 0 });
  const isVisible = useRef(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      // Pause 3D frame rendering when scrolled past hero viewport to save 100% GPU
      isVisible.current = window.scrollY < (window.innerHeight || 800);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useFrame((state, delta) => {
    // Only execute if Hero section is currently in viewport
    if (!isVisible.current) return;

    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.035;
      pointsRef.current.rotation.x += delta * 0.012;

      pointsRef.current.position.x += (mouse.current.x * 0.35 - pointsRef.current.position.x) * 0.04;
      pointsRef.current.position.y += (mouse.current.y * 0.35 - pointsRef.current.position.y) * 0.04;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroCanvas() {
  const [particleCount, setParticleCount] = useState(70);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setParticleCount(window.innerWidth < 768 ? 40 : 80);
    }
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-50">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: false
        }}
      >
        <ambientLight intensity={0.5} />
        <ParticleNetwork count={particleCount} />
      </Canvas>
    </div>
  );
}
