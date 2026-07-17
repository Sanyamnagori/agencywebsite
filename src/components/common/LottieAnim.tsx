"use client";

import Lottie from "lottie-react";
import { useEffect, useState } from "react";

interface LottieAnimProps {
  src: string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function LottieAnim({
  src,
  loop = true,
  autoplay = true,
  className = "",
  style,
}: LottieAnimProps) {
  const [data, setData] = useState<object | null>(null);

  useEffect(() => {
    fetch(src)
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, [src]);

  if (!data) return <div className={className} style={style} />;

  return (
    <Lottie
      animationData={data}
      loop={loop}
      autoplay={autoplay}
      className={className}
      style={style}
    />
  );
}
