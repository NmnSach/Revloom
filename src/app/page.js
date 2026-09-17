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
        y: -12,
        duration: 0.5,
      })
        .from(
          ".anim-headline",
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
          },
          "-=0.2"
        )
        .from(
          ".anim-subheadline",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.3"
        )
        .from(
          ".anim-cta-group",
          {
            opacity: 0,
            y: 20,
            duration: 0.5,
          },
          "-=0.3"
        )
        .from(
          ".anim-proof",
          {
            opacity: 0,
            y: 15,
            duration: 0.5,
          },
          "-=0.2"
        )
        .from(
          ".anim-canvas",
          {
            opacity: 0,
            scale: 0.96,
            duration: 0.8,
          },
          "-=0.5"
        );
    },
    { scope: containerRef }
  );

  return (
    <div className={styles.pageWrapper} ref={containerRef}>
      {/* Decorative Brand Ambience */}
      <div
        className="glow-blob-magenta"
        style={{ top: "-140px", right: "-80px", opacity: 0.18 }}
      />
      <div
        className="glow-blob-violet"
        style={{ top: "180px", left: "-160px", opacity: 0.14 }}
      />

      {/* Thinner Navigation */}
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

      {/* Hero Section */}
      <main className={styles.heroSection}>
        <div className={styles.heroGrid}>
          {/* Left-Aligned Copy Column */}
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

            {/* Micro-Proof Friction Reducer */}
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

          {/* Right Column: Infinite Image Field Canvas Stage */}
          <div className={`${styles.canvasStage} anim-canvas`}>
            <div className={styles.canvasMaskTop} />
            <div className={styles.canvasMaskBottom} />
            <div className={styles.canvasHint}>
              <span className={styles.canvasHintDot} />
              <span>Move cursor to explore content</span>
            </div>

            <div className={styles.canvasInner}>
              <InfiniteImageField
                images={LINKEDIN_GROWTH_IMAGES}
                imageWidth={230}
                imageHeight={300}
                gap={22}
                maxSpeed={4}
                smoothing={0.07}
                borderRadius={18}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
