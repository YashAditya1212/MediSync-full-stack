import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { Upload, UserPlus } from 'lucide-react'

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [loading, setLoading] = useState(false)

  const { backendUrl } = useContext(AppContext)
  const { aToken } = useContext(AdminContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (!docImg) return toast.error('Please select a doctor photo')
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })
      if (data.success) {
        toast.success('Doctor added successfully!')
        // Reset form
        setDocImg(false); setName(''); setEmail(''); setPassword('')
        setFees(''); setDegree(''); setAbout(''); setAddress1(''); setAddress2('')
        setExperience('1 Year'); setSpeciality('General physician')
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  const inputClass = 'w-full px-3 py-2.5 rounded-lg text-sm text-ink-bright border border-dark-border focus:border-primary-border focus:outline-none transition-colors'
  const inputStyle = { background: '#131d2e' }
  const labelClass = 'block text-xs font-medium text-ink-dim uppercase tracking-wider mb-1.5'
  const selectClass = inputClass

  return (
    <div className='max-w-4xl'>
      {/* Header */}
      <div className='mb-6'>
        <h1 className='text-xl font-bold text-ink-bright'>Add New Doctor</h1>
        <p className='text-sm text-ink-dim mt-1'>Register a new doctor to the platform</p>
      </div>

      <form onSubmit={onSubmitHandler}>
        <div
          className='rounded-xl border border-dark-border p-6 mb-4'
          style={{ background: '#0e1525' }}
        >
          {/* Photo upload */}
          <div className='flex items-center gap-5 pb-6 mb-6 border-b border-dark-border'>
            <label
              htmlFor='doc-img'
              className='relative cursor-pointer group'
            >
              <div
                className='w-20 h-20 rounded-xl overflow-hidden flex items-center justify-center transition-all'
                style={{
                  background: docImg ? 'transparent' : 'rgba(0,212,170,0.06)',
                  border: '2px dashed rgba(0,212,170,0.3)'
                }}
              >
                {docImg
                  ? <img src={URL.createObjectURL(docImg)} className='w-full h-full object-cover rounded-xl' alt='' />
                  : <Upload size={22} className='text-primary opacity-70' />
                }
                <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-xl flex items-center justify-center transition-opacity'>
                  <Upload size={18} className='text-white' />
                </div>
              </div>
              <input onChange={e => setDocImg(e.target.files[0])} type='file' id='doc-img' accept='image/*' hidden />
            </label>
            <div>
              <p className='text-sm font-medium text-ink-bright'>Doctor Photo</p>
              <p className='text-xs text-ink-dim mt-1'>Click to upload. JPG, PNG supported.</p>
            </div>
          </div>

          {/* Form fields */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
            {/* Left column */}
            <div className='flex flex-col gap-4'>
              <div>
                <label className={labelClass}>Full Name</label>
                <input onChange={e => setName(e.target.value)} value={name} className={inputClass} style={inputStyle} type='text' placeholder='Dr. John Smith' required />
              </div>
              <div>
                <label className={labelClass}>Email Address</label>
                <input onChange={e => setEmail(e.target.value)} value={email} className={inputClass} style={inputStyle} type='email' placeholder='doctor@medisync.com' required />
              </div>
              <div>
                <label className={labelClass}>Password</label>
                <input onChange={e => setPassword(e.target.value)} value={password} className={inputClass} style={inputStyle} type='password' placeholder='Min. 8 characters' required />
              </div>
              <div>
                <label className={labelClass}>Experience</label>
                <select onChange={e => setExperience(e.target.value)} value={experience} className={selectClass} style={inputStyle}>
                  {['1 Year','2 Year','3 Year','4 Year','5 Year','6 Year','7 Year','8 Year','9 Year','10 Year'].map(y => (
                    <option key={y} value={y}>{y}{y !== '1 Year' ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Consultation Fee (₹)</label>
                <input onChange={e => setFees(e.target.value)} value={fees} className={inputClass} style={inputStyle} type='number' placeholder='500' required />
              </div>
            </div>

            {/* Right column */}
            <div className='flex flex-col gap-4'>
              <div>
                <label className={labelClass}>Speciality</label>
                <select onChange={e => setSpeciality(e.target.value)} value={speciality} className={selectClass} style={inputStyle}>
                  {['General physician','Gynecologist','Dermatologist','Pediatricians','Neurologist','Gastroenterologist'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Degree / Qualification</label>
                <input onChange={e => setDegree(e.target.value)} value={degree} className={inputClass} style={inputStyle} type='text' placeholder='MBBS, MD' required />
              </div>
              <div>
                <label className={labelClass}>Clinic Address</label>
                <input onChange={e => setAddress1(e.target.value)} value={address1} className={inputClass} style={inputStyle} type='text' placeholder='Address line 1' required />
                <input onChange={e => setAddress2(e.target.value)} value={address2} className={inputClass + ' mt-2'} style={inputStyle} type='text' placeholder='Address line 2' required />
              </div>
            </div>
          </div>

          {/* About */}
          <div className='mt-5'>
            <label className={labelClass}>About / Bio</label>
            <textarea
              onChange={e => setAbout(e.target.value)}
              value={about}
              className={inputClass}
              style={{ ...inputStyle, resize: 'vertical' }}
              rows={4}
              placeholder="Brief description of the doctor's expertise and background..."
            />
          </div>
        </div>

        {/* Submit */}
        <div className='flex items-center gap-3'>
          <button
            type='submit'
            disabled={loading}
            className='btn-primary flex items-center gap-2'
          >
            {loading ? (
              <><div className='w-4 h-4 border-2 border-dark-base border-t-transparent rounded-full animate-spin' /> Adding...</>
            ) : (
              <><UserPlus size={15} /> Add Doctor</>
            )}
          </button>
          <p className='text-xs text-ink-dim'>All fields are required except address line 2</p>
        </div>
      </form>
    </div>
  )
}

export default AddDoctor