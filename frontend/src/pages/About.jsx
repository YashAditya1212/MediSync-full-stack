import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='dark:text-night-text'>

      <div className='text-center text-2xl pt-10 text-text-medium dark:text-night-text-muted'>
        <p>ABOUT <span className='text-text-dark font-bold dark:text-night-text'>US</span></p>
      </div>

      <div className='glass-panel p-8 rounded-3xl my-10 flex flex-col md:flex-row gap-12 dark:bg-night-surface/50 dark:border-night-border'>
        <img className='w-full md:max-w-[360px] rounded-xl shadow-card dark:opacity-80' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-text-medium dark:text-night-text-muted'>
          <p className='leading-relaxed'>Welcome to MediSync, your reliable partner for seamless and efficient healthcare management. At MediSync, we understand the challenges individuals face when scheduling medical appointments and maintaining accurate health records. Our platform is designed to simplify these processes, ensuring a smooth, organized, and accessible healthcare experience for every user.</p>
          <p className='leading-relaxed'>MediSync is dedicated to delivering excellence in healthcare technology. We continuously enhance our platform by integrating the latest innovations to improve user experience and provide superior service. Whether you’re booking your first appointment or managing ongoing care, MediSync is here to support you at every step of your healthcare journey..</p>
          <b className='text-text-dark text-lg dark:text-night-text'>Our Vision</b>
          <p className='leading-relaxed'>Our vision at MediSync is to create a seamless and connected healthcare experience for every user. We strive to bridge the gap between patients and healthcare providers, ensuring that you can access the care you need—precisely when you need it.</p>
        </div>
      </div>

      <div className='text-xl my-8'>
        <p className='text-text-medium dark:text-night-text-muted'>WHY <span className='text-text-dark font-bold dark:text-night-text'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20 gap-4'>
        <div className='glass-card px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-text-medium cursor-pointer rounded-xl hover:shadow-card-hover hover:scale-105 dark:bg-night-surface/50 dark:text-night-text-muted dark:border-night-border dark:hover:bg-primary dark:hover:text-white'>
          <b className='text-lg dark:text-night-text group-hover:text-white transition-colors'>EFFICIENCY</b>
          <p>A refined appointment scheduling experience that adapts to your demanding schedule.</p>
        </div>
        <div className='glass-card px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-text-medium cursor-pointer rounded-xl hover:shadow-card-hover hover:scale-105 dark:bg-night-surface/50 dark:text-night-text-muted dark:border-night-border dark:hover:bg-primary dark:hover:text-white'>
          <b className='text-lg dark:text-night-text group-hover:text-white transition-colors'>CONVENIENCE</b>
          <p>Connect with a reliable network of qualified healthcare professionals near you.</p>
        </div>
        <div className='glass-card px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-text-medium cursor-pointer rounded-xl hover:shadow-card-hover hover:scale-105 dark:bg-night-surface/50 dark:text-night-text-muted dark:border-night-border dark:hover:bg-primary dark:hover:text-white'>
          <b className='text-lg dark:text-night-text group-hover:text-white transition-colors'>PERSONALIZATION</b>
          <p>Personalized recommendations and timely reminders to keep you proactive about your health.</p>
        </div>
      </div>

    </div>
  )
}

export default About