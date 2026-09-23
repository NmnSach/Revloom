"use client";

import { motion } from "framer-motion";
import styles from "./what-we-do.module.css";

const ENGINE_CARDS = [
  {
    step: "01",
    category: "Positioning & ICP",
    title: "Positioning First",
    description:
      "Before we write a word, we nail down what makes you different and who needs to hear it.",
    visual: "positioning",
  },
  {
    step: "02",
    category: "Autonomous Execution",
    title: "Content, Fully Managed",
    description:
      "Captions, comments, DMs — your presence stays active and on-brand without you touching a keyboard.",
    visual: "managed",
  },
  {
    step: "03",
    category: "Performance Intelligence",
    title: "Data-Driven Iteration",
    description:
      "We don't guess. Every post is a test; every result shapes the next one.",
    visual: "iteration",
  },
  {
    step: "04",
    category: "Conversion Architecture",
    title: "A Profile That Sells",
    description:
      "Your page becomes a landing page, not a résumé — built to convert visitors into calls.",
    visual: "profile",
  },
];

export function WhatWeDo() {
  return (
    <section id="how-it-works" className={styles.sectionContainer}>
      {/* Background Architectural Grid & Subtle Radial Aura */}
      <div className={styles.backgroundGrid} />
      <div className={styles.ambientAura} />

      <div className={styles.contentWrapper}>
        {/* Section Header */}
        <div className={styles.headerArea}>
          <div className={styles.pillBadge}>
            <span className={styles.pulseDot} />
            <span>Section 03 • What We Do</span>
          </div>

          <h2 className={styles.sectionHeading}>
            We Don&apos;t Just Write Posts.{" "}
            <span className="text-gradient">We Build a Growth Engine.</span>
          </h2>

          <p className={styles.subText}>
            Strategy, content, and engagement — run as one system, not three freelancers.
          </p>
        </div>

        {/* 4-Card 2x2 Grid Layout */}
        <div className={styles.cardGrid}>
          {ENGINE_CARDS.map((card, index) => (
            <motion.div
              key={card.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4 }}
              className={styles.engineCard}
            >
              {/* Card Header & Problem/Solution Copy */}
              <div className={styles.cardTextHeader}>
                <div className={styles.cardCategoryRow}>
                  <span className={styles.categoryTag}>✦ {card.category}</span>
                  <span className={styles.stepNumber}>{card.step}</span>
                </div>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDescription}>{card.description}</p>
              </div>

              {/* Dynamic Visual Demonstrations */}
              <div className={styles.visualPreviewBox}>
                {/* Visual 1: Positioning Comparison Matrix */}
                {card.visual === "positioning" && (
                  <div className={styles.compareRow}>
                    <div className={`${styles.compareItem} ${styles.compareGeneric}`}>
                      <span className={styles.compareIconBad}>✕</span>
                      <span>Generic: &quot;We help B2B tech companies scale revenue&quot;</span>
                    </div>

                    <div className={`${styles.compareItem} ${styles.compareRevloom}`}>
                      <span className={styles.compareIconGood}>✓</span>
                      <span>Revloom: &quot;The category standard turning Series A founders into $50k+ ACV inbound engines&quot;</span>
                    </div>

                    <div className={styles.matrixPillsRow}>
                      <span className={styles.matrixPill}>🎯 ICP Locked</span>
                      <span className={styles.matrixPill}>⚡ Category Thesis</span>
                      <span className={styles.matrixPill}>🔥 4.8x Trust Multiplier</span>
                    </div>
                  </div>
                )}

                {/* Visual 2: Autonomous Activity Engine */}
                {card.visual === "managed" && (
                  <div className={styles.activityList}>
                    <div className={styles.activityItem}>
                      <div className={styles.activityLeft}>
                        <span className={styles.activityIcon}>📝</span>
                        <span>Daily Authority Post</span>
                      </div>
                      <span className={styles.activityBadge}>Scheduled (08:30 AM)</span>
                    </div>

                    <div className={styles.activityItem}>
                      <div className={styles.activityLeft}>
                        <span className={styles.activityIcon}>💬</span>
                        <span>C-Level Comment Engine</span>
                      </div>
                      <span className={styles.activityBadgeActive}>38 Active Replies</span>
                    </div>

                    <div className={styles.activityItem}>
                      <div className={styles.activityLeft}>
                        <span className={styles.activityIcon}>📥</span>
                        <span>High-Ticket Lead DMs</span>
                      </div>
                      <span className={styles.activityBadge}>Calendar Routed</span>
                    </div>

                    <div className={styles.activityFooter}>
                      <span>Automated Pipeline Operations</span>
                      <span className={styles.timeSavedHighlight}>0 Founder Hours / Wk</span>
                    </div>
                  </div>
                )}

                {/* Visual 3: Data-Driven Iteration A/B Test */}
                {card.visual === "iteration" && (
                  <div className={styles.hookTestRow}>
                    <div className={styles.iterationHeader}>
                      <span className={styles.iterationLabel}>A/B Hook Velocity Test</span>
                      <span className={styles.winnerPill}>✓ Winning Formula</span>
                    </div>

                    <div className={styles.hookBarGroup}>
                      <div className={styles.hookInfo}>
                        <span className={styles.hookName}>Hook A: Feature-Based</span>
                        <span className={styles.hookMetrics}>4.1k views • 1.2% CTR</span>
                      </div>
                      <div className={styles.hookTrack}>
                        <div className={styles.hookFillBaseline} style={{ width: "22%" }} />
                      </div>
                    </div>

                    <div className={styles.hookBarGroup}>
                      <div className={styles.hookInfo}>
                        <span className={styles.hookName}>Hook B: Contrarian Category POV</span>
                        <span className={styles.hookMetrics}>26.8k views • 5.8% CTR (+553%)</span>
                      </div>
                      <div className={styles.hookTrack}>
                        <div className={styles.hookFillWinner} style={{ width: "88%" }} />
                      </div>
                    </div>

                    <div className={styles.iterationNote}>
                      <span>↳ Pattern extracted &amp; synthesized into next week&apos;s editorial sprint</span>
                    </div>
                  </div>
                )}

                {/* Visual 4: A Profile That Sells Mockup */}
                {card.visual === "profile" && (
                  <div className={styles.profileHeroMock}>
                    <div className={styles.profileBanner} />
                    <div className={styles.profileDetails}>
                      <div className={styles.profileAvatar}>NS</div>
                      <div className={styles.profileNameRow}>
                        <span className={styles.profileName}>
                          Founder &amp; CEO <span className={styles.verifiedCheck}>✓</span>
                        </span>
                        <span className={styles.conversionBadge}>4.6% Lead Rate</span>
                      </div>

                      <p className={styles.profileHeadline}>
                        Positioning Series A Founders to Command Category Authority &amp; Pipeline Inbound.
                      </p>

                      <div className={styles.profileCtaMock}>
                        Book 15-Min Strategy Briefing →
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhatWeDo;
