import React, { useEffect } from 'react';
import Hero from '../components/GodsEye/Hero';
import Features from '../components/GodsEye/Features';
import ModelTest from '../components/GodsEye/ModelTest';

const GodsEye = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="space-y-12">
      <Hero />
      <Features />
      <ModelTest />
    </div>
  );
};

export default GodsEye;
