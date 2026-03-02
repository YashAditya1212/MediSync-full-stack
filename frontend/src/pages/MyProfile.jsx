import React, { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'

const MyProfile = () => {

    const { userData, setUserData, token, backendUrl, loadUserProfile } = useContext(UserContext)
    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)
    const [loading, setLoading] = useState(false)

    const updateUserProfileData = async () => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('name', userData.name)
            formData.append('phone', userData.phone || '')
            formData.append('address', JSON.stringify(userData.address || { line1: '', line2: '' }))
            formData.append('gender', userData.gender || 'Not Selected')
            formData.append('dob', userData.dob || '')
            if (image) formData.append('image', image)

            const { data } = await axios.post(
                backendUrl + '/api/user/update-profile',
                formData,
                { headers: { token } }
            )

            if (data.success) {
                toast.success('Profile updated successfully!')
                await loadUserProfile()  // re-fetch fresh data from DB
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message || 'Update failed')
            }
        } catch (error) {
            console.error('Profile update error:', error)
            toast.error('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    // Show loading state while profile data is being fetched
    if (!userData) {
        return (
            <div className='flex items-center justify-center min-h-[60vh]'>
                <p className='text-text-medium text-lg'>Loading profile...</p>
            </div>
        )
    }

    return (
        <div className='glass-card p-8 rounded-3xl max-w-lg flex flex-col gap-4 text-sm'>

            {/* Profile Image */}
            <label htmlFor='image' className='cursor-pointer w-fit'>
                <img
                    className='w-36 h-36 rounded-full object-cover border-4 border-primary shadow-card'
                    src={image ? URL.createObjectURL(image) : (userData.image || assets.profile_pic)}
                    alt="Profile"
                />
                {isEdit && (
                    <p className='text-xs text-primary mt-1 text-center'>Click to change</p>
                )}
            </label>
            {isEdit && (
                <input
                    id='image'
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={(e) => setImage(e.target.files[0])}
                />
            )}

            {/* Name */}
            {isEdit ? (
                <input
                    className='glass-panel text-3xl font-bold max-w-60 mt-4 p-2 rounded-lg border border-primary/50 focus:outline-none focus:border-primary'
                    type="text"
                    onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                    value={userData.name}
                />
            ) : (
                <p className='font-bold text-3xl text-text-dark mt-4'>{userData.name}</p>
            )}

            <hr className='bg-white/40 h-[1px] border-none' />

            {/* Contact Info */}
            <div>
                <p className='text-text-medium font-bold text-lg mt-3'>CONTACT INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-3 mt-3 text-text-medium'>

                    <p className='font-semibold text-text-dark'>Email id:</p>
                    <p className='text-primary font-medium'>{userData.email}</p>

                    <p className='font-semibold text-text-dark'>Phone:</p>
                    {isEdit ? (
                        <input
                            className='glass-panel max-w-52 p-2 rounded-lg border border-white/40 focus:border-primary focus:outline-none'
                            type="text"
                            onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                            value={userData.phone || ''}
                        />
                    ) : (
                        <p className='text-primary font-medium'>{userData.phone || 'Not provided'}</p>
                    )}

                    <p className='font-semibold text-text-dark'>Address:</p>
                    {isEdit ? (
                        <p>
                            <input
                                className='glass-panel p-2 rounded-lg border border-white/40 focus:border-primary focus:outline-none w-full mb-2'
                                type="text"
                                placeholder='Address line 1'
                                onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                                value={userData.address?.line1 || ''}
                            />
                            <input
                                className='glass-panel p-2 rounded-lg border border-white/40 focus:border-primary focus:outline-none w-full'
                                type="text"
                                placeholder='Address line 2'
                                onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                                value={userData.address?.line2 || ''}
                            />
                        </p>
                    ) : (
                        <p className='text-text-medium'>
                            {userData.address?.line1 || 'Not provided'}
                            {userData.address?.line2 && <><br />{userData.address.line2}</>}
                        </p>
                    )}
                </div>
            </div>

            {/* Basic Info */}
            <div>
                <p className='text-text-medium font-bold text-lg mt-3'>BASIC INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-3 mt-3 text-text-medium'>

                    <p className='font-semibold text-text-dark'>Gender:</p>
                    {isEdit ? (
                        <select
                            className='max-w-28 glass-panel p-2 rounded-lg border border-white/40 focus:border-primary focus:outline-none'
                            onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                            value={userData.gender || 'Not Selected'}
                        >
                            <option value="Not Selected">Not Selected</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    ) : (
                        <p className='text-text-medium'>{userData.gender || 'Not provided'}</p>
                    )}

                    <p className='font-semibold text-text-dark'>Birthday:</p>
                    {isEdit ? (
                        <input
                            className='max-w-36 glass-panel p-2 rounded-lg border border-white/40 focus:border-primary focus:outline-none'
                            type='date'
                            onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                            value={userData.dob || ''}
                        />
                    ) : (
                        <p className='text-text-medium'>{userData.dob || 'Not provided'}</p>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className='mt-10'>
                {isEdit ? (
                    <div className='flex gap-3'>
                        <button
                            onClick={updateUserProfileData}
                            disabled={loading}
                            className='border-2 border-primary bg-primary text-white px-8 py-3 rounded-full hover:bg-primary-dark transition-all font-semibold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {loading ? 'Saving...' : 'Save information'}
                        </button>
                        <button
                            onClick={() => { setIsEdit(false); setImage(false); loadUserProfile(); }}
                            disabled={loading}
                            className='border-2 border-gray-400 text-gray-500 px-6 py-3 rounded-full hover:bg-gray-100 transition-all font-semibold'
                        >
                            Cancel
                        </button>
                    </div>
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