import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import {
  LayoutDashboard, CalendarDays, UserPlus, Users,
  Stethoscope, LogOut, Activity
} from 'lucide-react'

const Sidebar = () => {
  const { aToken, setAToken } = useContext(AdminContext)
  const { dToken, setDToken } = useContext(DoctorContext)
  const navigate = useNavigate()

  const logout = () => {
    if (aToken) { setAToken(''); localStorage.removeItem('aToken') }
    if (dToken) { setDToken(''); localStorage.removeItem('dToken') }
    navigate('/login')
  }

  const adminLinks = [
    { to: '/admin-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/all-appointments', icon: CalendarDays, label: 'Appointments' },
    { to: '/add-doctor', icon: UserPlus, label: 'Add Doctor' },
    { to: '/doctor-list', icon: Users, label: 'Doctors' },
  ]

  const doctorLinks = [
    { to: '/doctor-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/doctor-appointments', icon: CalendarDays, label: 'Appointments' },
    { to: '/doctor-profile', icon: Stethoscope, label: 'My Profile' },
  ]

  const links = aToken ? adminLinks : doctorLinks

  return (
    <aside
      className='w-56 shrink-0 flex flex-col border-r border-dark-border'
      style={{ background: '#080d1a', minHeight: 'calc(100vh - 56px)' }}
    >
      {/* Role badge */}
      <div className='px-4 py-4 border-b border-dark-border'>
        <div className='flex items-center gap-2'>
          <div className='w-2 h-2 rounded-full bg-primary animate-pulse' />
          <span className='text-xs font-semibold text-ink-mid uppercase tracking-widest'>
            {aToken ? 'Admin Panel' : 'Doctor Panel'}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className='flex-1 py-4 px-3 flex flex-col gap-1'>
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group ${
                isActive
                  ? 'bg-primary-dim text-primary border border-primary-border'
                  : 'text-ink-mid hover:text-ink-bright hover:bg-dark-elevated'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={16} className={isActive ? 'text-primary' : 'text-ink-dim group-hover:text-ink-mid'} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* System status */}
      <div className='px-4 py-3 border-t border-dark-border'>
        <div className='flex items-center gap-2 mb-3'>
          <Activity size={12} className='text-accent-green' />
          <span className='text-xs text-ink-dim'>System Online</span>
        </div>
        <button
          onClick={logout}
          className='w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-ink-mid hover:text-accent-red hover:bg-dark-elevated transition-all'
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}

export default Sidebar