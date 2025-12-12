import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Doctors = () => {

  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div>
      <p className='text-text-medium font-medium text-lg'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button 
          onClick={() => setShowFilter(!showFilter)} 
          className={`py-2 px-4 border rounded-lg text-sm transition-all sm:hidden font-semibold ${showFilter ? 'bg-primary text-white shadow-md' : 'border-gray-300 text-text-medium hover:bg-light-bg'}`}
        >
          {showFilter ? 'Hide Filters' : 'Show Filters'}
        </button>
        
        <div className={`flex-col gap-3 text-sm text-text-medium ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p 
            onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} 
            className={`w-[94vw] sm:w-auto pl-4 py-3 pr-16 border border-gray-300 rounded-lg transition-all cursor-pointer font-medium ${speciality === 'General physician' ? 'bg-primary text-white shadow-md' : 'hover:bg-light-bg hover:border-primary'}`}
          >
            General physician
          </p>
          <p 
            onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} 
            className={`w-[94vw] sm:w-auto pl-4 py-3 pr-16 border border-gray-300 rounded-lg transition-all cursor-pointer font-medium ${speciality === 'Gynecologist' ? 'bg-primary text-white shadow-md' : 'hover:bg-light-bg hover:border-primary'}`}
          >
            Gynecologist
          </p>
          <p 
            onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} 
            className={`w-[94vw] sm:w-auto pl-4 py-3 pr-16 border border-gray-300 rounded-lg transition-all cursor-pointer font-medium ${speciality === 'Dermatologist' ? 'bg-primary text-white shadow-md' : 'hover:bg-light-bg hover:border-primary'}`}
          >
            Dermatologist
          </p>
          <p 
            onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} 
            className={`w-[94vw] sm:w-auto pl-4 py-3 pr-16 border border-gray-300 rounded-lg transition-all cursor-pointer font-medium ${speciality === 'Pediatricians' ? 'bg-primary text-white shadow-md' : 'hover:bg-light-bg hover:border-primary'}`}
          >
            Pediatricians
          </p>
          <p 
            onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} 
            className={`w-[94vw] sm:w-auto pl-4 py-3 pr-16 border border-gray-300 rounded-lg transition-all cursor-pointer font-medium ${speciality === 'Neurologist' ? 'bg-primary text-white shadow-md' : 'hover:bg-light-bg hover:border-primary'}`}
          >
            Neurologist
          </p>
          <p 
            onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} 
            className={`w-[94vw] sm:w-auto pl-4 py-3 pr-16 border border-gray-300 rounded-lg transition-all cursor-pointer font-medium ${speciality === 'Gastroenterologist' ? 'bg-primary text-white shadow-md' : 'hover:bg-light-bg hover:border-primary'}`}
          >
            Gastroenterologist
          </p>
        </div>
        
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {filterDoc.map((item, index) => (
            <div 
              onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0) }} 
              className='border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 hover:shadow-card-hover bg-white' 
              key={index}
            >
              <img className='bg-light-bg' src={item.image} alt="" />
              <div className='p-4'>
                <div className='flex items-center gap-2 text-sm text-center text-success'>
                  <p className='w-2 h-2 bg-success rounded-full animate-pulse'></p>
                  <p className='font-medium'>Available</p>
                </div>
                <p className='text-text-dark text-lg font-semibold mt-2'>{item.name}</p>
                <p className='text-text-medium text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors