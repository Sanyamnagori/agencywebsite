"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ASSETS } from "@/lib/assets";
import { HoverLink } from "@/components/common/Animations";
import { useWaitlist } from "@/context/WaitlistContext";
import MainButton from "@/components/common/MainButton";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const contentRef = useRef<HTMLDivElement>(null);
  const { openWaitlist } = useWaitlist();

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const tween = gsap.fromTo(
      content,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: content, start: "top 90%" },
      }
    );

    return () => {
      (tween.scrollTrigger as ScrollTrigger | undefined)?.kill();
    };
  }, []);

  const socials = [
    { name: "Instagram", href: "https://www.instagram.com/superconscious.io" },
    { name: "Tik Tok",   href: "https://www.tiktok.com/@superconscious.io" },
    { name: "Twitter X", href: "https://www.twitter.com/superconsciousx" },
    { name: "Linkedin",  href: "https://www.linkedin.com/company/superconscious/" },
  ];

  return (
    <footer id="contacts" className="footer-sc relative overflow-hidden bg-[#0c0b0c]">
      <section className="footer-sc">
        <div ref={contentRef} className="container footer-s relative z-10 opacity-0" style={{ padding: "0 4.2rem" }}>
          <div className="footer-top-block flex justify-between items-start" style={{ padding: "4.2rem 0", borderBottom: "0.1rem solid rgba(255,255,255,0.2)" }}>
            <div className="footer-mail-block flex flex-col gap-2">
              <p className="body-main text-white opacity-80" style={{ fontSize: "1.1rem" }}>Live Limitless</p>
              <a href="mailto:hello@superconscious.io" className="footer-mail-link text-white no-underline hover:opacity-80 transition-opacity" style={{ fontSize: "3.3rem", letterSpacing: "-0.16667rem", lineHeight: "120%" }}>
                hello@superconscious.io
              </a>
            </div>

            <div className="footer-download-app flex flex-col" style={{ gap: "1.4rem", padding: "1.2rem", borderRadius: "1.6rem", backdropFilter: "blur(1rem)", WebkitBackdropFilter: "blur(1rem)", background: "rgba(255,255,255,0.1)" }}>
              <div className="hero-download-text flex flex-col">
                <span className="body-middle text-white font-medium" style={{ fontSize: "1.38rem" }}>Upgrade Your Reality</span>
                <span className="body-main text-white opacity-80" style={{ fontSize: "1.1rem" }}>Join the waitlist and get priority access</span>
              </div>
              <div className="hero-download-buttons">
                <MainButton onClick={openWaitlist}>Join Waitlist</MainButton>
              </div>
            </div>
          </div>

          <nav className="footer-middle-block footer-media-links flex flex-wrap justify-between gap-8" style={{ padding: "4.2rem 0", borderBottom: "0.1rem solid rgba(255,255,255,0.2)" }}>
            {socials.map((s) => (
              <HoverLink key={s.name} href={s.href} target="_blank" className="footer-media-link text-white text-[1.1rem]" label={s.name} />
            ))}
          </nav>

          <div className="footer-down-block relative flex flex-col" style={{ paddingTop: "4.2rem", paddingBottom: "2rem", gap: "4.2rem" }}>
            <div className="overflow-hidden leading-none">
              <span className="footer-name footer-name-text inline-block font-semibold text-white leading-none" style={{ fontSize: "9.5rem", fontWeight: 600, opacity: 0.04, lineHeight: "100%", letterSpacing: "-0.05em" }} aria-hidden>
                SUPERCONSCIOUS
              </span>
            </div>

            <div className="footer-down-info flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <p className="policy-link-ref text-white/30" style={{ fontSize: "1.1rem" }}>© 2025 Superconscious. All Rights Reserved.</p>
              <div className="footer-policy-links flex gap-6">
                <a href="#" className="policy-link-ref text-white/30 hover:text-white/60 transition-colors" style={{ fontSize: "1.1rem" }}>Privacy policy</a>
                <a href="#" className="policy-link-ref text-white/30 hover:text-white/60 transition-colors" style={{ fontSize: "1.1rem" }}>Terms and conditions</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
