import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {
    const { backendUrl, token } = useContext(UserContext)
    const { getDoctorsData } = useContext(AppContext)
    const [appointments, setAppointments] = useState([])
    const [loading, setLoading] = useState(true)

    const getUserAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
            if (data.success) {
                setAppointments(data.appointments.reverse())
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
                getDoctorsData()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token])

    if (loading) {
        return (
            <div className='min-h-[60vh] flex items-center justify-center'>
                <div className='w-12 h-12 border-4 border-[var(--mint)] border-t-transparent rounded-full animate-spin'></div>
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto pt-28 pb-20 px-4 sm:px-6">
            <div className="mb-10" data-aos="fade-down">
                <h1 className="text-4xl font-serif text-[var(--text-dark)] mb-2">My Appointments</h1>
                <p className="text-[var(--text-muted)] tracking-wide">Manage your upcoming healthcare visits.</p>
                <div className="w-20 h-1 bg-[var(--mint)] mt-4 rounded-full" />
            </div>

            <div className='flex flex-col gap-6'>
                {appointments.length > 0 ? (
                    appointments.map((item, index) => (
                        <div 
                            key={index} 
                            data-aos="fade-up"
                            data-aos-delay={index * 50}
                            className='glass-card bg-[var(--card-bg)] border border-white/20 dark:border-white/5 grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-6 p-6 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all group'
                        >
                            <div className="relative overflow-hidden rounded-2xl w-full sm:w-40 aspect-square bg-[var(--mint-bg)]">
                                <img className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700' src={item.docData.image} alt="" />
                            </div>
                            
                            <div className='flex flex-col justify-center gap-2'>
                                <p className='text-2xl font-bold text-[var(--text-dark)]'>{item.docData.name}</p>
                                <p className='text-[var(--mint-dark)] font-bold text-xs uppercase tracking-widest'>{item.docData.speciality}</p>
                                
                                <div className="mt-4 space-y-1">
                                    <p className='text-[var(--text-dark)] font-bold text-[13px] flex items-center gap-2'>
                                        Address: 
                                        <span className="font-medium text-[var(--text-muted)]">{item.docData.address.line1}, {item.docData.address.line2}</span>
                                    </p>
                                    <p className='text-[var(--text-dark)] font-bold text-[13px] flex items-center gap-2'>
                                        Date & Time: 
                                        <span className='text-[var(--mint-dark)] font-black uppercase tracking-wider bg-[var(--mint-bg)] px-3 py-1 rounded-full text-[11px]'>
                                            {item.slotDate.replace(/_/g, ' ')} | {item.slotTime}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className='flex flex-col gap-3 justify-center'>
                                {!item.cancelled && item.payment && !item.isCompleted && (
                                    <button className='px-10 py-3 bg-[var(--deep-dark)] text-[var(--mint)] font-bold uppercase tracking-widest text-[11px] rounded-full shadow-lg transition-all opacity-50 cursor-not-allowed'>
                                        Paid
                                    </button>
                                )}
                                {!item.cancelled && !item.payment && !item.isCompleted && (
                                    <button className='px-10 py-3 bg-[var(--deep-dark)] text-white font-bold uppercase tracking-widest text-[11px] rounded-full shadow-lg hover:scale-105 transition-all'>
                                        Pay Online
                                    </button>
                                )}
                                {!item.cancelled && !item.isCompleted && (
                                    <button 
                                        onClick={() => cancelAppointment(item._id)}
                                        className='px-10 py-3 border border-red-400/30 text-red-400 font-bold uppercase tracking-widest text-[11px] rounded-full hover:bg-red-400 hover:text-white transition-all'
                                    >
                                        Cancel Appointment
                                    </button>
                                )}
                                {item.cancelled && !item.isCompleted && (
                                    <button className='px-10 py-3 border border-red-500 text-red-500 font-bold uppercase tracking-widest text-[11px] rounded-full cursor-not-allowed bg-red-500/5'>
                                        Appointment Cancelled
                                    </button>
                                )}
                                {item.isCompleted && (
                                    <button className='px-10 py-3 border border-[var(--mint-dark)] text-[var(--mint-dark)] font-bold uppercase tracking-widest text-[11px] rounded-full cursor-not-allowed bg-[var(--mint-bg)]'>
                                        Completed
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 glass-card rounded-[3rem]">
                        <img src={assets.info_icon} className="w-12 h-12 mx-auto mb-4 opacity-20 dark:invert" alt="" />
                        <p className="text-[var(--text-muted)] font-serif italic text-xl">No appointments booked yet.</p>
                        <button 
                            onClick={() => navigate('/doctors')}
                            className="mt-6 px-10 py-3 bg-[var(--mint)] text-[var(--deep-dark)] font-bold uppercase tracking-widest text-[11px] rounded-full"
                        >
                            Find a Specialist
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyAppointments
