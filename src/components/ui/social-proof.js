"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HoverTransition } from "./hover-transition";
import styles from "./social-proof.module.css";

// Vector Company Logos for the 6 B2B Tech/SaaS Clients
function CompanyLogo({ id, size = 24 }) {
  switch (id) {
    case "hyperplane":
      return (
        <svg viewBox="0 0 40 40" fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="9" fill="url(#bg-hyperplane)" />
          <path d="M20 9L29 14.2V25.8L20 31L11 25.8V14.2L20 9Z" stroke="#FFFFFF" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M20 9V20M29 14.2L20 20M29 25.8L20 20M20 31V20M11 25.8L20 20M11 14.2L20 20" stroke="rgba(255,255,255,0.7)" strokeWidth="1.4" strokeLinejoin="round" />
          <circle cx="20" cy="20" r="3" fill="#C6FF3D" />
          <defs>
            <linearGradient id="bg-hyperplane" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6C2BD9" />
              <stop offset="1" stopColor="#8544F6" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "koyeb":
      return (
        <svg viewBox="0 0 40 40" fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="9" fill="url(#bg-koyeb)" />
          <path d="M11 27L17 19L22 23L29 13" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 28H28" stroke="rgba(255,255,255,0.3)" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="29" cy="13" r="2.8" fill="#C6FF3D" />
          <circle cx="17" cy="19" r="2" fill="#FFFFFF" />
          <defs>
            <linearGradient id="bg-koyeb" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8544F6" />
              <stop offset="1" stopColor="#FF4FCE" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "omniflow":
      return (
        <svg viewBox="0 0 40 40" fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="9" fill="url(#bg-omniflow)" />
          <path d="M16 16C13.5 16 11 18 11 20.5C11 23 13.5 25 16 25C19 25 21 21 24 16C26.5 16 29 18 29 20.5C29 23 26.5 25 24 25C21 25 19 21 16 16Z" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="20" cy="20.5" r="2" fill="#C6FF3D" />
          <defs>
            <linearGradient id="bg-omniflow" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF4FCE" />
              <stop offset="1" stopColor="#6C2BD9" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "veloce":
      return (
        <svg viewBox="0 0 40 40" fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="9" fill="url(#bg-veloce)" />
          <path d="M20 10L28 13.5V20.5C28 25.5 24.5 29 20 31C15.5 29 12 25.5 12 20.5V13.5L20 10Z" stroke="#FFFFFF" strokeWidth="2" strokeLinejoin="round" />
          <path d="M17 20.5L19.5 23L23.5 17.5" stroke="#C6FF3D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <defs>
            <linearGradient id="bg-veloce" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1A1625" />
              <stop offset="1" stopColor="#4C1D95" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "stackpulse":
      return (
        <svg viewBox="0 0 40 40" fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="9" fill="url(#bg-stackpulse)" />
          <rect x="11" y="25" width="18" height="3.5" rx="1.75" fill="#FFFFFF" />
          <rect x="11" y="19" width="14" height="3.5" rx="1.75" fill="rgba(255,255,255,0.85)" />
          <rect x="11" y="13" width="10" height="3.5" rx="1.75" fill="rgba(255,255,255,0.7)" />
          <circle cx="26" cy="14.75" r="2.8" fill="#C6FF3D" />
          <defs>
            <linearGradient id="bg-stackpulse" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6C2BD9" />
              <stop offset="1" stopColor="#1A1625" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "loominate":
      return (
        <svg viewBox="0 0 40 40" fill="none" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="9" fill="url(#bg-loominate)" />
          <path d="M20 9L22.5 17L30 20L22.5 23L20 31L17.5 23L10 20L17.5 17L20 9Z" fill="url(#star-loominate)" stroke="#FFFFFF" strokeWidth="1.2" strokeLinejoin="round" />
          <circle cx="20" cy="20" r="2.5" fill="#C6FF3D" />
          <defs>
            <linearGradient id="bg-loominate" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8544F6" />
              <stop offset="1" stopColor="#FF4FCE" />
            </linearGradient>
            <linearGradient id="star-loominate" x1="10" y1="10" x2="30" y2="30" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="1" stopColor="rgba(255,255,255,0.6)" />
            </linearGradient>
          </defs>
        </svg>
      );
    default:
      return null;
  }
}

const CLIENT_TESTIMONIALS = [
  {
    company: "Hyperplane AI",
    logoId: "hyperplane",
    stage: "Series A • Enterprise AI",
    founder: "Julian Vance",
    role: "Co-Founder & CEO",
    avatarImg: "/avatars/julian-vance.jpg",
    coreMetric: "+380% Inbound",
    metricLabel: "Inbound Deal Flow",
    hoverImpact: "$120k ACV Inbound",
    quote:
      "Revloom turned my profile into an inbound engine. We closed two $60k ACV enterprise contracts directly from founder DMs in our second month.",
  },
  {
    company: "Koyeb Metrics",
    logoId: "koyeb",
    stage: "Series B • Cloud Infra",
    founder: "Elena Rostova",
    role: "Founder & CTO",
    avatarImg: "/avatars/elena-rostova.jpg",
    coreMetric: "2.4M+ Reach",
    metricLabel: "Organic Impressions",
    hoverImpact: "2.4M Reach • 0 Hrs/Wk",
    quote:
      "I hate writing social posts. Revloom captured my technical voice with surgical precision—0 hours required from me, but massive C-level reach.",
  },
  {
    company: "OmniFlow",
    logoId: "omniflow",
    stage: "Seed • Workflow SaaS",
    founder: "Marcus Chen",
    role: "Founder & CEO",
    avatarImg: "/avatars/marcus-chen.jpg",
    coreMetric: "42 Demos",
    metricLabel: "Qualified Inbound Calls",
    hoverImpact: "42 Demo Calls Booked",
    quote:
      "Positioning First changed everything. We stopped competing on price and started closing buyers before the demo even started.",
  },
  {
    company: "Veloce Security",
    logoId: "veloce",
    stage: "Series A • Cybersecurity",
    founder: "Sarah Jenkins",
    role: "Co-Founder & CPO",
    avatarImg: "/avatars/sarah-jenkins.jpg",
    coreMetric: "-21 Days",
    metricLabel: "Sales Cycle Velocity",
    hoverImpact: "-3 Wks Deal Velocity",
    quote:
      "Our sales cycle dropped by 3 weeks because enterprise buyers already trusted our category perspective before we got on Zoom.",
  },
  {
    company: "StackPulse",
    logoId: "stackpulse",
    stage: "Series A • DevTools",
    founder: "Devon Pierce",
    role: "CEO & Co-Founder",
    avatarImg: "/avatars/devon-pierce.jpg",
    coreMetric: "Top 1%",
    metricLabel: "Creator Benchmark",
    hoverImpact: "Top 1% Creator Reach",
    quote:
      "No freelancers or black box guesswork. The weekly workflow is seamless and the compounding pipeline ROI is undeniable.",
  },
  {
    company: "Loominate",
    logoId: "loominate",
    stage: "Seed • B2B Fintech",
    founder: "Nadia Patel",
    role: "Founder & CEO",
    avatarImg: "/avatars/nadia-patel.jpg",
    coreMetric: "$240k",
    metricLabel: "Pipeline Influenced",
    hoverImpact: "$240k Pipeline Created",
    quote:
      "The highest-leverage personal brand investment I've made as a founder. Revloom is our secret weapon for enterprise trust.",
  },
];

export function SocialProof() {
  return (
    <section id="case-studies" className={styles.sectionContainer}>
      {/* Background Architectural Grid & Subtle Radial Aura */}
      <div className={styles.backgroundGrid} />
      <div className={styles.ambientAura} />

      <div className={styles.contentWrapper}>
        {/* Header Area */}
        <div className={styles.headerArea}>
          <div className={styles.pillBadge}>
            <span className={styles.pulseDot} />
            <span>Section 05 • Social Proof</span>
          </div>

          <h2 className={styles.sectionHeading}>
            Founders Who Trusted Us <br className={styles.headingBreak} />
            <span className="text-gradient">With Their Voice</span>
          </h2>

          <p className={styles.subText}>
            From Series A pioneers to venture-backed SaaS operators — here’s how
            executive positioning transformed their personal authority into pipeline.
          </p>
        </div>

        {/* 3-Column Interactive Ripple Hover Cards Grid */}
        <div className={styles.cardsGrid}>
          {CLIENT_TESTIMONIALS.map((item, index) => {
            // Default Surface: Full Size Person Image + Name, Company & Designation on the Bottom
            const defaultCard = (
              <div className={styles.defaultCard}>
                {/* Full Size Image of the Person */}
                <Image
                  src={item.avatarImg}
                  alt={item.founder}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.founderFullImg}
                  priority={index < 3}
                />

                {/* Top Subtle Floating Meta */}
                <div className={styles.cardTopFloating}>
                  <div className={styles.topCompanyPill}>
                    <div className={styles.topLogoWrap}>
                      <CompanyLogo id={item.logoId} size={18} />
                    </div>
                    <span className={styles.topCompanyName}>{item.company}</span>
                  </div>
                  <span className={styles.topMetricPill}>{item.coreMetric}</span>
                </div>

                {/* Bottom Scrim Overlay: Name, Company Name & Designation over the image */}
                <div className={styles.bottomScrim}>
                  <div className={styles.founderIdentityBlock}>
                    <h3 className={styles.founderNameOverImage}>{item.founder}</h3>
                    <div className={styles.companyAndRoleRow}>
                      <div className={styles.companyInlineBadge}>
                        <div className={styles.companyLogoInlineWrap}>
                          <CompanyLogo id={item.logoId} size={18} />
                        </div>
                        <span className={styles.companyNameOverImage}>{item.company}</span>
                      </div>
                      <span className={styles.roleDivider}>•</span>
                      <span className={styles.designationOverImage}>{item.role}</span>
                    </div>
                  </div>

                  <div className={styles.bottomHoverPrompt}>
                    <span className={styles.hoverPromptText}>Hover to read story</span>
                    <span className={styles.hoverPromptIcon}>↗</span>
                  </div>
                </div>
              </div>
            );

            // Hover Revealed Surface: Full Testimonial with Ripple Effect
            const hoverCard = (
              <div className={styles.hoverCard}>
                {/* Background Blurred Founder Image with Dark Tint Overlay for Atmospheric Depth */}
                <div className={styles.hoverBgImageWrap}>
                  <Image
                    src={item.avatarImg}
                    alt={item.founder}
                    fill
                    sizes="33vw"
                    className={styles.hoverBgImg}
                  />
                  <div className={styles.hoverBackdropTint} />
                </div>

                {/* Testimonial Content Surface */}
                <div className={styles.hoverCardContent}>
                  {/* Top Header */}
                  <div className={styles.hoverTopRow}>
                    <div className={styles.hoverCompanyBadge}>
                      <div className={styles.hoverCompanyLogoWrap}>
                        <CompanyLogo id={item.logoId} size={24} />
                      </div>
                      <span className={styles.hoverCompanyName}>{item.company}</span>
                    </div>
                    <span className={styles.hoverBadge}>
                      <span>★</span> {item.hoverImpact}
                    </span>
                  </div>

                  {/* Testimonial Quote Body */}
                  <div className={styles.hoverQuoteBody}>
                    <span className={styles.quoteMark}>&ldquo;</span>
                    <p className={styles.quoteText}>{item.quote}</p>
                  </div>

                  {/* Bottom Footer: Name, Designation & Verified Metric */}
                  <div className={styles.hoverBottomRow}>
                    <div className={styles.hoverFounderInfo}>
                      <div className={styles.hoverFounderAvatar}>
                        <Image
                          src={item.avatarImg}
                          alt={item.founder}
                          width={42}
                          height={42}
                          className={styles.founderAvatarImg}
                        />
                      </div>
                      <div className={styles.founderText}>
                        <span className={styles.hoverFounderName}>{item.founder}</span>
                        <span className={styles.hoverFounderRole}>
                          {item.role} • {item.company}
                        </span>
                      </div>
                    </div>

                    <span className={styles.impactPill}>{item.coreMetric}</span>
                  </div>
                </div>
              </div>
            );

            return (
              <motion.div
                key={item.company}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={styles.cardShell}
              >
                <HoverTransition
                  defaultComponent={defaultCard}
                  hoverComponent={hoverCard}
                  effect="ripple"
                  direction="center"
                  duration={0.7}
                  easing="cubic-bezier(0.22, 1, 0.36, 1)"
                  label={`${item.founder} from ${item.company} testimonial`}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SocialProof;
