"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./nav-modals.module.css";



export function NavModals({ activeModal, onClose, onSwitchModal }) {
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    linkedin: "",
    message: "",
  });

  // Handle ESC key to close
  useEffect(() => {
    if (!activeModal) {
      setIsSubmitted(false);
      return;
    }

    if (activeModal === "book-a-call") {
      setIsIframeLoading(true);
    }

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
            activeModal === "book-a-call" ? styles.modalCardBooking : ""
          } ${
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
          {/* Close Button — Universally rendered on top-right of all modals */}
          <button
            type="button"
            className={`${styles.closeButton} ${
              activeModal === "rev-labs" ? styles.closeButtonDark : ""
            } ${
              activeModal === "book-a-call" ? styles.closeButtonBooking : ""
            }`}
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Modal Variant: Book a Call (Calendly Iframe) */}
          {activeModal === "book-a-call" && (
            <div className={styles.bookingModalLayout}>
              {/* Header Bar */}
              <div className={styles.bookingHeader}>
                <div className={styles.bookingHeaderInfo}>
                  <div className={styles.bookingBadge}>
                    <span className={styles.pulseDot} />
                    <span>Executive Discovery Call • 30 Min</span>
                  </div>
                  <h3 className={styles.bookingTitle}>Schedule Your Strategy Call</h3>
                  <p className={styles.bookingSubtitle}>
                    Select a time for your 1-on-1 discovery call with Janhvi Rawat.
                  </p>
                </div>

                <div className={styles.bookingHeaderActions}>
                  <a
                    href="https://calendly.com/janhvi-rawat/discovery-call"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.openExternalBtn}
                    title="Open Calendly in a new tab"
                    aria-label="Open Calendly in a new tab"
                  >
                    <span className={styles.openExternalText}>Open in New Tab</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Iframe Frame Container */}
              <div className={styles.calendlyFrameWrapper}>
                {isIframeLoading && (
                  <div className={styles.calendlyLoadingOverlay}>
                    <div className={styles.spinnerRing} />
                    <div className={styles.loadingInfo}>
                      <span className={styles.loadingTitle}>Connecting to Calendly...</span>
                      <span className={styles.loadingDesc}>Loading available slots for Janhvi Rawat</span>
                    </div>
                  </div>
                )}
                <iframe
                  src="https://calendly.com/janhvi-rawat/discovery-call"
                  className={`${styles.calendlyIframe} ${isIframeLoading ? styles.calendlyIframeHidden : ""}`}
                  title="Schedule a Discovery Call with Janhvi Rawat"
                  onLoad={() => setIsIframeLoading(false)}
                  allow="camera; microphone; autoplay; fullscreen"
                />
              </div>

              {/* Bottom Trust & Confirmation Strip */}
              <div className={styles.bookingFooterStrip}>
                <span className={styles.trustPoint}>
                  <span className={styles.trustPointIcon}>✓</span> Instant Google Meet / Zoom invite
                </span>
                <span className={styles.trustDot}>•</span>
                <span className={styles.trustPoint}>
                  <span className={styles.trustPointIcon}>✓</span> 1-on-1 with founders
                </span>
                <span className={styles.trustDot}>•</span>
                <span className={styles.trustPoint}>
                  <span className={styles.trustPointIcon}>✓</span> Actionable 90-day blueprint
                </span>
              </div>
            </div>
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
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default NavModals;
