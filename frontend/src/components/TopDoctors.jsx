import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'

const TopDoctors = () => {
    
    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-text-dark md:mx-10'>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='text-center mb-8'
            >
                <h1 className='text-3xl font-display font-bold text-text-dark'>Top Doctors to Book</h1>
                <p className='sm:w-1/3 mx-auto text-sm text-text-medium mt-2'>Simply browse through our extensive list of trusted doctors.</p>
            </motion.div>

            <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-0'>
                {doctors.slice(0, 9).map((item, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        onClick={() => {
                            navigate(`/appointment/${item._id}`);
                            window.scrollTo(0, 0)
                        }}
                        className='glass-card p-4 rounded-2xl cursor-pointer hover:shadow-glow hover:-translate-y-2 transition-all duration-300 group'
                        key={index}
                    >
                        <div className="w-full aspect-[4/5] overflow-hidden rounded-xl bg-mint-light mb-4 relative">
                            <img className='w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500' src={item.image} alt="" />
                            <div className='absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm flex items-center gap-1.5'>
                                <span className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></span>
                                AVAILABLE
                            </div>
                        </div>

                        <div className='flex flex-col gap-2 px-2'>
                            <p className='text-xl font-bold text-text-dark group-hover:text-primary transition-colors'>{item.name}</p>
                            <p className='text-sm text-primary font-medium tracking-wide'>{item.speciality}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
            
            <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} 
                className='mt-10 px-12 py-3 border border-primary/30 rounded-full font-semibold text-primary hover:bg-primary hover:text-white transition-all shadow-glow'
            >
                View Full Roster
            </motion.button>
        </div>
    )
}

export default TopDoctors