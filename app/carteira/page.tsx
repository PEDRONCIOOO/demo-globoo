"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import Particles from "@/react-bits/Particles/Particles";
import Lottie from "lottie-react";
import { ButtonGlitchBrightness } from "@/components/buttonAnimated";

import baixarAnimation from "../../public/baixar.json";
import carteiraAnimation from "../../public/carteira.json";
import coinsAnimation from "../../public/coins.json";
import ContainerCrypto from "@/components/container-crypto/containerCrypto";

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
    <div className="relative bg-black text-white w-full py-24 overflow-hidden mt-20">
      <div className="absolute inset-0 z-0">
        <Particles
          className="absolute inset-0"
          particleCount={50}
          speed={50}
          particleColors={["#0891b2"]}
          particleBaseSize={1}
          particleSpread={10}
          alphaParticles={true}
          sizeRandomness={0.5}
        />
      </div>

      <motion.div
        className="relative z-10 container mx-auto px-6 text-center"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <motion.h1
          className="text-3xl md:text-5xl font-extrabold mb-6"
          variants={itemVariants}
        >
          A <span className="text-cyan-400">carteira digital</span> para o
          futuro
        </motion.h1>

        <motion.p
          className="text-xl md:text-1xl text-gray-300 mb-10 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          Armazene, envie e receba criptomoedas com segurança em nossa carteira
          de última geração. Controle total sobre seus ativos digitais.
        </motion.p>

        <motion.div variants={itemVariants}>
          <ButtonGlitchBrightness />
        </motion.div>

        {/* Feature Grid - Checkmarks */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 text-left max-w-5xl mx-auto"
          variants={containerVariants}
        >
          {[
            "Obtenha, troque e mantenha muitas criptomoedas diferentes;",
            "Armazene stablecoins para evitar a volatilidade do mercado;",
            "Ganhe facilmente juros sobre a criptomoeda em sua carteira;",
            "Fique privado e seguro armazenando suas moedas de privacidade;",
            "Compre mais criptomoedas com seu cartão de crédito;",
            "Troque ou negocie seus ativos em segundos.",
          ].map((text, idx) => (
            <motion.div
              key={idx}
              className="flex items-start gap-4"
              variants={itemVariants}
            >
              <div className="text-cyan-400 text-2xl">✔</div>
              <p className="text-lg text-gray-300">{text}</p>
            </motion.div>
          ))}
        </motion.div>
        <ContainerCrypto />
        {/* 3 Steps Section with Lottie animations */}
        <motion.div
          className="mt-32"
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
                icon: baixarAnimation,
                label: "Baixar a carteira",
              },
              {
                icon: carteiraAnimation,
                label: "Criar uma nova carteira",
              },
              {
                icon: coinsAnimation,
                label: "Obtenha criptomoedas",
              },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                className="bg-neutral-900 rounded-2xl p-6 shadow-lg border-b-4 border-white hover:scale-105 transition-transform duration-300"
                variants={itemVariants}
              >
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="w-20 h-20">
                    <Lottie
                      animationData={step.icon}
                      loop={true}
                      autoplay={true}
                    />
                  </div>
                  <p className="text-white text-lg font-semibold">
                    {step.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
