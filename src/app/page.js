"use client";

import { useState } from "react";
import Image from "next/image";
import { Hero2 } from "@/components/ui/hero-2";
import { PositioningQuiz } from "@/components/ui/positioning-quiz";
import { WhatWeDo } from "@/components/ui/what-we-do";
import { ProcessSection } from "@/components/ui/process-section";
import { SocialProof } from "@/components/ui/social-proof";
import { SplashScreen } from "@/components/splash-screen";
import styles from "./page.module.css";

export default function Home() {
  const [heroReady, setHeroReady] = useState(false);

  return (
    <SplashScreen onComplete={() => setHeroReady(true)}>
      <div className={styles.pageWrapper}>
        {/* Dark gradient from top fading downwards for transparent nav visibility */}
        <div className={styles.topGradientScrim} />

        {/* Transparent Navigation */}
        <header className={styles.navbar}>
          <div className={styles.navLeft}>
            <a href="#" className={styles.logo} aria-label="Revloom Home">
              <Image
                src="/logo.png"
                alt="Revloom Logo"
                width={38}
                height={38}
                priority
                className={styles.logoImg}
              />
              <span className={styles.logoText}>Revloom</span>
            </a>
          </div>

          <nav className={styles.navCenter}>
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

          <div className={styles.navRight}>
            <a href="#audit" className={`btn btn-primary ${styles.navCta}`}>
              Get Free Audit
            </a>
          </div>
        </header>

        {/* Sections */}
        <main>
          <Hero2 isReady={heroReady} />
          <PositioningQuiz />
          <WhatWeDo />
          <ProcessSection />
          <SocialProof />
        </main>
      </div>
    </SplashScreen>
  );
}

