import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const RelatedDoctors = ({ speciality, docId }) => {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    const [relDoc, setRelDoc] = useState([])

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDoc(doctorsData)
        }
    }, [doctors, speciality, docId])

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-text-dark dark:text-night-text'>
            <h1 className='text-3xl font-bold dark:text-night-text'>Related Doctors</h1>
            <p className='sm:w-1/3 text-center text-sm text-text-medium dark:text-night-text-muted'>Simply browse through our extensive list of trusted doctors.</p>
            <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {relDoc.map((item, index) => (
                    <div 
                        onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0) }} 
                        className='glass-card rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 hover:shadow-card-hover group dark:bg-night-surface/50 dark:border-night-border' 
                        key={index}
                    >
                        <img className='bg-primary/5 group-hover:bg-primary/10 transition-colors dark:bg-night-bg' src={item.image} alt="" />
                        <div className='p-4'>
                            <div className='flex items-center gap-2 text-sm text-center text-success'>
                                <p className='w-2 h-2 bg-success rounded-full animate-pulse'></p>
                                <p className='font-medium'>Available</p>
                            </div>
                            <p className='text-text-dark text-lg font-semibold mt-2 dark:text-night-text'>{item.name}</p>
                            <p className='text-text-medium text-sm dark:text-night-text-muted'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RelatedDoctors