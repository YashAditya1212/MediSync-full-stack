import React from "react";
import { MaxWidthContainer } from "./Layouts";
import {
  Map,
  Camera,
  LocateFixed,
  Flame,
  BellRing,
} from "lucide-react";

const allFeatures = [
  {
    icon: Camera,
    title: "Real-time Accident Detection",
    description:
      "Real-time accident detection using advanced deep learning (CNN) on CCTV camera video.",
  },
  {
    icon: LocateFixed,
    title: "Location Identification",
    description:
      "Integrated location services pinpoint accident locations, vital for swift emergency response.",
  },
  {
    icon: Flame,
    title: "Emergency Alert Generation",
    description:
      "Post-accident detection, the system sends rapid emergency alerts to authorities with location information.",
  },
  {
    icon: BellRing,
    title: "Integration with Communication",
    description:
      "Integrated with SMS, the system sends video links notifying traffic authorities for coordinated accident response.",
  },
];

export default function Features() {
  return (
    <section className="py-20 relative dark:text-night-text">
      <MaxWidthContainer>
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-bold text-4xl md:text-5xl text-text-main font-display dark:text-night-text">
            Advanced Capabilities
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg dark:text-night-text-muted">
            Powered by cutting-edge computer vision and deep learning algorithms to provide instant accident detection and response.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {allFeatures.map((singleFeature, index) => {
            return (
              <div
                key={index}
                className="glass-card p-8 rounded-3xl group relative overflow-hidden dark:bg-night-surface/50 dark:border-night-border"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 transition-all group-hover:scale-150 group-hover:bg-primary/10 dark:bg-accent/5"></div>
                
                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-lg shadow-primary/20 dark:bg-night-bg dark:text-accent dark:group-hover:bg-accent dark:group-hover:text-night-bg">
                    <singleFeature.icon className="w-8 h-8" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-text-main mb-2 dark:text-night-text">{singleFeature.title}</h3>
                    <p className="text-text-muted text-sm leading-relaxed dark:text-night-text-muted">{singleFeature.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </MaxWidthContainer>
    </section>
  );
}
