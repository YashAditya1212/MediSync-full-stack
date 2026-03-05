import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [isTextHover, setIsTextHover] = useState(false);

  const springConfig = { damping: 26, stiffness: 600 };
  const trailSpringConfig = { damping: 24, stiffness: 180 };

  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  
  const trailX = useSpring(mouseX, trailSpringConfig);
  const trailY = useSpring(mouseY, trailSpringConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });

    const textTags = new Set([
      'P',
      'SPAN',
      'A',
      'LI',
      'H1',
      'H2',
      'H3',
      'H4',
      'H5',
      'H6',
      'LABEL',
      'BUTTON',
      'SMALL',
      'STRONG',
      'EM',
    ]);

    const handleMouseOver = (e) => {
      let el = e.target;

      // Walk up the DOM tree to find a text-like element
      while (el && el !== document.body) {
        if (textTags.has(el.tagName)) {
          // Clear previous target if any
          const prev = document.querySelector('.cursor-magnify-text');
          if (prev && prev !== el) {
            prev.classList.remove('cursor-magnify-text');
          }

          el.classList.add('cursor-magnify-text');
          setIsTextHover(true);
          return;
        }
        el = el.parentElement;
      }

      // Not over text
      const prev = document.querySelector('.cursor-magnify-text');
      if (prev) {
        prev.classList.remove('cursor-magnify-text');
      }
      setIsTextHover(false);
    };

    const handleMouseOut = (e) => {
      const related = e.relatedTarget;
      if (!related) {
        const prev = document.querySelector('.cursor-magnify-text');
        if (prev) prev.classList.remove('cursor-magnify-text');
        setIsTextHover(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Main Dot */}
      {/* Simple custom cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-primary/90"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: 6,
          height: 6,
          opacity: 0.95,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      />

      {/* Very light halo */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-primary/40"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isTextHover ? 34 : 22,
          height: isTextHover ? 34 : 22,
          opacity: isTextHover ? 0.8 : 0.35,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      />
    </>
  );
};

export default CustomCursor;
