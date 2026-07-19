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

            <div className="footer-download-app flex flex-col items-start gap-5">
              <div className="hero-download-text flex flex-col gap-1">
                <span className="body-middle text-white font-medium" style={{ fontSize: "1.38rem" }}>Upgrade Your Reality</span>
                <span className="body-main text-white opacity-80" style={{ fontSize: "1.1rem" }}>Join the waitlist and get priority access</span>
              </div>
              <div className="hero-download-buttons">
                <MainButton onClick={openWaitlist}>Join Waitlist</MainButton>
              </div>
            </div>
          </div>

          <nav className="footer-middle-block flex justify-between items-center w-full" style={{ padding: "4.2rem 0", borderBottom: "0.1rem solid rgba(255,255,255,0.2)" }}>
            {socials.map((s) => (
              <HoverLink key={s.name} href={s.href} target="_blank" className="footer-media-link text-white text-[1.38rem]" label={s.name} />
            ))}
          </nav>

          {/* Purple Aura */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[50vh] pointer-events-none" style={{
            background: "radial-gradient(ellipse at bottom center, rgba(120, 40, 255, 0.35) 0%, rgba(12, 11, 12, 0) 70%)",
            filter: "blur(50px)",
            zIndex: 0
          }} />

          <div className="footer-down-block relative z-10 flex flex-col w-full" style={{ paddingTop: "4.2rem", paddingBottom: "2rem", gap: "4.2rem" }}>
            <div className="w-full flex justify-center overflow-hidden leading-none" style={{ containerType: "inline-size" }}>
              <span className="footer-name footer-name-text inline-block font-semibold text-white leading-none" style={{ fontSize: "10.8cqw", fontWeight: 600, opacity: 1, lineHeight: "100%", letterSpacing: "-0.05em" }} aria-hidden>
                SUPERCONSCIOUS
              </span>
            </div>

            <div className="footer-down-info flex flex-col md:flex-row justify-between items-center w-full pt-4">
              <p className="policy-link-ref text-white/60" style={{ fontSize: "1.1rem" }}>© 2025 Superconscious. All Rights Reserved.</p>
              <div className="footer-policy-links flex gap-6">
                <a href="#" className="policy-link-ref text-white/60 hover:text-white transition-colors" style={{ fontSize: "1.1rem" }}>Privacy policy</a>
                <a href="#" className="policy-link-ref text-white/60 hover:text-white transition-colors" style={{ fontSize: "1.1rem" }}>Terms and conditions</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
