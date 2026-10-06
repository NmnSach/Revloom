"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { WheelCarousel } from "@/components/ui/wheel-carousel";

const SERVICES = [
  {
    label: "Founder Positioning",
    image: "/Splash_screen images/Founder Positioning.png",
    imageAlt: "Founder Positioning & Authority Building",
  },
  {
    label: "Content Strategy",
    image: "/Splash_screen images/Content strategy.png",
    imageAlt: "Content Strategy & Follower Growth",
  },
  {
    label: "Demand Generation",
    image: "/Splash_screen images/Demand Generation.png",
    imageAlt: "Demand Generation & Impressions Performance",
  },
  {
    label: "Market Strategy",
    image: "/Splash_screen images/Market strategy.png",
    imageAlt: "Market Strategy & Multi-Channel Content Flywheel",
  },
  {
    label: "PR & Brand Authority",
    image: "/Splash_screen images/brand authorty and PR.jpg",
    imageAlt: "Executive PR & Brand Authority",
  },
  {
    label: "Lead Generation",
    image: "/Splash_screen images/Lead Generation.png",
    imageAlt: "Lead Generation & High-Ticket Inbound Revenue",
  },
  {
    label: "Sales Funnel",
    image: "/Splash_screen images/extraaaahh.png",
    imageAlt: "Sales Funnel - Content to Booked Meetings",
  },
  {
    label: "Client Acquisition",
    image: "/Splash_screen images/Some extra image that you can use for whatever.png",
    imageAlt: "Client Acquisition & LinkedIn InMail Prospecting",
  },
  {
    label: "Customer Acquisition",
    image: "/Splash_screen images/Some extra images again.png",
    imageAlt: "Customer Acquisition & CRM Pipeline Opportunities",
  },
  {
    label: "Business Growth",
    image: "/Splash_screen images/Extra images again.png",
    imageAlt: "Business Growth - 356k+ Impressions & Audience Scaling",
  },
];

const STORAGE_KEY = "hasSeenRevloomSplash";

