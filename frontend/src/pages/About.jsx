import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-text-medium'>
        <p>ABOUT <span className='text-text-dark font-bold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px] rounded-xl shadow-card' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-text-medium'>
          <p className='leading-relaxed'>Welcome to MediSync, your reliable partner for seamless and efficient healthcare management. At MediSync, we understand the challenges individuals face when scheduling medical appointments and maintaining accurate health records. Our platform is designed to simplify these processes, ensuring a smooth, organized, and accessible healthcare experience for every user.</p>
          <p className='leading-relaxed'>MediSync is dedicated to delivering excellence in healthcare technology. We continuously enhance our platform by integrating the latest innovations to improve user experience and provide superior service. Whether you’re booking your first appointment or managing ongoing care, MediSync is here to support you at every step of your healthcare journey..</p>
          <b className='text-text-dark text-lg'>Our Vision</b>
          <p className='leading-relaxed'>Our vision at MediSync is to create a seamless and connected healthcare experience for every user. We strive to bridge the gap between patients and healthcare providers, ensuring that you can access the care you need—precisely when you need it.</p>
        </div>
      </div>

      <div className='text-xl my-8'>
        <p className='text-text-medium'>WHY <span className='text-text-dark font-bold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20 gap-4'>
        <div className='border-2 border-gray-200 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-text-medium cursor-pointer rounded-xl hover:shadow-card-hover hover:scale-105'>
          <b className='text-lg'>EFFICIENCY</b>
          <p>A refined appointment scheduling experience that adapts to your demanding schedule.</p>
        </div>
        <div className='border-2 border-gray-200 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-text-medium cursor-pointer rounded-xl hover:shadow-card-hover hover:scale-105'>
          <b className='text-lg'>CONVENIENCE</b>
          <p>Connect with a reliable network of qualified healthcare professionals near you.</p>
        </div>
        <div className='border-2 border-gray-200 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-text-medium cursor-pointer rounded-xl hover:shadow-card-hover hover:scale-105'>
          <b className='text-lg'>PERSONALIZATION</b>
          <p>Personalized recommendations and timely reminders to keep you proactive about your health.</p>
        </div>
      </div>

    </div>
  )
}

export default About