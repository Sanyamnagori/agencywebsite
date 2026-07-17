"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ASSETS } from "@/lib/assets";
import { useWaitlist } from "@/context/WaitlistContext";
import MainButton from "@/components/common/MainButton";
import Particles from "@/components/common/Particles";
import { AnimatedSplitText, ViewItem } from "@/components/common/Animations";

gsap.registerPlugin(ScrollTrigger);

export default function LogoHero() {
  const { openWaitlist } = useWaitlist();
  const phoneRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const phone = phoneRef.current;
    if (!phone) return;

    gsap.fromTo(
      phone,
      { scale: 0.6, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2, delay: 0.5, ease: "power2.out" }
    );

    const id = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => clearTimeout(id);
  }, []);

  return (
    <section id="home" className="hero-sc relative z-[100] overflow-hidden bg-[#0c0b0c]">
      <div className="container hero-s relative mx-auto" style={{ minHeight: "100svh" }}>
        <div
          className="hero-container hero-container-ref relative mx-auto flex flex-col"
          style={{ minHeight: "100svh", paddingTop: "8.6rem", paddingBottom: "2rem" }}
        >
          <div
            className="hero-viedeo-area absolute inset-0"
            style={{
              maskImage: "linear-gradient(#000 0% 90%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(#000 0% 90%, transparent 100%)",
            }}
          >
            <video
              className="hidden md:block absolute inset-0 w-full h-full object-cover"
              autoPlay muted loop playsInline
              src={ASSETS.heroVideoDesk}
            />
            <video
              className="md:hidden absolute inset-0 w-full h-full object-cover"
              autoPlay muted loop playsInline
              src={ASSETS.heroVideoMob}
            />
            <div
              className="hero-video-mask absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg,#0c0b0c 0%,rgba(8,7,8,.64) 10%,transparent 50%,rgba(8,7,8,.64) 90%,#0c0b0c 100%)," +
                  "linear-gradient(180deg,transparent 65%,#0c0b0c 100%)",
              }}
            />
            <Particles style={{ zIndex: 800 }} />
          </div>

          <div
            className="hero-top-blur absolute pointer-events-none"
            style={{
              background: "#8f69e0",
              width: "70rem", height: "20rem",
              filter: "blur(11rem)",
              top: "-13rem", left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1,
            }}
          />

          <div className="hero-content relative flex flex-col items-center justify-between flex-1" style={{ zIndex: 1000 }}>
            <div className="text-elements hero-s flex flex-col items-center text-center">
              <AnimatedSplitText
                text="superconscious"
                preset="from-right-blur"
                as="h1"
                className="headline-mega text-white font-medium leading-[120%]"
                style={{ fontSize: "6.94rem", letterSpacing: "-0.07em" }}
              />
              <AnimatedSplitText
                text="The Manifestation App"
                preset="from-down-blur"
                as="p"
                className="hero-tag text-white font-medium mt-2"
                style={{ fontSize: "1.38rem", letterSpacing: "-0.03em" }}
                delay={0.2}
              />
            </div>

            <div className="hero-mobile-point absolute pointer-events-none">
              <ViewItem instant delay={0.6} type="from-center" className="hero-mobile">
                <img
                  ref={phoneRef}
                  src={ASSETS.heroMobile}
                  alt="Superconscious App"
                  className="hero-mobile-img image-contain"
                  style={{
                    width: "28rem",
                    position: "absolute",
                    top: "-9rem",
                    left: "-15.9rem",
                    objectFit: "contain",
                    opacity: 0,
                    transformOrigin: "center center",
                  }}
                />
              </ViewItem>
            </div>

            <div className="hero-down-elements w-full flex justify-center mt-auto">
              <ViewItem
                instant
                delay={0.8}
                type="from-center"
                className="hero-download-app flex items-center gap-[1.6rem] p-[1.2rem] rounded-[1.6rem]"
                style={{
                  backdropFilter: "blur(1rem)",
                  WebkitBackdropFilter: "blur(1rem)",
                  background: "rgba(255,255,255,0.1)",
                }}
              >
                <div className="hero-download-text flex flex-col">
                  <span className="hero-app-headline text-white font-medium" style={{ fontSize: "1.38rem" }}>
                    Coming in beta Spring 2025
                  </span>
                  <span className="body-main text-white opacity-80" style={{ fontSize: "1.1rem" }}>
                    Join the Waitlist Today
                  </span>
                </div>
                <div className="hero-download-buttons">
                  <MainButton onClick={openWaitlist}>Join Waitlist</MainButton>
                </div>
              </ViewItem>
            </div>
          </div>
        </div>

        <div
          className="hero-down-mask absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: "20rem",
            background: "linear-gradient(180deg,transparent 0%,#0c0b0c 100%)",
            zIndex: 900,
          }}
        />
      </div>
    </section>
  );
}
