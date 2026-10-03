"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneCall, Sliders, FileText, Zap, BarChart3 } from "lucide-react";
import { CircuitBoard } from "./circuit-board";
import styles from "./process-section.module.css";

const CIRCUIT_NODES = [
  {
    id: "discovery",
    x: 95,
    y: 135,
    label: "Discovery Call",
    timeline: "Week 1",
    stepNumber: "01",
    size: "lg",
    labelPosition: "below",
    icon: <PhoneCall className="w-5 h-5" />,
  },
  {
    id: "technical_setup",
    x: 278,
    y: 65,
    label: "Technical Setup",
    timeline: "Week 2",
    stepNumber: "02",
    size: "lg",
    labelPosition: "above",
    icon: <Sliders className="w-5 h-5" />,
  },
  {
    id: "research_content",
    x: 461,
    y: 195,
    label: "Research & Content",
    timeline: "Week 3",
    stepNumber: "03",
    size: "lg",
    labelPosition: "below",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: "campaign_launch",
    x: 644,
    y: 65,
    label: "Campaign Launch",
    timeline: "From Day 15",
    stepNumber: "04",
    size: "lg",
    labelPosition: "above",
    icon: <Zap className="w-5 h-5" />,
  },
  {
    id: "analytics_optimisation",
    x: 827,
    y: 135,
    label: "Analytics & Optimisation",
    timeline: "Ongoing",
    stepNumber: "05",
    size: "lg",
    labelPosition: "below",
    icon: <BarChart3 className="w-5 h-5" />,
  },
];

const CIRCUIT_CONNECTIONS = [
  {
    from: "discovery",
    to: "technical_setup",
    animated: true,
  },
  {
    from: "technical_setup",
    to: "research_content",
    animated: true,
  },
  {
    from: "research_content",
    to: "campaign_launch",
    animated: true,
  },
  {
    from: "campaign_launch",
    to: "analytics_optimisation",
    animated: true,
  },
];

const PROCESS_STEPS = [
  {
    id: "discovery",
    stepNumber: "01",
    nodeTitle: "Discovery Call",
    nodeTimeline: "Week 1",
    phaseBadge: "Phase 01",
    phaseTimeline: "Week 1",
    title: "Discovery Call",
    subtitle: "Business & Growth Alignment",
    description:
      "We sit down with you and your team to understand your business, offer, audience, current growth channels, goals, and what needs to happen next.",
    deliverables: [
      { text: "45–60 min discovery call", icon: "clock" },
    ],
    iconType: "phone",
  },
  {
    id: "technical_setup",
    stepNumber: "02",
    nodeTitle: "Technical Setup",
    nodeTimeline: "Week 2",
    phaseBadge: "Phase 02",
    phaseTimeline: "Week 2",
    title: "Technical Setup",
    subtitle: "Get Everything Ready",
    description:
      "We set up the infrastructure required to run your campaigns properly. For LinkedIn, this includes profile optimisation. For email, we handle the technical foundation required for outreach and deliverability.",
    deliverables: [
      { text: "LinkedIn optimisation", icon: "check" },
      { text: "Email setup", icon: "check" },
      { text: "DKIM • SPF • MX", icon: "check" },
      { text: "Tracking", icon: "check" },
    ],
    iconType: "sliders",
  },
  {
    id: "research_content",
    stepNumber: "03",
    nodeTitle: "Research & Content",
    nodeTimeline: "Week 3",
    phaseBadge: "Phase 03",
    phaseTimeline: "Week 3",
    title: "Research & Content",
    subtitle: "Build the Foundation",
    description:
      "We research your ICP, audience, competitors, market, and messaging while developing your LinkedIn content strategy. Your first content starts going live from Week 2, while email infrastructure begins warming up.",
    deliverables: [
      { text: "ICP research", icon: "check" },
      { text: "Lead research", icon: "check" },
      { text: "Content strategy", icon: "check" },
      { text: "Email warm-up", icon: "check" },
    ],
    iconType: "document",
  },
  {
    id: "campaign_launch",
    stepNumber: "04",
    nodeTitle: "Campaign Launch",
    nodeTimeline: "From Day 15",
    phaseBadge: "Phase 04",
    phaseTimeline: "From Day 15",
    title: "Campaign Launch",
    subtitle: "Start the Conversations",
    description:
      "Once the foundation is ready, we launch your outbound campaigns. LinkedIn outreach and email campaigns begin running with targeted messaging and structured follow-ups.",
    deliverables: [
      { text: "LinkedIn outreach", icon: "check" },
      { text: "Email campaigns", icon: "check" },
      { text: "Personalised messaging", icon: "check" },
      { text: "Follow-ups", icon: "check" },
    ],
    iconType: "lightning",
  },
  {
    id: "analytics_optimisation",
    stepNumber: "05",
    nodeTitle: "Analytics & Optimisation",
    nodeTimeline: "Ongoing",
    phaseBadge: "Phase 05",
    phaseTimeline: "Ongoing",
    title: "Analytics & Optimisation",
    subtitle: "Improve What Works",
    description:
      "We track campaign performance, responses, engagement, and lead quality. The data feeds back into our messaging, targeting, content, and outreach strategy so every cycle gets sharper.",
    deliverables: [
      { text: "Performance tracking", icon: "check" },
      { text: "Testing", icon: "check" },
      { text: "Iteration", icon: "check" },
      { text: "Monthly reporting", icon: "check" },
    ],
    iconType: "chart",
  },
];

