"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { EMOJI_LOTTIE_MAP } from "@/lib/lottie-emojis";
import styles from "./positioning-quiz.module.css";

const OPTIONS = [
  {
    id: 1,
    icon: "👤",
    text: "We are just getting started. We need visibility.",
  },
  {
    id: 2,
    icon: "🎯",
    text: "People know my business, but not me.",
  },
  {
    id: 3,
    icon: "📈",
    text: "I need more conversations with potential clients.",
  },
  {
    id: 4,
    icon: "💬",
    text: "We have a sales funnel. Now we need it to expand and double down.",
  },
  {
    id: 5,
    icon: "🚀",
    text: "We have a good product, but we're not reaching enough decision-makers.",
  },
];

function LinkedInLogo({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="24" height="24" rx="5.5" fill="#0A66C2" />
      <path
        d="M7.12 18.25V9.75H4.38V18.25H7.12ZM5.75 8.58C6.63 8.58 7.34 7.87 7.34 6.99C7.34 6.11 6.63 5.4 5.75 5.4C4.87 5.4 4.16 6.11 4.16 6.99C4.16 7.87 4.87 8.58 5.75 8.58ZM19.62 18.25V13.38C19.62 10.99 18.34 9.88 16.64 9.88C15.27 9.88 14.65 10.63 14.31 11.16V9.75H11.57C11.61 10.52 11.57 18.25 11.57 18.25H14.31V13.5C14.31 13.25 14.33 12.99 14.41 12.8C14.62 12.28 15.1 11.74 15.91 11.74C16.98 11.74 17.41 12.55 17.41 13.74V18.25H19.62Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function EmailLogo({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="24" height="24" rx="5.5" fill="#6C2BD9" />
      <path
        d="M4.75 7.75C4.75 7.06 5.31 6.5 6 6.5H18C18.69 6.5 19.25 7.06 19.25 7.75V16.25C19.25 16.94 18.69 17.5 18 17.5H6C5.31 17.5 4.75 16.94 4.75 16.25V7.75Z"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 7.5L12 12.5L18.5 7.5"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getSuggestion(checkedSet) {
  const selected = Array.from(checkedSet);
  if (selected.length === 0) {
    return {
      type: "empty",
      badge: "Diagnostic Audit",
      items: [{ label: "Select Challenge", icon: null }],
      emojiLevel: 0,
      color: "neutral",
    };
  }

  const has1 = checkedSet.has(1);
  const has2 = checkedSet.has(2);
  const has3 = checkedSet.has(3);
  const has4 = checkedSet.has(4);
  const has5 = checkedSet.has(5);

  // If 3 is selected, or both (4 and 5), or 3+ options: Suggest LinkedIn + Email outreach
  if (has3 || (has4 && has5) || (has4 && (has1 || has2)) || selected.length >= 3) {
    return {
      type: "linkedin_email",
      badge: "Recommended Strategy",
      items: [
        { label: "LinkedIn", icon: "linkedin" },
        { label: "Email outreach", icon: "email" },
      ],
      emojiLevel: Math.min(5, selected.length),
      color: "pink",
    };
  }

  // If 4 is selected: Suggest Email Outreach
  if (has4 && !has5) {
    return {
      type: "email",
      badge: "Recommended Strategy",
      items: [{ label: "Email outreach", icon: "email" }],
      emojiLevel: Math.min(5, selected.length),
      color: "lime",
    };
  }

  // If 5 is selected: Suggest LinkedIn Outreach
  if (has5 && !has4) {
    return {
      type: "linkedin_outreach",
      badge: "Recommended Strategy",
      items: [{ label: "LinkedIn outreach", icon: "linkedin" }],
      emojiLevel: Math.min(5, selected.length),
      color: "lime",
    };
  }

  // If 1 or 2 (or both): Suggest LinkedIn
  return {
    type: "linkedin",
    badge: "Recommended Strategy",
    items: [{ label: "LinkedIn", icon: "linkedin" }],
    emojiLevel: Math.min(5, selected.length),
    color: "violet",
  };
}

export function PositioningQuiz({ onCtaClick }) {
  const [checkedIds, setCheckedIds] = useState(new Set([1]));
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
  const suggestion = getSuggestion(checkedIds);
  const currentEmoji = EMOJI_LOTTIE_MAP[suggestion.emojiLevel] || EMOJI_LOTTIE_MAP[0];
  const strategyAlt = suggestion.items.map((i) => i.label).join(" + ");

  return (
    <section id="positioning-quiz" className={styles.sectionContainer}>
      <div className={styles.contentWrapper}>
        {/* Section Header */}
        <div className={styles.headerArea}>
          <div className={styles.pillBadge}>
            <span className={styles.pulseDot} />
            <span>Interactive Diagnostic</span>
          </div>

          <h2 className={styles.sectionHeading}>
            What does your business <span className="text-gradient">need right now?</span>
          </h2>
          <p className={styles.subText}>
            Choose the challenge closest to where you are.{" "}
            <span className={styles.subTextHint}>(Check all that apply)</span>
          </p>
        </div>

        {/* 2-Column: Challenges List (Left) & Reactive Suggestion Card (Right) */}
        <div className={styles.quizLayout}>
          {/* Options Column */}
          <div
            className={styles.optionsList}
            role="group"
            aria-label="What does your business need right now?"
          >
            {OPTIONS.map((item) => {
              const isChecked = checkedIds.has(item.id);
              const itemId = `${baseId}-${item.id}`;

              return (
                <motion.div
                  key={item.id}
                  id={itemId}
                  role="checkbox"
                  aria-checked={isChecked}
                  tabIndex={0}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => toggleItem(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                      e.preventDefault();
                      toggleItem(item.id);
                    }
                  }}
                  className={`${styles.optionRow} ${
                    isChecked ? styles.optionRowChecked : ""
                  }`}
                >
                  <div className={styles.optionLeft}>
                    <div
                      className={`${styles.checkboxBox} ${
                        isChecked ? styles.checkboxBoxChecked : ""
                      }`}
                      aria-hidden="true"
                    >
                      <AnimatePresence>
                        {isChecked && (
                          <motion.svg
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
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

                    <span className={styles.optionEmoji} aria-hidden="true">
                      {item.icon}
                    </span>
                  </div>

                  <span className={styles.optionText}>{item.text}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Reactive Suggestion & Emoji Card */}
          <div className={styles.emojiCardWrapper}>
            <div className={styles.emojiCard}>
              <div
                className={styles.emojiGlow}
                style={{
                  background: `radial-gradient(circle, ${currentEmoji.glow} 0%, transparent 70%)`,
                }}
              />

              {/* Animated Emoji Avatar */}
              <div className={styles.emojiViewport}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={suggestion.emojiLevel}
                    initial={{ scale: 0.7, opacity: 0, y: 10, rotate: -6 }}
                    animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
                    exit={{ scale: 0.75, opacity: 0, y: -10, rotate: 6 }}
                    transition={{ type: "spring", stiffness: 450, damping: 24 }}
                    className={styles.emojiImgWrapper}
                  >
                    <Image
                      src={currentEmoji.imageSrc}
                      alt={strategyAlt}
                      width={112}
                      height={112}
                      unoptimized
                      priority
                      className={styles.emojiImg}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Suggestion Card Content: Emoji -> Recommended Strategy -> Text (then Logo) -> CTA */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={suggestion.type}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className={styles.suggestionContent}
                >
                  <div
                    className={`${styles.suggestionBadge} ${
                      styles[`badge_${suggestion.color}`]
                    }`}
                  >
                    <span>{suggestion.badge}</span>
                  </div>

                  {/* Channel: LinkedIn (then logo) + Email (then logo) */}
                  <div className={styles.channelRow}>
                    {suggestion.items.map((item, idx) => (
                      <div key={idx} className={styles.channelSegment}>
                        {idx > 0 && <span className={styles.operator}>+</span>}
                        <span className={styles.channelPart}>
                          <span className={styles.channelTitle}>{item.label}</span>
                          {item.icon === "linkedin" && (
                            <LinkedInLogo className={styles.channelLogo} />
                          )}
                          {item.icon === "email" && (
                            <EmailLogo className={styles.channelLogo} />
                          )}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className={styles.ctaWrapper}>
                    <button
                      type="button"
                      onClick={onCtaClick}
                      className={styles.ctaButton}
                    >
                      <span>
                        {checkedCount > 0
                          ? "Book a call for this system →"
                          : "Book a call →"}
                      </span>
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PositioningQuiz;
