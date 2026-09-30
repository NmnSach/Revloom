"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./logo-cloud.module.css";

// Vector Brand Icons for 20 Iconic High-Growth Tech & AI Companies
function BrandIcon({ name }) {
  switch (name) {
    case "Linear":
      return (
        <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
          <path
            d="M3.4 12C3.4 7.25 7.25 3.4 12 3.4C16.75 3.4 20.6 7.25 20.6 12C20.6 16.75 16.75 20.6 12 20.6C7.25 20.6 3.4 16.75 3.4 12Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeOpacity="0.4"
          />
          <path
            d="M3.8 14.5L14.5 3.8M9.5 20.2L20.2 9.5"
            stroke="#5E6AD2"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "Vercel":
      return (
        <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
          <path d="M12 3L22 20.5H2L12 3Z" fill="currentColor" />
        </svg>
      );
    case "Supabase":
      return (
        <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
          <path
            d="M13.5 2L3 14.5H11.5L10.5 22L21 9.5H12.5L13.5 2Z"
            fill="url(#sb-grad)"
          />
          <defs>
            <linearGradient id="sb-grad" x1="3" y1="2" x2="21" y2="22">
              <stop stopColor="#3ECF8E" />
              <stop offset="1" stopColor="#249361" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "Stripe":
      return (
        <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
          <rect width="24" height="24" rx="6" fill="#635BFF" fillOpacity="0.15" />
          <path
            d="M13.6 9.4c0-.7-.6-1-1.6-1-1.4 0-3.1.5-4.2 1.1V6.5c1.3-.5 2.9-.8 4.4-.8 3.5 0 5.7 1.7 5.7 4.7 0 4.6-6.3 3.9-6.3 5.9 0 .8.7 1.1 1.8 1.1 1.6 0 3.6-.7 4.8-1.4v3.1c-1.4.6-3.2.9-4.9.9-3.7 0-6.1-1.8-6.1-4.8 0-4.9 6.4-4.1 6.4-5.8z"
            fill="#635BFF"
          />
        </svg>
      );
    case "Raycast":
      return (
        <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
          <path
            d="M3 12L7 8L11 12L7 16L3 12ZM13 12L17 8L21 12L17 16L13 12ZM7 2L11 6L7 10L3 6L7 2ZM7 14L11 18L7 22L3 18L7 14Z"
            fill="#FF6363"
          />
        </svg>
      );
    case "OpenAI":
      return (
        <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
          <path
            d="M20.5 10.3a5.5 5.5 0 0 0-.4-4.2 5.6 5.6 0 0 0-4.7-2.8 5.4 5.4 0 0 0-3.5 1.3 5.5 5.5 0 0 0-7.3 2.6 5.6 5.6 0 0 0-.5 4.3 5.5 5.5 0 0 0-2.3 4.4 5.6 5.6 0 0 0 2.7 4.8 5.4 5.4 0 0 0 3.6.4 5.5 5.5 0 0 0 7.3-2.6 5.6 5.6 0 0 0 .5-4.3 5.5 5.5 0 0 0 2.3-4.4 5.6 5.6 0 0 0-2.7-4.8c.1.7.3 1.4.3 2.1z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "Resend":
      return (
        <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
          <path
            d="M4 6H20V18H4V6ZM4 6L12 12.5L20 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="2.5" fill="#6C2BD9" />
        </svg>
      );
    case "Perplexity":
      return (
        <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
          <path
            d="M12 2L4 7V17L12 22L20 17V7L12 2Z"
            stroke="#20B8CD"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M12 2V22M4 7L20 17M20 7L4 17" stroke="#20B8CD" strokeWidth="1.4" />
        </svg>
      );
    case "ElevenLabs":
      return (
        <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
          <rect x="7" y="4" width="3.5" height="16" rx="1.75" fill="currentColor" />
          <rect x="13.5" y="4" width="3.5" height="16" rx="1.75" fill="currentColor" />
        </svg>
      );
    case "Cursor":
      return (
        <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
          <path
            d="M5 3L19 12L12 14L9 21L5 3Z"
            fill="url(#cur-grad)"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="cur-grad" x1="5" y1="3" x2="19" y2="21">
              <stop stopColor="#6C2BD9" />
              <stop offset="1" stopColor="#38BDF8" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "Anthropic":
      return (
        <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
          <path
            d="M14.5 4L21 20H16.8L15.3 16.2H8.7L7.2 20H3L9.5 4H14.5ZM13.8 12.6L12 7.8L10.2 12.6H13.8Z"
            fill="#D97706"
          />
        </svg>
      );
    case "Figma":
      return (
        <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
          <rect x="6" y="2" width="6" height="6" rx="3" fill="#F24E1E" />
          <rect x="12" y="2" width="6" height="6" rx="3" fill="#FF7262" />
          <rect x="6" y="8" width="6" height="6" rx="3" fill="#A259FF" />
          <circle cx="15" cy="11" r="3" fill="#1ABCFE" />
          <path
            d="M6 14H12V17C12 18.6569 10.6569 20 9 20C7.34315 20 6 18.6569 6 17V14Z"
            fill="#0ACF83"
          />
        </svg>
      );
    case "Retool":
      return (
        <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
          <rect x="3" y="4" width="7" height="7" rx="1.5" fill="#3B82F6" />
          <rect x="14" y="4" width="7" height="7" rx="1.5" fill="#3B82F6" />
          <rect x="8.5" y="13" width="7" height="7" rx="1.5" fill="#2563EB" />
        </svg>
      );
    case "PostHog":
      return (
        <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
          <path
            d="M4 17C4 11.5 8 7 14 7C17.5 7 19.5 8.5 20 11C20.5 13.5 19 16 16.5 17C14.5 17.8 12 17.5 10 17H4Z"
            fill="#FF8B00"
          />
          <circle cx="16.5" cy="11.5" r="1.5" fill="#FFFFFF" />
          <circle cx="17" cy="11.5" r="0.8" fill="#1E1E1E" />
        </svg>
      );
    case "Loom":
      return (
        <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
          <circle cx="12" cy="12" r="4.5" fill="#625DF5" />
          <circle cx="12" cy="4" r="2.5" fill="#625DF5" fillOpacity="0.8" />
          <circle cx="12" cy="20" r="2.5" fill="#625DF5" fillOpacity="0.8" />
          <circle cx="4" cy="12" r="2.5" fill="#625DF5" fillOpacity="0.8" />
          <circle cx="20" cy="12" r="2.5" fill="#625DF5" fillOpacity="0.8" />
        </svg>
      );
    case "Koyeb":
      return (
        <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
          <path
            d="M5 16L10 10L14 13L19 7"
            stroke="#8544F6"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="19" cy="7" r="2.5" fill="#C6FF3D" />
        </svg>
      );
    case "Ramp":
      return (
        <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
          <path d="M4 18L13 6H20L11 18H4Z" fill="#10B981" />
          <path d="M12 18L16.5 12H20L15.5 18H12Z" fill="#047857" />
        </svg>
      );
    case "Notion":
      return (
        <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
          <rect x="3" y="3" width="18" height="18" rx="4" fill="currentColor" fillOpacity="0.1" />
          <path
            d="M7 6.5V17.5M7 6.5L16.5 17.5M16.5 6.5V17.5"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "Mistral":
      return (
        <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
          <rect x="4" y="16" width="16" height="3" rx="1.5" fill="#FF5722" />
          <rect x="7" y="10.5" width="10" height="3" rx="1.5" fill="#FF9800" />
          <rect x="9.5" y="5" width="5" height="3" rx="1.5" fill="#FFC107" />
        </svg>
      );
    case "GitHub":
      return (
        <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            fill="currentColor"
          />
        </svg>
      );
    default:
      return null;
  }
}

// 2 Rotational Batches of 10 Companies (5x2 Grid)
const LOGO_BATCHES = [
  [
    { id: "linear", name: "Linear" },
    { id: "vercel", name: "Vercel" },
    { id: "supabase", name: "Supabase" },
    { id: "stripe", name: "Stripe" },
    { id: "raycast", name: "Raycast" },
    { id: "openai", name: "OpenAI" },
    { id: "resend", name: "Resend" },
    { id: "perplexity", name: "Perplexity" },
    { id: "elevenlabs", name: "ElevenLabs" },
    { id: "cursor", name: "Cursor" },
  ],
  [
    { id: "anthropic", name: "Anthropic" },
    { id: "figma", name: "Figma" },
    { id: "retool", name: "Retool" },
    { id: "posthog", name: "PostHog" },
    { id: "loom", name: "Loom" },
    { id: "koyeb", name: "Koyeb" },
    { id: "ramp", name: "Ramp" },
    { id: "notion", name: "Notion" },
    { id: "mistral", name: "Mistral" },
    { id: "github", name: "GitHub" },
  ],
];

export function LogoCloud() {
  const [batchIndex, setBatchIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  // Auto-swap rotation every 3.6 seconds unless hovered
  const nextBatch = useCallback(() => {
    setBatchIndex((prev) => (prev + 1) % LOGO_BATCHES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      nextBatch();
    }, 3600);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextBatch]);

  const currentLogos = LOGO_BATCHES[batchIndex];

  return (
    <section
      className={styles.sectionWrapper}
      aria-label="Companies trusted by Revloom"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Architectural Grid & Ambient Aura */}
      <div className={styles.backgroundGrid} />
      <div className={styles.ambientAura} />

      <div className={styles.container}>
        {/* Header Block */}
        <div className={styles.headerArea}>
          <div className={styles.pillBadge}>
            <span className={styles.pulseDot} />
            <span>Trusted By Modern Leaders</span>
          </div>
          <h2 className={styles.heading}>
            Powering Authority For Next-Gen Tech Teams
          </h2>
          <p className={styles.subHeading}>
            From stealth seed to hyper-growth SaaS — our content engines position founders at the forefront of their industry.
          </p>
        </div>

        {/* 5x2 Borderless Swap Grid */}
        <div className={styles.logoGrid}>
          {currentLogos.map((logo, index) => {
            const col = index % 5;
            const row = Math.floor(index / 5);
            // Wave delay stagger: ripples across columns and rows smoothly
            const staggerDelay = col * 0.045 + row * 0.07;

            return (
              <div key={index} className={styles.slotItem}>
                {/* Animated Logo Container with Horizontal Motion and Blur */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${logo.id}-${batchIndex}`}
                    className={styles.logoInner}
                    initial={{
                      opacity: 0,
                      x: 22,
                      filter: "blur(6px)",
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      filter: "blur(0px)",
                    }}
                    exit={{
                      opacity: 0,
                      x: -22,
                      filter: "blur(6px)",
                    }}
                    transition={{
                      duration: 0.45,
                      delay: staggerDelay,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <div className={styles.logoIcon}>
                      <BrandIcon name={logo.name} />
                    </div>
                    <span className={styles.logoText}>{logo.name}</span>
                  </motion.div>
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
