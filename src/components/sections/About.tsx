"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ASSETS } from "@/lib/assets";
import LottieAnim from "@/components/common/LottieAnim";

gsap.registerPlugin(ScrollTrigger);

const paragraphText =
  "Everything you seek is already within you — Superconscious helps you access it. Our advanced AI personalizes your manifestation journey, clears subconscious blocks, and aligns you with your highest self. Manifestation has never been this clear, this powerful, or this effortless.";

function AboutIcon({ src, outlineColor, className = "" }: { src: string; outlineColor: string; className?: string }) {
  return (
    <span
      className={`about-icon-span inline-flex items-center justify-center flex-shrink-0 rounded-[3rem] overflow-hidden ${className}`}
      style={{
        background: "rgba(24,24,24,0.2)",
        border: "0.2rem solid #0c0b0c",
        outline: `0.2rem solid ${outlineColor}`,
        outlineOffset: "0.2rem",
      }}
    >
      <LottieAnim src={src} loop autoplay className="w-[70%] h-[70%]" />
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const icons  = section.querySelectorAll<HTMLElement>(".about-icon-span");
    const lines  = section.querySelectorAll<HTMLElement>(".about-line");
    const words  = section.querySelectorAll<HTMLElement>(".para-word");

    gsap.set(icons,  { width: 0, height: 0, margin: "0.5rem", opacity: 0 });
    gsap.set(lines,  { y: 60, opacity: 0, filter: "blur(20px)" });
    gsap.set(words,  { opacity: 0, filter: "blur(12px)", x: "20rem" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=3000",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    const linesD = section.querySelectorAll<HTMLElement>(".about-headline-d .about-line");
    const linesP = section.querySelectorAll<HTMLElement>(".about-headline-p .about-line");
    
    const iconsD = section.querySelectorAll<HTMLElement>(".about-headline-d .about-icon-span");
    const iconsP = section.querySelectorAll<HTMLElement>(".about-headline-p .about-icon-span");

    tl.to(linesD, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.5, stagger: 0.8, ease: "power3.out" }, 0);
    tl.to(linesP, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.5, stagger: 0.8, ease: "power3.out" }, 0);

    tl.to(iconsD, { width: "11.5rem", height: "8rem", margin: "2rem", opacity: 1, duration: 1.5, stagger: 0.8, ease: "power2.inOut" }, 0);
    tl.to(iconsP, { width: "11.5rem", height: "8rem", margin: "2rem", opacity: 1, duration: 1.5, stagger: 0.8, ease: "power2.inOut" }, 0);

    const fadeOutWordsD = section.querySelectorAll<HTMLElement>(".about-headline-d .fade-out-word");
    const fadeOutWordsP = section.querySelectorAll<HTMLElement>(".about-headline-p .fade-out-word");
    
    tl.to(fadeOutWordsD, { x: "-40vw", opacity: 0, filter: "blur(20px)", duration: 1.5, stagger: 0.15, ease: "power2.inOut" }, 3.0);
    tl.to(fadeOutWordsP, { x: "-40vw", opacity: 0, filter: "blur(20px)", duration: 1.5, stagger: 0.15, ease: "power2.inOut" }, 3.0);

    const paraSteps = section.querySelectorAll<HTMLElement>(".para-step");
    gsap.set(paraSteps, { opacity: 0, x: "10rem", filter: "blur(12px)" });

    tl.to(paraSteps, {
      opacity: 1, filter: "blur(0px)", x: 0,
      duration: 1.2, stagger: 0.6, ease: "power2.out",
    }, 4.2);

    return () => {
      tl.kill();
      ScrollTrigger.getAll()
        .filter((t) => t.vars.trigger === section)
        .forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="about-sc relative bg-[#0c0b0c] h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="container about-s relative flex items-center justify-center w-full h-full">
        <div className="main-bg-blur about-s" />

        {/* Desktop headline */}
        <div className="about-headline-d about-headlines-d relative z-10 flex flex-col gap-8 items-center pointer-events-none select-none">
          <div className="about-line about-line-span s1 flex items-center" style={{ position: "relative", left: "4rem" }}>
            <span className="fade-out-word about-span text-white font-medium" style={{ fontSize: "6.94rem", letterSpacing: "-0.05em" }}>Control</span>
            <span className="fade-out-word"><AboutIcon src={ASSETS.aboutIcon1} outlineColor="#ecc5fc" /></span>
            <span className="fade-out-word about-span text-white font-medium" style={{ fontSize: "6.94rem", letterSpacing: "-0.05em" }}>Your</span>
          </div>

          <div className="about-line about-line-span s2 flex items-center" style={{ position: "relative", left: "-6rem" }}>
            <span className="fade-out-word about-span text-white font-medium" style={{ fontSize: "6.94rem", letterSpacing: "-0.05em" }}>Mind</span>
            <span className="fade-out-word"><AboutIcon src={ASSETS.aboutIcon2} outlineColor="#ffffff" /></span>
            <span className="fade-out-word about-span tiro-s" style={{ fontFamily: "var(--font-tiro)", fontStyle: "italic", fontWeight: 400, fontSize: "6.94rem", letterSpacing: "-0.05em", opacity: 0.28, color: "white", position: "relative", top: "1rem" }}>
              Manifest
            </span>
          </div>

          <div className="about-line about-line-span s3 flex items-center" style={{ position: "relative", left: "18rem" }}>
            <span className="fade-out-word about-span text-white font-medium" style={{ fontSize: "6.94rem", letterSpacing: "-0.05em" }}>Your</span>
            <span className="fade-out-word"><AboutIcon src={ASSETS.aboutIcon3} outlineColor="#9780ff" /></span>
            <span className="about-span text-white font-medium" style={{ fontSize: "6.94rem", letterSpacing: "-0.05em" }}>Reality</span>
          </div>
        </div>

        {/* Mobile headline */}
        <h2
          className="about-headline-p relative z-10 text-white font-medium pointer-events-none select-none text-center"
          style={{ fontSize: "12.8rem", letterSpacing: "-0.05em", lineHeight: "130%" }}
        >
          <span className="about-line about-line-span s1 block">
            <span className="fade-out-word inline-block">Control</span> <span className="fade-out-word inline-block">Your</span>
          </span>
          <span className="about-line relative block">
            <span className="fade-out-word about-line-span s2 inline-block">Mind</span>
            <span className="fade-out-word about-icon-position-p s1 absolute inline-block" style={{ inset: "22% auto auto 38%" }}>
              <AboutIcon src={ASSETS.aboutIcon1} outlineColor="#ecc5fc" className="!w-[22rem] !h-auto rounded-[6rem]" />
            </span>
          </span>
          <span className="about-line relative block">
            <span className="fade-out-word about-icon-position-p s2 absolute inline-block" style={{ inset: "41% auto auto 5%" }}>
              <AboutIcon src={ASSETS.aboutIcon2} outlineColor="#ffffff" className="!w-[22rem] !h-auto rounded-[6rem]" />
            </span>
            <span className="fade-out-word about-line-span s3 inline-block">Manifest</span>
          </span>
          <span className="about-line about-line-span s4 block">
            <span className="fade-out-word inline-block">Your</span>
          </span>
          <span className="about-line about-line-span s5 block">Reality</span>
          <span className="fade-out-word about-icon-position-p s3 absolute" style={{ inset: "auto 56% 4% auto" }}>
            <AboutIcon src={ASSETS.aboutIcon3} outlineColor="#9780ff" className="!w-[22rem] !h-auto rounded-[6rem]" />
          </span>
        </h2>
      </div>

      {/* Paragraph fading horizontally in 3 steps */}
      <div className="about-pg-area about-pg-height absolute" style={{ bottom: 0, left: "5.56rem", paddingBottom: "8rem", width: "53rem", zIndex: 10 }}>
        <div className="about-pg-text-d text-white flex flex-col gap-[1rem]" style={{ fontSize: "2.2rem", lineHeight: "140%" }}>
          <span className="para-step inline-block"><span className="about-space-span" style={{ paddingLeft: "4rem" }}>E</span>verything you seek is already within you — Superconscious helps you access it.</span>
          <span className="para-step inline-block">Our advanced AI personalizes your manifestation journey, clears subconscious blocks, and aligns you with your highest self.</span>
          <span className="para-step inline-block">Manifestation has never been this clear, this powerful, or this effortless.</span>
        </div>
      </div>
    </section>
  );
}