export function SplashScreen({ onComplete, children }) {
  const [mounted, setMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window !== "undefined") {
      return !window.location.search.includes("skip=true");
    }
    return true;
  });
  const [stage, setStage] = useState("wheel"); // "wheel" | "logo" | "eyelid"
  const carouselRef = useRef(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.search.includes("skip=true")) {
      onComplete?.();
      return;
    }
    startTransition(() => {
      setMounted(true);
    });

    const isDev = process.env.NODE_ENV === "development";
    const forceSplash =
      typeof window !== "undefined" &&
      window.location.search.includes("splash=true");

    const skipSplash =
      typeof window !== "undefined" &&
      window.location.search.includes("skip=true");

    const alreadySeen =
      !isDev &&
      !forceSplash &&
      typeof window !== "undefined" &&
      sessionStorage.getItem(STORAGE_KEY) === "true";

    if (skipSplash || alreadySeen) {
      setTimeout(() => {
        setShowSplash(false);
        onComplete?.();
      }, 0);
      return;
    }

    // Expose window.replaySplash for easy manual testing
    if (typeof window !== "undefined") {
      window.replaySplash = () => {
        sessionStorage.removeItem(STORAGE_KEY);
        setStage("wheel");
        setShowSplash(true);
        setTimeout(() => {
          carouselRef.current?.commitRotation(0);
          carouselRef.current?.spinTo(SERVICES.length - 1, 3400, () => {
            setTimeout(() => setStage("logo"), 380);
            setTimeout(() => setStage("eyelid"), 380 + 1100);
            setTimeout(() => onComplete?.(), 380 + 1100 + 550);
            setTimeout(() => setShowSplash(false), 380 + 1100 + 850);
          });
        }, 120);
      };
    }

    // Respect prefers-reduced-motion: if enabled in prod, show a quick logo and smooth open
    const prefersReducedMotion =
      !isDev &&
      !forceSplash &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const timers = [];

    if (prefersReducedMotion) {
      timers.push(
        setTimeout(() => {
          setStage("logo");
        }, 0)
      );
      timers.push(
        setTimeout(() => {
          setStage("eyelid");
        }, 1000)
      );
      timers.push(
        setTimeout(() => {
          sessionStorage.setItem(STORAGE_KEY, "true");
          setShowSplash(false);
          onComplete?.();
        }, 1850)
      );
      return () => {
        timers.forEach((t) => clearTimeout(t));
      };
    }

    // Deliberate, readable 3.4s continuous 120fps physics spin (~425ms per item)
    const spinTimer = setTimeout(() => {
      carouselRef.current?.spinTo(SERVICES.length - 1, 3400, () => {
        // Rest on final service ("Analytics & Reporting") for 380ms, then reveal logo
        timers.push(
          setTimeout(() => {
            setStage("logo");
          }, 380)
        );

        // Hold on Revloom logo for ~1.1s, then trigger eyelid split transition
        timers.push(
          setTimeout(() => {
            setStage("eyelid");
          }, 380 + 1100)
        );

        // Trigger hero section GSAP entrance as the eyelid opens widely
        timers.push(
          setTimeout(() => {
            onComplete?.();
          }, 380 + 1100 + 550)
        );

        // Completely unmount splash once the eyelids part off-screen (850ms duration)
        timers.push(
          setTimeout(() => {
            sessionStorage.setItem(STORAGE_KEY, "true");
            setShowSplash(false);
          }, 380 + 1100 + 850)
        );
      });
    }, 150);

    return () => {
      clearTimeout(spinTimer);
      timers.forEach((t) => clearTimeout(t));
    };
  }, [onComplete]);

  const handleSkip = () => {
    sessionStorage.setItem(STORAGE_KEY, "true");
    setStage("eyelid");
    setTimeout(() => {
      onComplete?.();
    }, 450);
    setTimeout(() => {
      setShowSplash(false);
    }, 850);
  };

  return (
    <>
      {showSplash && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            width: "100vw",
            height: "100dvh",
            zIndex: 99999,
            pointerEvents: stage === "eyelid" ? "none" : "auto",
            overflow: "hidden",
          }}
        >
          {/* Top Eyelid Shutter: Covers top 50vh, slides up to -100% on exit */}
          <motion.div
            initial={{ y: "0%" }}
            animate={stage === "eyelid" ? { y: "-100%" } : { y: "0%" }}
            transition={{
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1], // Cinematic high-end easing
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "50%",
              backgroundColor: "var(--color-base, #FFFFFF)",
              zIndex: 1,
              borderBottom: "1px solid var(--color-card-border, rgba(108, 43, 217, 0.08))",
              boxShadow: "0 14px 36px rgba(108, 43, 217, 0.1)",
            }}
          />

          {/* Bottom Eyelid Shutter: Covers bottom 50vh, slides down to +100% on exit */}
          <motion.div
            initial={{ y: "0%" }}
            animate={stage === "eyelid" ? { y: "100%" } : { y: "0%" }}
            transition={{
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1], // Cinematic high-end easing
            }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "50%",
              backgroundColor: "var(--color-base, #FFFFFF)",
              zIndex: 1,
              borderTop: "1px solid var(--color-card-border, rgba(108, 43, 217, 0.08))",
              boxShadow: "0 -14px 36px rgba(108, 43, 217, 0.1)",
            }}
          />

          {/* Content Layer (Ambient glow, Wheel Carousel, Logo, Skip button) */}
          <motion.div
            animate={
              stage === "eyelid"
                ? { opacity: 0, scale: 0.98 }
                : { opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              pointerEvents: stage === "eyelid" ? "none" : "auto",
            }}
          >
            {/* Subtle brand ambiance in the background */}
            <div
              style={{
                position: "absolute",
                top: "12%",
                left: "15%",
                width: "550px",
                height: "550px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(108, 43, 217, 0.06) 0%, transparent 70%)",
                filter: "blur(90px)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "12%",
                right: "15%",
                width: "550px",
                height: "550px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255, 79, 206, 0.05) 0%, transparent 70%)",
                filter: "blur(90px)",
                pointerEvents: "none",
              }}
            />

            {/* Stage 1: Componentry Wheel Carousel with Photo Card & Curved Services */}
            <AnimatePresence mode="wait">
              {stage === "wheel" && mounted && (
                <motion.div
                  key="wheel-stage"
                  initial={{ opacity: 0, scale: 0.97 }}
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
                    ref={carouselRef}
                    items={SERVICES}
                    mode="custom"
                    background="var(--color-base, #FFFFFF)"
                    selectedColor="var(--color-primary, #6C2BD9)"
                    textColor="var(--text-muted, rgba(26, 22, 37, 0.35))"
                    markerColor="#C6FF3D"
                    photoSide="left"
                    photoContainer={false}
                    photoWidth={42}
                    photoRadius={16}
                    photoShadow={true}
                    contentWidth={1180}
                    gap={44}
                    radius={350}
                    spacing={15}
                    visibleItems={7}
                    apexInset={15}
                    showMarker={true}
                    markerSize={12}
                    markerGap={20}
                    interactive={true}
                    edgeFade={true}
                    edgeFadeSize={28}
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
                      width: "clamp(130px, 36vw, 170px)",
                      height: "clamp(130px, 36vw, 170px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      src="/logo.png"
                      alt="Revloom"
                      width={170}
                      height={170}
                      priority
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        filter:
                          "drop-shadow(0 12px 28px rgba(108, 43, 217, 0.18))",
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Skip Text Link (Bottom-Right, #1A1625 at 50% opacity) */}
            <button
              onClick={handleSkip}
              type="button"
              style={{
                position: "absolute",
                bottom: "clamp(1.2rem, 3.5vh, 2rem)",
                right: "clamp(1.2rem, 4vw, 2.5rem)",
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
                touchAction: "manipulation",
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
        </div>
      )}

      {/* Render children (main application / hero section) underneath */}
      {children}
    </>
  );
}
