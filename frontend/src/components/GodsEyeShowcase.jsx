import React, { useRef, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const GodsEyeShowcase = () => {
  const slides = [
    {
      label: 'INTRODUCING',
      title: ['Why Make an', "God's Eye"],
      subtext: "God's Eye is MediSync's real-time AI surveillance and emergency response engine. It watches over every corner of the healthcare network — so when a life is at risk, it acts before you even ask.",
      background: assets.eye_video,
      is_video: true
    },
    {
      label: 'HOW IT WORKS',
      title: ['Detect.', 'Dispatch.', 'Save.'],
      subtext: "The moment an emergency is detected — a road accident, a cardiac event, a critical patient alert — God's Eye instantly cross-references every hospital on the MediSync network, identifies the nearest available bed, and dispatches a booking confirmation in under 3 seconds.",
      list: [
        'Local emergency services and ambulance dispatch',
        "The nearest partner hospital's duty doctor",
        "The patient's registered emergency contact",
        'District health authority and government monitoring dashboard'
      ],
      background: assets.aerial_hospital
    },
    {
      label: 'NATIONAL INFRASTRUCTURE',
      title: ['Built for', 'Governments.'],
      subtext: "God's Eye is not just a hospital feature — it is national health infrastructure. It feeds live anonymized data to district, state, and central health ministries, giving authorities a real-time dashboard of bed availability, emergency hotspots, epidemic early warnings, and resource gaps across every city it operates in.",
      stats: [
        { value: '< 3s', label: 'Emergency bed booked' },
        { value: '100%', label: 'Automated authority notification' },
        { value: '24/7', label: 'Real-time network surveillance' }
      ],
      background: assets.gallery_3
    },
    {
      label: 'WHY IT MATTERS',
      title: ['Every Second', "Is Someone's", 'Everything.'],
      subtext: "In a country where millions live hours away from the nearest specialist, where ambulances get lost, where families don't know which hospital has a free ICU bed — God's Eye closes that gap. It is the difference between reaching help in time and not reaching at all. It exists because every life deserves a system that fights for it.",
      background: assets.gallery_1
    },
    {
      label: 'GET STARTED',
      title: ["Let God's Eye", 'Watch Over You.'],
      subtext: 'Available to hospitals, government bodies, and individual patients on the MediSync platform.',
      background: assets.eye_video,
      is_video: true,
      cta: true
    }
  ];

  const navigate = useNavigate();
  const totalSlides = slides.length;
  const sectionRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll progress to horizontal position
  // Each slide gets equal share of the scroll distance
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(totalSlides - 1) * 100]
  );

  // Track active slide for dot indicators
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const index = Math.round(latest * (totalSlides - 1));
    setActiveSlide(Math.min(index, totalSlides - 1));
  });

  return (
    <>
      {/*
        This wrapper creates the vertical distance needed to drive the
        horizontal showcase. Matching it to the slide count avoids a large
        empty gap before the next section.
      */}
      <div
        ref={sectionRef}
        className="relative"
        style={{ height: '100vh' }}
      >
        {/* Sticky viewport — stays pinned while we scroll through the tall wrapper */}
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-[#050E08]">
          {/* Horizontal track */}
          <motion.div
            className="flex h-full will-change-transform"
            style={{
              x: useTransform(x, (v) => `${v}vw`),
              width: `${totalSlides * 100}vw`,
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="relative flex items-center justify-center text-white w-screen h-screen flex-shrink-0"
              >
                {/* Background */}
                {slide.is_video ? (
                  <video
                    autoPlay loop muted playsInline
                    src={slide.background}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ transform: 'rotate(-90deg) scale(1.5)' }}
                  />
                ) : (
                  <img
                    src={slide.background}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-[rgba(5,14,8,0.72)]" />

                {/* Slide number watermark */}
                <div className="absolute top-10 right-10 text-[clamp(4rem,10vw,8rem)] font-bold opacity-[0.12] select-none pointer-events-none">
                  0{index + 1}
                </div>

                {/* Slide content */}
                <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
                  <p className="text-[#ADEBB3] tracking-widest uppercase text-sm mb-4">
                    {slide.label}
                  </p>
                  <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
                    {Array.isArray(slide.title)
                      ? slide.title.map((line, i) => (
                          <span
                            key={i}
                            className={`block ${i === 1 ? 'italic' : ''} ${
                              line.includes('Save') ||
                              line.includes('Governments') ||
                              line.includes('Everything')
                                ? 'text-[#ADEBB3]'
                                : ''
                            }`}
                          >
                            {line}
                          </span>
                        ))
                      : slide.title}
                  </h1>
                  <p className="text-white/80 max-w-2xl mx-auto mb-8 text-sm md:text-base leading-relaxed">
                    {slide.subtext}
                  </p>

                  {slide.list && (
                    <ul className="text-left max-w-md mx-auto space-y-2 mb-8 text-sm">
                      {slide.list.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-[#ADEBB3] mr-2 mt-0.5">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {slide.stats && (
                    <div className="flex justify-center gap-4 mb-8 flex-wrap">
                      {slide.stats.map((stat, i) => (
                        <div
                          key={i}
                          className="bg-[rgba(173,235,179,0.06)] border border-[rgba(173,235,179,0.15)] rounded-2xl px-6 py-4 text-center min-w-[140px]"
                        >
                          <p className="text-3xl font-bold text-white">
                            {stat.value}
                          </p>
                          <p className="text-xs text-white/70 uppercase tracking-wider mt-1">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {slide.cta && (
                    <div className="flex justify-center gap-4 flex-wrap">
                      <button
                        onClick={() => navigate('/join')}
                        className="px-8 py-3 bg-[#ADEBB3] text-[#050E08] font-bold rounded-full hover:brightness-110 transition-all"
                      >
                        ACTIVATE FOR YOUR HOSPITAL
                      </button>
                      <button
                        onClick={() => navigate('/gods-eye')}
                        className="px-8 py-3 border border-white/50 text-white font-bold rounded-full hover:bg-white/10 transition-all"
                      >
                        LEARN MORE
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Horizontal progress dots at bottom */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-500 ${
                  activeSlide === index
                    ? 'w-6 bg-[#ADEBB3]'
                    : 'w-2 bg-white/30'
                }`}
              />
            ))}
          </div>

          {/* Scroll hint — fades out as user scrolls */}
          <motion.div
            className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]),
            }}
          >
            <span className="text-[10px] font-bold tracking-[0.4em] text-white/50 uppercase">
              Scroll to explore
            </span>
            <svg
              className="w-5 h-5 text-white/40 animate-bounce"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default GodsEyeShowcase;
