import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const content = [
  {
    subtitle: "Bird's Eye View",
    title: "A Campus Built for Healing",
    description: "From above, our campus unfolds across lush green surroundings — a self-contained world of healing. Spanning over 15 acres, our state-of-the-art buildings, serene healing gardens, and patient-first infrastructure come together to create an environment where recovery feels natural.",
  },
  {
    subtitle: "Advanced Technology",
    title: "Innovation at Your Service",
    description: "Our commitment to innovation is reflected in our cutting-edge medical technology and advanced treatment options. We continuously invest in the latest equipment and research to provide our patients with the best possible care.",
  },
  {
    subtitle: "Patient-Centered Care",
    title: "Compassion in Every Interaction",
    description: "At the heart of our philosophy is a deep commitment to patient-centered care. We believe in treating every patient with empathy, respect, and personalized attention, ensuring a comfortable and supportive healing journey.",
  },
];

const GodsEyeSection = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollSpeed, setScrollSpeed] = useState(500); // Default speed

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % content.length);
    }, scrollSpeed); // Change content based on scrollSpeed

    return () => clearInterval(interval);
  }, [scrollSpeed]);

  const handleMouseEnter = () => setScrollSpeed(700); // Slower speed on hover
  const handleMouseLeave = () => setScrollSpeed(500); // Reset to default speed

  return (
    <section 
      className="relative w-full h-[85vh] overflow-hidden group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* PARALLAX BACKGROUND WITH SLOW ZOOM */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[12000ms] ease-in-out group-hover:scale-110"
        style={{ 
          backgroundImage: `url(${assets.aerial_hospital})`,
          backgroundAttachment: 'scroll',
          animation: 'slowZoom 12s ease-in-out infinite alternate'
        }}
      />
      
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-[#1D3528]/65" />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div 
          className="max-w-3xl space-y-6 transition-opacity duration-1000 ease-in-out"
          data-aos="fade-up"
        >
          <span className="text-[var(--mint)] font-bold tracking-[0.3em] uppercase text-xs sm:text-sm font-sans">
            {content[currentIndex].subtitle}
          </span>
          
          <h2 className="text-4xl md:text-[56px] font-bold text-white font-serif leading-tight">
            {content[currentIndex].title}
          </h2>
          
          <p className="text-white/80 text-base sm:text-lg leading-relaxed font-sans max-w-2xl mx-auto">
            {content[currentIndex].description}
          </p>

          <div className="pt-8">
            <button 
              onClick={() => navigate('/gods-eye')}
              className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-[var(--mint)] text-[var(--mint)] font-bold rounded-full transition-all duration-300 hover:bg-[var(--mint)] hover:text-[var(--deep-dark)]"
            >
              Access God's Eye AI
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GodsEyeSection;
