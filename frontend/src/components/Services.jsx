import React, { useState } from 'react'
import { 
  Stethoscope, 
  Activity, 
  Heart, 
  Bone, 
  Baby, 
  Brain, 
  Microscope, 
  Venus,
  X
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ServiceModal = ({ service, isOpen, onClose }) => {
  if (!isOpen || !service) return null;
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6">
      <div 
        className="absolute inset-0 bg-[var(--deep-dark)]/80 backdrop-blur-md"
        onClick={onClose}
      />
      <div 
        className="relative w-full max-w-2xl bg-[var(--card-bg)] rounded-[2.5rem] shadow-2xl border border-white/20 dark:border-white/5 overflow-hidden animate-in zoom-in-95 duration-300"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[var(--section-bg)] hover:bg-[var(--mint)]/20 transition-colors"
        >
          <X size={20} className="text-[var(--text-dark)]" />
        </button>

        <div className="p-8 sm:p-12">
          <div className="text-[var(--mint-dark)] mb-6">
            <service.icon size={56} strokeWidth={1.2} />
          </div>
          
          <h3 className="text-3xl font-serif text-[var(--text-dark)] mb-4">{service.title}</h3>
          <p className="text-[var(--text-muted)] text-lg leading-relaxed mb-8">
            {service.longDescription || service.description}
          </p>

          <div className="space-y-4 mb-10">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--mint-dark)]">Key Specializations</h4>
            <div className="grid grid-cols-2 gap-3">
              {(service.procedures || ["Emergency Care", "Expert Consultations", "Modern Diagnostics", "Post-Op Support"]).map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-[13px] text-[var(--text-dark)] font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--mint)]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => { navigate('/doctors'); onClose(); }}
            className="w-full py-4 bg-[var(--mint)] text-[var(--deep-dark)] font-bold uppercase tracking-[0.2em] text-[12px] rounded-2xl hover:scale-[1.02] transition-all shadow-xl"
          >
            Book Consultation
          </button>
        </div>
      </div>
    </div>
  )
}

const ServiceCard = ({ icon: Icon, title, description, delay, onClick }) => (
  <div 
    onClick={onClick}
    className="group relative p-8 rounded-[2rem] bg-[var(--card-bg)] border border-white/10 dark:border-white/5 transition-all duration-500 hover:bg-[var(--mint)]/5 hover:shadow-[0_0_40px_rgba(173,235,179,0.15)] hover:border-[var(--mint)]/30 hover:-translate-y-2 cursor-pointer overflow-hidden"
    data-aos="fade-up"
    data-aos-delay={delay}
  >
    {/* Animated background glow */}
    <div className="absolute -right-10 -top-10 w-32 h-32 bg-[var(--mint)]/10 blur-[50px] rounded-full group-hover:bg-[var(--mint)]/20 transition-all duration-500" />
    
    <div className="mb-8 text-[var(--text-muted)] group-hover:text-[var(--mint-dark)] group-hover:scale-110 transition-all duration-500">
      <Icon size={44} strokeWidth={1.2} />
    </div>
    
    <h3 className="text-xl font-bold text-[var(--text-dark)] mb-4 font-serif group-hover:text-[var(--mint-dark)] transition-colors">
      {title}
    </h3>
    
    <p className="text-[var(--text-muted)] text-[13px] leading-relaxed mb-8 font-medium">
      {description}
    </p>
    
    <div className="flex items-center gap-2 text-[var(--mint-dark)] text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300">
      Learn More
      <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
    </div>
  </div>
)

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      icon: Stethoscope,
      title: "General Medicine",
      description: "Expert diagnosis and treatment for a wide range of common and complex medical conditions.",
      longDescription: "Our general medicine department provides comprehensive primary care for patients of all ages. We focus on preventive health, early diagnosis, and the management of chronic conditions using evidence-based protocols.",
      procedures: ["Full Health Screenings", "Immunizations", "Chronic Disease Management", "Infectious Disease Care"]
    },
    {
      icon: Activity,
      title: "Emergency Care (24/7)",
      description: "Round-the-clock emergency response with rapid triage and intensive care support.",
      longDescription: "Equipped with state-of-the-art life support systems, our ER handles everything from minor injuries to critical trauma. Our specialized response team is available 24/7 for immediate intervention.",
      procedures: ["Trauma Response", "Cardiac Emergencies", "Surgical ER", "Ambulance Support"]
    },
    {
      icon: Heart,
      title: "Cardiology",
      description: "Advanced heart care including diagnostics, interventional procedures, and cardiac rehabilitation.",
      longDescription: "We offer advanced cardiac care through our dedicated heart center. From non-invasive diagnostics to complex interventional procedures, our cardiologists ensure your heart health is in expert hands.",
      procedures: ["ECG & Echo", "Angiography", "Heart Valve Care", "Pacemaker Services"]
    },
    {
      icon: Bone,
      title: "Orthopedics",
      description: "Complete musculoskeletal care — from sports injuries to complex joint replacements.",
      longDescription: "Our orthopedic surgeons specialize in the treatment of bones, joints, ligaments, and tendons. We provide cutting-edge solutions for mobility issues and sports-related injuries.",
      procedures: ["Joint Replacement", "Sports Medicine", "Spine Surgery", "Fracture Care"]
    },
    {
      icon: Baby,
      title: "Pediatrics",
      description: "Dedicated care for infants, children, and adolescents in a safe and friendly environment.",
      longDescription: "Creating a nurturing environment for our youngest patients, the pediatrics department covers comprehensive child health from newborn care to adolescent medicine.",
      procedures: ["Newborn Screening", "Pediatric Surgery", "Growth Monitoring", "Adolescent Health"]
    },
    {
      icon: Brain,
      title: "Neurology",
      description: "Diagnosis and treatment of neurological disorders including stroke, epilepsy, and migraines.",
      longDescription: "Our neurology department addresses complex disorders of the nervous system. We utilize advanced neuro-imaging and diagnostic tools to provide precise treatment plans.",
      procedures: ["Stroke Management", "Epilepsy Care", "Neuro-Rehab", "EEG Diagnostics"]
    },
    {
      icon: Microscope,
      title: "Diagnostics & Lab",
      description: "State-of-the-art imaging, pathology, and diagnostic services with rapid reporting.",
      longDescription: "Precision is at the heart of our diagnostic center. We offer a full range of laboratory and imaging services with rapid turnaround times to support your treatment journey.",
      procedures: ["Advanced Imaging (MRI/CT)", "Pathology Lab", "Molecular Testing", "Radiology"]
    },
    {
      icon: Venus,
      title: "Maternity & Health",
      description: "Complete prenatal, maternity, and gynecological care for every stage of a woman's life.",
      longDescription: "We provide compassionate care for women at every stage. Our maternity wing offers a serene environment for childbirth, supported by expert obstetricians and neonatologists.",
      procedures: ["Prenatal Care", "High-Risk Pregnancy", "Gynae-Oncology", "Lactation Support"]
    }
  ]

  return (
    <section id="services" className="py-32 bg-[var(--section-bg)] relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-[var(--mint)]/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-[var(--mint)]/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        
        {/* SECTION HEADING */}
        <div className="mb-20" data-aos="fade-right">
          <span className="text-[var(--mint-dark)] font-black uppercase tracking-[0.3em] text-[11px] mb-4 block">Medical Excellence</span>
          <h2 className="text-5xl md:text-6xl font-serif text-[var(--text-dark)] mb-6">
            Your Health, <span className="italic text-[var(--mint-dark)]">Everywhere</span>
          </h2>
          <p className="text-[var(--text-muted)] text-lg max-w-2xl font-medium leading-relaxed">
            Book appointments at any partnered hospital, access specialists across 500+ clinics, and manage your health journey seamlessly across our nationwide network.
          </p>
        </div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              {...service} 
              delay={index * 50}
              onClick={() => setSelectedService(service)}
            />
          ))}
        </div>

      </div>

      <ServiceModal 
        service={selectedService} 
        isOpen={!!selectedService} 
        onClose={() => setSelectedService(null)} 
      />
    </section>
  )
}

export default Services
