import React, { useEffect, useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { X, CalendarDays, Search } from 'lucide-react'
import { useState } from 'react'

const StatusBadge = ({ item }) => {
  if (item.cancelled) return (
    <span className='badge' style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>Cancelled</span>
  )
  if (item.isCompleted) return (
    <span className='badge' style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>Completed</span>
  )
  return (
    <span className='badge' style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b' }}>Pending</span>
  )
}

const AllAppointments = () => {
  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (aToken) getAllAppointments()
  }, [aToken])

  const filtered = appointments.filter(a =>
    a.userData?.name?.toLowerCase().includes(search.toLowerCase()) ||
    a.docData?.name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='max-w-6xl'>
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='text-xl font-bold text-ink-bright'>All Appointments</h1>
          <p className='text-sm text-ink-dim mt-1'>{appointments.length} total records</p>
        </div>
        {/* Search */}
        <div
          className='flex items-center gap-2 px-3 py-2 rounded-lg'
          style={{ background: '#0e1525', border: '1px solid rgba(255,255,255,0.07)', width: '220px' }}
        >
          <Search size={14} className='text-ink-dim shrink-0' />
          <input
            type='text'
            placeholder='Search patient or doctor...'
            value={search}
            onChange={e => setSearch(e.target.value)}
            className='bg-transparent border-none text-sm text-ink-bright placeholder:text-ink-dim outline-none w-full'
            style={{ background: 'transparent !important', border: 'none !important' }}
          />
        </div>
      </div>

      {/* Table */}
      <div
        className='rounded-xl border border-dark-border overflow-hidden'
        style={{ background: '#0e1525' }}
      >
        {/* Column headers */}
        <div
          className='hidden sm:grid grid-cols-[0.4fr_2fr_1.2fr_2.2fr_2fr_1fr_1fr_80px] gap-3 px-5 py-3 border-b border-dark-border'
          style={{ background: 'rgba(255,255,255,0.02)' }}
        >
          {['#', 'Patient', 'Age', 'Date & Time', 'Doctor', 'Fees', 'Status', 'Action'].map(h => (
            <p key={h} className='text-xs font-medium text-ink-dim uppercase tracking-wider'>{h}</p>
          ))}
        </div>

        {/* Rows */}
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
                className='hidden sm:grid grid-cols-[0.4fr_2fr_1.2fr_2.2fr_2fr_1fr_1fr_80px] gap-3 items-center px-5 py-3.5 border-b border-dark-border last:border-0 hover:bg-dark-hover transition-colors'
              >
                {/* # */}
                <p className='text-xs text-ink-dim font-mono'>{index + 1}</p>

                {/* Patient */}
                <div className='flex items-center gap-2.5 min-w-0'>
                  <img
                    src={item.userData.image}
                    className='w-7 h-7 rounded-full object-cover shrink-0'
                    style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                    alt=''
                  />
                  <span className='text-sm text-ink-bright truncate'>{item.userData.name}</span>
                </div>

                {/* Age */}
                <p className='text-sm text-ink-mid'>{calculateAge(item.userData.dob)} yrs</p>

                {/* Date */}
                <div>
                  <p className='text-sm text-ink-mid'>{slotDateFormat(item.slotDate)}</p>
                  <p className='text-xs text-ink-dim'>{item.slotTime}</p>
                </div>

                {/* Doctor */}
                <div className='flex items-center gap-2.5 min-w-0'>
                  <img
                    src={item.docData.image}
                    className='w-7 h-7 rounded-full object-cover shrink-0'
                    style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                    alt=''
                  />
                  <span className='text-sm text-ink-mid truncate'>{item.docData.name}</span>
                </div>

                {/* Fees */}
                <p className='text-sm text-ink-bright font-mono'>{currency}{item.amount}</p>

                {/* Status */}
                <StatusBadge item={item} />

                {/* Action */}
                <div>
                  {!item.cancelled && !item.isCompleted ? (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className='flex items-center gap-1 text-xs text-ink-dim hover:text-accent-red transition-colors px-2 py-1 rounded hover:bg-dark-elevated'
                    >
                      <X size={12} /> Cancel
                    </button>
                  ) : (
                    <span className='text-xs text-ink-dim px-2'>—</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default AllAppointments