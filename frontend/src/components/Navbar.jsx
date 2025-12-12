import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)
  const [token, setToken] = useState(true)

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-200 shadow-sm'>
      <img onClick={() => navigate('/')} className='w-44 cursor-pointer transition-transform hover:scale-105' src={assets.logo} alt="" />
      <ul className='md:flex items-start gap-6 font-medium hidden'>
        <NavLink to='/' >
          <li className='py-1 text-text-medium hover:text-primary transition-colors'>HOME</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/doctors' >
          <li className='py-1 text-text-medium hover:text-primary transition-colors'>ALL DOCTORS</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/about' >
          <li className='py-1 text-text-medium hover:text-primary transition-colors'>ABOUT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/contact' >
          <li className='py-1 text-text-medium hover:text-primary transition-colors'>CONTACT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
      </ul>

      <div className='flex items-center gap-4 '>
        {
          token
            ? <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img className='w-9 h-9 rounded-full border-2 border-primary object-cover' src={assets.profile_pic} alt="" />
              <img className='w-2.5 transition-transform group-hover:rotate-180' src={assets.dropdown_icon} alt="" />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-text-medium z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-white rounded-lg shadow-card flex flex-col gap-2 p-4 border border-gray-100'>
                  <p onClick={() => navigate('/my-profile')} className='hover:text-primary cursor-pointer py-2 px-3 rounded-md hover:bg-light-bg transition-all'>My Profile</p>
                  <p onClick={() => navigate('/my-appointments')} className='hover:text-primary cursor-pointer py-2 px-3 rounded-md hover:bg-light-bg transition-all'>My Appointments</p>
                  <hr className='border-gray-200' />
                  <p onClick={() => { setToken(false); navigate('/') }} className='hover:text-danger cursor-pointer py-2 px-3 rounded-md hover:bg-red-50 transition-all'>Logout</p>
                </div>
              </div>
            </div>
            : <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-medium hidden md:block hover:bg-primary-dark transition-all shadow-md hover:shadow-lg'>Create account</button>
        }
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden cursor-pointer' src={assets.menu_icon} alt="" />

        {/* ---- Mobile Menu ---- */}
        <div className={`md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all ${showMenu ? 'fixed w-full' : 'h-0 w-0'}`}>
          <div className='flex items-center justify-between px-5 py-6 border-b border-gray-200'>
            <img src={assets.logo} className='w-36' alt="" />
            <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-7 cursor-pointer' alt="" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
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