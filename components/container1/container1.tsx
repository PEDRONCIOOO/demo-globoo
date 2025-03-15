"use client";

import dynamic from "next/dynamic";

import Container2 from "../container2/container2";
import { ButtonGlitchBrightness } from "../buttonAnimated";

// Assets and Components
import { LogoG3D } from "@/public";
import LogoAnimated from "@/public/logoAnimated.json";
import Orb from "@/react-bits/Orb/Orb";
import Squares from "@/react-bits/Squares/Squares";

// Constants for better maintainability
const MAX_WIDTH = "max-w-7xl";
const TEXT_COLOR = "text-cyan-500";
const TEXT_SIZE = "text-3xl";

// Dynamically import Lottie
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Container1() {
  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      {/* Background Grid */}
      <Squares
        borderColor="cyan"
        className="absolute inset-0 w-full h-full opacity-30"
        direction="diagonal"
        hoverFillColor="gray"
        speed={0.5}
        squareSize={40}
      />

      {/* Main Content */}
      <div
        className={`relative z-10 flex flex-col w-full items-center justify-center mb-20 px-4 ${MAX_WIDTH}`}
      >
        <div className="flex items-center ml-4">
          <div className="flex-1">
            <div className="relative">
              {/* Heading 2: Facilidade e segurança */}
              <h1 className={`${TEXT_COLOR} text-[4em] font-extrabold mb-2`}>
                FACILIDADE
              </h1>
              {/* Heading 1: Tudo em um só lugar */}
              <h1 className="text-black dark:text-white absolute -right-4 top-0 text-[4em] font-bold">
                &
              </h1>
              <h1
                className={`${TEXT_SIZE} font-extrabold text-[4em] text-black dark:text-white mb-4`}
              >
                SEGURANÇA
              </h1>
              {/* Paragraph: carteira criptográfica e banco digital */}
              <p
                className={`${TEXT_COLOR} text-[1.4em] mb-6 font-bold max-w-sm`}
              >
                carteira criptográfia, banco digital, crypto exchange e tokenizações.
              </p>
              {/* Button: Abra sua conta agora! */}
              <ButtonGlitchBrightness />
            </div>
          </div>
          <div className="flex flex-1 items-center justify-end">
            <div className="w-[550px] h-[500px] flex items-center justify-end ml-4">
              <Orb
                rotateOnHover
                forceHoverState={false}
                hoverIntensity={0.5}
                hue={0}
              >
                <div className="absolute w-full h-full flex items-center justify-end right-16">
                  <Lottie
                    animationData={LogoAnimated}
                    style={{ width: 420, height: 450 }}
                  />
                </div>
              </Orb>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <Container2 />
      </div>
    </section>
  );
}