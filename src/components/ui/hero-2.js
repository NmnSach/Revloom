"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { KineticTextReveal } from "@/components/ui/kinetic-text-reveal";
import { cn } from "@/lib/utils";
import styles from "./hero-2.module.css";

// Individual Bento Card with Local Cursor Spotlight Glow
function BentoCard({ children, className = "", style = {} }) {
  const cardRef = useRef(null);
  const [localMouse, setLocalMouse] = useState({ x: -500, y: -500, isHovered: false });

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setLocalMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovered: true,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setLocalMouse((prev) => ({ ...prev, isHovered: false }));
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${styles.bentoCard} ${className}`}
      style={style}
    >
      {/* Dynamic Cursor Spotlight Surface */}
      <div
        className={styles.cardSpotlight}
        style={{
          background: localMouse.isHovered
            ? `radial-gradient(400px circle at ${localMouse.x}px ${localMouse.y}px, rgba(108, 43, 217, 0.06), rgba(198, 255, 61, 0.12) 40%, transparent 80%)`
            : "none",
          opacity: localMouse.isHovered ? 1 : 0,
        }}
      />
      {children}
    </div>
  );
}

// Floating Founder Avatars around the Hero Section (8-9 color avatars)
const FLOATING_AVATARS = [
  {
    id: "yellow-man",
    name: "Julian Vance",
    role: "Co-Founder & CEO, Hyperplane",
    avatarImg: "/avatars/color/yellow-man.jpg",
    size: 74,
    top: "4%",
    left: "29%",
    animClass: styles.floatA,
    tooltipPos: "left",
  },
  {
    id: "peach-woman",
    name: "Nadia Patel",
    role: "Founder & CEO, FinFlow",
    avatarImg: "/avatars/color/peach-woman.jpg",
    size: 44,
    top: "8%",
    right: "30%",
    animClass: styles.floatC,
    tooltipPos: "right",
  },
  {
    id: "teal-man",
    name: "Marcus Chen",
    role: "Founder, OmniFlow",
    avatarImg: "/avatars/color/teal-man.jpg",
    size: 68,
    top: "16%",
    left: "2%",
    animClass: styles.floatB,
    tooltipPos: "right",
  },
  {
    id: "slate-man",
    name: "Liam Foster",
    role: "Managing Director, Veloce",
    avatarImg: "/avatars/color/slate-man.jpg",
    size: 62,
    top: "15%",
    right: "2%",
    animClass: styles.floatB,
    tooltipPos: "left",
  },
  {
    id: "mint-woman",
    name: "Chloe Zhao",
    role: "Head of Growth, Loominate",
    avatarImg: "/avatars/color/mint-woman.jpg",
    size: 48,
    top: "47%",
    left: "6%",
    animClass: styles.floatC,
    tooltipPos: "right",
  },
  {
    id: "rose-woman",
    name: "Elena Rostova",
    role: "CTO, Koyeb Metrics",
    avatarImg: "/avatars/color/rose-woman.jpg",
    size: 52,
    top: "46%",
    right: "6%",
    animClass: styles.floatA,
    tooltipPos: "left",
  },
  {
    id: "blue-man",
    name: "Devon Pierce",
    role: "CEO, StackPulse",
    avatarImg: "/avatars/color/blue-man.jpg",
    size: 66,
    top: "76%",
    left: "2%",
    animClass: styles.floatA,
    tooltipPos: "right",
  },
  {
    id: "amber-woman",
    name: "Sarah Jenkins",
    role: "Co-Founder, Synthetix",
    avatarImg: "/avatars/color/amber-woman.jpg",
    size: 48,
    top: "83%",
    left: "32%",
    animClass: styles.floatB,
    tooltipPos: "right",
  },
  {
    id: "purple-man",
    name: "Alex Rivera",
    role: "Category Lead, HyperScale",
    avatarImg: "/avatars/color/purple-man.jpg",
    size: 78,
    top: "73%",
    right: "2%",
    animClass: styles.floatC,
    tooltipPos: "left",
  },
];

export function Hero2({ onAuditClick, onHowItWorksClick, isReady = true }) {
  const containerRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const reduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [chartActivePoint, setChartActivePoint] = useState(5);

  useEffect(() => {
    if (isReady) {
      textRef1.current?.play();
      textRef2.current?.play();
    }
  }, [isReady]);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Fluid spring physics for the ambient trailing glow
  const springX = useSpring(mouseX, { stiffness: 120, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 22 });

  // Tighter spring for the precision cursor bead
  const beadX = useSpring(mouseX, { stiffness: 380, damping: 30 });
  const beadY = useSpring(mouseY, { stiffness: 380, damping: 30 });

  const handleContainerMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
    if (!isHovered) setIsHovered(true);
  };

  const handleContainerMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(-1000);
    mouseY.set(-1000);
  };

  // Mock chart data points for executive growth curve
  const chartPoints = [
    { label: "W1", val: 32, reach: "24.2k" },
    { label: "W2", val: 46, reach: "41.8k" },
    { label: "W3", val: 62, reach: "72.4k" },
    { label: "W4", val: 84, reach: "105.1k" },
    { label: "W5", val: 110, reach: "131.0k" },
    { label: "W6", val: 148, reach: "148.5k" },
  ];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleContainerMouseMove}
      onMouseLeave={handleContainerMouseLeave}
      className={styles.heroContainer}
    >
      {/* Background Architectural Grid & Subtle Vignette */}
      <div className={styles.backgroundGrid} />
      <div className={styles.topAura} />

      {/* Spring-Physics Trailing Cursor Glow (Hidden on mobile via CSS) */}
      {!reduceMotion && (
        <>
          <motion.div
            className={styles.cursorGlow}
            style={{
              left: springX,
              top: springY,
              opacity: isHovered ? 1 : 0,
            }}
          />
          <motion.div
            className={styles.cursorBead}
            style={{
              left: beadX,
              top: beadY,
              opacity: isHovered ? 1 : 0,
            }}
          />
        </>
      )}

      {/* Hero Header & Copy */}
      <div className={styles.headerContent}>
        {/* Floating Founder Avatars Frame */}
        <div className={styles.floatingAvatarsWrapper} aria-hidden="false">
          {FLOATING_AVATARS.map((avatar) => (
            <div
              key={avatar.id}
              className={cn(styles.floatingAvatarItem, avatar.animClass)}
              style={{
                top: avatar.top,
                left: avatar.left,
                right: avatar.right,
                width: avatar.size,
                height: avatar.size,
              }}
            >
              <div className={styles.avatarCircle}>
                <Image
                  src={avatar.avatarImg}
                  alt={avatar.name}
                  width={avatar.size}
                  height={avatar.size}
                  className={styles.avatarImg}
                  priority
                />
              </div>

              {/* Interactive Tooltip Card */}
              <div className={cn(styles.avatarTooltip, styles[`tooltip_${avatar.tooltipPos}`])}>
                <div className={styles.tooltipName}>{avatar.name}</div>
                <div className={styles.tooltipRole}>{avatar.role}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Pill Eyebrow */}
        <div className={styles.pillBadge}>
          <span className={styles.pulseDot} />
          <span>The Executive Positioning Engine for LinkedIn</span>
        </div>

        {/* Big Bold Kinetic Headline */}
        <h1 className={styles.mainHeadline}>
          <span className={styles.headlineWrapper}>
            <span className={styles.headlineLine}>
              <KineticTextReveal
                ref={textRef1}
                text="Stop posting."
                className={styles.kineticLine}
                segmentClassName={styles.darkSegment}
                maskClassName={styles.kineticMask}
                splitBy="words"
                direction="up"
                distance={32}
                stagger={0.08}
                delay={0.15}
              />
            </span>
            <span className={styles.headlineLine}>
              <KineticTextReveal
                ref={textRef2}
                text="Start positioning."
                className={styles.kineticLine}
                segmentClassName={styles.darkSegment}
                maskClassName={styles.kineticMask}
                splitBy="words"
                direction="up"
                distance={32}
                stagger={0.08}
                delay={0.4}
              />
            </span>
          </span>
        </h1>

        {/* Subheadline */}
        <p className={styles.subHeadline}>
          Revloom handles your LinkedIn strategy, ghostwriting, and engagement
          end-to-end — turning your profile into a pipeline-generating asset with
          zero ghostwriting fluff.
        </p>

        {/* CTAs */}
        <div className={styles.ctaGroup}>
          <a
            href="#audit"
            onClick={onAuditClick}
            className={styles.primaryCta}
          >
            <span>Get My Free Positioning Audit</span>
            <span>→</span>
          </a>
          <a
            href="#how-it-works"
            onClick={onHowItWorksClick}
            className={styles.secondaryCta}
          >
            <span>See How It Works</span>
          </a>
        </div>

        {/* Micro-Proof Metrics */}
        <div className={styles.microProof}>
          <span className={styles.proofItem}>
            <span className={styles.proofCheck}>✓</span> Trusted by 50+ B2B Founders
          </span>
          <span className={styles.proofDot}>•</span>
          <span className={styles.proofItem}>
            <span className={styles.proofCheck}>✓</span> 6.6M+ Impressions Generated
          </span>
          <span className={styles.proofDot}>•</span>
          <span className={styles.proofItem}>
            <span className={styles.proofCheck}>✓</span> 94% Client Satisfaction
          </span>
        </div>

        {/* Scroll Indicator */}
        <a href="#explore-architecture" className={styles.scrollIndicator}>
          <span>Explore Architecture</span>
          <span className={styles.scrollArrow}>↓</span>
        </a>
      </div>

      {/* Curved Bento Grid */}
      <div id="explore-architecture" className={styles.bentoGridWrapper}>
        {/* Bento Card 1: Executive Authority & Reach Spotlight (Span 7) */}
        <BentoCard className={styles.card1}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTag}>✦ Authority Engine</span>
            <div className={styles.cardStatus}>
              <span className={styles.cardStatusDot} />
              <span>Live Executive Dashboard</span>
            </div>
          </div>

          <h3 className={styles.cardTitle}>Executive Reach & Authority Curve</h3>
          <p className={styles.cardDesc}>
            From inconsistent posting to top 1% industry category leader. Real reach
            compounding week over week.
          </p>

          <div className={styles.metricDisplay}>
            <span className={styles.metricBig}>+342%</span>
            <span className={styles.metricLabel}>
              Profile reach growth in first 60 days
            </span>
          </div>

          {/* Interactive Dynamic SVG Growth Graph */}
          <div className={styles.chartContainer}>
            <svg
              viewBox="0 0 500 120"
              preserveAspectRatio="none"
              style={{ width: "100%", height: "100%", overflow: "visible" }}
            >
              <defs>
                <linearGradient id="chartGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#6C2BD9" stopOpacity="0.22" />
                  <stop offset="60%" stopColor="#FF4FCE" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#6C2BD9" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6C2BD9" />
                  <stop offset="50%" stopColor="#FF4FCE" />
                  <stop offset="100%" stopColor="#8544F6" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(108,43,217,0.1)" strokeDasharray="4 4" />
              <line x1="0" y1="70" x2="500" y2="70" stroke="rgba(108,43,217,0.1)" strokeDasharray="4 4" />

              {/* Gradient Area Fill */}
              <path
                d="M 10 100 Q 100 88, 180 72 T 320 45 T 480 18 L 480 115 L 10 115 Z"
                fill="url(#chartGlow)"
              />

              {/* Smooth Spline Line */}
              <path
                d="M 10 100 Q 100 88, 180 72 T 320 45 T 480 18"
                fill="none"
                stroke="url(#lineGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Interactive Nodes */}
              {chartPoints.map((pt, i) => {
                const cx = 15 + i * 92;
                const cy = 100 - (pt.val / 150) * 82;
                const active = chartActivePoint === i;

                return (
                  <g
                    key={pt.label}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => setChartActivePoint(i)}
                  >
                    <circle
                      cx={cx}
                      cy={cy}
                      r={active ? 6.5 : 4}
                      fill={active ? "#6C2BD9" : "#8544F6"}
                      stroke={active ? "#C6FF3D" : "#FFFFFF"}
                      strokeWidth={active ? "3" : "2"}
                      style={{ transition: "all 0.2s ease" }}
                    />
                    {active && (
                      <text
                        x={cx}
                        y={cy - 12}
                        textAnchor="middle"
                        fill="#6C2BD9"
                        fontSize="11"
                        fontWeight="700"
                        fontFamily="var(--font-headline)"
                      >
                        {pt.reach}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </BentoCard>

        {/* Bento Card 2: Visual Carousel Slide Architecture (Span 5) */}
        <BentoCard className={styles.card2}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTag}>✦ Carousel Studio</span>
            <div className={styles.cardStatus}>
              <span>Slide 01 / 07</span>
            </div>
          </div>

          <h3 className={styles.cardTitle}>Viral Slide Architecture</h3>
          <p className={styles.cardDesc}>
            Engineered hook design and punchy typography that commands attention in
            the LinkedIn feed.
          </p>

          {/* 3D Stacked Tilted Deck Preview */}
          <div className={styles.carouselDeck}>
            <div className={styles.deckCardBack} />
            <div className={styles.deckCardFront}>
              <div className={styles.deckTitle}>
                THE 5 PILLARS OF FOUNDER POSITIONING
              </div>
              <div className={styles.deckSub}>
                Why 99% of executive LinkedIn posts fail to generate enterprise
                pipeline — and the exact 3-step system top founders use instead.
              </div>
              <div className={styles.deckStats}>
                <span>2,480 Reposts</span>
                <span>890 Comments</span>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* Bento Card 3: Inbound DM & Deal Pipeline (Span 5) */}
        <BentoCard className={styles.card3}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTag}>✦ Inbound Pipeline</span>
            <div className={styles.cardStatus}>
              <span className={styles.cardStatusDot} />
              <span>Direct Inbound</span>
            </div>
          </div>

          <h3 className={styles.cardTitle}>Real Pipeline, Zero Fluff</h3>
          <p className={styles.cardDesc}>
            Turning reach into warm conversations with buyers and investors.
          </p>

          <div className={styles.dmCard}>
            <div className={styles.dmSender}>
              <div className={styles.dmAvatar}>MC</div>
              <div>
                <div className={styles.dmName}>Marcus Chen</div>
                <div className={styles.dmRole}>VP Enterprise Growth @ Series B SaaS</div>
              </div>
            </div>
            <div className={styles.dmBubble}>
              &quot;Hey Alex, saw your breakdown on category creation yesterday. We are
              navigating this exact pivot right now. Could we grab 20 mins next
              Tuesday?&quot;
            </div>
            <div className={styles.dmFooter}>
              <span>✓ Qualified Inbound Opportunity</span>
              <span>$48k ACV</span>
            </div>
          </div>
        </BentoCard>

        {/* Bento Card 4: End-to-End Ghostwriting Framework (Span 7) */}
        <BentoCard className={styles.card4}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTag}>✦ 30-Min Time Commitment</span>
            <div className={styles.cardStatus}>
              <span>Turnkey Execution</span>
            </div>
          </div>

          <h3 className={styles.cardTitle}>The 4-Step Executive Positioning System</h3>
          <p className={styles.cardDesc}>
            You give us 30 minutes every two weeks. We deliver daily high-authority
            presence and inbound deal flow.
          </p>

          <div className={styles.timelineGrid}>
            <div className={styles.timelineStep}>
              <span className={styles.stepNumber}>STEP 01</span>
              <span className={styles.stepName}>Voice Extraction</span>
              <span className={styles.stepDesc}>
                30-min bi-weekly interview to capture your war stories & frameworks.
              </span>
            </div>
            <div className={styles.timelineStep}>
              <span className={styles.stepNumber}>STEP 02</span>
              <span className={styles.stepName}>Hook Engineering</span>
              <span className={styles.stepDesc}>
                Crafting scroll-stopping insights with zero corporate jargon.
              </span>
            </div>
            <div className={styles.timelineStep}>
              <span className={styles.stepNumber}>STEP 03</span>
              <span className={styles.stepName}>Targeted Commenting</span>
              <span className={styles.stepDesc}>
                Engaging top creators to pull relevant decision-makers to your profile.
              </span>
            </div>
            <div className={styles.timelineStep}>
              <span className={styles.stepNumber}>STEP 04</span>
              <span className={styles.stepName}>Pipeline Inbound</span>
              <span className={styles.stepDesc}>
                Converting profile views and DMs into high-ticket sales calls.
              </span>
            </div>
          </div>
        </BentoCard>
      </div>
    </section>
  );
}

export default Hero2;
