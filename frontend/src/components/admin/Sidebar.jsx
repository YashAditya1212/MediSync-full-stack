import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../../context/admin/DoctorContext'
import { AdminContext } from '../../context/admin/AdminContext'

const Sidebar = () => {

  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  return (
    <div className='min-h-screen bg-[var(--deep-dark)] border-r border-white/5 pt-5'>
      <ul className='mt-2 mb-4 border-b border-white/5 pb-4'>
        <NavLink to={'/'} className={({ isActive }) => `flex items-center gap-3 py-4 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all ${isActive ? 'bg-[var(--mint)]/10 text-[var(--mint)] border-r-4 border-[var(--mint)]' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}>
          <img className='min-w-5 brightness-0 invert opacity-70' src={assets.home_icon} alt='' />
          <p className='hidden md:block text-[13px] font-bold uppercase tracking-widest'>Home</p>
        </NavLink>
      </ul>
      {aToken && <ul className='mt-5'>

        <NavLink to={'/admin/dashboard'} className={({ isActive }) => `flex items-center gap-3 py-4 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all ${isActive ? 'bg-[var(--mint)]/10 text-[var(--mint)] border-r-4 border-[var(--mint)]' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}>
          <img className='min-w-5 brightness-0 invert opacity-70' src={assets.home_icon} alt='' />
          <p className='hidden md:block text-[13px] font-bold uppercase tracking-widest'>Dashboard</p>
        </NavLink>
        <NavLink to={'/admin/appointments'} className={({ isActive }) => `flex items-center gap-3 py-4 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all ${isActive ? 'bg-[var(--mint)]/10 text-[var(--mint)] border-r-4 border-[var(--mint)]' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}>
          <img className='min-w-5 brightness-0 invert opacity-70' src={assets.appointment_icon} alt='' />
          <p className='hidden md:block text-[13px] font-bold uppercase tracking-widest'>Appointments</p>
        </NavLink>
        <NavLink to={'/admin/add-doctor'} className={({ isActive }) => `flex items-center gap-3 py-4 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all ${isActive ? 'bg-[var(--mint)]/10 text-[var(--mint)] border-r-4 border-[var(--mint)]' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}>
          <img className='min-w-5 brightness-0 invert opacity-70' src={assets.add_icon} alt='' />
          <p className='hidden md:block text-[13px] font-bold uppercase tracking-widest'>Add New Doctor</p>
        </NavLink>
        <NavLink to={'/admin/doctors-list'} className={({ isActive }) => `flex items-center gap-3 py-4 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all ${isActive ? 'bg-[var(--mint)]/10 text-[var(--mint)] border-r-4 border-[var(--mint)]' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}>
          <img className='min-w-5 brightness-0 invert opacity-70' src={assets.people_icon} alt='' />
          <p className='hidden md:block text-[13px] font-bold uppercase tracking-widest'>Doctors List</p>
        </NavLink>
      </ul>}

      {dToken && <ul className='mt-5'>
        <NavLink to={'/admin/doctor-dashboard'} className={({ isActive }) => `flex items-center gap-3 py-4 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all ${isActive ? 'bg-[var(--mint)]/10 text-[var(--mint)] border-r-4 border-[var(--mint)]' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}>
          <img className='min-w-5 brightness-0 invert opacity-70' src={assets.home_icon} alt='' />
          <p className='hidden md:block text-[13px] font-bold uppercase tracking-widest'>Dashboard</p>
        </NavLink>
        <NavLink to={'/admin/doctor-appointments'} className={({ isActive }) => `flex items-center gap-3 py-4 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all ${isActive ? 'bg-[var(--mint)]/10 text-[var(--mint)] border-r-4 border-[var(--mint)]' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}>
          <img className='min-w-5 brightness-0 invert opacity-70' src={assets.appointment_icon} alt='' />
          <p className='hidden md:block text-[13px] font-bold uppercase tracking-widest'>Appointments</p>
        </NavLink>
        <NavLink to={'/admin/doctor-profile'} className={({ isActive }) => `flex items-center gap-3 py-4 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all ${isActive ? 'bg-[var(--mint)]/10 text-[var(--mint)] border-r-4 border-[var(--mint)]' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}>
          <img className='min-w-5 brightness-0 invert opacity-70' src={assets.people_icon} alt='' />
          <p className='hidden md:block text-[13px] font-bold uppercase tracking-widest'>Profile</p>
        </NavLink>
      </ul>}
    </div>
  )
}

export default Sidebar