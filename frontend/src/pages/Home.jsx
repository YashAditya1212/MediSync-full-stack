import React from 'react'
import Header from '../components/Header'
import StatsBar from '../components/StatsBar'
import About from '../components/About'
import Services from '../components/Services'
import WhyChooseUs from '../components/WhyChooseUs'
import DoctorsSection from '../components/DoctorsSection'
import GallerySection from '../components/GallerySection'
import GodsEyeShowcase from '../components/GodsEyeShowcase'
import ContactSection from '../components/ContactSection'

const Home = () => {
  return (
    <div className="w-full">
      <Header />
      <StatsBar />
      <About />
      <Services />
      <WhyChooseUs />
      <DoctorsSection />
      <GallerySection />
      {/* GodsEyeSection is replaced by GodsEyeShowcase */}
      <GodsEyeShowcase />
      <ContactSection />
    </div>
  )
}

export default Home