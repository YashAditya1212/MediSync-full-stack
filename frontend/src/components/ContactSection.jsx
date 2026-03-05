import React from 'react'
import { assets } from '../assets/assets'

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-[var(--cream)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        
        {/* SECTION HEADING */}
        <div className="text-center mb-16 space-y-4" data-aos="fade-up">
          <span className="text-[var(--mint-dark)] font-bold tracking-[0.2em] uppercase text-xs">
            Contact
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--deep-dark)] font-serif leading-tight">
            Get In Touch
          </h2>
          <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto">
            We are here for you — always. Reach out for any inquiries or support.
          </p>
          <div className="w-16 h-1 bg-[var(--mint)] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-20 items-stretch">
          
          {/* LEFT: MAP */}
          <div 
            className="relative h-[400px] lg:h-auto min-h-[450px]"
            data-aos="fade-right"
          >
            <div className="absolute inset-0 rounded-3xl overflow-hidden border-4 border-[var(--mint)]/20 shadow-xl">
              <img 
                src={assets.map_image} 
                alt="Hospital Location" 
                className="w-full h-full object-cover"
              />
              {/* Custom marker effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative flex items-center justify-center">
                  <div className="absolute h-10 w-10 bg-[var(--mint)] rounded-full animate-ping" />
                  <div className="relative h-6 w-6 bg-[var(--mint-dark)] rounded-full border-2 border-white shadow-lg" />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: CONTACT FORM */}
          <div 
            className="flex flex-col justify-center"
            data-aos="fade-left"
          >
            <form className="space-y-8 bg-white/50 backdrop-blur-sm p-8 sm:p-12 rounded-3xl shadow-sm border border-white">
              <div className="relative group">
                <input 
                  type="text" 
                  id="name"
                  placeholder="Your Name"
                  className="w-full bg-transparent border-b-2 border-gray-200 py-3 text-[var(--deep-dark)] font-medium outline-none transition-all duration-300 focus:border-[var(--mint-dark)] peer placeholder-transparent"
                  required
                />
                <label 
                  htmlFor="name"
                  className="absolute left-0 -top-3.5 text-xs font-bold uppercase tracking-widest text-gray-400 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[var(--mint-dark)] pointer-events-none"
                >
                  Your Name
                </label>
              </div>

              <div className="relative group">
                <input 
                  type="email" 
                  id="email"
                  placeholder="Email Address"
                  className="w-full bg-transparent border-b-2 border-gray-200 py-3 text-[var(--deep-dark)] font-medium outline-none transition-all duration-300 focus:border-[var(--mint-dark)] peer placeholder-transparent"
                  required
                />
                <label 
                  htmlFor="email"
                  className="absolute left-0 -top-3.5 text-xs font-bold uppercase tracking-widest text-gray-400 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[var(--mint-dark)] pointer-events-none"
                >
                  Email Address
                </label>
              </div>

              <div className="relative group">
                <input 
                  type="tel" 
                  id="phone"
                  placeholder="Phone Number"
                  className="w-full bg-transparent border-b-2 border-gray-200 py-3 text-[var(--deep-dark)] font-medium outline-none transition-all duration-300 focus:border-[var(--mint-dark)] peer placeholder-transparent"
                  required
                />
                <label 
                  htmlFor="phone"
                  className="absolute left-0 -top-3.5 text-xs font-bold uppercase tracking-widest text-gray-400 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[var(--mint-dark)] pointer-events-none"
                >
                  Phone Number
                </label>
              </div>

              <div className="relative group">
                <textarea 
                  id="message"
                  rows="3"
                  placeholder="Message"
                  className="w-full bg-transparent border-b-2 border-gray-200 py-3 text-[var(--deep-dark)] font-medium outline-none transition-all duration-300 focus:border-[var(--mint-dark)] peer placeholder-transparent resize-none"
                  required
                ></textarea>
                <label 
                  htmlFor="message"
                  className="absolute left-0 -top-3.5 text-xs font-bold uppercase tracking-widest text-gray-400 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[var(--mint-dark)] pointer-events-none"
                >
                  Message
                </label>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full py-5 rounded-full bg-[var(--gold)] text-white font-bold uppercase tracking-[0.2em] shadow-lg shadow-[rgba(201,168,76,0.3)] transition-all duration-300 hover:bg-[var(--mint-dark)] hover:shadow-[0_10px_30px_rgba(168,213,186,0.5)] hover:-translate-y-1 active:scale-95"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ContactSection
