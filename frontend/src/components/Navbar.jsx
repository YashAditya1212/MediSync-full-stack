import React, { useState, useEffect, useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { useNavigate, useLocation } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import DarkModeToggle from './UI/DarkModeToggle'

import { DoctorContext } from '../context/admin/DoctorContext'
import { AdminContext } from '../context/admin/AdminContext'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { userData, token, logout } = useContext(UserContext)
  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)
  const isInspectionMode = localStorage.getItem('inspectionMode') === 'true'
  
  const [showMenu, setShowMenu] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  
  const dropdownRef = useRef(null)

  const navItems = [
    { label: 'Home', targetId: 'home' },
    { 
      label: 'Services', 
      targetId: 'services',
      subItems: [
        { title: 'General physician', desc: 'Family health & wellness', path: '/doctors/General physician' },
        { title: 'Gynecologist', desc: 'Womens health specialist', path: '/doctors/Gynecologist' },
        { title: 'Dermatologist', desc: 'Skin, hair & nail care', path: '/doctors/Dermatologist' },
        { title: 'Pediatricians', desc: 'Specialized care for children', path: '/doctors/Pediatricians' }
      ]
    },
    { label: 'Doctors', targetId: 'doctors' },
    { label: 'About', targetId: 'about' },
    { label: 'Gallery', targetId: 'gallery' },
    { label: 'Contact', targetId: 'contact' },
  ]

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
    setShowMenu(false)
  }

  const handleNavClick = (item) => {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => scrollToSection(item.targetId), 100)
    } else {
      scrollToSection(item.targetId)
    }
  }

  const showSolidNavbar = isScrolled || (location.pathname !== '/' && location.pathname !== '/gods-eye');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
        showSolidNavbar
          ? 'backdrop-blur-xl bg-white/70 dark:bg-black/40 shadow-sm border-b border-white/20 dark:border-white/10'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className='mx-4 md:mx-10 lg:mx-16 flex items-center justify-between py-4 lg:py-6'>
        {/* Left: Logo */}
        <div className='flex items-center gap-3'>
          <img
            onClick={() => navigate('/')}
            className={`w-36 md:w-40 cursor-pointer transition-all duration-300 hover:opacity-80 ${!showSolidNavbar ? 'brightness-0 invert' : 'dark:brightness-0 dark:invert'}`}
            src={assets.logo}
            alt="MediSync"
          />
        </div>

        {/* Center: Desktop Nav */}
        <nav className='hidden md:flex items-center gap-5 lg:gap-7 flex-1 justify-center min-w-0 max-w-[50%] overflow-hidden'>
          {navItems.map((item) => (
            <div 
              key={item.label} 
              className="relative"
              onMouseEnter={() => item.subItems && setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                onClick={() => handleNavClick(item)}
                className={`relative py-2 text-[13px] tracking-[0.1em] uppercase font-medium transition-colors duration-300 ${
                  showSolidNavbar
                    ? 'text-[var(--text-dark)]' 
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-[var(--mint)] transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </button>

              {/* Mega Dropdown for Services */}
              {item.subItems && activeDropdown === item.label && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[480px]">
                  <div className="glass-card bg-[var(--card-bg)]/95 backdrop-blur-2xl border border-white/20 dark:border-white/5 rounded-3xl p-6 shadow-2xl grid grid-cols-2 gap-4 overflow-hidden">
                    {item.subItems.map((sub) => (
                      <div 
                        key={sub.title}
                        onClick={() => { navigate(sub.path); setActiveDropdown(null) }}
                        className="group/sub p-4 rounded-2xl hover:bg-[var(--mint)]/10 transition-all cursor-pointer"
                      >
                        <p className="text-[13px] font-bold text-[var(--text-dark)] mb-1 uppercase tracking-wider">{sub.title}</p>
                        <p className="text-[11px] text-[var(--text-muted)] group-hover/sub:text-[var(--text-dark)] transition-colors">{sub.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className='flex items-center gap-6 flex-shrink-0'>
          {/* God's Eye Link moved here to reduce center width pressure */}
          <button
            type="button"
            onClick={() => navigate('/gods-eye')}
            className={`hidden sm:flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider transition-all duration-300 ${
              showSolidNavbar ? 'text-[var(--mint-dark)]' : 'text-[var(--mint)]'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--mint)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--mint)]"></span>
            </span>
            God's Eye AI
          </button>
          <DarkModeToggle />

          {token || dToken || aToken ? (
            <div className="flex items-center gap-4">
              {/* Role Badge for Admin/Doctor/Inspection */}
              {(dToken || aToken) && (
                <div 
                  onClick={() => navigate('/admin/dashboard')}
                  className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[var(--mint-bg)] border border-[var(--mint)] rounded-full cursor-pointer hover:bg-[var(--mint)]/20 transition-all"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--mint-dark)] animate-pulse" />
                  <span className="text-[10px] font-bold text-[var(--mint-dark)] uppercase tracking-wider">
                    {isInspectionMode ? 'Inspector' : aToken ? 'Admin' : 'Doctor'}
                  </span>
                </div>
              )}

              <div className="relative" ref={dropdownRef}>
                <div 
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <img 
                    className="w-9 h-9 rounded-full object-cover border-2 border-transparent group-hover:border-[var(--mint)] transition-all" 
                    src={(userData && userData.image) || assets.profile_pic} 
                    alt="User" 
                  />
                  <img 
                    src={assets.dropdown_icon} 
                    className={`w-3 transition-transform duration-300 ${showUserDropdown ? 'rotate-180' : ''} ${!showSolidNavbar ? 'brightness-0 invert' : 'dark:brightness-0 dark:invert'}`} 
                    alt="" 
                  />
                </div>

                {showUserDropdown && (
                  <div className="absolute top-full right-0 mt-4 w-56 glass-card bg-[var(--card-bg)]/95 backdrop-blur-xl border border-white/20 dark:border-white/5 rounded-2xl p-3 shadow-2xl animate-in fade-in slide-in-from-top-2">
                    {userData && (
                      <div className="px-3 py-2 mb-2 border-b border-white/10">
                        <p className="text-[12px] font-bold text-[var(--text-dark)] truncate">{userData.name}</p>
                        <p className="text-[10px] text-[var(--text-muted)] truncate">{userData.email}</p>
                      </div>
                    )}
                    
                    {token && (
                      <>
                        <button onClick={() => { navigate('/my-profile'); setShowUserDropdown(false) }} className="w-full text-left px-3 py-2 text-[12px] text-[var(--text-dark)] hover:bg-[var(--mint)]/10 rounded-lg transition-all flex items-center gap-2">
                          My Profile
                        </button>
                        <button onClick={() => { navigate('/my-appointments'); setShowUserDropdown(false) }} className="w-full text-left px-3 py-2 text-[12px] text-[var(--text-dark)] hover:bg-[var(--mint)]/10 rounded-lg transition-all flex items-center gap-2">
                          My Appointments
                        </button>
                      </>
                    )}

                    {(dToken || aToken) && (
                      <button onClick={() => { navigate('/admin/dashboard'); setShowUserDropdown(false) }} className="w-full text-left px-3 py-2 text-[12px] text-[var(--text-dark)] hover:bg-[var(--mint)]/10 rounded-lg transition-all flex items-center gap-2">
                        Admin Dashboard
                      </button>
                    )}

                    <hr className="my-2 border-white/10" />
                    <button 
                      onClick={() => { 
                        if (token) logout();
                        if (dToken || aToken) {
                          localStorage.removeItem('adminToken');
                          localStorage.removeItem('doctorToken');
                          localStorage.removeItem('inspectionMode');
                          window.location.href = '/';
                        }
                        setShowUserDropdown(false);
                      }} 
                      className="w-full text-left px-3 py-2 text-[12px] text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className='flex items-center gap-4'>
              <button
                type="button"
                className='px-8 py-3 bg-[var(--mint)] text-[var(--deep-dark)] text-[12px] font-bold uppercase tracking-widest rounded-full hover:scale-105 hover:shadow-xl transition-all duration-300'
                onClick={() => navigate('/join')}
              >
                Join Us
              </button>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setShowMenu(true)}
            className={`md:hidden p-2 rounded-full transition-all ${
              isScrolled ? 'bg-black/5' : 'bg-white/10'
            }`}
          >
            <img className={`w-6 h-6 ${!isScrolled && location.pathname === '/' ? 'brightness-0 invert' : 'dark:brightness-0 dark:invert'}`} src={assets.menu_icon} alt="Menu" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-[60] bg-[var(--section-bg)]/98 backdrop-blur-2xl transition-all duration-500 ${
          showMenu ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className='flex items-center justify-between px-6 py-6 border-b border-white/10'>
          <img src={assets.logo} className='w-32 dark:brightness-0 dark:invert' alt="MediSync" />
          <button
            type="button"
            onClick={() => setShowMenu(false)}
            className='p-2 rounded-full bg-black/5 dark:bg-white/5'
          >
            <img src={assets.cross_icon} className='w-5 h-5 dark:brightness-0 dark:invert' alt="Close" />
          </button>
        </div>

        <div className='flex flex-col items-center gap-6 mt-12 px-6'>
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleNavClick(item)}
              className='text-2xl font-serif text-[var(--text-dark)] hover:text-[var(--mint-dark)] transition-all'
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            className='w-full py-4 mt-6 bg-[var(--mint)] text-[var(--deep-dark)] font-bold uppercase tracking-[0.2em] rounded-full'
            onClick={() => { navigate('/join'); setShowMenu(false) }}
          >
            Join Us
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
