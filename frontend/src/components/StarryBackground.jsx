import React, { useRef, useState, useContext } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { DarkModeContext } from '../context/DarkModeContext';

const Stars = ({ isDarkMode }) => {
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
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={isDarkMode ? "#60a5fa" : "#059669"}
          size={isDarkMode ? 0.004 : 0.003}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={isDarkMode ? 0.8 : 0.6}
        />
      </Points>
    </group>
  );
};

const FloatingShapes = ({ isDarkMode }) => {
  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[1, 1, 0]} scale={0.2}>
          <dodecahedronGeometry />
          <meshStandardMaterial 
            color={isDarkMode ? "#60a5fa" : "#34d399"} 
            wireframe 
            transparent 
            opacity={isDarkMode ? 0.15 : 0.1} 
          />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[-2, -1, 0]} scale={0.3}>
          <icosahedronGeometry />
          <meshStandardMaterial 
            color={isDarkMode ? "#818cf8" : "#059669"} 
            wireframe 
            transparent 
            opacity={isDarkMode ? 0.15 : 0.1} 
          />
        </mesh>
      </Float>
      <Float speed={3} rotationIntensity={1} floatIntensity={0.5}>
        <mesh position={[2, -2, 0]} scale={0.15}>
          <octahedronGeometry />
          <meshStandardMaterial 
            color={isDarkMode ? "#a78bfa" : "#10b981"} 
            wireframe 
            transparent 
            opacity={isDarkMode ? 0.2 : 0.15} 
          />
        </mesh>
      </Float>
    </group>
  );
};

const StarryBackground = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  
  return (
    <div className={`fixed inset-0 -z-10 transition-all duration-500 ease-in-out ${
      isDarkMode 
        ? 'bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]' 
        : 'bg-gradient-to-br from-[#f0fdfa] via-white to-[#e6fffa]'
    }`}>
      <Canvas camera={{ position: [0, 0, 2] }}>
        <ambientLight intensity={isDarkMode ? 0.3 : 0.5} />
        <Stars isDarkMode={isDarkMode} />
        <FloatingShapes isDarkMode={isDarkMode} />
      </Canvas>
      <div className={`absolute inset-0 pointer-events-none transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-t from-[#1e293b]/50 via-transparent to-transparent' 
          : 'bg-gradient-to-t from-white/50 via-transparent to-transparent'
      }`} />
    </div>
  );
};

export default StarryBackground;
