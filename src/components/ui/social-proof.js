"use client";

import { useMemo } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "./carousel";
import styles from "./social-proof.module.css";

// Vector Client Company Logos
function CompanyLogo({ id, size = 26 }) {
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
    hoverImpact: "0 Hrs/Wk Required",
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
    hoverImpact: "Closing Before Zoom",
    quote:
      "Positioning First changed everything. We stopped competing on price and started closing enterprise buyers before the demo even started.",
  },
  {
    company: "Veloce Security",
    logoId: "veloce",
    stage: "Series A • Cybersecurity",
    founder: "Sarah Jenkins",
    role: "Co-Founder & CPO",
    avatarImg: "/avatars/sarah-jenkins.jpg",
    coreMetric: "-21 Days Velocity",
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
    coreMetric: "Top 1% Creator",
    metricLabel: "Creator Benchmark",
    hoverImpact: "Compounding Pipeline",
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
    coreMetric: "$240k Pipeline",
    metricLabel: "Pipeline Influenced",
    hoverImpact: "$240k Pipeline Created",
    quote:
      "The highest-leverage personal brand investment I've made as a founder. Revloom is our secret weapon for building category trust.",
  },
];

export function SocialProof() {
  const autoplayPlugin = useMemo(
    () => Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true }),
    []
  );

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
            executive positioning transformed their personal authority into predictable pipeline.
          </p>
        </div>

        {/* Shadcn Carousel with Testimonial Cards (3 in a Row, Auto-scrolling every 3.5s) */}
        <Carousel
          opts={{
            loop: true,
            align: "start",
          }}
          plugins={[autoplayPlugin]}
          className={styles.carouselWrapper}
        >
          <CarouselContent>
            {CLIENT_TESTIMONIALS.map((item, index) => (
              <CarouselItem key={`${item.company}-${index}`}>
                <article className={styles.cardShell}>
                  {/* Top Row: Company Name on Top Left, Metric on Top Right */}
                  <div className={styles.cardTopRow}>
                    <div className={styles.companyInfoTopLeft}>
                      <div className={styles.companyLogoBadge}>
                        <CompanyLogo id={item.logoId} size={18} />
                      </div>
                      <div className={styles.companyTextGroup}>
                        <span className={styles.companyName}>{item.company}</span>
                        <span className={styles.companyStage}>{item.stage}</span>
                      </div>
                    </div>

                    <div className={styles.metricBadgeTopRight}>
                      <span className={styles.metricDot} />
                      <span>{item.coreMetric}</span>
                    </div>
                  </div>

                  {/* Central Quote Text */}
                  <div className={styles.quoteCentralWrapper}>
                    <span className={styles.quoteMarkGlyph} aria-hidden="true">&ldquo;</span>
                    <blockquote className={styles.centralQuoteText}>
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                  </div>

                  {/* Bottom Row: Person Name and Avatar on Bottom Left */}
                  <div className={styles.cardBottomRow}>
                    <div className={styles.founderBottomLeft}>
                      <div className={styles.avatarWrap}>
                        <Image
                          src={item.avatarImg}
                          alt={item.founder}
                          width={54}
                          height={54}
                          className={styles.avatarImg}
                        />
                        <span className={styles.verifiedBadge} aria-label="Verified Client">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                      </div>

                      <div className={styles.founderDetails}>
                        <h4 className={styles.founderName}>{item.founder}</h4>
                        <p className={styles.founderRole}>{item.role}</p>
                      </div>
                    </div>

                    <div className={styles.impactBottomRight}>
                      <span className={styles.impactLabel}>{item.hoverImpact}</span>
                    </div>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Desktop Floating Previous & Next Buttons */}
          <CarouselPrevious />
          <CarouselNext />

          {/* Bottom Pagination Dots */}
          <CarouselDots />
        </Carousel>
      </div>
    </section>
  );
}

export default SocialProof;
