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
    image: "/what-we-do/positioning.png",
    imageAlt: "LinkedIn post performance showing 26,310 impressions and 5.56% engagement rate",
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
    image: "/what-we-do/lead-gen.png",
    imageAlt: "LinkedIn campaign engagement metrics — 15,352 social engagements and 12,740 reactions",
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
    image: "/what-we-do/multichannel.png",
    imageAlt: "Content performance chart showing 357,367 impressions and 457% growth over 365 days",
    color: "pink",
    cardBadge: "Multi-Channel Orchestration Engine",
  },
];

export function WhatWeDo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // Synchronize active accordion item as the user scrolls naturally down the page
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (isProgrammaticScroll.current) return;
      if (window.innerWidth <= 900) return; // on mobile, accordion is controlled by user taps

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sectionEl = sectionRef.current;
          if (!sectionEl) {
            ticking = false;
            return;
          }

          const rect = sectionEl.getBoundingClientRect();
          const navOffset = 64; // height of fixed top navbar

          // Total distance this section is pinned in the viewport
          const totalScrollableDistance = rect.height - (window.innerHeight - navOffset);
          if (totalScrollableDistance <= 0) {
            ticking = false;
            return;
          }

          const scrolledDistance = navOffset - rect.top;

          if (scrolledDistance >= 0 && scrolledDistance <= totalScrollableDistance) {
            const progress = scrolledDistance / totalScrollableDistance;

            let newIndex = 0;
            if (progress < 0.33) {
              newIndex = 0;
            } else if (progress < 0.68) {
              newIndex = 1;
            } else {
              newIndex = 2;
            }

            setActiveIndex((prev) => (prev !== newIndex ? newIndex : prev));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // When clicking an accordion header:
  // 1. Immediately expands that accordion item
  // 2. Automatically scrolls the right image showcase into view
  // 3. Smoothly aligns page scroll while keeping the entire section pinned in viewport
  const handleAccordionClick = useCallback((index) => {
    setActiveIndex(index);

    if (window.innerWidth > 900 && sectionRef.current) {
      isProgrammaticScroll.current = true;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      const sectionEl = sectionRef.current;
      const navOffset = 64;
      const sectionTop = sectionEl.getBoundingClientRect().top + window.pageYOffset;
      const totalScrollableDistance = sectionEl.offsetHeight - (window.innerHeight - navOffset);

      // Target progress position in the runway for this item
      const targetProgress = index === 0 ? 0.08 : index === 1 ? 0.5 : 0.92;
      const targetScroll = sectionTop - navOffset + targetProgress * totalScrollableDistance;

      window.scrollTo({
        top: Math.max(0, targetScroll),
        behavior: "smooth",
      });

      scrollTimeoutRef.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 700);
    }
  }, []);

  return (
    <section
      id="what-we-do"
      ref={sectionRef}
      className={styles.sectionTrack}
    >
      <span id="services" style={{ position: "absolute", top: 0, pointerEvents: "none" }} aria-hidden="true" />
      <span id="how-it-works" style={{ position: "absolute", top: 0, pointerEvents: "none" }} aria-hidden="true" />

      {/* Pinned Sticky Section: Stays 100% in viewport from the heading down */}
      <div className={styles.stickySection}>
        {/* Background Architectural Grid & Ambient Aura */}
        <div className={styles.backgroundGrid} />
        <div className={styles.ambientAura} />

        <div className={styles.contentWrapper}>
          {/* Central Section Heading (Always visible in viewport) */}
          <div className={styles.headerArea}>
            <div className={styles.badge}>
              <span className={styles.pulseDot} />
              <span>Capabilities</span>
            </div>

            <h2 className={styles.sectionHeading}>
              What we <span className="text-gradient">do.</span>
            </h2>
          </div>

          {/* Two-Column Stage: Left Accordion & Right Scrolling Showcase */}
          <div className={styles.showcaseGrid}>
            {/* =========================================================
                LEFT COLUMN: In-Place Accordion (Stays in Viewport)
                ========================================================= */}
            <div className={styles.leftColumn}>
              <div className={styles.accordionList} role="region" aria-label="Capabilities Accordion">
                {OFFERINGS.map((item, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <div
                      key={item.id}
                      className={`${styles.accordionItem} ${isActive ? styles.accordionItemActive : ""}`}
                    >
                      {/* Accordion Header Button */}
                      <button
                        type="button"
                        className={`${styles.accordionHeader} ${isActive ? styles.accordionHeaderActive : ""}`}
                        onClick={() => handleAccordionClick(index)}
                        aria-expanded={isActive}
                        aria-controls={`accordion-body-${item.id}`}
                      >
                        <div className={styles.accordionHeaderLeft}>
                          <span
                            className={`${styles.statusSquare} ${styles[`statusSquare_${item.color}`]} ${
                              isActive ? styles.statusSquareActive : ""
                            }`}
                          />
                          <span className={styles.accordionTitle}>{item.tabLabel}</span>
                        </div>
                        <div className={styles.accordionHeaderRight}>
                          {isActive && (
                            <span className={styles.activeDotIndicator}>●</span>
                          )}
                        </div>
                      </button>

                      {/* Accordion Content Body */}
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            id={`accordion-body-${item.id}`}
                            key={`body-${item.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                            className={styles.accordionCollapse}
                          >
                            <div className={styles.accordionBodyInner}>
                              {/* Headline with keyword highlight */}
                              <h3 className={styles.offeringHeadline}>
                                {item.taglinePrefix}
                                <span className={styles[`highlight_${item.color}`]}>
                                  {item.highlightWord}
                                </span>
                              </h3>

                              {/* Description */}
                              <p className={styles.offeringDescription}>{item.description}</p>
                              {item.descriptionSecondary && (
                                <p className={styles.offeringDescriptionSecondary}>
                                  {item.descriptionSecondary}
                                </p>
                              )}

                              {/* What's Included */}
                              <div className={styles.deliverablesBlock}>
                                <h4 className={styles.blockHeading}>WHAT&apos;S INCLUDED:</h4>
                                <ul
                                  className={`${styles.deliverablesGrid} ${
                                    item.included.length > 5 ? styles.gridTwoCol : ""
                                  }`}
                                >
                                  {item.included.map((deliv, i) => (
                                    <li key={i} className={styles.deliverableItem}>
                                      <span className={`${styles.checkCircle} ${styles[`check_${item.color}`]}`}>
                                        ✓
                                      </span>
                                      <span>{deliv}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Best Suited For (Item 02) */}
                              {item.suitedFor && (
                                <div className={styles.suitedBlock}>
                                  <h4 className={styles.blockHeading}>BEST SUITED FOR:</h4>
                                  <div className={styles.suitedChips}>
                                    {item.suitedFor.map((suit, i) => (
                                      <span key={i} className={styles.suitedChip}>
                                        {suit}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* The Goal */}
                              <div className={`${styles.goalCallout} ${styles[`goal_${item.color}`]}`}>
                                <span className={styles.goalIcon}>🎯</span>
                                <div className={styles.goalText}>
                                  <strong>The goal:</strong> {item.goal}
                                </div>
                              </div>

                              {/* Mobile Image (clean simple image) */}
                              <div className={styles.mobileImageContainer}>
                                <Image
                                  src={item.image}
                                  alt={item.imageAlt}
                                  width={720}
                                  height={540}
                                  className={styles.cleanMobileImage}
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* =========================================================
                RIGHT COLUMN: Clean Simple Image Showcase Reel
                ========================================================= */}
            <div className={styles.rightColumn}>
              <div
                className={styles.imageShowcaseTrack}
                style={{
                  transform: `translateY(-${activeIndex * 100}%)`,
                }}
              >
                {OFFERINGS.map((item, index) => (
                  <div key={item.id} className={styles.imageCardWrapper}>
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      width={900}
                      height={675}
                      priority={index === 0}
                      className={styles.cleanImage}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhatWeDo;
