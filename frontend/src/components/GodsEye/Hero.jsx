import React from "react";
import { MaxWidthContainer, GridContainer } from "./Layouts";
import { Link } from "react-router-dom";
// Assuming you have these assets or I'll use placeholders
// import Tenor from "@/public/assets/images/tenor.gif"; 

export default function Hero() {
  return (
    <section className="mb-12 relative mx-4 sm:mx-10 mt-10 dark:text-night-text">
      <div className="absolute inset-0 bg-primary/80 blur-[100px] -z-10 rounded-full opacity-20 transform translate-y-20 dark:bg-accent/40 dark:opacity-10"></div>
      
      <MaxWidthContainer>
        <GridContainer className="min-h-[70vh] grid-cols-1 items-center justify-between py-10 sm:grid-cols-2 gap-16">
          <div className="space-y-8 z-10">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-sm tracking-wider uppercase mb-2 dark:bg-night-surface dark:border-primary/40 dark:text-accent">
              Next Gen Safety
            </div>
            <h1 className="text-5xl font-black md:text-7xl font-display leading-tight text-text-main dark:text-night-text">
              Medi<span className="text-primary dark:text-accent">Sync</span> <br/>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent dark:from-accent dark:to-primary">God's Eye</span>
            </h1>
            <h2 className="text-xl font-bold text-text-muted border-l-4 border-primary pl-4 dark:text-night-text-muted dark:border-accent">
              CNN-based Vehicle Collision Detection and Emergency Response System
            </h2>
            <p className="font-light text-lg text-text-medium max-w-lg leading-relaxed dark:text-night-text-muted">
              A state-of-the-art system that continuously monitors for accidents through CCTV networks and automatically dispatches emergency services for instant rescue.
            </p>
            <div className="flex gap-4">
              <a
                href="#model-test"
                className="btn-primary shadow-xl shadow-primary/30 dark:shadow-accent/20"
              >
                Test Live Demo
              </a>
              <button className="btn-outline dark:border-accent dark:text-accent dark:hover:bg-accent dark:hover:text-night-bg">
                Learn More
              </button>
            </div>
          </div>
          
          <div className="z-10 flex justify-center relative">
            <div className="absolute inset-0 bg-accent/30 blur-3xl -z-10 rounded-full dark:bg-primary/20"></div>
            <div className="glass-card p-2 rounded-3xl transform rotate-3 hover:rotate-0 transition-all duration-500 dark:bg-night-surface/50 dark:border-night-border">
              <img
                src="/tenor.gif" 
                className="w-full max-w-lg rounded-2xl shadow-2xl dark:opacity-80"
                alt="VCD"
              />
            </div>
          </div>
        </GridContainer>
      </MaxWidthContainer>
    </section>
  );
}
