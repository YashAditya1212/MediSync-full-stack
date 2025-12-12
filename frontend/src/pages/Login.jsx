import React, { useState } from 'react'

const Login = () => {

  const [state, setState] = useState('Sign Up')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = (event) => {
    event.preventDefault();
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-4 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border-2 border-gray-200 rounded-2xl text-text-medium text-sm shadow-card bg-white'>
        <p className='text-2xl font-bold text-text-dark'>{state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}</p>
        <p className='text-text-medium'>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment</p>
        
        {state === 'Sign Up' && (
          <div className='w-full'>
            <p className='font-semibold text-text-dark mb-2'>Full Name</p>
            <input 
              onChange={(e) => setName(e.target.value)} 
              value={name} 
              className='border-2 border-gray-300 rounded-lg w-full p-3 mt-1 focus:border-primary focus:outline-none transition-all' 
              type="text" 
              placeholder='Enter your name'
              required 
            />
          </div>
        )}
        
        <div className='w-full'>
          <p className='font-semibold text-text-dark mb-2'>Email</p>
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            className='border-2 border-gray-300 rounded-lg w-full p-3 mt-1 focus:border-primary focus:outline-none transition-all' 
            type="email" 
            placeholder='your@email.com'
            required 
          />
        </div>
        
        <div className='w-full'>
          <p className='font-semibold text-text-dark mb-2'>Password</p>
          <input 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            className='border-2 border-gray-300 rounded-lg w-full p-3 mt-1 focus:border-primary focus:outline-none transition-all' 
            type="password" 
            placeholder='Enter your password'
            required 
          />
        </div>
        
        <button className='bg-primary text-white w-full py-3 rounded-full text-base font-semibold hover:bg-primary-dark transition-all shadow-md hover:shadow-lg hover:scale-105'>
          {state === 'Sign Up' ? 'Create account' : 'Login'}
        </button>
        
        {state === 'Sign Up' ? (
          <p className='text-center w-full'>
            Already have an account? 
            <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer font-semibold hover:text-primary-dark ml-1'>
              Login here
            </span>
          </p>
        ) : (
          <p className='text-center w-full'>
            Create a new account? 
            <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer font-semibold hover:text-primary-dark ml-1'>
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  )
}

export default Login