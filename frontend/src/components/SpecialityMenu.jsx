import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <div id='speciality' className='flex flex-col items-center gap-4 py-16 text-text-dark'>
            <h1 className='text-3xl font-bold'>Find by Speciality</h1>
            <p className='sm:w-1/3 text-center text-sm text-text-medium'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
            <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
                {specialityData.map((item, index) => (
                    <Link 
                        to={`/doctors/${item.speciality}`} 
                        onClick={() => scrollTo(0, 0)} 
                        className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500 group' 
                        key={index}
                    >
                        <div className='w-16 sm:w-24 h-16 sm:h-24 bg-light-bg rounded-full flex items-center justify-center mb-2 group-hover:bg-primary group-hover:shadow-lg transition-all'>
                            <img className='w-12 sm:w-16' src={item.image} alt="" />
                        </div>
                        <p className='text-text-medium group-hover:text-primary font-medium transition-colors'>{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu