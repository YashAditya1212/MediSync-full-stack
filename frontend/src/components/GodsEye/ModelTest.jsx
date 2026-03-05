import React from "react";
import { MaxWidthContainer } from "./Layouts";
import InputForm from "./InputForm";

export default function ModelTest() {
  return (
    <section id="model-test" className="py-20 relative mx-4 sm:mx-10 my-10">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-[3rem] -z-10"></div>
      <MaxWidthContainer>
        <div className="text-center mb-12">
           <span className="text-primary font-bold tracking-widest uppercase text-sm">Live Demo</span>
           <h2 className="font-bold text-4xl md:text-5xl text-text-main font-display mt-2 dark:text-stone-500">
            See God's Eye in Action
          </h2>
        </div>
        
        <div className="glass-panel p-4 rounded-[2rem] max-w-4xl mx-auto shadow-2xl shadow-primary/10">
           <InputForm />
        </div>
      </MaxWidthContainer>
    </section>
  );
}
