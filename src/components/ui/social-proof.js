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
import { VideoTestimonials } from "./video-testimonials";
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

import { TESTIMONIALS } from "@/data/testimonials";

const CLIENT_TESTIMONIALS = TESTIMONIALS.map((t, idx) => ({
  ...t,
  founder: t.name,
  stage: t.relationship,
  logoId: ["hyperplane", "koyeb", "omniflow", "veloce", "stackpulse", "loominate"][idx % 6],
}));


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

        {/* 9:16 Vertical Reel Video Testimonials Carousel */}
        <VideoTestimonials />

        {/* Written Recommendations Sub-Header */}
        <div className={styles.writtenSubHeader}>
          <div className={styles.writtenPill}>
            <span>Endorsements & Recommendations</span>
          </div>
          <h3 className={styles.writtenTitle}>What Clients Say in Their Own Words</h3>
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
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <h4 className={styles.founderName}>{item.founder}</h4>
                          {item.linkedinUrl && (
                            <a
                              href={item.linkedinUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${item.founder} LinkedIn Profile`}
                              style={{ color: "#0A66C2", display: "inline-flex", alignItems: "center", opacity: 0.85 }}
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                              </svg>
                            </a>
                          )}
                        </div>
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
