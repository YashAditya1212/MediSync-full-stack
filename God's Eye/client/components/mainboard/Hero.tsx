import React from "react";
import MaxWidthContainer from "../layouts/MaxWidthContainer";
import GridContainer from "../layouts/GridContainer";
import Image from "next/image";
import Tenor from "@/public/assets/images/tenor.gif";
import { Button } from "../ui/button";
import Link from "next/link";



type Props = {};
<Image
  src="images/logo.png"
  alt="Crash Alert Logo"
  width={128}
  height={128}
  className="mb-4 rounded-lg shadow-md"
  z-index
/>


export default function Hero({}: Props) {
  return (
   <section className="mb-12 text-white" style={{ backgroundColor:" #32de84" }}>
      <MaxWidthContainer>
        <GridContainer className="min-h-[70vh] grid-cols-1 items-center justify-between py-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
          <div className="space-y-5">
            
            
            <h1 className="text-3xl font-black md:text-4xl">Medi⚕️Sync
              CNN-based Vehicle Collision Detection and Emergency Response
              System
            </h1>
            
                        <p className="font-light sm:text-lg text-white-400">
              A system that will continuously monitor for the accidents through
              the CCTV and RSTV installed and dispatch emergency services notifying the concerned authorities for the
              instant rescue.
            </p>
            <Link
              href={"#model-test"}
              className="inline-block text-lg bg-black text-white px-8 py-3 rounded-md font-bold"
            >
              Test your video
            </Link>
          </div>
          <div>
            <Image
              src={Tenor}
              className="w-full rounded-md border-2 border-gray-100"
              width={500}
              height={500}
              alt="VCD"
            />
          </div>
        </GridContainer>
      </MaxWidthContainer>
    </section>
  );
}
