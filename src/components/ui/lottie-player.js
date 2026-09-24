"use client";

import { useSyncExternalStore } from "react";
import { Lottie } from "lottie-react";

const emptySubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function LottiePlayer({
  animationData,
  className,
  style,
  loop = true,
  autoplay = true,
}) {
  const isClient = useIsClient();

  if (!isClient || !animationData) {
    return (
      <div
        className={className}
        style={{
          width: "100%",
          height: "100%",
          minWidth: "100px",
          minHeight: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...style,
        }}
      />
    );
  }

  return (
    <Lottie
      src={animationData}
      loop={loop}
      autoplay={autoplay}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        ...style,
      }}
    />
  );
}

export default LottiePlayer;
