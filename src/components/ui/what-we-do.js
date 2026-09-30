"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./what-we-do.module.css";

const OFFERINGS = [
  {
    id: "01",
    tabLabel: "01. LINKEDIN POSITIONING",
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
  const cardRefs = useRef([]);
  const isTransitioning = useRef(false);
  const lastTransitionTime = useRef(0);
  const wheelAccumulator = useRef(0);
  const wheelTimer = useRef(null);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const hasEnteredFromTop = useRef(false);
  const entryTopTime = useRef(0);
  const hasEnteredFromBottom = useRef(false);
  const entryBottomTime = useRef(0);

  const scrollToCard = useCallback((index) => {
    const targetEl = cardRefs.current[index];
    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      const targetY = Math.round(currentScroll + rect.top - 108);
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  }, []);

  const handleTabClick = useCallback(
    (index) => {
      setActiveIndex(index);
      isTransitioning.current = true;
      lastTransitionTime.current = Date.now();
      scrollToCard(index);

      setTimeout(() => {
        isTransitioning.current = false;
        wheelAccumulator.current = 0;
      }, 850);
    },
    [scrollToCard]
  );

  // Set up scroll-spy observation on the right-side cards
  useEffect(() => {
    const handleObserver = (entries) => {
      if (isTransitioning.current) return;

      let bestEntry = null;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
            bestEntry = entry;
          }
        }
      });

      if (bestEntry) {
        const index = Number(bestEntry.target.getAttribute("data-index"));
        if (!isNaN(index)) {
          setActiveIndex(index);
        }
      }
    };

    const observer = new IntersectionObserver(handleObserver, {
      threshold: [0.2, 0.4, 0.6, 0.8],
      rootMargin: "-10% 0px -20% 0px",
    });

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Smart smooth step advancement on scroll wheel
  useEffect(() => {
    const handleWheel = (e) => {
      // Only active on desktop / laptop viewports where the split layout is active
      if (window.innerWidth <= 1024) return;

      const card0 = cardRefs.current[0];
      const cardLast = cardRefs.current[OFFERINGS.length - 1];
      if (!card0 || !cardLast) return;

      const card0Rect = card0.getBoundingClientRect();
      const cardLastRect = cardLast.getBoundingClientRect();

      // Track entry into the section from above
      if (card0Rect.top > 130) {
        hasEnteredFromTop.current = false;
      } else if (!hasEnteredFromTop.current) {
        hasEnteredFromTop.current = true;
        entryTopTime.current = Date.now();
      }

      // Track entry into the section from below
      if (cardLastRect.top < 60) {
        hasEnteredFromBottom.current = false;
      } else if (!hasEnteredFromBottom.current) {
        hasEnteredFromBottom.current = true;
        entryBottomTime.current = Date.now();
      }

      // Interactive zone: Card 0 is pinned or passing, and last card hasn't scrolled off
      const inZone = card0Rect.top <= 130 && cardLastRect.top >= 60;
      if (!inZone) return;

      const delta = e.deltaY;
      const now = Date.now();

      // Suppress native wheel while animating
      if (isTransitioning.current || now - lastTransitionTime.current < 750) {
        if (e.cancelable) e.preventDefault();
        return;
      }

      const currentIndex = activeIndexRef.current;

      // Scrolling Down (advance to next card)
      if (delta > 0) {
        // If at the last card, let user scroll down naturally to next sections
        if (currentIndex >= OFFERINGS.length - 1) {
          return;
        }

        // Buffer: if user just entered from top, absorb incoming momentum on Card 0
        if (now - entryTopTime.current < 350) {
          if (e.cancelable) e.preventDefault();
          return;
        }

        // Accumulate delta to ensure deliberate user intent
        wheelAccumulator.current += delta;
        clearTimeout(wheelTimer.current);
        wheelTimer.current = setTimeout(() => {
          wheelAccumulator.current = 0;
        }, 180);

        if (wheelAccumulator.current < 20) {
          if (e.cancelable) e.preventDefault();
          return;
        }

        // Trigger smooth glide to next card
        if (e.cancelable) e.preventDefault();
        wheelAccumulator.current = 0;
        isTransitioning.current = true;
        lastTransitionTime.current = now;

        const nextIndex = currentIndex + 1;
        setActiveIndex(nextIndex);
        scrollToCard(nextIndex);

        setTimeout(() => {
          isTransitioning.current = false;
          wheelAccumulator.current = 0;
        }, 800);
      }
      // Scrolling Up (return to previous card)
      else if (delta < 0) {
        // If at the first card and it's near/at the top, let user scroll up naturally to Logo Cloud
        if (currentIndex <= 0) {
          if (card0Rect.top >= 95) {
            return;
          }
        }

        // Buffer: if user just entered from bottom, absorb incoming momentum on Card 2
        if (now - entryBottomTime.current < 350) {
          if (e.cancelable) e.preventDefault();
          return;
        }

        wheelAccumulator.current += delta;
        clearTimeout(wheelTimer.current);
        wheelTimer.current = setTimeout(() => {
          wheelAccumulator.current = 0;
        }, 180);

        if (wheelAccumulator.current > -20) {
          if (e.cancelable) e.preventDefault();
          return;
        }

        // Trigger smooth glide to previous card
        if (e.cancelable) e.preventDefault();
        wheelAccumulator.current = 0;
        isTransitioning.current = true;
        lastTransitionTime.current = now;

        const prevIndex = Math.max(0, currentIndex - 1);
        setActiveIndex(prevIndex);
        scrollToCard(prevIndex);

        setTimeout(() => {
          isTransitioning.current = false;
          wheelAccumulator.current = 0;
        }, 800);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [scrollToCard]);

  // Keyboard navigation support (ArrowDown, ArrowUp, PageDown, PageUp)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (window.innerWidth <= 1024) return;
      if (
        e.key !== "ArrowDown" &&
        e.key !== "ArrowUp" &&
        e.key !== "PageDown" &&
        e.key !== "PageUp"
      ) {
        return;
      }

      const card0 = cardRefs.current[0];
      const cardLast = cardRefs.current[OFFERINGS.length - 1];
      if (!card0 || !cardLast) return;

      const card0Rect = card0.getBoundingClientRect();
      const cardLastRect = cardLast.getBoundingClientRect();
      const inZone = card0Rect.top <= 130 && cardLastRect.top >= 60;
      if (!inZone) return;

      const isDown = e.key === "ArrowDown" || e.key === "PageDown";
      const currentIndex = activeIndexRef.current;

      if (isDown && currentIndex < OFFERINGS.length - 1) {
        e.preventDefault();
        const nextIndex = currentIndex + 1;
        setActiveIndex(nextIndex);
        scrollToCard(nextIndex);
      } else if (!isDown && currentIndex > 0) {
        e.preventDefault();
        const prevIndex = currentIndex - 1;
        setActiveIndex(prevIndex);
        scrollToCard(prevIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [scrollToCard]);

  const activeOffering = OFFERINGS[activeIndex];

  return (
    <section id="what-we-do" className={styles.sectionContainer}>
      <span id="how-it-works" style={{ position: "absolute", top: 0, pointerEvents: "none" }} aria-hidden="true" />
      {/* Background Architectural Grid & Ambient Aura */}
      <div className={styles.backgroundGrid} />
      <div className={styles.ambientAura} />

      <div className={styles.contentWrapper}>
        <div className={styles.splitLayout}>
          {/* =========================================================
              LEFT COLUMN: Sticky Static Navigation & Dynamic Details
              ========================================================= */}
          <div className={styles.stickyColumn}>
            {/* Header Block */}
            <div className={styles.stickyHeader}>
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

            {/* Interactive Vertical Tabs (Reference Pattern) */}
            <div className={styles.tabNavList}>
              {OFFERINGS.map((item, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`${styles.tabNavItem} ${isActive ? styles.tabNavActive : ""}`}
                    onClick={() => handleTabClick(index)}
                    aria-label={`View ${item.title}`}
                  >
                    <span className={`${styles.tabSquare} ${styles[`tabSquare_${item.color}`]}`} />
                    <span className={styles.tabLabel}>{item.tabLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Content Card that updates as right images scroll */}
            <div className={styles.activeDetailsWrapper}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeOffering.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
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
              RIGHT COLUMN: Scrolling High-Resolution Image Cards
              ========================================================= */}
          <div className={styles.scrollColumn}>
            {OFFERINGS.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={item.id}
                  ref={(el) => (cardRefs.current[index] = el)}
                  data-index={index}
                  className={`${styles.imageShowcaseCard} ${isActive ? styles.imageCardActive : ""}`}
                >
                  <div className={styles.imageCardHeader}>
                    <div className={styles.imageCardBadge}>
                      <span className={`${styles.badgeDot} ${styles[`badgeDot_${item.color}`]}`} />
                      <span>{item.tabLabel}</span>
                    </div>
                    <span className={styles.imageCardMeta}>{item.cardBadge}</span>
                  </div>

                  <div className={styles.imageCardBody}>
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      width={900}
                      height={675}
                      priority={index === 0}
                      className={styles.cardImage}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhatWeDo;
