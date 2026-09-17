"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { InfiniteImageField, LINKEDIN_GROWTH_IMAGES } from "@/components/ui/infinite-image-field";
import styles from "./page.module.css";

gsap.registerPlugin(useGSAP);

export default function Home() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".anim-eyebrow", {
        opacity: 0,
        y: -14,
        duration: 0.6,
      })
        .from(
          ".anim-headline",
          {
            opacity: 0,
            y: 32,
            duration: 0.8,
          },
          "-=0.3"
        )
        .from(
          ".anim-subheadline",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          ".anim-cta-group",
          {
            opacity: 0,
            y: 18,
            duration: 0.5,
          },
          "-=0.3"
        )
        .from(
          ".anim-proof",
          {
            opacity: 0,
            y: 14,
            duration: 0.5,
          },
          "-=0.2"
        )
        .from(
          ".anim-hint",
          {
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
          },
          "-=0.3"
        );
    },
    { scope: containerRef }
  );

  return (
    <div className={styles.pageWrapper} ref={containerRef}>
      {/* Thinner, Sleek Navbar */}
      <header className={styles.navbar}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>✦</div>
          <span>Revloom</span>
        </div>

        <nav>
          <ul className={styles.navLinks}>
            <li>
              <a href="#how-it-works" className={styles.navLink}>
                How It Works
              </a>
            </li>
            <li>
              <a href="#case-studies" className={styles.navLink}>
                Case Studies
              </a>
            </li>
            <li>
              <a href="#pricing" className={styles.navLink}>
                Pricing
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <a href="#audit" className={`btn btn-primary ${styles.navCta}`}>
            Get Free Audit
          </a>
        </div>
      </header>

      {/* Hero Section: Full Viewport with Canvas Background & Content Above */}
      <main className={styles.heroSection}>
        {/* Full-Viewport Infinite Image Canvas */}
        <div className={styles.canvasBackground}>
          <InfiniteImageField
            images={LINKEDIN_GROWTH_IMAGES}
            imageWidth={250}
            imageHeight={330}
            gap={24}
            maxSpeed={4}
            smoothing={0.07}
            borderRadius={18}
            className="w-full h-full"
          />
        </div>

        {/* Scrim & Vignette Overlays for Text Legibility & Depth */}
        <div className={styles.scrimOverlay} />
        <div className={styles.topVignette} />
        <div className={styles.bottomVignette} />

        {/* Ambient Glows */}
        <div
          className="glow-blob-magenta"
          style={{ top: "-120px", left: "20%", opacity: 0.12 }}
        />
        <div
          className="glow-blob-violet"
          style={{ bottom: "50px", left: "-100px", opacity: 0.1 }}
        />

        {/* Interactive Canvas Hint Pill */}
        <div className={`${styles.canvasHint} anim-hint`}>
          <span className={styles.canvasHintDot} />
          <span>Move cursor to glide canvas</span>
        </div>

        {/* Left-Aligned Hero Content Appearing Above the Canvas */}
        <div className={styles.heroContentContainer}>
          <div className={styles.leftContent}>
            <div className={`${styles.eyebrow} anim-eyebrow`}>
              <span className={styles.eyebrowDot} />
              <span>Founder-Led LinkedIn Growth</span>
            </div>

            <h1 className={`${styles.headline} anim-headline`}>
              Stop posting.{" "}
              <span className="text-gradient">Start positioning.</span>
            </h1>

            <p className={`${styles.subheadline} anim-subheadline`}>
              Revloom handles your LinkedIn strategy, writing, and engagement
              end-to-end — so your profile stops looking like a resume and
              starts working like your best salesperson. No ghostwriting fluff.
              Just sharp positioning, consistent content, and real pipeline.
            </p>

            <div className={`${styles.ctaGroup} anim-cta-group`}>
              <a href="#audit" className={`btn btn-primary ${styles.primaryCta}`}>
                Get My Free Positioning Audit →
              </a>
              <a
                href="#how-it-works"
                className={`btn btn-ghost-lime ${styles.secondaryCta}`}
              >
                See How It Works
              </a>
            </div>

            {/* Micro-Proof Line */}
            <div className={`${styles.microProof} anim-proof`}>
              <span className={styles.proofItem}>
                <span className={styles.proofCheck}>✓</span> Trusted by 50+ founders
              </span>
              <span className={styles.proofDot}>•</span>
              <span className={styles.proofItem}>
                <span className={styles.proofCheck}>✓</span> 6.6M+ impressions generated
              </span>
              <span className={styles.proofDot}>•</span>
              <span className={styles.proofItem}>
                <span className={styles.proofCheck}>✓</span> 94% client satisfaction
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
