import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { UserContext } from '../context/UserContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {

    const { docId } = useParams()
    const { doctors, currencySymbol } = useContext(AppContext)
    const { token, backendUrl, userData } = useContext(UserContext)
    const navigate = useNavigate()
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docInfo, setDocInfo] = useState(null)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')
    const [loading, setLoading] = useState(false)

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId)
        setDocInfo(docInfo)
    }

    const getAvailableSlots = async () => {
        setDocSlots([])

        // getting current date
        let today = new Date()

        for (let i = 0; i < 7; i++) {
            // getting date with index 
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            // setting end time of the date with index
            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            // setting hours 
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = []

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

                // Add slot to array
                timeSlots.push({
                    datetime: new Date(currentDate),
                    time: formattedTime
                })

                // Increment current time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 30)
            }

            setDocSlots(prev => ([...prev, timeSlots]))
        }
    }

    const bookAppointment = async () => {
        if (!token) {
            toast.warn('Please login to book an appointment')
            navigate('/login')
            return
        }

        if (!slotTime) {
            toast.error('Please select a time slot')
            return
        }

        if (!docSlots[slotIndex] || docSlots[slotIndex].length === 0) {
            toast.error('No slots available for this day')
            return
        }

        const date = docSlots[slotIndex][0].datetime
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        const slotDate = `${day}_${month}_${year}`

        setLoading(true)
        try {
            const { data } = await axios.post(
                backendUrl + '/api/user/book-appointment',
                {
                    docId,
                    slotDate,
                    slotTime
                },
                {
                    headers: { token }
                }
            )

            if (data.success) {
                toast.success(data.message)
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong')
            console.error('Booking error:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo()
        }
    }, [doctors, docId])

    useEffect(() => {
        if (docInfo) {
            getAvailableSlots()
        }
    }, [docInfo])

    return docInfo ? (
        <div>
            {/* ---------- Doctor Details ----------- */}
            <div className='flex flex-col sm:flex-row gap-4'>
                <div>
                    <img className='glass-panel w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
                </div>

                <div className='flex-1 glass-card border border-white/40 rounded-lg p-8 py-7 mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
                    {/* ----- Doc Info : name, degree, experience ----- */}
                    <p className='flex items-center gap-2 text-2xl font-medium text-text-dark'>
                        {docInfo.name}
                        <img className='w-5' src={assets.verified_icon} alt="" />
                    </p>
                    <div className='flex items-center gap-2 text-sm mt-1 text-text-medium'>
                        <p>{docInfo.degree} - {docInfo.speciality}</p>
                        <button className='py-0.5 px-2 border border-primary/30 text-xs rounded-full'>{docInfo.experience}</button>
                    </div>

                    {/* ----- Doc About ----- */}
                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-text-dark mt-3'>
                            About <img className='w-3' src={assets.info_icon} alt="" />
                        </p>
                        <p className='text-sm text-text-medium max-w-[700px] mt-1'>{docInfo.about}</p>
                    </div>

                    <p className='text-text-medium font-medium mt-4'>
                        Appointment fee: <span className='text-text-dark'>{currencySymbol}{docInfo.fees}</span>
                    </p>
                </div>
            </div>

            {/* Booking slots */}
            <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-text-dark'>
                <p>Booking slots</p>
                <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
                    {docSlots.length && docSlots.map((item, index) => (
                        <div
                            onClick={() => setSlotIndex(index)}
                            key={index}
                            className={`glass-panel text-center py-6 min-w-16 rounded-full cursor-pointer transition-all ${slotIndex === index ? 'bg-primary text-white border-none' : 'border border-white/40'}`}
                        >
                            <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                            <p>{item[0] && item[0].datetime.getDate()}</p>
                        </div>
                    ))}
                </div>

                <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
                    {docSlots.length && docSlots[slotIndex].map((item, index) => (
                        <p
                            onClick={() => setSlotTime(item.time)}
                            key={index}
                            className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer transition-all ${item.time === slotTime ? 'bg-primary text-white' : 'glass-panel text-text-medium border border-white/40 hover:border-primary/50'}`}
                        >
                            {item.time.toLowerCase()}
                        </p>
                    ))}
                </div>

                <button
                    onClick={bookAppointment}
                    disabled={loading || !slotTime}
                    className='glass-panel bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-dark transition-all shadow-md hover:shadow-lg'
                >
                    {loading ? 'Booking...' : 'Book an appointment'}
                </button>
            </div>

            {/* Listing Related Doctors */}
            <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
        </div>
    ) : null
}

export default Appointment
