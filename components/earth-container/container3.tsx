"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { GlobeMethods } from "react-globe.gl";
import Particles from "@/react-bits/Particles/Particles";
import { ButtonGlitchBrightness } from "../buttonAnimated";

// Dynamically import the Globe component with SSR disabled
const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
});

// Interface definitions for component props
interface AnimatedCounterProps {
  value: string;
  duration?: number;
}

interface TypingTextProps {
  text: string;
  typingSpeed?: number;
}

// Animated Counter Component
const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 2,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value);

    // No animation if value is zero
    if (start === end) return;

    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      setCount(Math.floor(start));
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      }
    }, 16.7);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count.toLocaleString()}+</span>;
};

// Typing Text Effect
const TypingText: React.FC<TypingTextProps> = ({ text, typingSpeed = 50 }) => {
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i));
        i++;
      } else {
        setIsTypingComplete(true);
        clearInterval(typing);
      }
    }, typingSpeed);

    return () => clearInterval(typing);
  }, [text, typingSpeed]);

  return (
    <span className="inline-block">
      {displayText}
      {!isTypingComplete && (
        <span className="animate-pulse text-cyan-400">|</span>
      )}
    </span>
  );
};

export default function GloboContainer() {
  const globeEl = useRef<GlobeMethods | undefined>(undefined);
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");

    const globe = globeEl.current;

    if (globe) {
      try {
        // Wait for the globe to be fully initialized
        const controls = globe.controls();
        controls.autoRotate = true; // Enable auto-rotation
        controls.autoRotateSpeed = 0.3; // Adjust speed as needed
        controls.enableZoom = false; // Disable zoom entirely
        controls.enableDamping = true; // Smooth dragging
        controls.dampingFactor = 0.05; // Damping factor for smoothness
        controls.update(); // Apply the settings

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
      } catch (error) {
        // Handle error silently or use a logger utility instead of console
        // You could implement a proper error logging mechanism here
        const errorMessage = error instanceof Error ? error.message : String(error);
        // Optional: report to an error tracking service
      }
    }
  }, [controls]);

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

  const highlightVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: { duration: 1.2, delay: 1.5, ease: "easeInOut" },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
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

        {/* Text Section with Enhanced Animation */}
        <motion.div
          animate="visible"
          className="w-1/2 h-full flex items-center justify-center p-8 relative"
          initial="hidden"
          variants={textVariants}
        >
          {/* Floating Elements */}
          <motion.div
            className="absolute right-10 top-40 text-cyan-400 opacity-30 text-6xl"
            variants={floatingVariants}
            animate="animate"
          >
            □
          </motion.div>
          <motion.div
            className="absolute left-16 bottom-40 text-cyan-300 opacity-20 text-4xl"
            variants={floatingVariants}
            animate="animate"
            transition={{ delay: 1 }}
          >
            ○
          </motion.div>
          <motion.div
            className="absolute left-40 top-32 text-cyan-200 opacity-20 text-3xl"
            variants={floatingVariants}
            animate="animate"
            transition={{ delay: 2 }}
          >
            △
          </motion.div>

          <div className="text-left space-y-6">
            <motion.div className="relative" variants={itemVariants}>
              <h1 className="text-4xl md:text-4xl font-bold mb-4 w-full md:w-3/4 leading-tight">
                Uma estrutura preparada para{" "}
                <span className="relative inline-block">
                  <span className="text-cyan-400">
                    <TypingText
                      text="trransações internacionais"
                      typingSpeed={40}
                    />
                  </span>
                  <motion.span
                    className="absolute bottom-0 left-0 h-1 bg-cyan-400 rounded-full"
                    variants={highlightVariants}
                  />
                </span>
              </h1>
            </motion.div>

            <motion.p
              className="text-xl md:text-2xl w-full md:w-[600px] leading-relaxed"
              variants={itemVariants}
            >
              Transferir recursos nunca foi tão fácil e programável quanto
              agora. Através de nossas soluções, não existem barreiras para que
              a sua empresa possa crescer.
            </motion.p>

            {/* Stats Section with Counter Animation */}
            <motion.div
              className="flex gap-8 mt-6"
              variants={itemVariants}
              transition={{ delay: 0.6 }}
            >
              <div className="text-center">
                <p className="text-4xl font-bold text-cyan-400">
                  <AnimatedCounter value="150" duration={2.5} />
                </p>
                <p className="text-sm opacity-80">Países atendidos</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-cyan-400">
                  <AnimatedCounter value="12500" duration={3} />
                </p>
                <p className="text-sm opacity-80">Transações diárias</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-cyan-400">
                  <AnimatedCounter value="99" duration={2} />
                </p>
                <p className="text-sm opacity-80">% de satisfação</p>
              </div>
            </motion.div>

            {/* CTA Button with Animation */}
            <motion.div variants={itemVariants} transition={{ delay: 0.9 }}>
              <ButtonGlitchBrightness />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
