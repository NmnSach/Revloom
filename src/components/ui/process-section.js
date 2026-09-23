"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CircuitBoard } from "./circuit-board";
import styles from "./process-section.module.css";

const PROCESS_STEPS = [
  {
    id: "kickoff",
    stepNumber: "01",
    title: "Kickoff",
    subtitle: "Voice & Thesis Extraction",
    timeline: "Day 1",
    description:
      "A 45-minute deep-dive extraction interview capturing your authentic voice, core thesis, and proprietary insights.",
    deliverable: "⚡ 45 Mins (One-Time)",
    nodePos: { x: 110, y: 150 },
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
      </svg>
    ),
  },
  {
    id: "strategy",
    stepNumber: "02",
    title: "Strategy Alignment",
    subtitle: "Positioning & ICP Blueprint",
    timeline: "Days 2–4",
    description:
      "We nail down your 1-of-1 category positioning, ICP audience profile, core content pillars, and competitive narrative.",
    deliverable: "🎯 Positioning Playbook",
    nodePos: { x: 330, y: 80 },
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="22" y1="12" x2="18" y2="12"/>
        <line x1="6" y1="12" x2="2" y2="12"/>
        <line x1="12" y1="6" x2="12" y2="2"/>
        <line x1="12" y1="22" x2="12" y2="18"/>
      </svg>
    ),
  },
  {
    id: "access",
    stepNumber: "03",
    title: "Access & Planning",
    subtitle: "Handover & 30-Day Sprint",
    timeline: "Days 5–7",
    description:
      "Zero-friction profile access handover, tracking integrations, and your first 30-day editorial sprint completely mapped out.",
    deliverable: "🚀 Sprint 1 Approved",
    nodePos: { x: 550, y: 220 },
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    id: "workflow",
    stepNumber: "04",
    title: "Weekly Workflow",
    subtitle: "Hands-Off Execution & Inbound",
    timeline: "Ongoing",
    description:
      "We write, format, schedule, engage in comments, and route high-ticket DMs. You spend 15 minutes reviewing weekly batches.",
    deliverable: "⏱ < 15 Mins / Week",
    nodePos: { x: 770, y: 80 },
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    id: "optimization",
    stepNumber: "05",
    title: "Continuous Optimization",
    subtitle: "Weekly Compounding Growth",
    timeline: "Weekly",
    description:
      "Every post is a test; every result shapes the next sprint. Weekly data retrospectives compound your inbound deal pipeline.",
    deliverable: "📈 Compounding Pipeline",
    nodePos: { x: 990, y: 150 },
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
];

const STATS_DATA = [
  {
    number: "50+",
    label: "B2B Founders Positioned",
    sub: "Seed to Series B Tech Executives",
  },
  {
    number: "6.6M+",
    label: "Impressions Generated",
    sub: "High-Intent Enterprise Reach",
  },
  {
    number: "200+",
    label: "Qualified Sales Calls",
    sub: "Inbound Pipeline Without Ad Spend",
  },
  {
    number: "94%",
    label: "Client Retention Rate",
    sub: "Month-Over-Month Continuity",
  },
];

export function ProcessSection() {
  const [activeStepId, setActiveStepId] = useState("workflow");

  // Prepare nodes for CircuitBoard component
  const circuitNodes = PROCESS_STEPS.map((step) => ({
    id: step.id,
    x: step.nodePos.x,
    y: step.nodePos.y,
    label: step.title,
    duration: step.timeline,
    stepNumber: step.stepNumber,
    icon: step.icon,
    status: activeStepId === step.id ? "active" : "inactive",
    size: "md",
  }));

  // Interconnected circuit traces representing system data flow
  const circuitConnections = [
    { from: "kickoff", to: "strategy", animated: true, pulseColor: "#6C2BD9" },
    { from: "strategy", to: "access", animated: true, pulseColor: "#FF4FCE" },
    { from: "access", to: "workflow", animated: true, pulseColor: "#6C2BD9" },
    { from: "workflow", to: "optimization", animated: true, pulseColor: "#C6FF3D" },
    { from: "optimization", to: "workflow", animated: true, pulseColor: "#6C2BD9" },
  ];

  return (
    <section id="process" className={styles.sectionContainer}>
      {/* Background Architectural Grid & Subtle Radial Aura */}
      <div className={styles.backgroundGrid} />
      <div className={styles.ambientAura} />

      <div className={styles.contentWrapper}>
        {/* Header Area */}
        <div className={styles.headerArea}>
          <div className={styles.pillBadge}>
            <span className={styles.pulseDot} />
            <span>Section 04 • The Process</span>
          </div>

          <div className={styles.systemNotice}>
            No black box. No guesswork. Here&apos;s the exact system we run for every client.
          </div>

          <h2 className={styles.sectionHeading}>
            Here&apos;s Exactly{" "}
            <span className="text-gradient">How We Get You There</span>
          </h2>

          <p className={styles.subText}>
            A battle-tested 5-phase growth engine engineered to turn dormant profiles into predictable pipeline.
          </p>
        </div>

        {/* Stats Proof Bar (50+, 6.6M+, 200+, 94%) */}
        <div className={styles.statsBarWrapper}>
          <div className={styles.statsBar}>
            {STATS_DATA.map((stat) => (
              <div key={stat.label} className={styles.statItem}>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
                <div className={styles.statSub}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Componentry Circuit Board Architecture Visualizer */}
        <div className={styles.circuitWrapper}>
          <div className={styles.circuitHeader}>
            <span className={styles.circuitTitle}>
              <span className={styles.circuitIndicator} />
              SYSTEM PIPELINE ARCHITECTURE // LIVE TRACES
            </span>
            <span className={styles.circuitHint}>
              Click any node to inspect phase deliverables
            </span>
          </div>

          <CircuitBoard
            nodes={circuitNodes}
            connections={circuitConnections}
            width={1100}
            height={320}
            activeNodeId={activeStepId}
            onNodeClick={(id) => setActiveStepId(id)}
            pulseSpeed={2.4}
            traceWidth={2.5}
            gridSize={24}
          />
        </div>

        {/* 5-Step Process Grid */}
        <div className={styles.stepsGrid}>
          {PROCESS_STEPS.map((step) => {
            const isActive = activeStepId === step.id;

            return (
              <motion.div
                key={step.id}
                className={`${styles.stepCard} ${
                  isActive ? styles.stepCardActive : ""
                }`}
                onClick={() => setActiveStepId(step.id)}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.stepCardHeader}>
                  <span className={styles.stepNumberBadge}>
                    Phase {step.stepNumber}
                  </span>
                  <span className={styles.stepTimeline}>{step.timeline}</span>
                </div>

                <div className={styles.stepCardBody}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <span className={styles.stepSub}>{step.subtitle}</span>
                  <p className={styles.stepDescription}>{step.description}</p>
                </div>

                <div className={styles.stepDeliverablePill}>
                  <span>{step.deliverable}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProcessSection;
