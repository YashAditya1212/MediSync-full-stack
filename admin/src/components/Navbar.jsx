import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { Shield, Stethoscope, Bell } from 'lucide-react'

const Navbar = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken, profileData } = useContext(DoctorContext)

  const isAdmin = !!aToken
  const displayName = isAdmin ? 'Administrator' : (profileData?.name || 'Doctor')

  return (
    <header
      className='h-14 flex items-center justify-between px-6 border-b border-dark-border shrink-0 z-20'
      style={{ background: '#080d1a' }}
    >
      {/* Brand */}
      <div className='flex items-center gap-3'>
        <div
          className='w-7 h-7 rounded-lg flex items-center justify-center'
          style={{ background: 'rgba(0,212,170,0.15)', border: '1px solid rgba(0,212,170,0.3)' }}
        >
          <div className='w-2 h-2 rounded-full bg-primary' />
        </div>
        <div>
          <span className='font-bold text-ink-bright text-sm tracking-tight'>MediSync</span>
          <span className='text-ink-dim text-sm'> / Control</span>
        </div>
      </div>

      {/* Right side */}
      <div className='flex items-center gap-4'>
        {/* Notification bell */}
        <button className='w-8 h-8 flex items-center justify-center rounded-lg hover:bg-dark-elevated transition-colors text-ink-dim hover:text-ink-bright'>
          <Bell size={15} />
        </button>

        {/* Divider */}
        <div className='w-px h-5 bg-dark-border' />

        {/* User pill */}
        <div
          className='flex items-center gap-2 px-3 py-1.5 rounded-lg'
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div
            className='w-5 h-5 rounded-full flex items-center justify-center'
            style={{ background: isAdmin ? 'rgba(59,130,246,0.2)' : 'rgba(0,212,170,0.2)' }}
          >
            {isAdmin
              ? <Shield size={11} className='text-accent-blue' />
              : <Stethoscope size={11} className='text-primary' />
            }
          </div>
          <span className='text-xs font-medium text-ink-mid'>{displayName}</span>
          <span
            className='text-xs px-1.5 py-0.5 rounded font-medium'
            style={{
              background: isAdmin ? 'rgba(59,130,246,0.15)' : 'rgba(0,212,170,0.15)',
              color: isAdmin ? '#3b82f6' : '#00d4aa',
            }}
          >
            {isAdmin ? 'Admin' : 'Doctor'}
          </span>
        </div>
      </div>
    </header>
  )
}

export default Navbar