"use client";

import { useRef } from "react";
import gsap from "gsap";

interface MainButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "outline";
  className?: string;
  type?: "button" | "submit";
}

export default function MainButton({
  children,
  onClick,
  variant = "default",
  className = "",
  type = "button",
}: MainButtonProps) {
  const bgRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    if (!bgRef.current) return;
    gsap.to(bgRef.current, { scaleX: 1, duration: 0.5, ease: "power3.out" });
  };

  const handleLeave = () => {
    if (!bgRef.current) return;
    gsap.to(bgRef.current, { scaleX: 0, duration: 0.5, ease: "power3.out" });
  };

  const isOutline = variant === "outline";

  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`relative flex items-center justify-center font-medium text-[0.98rem] leading-[150%] px-[1.68rem] py-[1.04rem] rounded-[1.1rem] overflow-hidden cursor-pointer ${className}`}
      style={{
        border: isOutline ? "0.1rem solid white" : "none",
        background: isOutline ? "transparent" : "white",
        color: isOutline ? "white" : "#0c0b0c",
      }}
    >
      {/* Hover fill — scaleX 0→1, origin left */}
      <div
        ref={bgRef}
        className="absolute inset-0 rounded-[1.1rem]"
        style={{
          backgroundColor: isOutline ? "white" : "#e8e8e8",
          transform: "scaleX(0)",
          transformOrigin: "left center",
        }}
      />
      {/* Text with mix-blend-mode: exclusion so it inverts over the fill */}
      <span
        className="relative z-10 pointer-events-none select-none"
        style={{ mixBlendMode: "exclusion", color: "white" }}
      >
        {children}
      </span>
    </button>
  );
}
