import axios from 'axios'
import React, { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'
import { Shield, Stethoscope, Eye, EyeOff } from 'lucide-react'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'
  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {
          setAToken(data.token)
          localStorage.setItem('aToken', data.token)
          toast.success('Welcome back, Admin')
        } else {
          toast.error(data.message || 'Login failed')
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          setDToken(data.token)
          localStorage.setItem('dToken', data.token)
          toast.success('Welcome back, Doctor')
        } else {
          toast.error(data.message || 'Login failed')
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Connection failed')
    } finally {
      setLoading(false)
    }
  }

  const isAdmin = state === 'Admin'

  return (
    <div className='min-h-screen flex' style={{ background: '#080d1a' }}>

      {/* Left panel — decorative */}
      <div
        className='hidden lg:flex flex-col justify-between w-[420px] shrink-0 p-10'
        style={{
          background: 'linear-gradient(160deg, #0e1a2e 0%, #080d1a 100%)',
          borderRight: '1px solid rgba(255,255,255,0.05)'
        }}
      >
        {/* Logo */}
        <div className='flex items-center gap-3'>
          <div
            className='w-9 h-9 rounded-xl flex items-center justify-center'
            style={{ background: 'rgba(0,212,170,0.15)', border: '1px solid rgba(0,212,170,0.3)' }}
          >
            <div className='w-3 h-3 rounded-full bg-primary' />
          </div>
          <span className='font-bold text-ink-bright text-lg'>MediSync</span>
        </div>

        {/* Center text */}
        <div>
          <div
            className='w-16 h-16 rounded-2xl flex items-center justify-center mb-6'
            style={{ background: isAdmin ? 'rgba(59,130,246,0.1)' : 'rgba(0,212,170,0.1)', border: `1px solid ${isAdmin ? 'rgba(59,130,246,0.2)' : 'rgba(0,212,170,0.2)'}` }}
          >
            {isAdmin
              ? <Shield size={28} className='text-accent-blue' />
              : <Stethoscope size={28} className='text-primary' />
            }
          </div>
          <h2 className='text-3xl font-bold text-ink-bright leading-tight mb-3'>
            {isAdmin ? 'Admin\nControl Center' : 'Doctor\nPortal'}
          </h2>
          <p className='text-ink-dim text-sm leading-relaxed'>
            {isAdmin
              ? 'Manage doctors, appointments, and platform operations from one place.'
              : 'View your appointments, patient records, and manage your schedule.'
            }
          </p>
        </div>

        {/* Footer note */}
        <p className='text-xs text-ink-dim'>MediSync v1.0 — Secure Access</p>
      </div>

      {/* Right panel — form */}
      <div className='flex-1 flex items-center justify-center p-6'>
        <div className='w-full max-w-sm'>

          {/* Mobile logo */}
          <div className='lg:hidden flex items-center gap-2 mb-8'>
            <div className='w-7 h-7 rounded-lg bg-primary-dim border border-primary-border flex items-center justify-center'>
              <div className='w-2 h-2 rounded-full bg-primary' />
            </div>
            <span className='font-bold text-ink-bright'>MediSync</span>
          </div>

          <h1 className='text-2xl font-bold text-ink-bright mb-1'>Sign in</h1>
          <p className='text-sm text-ink-dim mb-8'>
            Enter your credentials to access the {state.toLowerCase()} panel
          </p>

          {/* Role toggle */}
          <div
            className='flex p-1 rounded-lg mb-6 gap-1'
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            {['Admin', 'Doctor'].map((role) => (
              <button
                key={role}
                type='button'
                onClick={() => setState(role)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${
                  state === role
                    ? 'bg-dark-card text-ink-bright shadow-card'
                    : 'text-ink-dim hover:text-ink-mid'
                }`}
              >
                {role === 'Admin'
                  ? <Shield size={13} className={state === 'Admin' ? 'text-accent-blue' : ''} />
                  : <Stethoscope size={13} className={state === 'Doctor' ? 'text-primary' : ''} />
                }
                {role}
              </button>
            ))}
          </div>

          <form onSubmit={onSubmitHandler} className='flex flex-col gap-4'>
            <div>
              <label className='form-label'>Email Address</label>
              <input
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='you@medisync.com'
                required
                className='form-input'
              />
            </div>

            <div>
              <label className='form-label'>Password</label>
              <div className='relative'>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder='••••••••'
                  required
                  className='form-input pr-10'
                />
                <button
                  type='button'
                  onClick={() => setShowPass(!showPass)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-ink-dim hover:text-ink-mid transition-colors'
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type='submit'
              disabled={loading}
              className='btn-primary w-full flex items-center justify-center gap-2 mt-2'
              style={{ paddingTop: '11px', paddingBottom: '11px' }}
            >
              {loading ? (
                <>
                  <div className='w-4 h-4 border-2 border-dark-base border-t-transparent rounded-full animate-spin' />
                  Authenticating...
                </>
              ) : `Sign in as ${state}`}
            </button>
          </form>

          <p className='text-center text-xs text-ink-dim mt-6'>
            {isAdmin ? 'Are you a doctor?' : 'Are you an admin?'}
            <button
              onClick={() => setState(isAdmin ? 'Doctor' : 'Admin')}
              className='text-primary ml-1 hover:underline'
            >
              Switch to {isAdmin ? 'Doctor' : 'Admin'} login
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login