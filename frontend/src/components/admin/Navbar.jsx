import { useContext, useState, useMemo } from 'react'
import { assets } from '../../assets/assets'
import { DoctorContext } from '../../context/admin/DoctorContext'
import { AdminContext } from '../../context/admin/AdminContext'
import { useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {

  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)
  const isInspectionMode = localStorage.getItem('inspectionMode') === 'true'
  const isAdmin = !!aToken

  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const logout = () => {
    dToken && setDToken('')
    localStorage.removeItem('doctorToken')
    aToken && setAToken('')
    localStorage.removeItem('adminToken')
    localStorage.removeItem('inspectionMode')
    setOpen(false)
    navigate('/')
  }

  const navItems = useMemo(() => ([
    { label: 'HOME', path: '/' },
    { label: 'DASHBOARD', path: isAdmin ? '/admin/dashboard' : '/admin/doctor-dashboard' },
    { label: 'APPOINTMENTS', path: isAdmin ? '/admin/appointments' : '/admin/doctor-appointments' },
    ...(isAdmin ? [
      { label: 'ADD NEW DOCTOR', path: '/admin/add-doctor' },
      { label: 'DOCTORS LIST', path: '/admin/doctors-list' },
    ] : [
      { label: 'PROFILE', path: '/admin/doctor-profile' },
    ]),
    { label: 'LOGOUT', path: 'logout' }
  ]), [isAdmin])

  const isActive = (path) => {
    if (path === 'logout') return false
    return location.pathname === path
  }

  const handleItemClick = (item) => {
    if (item.path === 'logout') {
      logout()
      return
    }
    navigate(item.path)
    setOpen(false)
  }

  return (
    <>
      <div className='fixed top-0 left-0 right-0 z-[2000] bg-[#0F1C14] border-b border-[rgba(173,235,179,0.2)] h-20'>
        <div className='flex items-center justify-between px-4 sm:px-10 h-full'>
            <div className='flex items-center gap-3'>
            <img
              onClick={() => navigate(isAdmin ? '/admin/dashboard' : '/admin/doctor-dashboard')}
              className='w-36 sm:w-40 cursor-pointer hover:opacity-90 transition-opacity'
              src={assets.admin_logo}
              alt="MediSync"
            />
            <span className='px-2.5 py-1 rounded-full bg-[var(--mint-bg)] text-[var(--mint-dark)] font-bold uppercase tracking-[0.2em] text-[10px]'>
              {isInspectionMode ? 'Inspector' : isAdmin ? 'Admin' : 'Doctor'}
            </span>
          </div>

          <button
            onClick={() => setOpen(true)}
            className='group flex items-center gap-2 text-[11px] tracking-[0.25em] font-bold uppercase text-white/90 hover:text-[var(--mint)] transition-colors'
          >
            <span className='inline-block w-2 h-2 rounded-[2px] bg-[var(--mint)] group-hover:scale-110 transition-transform' />
            MENU ☰
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[2500] transition-[opacity,visibility] duration-300 ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        aria-hidden={!open}
      >
        {/* Decorative image, only visible when open */}
        <div className='pointer-events-none absolute inset-y-0 left-0 w-[40vw] max-w-[40%] overflow-hidden z-[150]'>
          <div className='absolute inset-0'>
            <img
              src={assets.nav_eye}
              alt='Decorative'
              className='w-full h-full object-cover brightness-[0.6]'
            />
            <div className='absolute inset-y-0 right-0 w-40 bg-gradient-to-r from-transparent to-[#0A120D]' />
          </div>
        </div>

        <button
          onClick={() => setOpen(false)}
          className={`absolute left-0 top-0 h-full w-[40vw] max-w-[40%] bg-black/75 z-[200] ${open ? 'cursor-pointer' : 'pointer-events-none'}`}
        />

        <div
          className={`absolute right-0 top-0 h-full w-[60vw] min-w-[320px] bg-[#0A120D] border-l border-white/10 transform transition-transform duration-[450ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${open ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className='flex items-center justify-between px-6 sm:px-8 py-5'>
            <div className='flex items-center gap-2'>
              <span className='inline-block w-2 h-2 rounded-[2px] bg-[var(--mint)]' />
              <span className='text-[11px] tracking-[0.25em] font-bold uppercase text-[var(--mint)]'>
                Menu
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className='w-9 h-9 rounded-full bg-black/40 text-white text-lg leading-none flex items-center justify-center hover:bg-black/60 transition-colors'
              aria-label='Close menu'
            >
              ✕
            </button>
          </div>
          <div className='h-px mx-6 sm:mx-8 bg-white/10' />

          <nav className='mt-4'>
            {navItems.map((item, idx) => (
              <button
                key={item.label}
                onClick={() => handleItemClick(item)}
                style={{ transitionDelay: `${0.07 * (idx + 1)}s` }}
                className={`group w-full text-left px-6 sm:px-8 py-5 border-b border-white/10 overflow-hidden
                  text-[rgba(255,255,255,0.85)] hover:text-[var(--mint)] transition-colors
                  uppercase font-black tracking-[0.05em]
                  [font-size:clamp(2rem,5vw,3.5rem)] 
                  ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                  will-change-transform will-change-opacity duration-500`}
              >
                <span className='relative inline-flex items-center'>
                  <span className='pr-3'>{item.label}</span>
                  {isActive(item.path) && <span className='text-[var(--mint)] translate-y-[-0.2em]'>■</span>}
                  <span className='absolute left-0 -ml-6 top-1/2 -translate-y-1/2 h-0.5 w-0 bg-[var(--mint)] opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all' />
                </span>
              </button>
            ))}
          </nav>

          <div className='absolute bottom-6 left-0 right-0 px-6 sm:px-8'>
            <p className='text-[10px] uppercase tracking-[0.25em] text-white/50'>
              (Email)
            </p>
            <p className='mt-1 text-[var(--mint)] font-bold'>
              admin@medisync.com
            </p>
          </div>
        </div>

      </div>
    </>
  )
}

export default Navbar
