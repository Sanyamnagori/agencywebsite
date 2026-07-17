"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ASSETS } from "@/lib/assets";
import { useWaitlist } from "@/context/WaitlistContext";
import MainButton from "./MainButton";
import Particles from "./Particles";
import CardGradientBorder from "./CardGradientBorder";

type FormState = "idle" | "success" | "error";

export default function WaitlistModal() {
  const { isOpen, closeWaitlist } = useWaitlist();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");

  useEffect(() => {
    if (!overlayRef.current) return;
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(overlayRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: "power2.out" });
    } else {
      document.body.style.overflow = "";
      gsap.set(overlayRef.current, { autoAlpha: 0 });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nErr = !name.trim();
    const eErr = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setNameError(nErr);
    setEmailError(eErr);
    if (nErr || eErr) return;
    setFormState("success");
  };

  const handleClose = () => {
    closeWaitlist();
    setTimeout(() => {
      setFormState("idle");
      setName("");
      setEmail("");
      setNameError(false);
      setEmailError(false);
    }, 400);
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0c0b0c]"
      style={{ opacity: 0 }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      {/* Particles behind form card */}
      <Particles style={{ zIndex: 50 }} />

      {/* Background ellipses */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {[48, 72, 96].map((size, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-white/15"
            style={{ width: `${size}rem`, height: `${size}rem`, aspectRatio: "1" }}
          />
        ))}
        <div
          className="absolute rounded-full"
          style={{
            width: "40rem",
            height: "40rem",
            filter: "blur(10rem)",
            background: "radial-gradient(123.76% 123.76% at 50% -2.9%, #000060 44.1%, #7322F2 61.39%, #E296FF 77%, #F4D6FF 87%, rgba(0,0,0,0) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-[1.68rem]">
        <div className="form-wrapper relative rounded-[1.68rem] overflow-hidden" style={{ background: "#4a494b", padding: "0.1rem" }}>
          <CardGradientBorder variant="popup" />
          <div className="form-block relative rounded-[1.67rem] w-[22rem] p-8 z-10" style={{ background: "#1b161e" }}>
            {formState === "success" ? (
              <div className="flex flex-col items-center gap-6 py-8">
                <img src={ASSETS.successIcon} alt="" className="w-32 object-contain" />
                <div className="flex flex-col gap-3 text-center w-[17rem]">
                  <h3 className="text-white text-[1.8rem] font-medium leading-[120%]">Thanks for Joining!</h3>
                  <p className="text-white text-[1.1rem] leading-[150%] opacity-80">
                    We&apos;ll send updates as soon as we&apos;re ready for you
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-[0.56rem] mb-0">
                  <h3 className="text-white text-[1.8rem] font-medium leading-[120%]">
                    Start<br />Manifesting Today
                  </h3>
                  <p className="text-white text-[1.1rem] leading-[150%] opacity-80">
                    Be the first in line! Join the waitlist
                  </p>
                </div>

                <div className="flex flex-col gap-[0.84rem] pt-[1.4rem] pb-8">
                  <div>
                    <input
                      value={name}
                      onChange={(e) => { setName(e.target.value); setNameError(false); }}
                      placeholder="Name"
                      className="w-full h-12 px-[1.1rem] rounded-[1.1rem] text-white text-[0.98rem] outline-none"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: nameError ? "1px solid #ff2327" : "1px solid transparent",
                      }}
                    />
                    {nameError && <p className="text-[#ff2327] text-xs mt-1">This field is required.</p>}
                  </div>
                  <div>
                    <input
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setEmailError(false); }}
                      placeholder="Email"
                      type="email"
                      className="w-full h-12 px-[1.1rem] rounded-[1.1rem] text-white text-[0.98rem] outline-none"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: emailError ? "1px solid #ff2327" : "1px solid transparent",
                      }}
                    />
                    {emailError && <p className="text-[#ff2327] text-xs mt-1">Please provide a correct email.</p>}
                  </div>
                </div>

                <MainButton type="submit" className="w-full h-12 !py-0">
                  Submit
                </MainButton>
              </form>
            )}
          </div>
        </div>

        <MainButton variant="outline" onClick={handleClose}>
          Close
        </MainButton>
      </div>

      <div className="absolute inset-0 -z-10" onClick={handleClose} />
    </div>
  );
}
