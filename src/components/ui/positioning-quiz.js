"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { EMOJI_LOTTIE_MAP } from "@/lib/lottie-emojis";
import styles from "./positioning-quiz.module.css";

const OPTIONS = [
  {
    id: "clarity",
    text: "Visitors land on your profile but can't tell what you actually do",
  },
  {
    id: "offers",
    text: "You've got 3 offers and 0 one-liners",
  },
  {
    id: "niche",
    text: "You're chasing every audience instead of owning one",
  },
  {
    id: "differentiation",
    text: "You know your offer is good, but can't explain why you over the next founder",
  },
  {
    id: "explaining",
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
  const currentEmoji = EMOJI_LOTTIE_MAP[checkedCount] || EMOJI_LOTTIE_MAP[0];

  return (
    <section id="positioning-quiz" className={styles.sectionContainer}>
      <div className={styles.contentWrapper}>
        {/* Minimal Section Header */}
        <div className={styles.headerArea}>
          <h2 className={styles.sectionHeading}>
            Do you have a <span className="text-gradient">positioning problem</span>?
          </h2>
          <p className={styles.subText}>(Check all that apply)</p>
        </div>

        {/* Minimal 2-Column: Options List (Left) & Reactive Animated Emoji Card (Right) */}
        <div className={styles.quizLayout}>
          {/* Options Column */}
          <div className={styles.optionsList} role="group" aria-label="Positioning problem options">
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
                          transition={{ type: "spring", stiffness: 500, damping: 28 }}
                          viewBox="0 0 24 24"
                          fill="none"
                          className={styles.checkIcon}
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </motion.svg>
                      )}
                    </AnimatePresence>
                  </div>

                  <span className={styles.optionText}>{item.text}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Reactive Emoji Reactor Card */}
          <div className={styles.emojiCardWrapper}>
            <div className={styles.emojiCard}>
              <div
                className={styles.emojiGlow}
                style={{
                  background: `radial-gradient(circle, ${currentEmoji.glow} 0%, transparent 70%)`,
                }}
              />

              {/* Animated Emoji Container */}
              <div className={styles.emojiViewport}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={checkedCount}
                    initial={{ scale: 0.65, opacity: 0, y: 12, rotate: -8 }}
                    animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
                    exit={{ scale: 0.7, opacity: 0, y: -12, rotate: 8 }}
                    transition={{ type: "spring", stiffness: 450, damping: 24 }}
                    className={styles.emojiImgWrapper}
                  >
                    <Image
                      src={currentEmoji.imageSrc}
                      alt={currentEmoji.headline}
                      width={128}
                      height={128}
                      unoptimized
                      priority
                      className={styles.emojiImg}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className={styles.reactionTextGroup}>
                <h3 className={styles.reactionHeadline}>
                  {currentEmoji.headline}
                </h3>
                <p className={styles.reactionSubline}>
                  {currentEmoji.subline}
                </p>
              </div>

              {checkedCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={styles.ctaWrapper}
                >
                  <a
                    href="#audit"
                    onClick={onCtaClick}
                    className={styles.ctaButton}
                  >
                    <span>Fix your positioning →</span>
                  </a>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PositioningQuiz;
