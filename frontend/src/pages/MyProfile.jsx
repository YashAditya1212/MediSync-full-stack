import React, { useState } from 'react'
import { assets } from '../assets/assets'

const MyProfile = () => {

    const [isEdit, setIsEdit] = useState(false)

    const [userData, setUserData] = useState({
        name: "Yash Aditya Mishra",
        image: assets.profile_pic,
        email: 'yashaditya1212@gmail.com',
        phone: '+91 123456789',
        address: {
            line1: '5th KM stone',
            line2: 'RKGIT, Ghaziabad',
        },
        gender: 'Male',
        dob: 'Downloaded'
    })

    return (
        <div className='max-w-lg flex flex-col gap-4 text-sm'>
            <img className='w-36 h-36 rounded-full object-cover border-4 border-primary shadow-card' src={userData.image} alt="" />

            {isEdit ? (
                <input 
                    className='bg-light-bg text-3xl font-bold max-w-60 mt-4 p-2 rounded-lg border-2 border-primary focus:outline-none' 
                    type="text" 
                    onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} 
                    value={userData.name} 
                />
            ) : (
                <p className='font-bold text-3xl text-text-dark mt-4'>{userData.name}</p>
            )}

            <hr className='bg-gray-300 h-[2px] border-none' />
            
            <div>
                <p className='text-text-medium font-bold text-lg mt-3'>CONTACT INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-3 mt-3 text-text-medium'>
                    <p className='font-semibold text-text-dark'>Email id:</p>
                    <p className='text-primary font-medium'>{userData.email}</p>
                    
                    <p className='font-semibold text-text-dark'>Phone:</p>
                    {isEdit ? (
                        <input 
                            className='bg-light-bg max-w-52 p-2 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none' 
                            type="text" 
                            onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} 
                            value={userData.phone} 
                        />
                    ) : (
                        <p className='text-primary font-medium'>{userData.phone}</p>
                    )}
                    
                    <p className='font-semibold text-text-dark'>Address:</p>
                    {isEdit ? (
                        <p>
                            <input 
                                className='bg-light-bg p-2 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none w-full mb-2' 
                                type="text" 
                                onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                                value={userData.address.line1} 
                            />
                            <input 
                                className='bg-light-bg p-2 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none w-full' 
                                type="text" 
                                onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                                value={userData.address.line2} 
                            />
                        </p>
                    ) : (
                        <p className='text-text-medium'>{userData.address.line1} <br /> {userData.address.line2}</p>
                    )}
                </div>
            </div>
            
            <div>
                <p className='text-text-medium font-bold text-lg mt-3'>BASIC INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-3 mt-3 text-text-medium'>
                    <p className='font-semibold text-text-dark'>Gender:</p>
                    {isEdit ? (
                        <select 
                            className='max-w-28 bg-light-bg p-2 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none' 
                            onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} 
                            value={userData.gender}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    ) : (
                        <p className='text-text-medium'>{userData.gender}</p>
                    )}
                    
                    <p className='font-semibold text-text-dark'>Birthday:</p>
                    {isEdit ? (
                        <input 
                            className='max-w-36 bg-light-bg p-2 rounded-lg border-2 border-gray-300 focus:border-primary focus:outline-none' 
                            type='date' 
                            onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} 
                            value={userData.dob} 
                        />
                    ) : (
                        <p className='text-text-medium'>{userData.dob}</p>
                    )}
                </div>
            </div>
            
            <div className='mt-10'>
                {isEdit ? (
                    <button 
                        onClick={() => setIsEdit(false)} 
                        className='border-2 border-primary bg-primary text-white px-8 py-3 rounded-full hover:bg-primary-dark transition-all font-semibold shadow-md hover:shadow-lg'
                    >
                        Save information
                    </button>
                ) : (
                    <button 
                        onClick={() => setIsEdit(true)} 
                        className='border-2 border-primary text-primary px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-all font-semibold shadow-md hover:shadow-lg'
                    >
                        Edit Profile
                    </button>
                )}
            </div>
        </div>
    )
}

export default MyProfile