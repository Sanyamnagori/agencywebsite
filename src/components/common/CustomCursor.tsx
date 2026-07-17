"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) {
      cursor.style.display = "none";
      return;
    }

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    const isInteractive = (target: HTMLElement) =>
      target.tagName === "A" ||
      target.tagName === "BUTTON" ||
      !!target.closest("a") ||
      !!target.closest("button") ||
      !!target.closest("[data-hover-button]") ||
      target.classList.contains("hover-target");

    const handleMouseEnter = (e: MouseEvent) => {
      if (!isInteractive(e.target as HTMLElement)) return;
      // Expand width + enable difference blend mode
      cursor.style.width = "12rem";
      cursor.style.mixBlendMode = "difference";
      cursor.style.backgroundColor = "#ffffff";
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (!isInteractive(e.target as HTMLElement)) return;
      cursor.style.width = "2rem";
      cursor.style.mixBlendMode = "normal";
      cursor.style.backgroundColor = "#9780ff";
    };

    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[99999]"
      style={{
        width: "2rem",
        height: "2rem",
        borderRadius: "9999px",
        backgroundColor: "#9780ff",
        mixBlendMode: "normal",
        transform: "translate(-50%, -50%)",
        willChange: "transform, width",
        transition: "width 0.35s cubic-bezier(0.25,1,0.5,1), background-color 0.35s ease, mix-blend-mode 0s",
      }}
    />
  );
}
