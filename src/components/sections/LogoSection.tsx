"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LogoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapRef    = useRef<HTMLDivElement>(null);
  const svgRef     = useRef<SVGSVGElement>(null);
  
  const circle0Ref = useRef<SVGCircleElement>(null);
  const circle1Ref = useRef<SVGCircleElement>(null);
  const circle2Ref = useRef<SVGCircleElement>(null);
  const circle3Ref = useRef<SVGCircleElement>(null);
  const circle4Ref = useRef<SVGCircleElement>(null);
  const circle5Ref = useRef<SVGCircleElement>(null);
  const circle6Ref = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Main assembly animation on scroll with GSAP Pinning
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=3000", // Scroll distance for the animation
        scrub: true, // true (0) means it ties directly to scroll, no lag
        pin: true,
        anticipatePin: 1,
      },
    });

    const distance = 1000; // slightly shorter distance so they aren't forming too far out

    // Phase 1: Assembly (takes 1 timeline second)
    tl.fromTo(circle0Ref.current, 
      { scale: 0, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 1 }, 
      0
    );
    tl.fromTo(circle1Ref.current, 
      { y: -distance, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1 }, 
      0
    );
    tl.fromTo(circle2Ref.current, 
      { x: distance * 0.866, y: -distance * 0.5, opacity: 0 }, 
      { x: 0, y: 0, opacity: 1, duration: 1 }, 
      0
    );
    tl.fromTo(circle3Ref.current, 
      { x: distance * 0.866, y: distance * 0.5, opacity: 0 }, 
      { x: 0, y: 0, opacity: 1, duration: 1 }, 
      0
    );
    tl.fromTo(circle4Ref.current, 
      { y: distance, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1 }, 
      0
    );
    tl.fromTo(circle5Ref.current, 
      { x: -distance * 0.866, y: distance * 0.5, opacity: 0 }, 
      { x: 0, y: 0, opacity: 1, duration: 1 }, 
      0
    );
    tl.fromTo(circle6Ref.current, 
      { x: -distance * 0.866, y: -distance * 0.5, opacity: 0 }, 
      { x: 0, y: 0, opacity: 1, duration: 1 }, 
      0
    );

    // Phase 2: Rotation (takes 2 timeline seconds)
    tl.to(svgRef.current, {
      rotation: 180, // Rotate a full half-turn
      duration: 2,
      ease: "none"
    }, 1);

    // Initial fade-in of the wrapper
    gsap.fromTo(wrapRef.current, 
      { opacity: 0 }, 
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="logo-sc relative bg-[#0c0b0c] w-full h-[100svh] flex items-center justify-center overflow-hidden">
      <div className="container relative flex items-center justify-center w-full h-full">
        <div className="main-bg-blur logo-s" />

        <div
          ref={wrapRef}
          className="logo-ellipses relative flex items-center justify-center"
          style={{ width: "90rem", maxWidth: "95vw", aspectRatio: "3.5 / 3.2" }}
        >
          <svg 
            ref={svgRef}
            viewBox="-300 -300 600 600" 
            className="w-full h-full max-w-[400px] md:max-w-[500px]" 
            style={{ overflow: "visible" }}
          >
            <circle ref={circle0Ref} cx="0" cy="0" r="100" fill="none" stroke="white" strokeWidth="1.5" />
            <circle ref={circle1Ref} cx="0" cy="-100" r="100" fill="none" stroke="white" strokeWidth="1.5" />
            <circle ref={circle2Ref} cx="86.6025" cy="-50" r="100" fill="none" stroke="white" strokeWidth="1.5" />
            <circle ref={circle3Ref} cx="86.6025" cy="50" r="100" fill="none" stroke="white" strokeWidth="1.5" />
            <circle ref={circle4Ref} cx="0" cy="100" r="100" fill="none" stroke="white" strokeWidth="1.5" />
            <circle ref={circle5Ref} cx="-86.6025" cy="50" r="100" fill="none" stroke="white" strokeWidth="1.5" />
            <circle ref={circle6Ref} cx="-86.6025" cy="-50" r="100" fill="none" stroke="white" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </section>
  );
}
