"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { WaitlistProvider } from "@/context/WaitlistContext";
import CustomCursor from "@/components/common/CustomCursor";
import Preloader from "@/components/common/Preloader";
import WaitlistModal from "@/components/common/WaitlistModal";
import Header from "@/components/common/Header";
import LogoHero from "@/components/sections/LogoHero";
import LogoSection from "@/components/sections/LogoSection";
import About from "@/components/sections/About";
import HowItWorks from "@/components/sections/HowItWorks";
import WhatIs from "@/components/sections/WhatIs";
import StackCards from "@/components/sections/StackCards";
import NameVideo from "@/components/sections/NameVideo";
import CTAWaitlist from "@/components/sections/CTAWaitlist";
import Footer from "@/components/sections/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) return;

    // Give React one frame to finish painting before starting Lenis
    const init = () => {
      const lenis = new Lenis({
        duration: 1,
        easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
      });

      // ✅ Correct integration: feed Lenis into GSAP's ticker
      // so ScrollTrigger receives scroll updates every frame
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);

      // Also keep ScrollTrigger in sync
      lenis.on("scroll", ScrollTrigger.update);

      return lenis;
    };

    const lenis = init();

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, [loading]);

  return (
    <WaitlistProvider>
      <main className="relative overflow-x-hidden bg-[#0c0b0c]">
        <div className="noise-overlay" />

        <CustomCursor />
        <Preloader onComplete={() => setLoading(false)} />
        <WaitlistModal />

        {!loading && (
          <>
            <Header />
            <LogoHero />
            <LogoSection />
            <About />
            <HowItWorks />
            <WhatIs />
            <StackCards />
            <NameVideo />
            <CTAWaitlist />
            <Footer />
          </>
        )}
      </main>
    </WaitlistProvider>
  );
}
