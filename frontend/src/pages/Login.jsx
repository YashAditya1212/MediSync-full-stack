import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const Login = () => {

  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const { login, backendUrl } = useContext(UserContext)
  const navigate = useNavigate()

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true)

    try {
      if (state === 'Sign Up') {
        // Register user
        const { data } = await axios.post(backendUrl + '/api/user/register', {
          name,
          email,
          password
        })
        
        if (data.success) {
          login(data.token)
          toast.success('Account created successfully!')
          navigate('/my-profile')
        } else {
          toast.error(data.message || 'Registration failed')
        }
      } else {
        // Login user
        const { data } = await axios.post(backendUrl + '/api/user/login', {
          email,
          password
        })
        
        if (data.success) {
          login(data.token)
          toast.success('Login successful!')
          navigate('/my-profile')
        } else {
          toast.error(data.message || 'Login failed')
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
      console.error('Auth error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='glass-card flex flex-col gap-4 m-auto items-start p-8 min-w-[340px] sm:min-w-96 rounded-2xl text-text-medium text-sm dark:bg-night-surface/50 dark:border-night-border'>
        <p className='text-2xl font-bold text-text-dark dark:text-night-text'>{state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}</p>
        <p className='text-text-medium dark:text-night-text-muted'>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment</p>
        
        {state === 'Sign Up' && (
          <div className='w-full'>
            <p className='font-semibold text-text-dark mb-2 dark:text-night-text'>Full Name</p>
            <input 
              onChange={(e) => setName(e.target.value)} 
              value={name} 
              className='glass-panel border border-white/40 rounded-lg w-full p-3 mt-1 focus:border-primary focus:outline-none transition-all dark:bg-night-surface dark:border-night-border dark:text-night-text' 
              type="text" 
              placeholder='Enter your name'
              required 
            />
          </div>
        )}
        
        <div className='w-full'>
          <p className='font-semibold text-text-dark mb-2 dark:text-night-text'>Email</p>
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            className='glass-panel border border-white/40 rounded-lg w-full p-3 mt-1 focus:border-primary focus:outline-none transition-all dark:bg-night-surface dark:border-night-border dark:text-night-text' 
            type="email" 
            placeholder='your@email.com'
            required 
          />
        </div>
        
        <div className='w-full'>
          <p className='font-semibold text-text-dark mb-2 dark:text-night-text'>Password</p>
          <input 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            className='glass-panel border border-white/40 rounded-lg w-full p-3 mt-1 focus:border-primary focus:outline-none transition-all dark:bg-night-surface dark:border-night-border dark:text-night-text' 
            type="password" 
            placeholder='Enter your password'
            required 
          />
        </div>
        
        <button 
          disabled={loading}
          type='submit' 
          className='w-full bg-primary text-white py-4 rounded-xl font-bold text-base shadow-glow hover:bg-primary-dark transition-all duration-300 active:scale-95 disabled:opacity-50'
        >
          {loading ? 'Processing...' : (state === 'Sign Up' ? 'Create Account' : 'Login')}
        </button>
        
        {state === 'Sign Up' 
          ? <p className='text-center w-full dark:text-night-text-muted'>Already have an account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer font-semibold'>Login here</span></p>
          : <p className='text-center w-full dark:text-night-text-muted'>Create a new account? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer font-semibold'>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login