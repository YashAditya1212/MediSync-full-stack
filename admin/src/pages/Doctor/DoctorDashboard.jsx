import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { IndianRupee, CalendarDays, Users, X, CheckCheck, Clock } from 'lucide-react'

const StatCard = ({ icon: Icon, label, value, color, bgColor }) => (
  <div className='stat-card flex items-center gap-4'>
    <div className='w-12 h-12 rounded-xl flex items-center justify-center shrink-0' style={{ background: bgColor }}>
      <Icon size={22} style={{ color }} />
    </div>
    <div>
      <p className='text-2xl font-bold text-ink-bright font-mono'>{value}</p>
      <p className='text-xs text-ink-dim mt-0.5 uppercase tracking-wider'>{label}</p>
    </div>
  </div>
)

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) getDashData()
  }, [dToken])

  if (!dashData) return (
    <div className='flex items-center justify-center h-64'>
      <div className='w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin' />
    </div>
  )

  return (
    <div className='max-w-5xl'>
      <div className='mb-6'>
        <h1 className='text-xl font-bold text-ink-bright'>My Dashboard</h1>
        <p className='text-sm text-ink-dim mt-1'>Your appointments and earnings at a glance</p>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8'>
        <StatCard icon={IndianRupee} label='Total Earnings' value={`${currency}${dashData.earnings}`} color='#00d4aa' bgColor='rgba(0,212,170,0.1)' />
        <StatCard icon={CalendarDays} label='Appointments' value={dashData.appointments} color='#3b82f6' bgColor='rgba(59,130,246,0.1)' />
        <StatCard icon={Users} label='Patients' value={dashData.patients} color='#8b5cf6' bgColor='rgba(139,92,246,0.1)' />
      </div>

      {/* Recent bookings */}
      <div className='rounded-xl border border-dark-border overflow-hidden' style={{ background: '#0e1525' }}>
        <div className='flex items-center gap-2 px-5 py-4 border-b border-dark-border'>
          <Clock size={15} className='text-primary' />
          <span className='font-semibold text-ink-bright text-sm'>Latest Appointments</span>
        </div>

        {/* Column headers */}
        <div className='grid grid-cols-[2fr_2fr_1fr_100px] gap-4 px-5 py-2.5 border-b border-dark-border' style={{ background: 'rgba(255,255,255,0.02)' }}>
          {['Patient', 'Date & Time', 'Status', 'Actions'].map(h => (
            <p key={h} className='text-xs font-medium text-ink-dim uppercase tracking-wider'>{h}</p>
          ))}
        </div>

        {dashData.latestAppointments.slice(0, 5).map((item, index) => (
          <div key={index} className='grid grid-cols-[2fr_2fr_1fr_100px] gap-4 items-center px-5 py-3.5 border-b border-dark-border last:border-0 hover:bg-dark-hover transition-colors'>
            {/* Patient */}
            <div className='flex items-center gap-2.5'>
              <img src={item.userData.image} className='w-7 h-7 rounded-full object-cover shrink-0' style={{ border: '1px solid rgba(255,255,255,0.1)' }} alt='' />
              <span className='text-sm text-ink-bright truncate'>{item.userData.name}</span>
            </div>

            {/* Date */}
            <div>
              <p className='text-sm text-ink-mid'>{slotDateFormat(item.slotDate)}</p>
              <p className='text-xs text-ink-dim'>{item.slotTime}</p>
            </div>

            {/* Status */}
            {item.cancelled
              ? <span className='badge' style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>Cancelled</span>
              : item.isCompleted
                ? <span className='badge' style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>Completed</span>
                : <span className='badge' style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b' }}>Pending</span>
            }

            {/* Actions */}
            <div className='flex items-center gap-1'>
              {!item.cancelled && !item.isCompleted ? (
                <>
                  <button onClick={() => cancelAppointment(item._id)} className='p-1.5 rounded hover:bg-dark-elevated text-ink-dim hover:text-accent-red transition-colors' title='Cancel'>
                    <X size={14} />
                  </button>
                  <button onClick={() => completeAppointment(item._id)} className='p-1.5 rounded hover:bg-dark-elevated text-ink-dim hover:text-accent-green transition-colors' title='Mark Complete'>
                    <CheckCheck size={14} />
                  </button>
                </>
              ) : <span className='text-xs text-ink-dim px-1'>—</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorDashboard