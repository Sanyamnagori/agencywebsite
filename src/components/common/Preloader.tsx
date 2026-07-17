"use client";

import { useEffect, useState, useRef } from "react";
import { ASSETS } from "@/lib/assets";
import LottieAnim from "./LottieAnim";
import Particles from "./Particles";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [shouldPlay, setShouldPlay] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const visited = sessionStorage.getItem("visited_superconscious");
    if (visited) {
      onComplete();
      return;
    }

    setShouldPlay(true);
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.style.transition = "opacity 1s ease";
        containerRef.current.style.opacity = "0";
      }
      setTimeout(() => {
        sessionStorage.setItem("visited_superconscious", "true");
        document.body.style.overflow = "";
        onComplete();
      }, 1000);
    }, 4000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  if (!shouldPlay) return null;

  return (
    /*
      position:fixed; inset:0; z-index:9999
    */
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0c0b0c]"
    >
      {/* Particles in preloader backdrop */}
      <Particles backCount={50} frontCount={25} />

      {/*
        Lottie width equivalent to 80rem
      */}
      <LottieAnim
        src={ASSETS.preloaderLottie}
        loop={false}
        autoplay
        style={{ width: "80rem", height: "80rem", position: "relative", zIndex: 10 }}
        className=""
      />
    </div>
  );
}
