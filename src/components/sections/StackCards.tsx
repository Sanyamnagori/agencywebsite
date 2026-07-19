"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ASSETS } from "@/lib/assets";
import Particles from "@/components/common/Particles";
import CardGradientBorder from "@/components/common/CardGradientBorder";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    id: "s1",
    wrapperClass: "s1",
    gradientVariant: "default" as const,
    bg: ASSETS.stackBg1,
    bgPos: "center",
    tag: "For Individuals",
    title: "Manifest Your Dream Life",
    body: "Superconscious helps you break through mental barriers, reframe subconscious beliefs, and unlock your highest potential in every area of life. No matter what you're seeking, Superconscious is your personalized guide to transformation.",
    imageDesk: ASSETS.stackPhone,
    imageMob: ASSETS.stackPhone,
    imageStyle: { bottom: 0, right: "17.8%", width: "22rem" },
    gradientPos: { top: "50%", left: "50%", transform: "translate(-50%,-50%)" },
  },
  {
    id: "s2",
    wrapperClass: "s2",
    gradientVariant: "s2" as const,
    bg: ASSETS.stackBg2,
    bgPos: "50%",
    tag: "For Business",
    title: "Empower Your Team to Achieve More",
    body: "Superconscious for Business helps you unlock the full potential of your team by transforming mindsets, eliminating mental barriers, and creating a culture of peak performance. When your team members think and operate at their highest level, extraordinary results follow.",
    imageDesk: ASSETS.stackTablet,
    imageMob: ASSETS.stackTabletMobile,
    imageStyle: { bottom: 0, right: 0, width: "43rem" },
    gradientPos: { bottom: "-2%", left: "10%", top: "auto" },
  },
];

export default function StackCards() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cardEls = container.querySelectorAll<HTMLElement>(".stack-card-wrapper");

    // Use a unified timeline for pinning and sequencing the cards
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `+=${(cardEls.length - 1) * 200}vh`, // Generous scroll distance for the slide
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    cardEls.forEach((card, i) => {
      // Enter animation for cards after the first one (they start below the screen)
      if (i > 0) {
        gsap.set(card, { y: "100vh" });
        tl.to(card, {
          y: 0, 
          ease: "none",
          duration: 1
        }, (i - 1) * 1); // Slide in exactly as the previous card slides out
      }
      
      // Exit animation for cards before the last one (they slide up and out of the screen)
      if (i < cardEls.length - 1) {
        tl.to(card, {
          y: "-100vh", // Go upside!
          ease: "none",
          duration: 1
        }, i * 1); 
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id="for-whom" className="stack-sc relative bg-[#0c0b0c]">
      <div ref={containerRef} className="stack-sticky h-screen flex items-center justify-center overflow-hidden">
        <div className="container stack-s relative w-full flex items-center justify-center" style={{ padding: "0 5.56rem", height: "80vh" }}>
            {cards.map((card, i) => (
              <div
                key={card.id}
                className={`stack-card-wrapper stack-card ${card.wrapperClass} absolute inset-0 flex items-center justify-center`}
                style={{ zIndex: i + 1, transformOrigin: "50% 0%" }}
              >
                <div className="w-full flex justify-center">
                  <div className="stack-card-stroke relative overflow-hidden" style={{ background: "#4a494b", borderRadius: "2rem", width: "84rem", maxWidth: "100%", height: "42rem", padding: "0.1rem" }}>
                    <CardGradientBorder variant={card.gradientVariant} />
                    <div
                      className={`stack-card-inner stack-card ${card.id} relative w-full h-full overflow-hidden flex`}
                      style={{
                        borderRadius: "1.95rem",
                        backgroundImage: `url(${card.bg})`,
                        backgroundSize: "cover",
                        backgroundPosition: card.bgPos,
                        backgroundRepeat: "no-repeat",
                        backgroundColor: "#0f0d10",
                        padding: "8.8rem 8.2rem",
                      }}
                    >
                      <Particles style={{ zIndex: 150 }} />
                      <div className="absolute pointer-events-none" style={{ background: "linear-gradient(78deg, #4a494b 17%, #e73825 48%, #7b5ce0 72%, #4a494b)", filter: "blur(4rem)", height: "100rem", width: "100rem", ...card.gradientPos, opacity: 0.35 }} />
                      <div className="stack-circle absolute pointer-events-none" style={{ right: 0, top: 0, bottom: 0, width: "52rem", aspectRatio: "1", opacity: 0.5, backgroundImage: `url(${ASSETS.stackCircle})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "right center" }} />

                      <div className="relative flex flex-col gap-6" style={{ zIndex: 200, maxWidth: "38rem" }}>
                        <span className="stact-tag inline-block w-fit rounded-full border" style={{ color: "#b9a3ff", fontSize: "1.1rem", paddingBottom: "1.1rem", borderColor: "rgba(185,163,255,0.27)", letterSpacing: "0.05em" }}>{card.tag}</span>
                        <h2 className="headline-h2 text-white font-normal leading-[120%]" style={{ fontSize: "3rem", fontWeight: 400, letterSpacing: "-0.12222rem" }}>{card.title}</h2>
                        <p className="body-main text-white/80 leading-[150%]" style={{ fontSize: "1.1rem", maxWidth: "28rem" }}>{card.body}</p>
                      </div>

                      <img src={card.imageDesk} alt="" className="stack-image-d absolute object-contain" style={{ ...card.imageStyle, zIndex: 200, position: "absolute" }} />
                      <img src={card.imageMob} alt="" className="stack-image-p absolute object-contain" style={{ ...card.imageStyle, zIndex: 200, position: "absolute" }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </section>
  );
}
