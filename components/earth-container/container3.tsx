"use client"; // Ensure this runs only on the client side

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { GlobeMethods } from "react-globe.gl";

import Particles from "@/react-bits/Particles/Particles";

// Dynamically import the Globe component with SSR disabled
const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
});

export default function GloboContainer() {
  const globeEl = useRef<GlobeMethods | undefined>(undefined);

  useEffect(() => {
    const globe = globeEl.current;

    if (globe) {
      try {
        // Wait for the globe to be fully initialized
        globe.controls().autoRotate = true; // Enable auto-rotation
        globe.controls().autoRotateSpeed = 0.3; // Adjust speed as needed
        globe.controls().enableZoom = false; // Disable zoom entirely
        globe.controls().enableDamping = true; // Smooth dragging
        globe.controls().dampingFactor = 0.05; // Damping factor for smoothness
        globe.controls().update(); // Apply the settings

        // Prevent zooming by intercepting wheel events
        const preventZoom = (event: WheelEvent) => {
          event.preventDefault();
          event.stopPropagation();
        };

        window.addEventListener("wheel", preventZoom, { passive: false });

        // Cleanup on component unmount
        return () => {
          window.removeEventListener("wheel", preventZoom);
        };
      } catch (error) {}
    }
  }, []);

  // Animation variants for Framer Motion
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut", staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Particles Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles
          alphaParticles={true}
          disableRotation={false}
          moveParticlesOnHover={true}
          particleBaseSize={2}
          particleColors={["#ffffff", "#00ffff", "#00b7b7"]}
          particleCount={150}
          particleSpread={8}
          speed={0.2}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex h-full items-center justify-center bg-gradient-to-br from-black via-black to-cyan-900 text-white">
        {/* Globe Section with Animation */}
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="w-1/2 h-full flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Globe
            ref={globeEl}
            atmosphereAltitude={0.15}
            atmosphereColor="#00ffff"
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl="/textureDARK.jpg"
            onGlobeReady={() => {
              const globe = globeEl.current;

              if (globe) {
                const controls = globe.controls();

                controls.autoRotate = true;
                controls.autoRotateSpeed = 0.5;
                controls.enableZoom = false;
                controls.enableDamping = true;
                controls.dampingFactor = 0.05;
                controls.update();
              }
            }}
          />
        </motion.div>

        {/* Text Section with Animation */}
        <motion.div
          animate="visible"
          className="w-1/2 h-full flex items-center justify-center p-8"
          initial="hidden"
          variants={textVariants}
        >
          <div className="text-left space-y-6">
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-4 w-full md:w-3/4 leading-tight"
              variants={itemVariants}
            >
              Uma estrutura preparada para{" "}
              <span className="text-cyan-400">transações internacionais</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl w-full md:w-[600px] leading-relaxed"
              variants={itemVariants}
            >
              Transferir recursos nunca foi tão fácil e programável quanto
              agora. Através de nossas soluções, não existem barreiras para que
              a sua empresa possa crescer.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
