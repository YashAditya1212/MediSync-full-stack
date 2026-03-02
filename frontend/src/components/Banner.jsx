import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

    const navigate = useNavigate()

    return (
        <div className='glass-panel p-1 rounded-2xl my-20 md:mx-10 shadow-card-hover overflow-hidden dark:bg-night-surface/50 dark:border-night-border'>
            <div className='flex bg-gradient-to-r from-primary to-accent rounded-xl px-6 sm:px-10 md:px-14 lg:px-12 dark:from-primary-dark dark:to-primary'>
                {/* ------- Left Side ------- */}
                <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
                    <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-white'>
                        <p>Book Appointment</p>
                        <p className='mt-4'>With 100+ Trusted Doctors</p>
                    </div>
                    <button onClick={() => { navigate('/login'); scrollTo(0, 0) }} className='glass-panel bg-white/90 text-primary text-sm sm:text-base font-semibold px-8 py-4 rounded-full mt-6 hover:scale-105 hover:shadow-lg transition-all dark:bg-night-surface dark:text-accent'>Create account</button>
                </div>

                {/* ------- Right Side ------- */}
                <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
                    <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Banner