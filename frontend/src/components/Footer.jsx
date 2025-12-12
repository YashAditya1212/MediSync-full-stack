import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="" />
          <p className='w-full md:w-2/3 text-text-medium leading-6'>
            A smarter way to access quality healthcare—instantly connecting you with trusted medical specialists when it matters most.
          </p>
        </div>

        <div>
          <p className='text-xl font-semibold mb-5 text-text-dark'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-text-medium'>
            <li className='hover:text-primary cursor-pointer transition-colors'>Home</li>
            <li className='hover:text-primary cursor-pointer transition-colors'>About us</li>
            <li className='hover:text-primary cursor-pointer transition-colors'>Delivery</li>
            <li className='hover:text-primary cursor-pointer transition-colors'>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-semibold mb-5 text-text-dark'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-text-medium'>
            <li className='hover:text-primary cursor-pointer transition-colors'>+1 (212) 456-7890</li>
            <li className='hover:text-primary cursor-pointer transition-colors'>contact@MediSync.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr className='border-gray-300' />
        <p className='py-5 text-sm text-center text-text-medium'>Copyright 2024 @ MediSync.com - All Rights Reserved.</p>
      </div>

    </div>
  )
}

export default Footer