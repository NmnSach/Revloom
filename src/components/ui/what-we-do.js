"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./what-we-do.module.css";

const OFFERINGS = [
  {
    id: "01",
    tabLabel: "01. LINKEDIN POSITIONING",
    shortLabel: "01. Positioning",
    category: "Pillar 01 • Brand Authority",
    title: "LinkedIn Positioning",
    taglinePrefix: "Become the name ",
    highlightWord: "people remember.",
    description:
      "If you are someone who is just starting out the brand and wants to become someone people remember, this is the plan for you. Sales start coming in when there is a brand that people can recognize. Position yourself to become the main reason people buy from the brand.",
    included: [
      "Founder Brand Strategy",
      "LinkedIn content",
      "Creative direction for the positioning",
      "Audience engagement strategy",
      "Monthly performance reporting",
    ],
    goal: "Build a presence that makes prospects familiar with you before the sales conversation begins.",
    image: "/images/what-we-do/positioning-dashboard.jpg",
    imageAlt: "LinkedIn Positioning and Viral Thought Leadership Analytics Dashboard",
    color: "violet",
    cardBadge: "Authority & Viral Analytics",
  },
  {
    id: "02",
    tabLabel: "02. LINKEDIN LEAD GENERATION",
    shortLabel: "02. Lead Gen",
    category: "Pillar 02 • High-Intent Outbound",
    title: "LinkedIn Lead Generation",
    taglinePrefix: "The 1st pitstop for ",
    highlightWord: "high-trust B2B outbound.",
    description:
      "For most B2B service-based businesses, The 1st pitstop is Linkedin Lead-Gen where we recommend starting your outbound strategy. We identify the right decision-makers, build targeted prospect lists, and start conversations without relying on mass, generic outreach.",
    included: [
      "ICP definition",
      "Lead research",
      "Target account & Buying Intent",
      "Personalised LinkedIn outreach",
      "Connection & follow-up sequences",
      "Message testing & Iteration",
      "Outreach tracking & reporting",
      "Lead qualification and handover",
    ],
    suitedFor: [
      "Consulting firms",
      "Marketing agencies",
      "Design & branding",
      "Recruitment firms",
      "Financial services",
      "B2B service businesses",
    ],
    goal: "Create a consistent flow of conversations with people who actually fit your business.",
    image: "/images/what-we-do/leadgen-prospecting.jpg",
    imageAlt: "LinkedIn Lead Generation Prospecting Database and Verified Decision-Makers",
    color: "lime",
    cardBadge: "Verified Decision-Maker Outbound",
  },
  {
    id: "03",
    tabLabel: "03. EMAIL + LINKEDIN LEAD GEN",
    shortLabel: "03. Email + LI",
    category: "Pillar 03 • Multi-Channel Scale",
    title: "Email + LinkedIn Lead Generation",
    taglinePrefix: "Build a pipeline ",
    highlightWord: "beyond the algorithm.",
    description:
      "If you're a B2B technology, SaaS, IT, or software company, we recommend combining email outreach with LinkedIn.",
    descriptionSecondary:
      "Email gives you scale. LinkedIn adds context and familiarity. Together, they create multiple touchpoints with the same high-value prospects.",
    included: [
      "ICP & target account research",
      "Prospect list building",
      "Technical Setup",
      "Campaign setup",
      "Personalised email sequences",
      "LinkedIn outreach alongside email",
      "Follow-up & nurture sequences",
      "Campaign tracking and optimisation",
      "Reply handling & lead handover",
    ],
    goal: "Reach your ideal accounts through more than one channel and create a predictable outbound pipeline.",
    image: "/images/what-we-do/multichannel-pipeline.jpg",
    imageAlt: "Email and LinkedIn Multi-Channel Outreach Pipeline Dashboard",
    color: "pink",
    cardBadge: "Multi-Channel Orchestration Engine",
  },
];

