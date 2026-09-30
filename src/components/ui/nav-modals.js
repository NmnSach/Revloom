"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./nav-modals.module.css";

const DATES = [
  { day: "Mon", date: "Oct 5" },
  { day: "Tue", date: "Oct 6" },
  { day: "Wed", date: "Oct 7" },
  { day: "Thu", date: "Oct 8" },
  { day: "Fri", date: "Oct 9" },
];

const TIME_SLOTS = [
  "10:00 AM",
  "11:30 AM",
  "1:30 PM",
  "3:00 PM",
  "4:30 PM",
  "5:30 PM",
];

export function NavModals({ activeModal, onClose, onSwitchModal }) {
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState("11:30 AM");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    linkedin: "",
    message: "",
  });

  // Handle ESC key to close
  useEffect(() => {
    if (!activeModal) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Lock scroll
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeModal, onClose]);


  if (!activeModal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <AnimatePresence>
      <div className={styles.backdrop} onClick={onClose}>
        <motion.div
          key={activeModal}
          className={`${styles.modalCard} ${
            activeModal === "rev-labs" ? styles.modalCardLabs : ""
          }`}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-modal="true"
        >
          {/* Close Button */}
          <button
            className={`${styles.closeButton} ${
              activeModal === "rev-labs" ? styles.closeButtonDark : ""
            }`}
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Modal Variant: Book a Call */}
          {activeModal === "book-a-call" && (
            <>
              {isSubmitted ? (
                <div className={styles.successView}>
                  <div className={styles.successIconWrap}>
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h3 className={styles.successTitle}>Strategy Call Confirmed!</h3>
                  <p className={styles.successDesc}>
                    We’ve reserved your 30-minute executive session for{" "}
                    <strong>
                      {DATES[selectedDay]?.day}, {DATES[selectedDay]?.date} at {selectedSlot} EST
                    </strong>
                    . A calendar invite has been dispatched to{" "}
                    <strong>{formData.email || "your email"}</strong>.
                  </p>
                  <button className={styles.submitBtn} onClick={onClose}>
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className={styles.pillBadge}>
                    <span className={styles.pulseDot} />
                    <span>30-Min Strategy Call</span>
                  </div>

                  <h3 className={styles.modalTitle}>Book an Executive Discovery Call</h3>
                  <p className={styles.modalSubtitle}>
                    Diagnose your current positioning, identify high-intent audience segments, and map your 90-day authority blueprint with our team.
                  </p>

                  <div className={styles.slotPicker}>
                    <span className={styles.pickerLabel}>1. Select Date</span>
                    <div className={styles.dayTabs}>
                      {DATES.map((item, idx) => (
                        <button
                          key={item.date}
                          type="button"
                          className={`${styles.dayTab} ${
                            selectedDay === idx ? styles.dayTabActive : ""
                          }`}
                          onClick={() => setSelectedDay(idx)}
                        >
                          <span className={styles.dayTabName}>{item.day}</span>
                          <span className={styles.dayTabDate}>{item.date}</span>
                        </button>
                      ))}
                    </div>

                    <span className={styles.pickerLabel}>2. Select Time (EST)</span>
                    <div className={styles.timeSlotsGrid}>
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          className={`${styles.timeSlotBtn} ${
                            selectedSlot === slot ? styles.timeSlotBtnActive : ""
                          }`}
                          onClick={() => setSelectedSlot(slot)}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Satya Nadella"
                        className={styles.inputField}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Work Email</label>
                      <input
                        type="email"
                        required
                        placeholder="satya@company.com"
                        className={styles.inputField}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>LinkedIn Profile URL</label>
                      <input
                        type="url"
                        required
                        placeholder="https://linkedin.com/in/username"
                        className={styles.inputField}
                        value={formData.linkedin}
                        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                      Confirm Strategy Call ({selectedSlot} EST) →
                    </button>
                  </form>

                  <div className={styles.trustPoints}>
                    <span className={styles.trustItem}>
                      <span className={styles.trustIcon}>✓</span> 1-on-1 with founders
                    </span>
                    <span className={styles.trustItem}>
                      <span className={styles.trustIcon}>✓</span> No pitch fluff
                    </span>
                    <span className={styles.trustItem}>
                      <span className={styles.trustIcon}>✓</span> Actionable 90-day roadmap
                    </span>
                  </div>
                </>
              )}
            </>
          )}

          {/* Modal Variant: Contact */}
          {activeModal === "contact" && (
            <>
              {isSubmitted ? (
                <div className={styles.successView}>
                  <div className={styles.successIconWrap}>
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h3 className={styles.successTitle}>Message Received!</h3>
                  <p className={styles.successDesc}>
                    Thanks for reaching out! Our team reviews every inquiry personally and will get back to you at{" "}
                    <strong>{formData.email || "your email"}</strong> within 2 hours.
                  </p>
                  <button className={styles.submitBtn} onClick={onClose}>
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className={styles.pillBadge}>
                    <span className={styles.pulseDot} />
                    <span>Direct Channel</span>
                  </div>

                  <h3 className={styles.modalTitle}>Get in Touch</h3>
                  <p className={styles.modalSubtitle}>
                    Have questions about our sprint workflow, pricing, or custom partnerships? We typically respond within 2 hours.
                  </p>

                  <form onSubmit={handleSubmit} className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Vance"
                        className={styles.inputField}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Work Email</label>
                      <input
                        type="email"
                        required
                        placeholder="alex@acme.com"
                        className={styles.inputField}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>How can we help?</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Tell us about your brand goals, team size, or current LinkedIn bottleneck..."
                        className={styles.textareaField}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                      Send Direct Message →
                    </button>
                  </form>

                  <div className={styles.trustPoints}>
                    <span className={styles.trustItem}>
                      ✉️ Direct: <strong>partners@revloom.com</strong>
                    </span>
                    <span className={styles.trustItem}>•</span>
                    <span className={styles.trustItem}>
                      ⚡ Avg response: <strong>&lt; 2 hrs</strong>
                    </span>
                  </div>
                </>
              )}
            </>
          )}

          {/* Modal Variant: Rev Labs */}
          {activeModal === "rev-labs" && (
            <>
              <div className={styles.ambientGlowLabs} />

              <div className={`${styles.pillBadge} ${styles.pillBadgeLabs}`}>
                <span className={`${styles.pulseDot} ${styles.pulseDotLime}`} />
                <span>R&D • Algorithmic Intelligence</span>
              </div>

              <h3 className={`${styles.modalTitle} ${styles.modalTitleDark}`}>
                Rev Labs
              </h3>
              <p className={`${styles.modalSubtitle} ${styles.modalSubtitleDark}`}>
                Where we engineer proprietary algorithmic tools, neural voice models, and category positioning telemetry before they reach public release.
              </p>

              <div className={styles.labsGrid}>
                <div className={styles.labCard}>
                  <div className={styles.labCardHeader}>
                    <span className={styles.labCardTag}>Neural Voice</span>
                    <span className={styles.labCardStatus}>⚡ Active in Sprints</span>
                  </div>
                  <h4 className={styles.labCardTitle}>Voice Synthesis & Cadence Matcher</h4>
                  <p className={styles.labCardDesc}>
                    Deconstructs 200+ conversational nuances, punctuation rhythms, and mental frameworks from podcast audio to replicate authentic voice without ghostwriter fluff.
                  </p>
                </div>

                <div className={styles.labCard}>
                  <div className={styles.labCardHeader}>
                    <span className={styles.labCardTag}>Distribution Telemetry</span>
                    <span className={styles.labCardStatus}>🔬 Proprietary Model</span>
                  </div>
                  <h4 className={styles.labCardTitle}>Algorithmic Resonance Scoring</h4>
                  <p className={styles.labCardDesc}>
                    Simulates 10,000 feed impressions against current LinkedIn feed weighting to score opening hook retention and virality probability before publishing.
                  </p>
                </div>

                <div className={styles.labCard}>
                  <div className={styles.labCardHeader}>
                    <span className={styles.labCardTag}>Category Moat</span>
                    <span className={styles.labCardStatus}>🔒 Private Beta</span>
                  </div>
                  <h4 className={styles.labCardTitle}>Competitive Whitespace Radar</h4>
                  <p className={styles.labCardDesc}>
                    Continuous vector clustering across 500+ B2B competitor profiles to pinpoint un-owned narrative territories in your market category.
                  </p>
                </div>
              </div>

              <div className={styles.labsActionRow}>
                <button
                  type="button"
                  className={styles.labsPrimaryBtn}
                  onClick={() => onSwitchModal("book-a-call")}
                >
                  Apply for Labs Partner Access →
                </button>
                <button
                  type="button"
                  className={styles.labsSecondaryBtn}
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default NavModals;
