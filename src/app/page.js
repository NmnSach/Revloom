"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./page.module.css";

gsap.registerPlugin(useGSAP);

export default function Home() {
  const containerRef = useRef(null);
  const boxRef = useRef(null);

  useGSAP(
    () => {
      // Entrance staggered animation
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".animate-badge", {
        opacity: 0,
        y: -15,
        duration: 0.6,
      })
        .from(
          ".animate-title",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.3"
        )
        .from(
          ".animate-subtitle",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          ".animate-card",
          {
            opacity: 0,
            y: 40,
            stagger: 0.15,
            duration: 0.7,
          },
          "-=0.3"
        )
        .from(
          ".animate-demo",
          {
            opacity: 0,
            scale: 0.95,
            duration: 0.6,
          },
          "-=0.2"
        );
    },
    { scope: containerRef }
  );

  const handlePulseAnimation = () => {
    gsap.to(boxRef.current, {
      rotation: "+=360",
      scale: 1.25,
      duration: 0.5,
      yoyo: true,
      repeat: 1,
      ease: "back.out(1.7)",
    });
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.backgroundGlow} />

      <header className={styles.header}>
        <div className={`${styles.badge} animate-badge`}>
          <span>✨</span> Next.js + GSAP Ready
        </div>
        <h1 className={`${styles.title} animate-title`}>
          Craft Fluid Experiences with <span className={styles.gradientText}>Revloom</span>
        </h1>
        <p className={`${styles.subtitle} animate-subtitle`}>
          Initialized with JavaScript, App Router, and GSAP animations. Ready to plug in your favorite UI component libraries.
        </p>
      </header>

      <div className={styles.grid}>
        <div className={`${styles.card} animate-card`}>
          <div className={styles.cardIcon}>⚡</div>
          <h2 className={styles.cardTitle}>Next.js 16 + JS</h2>
          <p className={styles.cardDescription}>
            Fast App Router setup with pure JavaScript and modular structure inside <code>src/</code>.
          </p>
        </div>

        <div className={`${styles.card} animate-card`}>
          <div className={styles.cardIcon}>🎨</div>
          <h2 className={styles.cardTitle}>GSAP & @gsap/react</h2>
          <p className={styles.cardDescription}>
            Production-ready animation engine with lifecycle-safe <code>useGSAP</code> scoping and timelines.
          </p>
        </div>

        <div className={`${styles.card} animate-card`}>
          <div className={styles.cardIcon}>🧩</div>
          <h2 className={styles.cardTitle}>UI Library Ready</h2>
          <p className={styles.cardDescription}>
            Easily drop in Tailwind, shadcn/ui, Radix, Framer Motion, or any custom design kits.
          </p>
        </div>
      </div>

      <div className={`${styles.interactiveSection} animate-demo`}>
        <div ref={boxRef} className={styles.box} />
        <button
          type="button"
          className={styles.triggerBtn}
          onClick={handlePulseAnimation}
        >
          Trigger GSAP Animation
        </button>
      </div>
    </div>
  );
}
