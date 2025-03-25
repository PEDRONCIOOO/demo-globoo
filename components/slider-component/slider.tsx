"use client";

import Image from "next/image";
import Slider from "react-infinite-logo-slider";

const InfiniteSlider = () => {
  return (
    <div className="max-w-[1000px] bg-[#10dbff9c] border border-gray-300 rounded mx-auto">
      <Slider
        blurBorderColor={"#000"}
        blurBorders={false}
        duration={40}
        pauseOnHover={true}
        width="200px"
      >
        <Slider.Slide>
          <Image
            alt="any"
            height={40}
            src="/company/google.png"
            className="grayscale"
            width={100}
          />
        </Slider.Slide>
        <Slider.Slide>
          <Image alt="any" className="grayscale" height={40} src="/company/azure.png" width={100} />
        </Slider.Slide>
        <Slider.Slide>
          <Image alt="any" className="grayscale" height={40} src="/company/amazon.png" width={100} />
        </Slider.Slide>
        <Slider.Slide>
          <Image alt="any" className="grayscale" height={40} src="/company/crypto.png" width={100} />
        </Slider.Slide>
        <Slider.Slide>
          <Image
            alt="any"
            height={40}
            className="grayscale"
            src="/company/comscope.png"
            width={100}
          />
        </Slider.Slide>
      </Slider>
    </div>
  );
};

export default InfiniteSlider;
