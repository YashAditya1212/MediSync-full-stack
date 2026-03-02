import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Edit2, Save, X, MapPin, DollarSign, BookOpen } from 'lucide-react'

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
  const { currency, backendUrl } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  const updateProfile = async () => {
    setLoading(true)
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        about: profileData.about,
        available: profileData.available
      }
      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })
      if (data.success) {
        toast.success('Profile updated!')
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  const cancelEdit = () => {
    setIsEdit(false)
    getProfileData() // reset to saved state
  }

  useEffect(() => {
    if (dToken) getProfileData()
  }, [dToken])

  if (!profileData) return (
    <div className='flex items-center justify-center h-64'>
      <div className='w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin' />
    </div>
  )

  const inputClass = 'bg-dark-elevated border border-dark-border rounded-lg px-3 py-2 text-sm text-ink-bright focus:border-primary-border focus:outline-none w-full transition-colors'

  return (
    <div className='max-w-3xl'>
      <div className='mb-6'>
        <h1 className='text-xl font-bold text-ink-bright'>My Profile</h1>
        <p className='text-sm text-ink-dim mt-1'>Manage your public profile and settings</p>
      </div>

      <div className='rounded-xl border border-dark-border overflow-hidden' style={{ background: '#0e1525' }}>

        {/* Top banner + photo */}
        <div
          className='h-24 relative'
          style={{ background: 'linear-gradient(135deg, rgba(0,212,170,0.08) 0%, rgba(59,130,246,0.06) 100%)' }}
        >
          <div className='absolute -bottom-10 left-6'>
            <div
              className='w-20 h-20 rounded-xl overflow-hidden'
              style={{ border: '3px solid #0e1525', background: 'rgba(0,212,170,0.1)' }}
            >
              <img src={profileData.image} className='w-full h-full object-cover' alt='' />
            </div>
          </div>

          {/* Edit / Save buttons */}
          <div className='absolute top-4 right-4 flex items-center gap-2'>
            {isEdit ? (
              <>
                <button onClick={cancelEdit} className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-ink-mid border border-dark-border hover:bg-dark-elevated transition-all'>
                  <X size={13} /> Cancel
                </button>
                <button onClick={updateProfile} disabled={loading} className='btn-primary flex items-center gap-1.5 text-xs'>
                  {loading
                    ? <div className='w-3 h-3 border-2 border-dark-base border-t-transparent rounded-full animate-spin' />
                    : <Save size={13} />
                  }
                  Save Changes
                </button>
              </>
            ) : (
              <button onClick={() => setIsEdit(true)} className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-ink-mid border border-dark-border hover:bg-dark-elevated transition-all'>
                <Edit2 size={13} /> Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Main content */}
        <div className='pt-14 px-6 pb-6'>
          {/* Name + speciality */}
          <div className='mb-6'>
            <h2 className='text-xl font-bold text-ink-bright'>{profileData.name}</h2>
            <div className='flex items-center gap-2 mt-1'>
              <span className='text-sm text-ink-mid'>{profileData.degree}</span>
              <span className='text-ink-dim'>·</span>
              <span
                className='text-xs px-2 py-0.5 rounded-full font-medium'
                style={{ background: 'rgba(0,212,170,0.1)', color: '#00d4aa' }}
              >
                {profileData.speciality}
              </span>
              <span
                className='text-xs px-2 py-0.5 rounded-full'
                style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8' }}
              >
                {profileData.experience}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className='h-px bg-dark-border mb-6' />

          {/* Availability toggle */}
          <div className='flex items-center justify-between mb-6 p-4 rounded-lg' style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div>
              <p className='text-sm font-medium text-ink-bright'>Available for Appointments</p>
              <p className='text-xs text-ink-dim mt-0.5'>Toggle to control your booking availability</p>
            </div>
            <button
              onClick={() => isEdit && setProfileData(p => ({ ...p, available: !p.available }))}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${isEdit ? 'cursor-pointer' : 'cursor-default opacity-70'}`}
              style={{ background: profileData.available ? '#00d4aa' : 'rgba(255,255,255,0.1)' }}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${profileData.available ? 'translate-x-5' : 'translate-x-1'}`} />
            </button>
          </div>

          {/* Fields */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
            {/* Consultation Fee */}
            <div>
              <div className='flex items-center gap-1.5 mb-2'>
                <DollarSign size={13} className='text-ink-dim' />
                <span className='text-xs font-medium text-ink-dim uppercase tracking-wider'>Consultation Fee</span>
              </div>
              {isEdit ? (
                <input
                  type='number'
                  value={profileData.fees}
                  onChange={e => setProfileData(p => ({ ...p, fees: e.target.value }))}
                  className={inputClass}
                  style={{ background: '#131d2e' }}
                />
              ) : (
                <p className='text-sm text-ink-bright font-mono font-semibold'>{currency}{profileData.fees}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <div className='flex items-center gap-1.5 mb-2'>
                <MapPin size={13} className='text-ink-dim' />
                <span className='text-xs font-medium text-ink-dim uppercase tracking-wider'>Clinic Address</span>
              </div>
              {isEdit ? (
                <div className='flex flex-col gap-2'>
                  <input type='text' value={profileData.address.line1} onChange={e => setProfileData(p => ({ ...p, address: { ...p.address, line1: e.target.value } }))} className={inputClass} style={{ background: '#131d2e' }} placeholder='Line 1' />
                  <input type='text' value={profileData.address.line2} onChange={e => setProfileData(p => ({ ...p, address: { ...p.address, line2: e.target.value } }))} className={inputClass} style={{ background: '#131d2e' }} placeholder='Line 2' />
                </div>
              ) : (
                <div>
                  <p className='text-sm text-ink-mid'>{profileData.address.line1}</p>
                  <p className='text-sm text-ink-dim'>{profileData.address.line2}</p>
                </div>
              )}
            </div>
          </div>

          {/* About */}
          <div className='mt-5'>
            <div className='flex items-center gap-1.5 mb-2'>
              <BookOpen size={13} className='text-ink-dim' />
              <span className='text-xs font-medium text-ink-dim uppercase tracking-wider'>About</span>
            </div>
            {isEdit ? (
              <textarea
                value={profileData.about}
                onChange={e => setProfileData(p => ({ ...p, about: e.target.value }))}
                className={inputClass}
                style={{ background: '#131d2e', resize: 'vertical' }}
                rows={5}
              />
            ) : (
              <p className='text-sm text-ink-mid leading-relaxed'>{profileData.about}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile