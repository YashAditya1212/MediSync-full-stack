import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Stethoscope, Shield, ClipboardList, ArrowLeft, Mail, Lock, UserPlus } from 'lucide-react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { UserContext } from '../context/UserContext'
import { AdminContext } from '../context/admin/AdminContext'
import { DoctorContext } from '../context/admin/DoctorContext'

const Join = () => {
    const navigate = useNavigate()
    const { login: userLogin, backendUrl } = useContext(UserContext)
    const { setAToken } = useContext(AdminContext)
    const { setDToken } = useContext(DoctorContext)

    const [step, setStep] = useState(1) // 1: Role Selection, 2: Login Form
    const [role, setRole] = useState(null) // patient, doctor, admin, inspector
    const [state, setState] = useState('Login') // Login, Sign Up (only for patient)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const roles = [
        { id: 'patient', name: 'Patient', desc: 'Book appointments and track your health.', icon: User },
        { id: 'doctor', name: 'Doctor', desc: 'Manage your schedule and patient care.', icon: Stethoscope },
        { id: 'admin', name: 'Admin', desc: 'Full administrative control of the platform.', icon: Shield },
        { id: 'inspector', name: 'Inspection Team', desc: 'View-only access for auditing purposes.', icon: ClipboardList },
    ]

    const handleRoleSelect = (roleId) => {
        setRole(roleId)
        setStep(2)
        setError('')
    }

    const handleBack = () => {
        setStep(1)
        setRole(null)
        setState('Login')
        setError('')
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            if (role === 'patient') {
                if (state === 'Sign Up') {
                    const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password, phone })
                    if (data.success) {
                        userLogin(data.token)
                        navigate('/')
                    } else { setError(data.message) }
                } else {
                    const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
                    if (data.success) {
                        userLogin(data.token)
                        navigate('/')
                    } else { setError(data.message) }
                }
            } else if (role === 'doctor') {
                const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
                if (data.success) {
                    setDToken(data.token)
                    localStorage.setItem('doctorToken', data.token)
                    navigate('/admin/doctor-dashboard')
                } else { setError(data.message) }
            } else if (role === 'admin' || role === 'inspector') {
                const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
                if (data.success) {
                    setAToken(data.token)
                    localStorage.setItem('adminToken', data.token)
                    if (role === 'inspector') {
                        localStorage.setItem('inspectionMode', 'true')
                    } else {
                        localStorage.removeItem('inspectionMode')
                    }
                    navigate('/admin/dashboard')
                } else { setError(data.message) }
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Authentication failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen bg-[#0A120D] font-sans">
            {/* LEFT PANEL - Decorative */}
            <div className="hidden lg:block w-[40%] relative overflow-hidden">
                <img src={assets.nav_eye} alt="Decorative" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#0A120D]/55" />
                <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-[#ADEBB3]" />
            </div>

            {/* RIGHT PANEL - Interactive */}
            <div className="w-full lg:w-[60%] flex flex-col p-8 md:p-16 relative">
                {step === 2 && (
                    <button onClick={handleBack} className="absolute top-8 left-8 p-2 rounded-full hover:bg-white/5 text-[#ADEBB3] transition-all">
                        <ArrowLeft size={24} />
                    </button>
                )}

                <div className="max-w-[500px] mx-auto w-full flex-1 flex flex-col justify-center">
                    {step === 1 ? (
                        <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                            <p className="text-[12px] font-black text-[#ADEBB3] tracking-[0.3em] uppercase mb-4">Welcome to MediSync</p>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-12">Who are you?</h1>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {roles.map((r) => (
                                    <div 
                                        key={r.id}
                                        onClick={() => handleRoleSelect(r.id)}
                                        className="group p-6 rounded-2xl bg-[#0F1C14] border border-[#ADEBB3]/15 cursor-pointer hover:border-[#ADEBB3] hover:shadow-[0_0_20px_rgba(173,235,179,0.1)] transition-all"
                                    >
                                        <r.icon className="text-[#ADEBB3]/40 group-hover:text-[#ADEBB3] mb-4 transition-colors" size={32} />
                                        <h3 className="text-lg font-bold text-white mb-1">{r.name}</h3>
                                        <p className="text-xs text-white/40 leading-relaxed">{r.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                            <div className="bg-white p-10 rounded-[40px] shadow-2xl">
                                <div className="text-center mb-10">
                                    <h2 className="text-3xl font-serif">
                                        <span className="text-[#6DBF7A] italic mr-2">
                                            {role === 'patient' ? 'Patient' : role === 'doctor' ? 'Doctor' : role === 'admin' ? 'Admin' : 'Inspection'}
                                        </span>
                                        <span className="text-[#0F1C14] font-bold">
                                            {state === 'Sign Up' ? 'Portal' : 'Login'}
                                        </span>
                                    </h2>
                                    <p className="text-[13px] italic text-[#5A7A62] mt-2">
                                        {role === 'admin' ? 'Secure access for healthcare professionals.' : 'Welcome back to your healthcare hub.'}
                                    </p>
                                </div>

                                {role === 'patient' && (
                                    <div className="flex gap-8 mb-8 justify-center">
                                        {['Login', 'Sign Up'].map((s) => (
                                            <button 
                                                key={s}
                                                onClick={() => setState(s)}
                                                className={`text-[12px] font-bold uppercase tracking-widest transition-all relative py-1 ${state === s ? 'text-[#0F1C14]' : 'text-[#5A7A62] hover:text-[#0F1C14]'}`}
                                            >
                                                {s}
                                                {state === s && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ADEBB3]" />}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                <form onSubmit={onSubmitHandler} className="space-y-6">
                                    {state === 'Sign Up' && (
                                        <>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-[#6DBF7A] tracking-widest uppercase ml-1">Full Name</label>
                                                <input required value={name} onChange={e => setName(e.target.value)} type="text" placeholder="John Doe" className="w-full bg-[#E8F8EA] border-none rounded-xl px-4 py-3.5 text-sm text-[#0F1C14] placeholder:text-[#5A7A62]/50 outline-none" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black text-[#6DBF7A] tracking-widest uppercase ml-1">Phone Number</label>
                                                <input required value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-[#E8F8EA] border-none rounded-xl px-4 py-3.5 text-sm text-[#0F1C14] placeholder:text-[#5A7A62]/50 outline-none" />
                                            </div>
                                        </>
                                    )}
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-[#6DBF7A] tracking-widest uppercase ml-1">Email Address</label>
                                        <input required value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="email@example.com" className="w-full bg-[#E8F8EA] border-none rounded-xl px-4 py-3.5 text-sm text-[#0F1C14] placeholder:text-[#5A7A62]/50 outline-none" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-[#6DBF7A] tracking-widest uppercase ml-1">Password</label>
                                        <input required value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="••••••••" className="w-full bg-[#E8F8EA] border-none rounded-xl px-4 py-3.5 text-sm text-[#0F1C14] placeholder:text-[#5A7A62]/50 outline-none" />
                                    </div>

                                    {error && <p className="text-red-500 text-[11px] font-bold text-center animate-in fade-in duration-300">{error}</p>}

                                    <button 
                                        type="submit" 
                                        disabled={loading}
                                        className="w-full bg-[#ADEBB3] text-[#0F1C14] font-black uppercase tracking-[0.2em] text-[13px] py-4 rounded-full shadow-lg hover:bg-[#b8f0bd] hover:scale-[1.02] transition-all disabled:opacity-50"
                                    >
                                        {loading ? 'Processing...' : `Login as ${role}`}
                                    </button>
                                </form>

                                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                                    {role === 'admin' ? (
                                        <p className="text-[12px] text-[#5A7A62]">
                                            Are you a healthcare provider? <button onClick={() => setRole('doctor')} className="text-[#6DBF7A] font-bold hover:underline">Doctor Login</button>
                                        </p>
                                    ) : (
                                        <button onClick={handleBack} className="text-[11px] font-bold text-[#5A7A62] hover:text-[#0F1C14] transition-colors flex items-center gap-2 mx-auto">
                                            Not a {role}? Go back
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Join
