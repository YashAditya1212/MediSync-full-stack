import React from 'react'
import { assets } from '../assets/assets'
import { Cpu, Users, Clock, CreditCard } from 'lucide-react'

const FeatureBlock = ({ icon: Icon, title, description, delay }) => (
  <div 
    className="flex items-start gap-5 p-4 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-sm"
    data-aos="fade-up"
    data-aos-delay={delay}
  >
    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-[var(--mint)] rounded-lg text-white shadow-sm">
      <Icon size={24} strokeWidth={2} />
    </div>
    <div className="space-y-1">
      <h3 className="text-lg font-bold text-[var(--deep-dark)] font-sans">
        {title}
      </h3>
      <p className="text-[var(--text-muted)] text-sm leading-relaxed">
        {description}
      </p>
    </div>
  </div>
)

const WhyChooseUs = () => {
  const features = [
    {
      icon: Cpu,
      title: "Advanced Technology",
      description: "Equipped with the latest diagnostic and surgical technology for precision care."
    },
    {
      icon: Users,
      title: "Expert Medical Team",
      description: "Over 500 board-certified specialists across 15 departments."
    },
    {
      icon: Clock,
      title: "24/7 Patient Support",
      description: "Round-the-clock assistance for patients and their families, always."
    },
    {
      icon: CreditCard,
      title: "Affordable Care Plans",
      description: "Transparent pricing and flexible payment options for every patient."
    }
  ]

  return (
    <section id="why-us" className="py-24 bg-[var(--cream)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-20 items-center">
          
          {/* LEFT: TEXT & FEATURES */}
          <div className="space-y-10">
            <div className="space-y-4">
              <span className="text-[var(--mint-dark)] font-bold tracking-[0.2em] uppercase text-xs">
                Why Choose Us
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[var(--deep-dark)] leading-tight font-serif">
                Care That Goes Beyond Medicine
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {features.map((feature, index) => (
                <FeatureBlock 
                  key={index}
                  {...feature}
                  delay={index * 100}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: IMAGE */}
          <div 
            className="relative"
            data-aos="fade-left"
          >
            {/* Decorative Circle behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-[var(--mint)]/10 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[var(--mint)]/20 rounded-full -z-10" />

            <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.12)] aspect-[4/5] lg:aspect-auto lg:h-[600px]">
              <img 
                src={assets.doctors_team} 
                alt="Our Expert Doctors Team" 
                className="w-full h-full object-cover"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--deep-dark)]/20 to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
