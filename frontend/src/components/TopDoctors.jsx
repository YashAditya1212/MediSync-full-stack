import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
    
    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-text-dark md:mx-10'>
            <h1 className='text-3xl font-bold text-text-dark'>Top Doctors to Book</h1>
            <p className='sm:w-1/3 text-center text-sm text-text-medium'>Simply browse through our extensive list of trusted doctors.</p>
            <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {doctors.slice(0, 10).map((item, index) => (
                    <div
                        onClick={() => {
                            navigate(`/appointment/${item._id}`);
                            window.scrollTo(0, 0)
                        }}
                        className='border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 hover:shadow-card-hover bg-white'
                        key={index}
                    >
                        <img className='bg-light-bg' src={item.image} alt="" />
                        <div className='p-4'>
                            <div className='flex items-center gap-2 text-sm text-center text-success'>
                                <p className='w-2 h-2 bg-success rounded-full animate-pulse'></p><p className='font-medium'>Available</p>
                            </div>
                            <p className='text-text-dark text-lg font-semibold mt-2'>{item.name}</p>
                            <p className='text-text-medium text-sm'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} className='bg-light-bg text-primary px-12 py-3 rounded-full mt-10 font-semibold hover:bg-primary hover:text-white transition-all shadow-md hover:shadow-lg'>View More</button>
        </div>
    )
}

export default TopDoctors