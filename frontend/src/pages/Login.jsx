import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { User, Lock, Mail, UserPlus, HelpCircle } from 'lucide-react'

const Login = () => {
  const [state, setState] = useState('Login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [keepLoggedIn, setKeepLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)

  const { login, backendUrl, token } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token, navigate])

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    
    if (state === 'Sign Up' && password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long')
      return
    }

    setLoading(true)

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', {
          name,
          email,
          password
        })
        
        if (data.success) {
          login(data.token)
          toast.success('Account created successfully!')
          navigate('/')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', {
          email,
          password
        })
        
        if (data.success) {
          login(data.token)
          toast.success('Welcome back!')
          navigate('/')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-y-auto z-[2000] flex items-center justify-center font-sans bg-black">
      
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={assets.login_background} 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* TOP NAVBAR (Logo Left, Tabs Right) */}
      <div className="absolute top-0 left-0 w-full px-8 md:px-16 py-8 flex items-center justify-between z-20">
        <div className="brightness-0 invert opacity-90 cursor-pointer" onClick={() => navigate('/')}>
          <img src={assets.logo} alt="MediSync" className="w-36 md:w-40" />
        </div>
        
        <div className="flex items-center gap-8">
          {[
             { label: 'LOGIN', active: state === 'Login', onClick: () => setState('Login') },
             { label: 'REGISTER', active: state === 'Sign Up', onClick: () => setState('Sign Up') },
             { label: 'CONTACT', active: false, onClick: () => navigate('/contact') }
           ].map((tab) => (
            <button
              key={tab.label}
              onClick={tab.onClick}
              className={`relative text-[12px] uppercase tracking-[0.2em] font-bold transition-colors duration-300 ${
                tab.active ? 'text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              {tab.label}
              {tab.active && (
                <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#ADEBB3]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* CENTER FORM GLASS BOX */}
      <div className="relative z-10 w-full max-w-[450px] p-10 rounded-[40px] border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
        <div className="w-full flex flex-col items-center">
          
          <form onSubmit={onSubmitHandler} className="w-full space-y-8">
            {state === 'Sign Up' && (
              <div className="relative group">
                <User className="absolute left-0 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#ADEBB3] transition-colors" size={18} />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full bg-transparent border-none border-b border-white/40 focus:border-[#ADEBB3] outline-none pl-8 pr-2 py-3 text-[14px] text-white placeholder:text-white/40 transition-all"
                />
              </div>
            )}

            <div className="relative group">
              <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#ADEBB3] transition-colors" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full bg-transparent border-none border-b border-white/40 focus:border-[#ADEBB3] outline-none pl-8 pr-2 py-3 text-[14px] text-white placeholder:text-white/40 transition-all"
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#ADEBB3] transition-colors" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-transparent border-none border-b border-white/40 focus:border-[#ADEBB3] outline-none pl-8 pr-2 py-3 text-[14px] text-white placeholder:text-white/40 transition-all"
              />
            </div>

            {state === 'Sign Up' && (
              <div className="relative group">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#ADEBB3] transition-colors" size={18} />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full bg-transparent border-none border-b border-white/40 focus:border-[#ADEBB3] outline-none pl-8 pr-2 py-3 text-[14px] text-white placeholder:text-white/40 transition-all"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 mt-6 bg-[#ADEBB3] text-[#0F1C14] font-black uppercase tracking-[0.25em] text-[13px] rounded-2xl hover:bg-[#c4f5c9] hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:scale-100 shadow-[0_0_30px_rgba(173,235,179,0.3)]"
            >
              {loading ? 'PROCESSING...' : (state === 'Sign Up' ? 'REGISTER' : 'LOGIN')}
            </button>
          </form>

          {/* SECONDARY LINKS */}
          <div className="w-full mt-6 flex items-center justify-between text-[11px] text-white/70 font-medium">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={keepLoggedIn}
                onChange={(e) => setKeepLoggedIn(e.target.checked)}
                className="w-3 h-3 rounded-sm border-white/40 bg-transparent checked:bg-[#ADEBB3] transition-all" 
              />
              <span className="group-hover:text-white transition-colors">Keep Logged In</span>
            </label>
            <button className="hover:text-white transition-colors">Forgot Password?</button>
          </div>

          <div className="w-full mt-10 pt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-white font-bold tracking-[0.15em]">
            <button 
              onClick={() => setState(state === 'Login' ? 'Sign Up' : 'Login')}
              className="hover:text-[#ADEBB3] transition-colors flex items-center gap-2"
            >
              {state === 'Login' ? <UserPlus size={14} /> : <User size={14} />}
              {state === 'Login' ? 'CREATE ACCOUNT' : 'LOGIN INSTEAD'}
            </button>
            <button className="hover:text-[#ADEBB3] transition-colors">NEED HELP?</button>
          </div>

        </div>
      </div>

      {/* FOOTER LINKS */}
      <div className="absolute bottom-8 w-full px-8 md:px-16 flex flex-col md:flex-row items-center justify-between text-[10px] text-white/40 tracking-widest font-medium uppercase">
        <div className="flex items-center gap-6 mb-4 md:mb-0">
          <button className="hover:text-white transition-colors" onClick={() => navigate('/about')}>About Us</button>
          <button className="hover:text-white transition-colors">Privacy Policy</button>
          <button className="hover:text-white transition-colors">Terms Of Use</button>
        </div>
        <p>© 2026 MediSync. All Rights Reserved | Design By MediSync Team</p>
      </div>

    </div>
  )
}

export default Login
