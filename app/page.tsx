import Image from "next/image";

// Assets and Components
import { LogoG } from "@/public";
import Orb from "@/react-bits/Orb/Orb";
import Squares from "@/react-bits/Squares/Squares";

// Constants for better maintainability
const MAX_WIDTH = "max-w-6xl";
const TEXT_COLOR = "text-cyan-500";
const TEXT_SIZE = "text-3xl";

export default function Home() {
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
        className={`mb-10 relative z-10 flex w-full items-center justify-center px-4 ${MAX_WIDTH}`}
      >
        {/* Left Section: Heading */}
        <div className="flex-1 ml-10">
          <div className="relative pl-4">
            {/* Vertical cyan bar */}
            <span className="absolute left-0 top-0 h-full w-2 bg-cyan-500" />

            {/* Heading 2: Facilidade e segurança */}
            <h2 className={`${TEXT_COLOR} text-[4em] font-extrabold mb-2`}>
              Facilidade e segurança.
            </h2>

            {/* Heading 1: Tudo em um só lugar */}
            <h1
              className={`${TEXT_SIZE} font-bold text-[2em] text-black dark:text-white mb-4`}
            >
              Tudo em um só lugar:
            </h1>

            {/* Paragraph: carteira criptográfica e banco digital */}
            <p className={`${TEXT_COLOR} text-[1.5em] mb-6 font-bold`}>
              carteira criptográfica e banco digital
            </p>

            {/* Button: Abra sua conta agora! */}
            <button className="px-6 py-3 bg-cyan-500 text-black dark:text-white rounded-xl font-semibold hover:bg-cyan-600 transition-colors">
              Abra sua conta agora!
            </button>
          </div>
        </div>

        {/* Right Section: Orb with Logo */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-[500px] h-[500px] flex items-center justify-center">
            <Orb
              rotateOnHover
              forceHoverState={false}
              hoverIntensity={0.5}
              hue={0}
            >
              <div className="absolute w-full h-full flex items-center justify-center">
                <Image
                  priority
                  alt="Globoo Logo"
                  className="object-contain"
                  height={120} // Calculated to maintain 2.5:1 aspect ratio (300 / 2.5 = 120)
                  src={LogoG}
                  width={300} // Set to 300px as requested
                />
              </div>
            </Orb>
          </div>
        </div>
      </div>
    </section>
  );
}
