"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./page.module.css";

gsap.registerPlugin(useGSAP);

export default function Home() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".anim-tag", {
        opacity: 0,
        y: -15,
        duration: 0.6,
      })
        .from(
          ".anim-title",
          {
            opacity: 0,
            y: 35,
            duration: 0.8,
          },
          "-=0.3"
        )
        .from(
          ".anim-sub",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          ".anim-cta",
          {
            opacity: 0,
            y: 20,
            duration: 0.5,
          },
          "-=0.3"
        )
        .from(
          ".anim-metrics",
          {
            opacity: 0,
            scale: 0.96,
            duration: 0.6,
          },
          "-=0.2"
        )
        .from(
          ".anim-card",
          {
            opacity: 0,
            y: 30,
            stagger: 0.15,
            duration: 0.7,
          },
          "-=0.3"
        );
    },
    { scope: containerRef }
  );

  return (
    <div className={styles.pageWrapper} ref={containerRef}>
      {/* Decorative Brand Glow Blobs */}
      <div
        className="glow-blob-magenta"
        style={{ top: "-100px", right: "-100px" }}
      />
      <div
        className="glow-blob-violet"
        style={{ top: "350px", left: "-150px" }}
      />

      {/* Top Navbar */}
      <header className={styles.navbar}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>✦</div>
          <span>Revloom</span>
        </div>

        <nav>
          <ul className={styles.navLinks}>
            <li>
              <a href="#features" className={styles.navLink}>
                Features
              </a>
            </li>
            <li>
              <a href="#impact" className={styles.navLink}>
                Results
              </a>
            </li>
            <li>
              <a href="#how-it-works" className={styles.navLink}>
                How It Works
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <a href="#cta" className="btn btn-primary" style={{ padding: "0.65rem 1.4rem" }}>
            Get Started
          </a>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={`${styles.heroTag} anim-tag`}>
            <span className={styles.tagLimeDot} />
            <span>Scale Your LinkedIn Influence</span>
          </div>

          <h1 className={`${styles.heroTitle} anim-title`}>
            Multiply Your LinkedIn Reach &{" "}
            <span className="text-gradient">Dominate Your Niche</span>
          </h1>

          <p className={`${styles.heroSubtitle} anim-sub`}>
            Revloom transforms your ideas into viral LinkedIn content and targeted
            audience growth. Built for founders, operators, and creators who want
            authority without the endless grind.
          </p>

          <div className={`${styles.heroActions} anim-cta`}>
            <a href="#cta" className="btn btn-primary">
              Book a Strategy Call →
            </a>
            <a href="#how-it-works" className="btn btn-ghost-lime">
              See How It Works
            </a>
          </div>

          {/* Metrics / Proof Bar */}
          <div className={`${styles.metricsBar} anim-metrics`}>
            <div className={styles.metricItem}>
              <div className={styles.metricValue}>
                <span className={styles.statUnderline}>12.4M+</span>
              </div>
              <div className={styles.metricLabel}>Organic Impressions Delivered</div>
            </div>

            <div className={styles.metricItem}>
              <div className={styles.metricValue}>
                <span className={styles.statUnderline}>3.8x</span>
              </div>
              <div className={styles.metricLabel}>Average Engagement Lift</div>
            </div>

            <div className={styles.metricItem}>
              <div className={styles.metricValue}>
                <span className={styles.statUnderline}>150+</span>
              </div>
              <div className={styles.metricLabel}>Leaders & Founders Scaled</div>
            </div>
          </div>
        </section>

        {/* Feature Grid / Cards Section */}
        <section id="features" className={styles.featuresSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionCategory}>Engineered for Impact</div>
            <h2 className={styles.sectionTitle}>
              Everything You Need to Win on LinkedIn
            </h2>
            <p className={styles.sectionSubtitle}>
              From algorithmic positioning to thumb-stopping story hooks, our system turns
              profile visitors into qualified pipeline and brand advocates.
            </p>
          </div>

          <div className={styles.cardsGrid}>
            <div className={`${styles.featureCard} anim-card`}>
              <div className={styles.cardIconCircle}>⚡</div>
              <h3 className={styles.cardHeading}>High-Retention Hooks</h3>
              <p className={styles.cardParagraph}>
                Data-backed copywriting frameworks crafted to stop the scroll and keep
                readers riveted through the entire post.
              </p>
              <div className={styles.cardCheckItem}>
                <span className={styles.checkBadge}>✓</span>
                <span>Optimized for dwell time and algorithmic distribution</span>
              </div>
            </div>

            <div className={`${styles.featureCard} anim-card`}>
              <div className={styles.cardIconCircle}>🎯</div>
              <h3 className={styles.cardHeading}>Audience Calibration</h3>
              <p className={styles.cardParagraph}>
                Pinpoint high-value decision-makers in your target industry so every post
                attracts real business opportunities.
              </p>
              <div className={styles.cardCheckItem}>
                <span className={styles.checkBadge}>✓</span>
                <span>Zero fluff, pure authoritative positioning</span>
              </div>
            </div>

            <div className={`${styles.featureCard} anim-card`}>
              <div className={styles.cardIconCircle}>📈</div>
              <h3 className={styles.cardHeading}>Turnkey Content Engine</h3>
              <p className={styles.cardParagraph}>
                Spend 45 minutes a month on strategy while we handle the research, drafting,
                formatting, and continuous iteration.
              </p>
              <div className={styles.cardCheckItem}>
                <span className={styles.checkBadge}>✓</span>
                <span>Consistent 4-5 posts weekly without burning hours</span>
              </div>
            </div>
          </div>
        </section>

        {/* Dark Contrast Section (Ink Violet) */}
        <section id="cta" className={styles.darkContrastSection}>
          <div
            className="glow-blob-magenta"
            style={{ bottom: "-150px", left: "20%", opacity: 0.2 }}
          />

          <div className={styles.darkCtaBox}>
            <div className="badge-lime" style={{ marginBottom: "1.5rem" }}>
              Ready to Expand Your Reach?
            </div>
            <h2 className={styles.darkTitle}>
              Ready to Turn LinkedIn into Your #1 Growth Channel?
            </h2>
            <p className={styles.darkSubtitle}>
              Join founders and executives growing their audience and inbound pipeline with Revloom.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#" className="btn btn-primary" style={{ padding: "1rem 2.25rem" }}>
                Start Growing with Revloom
              </a>
              <a href="#features" className="btn btn-secondary" style={{ color: "#ffffff", borderColor: "rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.08)" }}>
                Explore Case Studies
              </a>
            </div>

            <div className={styles.footerBottom}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ color: "var(--color-secondary)" }}>✦</span>
                <span style={{ fontFamily: "var(--font-headline)", fontWeight: 700 }}>
                  Revloom
                </span>
                <span>© {new Date().getFullYear()} All rights reserved.</span>
              </div>
              <div>Helping leaders build reach & content on LinkedIn.</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
