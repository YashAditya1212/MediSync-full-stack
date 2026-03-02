import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { X, CheckCheck, CalendarDays, Search } from 'lucide-react'

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (dToken) getAppointments()
  }, [dToken])

  const filtered = appointments.filter(a =>
    a.userData?.name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='max-w-6xl'>
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='text-xl font-bold text-ink-bright'>My Appointments</h1>
          <p className='text-sm text-ink-dim mt-1'>{appointments.length} total</p>
        </div>
        <div
          className='flex items-center gap-2 px-3 py-2 rounded-lg'
          style={{ background: '#0e1525', border: '1px solid rgba(255,255,255,0.07)', width: '200px' }}
        >
          <Search size={14} className='text-ink-dim shrink-0' />
          <input
            type='text'
            placeholder='Search patient...'
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ background: 'transparent', border: 'none', outline: 'none' }}
            className='text-sm text-ink-bright placeholder:text-ink-dim w-full bg-transparent'
          />
        </div>
      </div>

      {/* Table */}
      <div className='rounded-xl border border-dark-border overflow-hidden' style={{ background: '#0e1525' }}>
        {/* Header row */}
        <div
          className='hidden sm:grid grid-cols-[0.4fr_2fr_1fr_0.8fr_2.2fr_1fr_1fr_1fr] gap-3 px-5 py-3 border-b border-dark-border'
          style={{ background: 'rgba(255,255,255,0.02)' }}
        >
          {['#', 'Patient', 'Payment', 'Age', 'Date & Time', 'Fees', 'Status', 'Actions'].map(h => (
            <p key={h} className='text-xs font-medium text-ink-dim uppercase tracking-wider'>{h}</p>
          ))}
        </div>

        <div className='max-h-[70vh] overflow-y-auto'>
          {filtered.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-16 gap-3'>
              <CalendarDays size={32} className='text-ink-dim' />
              <p className='text-ink-dim text-sm'>No appointments found</p>
            </div>
          ) : (
            filtered.map((item, index) => (
              <div
                key={index}
                className='hidden sm:grid grid-cols-[0.4fr_2fr_1fr_0.8fr_2.2fr_1fr_1fr_1fr] gap-3 items-center px-5 py-3.5 border-b border-dark-border last:border-0 hover:bg-dark-hover transition-colors'
              >
                {/* # */}
                <p className='text-xs text-ink-dim font-mono'>{index + 1}</p>

                {/* Patient */}
                <div className='flex items-center gap-2.5 min-w-0'>
                  <img src={item.userData.image} className='w-7 h-7 rounded-full object-cover shrink-0' style={{ border: '1px solid rgba(255,255,255,0.1)' }} alt='' />
                  <span className='text-sm text-ink-bright truncate'>{item.userData.name}</span>
                </div>

                {/* Payment method */}
                <span
                  className='badge w-fit'
                  style={{
                    background: item.payment ? 'rgba(0,212,170,0.1)' : 'rgba(255,255,255,0.06)',
                    color: item.payment ? '#00d4aa' : '#94a3b8'
                  }}
                >
                  {item.payment ? 'Online' : 'Cash'}
                </span>

                {/* Age */}
                <p className='text-sm text-ink-mid'>{calculateAge(item.userData.dob)}y</p>

                {/* Date */}
                <div>
                  <p className='text-sm text-ink-mid'>{slotDateFormat(item.slotDate)}</p>
                  <p className='text-xs text-ink-dim'>{item.slotTime}</p>
                </div>

                {/* Fees */}
                <p className='text-sm text-ink-bright font-mono'>{currency}{item.amount}</p>

                {/* Status */}
                {item.cancelled
                  ? <span className='badge w-fit' style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>Cancelled</span>
                  : item.isCompleted
                    ? <span className='badge w-fit' style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>Completed</span>
                    : <span className='badge w-fit' style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b' }}>Pending</span>
                }

                {/* Actions */}
                <div className='flex items-center gap-1'>
                  {!item.cancelled && !item.isCompleted ? (
                    <>
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className='p-1.5 rounded hover:bg-dark-elevated text-ink-dim hover:text-accent-red transition-colors'
                        title='Cancel appointment'
                      >
                        <X size={14} />
                      </button>
                      <button
                        onClick={() => completeAppointment(item._id)}
                        className='p-1.5 rounded hover:bg-dark-elevated text-ink-dim hover:text-accent-green transition-colors'
                        title='Mark as completed'
                      >
                        <CheckCheck size={14} />
                      </button>
                    </>
                  ) : <span className='text-xs text-ink-dim px-1'>—</span>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorAppointments