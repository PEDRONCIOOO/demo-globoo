"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { ButtonGlitchBrightness } from "../buttonAnimated";
import Particles from "@/react-bits/Particles/Particles";
import { FaDownload, FaWallet, FaCoins } from "react-icons/fa";

export default function WalletHighlightSection() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut", staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="relative bg-black text-white w-full py-24 overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles
          alphaParticles={true}
          disableRotation={false}
          moveParticlesOnHover={true}
          particleBaseSize={2}
          particleColors={["#00ffff", "#38bdf8", "#ffffff"]}
          particleCount={100}
          particleSpread={6}
          speed={0.25}
        />
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 container mx-auto px-6 text-center"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-2"
          variants={itemVariants}
        >
          Comece em <span className="text-cyan-400">3 passos</span> simples
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-cyan-300 mb-10"
          variants={itemVariants}
        >
          Leva apenas alguns minutos
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
        >
          {[
            {
              icon: <FaDownload className="text-4xl text-cyan-400" />,
              label: "Baixar a carteira",
            },
            {
              icon: <FaWallet className="text-4xl text-cyan-400" />,
              label: "Criar uma nova carteira",
            },
            {
              icon: <FaCoins className="text-4xl text-cyan-400" />,
              label: "Obtenha criptomoedas",
            },
          ].map((step, idx) => (
            <motion.div
              key={idx}
              className="bg-neutral-900 rounded-2xl p-6 shadow-lg border-b-4 border-white hover:scale-105 transition-transform duration-300"
              variants={itemVariants}
            >
              <div className="flex flex-col items-center justify-center gap-4">
                {step.icon}
                <p className="text-white text-lg font-semibold">
                  {step.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
