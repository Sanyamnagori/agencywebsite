"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ASSETS } from "@/lib/assets";
import LottieAnim from "@/components/common/LottieAnim";
import { AnimatedSplitText } from "@/components/common/Animations";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    id: "s1", top: "33%", left: "19%",
    icon: ASSETS.hwIcon1,
    title: "Input Your Current Reality & Desired Results",
    body: "Reflect on where you are and where you want to be.",
    descW: "14rem",
  },
  {
    id: "s2", top: "40%", left: "55%",
    icon: ASSETS.hwIcon2,
    title: "Superconscious AI Analyzes Subconscious Patterns & Beliefs",
    body: "Receive tailored meditations, journaling prompts, and insights.",
    descW: "14rem",
  },
  {
    id: "s3", top: "63%", left: "15%",
    icon: ASSETS.hwIcon3,
    title: "Superconscious AI Creates Your Personalized Manifestation Journey",
    body: "Experience a personalized path to clarity, focus, and manifestation",
    descW: "14rem",
  },
  {
    id: "s4", top: "72%", right: "14%",
    icon: ASSETS.hwIcon4,
    title: "Adapt and Grow with Superconscious",
    body: "Transform Your Mindset and Results",
    descW: "13rem",
  },
];

const widgets = [
  { id: "s5", top: "17%",  left: "11%",  src: ASSETS.hwWidget1, w: "12.5rem" },
  { id: "s6", top: "27%",  left: "45%",  src: ASSETS.hwWidget2, w: "9rem"    },
  { id: "s7", top: "52%",  right: "7%",  src: ASSETS.hwWidget3, w: "14rem"   },
  { id: "s8", top: "81%",  right: "37%", src: ASSETS.hwWidget4, w: "16rem"   },
  { id: "s9", bottom: "0", left: "26%",  src: ASSETS.hwWidget5, w: "11rem"   },
];

function HwCard({ icon, title, body, descW }: { icon: string; title: string; body: string; descW: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || window.innerWidth < 992) return;

    let oldX = 0, oldY = 0, deltaX = 0, deltaY = 0;
    const onMove = (e: MouseEvent) => {
      deltaX = e.clientX - oldX;
      deltaY = e.clientY - oldY;
      oldX = e.clientX;
      oldY = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const onEnter = () => {
      gsap.to(el, {
        x: deltaX * 4,
        y: deltaY * 4,
        rotate: (Math.random() - 0.5) * 8,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(el, { x: 0, y: 0, rotate: 0, duration: 0.6, ease: "power2.out" });
        },
      });
    };

    el.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <div ref={cardRef} className="hw-card-block hw-card-stroke inline-block rounded-[1.95rem] p-[0.1rem]" style={{ background: "linear-gradient(126deg, #ddb5fc, #1a1a1a 50%)" }}>
      <div className="hw-card relative flex flex-col gap-[1.4rem] rounded-[1.94rem] overflow-hidden" style={{ background: "#1a1a1a", padding: "3rem 2.2rem" }}>
        <div className="hw-blur absolute pointer-events-none" style={{ width: "12.5rem", aspectRatio: "1", filter: "blur(6rem)", background: "#edc5fc", opacity: 0.25, top: "-20%", left: "-20%" }} />
        <div className="hw-card-icon w-[3.88rem] h-[3.88rem] rounded-full p-[0.4rem] flex items-center justify-center flex-shrink-0" style={{ background: "#2c2c2c", border: "0.2rem solid #000", outline: "0.1rem solid #ecc5fc", boxShadow: "0 5.6px 11.2px rgba(0,0,0,0.25)" }}>
          <img src={icon} alt="" className="w-full h-full object-contain" />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="headline-h4 text-white font-medium leading-[120%]" style={{ fontSize: "1.38rem", maxWidth: "16rem" }}>{title}</h3>
          <p className="body-main text-white opacity-80 leading-[150%]" style={{ fontSize: "1.1rem", width: descW }}>{body}</p>
        </div>
        <div className="hw-star-point how-work-star absolute pointer-events-none" style={{ inset: "auto 0 0 auto", width: "31rem", backgroundImage: `url(${ASSETS.hwStar})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", aspectRatio: "1" }} />
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // --- Cards Scrub Animation ---
    const items = section.querySelectorAll<HTMLElement>(".hw-item");
    // Start all items well below the screen
    gsap.set(items, { scale: 0.6, opacity: 0, y: "100vh" });

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

    // 1. Float them continuously upward with a linear ease so they never feel static
    tl.to(items, {
      y: "-120vh",
      duration: 1,
      stagger: 0.1,
      ease: "none",
    }, 0);

    // 2. Fade and scale them in quickly at the beginning of their upward float
    tl.to(items, {
      opacity: 1,
      scale: 1,
      duration: 0.2,
      stagger: 0.1,
      ease: "power2.out",
    }, 0);

    return () => {
      tl.kill();
      ScrollTrigger.getAll()
        .filter((t) => t.vars.trigger === section)
        .forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="how-work-sc relative bg-[#0c0b0c] h-screen w-full overflow-hidden">
      <div className="container how-work-s mx-auto relative h-full w-full">
        <AnimatedSplitText
          preset="from-right-blur"
          as="h2"
          staggerOverride={0.05}
          className="how-work-headline absolute text-center text-white font-semibold leading-[120%] pointer-events-none select-none"
          style={{ fontSize: "13.2rem", letterSpacing: "-0.79167rem", fontWeight: 600, width: "100rem", maxWidth: "100vw", top: 0 }}
          text={
            <>
              Upgrade<span className="your-space-span">&nbsp;Your&nbsp;</span>
              <span className="hw-italic" style={{ fontSize: "13.8rem", color: "#666", fontFamily: "var(--font-tiro)", fontStyle: "italic", fontWeight: 400 }}>Reality</span>
            </>
          }
        />

        <div className="how-work-widgets-front absolute inset-0" style={{ zIndex: 500 }}>
          {cards.map((card) => {
            const pos: React.CSSProperties = { position: "absolute" };
            if (card.top) pos.top = card.top;
            if (card.left) pos.left = card.left;
            if ((card as { right?: string }).right) pos.right = (card as { right?: string }).right;
            return (
              <div key={card.id} className={`hw-position hw-item hw-view ${card.id}`} style={pos}>
                <HwCard icon={card.icon} title={card.title} body={card.body} descW={card.descW} />
              </div>
            );
          })}

          {widgets.map((w) => {
            const pos: React.CSSProperties = { position: "absolute", width: w.w };
            if (w.top) pos.top = w.top;
            if (w.left) pos.left = w.left;
            if ((w as { right?: string }).right) pos.right = (w as { right?: string }).right;
            if ((w as { bottom?: string }).bottom) pos.bottom = (w as { bottom?: string }).bottom;
            return (
              <div key={w.id} className={`hw-position hw-item how-work-widget hw-view ${w.id}`} style={pos}>
                <LottieAnim src={w.src} loop autoplay className="w-full" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
