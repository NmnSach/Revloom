"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./about-section.module.css";

export function AboutSection() {
  return (
    <section id="about" className={styles.sectionContainer}>
      <div className={styles.backgroundGrid} />
      <div className={styles.ambientAura} />

      <div className={styles.contentWrapper}>

        {/* ── BADGE ── */}
        <div className={styles.badge}>
          <span className={styles.pulseDot} />
          <span>The Founder</span>
        </div>

        {/* ── HEADING (centred) ── */}
        <h2 className={styles.sectionHeading}>
          The person behind{" "}
          <span className={styles.headingAccent}>Revloom</span>
        </h2>

        {/* ── MAIN STAGE ── */}
        <div className={styles.stage}>

          {/* LEFT COLUMN – two stacked text cards */}
          <div className={styles.leftCol}>
            <motion.div
              className={styles.textCard}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className={styles.leadParagraph}>
                Over the last 4 years, I&apos;ve worked with{" "}
                <strong>80+ businesses</strong> and consulted{" "}
                <strong>30+ founders</strong>, agency owners, and freelancers
                on positioning, content, and growth.
              </p>
            </motion.div>

            <motion.div
              className={styles.textCard}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className={styles.bodyParagraph}>
                Along the way, I noticed a common problem: great businesses
                often have the expertise, but struggle to get noticed by the
                right people and turn attention into conversations, especially
                on LinkedIn.{" "}
                <em>(which is predominantly the best place to get revenue for
                a B2B business)</em>
              </p>
            </motion.div>

            {/* Turning Point — moved here from below image */}
            <motion.div
              className={styles.turningPoint}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.2 }}
            >
              <span className={styles.turningTag}>The Turning Point</span>
              <p className={styles.turningText}>That&apos;s why I built Revloom.</p>
            </motion.div>
          </div>

          {/* CENTRE COLUMN – portrait */}
          <div className={styles.centreCol}>
            <motion.div
              className={styles.imageCard}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src="/founder-optimized.jpg"
                  alt="The founder behind Revloom"
                  fill
                  priority
                  className={styles.founderImg}
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 48vw, 420px"
                />
              </div>

              {/* Overlay badge */}
              <div className={styles.imageOverlay}>
                <div className={styles.statusRow}>
                  <span className={styles.statusDot} />
                  <span className={styles.statusText}>Founder & Lead Strategist</span>
                </div>
                <div className={styles.credChip}>4+ Years · 80+ Businesses</div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN – two stacked text cards */}
          <div className={styles.rightCol}>
            <motion.div
              className={styles.textCard}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <p className={styles.bodyParagraph}>
                We combine founder positioning, LinkedIn content, and targeted
                outbound to help B2B businesses build authority and create a
                pipeline of relevant opportunities.
              </p>
            </motion.div>

            <motion.div
              className={`${styles.textCard} ${styles.goalCard}`}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className={styles.goalIconRow}>
                <span className={styles.goalIcon}>🎯</span>
                <strong className={styles.goalLead}>The goal is simple:</strong>
              </div>
              <p className={styles.goalText}>
                Make your brand known, trusted, and worth talking to. That&apos;s
                what Revloom is built to do.
              </p>
            </motion.div>

            {/* Stat chips – 4+ Years + 80+ both on right */}
            <motion.div
              className={styles.statsRow}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.25 }}
            >
              <div className={styles.statChip}>
                <span className={styles.statChipValue}>4+</span>
                <span className={styles.statChipLabel}>Years experience</span>
              </div>
              <div className={styles.statChip}>
                <span className={styles.statChipValue}>80+</span>
                <span className={styles.statChipLabel}>Businesses served</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── STATS BANNER ── */}
        <div className={styles.statsBanner}>
          <div className={styles.statsBannerGlow} />
          <div className={styles.statsBannerInner}>
            <div className={styles.statsBannerHeader}>
              <span className={styles.statsPill}>Industry Research</span>
              <h3 className={styles.statsBannerTitle}>
                Why Executive Positioning Drives Enterprise Pipeline
              </h3>
            </div>
            <div className={styles.statsGrid}>
              {[
                { value: "86%", text: "of buyers say executive visibility influences how they perceive a company." },
                { value: "13X", text: "More value can be associated with recognised expertise and strong industry authority." },
                { value: "45%", text: "of a company's perceived market value can be influenced by the reputation of its CEO." },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  className={styles.statCard}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.1 }}
                >
                  <div className={styles.statValue}>{s.value}</div>
                  <p className={styles.statText}>{s.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutSection;
