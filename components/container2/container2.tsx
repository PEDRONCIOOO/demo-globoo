"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import framer-motion
import dynamic from "next/dynamic"; // Import dynamic from next/dynamic

import { cardsArray } from "./data-container2"; // Import cardsArray

import SpotlightCard from "@/react-bits/SpotlightCard/SpotlightCard";

// Dynamically import Lottie
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Container2() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <div className="flex w-full items-center justify-center gap-4 mr-20 mt-10">
      {cardsArray &&
        cardsArray.map((card, index) => (
          <SpotlightCard
            key={index}
            className="custom-spotlight-card w-60 h-60 border-3 border-cyan-500 rounded-lg bg-gray-300 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105 ease-in-out transition-all"
            spotlightColor="rgba(0, 229, 255, 0.2)"
          >
            <div className="flex flex-col items-center justify-between h-full p-4 text-center">
              <div className="flex-1 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }} // Scale animation: 1 -> 1.1 -> 1
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }} // 2-second loop, infinite repeat
                >
                  <Lottie
                    animationData={card.icon}
                    style={{ width: 70, height: 70 }}
                  />
                </motion.div>
              </div>
              <h3 className="text-lg font-bold text-black dark:text-white h-14 flex items-center justify-center">
                {card.title}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 flex-1 flex items-center justify-center">
                {card.description}
              </p>
            </div>
          </SpotlightCard>
        ))}
    </div>
  );
}
