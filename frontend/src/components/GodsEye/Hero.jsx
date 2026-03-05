import React from "react";
import { MaxWidthContainer, GridContainer } from "./Layouts";
import { Link } from "react-router-dom";
import eyeVideo from "../../assets/eye.mp4";

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        src={eyeVideo}
        className="absolute"
        style={{
          width: "100vh",
          height: "100vw",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) rotate(-90deg) scale(1.5)",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(5,14,8,0.3) 0%, rgba(5,14,8,0.85) 100%)",
          zIndex: 1,
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "rgba(10, 18, 13, 0.4)", zIndex: 1 }}
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: "40vw",
          height: "40vw",
          background:
            "radial-gradient(circle, rgba(173,235,179,0.08) 0%, transparent 70%)",
          zIndex: 1,
          animation: "eyeGlow 4s ease-in-out infinite",
        }}
      />
      <style>{`@keyframes eyeGlow{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:.9;transform:scale(1.08)}}`}</style>

      <div className="relative z-20 mx-4 sm:mx-10 h-full flex items-center justify-center text-center">
        <MaxWidthContainer>
            <div className="space-y-8 flex flex-col items-center">
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-sm tracking-wider uppercase mb-2">
                Next Gen Safety
              </div>
              <h1 className="text-5xl font-black md:text-7xl font-display leading-tight text-white">
                Medi<span className="text-primary">Sync</span> <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  God's Eye
                </span>
              </h1>
              <h2 className="text-xl font-bold text-white/80">
                CNN-based Vehicle Collision Detection and Emergency Response System
              </h2>
              <p className="font-light text-lg text-white/80 max-w-2xl leading-relaxed">
                A state-of-the-art system that continuously monitors for accidents through CCTV networks and automatically dispatches emergency services for instant rescue.
              </p>
              <div className="flex gap-4">
                <a href="#model-test" className="btn-primary shadow-xl shadow-primary/30">
                  Test Live Demo
                </a>
                <button className="btn-outline">Learn More</button>
              </div>
            </div>
        </MaxWidthContainer>
      </div>
    </section>
  );
}
