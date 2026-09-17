"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WheelCarousel } from "@/components/ui/wheel-carousel";

const SPLASH_ITEMS = [
  {
    label: "Founder-Led Strategy",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
    imageAlt: "Founder-Led Strategy",
  },
  {
    label: "High-Retention Content",
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80",
    imageAlt: "High-Retention Content",
  },
  {
    label: "Algorithmic Reach",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    imageAlt: "Algorithmic Reach",
  },
  {
    label: "B2B Pipeline Growth",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80",
    imageAlt: "B2B Pipeline Growth",
  },
  {
    label: "Revloom",
    image: "/logo.png",
    imageAlt: "Revloom - Scale Your LinkedIn",
  },
];

export function SplashScreen({ onComplete }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Sequence of auto-scroll steps
    const stepDuration = 1200; // ms per step
    const finalHold = 1400; // ms to pause on Revloom before fade out

    const timers = [];

    // Step 1 -> index 1
    timers.push(setTimeout(() => setActiveIndex(1), stepDuration));
    // Step 2 -> index 2
    timers.push(setTimeout(() => setActiveIndex(2), stepDuration * 2));
    // Step 3 -> index 3
    timers.push(setTimeout(() => setActiveIndex(3), stepDuration * 3));
    // Step 4 -> index 4 ("Revloom")
    timers.push(setTimeout(() => setActiveIndex(4), stepDuration * 4));

    // After pausing on Revloom, trigger fade out
    timers.push(
      setTimeout(() => {
        setIsFadingOut(true);
      }, stepDuration * 4 + finalHold)
    );

    // After fade out completes, call onComplete
    timers.push(
      setTimeout(() => {
        onComplete?.();
      }, stepDuration * 4 + finalHold + 800)
    );

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete?.();
    }, 400);
  };

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          key="revloom-splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03, filter: "blur(8px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 9999,
            backgroundColor: "#120E1C",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Subtle Ambient Brand Glows */}
          <div
            style={{
              position: "absolute",
              top: "-15%",
              right: "15%",
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(108, 43, 217, 0.25) 0%, transparent 70%)",
              filter: "blur(90px)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-15%",
              left: "15%",
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255, 79, 206, 0.18) 0%, transparent 70%)",
              filter: "blur(90px)",
              pointerEvents: "none",
            }}
          />

          {/* Top Bar with Brand Badge and Skip Button */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              padding: "1.5rem 2.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              zIndex: 20,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-headline)",
                fontWeight: 800,
                fontSize: "1.1rem",
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span style={{ color: "var(--color-accent)" }}>✦</span>
              <span>Revloom</span>
            </div>

            <button
              onClick={handleSkip}
              type="button"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "rgba(255, 255, 255, 0.75)",
                padding: "0.4rem 0.95rem",
                borderRadius: "9999px",
                fontFamily: "var(--font-body)",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                backdropFilter: "blur(8px)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#FFFFFF";
                e.currentTarget.style.borderColor = "var(--color-accent)";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.14)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255, 255, 255, 0.75)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
              }}
            >
              Skip Intro →
            </button>
          </div>

          {/* Wheel Carousel Component */}
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              zIndex: 10,
            }}
          >
            <WheelCarousel
              items={SPLASH_ITEMS}
              activeIndex={activeIndex}
              photoSide="left"
              photoWidth={34}
              photoAspect="4/3"
              contentWidth={1000}
              gap={54}
              radius={360}
              spacing={15}
              visibleItems={5}
              apexInset={30}
              showMarker={true}
              markerColor="#C6FF3D"
              markerSize={14}
              markerGap={20}
              background="transparent"
              panelColor="#1C152B"
              textColor="rgba(255, 255, 255, 0.35)"
              selectedColor="#FFFFFF"
              scrollSpeed={0.008}
              dragSpeed={0.02}
              snap={true}
              momentum={true}
              appear={false}
              edgeFade={true}
              edgeFadeSize={25}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
