"use client";

type Variant = "default" | "s2" | "popup";

export default function CardGradientBorder({ variant = "default" }: { variant?: Variant }) {
  return (
    <div
      className="card-gradient-point pointer-events-none"
      aria-hidden
    >
      <div className="card-gradient-point-spin">
        <div className={`card-gradient ${variant === "s2" ? "s2" : ""} ${variant === "popup" ? "pop-up" : ""}`} />
      </div>
    </div>
  );
}
