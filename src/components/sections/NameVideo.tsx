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
    <section ref={sectionRef} className="name-sc relative bg-[#0c0b0c] overflow-hidden">
      <div className="container name-s relative" style={{ paddingTop: "18rem", paddingBottom: "18rem", overflow: "hidden" }}>
        <div className="text-elements name-s relative" style={{ zIndex: 200 }}>
          <AnimatedSplitText
            preset="from-down-blur"
            as="p"
            className="name-tag view-d absolute text-white"
            style={{ top: "14%", fontSize: "1.38rem", lineHeight: "120%" }}
            text="The Ultimate Manifestation Tool"
          />
          <p className="name-tag view-p absolute text-white" style={{ fontSize: "1.38rem", lineHeight: "120%" }}>
            The Manifestation App
          </p>

          <div className="name-headline-wrap overflow-hidden">
            <div ref={pathRef} className="name-headline-path flex w-max">
              {MARQUEE_HEADLINES.map((text, i) => (
                <div key={i} className={`name-headline-block flex-none ${i > 0 ? "view-p" : ""}`}>
                  {i === 0 ? (
                    <AnimatedSplitText
                      preset="from-right-blur"
                      as="p"
                      className="name-headline text-white text-center"
                      style={{ fontSize: "13.2rem", letterSpacing: "-0.875rem", fontWeight: 500, lineHeight: "120%" }}
                      text={text}
                    />
                  ) : (
                    <p className="name-headline text-white text-center" style={{ fontSize: "13.2rem", letterSpacing: "-0.875rem", fontWeight: 500, lineHeight: "120%" }}>
                      {text}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="name-bg-wrapper absolute inset-0">
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
      </div>
    </section>
  );
}
