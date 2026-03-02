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
        <div className='glass-card p-8 rounded-3xl max-w-lg flex flex-col gap-4 text-sm dark:bg-night-surface/50 dark:border-night-border'>

            {/* Profile Image */}
            <label htmlFor='image' className='cursor-pointer w-fit relative group'>
                <img
                    className='w-36 h-36 rounded-full object-cover border-4 border-primary shadow-card dark:border-accent'
                    src={image ? URL.createObjectURL(image) : (userData.image || assets.profile_pic)}
                    alt="Profile"
                />
                {isEdit && (
                    <div className='absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'>
                        <p className='text-xs text-white font-bold'>CHANGE</p>
                    </div>
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
                    className='glass-panel text-3xl font-bold max-w-60 mt-4 p-2 rounded-lg border border-primary/50 focus:outline-none focus:border-primary dark:bg-night-surface dark:text-night-text dark:border-night-border'
                    type="text"
                    onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                    value={userData.name}
                />
            ) : (
                <p className='font-bold text-3xl text-text-dark mt-4 dark:text-night-text'>{userData.name}</p>
            )}

            <hr className='bg-white/40 h-[1px] border-none dark:bg-night-border' />

            {/* Contact Info */}
            <div>
                <p className='text-text-medium font-bold text-lg mt-3 dark:text-night-text'>CONTACT INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-3 mt-3 text-text-medium dark:text-night-text-muted'>

                    <p className='font-semibold text-text-dark dark:text-night-text'>Email id:</p>
                    <p className='text-primary font-medium dark:text-accent'>{userData.email}</p>

                    <p className='font-semibold text-text-dark dark:text-night-text'>Phone:</p>
                    {isEdit ? (
                        <input
                            className='glass-panel max-w-52 p-2 rounded-lg border border-white/40 focus:border-primary focus:outline-none dark:bg-night-surface dark:text-night-text dark:border-night-border'
                            type="text"
                            onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                            value={userData.phone || ''}
                        />
                    ) : (
                        <p className='text-primary font-medium dark:text-accent'>{userData.phone || 'Not provided'}</p>
                    )}

                    <p className='font-semibold text-text-dark dark:text-night-text'>Address:</p>
                    {isEdit ? (
                        <div className='flex flex-col gap-2'>
                            <input
                                className='glass-panel p-2 rounded-lg border border-white/40 focus:border-primary focus:outline-none w-full dark:bg-night-surface dark:text-night-text dark:border-night-border'
                                type="text"
                                placeholder='Address line 1'
                                onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                                value={userData.address?.line1 || ''}
                            />
                            <input
                                className='glass-panel p-2 rounded-lg border border-white/40 focus:border-primary focus:outline-none w-full dark:bg-night-surface dark:text-night-text dark:border-night-border'
                                type="text"
                                placeholder='Address line 2'
                                onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                                value={userData.address?.line2 || ''}
                            />
                        </div>
                    ) : (
                        <p className='text-text-medium dark:text-night-text-muted'>
                            {userData.address?.line1 || 'Not provided'}
                            {userData.address?.line2 && <><br />{userData.address.line2}</>}
                        </p>
                    )}
                </div>
            </div>

            {/* Basic Info */}
            <div>
                <p className='text-text-medium font-bold text-lg mt-3 dark:text-night-text'>BASIC INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-3 mt-3 text-text-medium dark:text-night-text-muted'>

                    <p className='font-semibold text-text-dark dark:text-night-text'>Gender:</p>
                    {isEdit ? (
                        <select
                            className='max-w-28 glass-panel p-2 rounded-lg border border-white/40 focus:border-primary focus:outline-none dark:bg-night-surface dark:text-night-text dark:border-night-border'
                            onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                            value={userData.gender || 'Not Selected'}
                        >
                            <option value="Not Selected">Not Selected</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    ) : (
                        <p className='text-text-medium dark:text-night-text-muted'>{userData.gender || 'Not provided'}</p>
                    )}

                    <p className='font-semibold text-text-dark dark:text-night-text'>Birthday:</p>
                    {isEdit ? (
                        <input
                            className='max-w-36 glass-panel p-2 rounded-lg border border-white/40 focus:border-primary focus:outline-none dark:bg-night-surface dark:text-night-text dark:border-night-border'
                            type='date'
                            onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                            value={userData.dob || ''}
                        />
                    ) : (
                        <p className='text-text-medium dark:text-night-text-muted'>{userData.dob || 'Not provided'}</p>
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
                            className='border-2 border-gray-400 text-gray-500 px-6 py-3 rounded-full hover:bg-gray-100 transition-all font-semibold dark:border-night-border dark:text-night-text dark:hover:bg-night-surface'
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsEdit(true)}
                        className='border-2 border-primary text-primary px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-all font-semibold shadow-md hover:shadow-lg dark:border-accent dark:text-accent dark:hover:bg-accent dark:hover:text-dark-bg'
                    >
                        Edit Profile
                    </button>
                )}
            </div>
        </div>
    )
}

export default MyProfile