"use client";

import Image from "next/image";
import styles from "./footer.module.css";

export function Footer({
  onBookCallClick,
  onContactClick,
  onRevLabsClick,
  onScrollLink,
}) {
  const handleLink = (e, targetId) => {
    if (onScrollLink) {
      onScrollLink(e, targetId);
    }
  };

  return (
    <footer className={styles.footerContainer}>
      {/* Background Radiance */}
      <div className={styles.ambientGlow} />

      <div className={styles.footerContent}>
        {/* Top Multi-Column Navigation Grid */}
        <div className={styles.navGrid}>
          {/* Col 1: Services */}
          <div className={styles.navCol}>
            <span className={styles.colTitle}>Services</span>
            <ul className={styles.linkList}>
              <li>
                <a href="#what-we-do" onClick={(e) => handleLink(e, "what-we-do")}>
                  LinkedIn Positioning
                </a>
              </li>
              <li>
                <a href="#what-we-do" onClick={(e) => handleLink(e, "what-we-do")}>
                  LinkedIn Lead Gen
                </a>
              </li>
              <li>
                <a href="#what-we-do" onClick={(e) => handleLink(e, "what-we-do")}>
                  Email + LinkedIn Outbound
                </a>
              </li>
              <li>
                <a href="#what-we-do" onClick={(e) => handleLink(e, "what-we-do")}>
                  Founder Brand Strategy
                </a>
              </li>
              <li>
                <button
                  type="button"
                  className={styles.textButton}
                  onClick={onRevLabsClick}
                >
                  Rev Labs <span className={styles.miniTag}>New</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: The System */}
          <div className={styles.navCol}>
            <span className={styles.colTitle}>The System</span>
            <ul className={styles.linkList}>
              <li>
                <a href="#process" onClick={(e) => handleLink(e, "process")}>
                  5-Phase Architecture
                </a>
              </li>
              <li>
                <a href="#process" onClick={(e) => handleLink(e, "process")}>
                  Discovery & Audit
                </a>
              </li>
              <li>
                <a href="#process" onClick={(e) => handleLink(e, "process")}>
                  Technical Infrastructure
                </a>
              </li>
              <li>
                <a href="#process" onClick={(e) => handleLink(e, "process")}>
                  Research & Content
                </a>
              </li>
              <li>
                <a href="#process" onClick={(e) => handleLink(e, "process")}>
                  Live Campaign Launch
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div className={styles.navCol}>
            <span className={styles.colTitle}>Resources</span>
            <ul className={styles.linkList}>
              <li>
                <a href="#quiz" onClick={(e) => handleLink(e, "quiz")}>
                  Positioning Quiz
                </a>
              </li>
              <li>
                <a href="#quiz" onClick={(e) => handleLink(e, "quiz")}>
                  Revenue Leak Calculator
                </a>
              </li>
              <li>
                <a href="#reviews" onClick={(e) => handleLink(e, "reviews")}>
                  Client Case Studies
                </a>
              </li>
              <li>
                <a href="#reviews" onClick={(e) => handleLink(e, "reviews")}>
                  Verified Results
                </a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => handleLink(e, "faq")}>
                  Growth FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Company */}
          <div className={styles.navCol}>
            <span className={styles.colTitle}>Company</span>
            <ul className={styles.linkList}>
              <li>
                <a href="#about" onClick={(e) => handleLink(e, "about")}>
                  About the Founder
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleLink(e, "about")}>
                  Our Philosophy
                </a>
              </li>
              <li>
                <button
                  type="button"
                  className={styles.textButton}
                  onClick={onContactClick}
                >
                  Direct Inquiry
                </button>
              </li>
              <li>
                <a href="mailto:help@revloom.in" className={styles.contactEmail}>
                  help@revloom.in
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Actions & Legal (Matching Retool Layout) */}
          <div className={`${styles.navCol} ${styles.actionCol}`}>
            <div className={styles.buttonStack}>
              <button
                type="button"
                className={styles.primaryCta}
                onClick={onBookCallClick}
              >
                Book a Call
              </button>
              <button
                type="button"
                className={styles.secondaryCta}
                onClick={(e) => handleLink(e, "quiz")}
              >
                Positioning Quiz
              </button>
            </div>

            <div className={styles.legalLinks}>
              <a href="#privacy" onClick={(e) => e.preventDefault()}>Terms of Use</a>
              <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
              <a href="#privacy" onClick={(e) => e.preventDefault()}>Security</a>
            </div>

            <span className={styles.copyright}>© Revloom 2026</span>
          </div>
        </div>

        {/* Bottom Giant Brand Lockup (Logo + Wordmark) */}
        <div className={styles.giantBrandRow}>
          <div className={styles.brandLockup}>
            <Image
              src="/logo.png"
              alt="Revloom Mark"
              width={140}
              height={140}
              className={styles.giantLogo}
            />
            <span className={styles.giantWordmark}>Revloom</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
