"use client"; // Ensure this runs only on the client side

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion"; // Import Framer Motion

// Dynamically import the Globe component with SSR disabled
const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
});

// Type definition for впервые the Globe ref
import { GlobeMethods } from "react-globe.gl";

import CountUp from "@/react-bits/CountUp/CountUp";

export default function GloboContainer() {
  const globeEl = useRef<GlobeMethods | undefined>(undefined);

  useEffect(() => {
    const globe = globeEl.current;

    if (globe) {
      try {
        // Enable auto-rotation with a smoother speed
        globe.controls().autoRotate = true;
        globe.controls().autoRotateSpeed = 0.3;

        // Adjust the initial camera position with a slight zoom
        globe.pointOfView({ lat: 10, lng: 0, altitude: 2.2 }, 1000); // Smooth transition over 1s

        // Gradually zoom in over 5s for a cinematic effect
        globe.pointOfView({ altitude: 2.0 }, 5000);
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
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-black via-black to-cyan-900 text-white overflow-hidden">
      {/* Globe Section with Animation */}
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="w-1/2 h-full flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Globe
          ref={globeEl}
          atmosphereAltitude={0.1}
          atmosphereColor="#00ffff" // Cyan atmosphere for a modern touch
          backgroundColor="rgba(0,0,0,0)" // Transparent background
          globeImageUrl="/textureDARK.jpg" // Earth texture
          onGlobeClick={() =>
            globeEl.current?.pointOfView({ altitude: 1.8 }, 2000)
          } // Zoom on click
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
            Transferir recursos nunca foi tão fácil e programável quanto agora.
            Através de nossas soluções, não existem barreiras para que a sua
            empresa possa crescer.
          </motion.p>
          <motion.div className="space-y-4 mt-6" variants={textVariants}>
            <motion.div
              className="flex items-center space-x-2"
              variants={itemVariants}
            >
              <CountUp
                className="text-lg text-cyan-400 font-semibold"
                direction="up"
                duration={2}
                from={0}
                separator=","
                to={500000000} // 500 million
              />
              <span className="text-lg text-gray-300">
                de transações realizadas
              </span>
            </motion.div>
            <motion.div
              className="flex items-center space-x-2"
              variants={itemVariants}
            >
              <CountUp
                className="text-lg text-cyan-400 font-semibold"
                direction="up"
                duration={2}
                from={0}
                to={135} // 135 currencies
              />
              <span className="text-lg text-gray-300">
                moedas e formas de pagamentos acelerados
              </span>
            </motion.div>
            <motion.div
              className="flex items-center space-x-2"
              variants={itemVariants}
            >
              <CountUp
                className="text-lg text-cyan-400 font-semibold"
                direction="up"
                duration={2}
                from={0}
                to={4} // 4 continents
              />
              <span className="text-lg text-gray-300">
                continentes com fornecedores locais
              </span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
