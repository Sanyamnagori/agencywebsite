"use client";

import { ASSETS } from "@/lib/assets";
import LottieAnim from "@/components/common/LottieAnim";
import { AnimatedSplitText, ViewItem } from "@/components/common/Animations";

export default function WhatIs() {
  return (
    <section id="features" className="what-is-sc relative bg-[#0c0b0c] overflow-hidden">
      <div className="container what-is-s" style={{ paddingTop: "6.25rem", paddingBottom: "6.25rem" }}>
        <div
          className="what-is-list"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 0.1rem 1fr 0.1rem 1.5fr",
            gridTemplateRows: "auto auto auto auto",
            alignItems: "stretch",
          }}
        >
          <div className="what-is-item s1 relative flex flex-col items-center justify-between" style={{ gridArea: "span 4 / span 1 / span 4 / span 1", height: "38rem", padding: "3.5rem 2rem" }}>
            <div className="what-is-blur s1 absolute pointer-events-none rounded-full" style={{ width: "20rem", height: "20rem", filter: "blur(8rem)", background: "#edc5fc", opacity: 0.12, top: "10%", left: "50%", transform: "translateX(-50%)" }} />
            <ViewItem type="from-center" className="what-is-widget s1">
              <LottieAnim src={ASSETS.wiWidget1} loop autoplay className="w-[16rem]" />
            </ViewItem>
            <div className="text-elements what-is-s s1 flex flex-col items-center text-center gap-[1.68rem]">
              <AnimatedSplitText preset="from-down-blur" as="h3" className="headline-h3 text-white font-medium leading-[120%]" style={{ fontSize: "1.8rem", maxWidth: "18rem" }} text="Hyper-Personalized Imagination Sessions" />
              <AnimatedSplitText preset="from-down-blur" as="p" className="body-main text-white opacity-80 leading-[150%]" style={{ fontSize: "1.1rem", width: "14rem" }} text="Tap into the frequency of your highest self" />
            </div>
          </div>

          <div className="what-is-line" style={{ gridArea: "span 4 / span 1 / span 4 / span 1", background: "white", opacity: 0.2, width: "0.1rem", alignSelf: "stretch" }} />

          <div className="what-is-item s2 relative flex flex-col items-center justify-between" style={{ gridArea: "span 4 / span 1 / span 4 / span 1", padding: "3.5rem 2rem" }}>
            <div className="what-is-blur s2 absolute pointer-events-none rounded-full" style={{ width: "18rem", height: "18rem", filter: "blur(8rem)", background: "#edc5fc", opacity: 0.12, bottom: "10%", left: "50%", transform: "translateX(-50%)" }} />
            <div className="text-elements what-is-s s2 flex flex-col items-center text-center gap-[0.8rem]">
              <AnimatedSplitText preset="from-down-blur" as="h3" className="headline-h3 text-white font-medium leading-[120%]" style={{ fontSize: "1.8rem" }} text={<>Superconscious<br />Activations</>} />
              <AnimatedSplitText preset="from-down-blur" as="p" className="body-main text-white opacity-80 leading-[150%]" style={{ fontSize: "1.1rem", width: "14rem" }} text="AI-guided activations to shift your energy instantly" />
            </div>
            <ViewItem type="from-center" className="what-is-widget s2">
              <LottieAnim src={ASSETS.wiWidget2} loop autoplay className="w-[14rem]" />
            </ViewItem>
            <div className="what-is-line-s2 absolute" style={{ width: "92%", height: "0.1rem", background: "white", opacity: 0.2, bottom: 0, right: 0 }} />
          </div>

          <div className="what-is-line" style={{ gridArea: "span 4 / span 1 / span 4 / span 1", background: "white", opacity: 0.2, width: "0.1rem", alignSelf: "stretch" }} />

          <div className="what-is-item s3 relative" style={{ gridArea: "span 2 / span 1 / span 2 / span 1", display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: "22rem", borderBottom: "0.1rem solid rgba(255,255,255,0.2)", minHeight: "19rem" }}>
            <div className="what-is-blur s3 absolute pointer-events-none rounded-full" style={{ width: "14rem", height: "14rem", filter: "blur(6rem)", background: "#edc5fc", opacity: 0.15, top: "20%", left: "8rem" }} />
            <ViewItem type="from-center" className="what-is-widget s3 absolute" style={{ left: "1rem", width: "20rem" }}>
              <LottieAnim src={ASSETS.wiWidget3} loop autoplay className="w-full" />
            </ViewItem>
            <div className="text-elements what-is-s s3 flex flex-col gap-[0.8rem]">
              <AnimatedSplitText preset="from-down-blur" as="h3" className="headline-h3 text-white font-medium leading-[120%]" style={{ fontSize: "1.8rem" }} text="AI-Powered Vibrational Intelligence" />
              <AnimatedSplitText preset="from-down-blur" as="p" className="body-main text-white opacity-80 leading-[150%]" style={{ fontSize: "1.1rem", width: "14rem" }} text="Track and elevate your frequency for faster manifestation" />
            </div>
          </div>

          <div className="what-is-item s4 relative" style={{ gridArea: "span 2 / span 1 / span 2 / span 1", display: "flex", flexDirection: "row", alignItems: "center", paddingLeft: "22rem", minHeight: "19rem" }}>
            <div className="what-is-blur s4 absolute pointer-events-none rounded-full" style={{ width: "14rem", height: "14rem", filter: "blur(6rem)", background: "#edc5fc", opacity: 0.15, bottom: "20%", left: "8rem" }} />
            <ViewItem type="from-center" className="what-is-widget s4 absolute" style={{ left: "4.4rem", width: "14.5rem" }}>
              <LottieAnim src={ASSETS.wiWidget4} loop autoplay className="w-full" />
            </ViewItem>
            <div className="text-elements what-is-s s4 flex flex-col gap-[0.8rem]">
              <AnimatedSplitText preset="from-down-blur" as="h3" className="headline-h3 text-white font-medium leading-[120%]" style={{ fontSize: "1.8rem" }} text="Daily Journals & AI Feedback" />
              <AnimatedSplitText preset="from-down-blur" as="p" className="body-main text-white opacity-80 leading-[150%]" style={{ fontSize: "1.1rem", width: "12rem" }} text="Reflect, reframe, and grow every day" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
