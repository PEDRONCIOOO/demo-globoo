"use client"; // Ensure this runs only on the client side

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

// Dynamically import the Globe component with SSR disabled
const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
});

// Type definition for the Globe ref
import { GlobeMethods } from "react-globe.gl";

export default function GloboContainer() {
  const globeEl = useRef<GlobeMethods | undefined>(undefined);

  useEffect(() => {
    const globe = globeEl.current;

    if (globe) {
      try {
        // Enable auto-rotation
        globe.controls().autoRotate = true;
        globe.controls().autoRotateSpeed = 0.5;

        // Adjust the initial camera position
        globe.pointOfView({ lat: 0, lng: 0, altitude: 2.5 }, 0); // Immediate transition
      } catch {}
    }
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-white dark:bg-black">
      <div className="w-1/3 h-full flex items-center justify-center">
        <Globe
          ref={globeEl}
          backgroundColor="rgba(0,0,0,0)" // Transparent background
          globeImageUrl="/earthDark.jpg" // Earth texture
        />
      </div>
      <div className="w-1/2 h-full flex items-center justify-center">
        <div className="text-left p-8 text-white">
          <h1 className="text-4xl font-bold mb-4">
            Uma estrutura preparada para transações internacionais
          </h1>
          <p className="text-lg">
            Transferir recursos nunca foi tão fácil e programável quanto agora.
            Através de nossas soluções, não existem barreiras para que a sua
            empresa possa crescer.
          </p>
        </div>
      </div>
    </div>
  );
}
