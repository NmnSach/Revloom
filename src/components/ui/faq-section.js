"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./faq-section.module.css";

const FAQS = [
  {
    id: "faq-1",
    question: "How soon can we expect to see qualified meetings and pipeline from our campaigns?",
    answer:
      "While outbound results compound over time, technical domain warm-ups and ICP targeting are completed in Weeks 1–2, with live outreach launching by Day 15. Most clients begin seeing qualified replies and first booked sales conversations within 3 to 4 weeks of launch, scaling consistently into months two and three.",
  },
  {
    id: "faq-2",
    question: "Why combine LinkedIn outreach with cold email instead of just picking one?",
    answer:
      "Multi-channel outbound consistently outperforms single-channel campaigns by up to 3x. Cold email gives you scale, deliverability, and the reach to target thousands of verified decision-makers. LinkedIn provides social proof, familiar context, and human-to-human credibility. Together, they create multiple high-trust touchpoints without feeling generic or spammy.",
  },
  {
    id: "faq-3",
    question: "How do you protect our LinkedIn profile and email domain reputation from getting flagged?",
    answer:
      "We strictly adhere to safe platform thresholds. On LinkedIn, we use human-paced connection limits and tailored 1-on-1 messaging rather than aggressive automated blasts. For email, we configure dedicated secondary sending domains with complete DNS authentication (SPF, DKIM, DMARC, MX records) and a 14-day gradual inbox warm-up so your primary business domain is never put at risk.",
  },
  {
    id: "faq-4",
    question: "How much time will my team or I need to invest each week?",
    answer:
      "Minimal — typically less than 60 to 90 minutes per week. We handle the heavy lifting: ICP definition, prospect list building, copywriting, technical deliverability, and campaign execution. Your primary role is to review and approve initial messaging drafts, and take the qualified sales meetings our team books directly onto your calendar.",
  },
];

export function FaqSection({ onBookCallClick, onContactClick }) {
  const [openIndex, setOpenIndex] = useState(0); // First question open by default

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section id="faq" className={styles.sectionContainer}>
      {/* Background Architectural Grid & Ambient Aura */}
      <div className={styles.backgroundGrid} />
      <div className={styles.ambientAura} />

      <div className={styles.contentWrapper}>
        {/* Simple Centered Heading */}
        <div className={styles.headerArea}>
          <div className={styles.badge}>
            <span className={styles.pulseDot} />
            <span>FAQ</span>
          </div>

          <h2 className={styles.sectionHeading}>
            Frequently Asked <span className="text-gradient">Questions.</span>
          </h2>
        </div>

        {/* Accordions */}
        <div className={styles.accordionList} role="region" aria-label="Frequently Asked Questions">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id}
                className={`${styles.accordionItem} ${isOpen ? styles.accordionItemOpen : ""}`}
              >
                <button
                  type="button"
                  className={styles.questionButton}
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <span className={styles.questionText}>{faq.question}</span>
                  <span
                    className={`${styles.iconPill} ${isOpen ? styles.iconPillOpen : ""}`}
                    aria-hidden="true"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.chevronIcon}
                    >
                      <line x1="12" y1="5" x2="12" y2="19" className={styles.verticalLine} />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      key={`answer-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className={styles.answerWrapper}
                    >
                      <div className={styles.answerContent}>
                        <p className={styles.answerText}>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Subtle Support Prompt */}
        <div className={styles.supportPrompt}>
          <span className={styles.supportText}>Still have a question?</span>
          <button
            type="button"
            className={styles.supportLink}
            onClick={onContactClick || onBookCallClick}
          >
            Chat with our team directly →
          </button>
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
