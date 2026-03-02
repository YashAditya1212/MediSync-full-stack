import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { Users, CalendarDays, UserCheck, X, CheckCircle2, Clock } from 'lucide-react'

const StatCard = ({ icon: Icon, label, value, color, bgColor }) => (
  <div className='stat-card flex items-center gap-4'>
    <div
      className='w-12 h-12 rounded-xl flex items-center justify-center shrink-0'
      style={{ background: bgColor }}
    >
      <Icon size={22} style={{ color }} />
    </div>
    <div>
      <p className='text-2xl font-bold text-ink-bright font-mono'>{value}</p>
      <p className='text-xs text-ink-dim mt-0.5 uppercase tracking-wider'>{label}</p>
    </div>
  </div>
)

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

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) getDashData()
  }, [aToken])

  if (!dashData) return (
    <div className='flex items-center justify-center h-64'>
      <div className='w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin' />
    </div>
  )

  return (
    <div className='max-w-6xl'>
      {/* Header */}
      <div className='mb-6'>
        <h1 className='text-xl font-bold text-ink-bright'>Dashboard</h1>
        <p className='text-sm text-ink-dim mt-1'>Platform overview and recent activity</p>
      </div>

      {/* Stat cards */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8'>
        <StatCard
          icon={Users}
          label='Total Doctors'
          value={dashData.doctors}
          color='#3b82f6'
          bgColor='rgba(59,130,246,0.1)'
        />
        <StatCard
          icon={CalendarDays}
          label='Total Appointments'
          value={dashData.appointments}
          color='#00d4aa'
          bgColor='rgba(0,212,170,0.1)'
        />
        <StatCard
          icon={UserCheck}
          label='Total Patients'
          value={dashData.patients}
          color='#8b5cf6'
          bgColor='rgba(139,92,246,0.1)'
        />
      </div>

      {/* Recent Bookings */}
      <div
        className='rounded-xl border border-dark-border overflow-hidden'
        style={{ background: '#0e1525' }}
      >
        {/* Table header */}
        <div className='flex items-center justify-between px-5 py-4 border-b border-dark-border'>
          <div className='flex items-center gap-2'>
            <Clock size={15} className='text-primary' />
            <span className='font-semibold text-ink-bright text-sm'>Latest Bookings</span>
          </div>
          <span className='text-xs text-ink-dim'>Last 5 appointments</span>
        </div>

        {/* Column headers */}
        <div
          className='grid grid-cols-[2fr_2fr_2fr_1fr_80px] gap-4 px-5 py-2.5 border-b border-dark-border'
          style={{ background: 'rgba(255,255,255,0.02)' }}
        >
          {['Doctor', 'Patient', 'Date & Time', 'Status', 'Action'].map(h => (
            <p key={h} className='text-xs font-medium text-ink-dim uppercase tracking-wider'>{h}</p>
          ))}
        </div>

        {/* Rows */}
        {dashData.latestAppointments.slice(0, 5).map((item, index) => (
          <div
            key={index}
            className='grid grid-cols-[2fr_2fr_2fr_1fr_80px] gap-4 items-center px-5 py-3.5 border-b border-dark-border last:border-0 hover:bg-dark-hover transition-colors'
          >
            {/* Doctor */}
            <div className='flex items-center gap-2.5'>
              <img
                src={item.docData.image}
                className='w-7 h-7 rounded-full object-cover shrink-0'
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                alt=''
              />
              <span className='text-sm text-ink-bright truncate'>{item.docData.name}</span>
            </div>

            {/* Patient */}
            <div className='flex items-center gap-2.5'>
              <img
                src={item.userData.image}
                className='w-7 h-7 rounded-full object-cover shrink-0'
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                alt=''
              />
              <span className='text-sm text-ink-mid truncate'>{item.userData.name}</span>
            </div>

            {/* Date */}
            <div>
              <p className='text-sm text-ink-mid'>{slotDateFormat(item.slotDate)}</p>
              <p className='text-xs text-ink-dim'>{item.slotTime}</p>
            </div>

            {/* Status */}
            <StatusBadge item={item} />

            {/* Action */}
            <div>
              {!item.cancelled && !item.isCompleted ? (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className='flex items-center gap-1 text-xs text-ink-dim hover:text-accent-red transition-colors'
                >
                  <X size={13} />
                  Cancel
                </button>
              ) : (
                <span className='text-xs text-ink-dim'>—</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard