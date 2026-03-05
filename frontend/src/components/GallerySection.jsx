import React, { useState, useEffect, useRef } from 'react'
import { assets } from '../assets/assets'

const GallerySection = () => {
  const [currentSlide, setCurrentSlide] = useState(1)
  const scrollRef = useRef(null)

  const galleryItems = [
    { src: assets.gallery_1, label: "Reception" },
    { src: assets.gallery_2, label: "Operation Suite" },
    { src: assets.gallery_3, label: "Consultation" },
    { src: assets.gallery_4, label: "Private Room" },
    { src: assets.gallery_5, label: "Diagnostics" },
  ]

  // Clone items for seamless infinite scroll
  const duplicatedItems = [...galleryItems, ...galleryItems, ...galleryItems]

  useEffect(() => {
    // Inject keyframes for smooth horizontal scroll
    const styleSheet = document.createElement("style")
    styleSheet.innerText = `
      @keyframes galleryScroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-33.33%); }
      }
      .gallery-track {
        display: flex;
        width: fit-content;
        animation: galleryScroll 40s linear infinite;
        transition: animation-duration 0.5s ease;
      }
      .gallery-track:hover {
        animation-duration: 120s;
      }
    `
    document.head.appendChild(styleSheet)

    // Slide counter logic
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev % galleryItems.length) + 1)
    }, 3000)

    return () => {
      document.head.removeChild(styleSheet)
      clearInterval(interval)
    }
  }, [galleryItems.length])

  return (
    <section 
      id="gallery" 
      className="relative w-full h-screen overflow-hidden bg-[var(--deep-dark)] flex flex-col justify-center"
    >
      {/* SECTION HEADING (TOP-LEFT) */}
      <div className="absolute top-12 left-12 z-20" data-aos="fade-down">
        <span className="text-[var(--mint)] font-bold tracking-[0.3em] uppercase text-xs block mb-2">
          Inside Our World
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-serif leading-tight">
          A Glimpse into <span className="text-[var(--mint)] italic">Excellence</span>
        </h2>
      </div>

      {/* VERTICAL LABEL (LEFT) */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden md:block">
        <p className="rotate-180 [writing-mode:vertical-lr] text-[var(--text-muted)] text-[10px] tracking-[0.5em] uppercase font-medium opacity-50">
          Gallery — Excellence in Care
        </p>
      </div>

      {/* CAROUSEL TRACK */}
      <div className="relative w-full mt-20">
        <div className="gallery-track">
          {duplicatedItems.map((item, index) => (
            <div 
              key={index}
              className="relative flex-shrink-0 px-4 group transition-all duration-700 ease-out"
              style={{ width: '450px' }}
            >
              <div className="relative h-[65vh] w-full overflow-hidden rounded-[24px] transition-transform duration-500 group-hover:scale-[1.03] cursor-pointer shadow-2xl">
                <img 
                  src={item.src} 
                  alt={item.label} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Label Text */}
                <div className="absolute bottom-8 left-8">
                  <p className="text-white text-3xl font-serif italic tracking-wide">
                    {item.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SLIDE COUNTER (BOTTOM CENTER) */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-8 z-20">
        <span className="text-white/40 font-mono text-sm">
          {String(currentSlide).padStart(2, '0')}
        </span>
        <div className="relative w-48 h-[1px] bg-white/20 overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-[var(--mint)] transition-all duration-1000 ease-in-out"
            style={{ width: `${(currentSlide / galleryItems.length) * 100}%` }}
          ></div>
        </div>
        <span className="text-white/40 font-mono text-sm">
          {String(galleryItems.length).padStart(2, '0')}
        </span>
      </div>

      {/* AMBIENT BACKGROUND GLOW */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[var(--mint)]/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[var(--mint)]/5 blur-[120px] rounded-full pointer-events-none"></div>

    </section>
  )
}

export default GallerySection
