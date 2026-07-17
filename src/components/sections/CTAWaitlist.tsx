"use client";

import { ASSETS } from "@/lib/assets";
import { useWaitlist } from "@/context/WaitlistContext";
import MainButton from "@/components/common/MainButton";
import Particles from "@/components/common/Particles";
import CardGradientBorder from "@/components/common/CardGradientBorder";
import { AnimatedSplitText, ViewItem } from "@/components/common/Animations";

export default function CTAWaitlist() {
  const { openWaitlist } = useWaitlist();

  return (
    <section className="cta-sc relative z-[100] bg-[#0c0b0c]">
      <div className="container cta-s" style={{ paddingTop: "10rem", paddingBottom: "10rem" }}>
        <ViewItem type="from-center" className="cta-card-wrapper relative w-full overflow-hidden" style={{ background: "#4a494b", borderRadius: "2rem", height: "42rem", padding: "0.1rem" }}>
          <CardGradientBorder />
          <div
            className="cta-card relative w-full h-full overflow-hidden"
            style={{
              zIndex: 100,
              borderRadius: "1.95rem",
              backgroundImage: `url(${ASSETS.ctaBg})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundColor: "#0f0d10",
              padding: "8.8rem 8.2rem",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Particles style={{ zIndex: 150 }} />

            <div className="text-elements cta-s relative flex flex-col" style={{ zIndex: 300 }}>
              <AnimatedSplitText
                preset="from-down-blur"
                as="h2"
                className="headline-h1 text-white font-medium leading-[120%]"
                style={{ fontSize: "3.88rem", letterSpacing: "-0.04em" }}
                text={<>Your Dream<br />Life Starts Here</>}
              />
              <AnimatedSplitText
                preset="from-down-blur"
                as="p"
                className="body-main text-white opacity-80 leading-[150%]"
                style={{ fontSize: "1.1rem", width: "20rem", paddingTop: "1.4rem", paddingBottom: "2rem" }}
                text="Download Superconscious and begin manifesting your dream reality today."
              />
              <div className="app-and-about-cta">
                <MainButton onClick={openWaitlist}>Join Waitlist</MainButton>
              </div>
            </div>

            <ViewItem type="from-down" className="cta-image absolute" style={{ right: "13%", bottom: 0, width: "32rem", zIndex: 200 }}>
              <img src={ASSETS.ctaMobile} alt="Superconscious App" className="w-full object-contain" />
            </ViewItem>
          </div>
        </ViewItem>
      </div>
    </section>
  );
}
