import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {

  return (
    <div className='dark:text-night-text'>

      <div className='text-center text-2xl pt-10 text-text-medium dark:text-night-text-muted'>
        <p>CONTACT <span className='text-text-dark font-bold dark:text-night-text'>US</span></p>
      </div>

      <div className='glass-panel p-8 rounded-3xl my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm dark:bg-night-surface/50 dark:border-night-border'>
        <img className='w-full md:max-w-[360px] rounded-xl shadow-card dark:opacity-80' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-bold text-xl text-text-dark dark:text-night-text'>OUR OFFICE</p>
          <p className='text-text-medium leading-relaxed dark:text-night-text-muted'>
            Tower 5, Connaught Place<br />
            New Delhi, 110001, India
          </p>
          <p className='text-text-medium leading-relaxed dark:text-night-text-muted'>Tel: <span className='text-primary font-semibold dark:text-accent'>(415) 555-0132</span> <br /> Email: <span className='text-primary font-semibold dark:text-accent'>contact@MediSync.com</span></p>
          <p className='font-bold text-xl text-text-dark dark:text-night-text'>CAREERS AT MediSync</p>
          <p className='text-text-medium leading-relaxed dark:text-night-text-muted'>Learn more about our teams and job openings.</p>
          <button className='glass-panel border-none text-primary px-8 py-3 text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-300 rounded-full shadow-md hover:shadow-lg dark:bg-night-surface dark:text-accent'>Explore Jobs</button>
        </div>
      </div>

    </div>
  )
}

export default Contact