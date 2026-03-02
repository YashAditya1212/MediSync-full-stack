import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { AppContext } from '../context/AppContext'
import { Sun, Moon } from 'lucide-react'

const Navbar = () => {

  const navigate = useNavigate()
  const { token, logout, userData } = useContext(UserContext)
  const { isDarkMode, toggleDarkMode } = useContext(AppContext)

  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className='fixed top-0 left-0 right-0 z-50 flex items-center justify-between text-sm py-4 px-6 md:px-12 backdrop-blur-md bg-white/70 border-b border-white/50 shadow-soft transition-all duration-300 dark:bg-night-bg/70 dark:border-night-border'>
      <img onClick={() => navigate('/')} className='w-44 cursor-pointer transition-transform hover:scale-105 dark:invert' src={assets.logo} alt="" />
      <ul className='md:flex items-center gap-8 font-medium hidden'>
        <NavLink to='/' className={({isActive}) => `relative group py-2 px-4 transition-all duration-300 ${isActive ? 'text-primary font-bold' : 'text-text-medium hover:text-primary dark:text-night-text'}`}>
          <li>HOME</li>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </NavLink>
        <NavLink to='/doctors' className={({isActive}) => `relative group py-2 px-4 transition-all duration-300 ${isActive ? 'text-primary font-bold' : 'text-text-medium hover:text-primary dark:text-night-text'}`}>
          <li>ALL DOCTORS</li>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </NavLink>
        <NavLink to='/about' className={({isActive}) => `relative group py-2 px-4 transition-all duration-300 ${isActive ? 'text-primary font-bold' : 'text-text-medium hover:text-primary dark:text-night-text'}`}>
          <li>ABOUT</li>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </NavLink>
        <NavLink to='/contact' className={({isActive}) => `relative group py-2 px-4 transition-all duration-300 ${isActive ? 'text-primary font-bold' : 'text-text-medium hover:text-primary dark:text-night-text'}`}>
          <li>CONTACT</li>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </NavLink>
      </ul>

      <div className='flex items-center gap-6'>
        <button 
          onClick={toggleDarkMode} 
          className='p-2.5 rounded-full bg-mint-light/50 text-primary hover:bg-primary hover:text-white transition-all duration-300 dark:bg-night-surface dark:text-accent dark:hover:bg-primary'
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <NavLink to='/gods-eye' className={({isActive}) => `hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full font-bold tracking-wide transition-all duration-300 ${isActive ? 'bg-primary text-white shadow-glow' : 'bg-mint-light text-primary border border-primary/20 hover:bg-primary hover:text-white hover:shadow-glow dark:bg-night-surface dark:text-primary dark:border-primary/40'}`}>
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-dark"></span>
          </span>
          GOD'S EYE
        </NavLink>

        {
          token
            ? <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img className='w-10 h-10 rounded-full border-2 border-primary object-cover shadow-sm' src={userData?.image || assets.profile_pic} alt="" />
              <img className='w-2.5 transition-transform group-hover:rotate-180 dark:invert' src={assets.dropdown_icon} alt="" />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-text-medium z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-white/90 backdrop-blur-xl rounded-xl shadow-lg flex flex-col gap-2 p-4 border border-white/50 dark:bg-night-surface/90 dark:border-night-border dark:text-night-text'>
                  <p onClick={() => navigate('/my-profile')} className='hover:text-primary cursor-pointer py-2 px-3 rounded-md hover:bg-mint-light transition-all dark:hover:bg-night-bg'>My Profile</p>
                  <p onClick={() => navigate('/my-appointments')} className='hover:text-primary cursor-pointer py-2 px-3 rounded-md hover:bg-mint-light transition-all dark:hover:bg-night-bg'>My Appointments</p>
                  <hr className='border-gray-100 dark:border-night-border' />
                  <p onClick={() => { logout(); navigate('/') }} className='hover:text-red-500 cursor-pointer py-2 px-3 rounded-md hover:bg-red-50 transition-all dark:hover:bg-red-900/20'>Logout</p>
                </div>
              </div>
            </div>
            : <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-medium hidden md:block hover:bg-primary-dark transition-all shadow-md hover:shadow-glow hover:-translate-y-0.5'>Create account</button>
        }
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden cursor-pointer dark:invert' src={assets.menu_icon} alt="" />

        {/* ---- Mobile Menu ---- */}
        <div className={`md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all dark:bg-night-bg ${showMenu ? 'fixed w-full' : 'h-0 w-0'}`}>
          <div className='flex items-center justify-between px-5 py-6 border-b border-gray-200 dark:border-night-border'>
            <img src={assets.logo} className='w-36 dark:invert' alt="" />
            <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-7 cursor-pointer dark:invert' alt="" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium dark:text-night-text'>
            <NavLink onClick={() => setShowMenu(false)} to='/' className='w-full'><p className='px-4 py-3 rounded-lg text-center hover:bg-primary hover:text-white transition-all'>HOME</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors' className='w-full'><p className='px-4 py-3 rounded-lg text-center hover:bg-primary hover:text-white transition-all'>ALL DOCTORS</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about' className='w-full'><p className='px-4 py-3 rounded-lg text-center hover:bg-primary hover:text-white transition-all'>ABOUT</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact' className='w-full'><p className='px-4 py-3 rounded-lg text-center hover:bg-primary hover:text-white transition-all'>CONTACT</p></NavLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar