import React, { useEffect, useState, useRef } from 'react'

const StatItem = ({ end, label, suffix = "" }) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const countRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let start = 0
    const duration = 2000
    const increment = end / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isVisible, end])

  return (
    <div ref={countRef} className="flex flex-col items-center justify-center text-center py-8 lg:py-12">
      <h3 className="text-4xl lg:text-5xl font-bold text-white mb-2 font-serif">
        {count.toLocaleString()}{suffix}
      </h3>
      <p className="text-white/80 font-medium uppercase tracking-widest text-xs lg:text-sm">
        {label}
      </p>
    </div>
  )
}

const StatsBar = () => {
  const stats = [
    { end: 500, label: "Partner Hospitals", suffix: "+" },
    { end: 10000, label: "Doctors Onboarded", suffix: "+" },
    { end: 1000000, label: "Appointments Booked", suffix: "+" },
    { end: 50, label: "Cities Covered", suffix: "+" },
  ]

  return (
    <section className="relative w-full bg-[var(--mint)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 items-center">
          {stats.map((stat, index) => (
            <React.Fragment key={index}>
              <StatItem {...stat} />
              {index < stats.length - 1 && (
                <div className="hidden lg:block w-px h-12 bg-white/20" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsBar
