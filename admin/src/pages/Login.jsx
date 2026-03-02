import axios from 'axios'
import React, { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

const Login = () => {

  const [state, setState] = useState('Admin')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

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
          localStorage.setItem('aToken', data.token)
          toast.success('Login successful!')
        } else {
          setError(data.message || 'Login failed')
          toast.error(data.message || 'Login failed')
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          setDToken(data.token)
          localStorage.setItem('dToken', data.token)
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
        console.error('   1. Backend is running on http://localhost:4000')
        console.error('   2. .env file exists with VITE_BACKEND_URL=http://localhost:4000')
        console.error('   3. Restart admin dev server after creating .env file')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p>
        <div className='w-full '>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
        </div>
        <div className='w-full '>
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
        </div>
        {error && (
          <div className='w-full p-2 bg-red-50 border border-red-200 rounded text-red-600 text-sm'>
            {error}
          </div>
        )}
        <button 
          type="submit"
          disabled={loading}
          className='bg-primary text-white w-full py-2 rounded-md text-base disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {
          state === 'Admin'
            ? <p>Doctor Login? <span onClick={() => setState('Doctor')} className='text-primary underline cursor-pointer'>Click here</span></p>
            : <p>Admin Login? <span onClick={() => setState('Admin')} className='text-primary underline cursor-pointer'>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login