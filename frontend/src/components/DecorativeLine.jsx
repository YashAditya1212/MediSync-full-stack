import React from 'react'

const DecorativeLine = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {/* Main zig-zag curvy line - flows from header to end of page */}
      <svg 
        className="absolute w-full h-full wavy-line" 
        preserveAspectRatio="none"
        viewBox="0 0 1920 1080"
        xmlns="http://www.w3.org/2000/svg"
        style={{ minHeight: '100%' }}
      >
        {/* Primary zig-zag curvy line - darker and bolder */}
        <path
          d="M 0,200 Q 200,100 400,200 T 800,200 T 1200,200 T 1600,200 T 1920,200"
          stroke="#94FFD4"
          strokeWidth="4"
          fill="none"
          opacity="0.8"
        />
        
        {/* Secondary curvy line - slightly offset */}
        <path
          d="M 0,500 Q 250,400 500,500 T 1000,500 T 1500,500 T 1920,500"
          stroke="#94FFD4"
          strokeWidth="3"
          fill="none"
          opacity="0.6"
        />
        
        {/* Third curvy line */}
        <path
          d="M 0,800 Q 180,700 360,800 T 720,800 T 1080,800 T 1440,800 T 1920,800"
          stroke="#94FFD4"
          strokeWidth="2.5"
          fill="none"
          opacity="0.5"
        />
        
        {/* Additional accent lines for depth */}
        <path
          d="M 0,350 Q 150,300 300,350 T 600,350 T 900,350 T 1200,350 T 1500,350 T 1920,350"
          stroke="#94FFD4"
          strokeWidth="2"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M 0,650 Q 200,600 400,650 T 800,650 T 1200,650 T 1600,650 T 1920,650"
          stroke="#94FFD4"
          strokeWidth="2"
          fill="none"
          opacity="0.4"
        />
      </svg>
      
      {/* Additional CSS-based decorative lines for depth */}
      <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#94FFD4]/60 to-transparent transform -skew-y-6"></div>
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#94FFD4]/50 to-transparent transform skew-y-6"></div>
      <div className="absolute top-3/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#94FFD4]/60 to-transparent transform -skew-y-6"></div>
    </div>
  )
}

export default DecorativeLine
