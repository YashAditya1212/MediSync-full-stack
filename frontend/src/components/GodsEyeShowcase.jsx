import React, { useState, useEffect, useRef } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const GodsEyeShowcase = () => {
  const slides = [
    { // Slide 1
      label: 'INTRODUCING',
      title: ['Why Make an', 'God\'s Eye'],
      subtext: 'God\'s Eye is MediSync\'s real-time AI surveillance and emergency response engine. It watches over every corner of the healthcare network — so when a life is at risk, it acts before you even ask.',
      background: assets.eye_video,
      is_video: true
    },
    { // Slide 2
      label: 'HOW IT WORKS',
      title: ['Detect.', 'Dispatch.', 'Save.'],
      subtext: 'The moment an emergency is detected — a road accident, a cardiac event, a critical patient alert — God\'s Eye instantly cross-references every hospital on the MediSync network, identifies the nearest available bed, and dispatches a booking confirmation in under 3 seconds. Simultaneously, it fires automated alerts to:',
      list: [
        'Local emergency services and ambulance dispatch',
        'The nearest partner hospital\'s duty doctor',
        'The patient\'s registered emergency contact',
        'District health authority and government monitoring dashboard'
      ],
      background: assets.aerial_hospital
    },
    { // Slide 3
      label: 'NATIONAL INFRASTRUCTURE',
      title: ['Built for', 'Governments.'],
      subtext: 'God\'s Eye is not just a hospital feature — it is national health infrastructure. It feeds live anonymized data to district, state, and central health ministries, giving authorities a real-time dashboard of bed availability, emergency hotspots, epidemic early warnings, and resource gaps across every city it operates in.',
      stats: [
        { value: '< 3s', label: 'Emergency bed booked' },
        { value: '100%', label: 'Automated authority notification' },
        { value: '24/7', label: 'Real-time network surveillance' }
      ],
      background: assets.gallery_3
    },
    { // Slide 4
      label: 'WHY IT MATTERS',
      title: ['Every Second', 'Is Someone\'s', 'Everything.'],
      subtext: 'In a country where millions live hours away from the nearest specialist, where ambulances get lost, where families don\'t know which hospital has a free ICU bed — God\'s Eye closes that gap. It is the difference between reaching help in time and not reaching at all. It exists because every life deserves a system that fights for it.',
      background: assets.gallery_1
    },
    { // Slide 5
      label: 'GET STARTED',
      title: ['Let God\'s Eye', 'Watch Over You.'],
      subtext: 'Available to hospitals, government bodies, and individual patients on the MediSync platform.',
      background: assets.eye_video,
      is_video: true,
      cta: true
    }
  ];

  const [activeSlide, setActiveSlide] = useState(0);
  const scrollContainerRef = useRef(null);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  const startScrolling = () => {
    intervalRef.current = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % slides.length);
    }, 5000);
  };

  const stopScrolling = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: activeSlide * window.innerHeight,
        behavior: 'smooth'
      });
    }
  }, [activeSlide]);

  useEffect(() => {
    startScrolling();
    return () => stopScrolling();
  }, []);

  return (
    <section 
      className="relative w-full h-screen bg-[#050E08] text-white overflow-hidden"
      onMouseEnter={stopScrolling}
      onMouseLeave={startScrolling}
    >
      <div ref={scrollContainerRef} className="w-full h-full overflow-y-scroll snap-y snap-mandatory">
        {slides.map((slide, index) => (
          <div key={index} className="w-full h-screen snap-start relative flex items-center justify-center">
            {slide.is_video ? (
              <video autoPlay loop muted playsInline src={slide.background} className="absolute top-0 left-0 w-full h-full object-cover" style={{ zIndex: 0, transform: 'rotate(-90deg) scale(1.5)' }} />
            ) : (
              <img src={slide.background} className="absolute top-0 left-0 w-full h-full object-cover" style={{ zIndex: 0 }} />
            )}
            <div className="absolute inset-0 bg-[rgba(5,14,8,0.72)]" style={{ zIndex: 1 }} />
            
            <div className="absolute top-10 right-10 text-[clamp(4rem,10vw,8rem)] font-bold opacity-12" style={{ zIndex: 2 }}>
              0{index + 1}
            </div>

            <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
              <p className="text-[#ADEBB3] tracking-widest uppercase text-sm mb-4">{slide.label}</p>
              <h1 className="font-serif text-6xl md:text-8xl font-bold mb-6">
                {Array.isArray(slide.title) ? slide.title.map((line, i) => (
                  <span key={i} className={`block ${i === 1 ? 'italic' : ''} ${line.includes('Save') || line.includes('Governments') || line.includes('Everything') ? 'text-[#ADEBB3]' : ''}`}>{line}</span>
                )) : slide.title}
              </h1>
              <p className="text-white/80 max-w-2xl mx-auto mb-8">{slide.subtext}</p>
              
              {slide.list && (
                <ul className="text-left max-w-md mx-auto space-y-2 mb-8">
                  {slide.list.map((item, i) => (
                    <li key={i} className="flex items-center"><span className="text-[#ADEBB3] mr-2">→</span> {item}</li>
                  ))}
                </ul>
              )}

              {slide.stats && (
                <div className="flex justify-center gap-4 mb-8">
                  {slide.stats.map((stat, i) => (
                    <div key={i} className="bg-[rgba(173,235,179,0.06)] border border-[rgba(173,235,179,0.15)] rounded-2xl p-4 text-center">
                      <p className="text-3xl font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-white/70 uppercase tracking-wider">{stat.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {slide.cta && (
                <div className="flex justify-center gap-4">
                  <button onClick={() => navigate('/join')} className="px-8 py-3 bg-[#ADEBB3] text-[#050E08] font-bold rounded-full">ACTIVATE FOR YOUR HOSPITAL</button>
                  <button onClick={() => navigate('/gods-eye')} className="px-8 py-3 border border-white/50 text-white font-bold rounded-full">LEARN MORE</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
        {slides.map((_, index) => (
          <button 
            key={index} 
            onClick={() => setActiveSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSlide === index ? 'h-6 bg-[#ADEBB3]' : 'bg-white/30'}`}
          />
        ))}
      </div>

      {activeSlide < slides.length - 1 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <svg className="w-6 h-6 text-white/50" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      )}
    </section>
  );
};

export default GodsEyeShowcase;
