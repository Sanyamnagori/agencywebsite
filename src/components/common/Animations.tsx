"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// HoverLink (for navigation / footer links)
// ==========================================
export function HoverLink({
  href,
  label,
  className,
  target,
}: {
  href: string;
  label: string;
  className?: string;
  target?: string;
}) {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const originalRef  = useRef<HTMLDivElement>(null);
  const cloneRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !originalRef.current || !cloneRef.current) return;

    const originalSplit = new SplitType(originalRef.current, { types: "chars" });
    const cloneSplit    = new SplitType(cloneRef.current,    { types: "chars" });

    const tl = gsap.timeline({ paused: true });
    gsap.set(cloneSplit.chars, { yPercent: 100, opacity: 0, filter: "blur(0.2rem)" });

    tl.to(originalSplit.chars,
      { yPercent: -100, opacity: 0, filter: "blur(0.2rem)", stagger: 0.02, duration: 0.5, ease: "back.inOut(1.7)" },
      0
    ).to(cloneSplit.chars,
      { yPercent: 0, opacity: 1, filter: "blur(0rem)", stagger: 0.02, duration: 0.5, ease: "back.inOut(1.7)" },
      0.1
    );

    const onMouseEnter = () => tl.play();
    const onMouseLeave = () => tl.reverse();

    const el = containerRef.current;
    el.addEventListener("mouseenter", onMouseEnter);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      el.removeEventListener("mouseenter", onMouseEnter);
      el.removeEventListener("mouseleave", onMouseLeave);
      originalSplit.revert();
      cloneSplit.revert();
      tl.kill();
    };
  }, [label]);

  const inner = (
    <div className="relative overflow-hidden inline-flex">
      <div ref={originalRef} className="opacity-100">{label}</div>
      <div ref={cloneRef} className="absolute top-0 left-0">{label}</div>
    </div>
  );

  if (href.startsWith("http") || href.startsWith("mailto")) {
    return (
      <a ref={containerRef} href={href} target={target} className={className}
         rel={target === "_blank" ? "noopener noreferrer" : undefined}>
        {inner}
      </a>
    );
  }

  return (
    <Link ref={containerRef} href={href} target={target} className={className}>
      {inner}
    </Link>
  );
}

// ==========================================
// AnimatedSplitText (for headings / body)
// ==========================================
type Preset = "from-down-blur" | "from-right-blur";

export function AnimatedSplitText({
  text,
  preset = "from-down-blur",
  as: Component = "div",
  className,
  style,
  delay = 0,
  staggerOverride,
}: {
  text: React.ReactNode;
  preset?: Preset;
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  staggerOverride?: number;
}) {
  const elRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!elRef.current) return;
    const el = elRef.current;
    gsap.set(el, { visibility: "visible" });

    let split: SplitType;
    let fromState: gsap.TweenVars = {};
    let toState: gsap.TweenVars   = {};
    let stagger  = 0.05;
    let duration = 1.5;
    let ease     = "power3.out";
    let targets: HTMLElement[] | null = null;

    if (preset === "from-down-blur") {
      split   = new SplitType(el, { types: "lines,words" });
      targets = split.lines;
      fromState = { opacity: 0, y: "50%", filter: "blur(0.2rem)" };
      toState   = { opacity: 1, y: 0,     filter: "blur(0rem)"   };
      stagger   = staggerOverride ?? 0.2;
      ease      = "power2.out";
    } else {
      split   = new SplitType(el, { types: "chars,words" });
      targets = split.chars;
      fromState = { opacity: 0, x: "6rem", filter: "blur(0.6rem)", scale: 1.2 };
      toState   = { opacity: 1, x: 0,      filter: "blur(0rem)",   scale: 1   };
      stagger   = staggerOverride ?? 0.05;
      ease      = "back.out(1.2)";
    }

    if (!targets) return;

    gsap.set(targets, fromState);

    // Use a small positive offset so the trigger is already visible above the fold
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        setTimeout(() => {
          gsap.to(targets!, {
            ...toState,
            duration,
            stagger,
            ease,
          });
        }, delay * 1000);
      },
    });

    return () => {
      trigger.kill();
      split.revert();
    };
  }, [text, preset, delay, staggerOverride]);

  return (
    <Component ref={elRef} className={className} style={{ ...style, visibility: "hidden" }}>
      {text}
    </Component>
  );
}

// ==========================================
// ViewItem (scale / opacity scroll reveal)
// ==========================================
export function ViewItem({
  children,
  className,
  style,
  type    = "from-center",
  delay   = 0,
  instant = false,   // pass true for above-fold items that should animate on mount
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  type?: "from-center" | "from-down";
  delay?: number;
  instant?: boolean;
}) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elRef.current) return;
    const el = elRef.current;

    const fromState: gsap.TweenVars =
      type === "from-center"
        ? { scale: 0.6, opacity: 0 }
        : { scale: 0.6, y: "50%", opacity: 0 };

    const toState: gsap.TweenVars =
      type === "from-center"
        ? { scale: 1, opacity: 1 }
        : { scale: 1, y: "0%", opacity: 1 };

    gsap.set(el, fromState);

    if (instant) {
      // Animate immediately on mount (for above-the-fold items)
      gsap.to(el, { ...toState, duration: 2, ease: "power2.out", delay });
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        setTimeout(() => {
          gsap.to(el, { ...toState, duration: 2, ease: "power2.out" });
        }, delay * 1000);
      },
    });

    return () => trigger.kill();
  }, [type, delay, instant]);

  return (
    <div ref={elRef} className={className} style={style}>
      {children}
    </div>
  );
}
