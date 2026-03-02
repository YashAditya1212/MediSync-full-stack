import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const Header = () => {
    return (
        <div className='relative pt-10'>
            <div className='flex flex-col md:flex-row flex-wrap bg-mint-light rounded-3xl px-6 md:px-10 lg:px-20 overflow-hidden relative'>
                
                {/* Decorative Grid Background */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                     style={{ backgroundImage: 'linear-gradient(#059669 1px, transparent 1px), linear-gradient(90deg, #059669 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                </div>

                {/* --------- Header Left --------- */}
                <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 py-10 m-auto md:py-[8vw] relative z-10'>
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <p className='text-primary font-bold tracking-wider text-sm mb-2'>WELCOME TO MEDISYNC</p>
                        <h1 className='text-4xl md:text-5xl lg:text-6xl text-text-dark font-display font-bold leading-tight'>
                            Next Gen <br /> 
                            <span className="text-primary">OPD Booking</span>
                        </h1>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className='flex flex-col md:flex-row items-center gap-4 text-text-muted text-sm font-light'
                    >
                        <img className='w-28' src={assets.group_profiles} alt="" />
                        <p>Check out our curated selection of reliable doctors, <br className='hidden sm:block' />  and schedule your visit in seconds.</p>
                    </motion.div>

                    <motion.a 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        href='#speciality' 
                        className='group flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-semibold shadow-glow hover:bg-primary-dark transition-all duration-300'
                    >
                        Book Appointment 
                        <img className='w-3 group-hover:translate-x-1 transition-transform' src={assets.arrow_icon_white || assets.arrow_icon} alt="" />
                    </motion.a>
                </div>

                {/* --------- Header Right --------- */}
                <div className='md:w-1/2 relative flex items-end justify-center'>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="relative z-10"
                    >
                         <img className='w-full max-w-md md:max-w-lg object-contain drop-shadow-2xl' src={assets.header_img} alt="" />
                    </motion.div>
                   
                    {/* Decorative Circle */}
                    <div className="absolute bottom-0 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl z-0"></div>
                </div>
            </div>
        </div>
    )
}

export default Header