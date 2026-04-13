import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  return (
    <section
      id="home"
      className="relative w-full h-screen overflow-hidden group"
    >
      {/* 100% COVER IMAGE */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] ease-out group-hover:scale-110"
        style={{ 
          backgroundImage: `url(${assets.doc_in_laptop})`,
          animation: 'slowZoom 20s ease-in-out infinite alternate'
        }}
      />
      
      {/* OVERLAY FOR TEXT READABILITY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10" />

      {/* CENTERED CONTENT */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
        
        {/* TOP CONTENT: ABOVE IMAGE FEEL */}
        <div 
          className="space-y-6 max-w-4xl"
          data-aos="fade-down"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md text-white px-5 py-2 text-[10px] font-bold tracking-[0.3em] uppercase border border-white/20 font-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--mint)] animate-pulse" />
            Trusted Healthcare Since 2005
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-[90px] leading-[1] text-white font-bold drop-shadow-2xl font-decorative">
            Your Health, <br /> Synced Across Every Hospital
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-white/90 font-medium leading-relaxed drop-shadow-md">
            One platform connecting you to thousands of doctors, clinics and hospitals nationwide — instantly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <button
              type="button"
              className="group inline-flex items-center justify-center rounded-full px-12 py-5 text-sm font-bold text-white bg-[var(--gold)] shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(201,168,76,0.6)]"
              onClick={() => { navigate('/doctors'); window.scrollTo(0, 0) }}
            >
              Book Appointment
            </button>

            <button
              type="button"
              className="group inline-flex items-center justify-center rounded-full px-12 py-5 text-sm font-bold border-2 border-white text-white bg-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-[var(--deep-dark)] hover:-translate-y-1"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Services
            </button>
          </div>
        </div>
      </div>

      {/* DECORATIVE INDICATORS */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-8 z-20">
        {['01', '02', '03', '04'].map((num, i) => (
          <div key={num} className="flex items-center gap-4 group cursor-pointer">
            <span className={`text-[10px] font-bold tracking-widest ${i === 0 ? 'text-[var(--mint)]' : 'text-white/40 group-hover:text-white'}`}>
              {num}
            </span>
            <div className={`h-[1px] transition-all duration-300 ${i === 0 ? 'w-12 bg-[var(--mint)]' : 'w-6 bg-white/20 group-hover:w-12 group-hover:bg-white'}`} />
          </div>
        ))}
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
        <span className="text-[10px] font-bold tracking-[0.4em] text-white/60 uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  )
}

export default Header
