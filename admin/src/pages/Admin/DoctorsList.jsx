import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { Users } from 'lucide-react'

const DoctorsList = () => {
  const { doctors, changeAvailability, aToken, getAllDoctors } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) getAllDoctors()
  }, [aToken])

  return (
    <div className='max-w-6xl'>
      {/* Header */}
      <div className='mb-6'>
        <h1 className='text-xl font-bold text-ink-bright'>All Doctors</h1>
        <p className='text-sm text-ink-dim mt-1'>{doctors.length} registered doctors</p>
      </div>

      {/* Grid */}
      {doctors.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-20 gap-3'>
          <Users size={36} className='text-ink-dim' />
          <p className='text-ink-dim text-sm'>No doctors registered yet</p>
        </div>
      ) : (
        <div className='grid grid-cols-auto gap-4'>
          {doctors.map((doc, index) => (
            <div
              key={index}
              className='rounded-xl overflow-hidden border border-dark-border group transition-all duration-200 hover:border-primary-border hover:shadow-glow-teal'
              style={{ background: '#0e1525' }}
            >
              {/* Photo */}
              <div
                className='relative overflow-hidden'
                style={{ background: 'rgba(0,212,170,0.05)', aspectRatio: '1' }}
              >
                <img
                  src={doc.image}
                  alt={doc.name}
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                />
                {/* Availability dot */}
                <div className='absolute top-2.5 right-2.5'>
                  <div
                    className='w-2.5 h-2.5 rounded-full'
                    style={{
                      background: doc.available ? '#10b981' : '#475569',
                      boxShadow: doc.available ? '0 0 6px #10b981' : 'none'
                    }}
                  />
                </div>
              </div>

              {/* Info */}
              <div className='p-4'>
                <p className='text-sm font-semibold text-ink-bright truncate'>{doc.name}</p>
                <p className='text-xs text-ink-dim mt-0.5 truncate'>{doc.speciality}</p>

                <div className='flex items-center justify-between mt-3'>
                  <div className='flex items-center gap-2 text-xs text-ink-dim'>
                    <span
                      className='px-2 py-0.5 rounded font-medium'
                      style={{
                        background: doc.available ? 'rgba(16,185,129,0.1)' : 'rgba(71,85,105,0.2)',
                        color: doc.available ? '#10b981' : '#475569'
                      }}
                    >
                      {doc.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>

                  {/* Toggle switch */}
                  <button
                    onClick={() => changeAvailability(doc._id)}
                    className={`relative w-9 h-5 rounded-full transition-colors duration-200 focus:outline-none ${
                      doc.available ? 'bg-primary' : 'bg-dark-border'
                    }`}
                    style={{ background: doc.available ? '#00d4aa' : 'rgba(255,255,255,0.1)' }}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                        doc.available ? 'translate-x-4' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>

                {/* Fees */}
                <div
                  className='mt-3 pt-3 border-t border-dark-border flex items-center justify-between'
                >
                  <span className='text-xs text-ink-dim'>Consultation fee</span>
                  <span className='text-sm font-semibold text-primary font-mono'>₹{doc.fees}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DoctorsList