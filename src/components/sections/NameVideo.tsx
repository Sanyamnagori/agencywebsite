"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ASSETS } from "@/lib/assets";
import { AnimatedSplitText } from "@/components/common/Animations";

gsap.registerPlugin(ScrollTrigger);

const HEADLINES = ["superconscious", "superconscious", "superconscious", "superconscious"];
const MARQUEE_HEADLINES = [...HEADLINES, ...HEADLINES];

export default function NameVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    if (!section) return;

    const blocks = section.querySelectorAll<HTMLElement>(".name-headline-block:not(.view-p)");
    blocks.forEach((block) => {
      gsap.fromTo(
        block,
        { x: -100, opacity: 0, filter: "blur(10px)" },
        {
          x: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 75%", toggleActions: "play none none none" },
        }
      );
    });

    if (path && window.innerWidth <= 479) {
      gsap.to(path, {
        x: "-50%",
        duration: 20,
        ease: "none",
        repeat: -1,
      });
    }

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.vars.trigger === section)
        .forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="name-sc relative bg-[#0c0b0c] overflow-hidden" style={{ paddingTop: "10rem", paddingBottom: "10rem" }}>
      {/* Full-width text block */}
      <div className="relative w-full" style={{ zIndex: 200 }}>
        {/* Tag label centered above the headline */}
        <div className="flex justify-center mb-6">
          <AnimatedSplitText
            preset="from-down-blur"
            as="p"
            className="name-tag view-d text-white text-center"
            style={{ fontSize: "1.38rem", lineHeight: "120%" }}
            text="The Ultimate Manifestation Tool"
          />
          <p className="name-tag view-p text-white text-center" style={{ fontSize: "1.38rem", lineHeight: "120%" }}>
            The Manifestation App
          </p>
        </div>

        {/* Headline — spans full viewport width */}
        <div className="name-headline-wrap overflow-hidden w-full">
          <div ref={pathRef} className="name-headline-path flex w-max" style={{ paddingLeft: "0.5vw" }}>
            {MARQUEE_HEADLINES.map((text, i) => (
              <div key={i} className={`name-headline-block flex-none ${i > 0 ? "view-p" : ""}`}>
                {i === 0 ? (
                  <AnimatedSplitText
                    preset="from-right-blur"
                    as="p"
                    className="name-headline text-white"
                    style={{ fontSize: "13.8vw", letterSpacing: "-0.04em", fontWeight: 500, lineHeight: "1", whiteSpace: "nowrap" }}
                    text={text}
                  />
                ) : (
                  <p className="name-headline text-white" style={{ fontSize: "13.8vw", letterSpacing: "-0.04em", fontWeight: 500, lineHeight: "1", whiteSpace: "nowrap", paddingRight: "2vw" }}>
                    {text}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background video */}
      <div className="name-bg-wrapper absolute inset-0" style={{ zIndex: 1 }}>
        <div className="name-bg-embed absolute inset-0">
          <video
            className="w-full h-full object-cover pointer-events-none"
            style={{ opacity: 0.5 }}
            autoPlay muted loop playsInline
            src={ASSETS.nameVideo}
          />
        </div>
        <div
          className="name-bg-mask absolute inset-0 pointer-events-none"
          style={{
            zIndex: 100,
            background:
              "linear-gradient(90deg, #0c0b0c 0%, transparent 10%, transparent 90%, #0c0b0c 100%), " +
              "linear-gradient(180deg, #0c0b0c 0%, transparent 25%, transparent 75%, #0c0b0c 100%)",
          }}
        />
      </div>
    </section>
  );
}
