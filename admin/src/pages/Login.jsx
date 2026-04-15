import axios from 'axios'
import React, { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'
import { API_BASE_URL } from '../config/api'

const Login = () => {

  const [state, setState] = useState('Admin')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const backendUrl = API_BASE_URL

  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true)
    setError('')

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {
          setAToken(data.token)
          localStorage.setItem('adminToken', data.token)
          toast.success('Login successful!')
        } else {
          setError(data.message || 'Login failed')
          toast.error(data.message || 'Login failed')
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          setDToken(data.token)
          localStorage.setItem('doctorToken', data.token)
          toast.success('Login successful!')
        } else {
          setError(data.message || 'Login failed')
          toast.error(data.message || 'Login failed')
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to connect to backend'
      setError(errorMessage)
      toast.error(errorMessage)
      console.error('Login error:', error)
      
      if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
        console.error('💡 Make sure:')
        console.error('   1. The backend is running')
        console.error('   2. VITE_BACKEND_URL is set in the admin environment')
        console.error('   3. The admin dev server was restarted after env changes')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-[var(--section-bg)] px-4'>
      <form onSubmit={onSubmitHandler} className='w-full max-w-md'>
        <div className='glass-card bg-[var(--card-bg)] rounded-[2.5rem] shadow-2xl border border-white/20 p-10 flex flex-col gap-6 items-center'>
          <div className="text-center">
            <h2 className="text-3xl font-serif text-[var(--text-dark)] mb-2">
              <span className='text-[var(--mint-dark)] italic'>{state}</span> Portal
            </h2>
            <p className="text-[13px] text-[var(--text-muted)] tracking-wide italic">Secure access for healthcare professionals.</p>
          </div>

          <div className='w-full space-y-2'>
            <label className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] ml-1">Email Address</label>
            <input 
              onChange={(e) => setEmail(e.target.value)} 
              value={email} 
              className='w-full px-5 py-4 bg-[var(--section-bg)] border border-transparent focus:border-[var(--mint)] rounded-2xl text-[14px] outline-none transition-all text-[var(--text-dark)]' 
              type="email" 
              placeholder="admin@medisync.com"
              required 
            />
          </div>

          <div className='w-full space-y-2'>
            <label className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] ml-1">Password</label>
            <input 
              onChange={(e) => setPassword(e.target.value)} 
              value={password} 
              className='w-full px-5 py-4 bg-[var(--section-bg)] border border-transparent focus:border-[var(--mint)] rounded-2xl text-[14px] outline-none transition-all text-[var(--text-dark)]' 
              type="password" 
              placeholder="••••••••"
              required 
            />
          </div>

          {error && (
            <div className='w-full p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[12px] text-center'>
              {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className='w-full py-4 mt-2 bg-[var(--mint)] text-[var(--deep-dark)] font-bold uppercase tracking-[0.2em] text-[12px] rounded-2xl hover:scale-[1.02] hover:shadow-xl transition-all duration-300 disabled:opacity-50'
          >
            {loading ? 'Authenticating...' : `Login as ${state}`}
          </button>

          <div className="text-[12px] text-[var(--text-muted)]">
            {state === 'Admin'
              ? <p>Are you a healthcare provider? <span onClick={() => setState('Doctor')} className='text-[var(--mint-dark)] font-bold underline cursor-pointer'>Doctor Login</span></p>
              : <p>Administrator access? <span onClick={() => setState('Admin')} className='text-[var(--mint-dark)] font-bold underline cursor-pointer'>Admin Login</span></p>
            }
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login
