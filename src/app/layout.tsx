import type { Metadata } from "next";
import { Wix_Madefor_Display, Tiro_Kannada } from "next/font/google";
import "./globals.css";

const wixSans = Wix_Madefor_Display({
  variable: "--font-wix-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const tiroSerif = Tiro_Kannada({
  variable: "--font-tiro-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Superconscious | Elevate Your Digital Consciousness",
  description:
    "A premium AI manifestation app creating immersive, personalised experiences at the intersection of consciousness, technology, and design.",
  keywords: ["manifestation", "AI", "consciousness", "superconscious", "mindset"],
  openGraph: {
    title: "Superconscious | Elevate Your Digital Consciousness",
    description:
      "A premium AI manifestation app creating immersive, personalised experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${wixSans.variable} ${tiroSerif.variable} h-full antialiased`}
    >
      <body
        className="min-h-full text-white font-sans overflow-x-hidden bg-[#0c0b0c]"
      >
        {children}
      </body>
    </html>
  );
}
