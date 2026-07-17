"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/common/Header";
import CustomCursor from "@/components/common/CustomCursor";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: "Tommy McCarthy",
    role: "Co-Chief Executive Officer / Co-Founder",
    linkedin: "https://www.linkedin.com/in/tommy-mccarthy",
    color: "from-blue-900 to-blue-800",
    initial: "TM",
  },
  {
    name: "Tom McCarthy",
    role: "Chief Learning Officer / Co-Founder",
    linkedin: "https://www.linkedin.com/in/tom-mccarthy-breakthrough",
    color: "from-red-900 to-red-800",
    initial: "TM",
  },
  {
    name: "Cheng Ruan, MD",
    role: "Co-Chief Executive Officer / Co-Founder",
    linkedin: "https://www.linkedin.com/in/healthydoc",
    color: "from-yellow-800 to-yellow-700",
    initial: "CR",
  },
];

export default function MissionPage() {
  useEffect(() => {
    gsap.fromTo(".mission-title-char",
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.0, stagger: 0.05, delay: 0.3, ease: "power4.out" }
    );
    gsap.fromTo(".mission-content",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9, delay: 0.6, ease: "power3.out" }
    );
    gsap.fromTo(".team-card",
      { opacity: 0, y: 40, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".team-grid", start: "top 80%" } }
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <main className="bg-[#000000] min-h-screen overflow-x-hidden">
      <CustomCursor />
      <Header />

      {/* Hero */}
      <section className="relative pt-36 pb-24 px-6 lg:px-16 overflow-hidden">
        {/* Blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] rounded-full opacity-[0.06] blur-[100px] pointer-events-none"
          style={{ background: "radial-gradient(circle, #9780ff 0%, #4040c8 50%, transparent 70%)" }} />

        <div className="relative max-w-4xl">
          {/* Label capsule */}
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-10">
            <div className="w-5 h-5 flex-shrink-0">
              <svg viewBox="0 0 28 28" fill="none" className="w-full h-full">
                <circle cx="14" cy="14" r="10" stroke="rgba(151,128,255,0.8)" strokeWidth="0.8" />
                <circle cx="14" cy="14" r="6" stroke="rgba(151,128,255,0.5)" strokeWidth="0.8" />
                <circle cx="14" cy="4" r="10" stroke="rgba(151,128,255,0.2)" strokeWidth="0.6" />
                <circle cx="14" cy="24" r="10" stroke="rgba(151,128,255,0.2)" strokeWidth="0.6" />
              </svg>
            </div>
            <span className="font-sans text-white/60 text-[0.65rem] uppercase tracking-[0.2em]">Mission</span>
          </div>

          {/* Main title */}
          <div className="overflow-hidden mb-4">
            <h1 className="font-sans font-medium leading-tight text-white" style={{ fontSize: "clamp(3.5rem, 8vw, 8rem)", letterSpacing: "-0.04em" }}>
              {"Mission".split("").map((c, i) => (
                <span key={i} className="mission-title-char inline-block will-change-transform">{c}</span>
              ))}
            </h1>
          </div>

          {/* Subtitle */}
          <p className="mission-content font-sans text-accent/80 text-xl lg:text-2xl font-medium tracking-tight mb-16">
            Elevating Global Consciousness
          </p>

          {/* Mission statement */}
          <div className="mission-content grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h2 className="font-sans font-semibold text-white text-2xl lg:text-3xl leading-snug tracking-tight mb-6">
                Our mission is to elevate global consciousness.
              </h2>
            </div>
            <div className="flex flex-col gap-5">
              <p className="font-sans text-white/50 text-base leading-relaxed">
                Superconscious is built on the belief that every person has the capacity to create the life they desire. We combine cutting-edge AI with proven psychological principles to remove the invisible barriers that keep people stuck.
              </p>
              <p className="font-sans text-white/50 text-base leading-relaxed">
                Our technology doesn&apos;t just help you set goals — it rewires the subconscious patterns that have been holding you back. When your inner world shifts, your outer world follows.
              </p>
              <p className="font-sans text-white/50 text-base leading-relaxed">
                We believe that a world of fully conscious, fully empowered individuals is a better world for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-white/5 mx-0" />

      {/* Team Section */}
      <section className="px-6 lg:px-16 py-24 lg:py-32">
        <p className="font-sans text-[0.6rem] uppercase tracking-[0.3em] text-white/30 mb-16">§ Team</p>

        <div className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, i) => (
            <div key={i} className="team-card group">
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                className="block rounded-2xl overflow-hidden border border-white/8 hover:border-accent/30 transition-all duration-500">
                {/* Color card top */}
                <div className={`bg-gradient-to-br ${member.color} h-48 flex items-center justify-center relative`}>
                  <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                    <span className="font-sans font-bold text-white text-2xl">{member.initial}</span>
                  </div>
                  {/* LinkedIn badge */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white opacity-70">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 bg-white/[0.02]">
                  <h3 className="font-sans font-semibold text-white text-base mb-1 group-hover:text-accent transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="font-sans text-white/40 text-xs leading-relaxed">{member.role}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Footer bottom strip */}
      <div className="border-t border-white/5 px-6 lg:px-16 py-8 flex justify-between items-center">
        <span className="font-sans text-white/20 text-[0.6rem] uppercase tracking-[0.2em]">© 2025 Superconscious. All Rights Reserved.</span>
        <div className="flex gap-6">
          <a href="#" className="font-sans text-white/20 text-[0.6rem] uppercase tracking-[0.15em] hover:text-white/50 transition-colors duration-300">Privacy policy</a>
          <a href="#" className="font-sans text-white/20 text-[0.6rem] uppercase tracking-[0.15em] hover:text-white/50 transition-colors duration-300">Terms and conditions</a>
        </div>
      </div>
    </main>
  );
}
