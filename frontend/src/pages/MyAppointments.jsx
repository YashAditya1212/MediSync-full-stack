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
                <p className='text-text-medium text-lg'>Loading appointments...</p>
            </div>
        )
    }

    return (
        <div>
            <p className='pb-3 mt-12 font-bold text-2xl text-text-dark border-b border-white/30'>
                My Appointments
            </p>

            {appointments.length === 0 ? (
                <div className='flex flex-col items-center justify-center min-h-[40vh] gap-4'>
                    <p className='text-text-medium text-lg'>No appointments yet</p>
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
                            className='glass-card grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 rounded-xl px-4'
                        >
                            {/* Doctor Image */}
                            <div>
                                <img
                                    className='w-32 bg-primary/5 rounded-xl shadow-card'
                                    src={item.docData?.image}
                                    alt={item.docData?.name}
                                />
                            </div>

                            {/* Appointment Details */}
                            <div className='flex-1 text-sm text-text-medium'>
                                <p className='text-text-dark font-bold text-lg'>{item.docData?.name}</p>
                                <p className='text-primary font-semibold mt-1'>{item.docData?.speciality}</p>
                                <p className='text-text-dark font-semibold mt-2'>Address:</p>
                                <p className='text-xs'>{item.docData?.address?.line1}</p>
                                <p className='text-xs'>{item.docData?.address?.line2}</p>
                                <p className='text-xs mt-2'>
                                    <span className='text-sm text-text-dark font-semibold'>Date & Time: </span>
                                    <span className='text-primary font-semibold'>
                                        {formatDate(item.slotDate)} | {item.slotTime}
                                    </span>
                                </p>
                                <p className='text-xs mt-1'>
                                    <span className='text-sm text-text-dark font-semibold'>Fee: </span>
                                    <span className='text-text-medium'>{currencySymbol}{item.amount}</span>
                                </p>

                                {/* Status badge */}
                                {item.cancelled && (
                                    <span className='inline-block mt-2 text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full font-semibold'>
                                        Cancelled
                                    </span>
                                )}
                                {!item.cancelled && item.payment && (
                                    <span className='inline-block mt-2 text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full font-semibold'>
                                        Paid
                                    </span>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className='flex flex-col gap-2 justify-end'>
                                {!item.cancelled && !item.payment && (
                                    <button
                                        onClick={() => payWithRazorpay(item._id)}
                                        className='text-sm text-white bg-primary text-center sm:min-w-48 py-3 rounded-full hover:bg-primary-dark transition-all duration-300 font-semibold shadow-md hover:shadow-lg'
                                    >
                                        Pay Online
                                    </button>
                                )}

                                {!item.cancelled && (
                                    <button
                                        onClick={() => cancelAppointment(item._id)}
                                        disabled={cancellingId === item._id}
                                        className='glass-panel text-sm text-red-500 text-center sm:min-w-48 py-3 border border-red-200 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed'
                                    >
                                        {cancellingId === item._id ? 'Cancelling...' : 'Cancel appointment'}
                                    </button>
                                )}

                                {item.cancelled && (
                                    <p className='text-sm text-red-400 text-center sm:min-w-48 py-3 border border-red-100 rounded-full glass-panel'>
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