import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointments = () => {

    const { doctors } = useContext(AppContext)

    return (
        <div>
            <p className='pb-3 mt-12 font-bold text-2xl text-text-dark border-b-2 border-gray-300'>My Appointments</p>
            <div>
                {doctors.slice(0, 2).map((item, index) => (
                    <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b hover:bg-light-bg transition-all rounded-xl px-4'>
                        <div>
                            <img className='w-32 bg-light-bg rounded-xl shadow-card' src={item.image} alt="" />
                        </div>
                        <div className='flex-1 text-sm text-text-medium'>
                            <p className='text-text-dark font-bold text-lg'>{item.name}</p>
                            <p className='text-primary font-semibold mt-1'>{item.speciality}</p>
                            <p className='text-text-dark font-semibold mt-2'>Address:</p>
                            <p className='text-xs'>{item.address.line1}</p>
                            <p className='text-xs'>{item.address.line2}</p>
                            <p className='text-xs mt-2'>
                                <span className='text-sm text-text-dark font-semibold'>Date & Time:</span> 
                                <span className='text-primary font-semibold'> 25 July, 2024 | 8:30 PM</span>
                            </p>
                        </div>
                        <div></div>
                        <div className='flex flex-col gap-2 justify-end'>
                            <button className='text-sm text-white bg-primary text-center sm:min-w-48 py-3 rounded-full hover:bg-primary-dark transition-all duration-300 font-semibold shadow-md hover:shadow-lg'>
                                Pay Online
                            </button>
                            <button className='text-sm text-danger text-center sm:min-w-48 py-3 border-2 border-danger rounded-full hover:bg-danger hover:text-white transition-all duration-300 font-semibold'>
                                Cancel appointment
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyAppointments