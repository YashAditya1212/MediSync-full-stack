import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const Stars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(8000), { radius: 2 }));

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 15;
    ref.current.rotation.y -= delta / 20;
    
    // Subtle parallax based on mouse
    const x = (state.mouse.x * state.viewport.width) / 5;
    const y = (state.mouse.y * state.viewport.height) / 5;
    ref.current.rotation.x += (y - ref.current.rotation.x) * 0.02;
    ref.current.rotation.y += (x - ref.current.rotation.y) * 0.02;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#059669"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
};

const FloatingShapes = () => {
  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[1, 1, 0]} scale={0.2}>
          <dodecahedronGeometry />
          <meshStandardMaterial color="#34d399" wireframe transparent opacity={0.1} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[-2, -1, 0]} scale={0.3}>
          <icosahedronGeometry />
          <meshStandardMaterial color="#059669" wireframe transparent opacity={0.1} />
        </mesh>
      </Float>
      <Float speed={3} rotationIntensity={1} floatIntensity={0.5}>
        <mesh position={[2, -2, 0]} scale={0.15}>
          <octahedronGeometry />
          <meshStandardMaterial color="#10b981" wireframe transparent opacity={0.15} />
        </mesh>
      </Float>
    </group>
  );
};

const StarryBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#f0fdfa] via-white to-[#e6fffa]">
      <Canvas camera={{ position: [0, 0, 2] }}>
        <ambientLight intensity={0.5} />
        <Stars />
        <FloatingShapes />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export default StarryBackground;
