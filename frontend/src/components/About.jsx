import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT: IMAGE SIDE */}
          <div 
            className="relative"
            data-aos="fade-right"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
              <img 
                src={assets.about_hospital} 
                alt="About Our Platform" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            
            {/* OVERLAY BADGE */}
            <div className="absolute -bottom-6 -left-6 bg-[var(--cream)] p-6 rounded-2xl shadow-xl border border-[var(--gold)]/20 z-10 max-w-[240px]">
              <p className="text-[var(--dark-green)] font-bold text-lg leading-tight mb-1">
                Est. 2005 | Award Winning Care
              </p>
              <div className="w-12 h-1 bg-[var(--gold)] rounded-full" />
            </div>

            {/* DECORATIVE ELEMENT */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--mint)]/10 rounded-full blur-3xl -z-10" />
          </div>

          {/* RIGHT: TEXT SIDE */}
          <div 
            className="space-y-8"
            data-aos="fade-left"
          >
            <div className="space-y-4">
              <span className="text-[var(--mint-dark)] font-bold tracking-[0.2em] uppercase text-xs">
                Who We Are
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[var(--deep-dark)] leading-tight">
                A Legacy of Healing, <br /> A Future of Innovation
              </h2>
            </div>

            <div className="space-y-6 text-[var(--text-muted)] text-[16px] leading-relaxed">
              <p>
                Founded in 2023, MediSync began with a single mission: to build a unified, accessible, and intelligent healthcare ecosystem for the entire nation. We are not a hospital; we are the digital bridge connecting you to a vast network of partner hospitals, clinics, and specialists.
              </p>
              <p>
                Our platform leverages cutting-edge technology to dismantle the barriers of traditional healthcare. We empower patients with choice and transparency, and provide doctors and hospitals with the tools to deliver seamless, data-driven care. Our goal is to make world-class treatment accessible to everyone, everywhere.
              </p>
              <p>
                Our core values—access, integrity, and innovation—drive everything we do. From instant appointment booking across cities to our AI-powered emergency response system, God's Eye, we ensure that every user receives the right care, at the right time.
              </p>
            </div>

            <div className="w-10 h-1 bg-[var(--mint)] rounded-full" />

            <div className="space-y-4 pt-2">
              {[
                "Access to a nationwide network of 500+ hospitals",
                "A compassionate team of 10,000+ certified specialists"
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--mint-light)] text-[var(--mint-dark)]">
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
                      <path d="M13.485 1.485a.5.5 0 0 1 .707.707l-9 9a.5.5 0 0 1-.707 0l-4-4a.5.5 0 1 1 .707-.707L4.5 9.793l8.985-8.308z" />
                    </svg>
                  </div>
                  <span className="text-[var(--deep-dark)] font-medium text-sm sm:text-base">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <a 
                href="#services" 
                className="group inline-flex items-center gap-2 text-[var(--mint-dark)] font-bold text-sm uppercase tracking-widest hover:text-[var(--dark-green)] transition-colors duration-300"
              >
                Learn More
                <span className="transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default About
