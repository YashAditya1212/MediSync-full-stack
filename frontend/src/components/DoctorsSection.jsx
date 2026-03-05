import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const DoctorCard = ({ _id, image, name, speciality, about, delay }) => {
  const navigate = useNavigate()
  return (
    <div 
      onClick={() => { navigate(`/appointment/${_id}`); window.scrollTo(0, 0) }}
      className="group bg-white p-8 rounded-[2rem] shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(168,213,186,0.4)] text-center border border-white/50 cursor-pointer"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="relative mb-6 mx-auto w-32 h-32 sm:w-40 sm:h-40">
        <div className="absolute inset-0 bg-[var(--mint)] rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
        <img 
          src={image} 
          alt={name} 
          className="relative w-full h-full object-cover rounded-full border-[3px] border-[var(--mint)] group-hover:border-[var(--mint-dark)] transition-colors duration-300"
        />
      </div>

      <h3 className="text-xl font-bold text-[var(--deep-dark)] mb-1 font-serif">
        {name}
      </h3>
      
      <p className="text-[var(--mint-dark)] font-semibold text-xs uppercase tracking-widest mb-3">
        {speciality}
      </p>
      
      <p className="text-[var(--text-muted)] text-sm mb-6 line-clamp-2 italic">
        "{about}"
      </p>
      
      <div className="inline-flex items-center gap-2 text-[var(--mint-dark)] text-sm font-bold uppercase tracking-widest transition-colors duration-300 group-hover:text-[var(--dark-green)]">
        View Profile
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </div>
    </div>
  )
}

const DoctorsSection = () => {
  const { doctors } = useContext(AppContext)

  return (
    <section id="doctors" className="py-24 bg-[var(--mint-light)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        
        {/* SECTION HEADING */}
        <div className="text-center mb-16 space-y-4" data-aos="fade-up">
          <span className="text-[var(--mint-dark)] font-bold tracking-[0.2em] uppercase text-xs">
            Our Network
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--deep-dark)] font-serif leading-tight">
            Find Your Perfect Doctor
          </h2>
          <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto">
            Browse doctors from every partnered hospital and clinic — filtered by specialty, location, and availability.
          </p>
          <div className="w-16 h-1 bg-[var(--mint)] mx-auto rounded-full" />
        </div>

        {/* DOCTORS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.slice(0, 4).map((doctor, index) => (
            <DoctorCard 
              key={index}
              {...doctor}
              delay={index * 100}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default DoctorsSection
