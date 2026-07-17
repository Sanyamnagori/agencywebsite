"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { ASSETS } from "@/lib/assets";
import { HoverLink } from "./Animations";
import LottieAnim from "./LottieAnim";
import Particles from "./Particles";

const socials = [
  { name: "Instagram", href: "https://www.instagram.com/superconscious.io" },
  { name: "Tik Tok",   href: "https://www.tiktok.com/@superconscious.io" },
  { name: "Twitter X", href: "https://www.twitter.com/superconsciousx" },
  { name: "Linkedin",  href: "https://www.linkedin.com/company/superconscious/" },
];

export default function Header() {
  const headerRef   = useRef<HTMLElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /* ── Desktop entrance animation ── */
  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(
      headerRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: "power3.out" }
    );
  }, []);

  /* ── Mobile overlay open/close ── */
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        overlay,
        { autoAlpha: 0, y: "-5%" },
        { autoAlpha: 1, y: "0%", duration: 0.45, ease: "power3.out" }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(overlay, { autoAlpha: 0, y: "-5%", duration: 0.35, ease: "power3.in" });
    }
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((v) => !v);
  const closeMenu  = () => setIsMenuOpen(false);

  return (
    <>
      {/* ── Desktop / shared header bar ── */}
      <header
        ref={headerRef}
        className="header header-bar-mobile fixed top-0 left-0 right-0 z-[9000] flex justify-center pt-[1.68rem] pointer-events-none max-[479px]:pt-0"
        style={{ opacity: 0 }}
      >
        <div
          className="nav-container-ref pointer-events-auto flex items-center gap-[0.84rem] px-[0.56rem] py-[0.56rem] rounded-[1.1rem]"
          style={{
            backdropFilter: "blur(1rem)",
            WebkitBackdropFilter: "blur(1rem)",
            background: "rgba(255,255,255,0.1)",
          }}
        >
          <Link href="/" className="brand brand-ref w-[2.5rem] h-[2.5rem] aspect-square flex-shrink-0">
            <div className="brand-logo-desk w-full h-full">
              <img src={ASSETS.brandLogoDesk} alt="Superconscious" className="w-full h-full object-contain" />
            </div>
            <div className="brand-logo w-full h-full">
              <img src={ASSETS.brandLogo} alt="Superconscious" className="w-full h-full object-contain" />
            </div>
          </Link>

          <nav className="hidden min-[480px]:flex items-center">
            <HoverLink
              href="/#how-it-works"
              label="How it Works"
              className="text-white text-[0.98rem] leading-none px-[0.84rem] py-[0.4rem]"
            />
            <HoverLink
              href="/mission"
              label="Mission"
              className="text-white text-[0.98rem] leading-none px-[0.84rem] py-[0.4rem]"
            />
          </nav>

          {/*
            menu-button — visible only on mobile (< sm breakpoint)
            Contains Lottie hamburger animation
          */}
          <button
            className="menu-button max-[479px]:flex hidden items-center justify-center w-[2.5rem] h-[2.5rem] rounded-[0.6rem] pointer-events-auto"
            style={{ background: "rgba(255,255,255,0.08)" }}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <LottieAnim
              src={ASSETS.menuLottie}
              loop={isMenuOpen}
              autoplay={isMenuOpen}
              className="w-[1.8rem] h-[1.8rem]"
            />
          </button>
        </div>
      </header>

      {/* ── Mobile full-screen overlay ── */}
      {/*
        position:fixed; inset:0; width:100%; height:100vh; z-index:8999
        background-image: url(menuBg); background-size:cover; background-position:50%
        Only renders in DOM when needed; GSAP handles visibility
      */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[8999] flex flex-col overflow-hidden"
        style={{
          width: "100%",
          height: "100vh",
          backgroundImage: `url(${ASSETS.menuBg})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          backgroundColor: "#0c0b0c",
          visibility: "hidden",
          opacity: 0,
        }}
      >
        {/* Particles inside overlay */}
        <Particles backCount={40} frontCount={20} />

        {/* Close tap target on background */}
        <div className="absolute inset-0" onClick={closeMenu} />

        {/*
          nav-links: display:flex; flex-direction:column; gap:12.8rem;
          padding-top:24rem; padding-left:10rem
          Nav items at font-size:5.86rem
        */}
        <nav
          className="relative z-10 flex flex-col"
          style={{ gap: "4rem", paddingTop: "14rem", paddingLeft: "6rem" }}
          onClick={closeMenu}
        >
          <Link
            href="/#how-it-works"
            className="text-white font-medium leading-none hover:opacity-70 transition-opacity"
            style={{ fontSize: "5.86rem", letterSpacing: "-0.04em" }}
          >
            How it Works
          </Link>
          <Link
            href="/mission"
            className="text-white font-medium leading-none hover:opacity-70 transition-opacity"
            style={{ fontSize: "5.86rem", letterSpacing: "-0.04em" }}
          >
            Mission
          </Link>
        </nav>

        {/*
          nav-menu-down-links: position:absolute; bottom:0; left:0;
          padding: 0 10rem 10rem
          display:flex; flex-direction:column; gap:6rem
          Contains: tagline, email, social row
        */}
        <div
          className="absolute bottom-0 left-0 z-10 flex flex-col"
          style={{ padding: "0 6rem 6rem", gap: "2.4rem" }}
        >
          <p className="text-white opacity-60" style={{ fontSize: "1.38rem" }}>
            Unlock Your Limitless Potential
          </p>

          <a
            href="mailto:hello@superconscious.io"
            className="text-white hover:opacity-80 transition-opacity"
            style={{ fontSize: "2rem", letterSpacing: "-0.04em" }}
          >
            hello@superconscious.io
          </a>

          {/* Social links row */}
          <div className="flex flex-wrap gap-6">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white opacity-60 hover:opacity-100 transition-opacity"
                style={{ fontSize: "1.1rem" }}
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
