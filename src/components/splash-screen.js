"use client";

import { useEffect, useState, useSyncExternalStore, useTransition } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { WheelCarousel } from "@/components/ui/wheel-carousel";

const SERVICES = [
  { label: "LinkedIn Ghostwriting" },
  { label: "Personal Brand Strategy" },
  { label: "Founder Positioning" },
  { label: "Content Calendar & Scheduling" },
  { label: "Engagement & Comment Management" },
  { label: "Profile Optimization" },
  { label: "Carousel & Visual Content Design" },
  { label: "Lead Gen via LinkedIn Outreach" },
  { label: "Analytics & Reporting" },
];

const STORAGE_KEY = "hasSeenRevloomSplash";

function subscribe(callback) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  if (typeof window === "undefined") return "true";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "true";
  return sessionStorage.getItem(STORAGE_KEY) === "true" ? "true" : "false";
}

function getServerSnapshot() {
  return "true";
}

export function SplashScreen({ onComplete, children }) {
  const isAlreadySeen = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [showSplash, setShowSplash] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [stage, setStage] = useState("wheel"); // "wheel" | "logo" | "fadeout"
  const [, startTransition] = useTransition();

  const shouldSkip = isAlreadySeen === "true";

  useEffect(() => {
    if (shouldSkip) {
      onComplete?.();
      return;
    }

    // Auto-rotation sequence through the 9 services
    const stepDuration = 220;
    const timers = [];

    SERVICES.forEach((_, idx) => {
      if (idx > 0) {
        timers.push(
          setTimeout(() => {
            startTransition(() => {
              setActiveIndex(idx);
            });
          }, idx * stepDuration)
        );
      }
    });

    const rotationEndTime = SERVICES.length * stepDuration;

    // After rotation completes, transition from wheel to logo
    timers.push(
      setTimeout(() => {
        setStage("logo");
      }, rotationEndTime + 250)
    );

    // Hold on the Revloom logo for ~1.2s, then trigger final fadeout
    timers.push(
      setTimeout(() => {
        setStage("fadeout");
      }, rotationEndTime + 250 + 1200)
    );

    // Total duration is under 4 seconds (~3.8s) -> dismiss splash screen
    timers.push(
      setTimeout(() => {
        sessionStorage.setItem(STORAGE_KEY, "true");
        setShowSplash(false);
        onComplete?.();
      }, rotationEndTime + 250 + 1200 + 600)
    );

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [onComplete, shouldSkip]);

  const handleSkip = () => {
    sessionStorage.setItem(STORAGE_KEY, "true");
    setStage("fadeout");
    setTimeout(() => {
      setShowSplash(false);
      onComplete?.();
    }, 250);
  };

  if (shouldSkip) {
    return <>{children}</>;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && stage !== "fadeout" && (
          <motion.div
            key="revloom-splash-container"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.025 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 99999,
              backgroundColor: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {/* Subtle brand ambiance in the background */}
            <div
              style={{
                position: "absolute",
                top: "15%",
                left: "20%",
                width: "500px",
                height: "500px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(108, 43, 217, 0.05) 0%, transparent 70%)",
                filter: "blur(80px)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "15%",
                right: "20%",
                width: "500px",
                height: "500px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255, 79, 206, 0.04) 0%, transparent 70%)",
                filter: "blur(80px)",
                pointerEvents: "none",
              }}
            />

            {/* Stage 1: Wheel Carousel rotating through services */}
            {stage === "wheel" && (
              <motion.div
                key="wheel-stage"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <WheelCarousel
                  items={SERVICES}
                  activeIndex={activeIndex}
                  mode="custom"
                  background="#FFFFFF"
                  selectedColor="#6C2BD9"
                  textColor="rgba(26, 22, 37, 0.35)"
                  markerColor="#C6FF3D"
                  photoWidth={0} // Hide photo/image column completely
                  showMarker={true}
                  markerSize={16}
                  markerGap={24}
                  contentWidth={1100}
                  radius={420}
                  spacing={16}
                  visibleItems={7}
                  apexInset={28}
                  interactive={false} // Disable user dragging during scripted autoplay
                  appear={false}
                  edgeFade={true}
                  edgeFadeSize={25}
                />
              </motion.div>
            )}

            {/* Stage 2: Revloom Logo Center Reveal */}
            {stage === "logo" && (
              <motion.div
                key="logo-stage"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1.25rem",
                  zIndex: 20,
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "160px",
                    height: "160px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src="/logo.png"
                    alt="Revloom"
                    width={160}
                    height={160}
                    priority
                    style={{
                      objectFit: "contain",
                      filter: "drop-shadow(0 8px 24px rgba(108, 43, 217, 0.15))",
                    }}
                  />
                </div>
              </motion.div>
            )}

            {/* Skip Text Link (Bottom-Right, #1A1625 at 50% opacity) */}
            <button
              onClick={handleSkip}
              type="button"
              style={{
                position: "absolute",
                bottom: "2rem",
                right: "2.5rem",
                background: "transparent",
                border: "none",
                color: "rgba(26, 22, 37, 0.5)",
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                fontWeight: 500,
                letterSpacing: "0.02em",
                cursor: "pointer",
                padding: "0.5rem 0.75rem",
                transition: "color 0.2s ease, opacity 0.2s ease",
                zIndex: 50,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#6C2BD9";
                e.currentTarget.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(26, 22, 37, 0.5)";
                e.currentTarget.style.opacity = "1";
              }}
            >
              Skip →
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render children (main application) underneath */}
      {children}
    </>
  );
}
