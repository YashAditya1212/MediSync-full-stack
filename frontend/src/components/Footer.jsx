import React from 'react'
import { assets } from '../assets/assets'
import { Facebook, Instagram, Twitter, Linkedin, Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative bg-[var(--deep-dark)] text-white/70">
      
      {/* JOIN OUR TEAM SECTION */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-32 pb-16 border-b border-white/5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight font-decorative">
              Ready to <span className="text-[var(--mint)] italic">experience</span> better <br className="hidden md:block" /> healthcare management?
            </h2>
            <p className="text-[#5A7A62] max-w-lg text-sm md:text-base">
              Join our unified platform today. Whether you're a patient, doctor, or administrator, we've got you covered.
            </p>
          </div>
          <Link 
            to='/join'
            className="group flex items-center gap-4 bg-[#ADEBB3] text-[#0F1C14] px-10 py-5 rounded-full font-black uppercase tracking-[0.2em] text-[13px] shadow-[0_0_30px_rgba(173,235,179,0.2)] hover:bg-[#b8f0bd] hover:scale-105 transition-all duration-300"
          >
            Join Our Portal
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-20 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* COLUMN 1: LOGO & SOCIALS */}
          <div className="space-y-6">
            <img src={assets.logo} alt="MediSync Logo" className="w-40 brightness-0 invert" />
            <p className="text-sm leading-relaxed max-w-xs">
              MediSync — Bridging every patient to every doctor, everywhere.
            </p>
            <div className="flex gap-3 pt-2">
              {[
                { Icon: Facebook, url: 'https://facebook.com' },
                { Icon: Instagram, url: 'https://instagram.com' },
                { Icon: Twitter, url: 'https://twitter.com' },
                { Icon: Linkedin, url: 'https://linkedin.com' },
              ].map(({ Icon, url }, idx) => (
                <a 
                  key={idx} 
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[var(--mint)] flex items-center justify-center text-[var(--deep-dark)] transition-all duration-300 hover:bg-white hover:-translate-y-1 shadow-sm"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div className="space-y-6">
            <h4 className="text-white text-xl font-bold font-serif">Quick Links</h4>
            <ul className="flex flex-col gap-4 text-sm font-medium">
              {[
                { name: 'Home', path: '/' },
                { name: 'About', path: '/about' },
                { name: 'Services', path: '/doctors' },
                { name: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="transition-colors duration-300 hover:text-[var(--mint)]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: SERVICES */}
          <div className="space-y-6">
            <h4 className="text-white text-xl font-bold font-serif">Our Services</h4>
            <ul className="flex flex-col gap-4 text-sm font-medium">
              {[
                { name: 'General Medicine', path: '/doctors/General physician' },
                { name: 'Cardiology', path: '/doctors/Cardiologist' },
                { name: 'Orthopedics', path: '/doctors/Orthopedic surgeon' },
                { name: 'Pediatrics', path: '/doctors/Pediatrician' },
                { name: 'Neurology', path: '/doctors/Neurologist' },
                { name: 'Emergency Care', path: '/contact' },
              ].map((service) => (
                <li key={service.name}>
                  <Link to={service.path} className="transition-colors duration-300 hover:text-[var(--mint)]">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: CONTACT US */}
          <div className="space-y-6">
            <h4 className="text-white text-xl font-bold font-serif">Contact Us</h4>
            <div className="flex flex-col gap-5 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-[var(--mint)] flex-shrink-0" />
                <span>123 Medical Avenue, Healthcare City, NY 10001</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-[var(--mint)] flex-shrink-0" />
                <span>+91-1800 456-7890</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-[var(--mint)] flex-shrink-0" />
                <span>contact@MediSync.com</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={20} className="text-[var(--mint)] flex-shrink-0" />
                <div>
                  <p>Mon - Sat: 8:00 AM - 10:00 PM</p>
                  <p>Emergency: 24/7</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-bold tracking-widest uppercase text-white/40">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p>© 2025 MEDISYNC HOSPITAL. ALL RIGHTS RESERVED.</p>
            <p className="text-[14px] text-white normal-case tracking-normal font-sans">
              Creator of MediSync: <span className="font-bold">Yash Aditya Mishra</span>
            </p>
          </div>
          <div className="flex gap-8">
            <Link to='/privacy-policy' className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to='/terms-of-service' className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
