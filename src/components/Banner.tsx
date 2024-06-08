import { useEffect, useRef } from "react";
import Image from "next/image";
import IdeasBanner from "@/images/ideas-banner.jpg";

const Banner = () => {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (bannerRef.current) {
        bannerRef.current.style.backgroundPositionY = `${scrollTop * 0.5}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-[22rem] overflow-hidden">
      <div
        ref={bannerRef}
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${IdeasBanner.src})` }}
      >
        <div className="h-full flex items-center justify-center bg-opacity-50 bg-black">
          <h1 className="text-4xl font-semibold text-white mt-6">Ideas</h1>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-white transform skew-y-[-3deg] origin-bottom-right"></div>
    </div>
  );
};

export default Banner;
