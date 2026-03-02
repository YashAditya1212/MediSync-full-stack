import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const MyAppointments = () => {

    const { token, backendUrl } = useContext(UserContext)
    const { currencySymbol } = useContext(AppContext)
    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])
    const [loading, setLoading] = useState(true)
    const [cancellingId, setCancellingId] = useState(null)

    // Fetch all appointments for this user
    const getUserAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/appointments', {
                headers: { token }
            })
            if (data.success) {
                // Show newest appointments first
                setAppointments(data.appointments.reverse())
            } else {
                toast.error(data.message || 'Failed to load appointments')
            }
        } catch (error) {
            console.error('Error fetching appointments:', error)
            toast.error('Could not load appointments')
        } finally {
            setLoading(false)
        }
    }

    // Cancel an appointment
    const cancelAppointment = async (appointmentId) => {
        setCancellingId(appointmentId)
        try {
            const { data } = await axios.post(
                backendUrl + '/api/user/cancel-appointment',
                { appointmentId },
                { headers: { token } }
            )
            if (data.success) {
                toast.success('Appointment cancelled')
                getUserAppointments() // refresh the list
            } else {
                toast.error(data.message || 'Failed to cancel')
            }
        } catch (error) {
            console.error('Cancel error:', error)
            toast.error('Something went wrong')
        } finally {
            setCancellingId(null)
        }
    }

    // Initiate Razorpay payment
    const payWithRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/user/payment-razorpay',
                { appointmentId },
                { headers: { token } }
            )
            if (data.success) {
                // Open Razorpay checkout
                const options = {
                    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                    amount: data.order.amount,
                    currency: data.order.currency,
                    name: 'MediSync',
                    description: 'Appointment Payment',
                    order_id: data.order.id,
                    handler: async (response) => {
                        try {
                            const verifyRes = await axios.post(
                                backendUrl + '/api/user/verifyRazorpay',
                                { razorpay_order_id: response.razorpay_order_id },
                                { headers: { token } }
                            )
                            if (verifyRes.data.success) {
                                toast.success('Payment successful!')
                                getUserAppointments()
                            }
                        } catch (err) {
                            toast.error('Payment verification failed')
                        }
                    },
                    prefill: {},
                    theme: { color: '#10b981' }
                }
                const rzp = new window.Razorpay(options)
                rzp.open()
            } else {
                toast.error(data.message || 'Payment initiation failed')
            }
        } catch (error) {
            console.error('Payment error:', error)
            toast.error('Payment failed')
        }
    }

    useEffect(() => {
        if (token) {
            getUserAppointments()
        } else {
            navigate('/login')
        }
    }, [token])

    // Format slotDate from "25_7_2024" → "25 July, 2024"
    const formatDate = (slotDate) => {
        if (!slotDate) return ''
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const [day, month, year] = slotDate.split('_')
        return `${day} ${months[parseInt(month) - 1]}, ${year}`
    }

    if (loading) {
        return (
            <div className='flex items-center justify-center min-h-[60vh]'>
                <p className='text-text-medium text-lg dark:text-night-text-muted'>Loading appointments...</p>
            </div>
        )
    }

    return (
        <div className='dark:text-night-text'>
            <p className='pb-3 mt-12 font-bold text-2xl text-text-dark border-b border-white/30 dark:text-night-text dark:border-night-border'>
                My Appointments
            </p>

            {appointments.length === 0 ? (
                <div className='flex flex-col items-center justify-center min-h-[40vh] gap-4'>
                    <p className='text-text-medium text-lg dark:text-night-text-muted'>No appointments yet</p>
                    <button
                        onClick={() => navigate('/doctors')}
                        className='bg-primary text-white px-8 py-3 rounded-full hover:bg-primary-dark transition-all font-semibold'
                    >
                        Book an Appointment
                    </button>
                </div>
            ) : (
                <div className='flex flex-col gap-4 mt-4'>
                    {appointments.map((item, index) => (
                        <div
                            key={index}
                            className='glass-card grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 rounded-xl px-4 dark:bg-night-surface/50 dark:border-night-border'
                        >
                            {/* Doctor Image */}
                            <div className='dark:bg-night-bg rounded-xl overflow-hidden'>
                                <img
                                    className='w-32 bg-primary/5 rounded-xl shadow-card'
                                    src={item.docData?.image}
                                    alt={item.docData?.name}
                                />
                            </div>

                            {/* Appointment Details */}
                            <div className='flex-1 text-sm text-text-medium dark:text-night-text-muted'>
                                <p className='text-text-dark font-bold text-lg dark:text-night-text'>{item.docData?.name}</p>
                                <p className='text-primary font-semibold mt-1 dark:text-accent'>{item.docData?.speciality}</p>
                                <p className='text-text-dark font-semibold mt-2 dark:text-night-text'>Address:</p>
                                <p className='text-xs'>{item.docData?.address?.line1}</p>
                                <p className='text-xs'>{item.docData?.address?.line2}</p>
                                <p className='text-xs mt-2'>
                                    <span className='text-sm text-text-dark font-semibold dark:text-night-text'>Date & Time: </span>
                                    <span className='text-primary font-semibold dark:text-accent'>
                                        {formatDate(item.slotDate)} | {item.slotTime}
                                    </span>
                                </p>
                                <p className='text-xs mt-1'>
                                    <span className='text-sm text-text-dark font-semibold dark:text-night-text'>Fee: </span>
                                    <span className='text-text-medium dark:text-night-text-muted'>{currencySymbol}{item.amount}</span>
                                </p>

                                {/* Status badge */}
                                {item.cancelled && (
                                    <span className='inline-block mt-2 text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full font-semibold dark:bg-red-900/20 dark:text-red-400'>
                                        Cancelled
                                    </span>
                                )}
                                {!item.cancelled && item.payment && (
                                    <span className='inline-block mt-2 text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full font-semibold dark:bg-green-900/20 dark:text-green-400'>
                                        Paid
                                    </span>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className='flex flex-col gap-2 justify-end'>
                                {!item.cancelled && !item.payment && (
                                    <button
                                        onClick={() => payWithRazorpay(item._id)}
                                        className='text-sm text-white bg-primary text-center sm:min-w-48 py-3 rounded-full hover:bg-primary-dark transition-all duration-300 font-semibold shadow-md hover:shadow-lg dark:hover:bg-primary'
                                    >
                                        Pay Online
                                    </button>
                                )}

                                {!item.cancelled && (
                                    <button
                                        onClick={() => cancelAppointment(item._id)}
                                        disabled={cancellingId === item._id}
                                        className='glass-panel text-sm text-red-500 text-center sm:min-w-48 py-3 border border-red-200 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed dark:border-night-border dark:hover:bg-red-900/40'
                                    >
                                        {cancellingId === item._id ? 'Cancelling...' : 'Cancel appointment'}
                                    </button>
                                )}

                                {item.cancelled && (
                                    <p className='text-sm text-red-400 text-center sm:min-w-48 py-3 border border-red-100 rounded-full glass-panel dark:bg-red-900/10 dark:border-red-900/20'>
                                        Appointment Cancelled
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MyAppointments