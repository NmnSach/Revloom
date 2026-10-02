"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Hero2 } from "@/components/ui/hero-2";
import { LogoCloud } from "@/components/ui/logo-cloud";
import { PositioningQuiz } from "@/components/ui/positioning-quiz";
import { WhatWeDo } from "@/components/ui/what-we-do";
import { AboutSection } from "@/components/ui/about-section";
import { ProcessSection } from "@/components/ui/process-section";
import { SocialProof } from "@/components/ui/social-proof";
import { FaqSection } from "@/components/ui/faq-section";
import { Footer } from "@/components/ui/footer";
import { SplashScreen } from "@/components/splash-screen";
import { NavModals } from "@/components/ui/nav-modals";
import { ThemeToggle, AnimatedThemeToggler } from "@/components/ui/theme-toggle";
import styles from "./page.module.css";

export default function Home() {
  const [heroReady, setHeroReady] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleScrollLink = useCallback((e, targetId) => {
    if (e && e.preventDefault) e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

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
                <a
                  href="#what-we-do"
                  className={styles.navLink}
                  onClick={(e) => handleScrollLink(e, "what-we-do")}
                >
                  What we do
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className={styles.navLink}
                  onClick={(e) => handleScrollLink(e, "services")}
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className={styles.navLink}
                  onClick={(e) => handleScrollLink(e, "about")}
                >
                  About
                </a>
              </li>
              <li>
                <button
                  type="button"
                  className={styles.navLink}
                  onClick={() => setActiveModal("rev-labs")}
                >
                  Rev Labs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={styles.navLink}
                  onClick={() => setActiveModal("contact")}
                >
                  Contact
                </button>
              </li>
            </ul>
          </nav>

          <div className={styles.navRight}>
            <AnimatedThemeToggler className={styles.desktopThemeToggle} />

            <button
              type="button"
              className={`btn btn-primary ${styles.navCta}`}
              onClick={() => setActiveModal("book-a-call")}
            >
              Book a call
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className={styles.mobileMenuToggle}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer & Backdrop */}
        {mobileMenuOpen && (
          <>
            <div
              className={styles.mobileBackdrop}
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <nav className={styles.mobileDrawer} aria-label="Mobile Navigation">
            <ThemeToggle variant="drawer" />

            <ul className={styles.mobileDrawerLinks}>
              <li>
                <button
                  type="button"
                  className={styles.mobileDrawerLink}
                  onClick={(e) => handleScrollLink(e, "what-we-do")}
                >
                  <span>What we do</span>
                  <span className={styles.mobileDrawerArrow}>→</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={styles.mobileDrawerLink}
                  onClick={(e) => handleScrollLink(e, "services")}
                >
                  <span>Services</span>
                  <span className={styles.mobileDrawerArrow}>→</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={styles.mobileDrawerLink}
                  onClick={(e) => handleScrollLink(e, "about")}
                >
                  <span>About</span>
                  <span className={styles.mobileDrawerArrow}>→</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={styles.mobileDrawerLink}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveModal("rev-labs");
                  }}
                >
                  <span>Rev Labs</span>
                  <span className={styles.mobileDrawerArrow}>→</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={styles.mobileDrawerLink}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveModal("contact");
                  }}
                >
                  <span>Contact</span>
                  <span className={styles.mobileDrawerArrow}>→</span>
                </button>
              </li>
            </ul>

            <button
              type="button"
              className={styles.mobileDrawerCta}
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveModal("book-a-call");
              }}
            >
              <span>Book a call</span>
              <span>→</span>
            </button>
          </nav>
        </>
      )}

        {/* Sections */}
        <main>
          <Hero2
            isReady={heroReady}
            onAuditClick={(e) => {
              if (e && e.preventDefault) e.preventDefault();
              setActiveModal("book-a-call");
            }}
            onHowItWorksClick={(e) => handleScrollLink(e, "what-we-do")}
          />
          <LogoCloud />
          <WhatWeDo />
          <AboutSection />
          <PositioningQuiz onCtaClick={() => setActiveModal("book-a-call")} />
          <ProcessSection />
          <SocialProof />
          <FaqSection
            onBookCallClick={() => setActiveModal("book-a-call")}
            onContactClick={() => setActiveModal("contact")}
          />
        </main>

        {/* Retool-inspired Rich Footer */}
        <Footer
          onBookCallClick={() => setActiveModal("book-a-call")}
          onContactClick={() => setActiveModal("contact")}
          onRevLabsClick={() => setActiveModal("rev-labs")}
          onScrollLink={handleScrollLink}
        />

        {/* Interactive Modals for Book a Call, Contact, and Rev Labs */}
        <NavModals
          activeModal={activeModal}
          onClose={() => setActiveModal(null)}
          onSwitchModal={(modal) => setActiveModal(modal)}
        />
      </div>
    </SplashScreen>
  );
}

