import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {

  return (
    <div>

      <div className='text-center text-2xl pt-10 text-text-medium'>
        <p>CONTACT <span className='text-text-dark font-bold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px] rounded-xl shadow-card' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-bold text-xl text-text-dark'>OUR OFFICE</p>
<p className='text-text-medium leading-relaxed'>
Tower 5, Connaught Place<br />
New Delhi, 110001, India
</p>
          <p className='text-text-medium leading-relaxed'>Tel: <span className='text-primary font-semibold'>(415) 555-0132</span> <br /> Email: <span className='text-primary font-semibold'>contact@MediSync.com</span></p>
          <p className='font-bold text-xl text-text-dark'>CAREERS AT MediSync</p>
          <p className='text-text-medium leading-relaxed'>Learn more about our teams and job openings.</p>
          <button className='border-2 border-primary text-primary px-8 py-3 text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-300 rounded-full shadow-md hover:shadow-lg'>Explore Jobs</button>
        </div>
      </div>

    </div>
  )
}

export default Contact