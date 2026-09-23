"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./positioning-quiz.module.css";

const BENTO_QUIZ_ITEMS = [
  {
    id: "clarity",
    tag: "Profile Clarity",
    spanClass: styles.cardSpan7,
    text: "Visitors land on your profile but can't tell what you actually do",
  },
  {
    id: "offers",
    tag: "Offer Framing",
    spanClass: styles.cardSpan5,
    text: "You've got 3 offers and 0 one-liners",
  },
  {
    id: "niche",
    tag: "Niche Focus",
    spanClass: styles.cardSpan5,
    text: "You're chasing every audience instead of owning one",
  },
  {
    id: "differentiation",
    tag: "Differentiation",
    spanClass: styles.cardSpan7,
    text: "You know your offer is good, but can't explain why you over the next founder",
  },
  {
    id: "explaining",
    tag: "Sales Velocity",
    spanClass: styles.cardSpan12,
    text: "You spend more time explaining your product than selling it",
  },
];

export function PositioningQuiz({ onCtaClick }) {
  const [checkedIds, setCheckedIds] = useState(
    new Set(["clarity", "differentiation"])
  );
  const baseId = useId();

  const toggleItem = (id) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const checkedCount = checkedIds.size;
  const progressPercent = (checkedCount / BENTO_QUIZ_ITEMS.length) * 100;

  // Dynamic diagnostic messaging based on checked count
  const getDiagnosis = () => {
    if (checkedCount === 0) {
      return {
        pillText: "Select Your Bottlenecks",
        pillClass: styles.statusPillNeutral,
        dotClass: styles.statusDotNeutral,
        title: "How positioned is your profile?",
        description:
          "Select any of the 5 common executive positioning bottlenecks in the grid to diagnose your profile's pipeline leakage.",
        impactBadge: "Pending Selection",
        impactNote:
          "Select one or more bottlenecks on the left to map your custom positioning audit.",
      };
    }
    if (checkedCount <= 2) {
      return {
        pillText: "Positioning Friction Detected",
        pillClass: styles.statusPillWarning,
        dotClass: styles.statusDotWarning,
        title: "Leaking 30%–50% of Inbound Opportunities",
        description:
          "High-value visitors land on your profile, but ambiguous category framing is causing decision-makers to hesitate and scroll past.",
        impactBadge: "30%–50% Inbound Drag",
        impactNote:
          "Targeted category repositioning will turn ambiguous profile views into immediate pipeline conversations.",
      };
    }
    if (checkedCount <= 4) {
      return {
        pillText: "Severe Category Confusion",
        pillClass: styles.statusPillCritical,
        dotClass: styles.statusDotCritical,
        title: "Being Compared on Price Instead of Authority",
        description:
          "Your product is strong, but your messaging explains features rather than commanding category leadership. Prospects treat you like an option, not the standard.",
        impactBadge: "60%+ Authority Discount",
        impactNote:
          "Rebuilding your offer narrative will anchor premium pricing and eliminate competitive comparison.",
      };
    }
    return {
      pillText: "Critical Positioning Blockade",
      pillClass: styles.statusPillCritical,
      dotClass: styles.statusDotCritical,
      title: "Full Inbound Conversion Blockade Across LinkedIn",
      description:
        "Your profile is actively working against your pipeline. A turnkey repositioning will immediately turn your existing views into qualified inbound sales calls.",
      impactBadge: "Critical Funnel Blockade",
      impactNote:
        "Complete executive overhaul required to unlock enterprise trust and inbound deal flow.",
    };
  };

  const diagnosis = getDiagnosis();

  return (
    <section id="positioning-quiz" className={styles.sectionContainer}>
      {/* Background Architectural Grid & Subtle Radial Aura */}
      <div className={styles.backgroundGrid} />
      <div className={styles.ambientAura} />

      <div className={styles.contentWrapper}>
        {/* Section Header */}
        <div className={styles.headerArea}>
          <div className={styles.pillBadge}>
            <span className={styles.pulseDot} />
            <span>Section 02 • Positioning Diagnosis</span>
          </div>

          <h2 className={styles.sectionHeading}>
            Your LinkedIn Has a{" "}
            <span className="text-gradient">Positioning Problem</span>{" "}
            <span className={styles.headingParen}>(Most Do)</span>
          </h2>

          <p className={styles.subText}>
            Great products lose to average ones every day — because the average one
            is easier to understand. Check what applies to you:
          </p>
        </div>

        {/* 2-Column Main Layout: Selectable Bento Grid (Left) & Fix My Positioning Div (Right) */}
        <div className={styles.mainLayout}>
          {/* Selectable Bento Grid */}
          <div
            className={styles.bentoGrid}
            role="group"
            aria-label="Selectable Positioning Problem Bento Grid"
          >
            {BENTO_QUIZ_ITEMS.map((item) => {
              const isChecked = checkedIds.has(item.id);
              const itemId = `${baseId}-${item.id}`;

              return (
                <div
                  key={item.id}
                  id={itemId}
                  role="checkbox"
                  aria-checked={isChecked}
                  tabIndex={0}
                  onClick={() => toggleItem(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                      e.preventDefault();
                      toggleItem(item.id);
                    }
                  }}
                  className={`${styles.bentoCard} ${item.spanClass} ${
                    isChecked ? styles.bentoCardChecked : ""
                  }`}
                >
                  {/* Card Header: Category Tag & Tactile Checkbox */}
                  <div className={styles.cardHeader}>
                    <span className={styles.cardTag}>✦ {item.tag}</span>

                    <div
                      className={`${styles.checkboxBox} ${
                        isChecked ? styles.checkboxBoxChecked : ""
                      }`}
                      aria-hidden="true"
                    >
                      <AnimatePresence>
                        {isChecked && (
                          <motion.svg
                            initial={{ scale: 0, opacity: 0, rotate: -20 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 28,
                            }}
                            viewBox="0 0 24 24"
                            fill="none"
                            className={styles.checkIcon}
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </motion.svg>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Card Problem Copy */}
                  <p className={styles.cardText}>{item.text}</p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Fix My Positioning Div (Assessment Card matching Bento Height) */}
          <div className={styles.rightSidebar}>
            <div className={styles.diagnosisCard}>
              {/* Top Group: Header, Progress Bar, Diagnosis Text */}
              <div className={styles.cardTopGroup}>
                <div className={styles.diagnosisHeader}>
                  <div className={styles.diagnosisCounter}>
                    <span className={styles.counterNumber}>{checkedCount}</span>
                    <span className={styles.counterTotal}>of 5 Identified</span>
                  </div>

                  <div className={`${styles.statusPill} ${diagnosis.pillClass}`}>
                    <span
                      className={`${styles.statusDot} ${diagnosis.dotClass}`}
                    />
                    <span>{diagnosis.pillText}</span>
                  </div>
                </div>

                {/* Real-Time Severity Progress Bar */}
                <div className={styles.meterTrack} aria-hidden="true">
                  <div
                    className={styles.meterFill}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* Diagnosis Copy Group */}
                <div className={styles.diagnosisTextGroup}>
                  <h3 className={styles.diagnosisTitle}>{diagnosis.title}</h3>
                  <p className={styles.diagnosisDescription}>
                    {diagnosis.description}
                  </p>
                </div>
              </div>

              {/* Middle Group: Priority Focus Areas & Dynamic Pill Chips */}
              <div className={styles.impactCard}>
                <div className={styles.impactHeader}>
                  <span className={styles.impactLabel}>PRIORITY FOCUS AREAS</span>
                  <span className={styles.impactBadge}>{diagnosis.impactBadge}</span>
                </div>

                {checkedCount > 0 ? (
                  <div className={styles.selectedPillContainer}>
                    {Array.from(checkedIds).map((id) => {
                      const item = BENTO_QUIZ_ITEMS.find((i) => i.id === id);
                      if (!item) return null;
                      return (
                        <span key={id} className={styles.selectedPill}>
                          <span className={styles.selectedPillCheck}>✓</span>
                          {item.tag}
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  <p className={styles.impactEmptyNote}>
                    Select any bottleneck on the left to map your custom positioning sprint.
                  </p>
                )}

                <p className={styles.impactNote}>{diagnosis.impactNote}</p>
              </div>

              {/* Bottom Group: Primary Result CTA Button & Micro-Trust Note */}
              <div className={styles.cardBottomGroup}>
                <a
                  href="#audit"
                  onClick={onCtaClick}
                  className={styles.ctaButton}
                >
                  <span>Fix My Positioning →</span>
                </a>

                <div className={styles.microTrust}>
                  <span>Free 15-min audit</span>
                  <span className={styles.trustDot}>•</span>
                  <span>48hr turnaround</span>
                  <span className={styles.trustDot}>•</span>
                  <span>No deck needed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PositioningQuiz;