function StepIcon({ type, className }) {
  switch (type) {
    case "phone":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      );
    case "sliders":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <line x1="4" y1="21" x2="4" y2="14"/>
          <line x1="4" y1="10" x2="4" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12" y2="3"/>
          <line x1="20" y1="21" x2="20" y2="16"/>
          <line x1="20" y1="12" x2="20" y2="3"/>
          <line x1="1" y1="14" x2="7" y2="14"/>
          <line x1="9" y1="8" x2="15" y2="8"/>
          <line x1="17" y1="16" x2="23" y2="16"/>
        </svg>
      );
    case "document":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
      );
    case "lightning":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      );
    case "chart":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <line x1="6" y1="20" x2="6" y2="14"/>
          <line x1="12" y1="20" x2="12" y2="8"/>
          <line x1="18" y1="20" x2="18" y2="12"/>
        </svg>
      );
    default:
      return null;
  }
}

function ClockIcon({ className }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CheckIcon({ className }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function PhaseInspectionContent({ currentStep, handlePrev, handleNext }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep.id}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.2 }}
        className={styles.inspectionContent}
      >
        {/* Left Column */}
        <div className={styles.inspectionLeft}>
          <div className={styles.phaseHeaderRow}>
            <span className={styles.phaseBadge}>{currentStep.phaseBadge}</span>
            <span className={styles.phaseTimeline}>{currentStep.phaseTimeline}</span>
          </div>
          <h3 className={styles.phaseTitle}>{currentStep.title}</h3>
          <div className={styles.phaseSubtitle}>{currentStep.subtitle}</div>
          <p className={styles.phaseDescription}>{currentStep.description}</p>
        </div>

        {/* Right Column: Deliverables */}
        <div className={styles.deliverablesCard}>
          <div className={styles.deliverablesHeader}>
            <span className={styles.deliverablesTitle}>Deliverables</span>
          </div>
          <ul className={styles.deliverablesList}>
            {currentStep.deliverables.map((item, idx) => (
              <li key={idx} className={styles.deliverableItem}>
                <span className={styles.deliverableIconWrapper}>
                  {item.icon === "clock" ? (
                    <ClockIcon className={styles.deliverableIcon} />
                  ) : (
                    <CheckIcon className={styles.deliverableIcon} />
                  )}
                </span>
                <span className={styles.deliverableText}>{item.text}</span>
              </li>
            ))}
          </ul>
          <div className={styles.navControls}>
            <button type="button" onClick={handlePrev} className={styles.navBtn} aria-label="Previous Phase">
              <svg className={styles.navSvg} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button type="button" onClick={handleNext} className={styles.navBtn} aria-label="Next Phase">
              <svg className={styles.navSvg} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function ProcessSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const currentStep = PROCESS_STEPS[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : PROCESS_STEPS.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < PROCESS_STEPS.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="services" className={styles.sectionContainer}>
      <span id="process" style={{ position: "absolute", top: 0, pointerEvents: "none" }} aria-hidden="true" />
      {/* Background Architectural Grid & Subtle Radial Aura */}
      <div className={styles.backgroundGrid} />
      <div className={styles.ambientAura} />

      <div className={styles.contentWrapper}>
        {/* Header Area */}
        <div className={styles.headerArea}>
          <h2 className={styles.sectionHeading}>
            Here&apos;s Exactly{" "}
            <span className="text-gradient">How We Get You There</span>
          </h2>

          <p className={styles.subText}>
            A battle-tested 5-phase growth engine engineered to turn dormant profiles into predictable pipeline.
          </p>
        </div>

        {/* Unified Container: Circuit Board + Inspection Card */}
        <div className={styles.desktopCircuitWrapper}>
          {/* Circuit Board */}
          <CircuitBoard
            nodes={CIRCUIT_NODES.map((node, idx) => ({
              ...node,
              status: activeIndex === idx ? "active" : "inactive",
            }))}
            connections={CIRCUIT_CONNECTIONS}
            width={922}
            height={290}
            gridSize={20}
            showGrid={true}
            activeNodeId={currentStep.id}
            onNodeClick={(node, index) => setActiveIndex(index)}
            style={{ height: "290px" }}
          />

          {/* Divider */}
          <div className={styles.circuitCardDivider} />

          {/* Inspection Card Content */}
          <PhaseInspectionContent
            currentStep={currentStep}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        </div>

        {/* Mobile View: Preserved Touch Stepper for Phone (as requested) */}
        <div className={styles.mobilePipelineWrapper}>
          <div className={styles.pipelineDiagramWrapper}>
            {/* Animated Circuit Board SVG Canvas */}
            <div className={styles.traceLineContainer}>
              <svg
                className={styles.traceSvg}
                preserveAspectRatio="none"
                viewBox="0 0 1000 44"
              >
                <defs>
                  <filter id="circuitElectricGlowMobile" x="-30%" y="-100%" width="160%" height="300%">
                    <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Static Central Base Line strictly through all 5 Nodes */}
                <line
                  x1="100"
                  y1="22"
                  x2="900"
                  y2="22"
                  stroke="rgba(108, 43, 217, 0.35)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />

                {/* Primary Electric Neon Signal Traveling strictly from Step 1 (100) to Step 5 (900) */}
                <motion.line
                  x1="100"
                  y1="22"
                  x2="900"
                  y2="22"
                  stroke="#C6FF3D"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  filter="url(#circuitElectricGlowMobile)"
                  strokeDasharray="100 700"
                  animate={{ strokeDashoffset: [0, -800] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "linear" }}
                  vectorEffect="non-scaling-stroke"
                />

                {/* Circuit Solder Pad Points at each of the 5 nodes */}
                <circle cx="100" cy="22" r="4.5" fill="#6C2BD9" stroke="#C6FF3D" strokeWidth="1.5" />
                <circle cx="300" cy="22" r="4.5" fill="#6C2BD9" stroke="#C6FF3D" strokeWidth="1.5" />
                <circle cx="500" cy="22" r="4.5" fill="#6C2BD9" stroke="#C6FF3D" strokeWidth="1.5" />
                <circle cx="700" cy="22" r="4.5" fill="#6C2BD9" stroke="#C6FF3D" strokeWidth="1.5" />
                <circle cx="900" cy="22" r="4.5" fill="#6C2BD9" stroke="#C6FF3D" strokeWidth="1.5" />
              </svg>
            </div>

            {/* 5 Nodes Row for Mobile */}
            <div className={styles.nodesRow}>
              {PROCESS_STEPS.map((step, idx) => {
                const isActive = activeIndex === idx;

                return (
                  <div
                    key={step.id}
                    className={`${styles.nodeItem} ${isActive ? styles.nodeItemActive : ""}`}
                    onClick={() => setActiveIndex(idx)}
                  >
                    <button
                      type="button"
                      className={`${styles.nodeButton} ${isActive ? styles.nodeButtonActive : ""}`}
                      aria-label={`${step.stepNumber} — ${step.nodeTitle}`}
                      aria-pressed={isActive}
                    >
                      {isActive && (
                        <motion.div
                          className={styles.nodeActiveHalo}
                          initial={{ scale: 0.85, opacity: 0 }}
                          animate={{ scale: [1, 1.28, 1], opacity: [0.7, 0.2, 0.7] }}
                          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                        />
                      )}

                      <span
                        className={`${styles.nodeBadge} ${
                          isActive ? styles.nodeBadgeActive : ""
                        }`}
                      >
                        {step.stepNumber}
                      </span>

                      <span className={styles.nodeIcon}>
                        <StepIcon type={step.iconType} />
                      </span>
                    </button>

                    <div className={styles.nodeLabelGroup}>
                      <span className={styles.nodeTitle}>{step.nodeTitle}</span>
                      <span className={styles.nodeTimeline}>{step.nodeTimeline}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Inspection Card for Mobile */}
          <div className={styles.inspectionCard}>
            <PhaseInspectionContent
              currentStep={currentStep}
              handlePrev={handlePrev}
              handleNext={handleNext}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProcessSection;
