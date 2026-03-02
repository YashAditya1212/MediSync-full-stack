import React, { useEffect, useState, useRef } from 'react'

const CursorAnimation = () => {
  const [trail, setTrail] = useState([])
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const trailRef = useRef([])
  const rafRef = useRef(null)

  useEffect(() => {
    const updateMousePosition = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
      
      const newPoint = {
        x: e.clientX,
        y: e.clientY,
        time: Date.now(),
        id: Date.now() + Math.random(),
      }

      trailRef.current.push(newPoint)
      
      // Keep trail length manageable (25 points for smooth stream)
      if (trailRef.current.length > 25) {
        trailRef.current.shift()
      }
    }

    const animate = () => {
      const now = Date.now()
      
      // Remove points older than 300ms for longer trail
      trailRef.current = trailRef.current.filter(point => now - point.time < 300)
      
      // Calculate opacity and scale based on age
      const updatedTrail = trailRef.current.map((point, index) => {
        const age = now - point.time
        const maxAge = 300
        const opacity = Math.max(0, 1 - (age / maxAge))
        
        // Scale from small to large (older points are smaller)
        const scale = 0.3 + (opacity * 0.7)
        
        return {
          ...point,
          opacity,
          scale,
        }
      })

      setTrail(updatedTrail)
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', updateMousePosition)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <div className="fixed pointer-events-none z-[9999] inset-0">
      {/* Glowing stream trail - creates continuous flowing effect */}
      {trail.map((point, index) => {
        const baseSize = 8
        const size = baseSize * (point.scale || 1)
        const glowIntensity = (point.opacity || 1) * 0.9
        
        return (
          <div
            key={point.id}
            className="absolute rounded-full"
            style={{
              left: `${point.x}px`,
              top: `${point.y}px`,
              transform: `translate(-50%, -50%) scale(${point.scale || 1})`,
              width: `${size}px`,
              height: `${size}px`,
              background: `radial-gradient(circle, rgba(148, 255, 212, ${glowIntensity}) 0%, rgba(148, 255, 212, ${glowIntensity * 0.5}) 40%, rgba(148, 255, 212, ${glowIntensity * 0.2}) 70%, transparent 100%)`,
              opacity: point.opacity || 1,
              boxShadow: `
                0 0 ${6 * glowIntensity}px rgba(148, 255, 212, ${glowIntensity}),
                0 0 ${12 * glowIntensity}px rgba(148, 255, 212, ${glowIntensity * 0.7}),
                0 0 ${18 * glowIntensity}px rgba(148, 255, 212, ${glowIntensity * 0.5}),
                0 0 ${24 * glowIntensity}px rgba(148, 255, 212, ${glowIntensity * 0.3})
              `,
              filter: `blur(${2 * (1 - point.opacity)}px)`,
              willChange: 'transform, opacity',
            }}
          />
        )
      })}
      
      {/* Main cursor - brightest glow at current position */}
      <div
        className="absolute rounded-full"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transform: 'translate(-50%, -50%)',
          width: '16px',
          height: '16px',
          background: 'radial-gradient(circle, #94FFD4 0%, rgba(148, 255, 212, 0.8) 40%, rgba(148, 255, 212, 0.4) 70%, transparent 100%)',
          boxShadow: `
            0 0 20px rgba(148, 255, 212, 1),
            0 0 40px rgba(148, 255, 212, 0.9),
            0 0 60px rgba(148, 255, 212, 0.7),
            0 0 80px rgba(148, 255, 212, 0.5)
          `,
          filter: 'blur(0.5px)',
          willChange: 'transform',
          transition: 'none',
        }}
      />
    </div>
  )
}

export default CursorAnimation
