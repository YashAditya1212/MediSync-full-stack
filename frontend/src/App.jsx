import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Appointment from './pages/Appointment'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import GodsEye from './pages/GodsEye'
import Footer from './components/Footer'
import StarryBackground from './components/StarryBackground'
import CustomCursor from './components/UI/CustomCursor'
import SmoothScroll from './components/UI/SmoothScroll'

const App = () => {
  
  return (
    <SmoothScroll>
      <div className='relative mx-4 sm:mx-[10%]'>
        <CustomCursor />
        <StarryBackground />
        
        {/* Main content */}
        <div className='relative z-10'>
          <Navbar />
          
          <div className='relative min-h-[calc(100vh-200px)] mt-24'>
            
            {/* Page content */}
            <div className='relative z-10'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/doctors' element={<Doctors />} />
                <Route path='/doctors/:speciality' element={<Doctors />} />
                <Route path='/login' element={<Login />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/appointment/:docId' element={<Appointment />} />
                <Route path='/my-appointments' element={<MyAppointments />} />
                <Route path='/my-profile' element={<MyProfile />} />
                <Route path='/gods-eye' element={<GodsEye />} />
              </Routes>
            </div>
          </div>
          
          <Footer />
        </div>
      </div>
    </SmoothScroll>
  )
}

export default App