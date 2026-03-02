import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Dot snaps instantly
  const dotX = useSpring(mouseX, { damping: 30, stiffness: 800, mass: 0.2 });
  const dotY = useSpring(mouseY, { damping: 30, stiffness: 800, mass: 0.2 });

  // Ring lags slightly behind for a subtle trailing feel
  const ringX = useSpring(mouseX, { damping: 28, stiffness: 250, mass: 0.5 });
  const ringY = useSpring(mouseY, { damping: 28, stiffness: 250, mass: 0.5 });

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const clickable = target.closest('button, a, [role="button"], input, select, textarea, label[for], [onClick]');
      setIsPointer(!!clickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <>
      {/* Outer ring - lags behind, expands on hover */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-primary"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isPointer ? 44 : 32,
          height: isPointer ? 44 : 32,
          opacity: isVisible ? (isPointer ? 0.6 : 0.4) : 0,
          borderWidth: isPointer ? '1.5px' : '1px',
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Inner dot - snaps instantly, fills on hover */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-primary"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isPointer ? 6 : 5,
          height: isPointer ? 6 : 5,
          opacity: isVisible ? 1 : 0,
          scale: isPointer ? 0.6 : 1,
        }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
};

export default CustomCursor;