export function WhatWeDo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const sectionRef = useRef(null);
  const isTransitioning = useRef(false);
  const lastTransitionTime = useRef(0);
  const wheelAccumulator = useRef(0);
  const wheelTimer = useRef(null);

  // Touch gesture support for mobile swipe
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isSwiping = useRef(false);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const handleTabClick = useCallback((index) => {
    setActiveIndex(index);
    isTransitioning.current = true;
    lastTransitionTime.current = Date.now();
    setTimeout(() => {
      isTransitioning.current = false;
      wheelAccumulator.current = 0;
    }, 450);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % OFFERINGS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + OFFERINGS.length) % OFFERINGS.length);
  }, []);

  // Desktop Mouse Wheel Step Navigation (fits in 1 viewport without overflowing)
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const handleWheel = (e) => {
      if (window.innerWidth <= 1024) return;

      const rect = sectionEl.getBoundingClientRect();
      // Only capture when section is prominent in viewport
      const inView = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;
      if (!inView) return;

      const delta = e.deltaY;
      const now = Date.now();
      const currentIndex = activeIndexRef.current;

      // When transitioning, suppress native scroll so steps advance cleanly
      if (isTransitioning.current || now - lastTransitionTime.current < 550) {
        if (e.cancelable) e.preventDefault();
        return;
      }

      // Scrolling Down
      if (delta > 0) {
        // If already at last item (03), allow standard page scroll down to Positioning Quiz
        if (currentIndex >= OFFERINGS.length - 1) {
          return;
        }

        wheelAccumulator.current += delta;
        clearTimeout(wheelTimer.current);
        wheelTimer.current = setTimeout(() => {
          wheelAccumulator.current = 0;
        }, 180);

        if (wheelAccumulator.current < 25) {
          if (e.cancelable) e.preventDefault();
          return;
        }

        if (e.cancelable) e.preventDefault();
        wheelAccumulator.current = 0;
        isTransitioning.current = true;
        lastTransitionTime.current = now;

        setActiveIndex((prev) => Math.min(OFFERINGS.length - 1, prev + 1));

        setTimeout(() => {
          isTransitioning.current = false;
          wheelAccumulator.current = 0;
        }, 500);
      }
      // Scrolling Up
      else if (delta < 0) {
        // If already at first item (01), allow standard page scroll up to Logo Cloud
        if (currentIndex <= 0) {
          return;
        }

        wheelAccumulator.current += delta;
        clearTimeout(wheelTimer.current);
        wheelTimer.current = setTimeout(() => {
          wheelAccumulator.current = 0;
        }, 180);

        if (wheelAccumulator.current > -25) {
          if (e.cancelable) e.preventDefault();
          return;
        }

        if (e.cancelable) e.preventDefault();
        wheelAccumulator.current = 0;
        isTransitioning.current = true;
        lastTransitionTime.current = now;

        setActiveIndex((prev) => Math.max(0, prev - 1));

        setTimeout(() => {
          isTransitioning.current = false;
          wheelAccumulator.current = 0;
        }, 500);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // Keyboard Navigation Support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (window.innerWidth <= 1024) return;
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top <= 120 && rect.bottom >= 200;
      if (!inView) return;

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        if (activeIndexRef.current < OFFERINGS.length - 1) {
          e.preventDefault();
          setActiveIndex((prev) => prev + 1);
        }
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        if (activeIndexRef.current > 0) {
          e.preventDefault();
          setActiveIndex((prev) => prev - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Touch Swipe Handlers for Mobile Devices
  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      isSwiping.current = true;
    }
  };

  const handleTouchEnd = (e) => {
    if (!isSwiping.current || !e.changedTouches || e.changedTouches.length === 0) return;
    isSwiping.current = false;

    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    // Only trigger if horizontal swipe is intentional and exceeds vertical movement
    if (Math.abs(diffX) > 48 && Math.abs(diffX) > Math.abs(diffY) * 1.4) {
      if (diffX > 0) {
        // Swiped Left -> Next Tab
        handleNext();
      } else {
        // Swiped Right -> Prev Tab
        handlePrev();
      }
    }
  };

  const activeOffering = OFFERINGS[activeIndex];

  return (
    <section
      id="what-we-do"
      ref={sectionRef}
      className={styles.sectionContainer}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <span id="how-it-works" style={{ position: "absolute", top: 0, pointerEvents: "none" }} aria-hidden="true" />
      
      {/* Background Architectural Grid & Ambient Aura */}
      <div className={styles.backgroundGrid} />
      <div className={styles.ambientAura} />

      <div className={styles.contentWrapper}>
        {/* =========================================================
            MOBILE/TABLET HEADER & SEGMENTED PILL TAB BAR
            ========================================================= */}
        <div className={styles.mobileHeaderArea}>
          <div className={styles.pillBadge}>
            <span className={styles.pulseDot} />
            <span>Capabilities</span>
          </div>

          <h2 className={styles.sectionHeading}>
            What we do.{" "}
            <span className={styles.headingAccent}>Engineered for growth.</span>
          </h2>

          <p className={styles.subText}>
            Three tailored outbound engines designed to position your brand, start qualified conversations, and scale predictable B2B pipeline.
          </p>

          {/* Mobile Horizontal Pill Selector */}
          <div className={styles.mobileTabBar} role="tablist" aria-label="Capabilities tabs">
            {OFFERINGS.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.mobileTabButton} ${isActive ? styles.mobileTabActive : ""}`}
                  onClick={() => handleTabClick(index)}
                >
                  <span className={`${styles.mobileTabDot} ${styles[`tabSquare_${item.color}`]}`} />
                  <span className={styles.mobileTabLabel}>{item.shortLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            DESKTOP SPLIT LAYOUT (Both Columns Fit in One Viewport)
            ========================================================= */}
        <div className={styles.splitLayout}>
          {/* =========================================================
              LEFT COLUMN: Header, Tabs, Active Offering Details
              ========================================================= */}
          <div className={styles.leftColumn}>
            {/* Desktop Header */}
            <div className={styles.desktopHeader}>
              <div className={styles.pillBadge}>
                <span className={styles.pulseDot} />
                <span>Capabilities</span>
              </div>

              <h2 className={styles.sectionHeading}>
                What we do.{" "}
                <span className={styles.headingAccent}>Engineered for growth.</span>
              </h2>

              <p className={styles.subText}>
                Three tailored outbound engines designed to position your brand, start qualified conversations, and scale predictable B2B pipeline.
              </p>
            </div>

            {/* Desktop Vertical Tab Navigation */}
            <div className={styles.tabNavList} role="tablist" aria-label="Capabilities tabs">
              {OFFERINGS.map((item, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`${styles.tabNavItem} ${isActive ? styles.tabNavActive : ""}`}
                    onClick={() => handleTabClick(index)}
                    aria-label={`View ${item.title}`}
                  >
                    <span className={`${styles.tabSquare} ${styles[`tabSquare_${item.color}`]}`} />
                    <span className={styles.tabLabel}>{item.tabLabel}</span>
                    {isActive && (
                      <span className={styles.tabActiveIndicator}>●</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Dynamic Content Card */}
            <div className={styles.activeDetailsWrapper}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeOffering.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  className={styles.activeDetailsCard}
                >
                  <h3 className={styles.activeTitle}>
                    {activeOffering.taglinePrefix}
                    <span className={styles[`highlight_${activeOffering.color}`]}>
                      {activeOffering.highlightWord}
                    </span>
                  </h3>

                  <p className={styles.activeDescription}>
                    {activeOffering.description}
                  </p>
                  {activeOffering.descriptionSecondary && (
                    <p className={styles.activeDescriptionSecondary}>
                      {activeOffering.descriptionSecondary}
                    </p>
                  )}

                  {/* Deliverables Block */}
                  <div className={styles.deliverablesBlock}>
                    <h4 className={styles.deliverablesHeading}>What&apos;s included:</h4>
                    <ul
                      className={`${styles.deliverablesList} ${
                        activeOffering.included.length > 5 ? styles.gridTwoCol : ""
                      }`}
                    >
                      {activeOffering.included.map((deliv, i) => (
                        <li key={i} className={styles.deliverableItem}>
                          <span className={`${styles.checkCircle} ${styles[`check_${activeOffering.color}`]}`}>
                            ✓
                          </span>
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Best Suited For (Offering 2) */}
                  {activeOffering.suitedFor && (
                    <div className={styles.suitedBlock}>
                      <h4 className={styles.suitedHeading}>Best suited for:</h4>
                      <div className={styles.suitedChips}>
                        {activeOffering.suitedFor.map((suit, i) => (
                          <span key={i} className={styles.suitedChip}>
                            {suit}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* The Goal Callout */}
                  <div className={`${styles.goalCallout} ${styles[`goal_${activeOffering.color}`]}`}>
                    <span className={styles.goalIcon}>🎯</span>
                    <div className={styles.goalText}>
                      <strong>The goal:</strong> {activeOffering.goal}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* =========================================================
              RIGHT COLUMN: High-Resolution Mockup Showcase Card
              ========================================================= */}
          <div className={styles.rightColumn}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeOffering.id}
                initial={{ opacity: 0, scale: 0.98, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -12 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={styles.imageShowcaseCard}
              >
                <div className={styles.imageCardHeader}>
                  <div className={styles.imageCardBadge}>
                    <span className={`${styles.badgeDot} ${styles[`badgeDot_${activeOffering.color}`]}`} />
                    <span>{activeOffering.tabLabel}</span>
                  </div>
                  <span className={styles.imageCardMeta}>{activeOffering.cardBadge}</span>
                </div>

                <div className={styles.imageCardBody}>
                  <Image
                    src={activeOffering.image}
                    alt={activeOffering.imageAlt}
                    width={900}
                    height={675}
                    priority
                    className={styles.cardImage}
                  />
                </div>

                {/* Desktop Mini Stepper Controls */}
                <div className={styles.cardFooterBar}>
                  <div className={styles.stepperDots}>
                    {OFFERINGS.map((item, idx) => (
                      <button
                        key={item.id}
                        type="button"
                        aria-label={`Jump to ${item.title}`}
                        className={`${styles.stepDot} ${activeIndex === idx ? styles.stepDotActive : ""}`}
                        onClick={() => handleTabClick(idx)}
                      />
                    ))}
                  </div>

                  <div className={styles.stepperArrows}>
                    <button
                      type="button"
                      aria-label="Previous capability"
                      className={styles.arrowButton}
                      onClick={handlePrev}
                    >
                      ←
                    </button>
                    <span className={styles.stepperCount}>
                      0{activeIndex + 1} / 0{OFFERINGS.length}
                    </span>
                    <button
                      type="button"
                      aria-label="Next capability"
                      className={styles.arrowButton}
                      onClick={handleNext}
                    >
                      →
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Swipe / Tap Navigation Hint */}
        <div className={styles.mobileNavHint}>
          <button
            type="button"
            className={styles.mobileNavBtn}
            onClick={handlePrev}
            aria-label="Previous plan"
          >
            ← Prev
          </button>
          <div className={styles.mobileStepIndicator}>
            {OFFERINGS.map((item, idx) => (
              <span
                key={item.id}
                className={`${styles.mobileDot} ${activeIndex === idx ? styles.mobileDotActive : ""}`}
                onClick={() => handleTabClick(idx)}
              />
            ))}
          </div>
          <button
            type="button"
            className={styles.mobileNavBtn}
            onClick={handleNext}
            aria-label="Next plan"
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
}

export default WhatWeDo;
