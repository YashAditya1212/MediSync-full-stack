import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import Join from './pages/Join'
import About from './pages/About'
import Contact from './pages/Contact'
import Appointment from './pages/Appointment'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import GodsEye from './pages/GodsEye'
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Footer from './components/Footer'
import { AdminProtectedRoute, DoctorProtectedRoute, UserProtectedRoute } from './components/ProtectedRoute'
import AdminNavbar from './components/admin/Navbar'

import AddDoctor from './pages/admin/AddDoctor'
import AllAppointments from './pages/admin/AllAppointments'
import Dashboard from './pages/admin/Dashboard'
import DoctorAppointments from './pages/admin/DoctorAppointments'
import DoctorDashboard from './pages/admin/DoctorDashboard'
import DoctorProfile from './pages/admin/DoctorProfile'
import DoctorsList from './pages/admin/DoctorsList'

import AOS from 'aos'
import 'aos/dist/aos.css'

const App = () => {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'
  const isJoinPage = location.pathname === '/join'
  const isAdminRoute = location.pathname.startsWith('/admin')
  const needsPadding = !isLoginPage && !isJoinPage && !isAdminRoute && location.pathname !== '/' && location.pathname !== '/gods-eye';

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    })
  }, [])

  return (
    <div className='relative'>
      {!isLoginPage && !isJoinPage && !isAdminRoute && <Navbar />}
      {isAdminRoute && <AdminNavbar />}
      <div className={`relative z-10 ${isAdminRoute ? 'pt-20' : needsPadding ? 'max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-32' : ''}`}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:speciality' element={<Doctors />} />
          <Route path='/login' element={<Login />} />
          <Route path='/join' element={<Join />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/appointment/:docId' element={<UserProtectedRoute><Appointment /></UserProtectedRoute>} />
          <Route path='/my-appointments' element={<UserProtectedRoute><MyAppointments /></UserProtectedRoute>} />
          <Route path='/my-profile' element={<UserProtectedRoute><MyProfile /></UserProtectedRoute>} />
          <Route path='/gods-eye' element={<GodsEye />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/terms-of-service' element={<TermsOfService />} />

          {/* Admin Routes */}
          <Route path='/admin/dashboard' element={<AdminProtectedRoute><Dashboard /></AdminProtectedRoute>} />
          <Route path='/admin/appointments' element={<AdminProtectedRoute><AllAppointments /></AdminProtectedRoute>} />
          <Route path='/admin/add-doctor' element={<AdminProtectedRoute><AddDoctor /></AdminProtectedRoute>} />
          <Route path='/admin/doctors-list' element={<AdminProtectedRoute><DoctorsList /></AdminProtectedRoute>} />
          
          {/* Doctor Routes */}
          <Route path='/admin/doctor-dashboard' element={<DoctorProtectedRoute><DoctorDashboard /></DoctorProtectedRoute>} />
          <Route path='/admin/doctor-appointments' element={<DoctorProtectedRoute><DoctorAppointments /></DoctorProtectedRoute>} />
          <Route path='/admin/doctor-profile' element={<DoctorProtectedRoute><DoctorProfile /></DoctorProtectedRoute>} />
        </Routes>
      </div>
      {!isLoginPage && !isJoinPage && !isAdminRoute && <Footer />}

      {/* Floating global action buttons */}
      {!isLoginPage && !isJoinPage && !isAdminRoute && (
        <>
          <button
            type="button"
            data-aos="fade-right"
            className="fixed left-4 bottom-6 md:left-8 md:bottom-8 z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-[var(--mint)] text-white shadow-lg shadow-[rgba(0,0,0,0.18)] hover:shadow-[0_0_26px_rgba(168,213,186,0.9)] hover:-translate-y-1 transition-all duration-300"
            onClick={() => {
              const el = document.getElementById('contact')
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' })
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
            aria-label="Call hospital"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path
                d="M6.62 10.79a15.053 15.053 0 006.59 6.59l1.98-1.98a1 1 0 011.01-.24 11.72 11.72 0 003.68.59 1 1 0 011 1v3.25a1 1 0 01-.91 1A17.94 17.94 0 012 4.91 1 1 0 013 4h3.25a1 1 0 011 1 11.72 11.72 0 00.59 3.68 1 1 0 01-.24 1.01l-1.98 1.98z"
                fill="currentColor"
              />
            </svg>
          </button>

          <button
            type="button"
            data-aos="fade-left"
            className="fixed right-4 bottom-6 md:right-8 md:bottom-8 z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-[var(--gold)] text-white shadow-lg shadow-[rgba(0,0,0,0.2)] hover:shadow-[0_0_28px_rgba(201,168,76,0.9)] hover:-translate-y-1 transition-all duration-300"
            onClick={() => {
              const el = document.getElementById('contact')
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' })
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
            aria-label="Chat with us"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path
                d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
                fill="currentColor"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  )
}

export default App