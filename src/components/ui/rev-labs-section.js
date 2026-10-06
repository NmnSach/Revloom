"use client";

import { motion } from "framer-motion";
import OrbViewer from "./orb-viewer";
import styles from "./rev-labs-section.module.css";

// SVG Icons tailored for n8n Automation & AI Workflow capabilities
function WorkflowNodeIcon({ className }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="3" width="6" height="6" rx="2" />
      <rect x="16" y="3" width="6" height="6" rx="2" />
      <rect x="9" y="15" width="6" height="6" rx="2" />
      <path d="M5 9v3a3 3 0 0 0 3 3h1" />
      <path d="M19 9v3a3 3 0 0 1-3 3h-1" />
      <circle cx="12" cy="18" r="1" fill="currentColor" />
    </svg>
  );
}

function NeuralVoiceIcon({ className }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2a4 4 0 0 0-4 4v6a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="8" y1="22" x2="16" y2="22" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
    </svg>
  );
}

function AlgorithmRadarIcon({ className }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M2 12h20" />
      <circle cx="15" cy="8" r="1.5" fill="#C6FF3D" stroke="none" />
      <circle cx="9" cy="16" r="1.5" fill="#C6FF3D" stroke="none" />
    </svg>
  );
}

function InboundTargetIcon({ className }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <path d="M12 2v3" />
      <path d="M12 19v3" />
      <path d="M2 12h3" />
      <path d="M19 12h3" />
    </svg>
  );
}

export function RevLabsSection() {
  // Compact, high-impact capabilities focused strictly on n8n workflows + AI LinkedIn visibility
  const capabilities = [
    {
      id: "n8n-pipelines",
      tag: "n8n Workflows",
      title: "Multi-Node Pipeline Workflows",
      desc: "Custom n8n pipelines run 24/7 to monitor target ICP accounts, sync prospect buying signals, and automate multi-step touchpoints.",
      metric: "⚡ 24/7 n8n Logic",
      icon: <WorkflowNodeIcon className={styles.cardIconSvg} />,
      side: "left",
      glowColor: "purple",
    },
    {
      id: "ai-neural-voice",
      tag: "AI Calibration",
      title: "Executive Voice Synthesis",
      desc: "Fine-tuned AI models ingest your tone and domain frameworks to craft authentic, high-resonance LinkedIn content that builds authority.",
      metric: "🧠 Voice-Matched AI",
      icon: <NeuralVoiceIcon className={styles.cardIconSvg} />,
      side: "left",
      glowColor: "lime",
    },
    {
      id: "algo-telemetry",
      tag: "Visibility Scoring",
      title: "Algorithmic Feed Telemetry",
      desc: "Pre-publish AI scoring analyzes dwell time, hook potency, and comment velocity to maximize first-hour LinkedIn feed distribution.",
      metric: "📈 3.4x Reach Multiplier",
      icon: <AlgorithmRadarIcon className={styles.cardIconSvg} />,
      side: "right",
      glowColor: "lime",
    },
    {
      id: "lead-router",
      tag: "Lead Routing",
      title: "Smart Inbound Capture",
      desc: "n8n workflows filter reactions, comments, and profile visits to instantly identify ICP decision-makers and route warm openers.",
      metric: "🎯 Automated ICP Routing",
      icon: <InboundTargetIcon className={styles.cardIconSvg} />,
      side: "right",
      glowColor: "purple",
    },
  ];

  return (
    <section id="rev-labs" className={styles.sectionContainer}>
      {/* Background Architectural Grid & Subtle Ambient Auras */}
      <div className={styles.backgroundGrid} />
      <div className={styles.ambientAuraTop} />
      <div className={styles.ambientAuraCenter} />

      <div className={styles.contentWrapper}>
        {/* Compact Section Header */}
        <div className={styles.headerArea}>
          <div className={styles.pillBadge}>
            <span className={styles.pulseDot} />
            <span>REV LABS • AI &amp; n8n WORKFLOW ENGINE</span>
          </div>

          <h2 className={styles.sectionHeading}>
            Autonomous LinkedIn Visibility,{" "}
            <span className="text-gradient">Engineered with n8n &amp; AI</span>
          </h2>

          <p className={styles.sectionSubtext}>
            Rev Labs builds custom n8n workflows and AI systems that run 24/7 behind your personal brand to expand reach, engage high-intent leads, and turn attention into predictable pipeline.
          </p>
        </div>

        {/* Constellation Layout: Left Compact Cards + Center 3D Floating Orb + Right Compact Cards */}
        <div className={styles.constellationGrid}>
          {/* Left Column Cards */}
          <div className={styles.leftColumn}>
            {capabilities
              .filter((c) => c.side === "left")
              .map((card, idx) => (
                <motion.div
                  key={card.id}
                  className={`${styles.capabilityCard} ${styles[`glow_${card.glowColor}`]}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: idx * 0.12 }}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIconWrap}>{card.icon}</div>
                    <span className={styles.cardTag}>{card.tag}</span>
                  </div>

                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardDesc}>{card.desc}</p>

                  <div className={styles.cardMetricRow}>
                    <span className={styles.cardMetricBadge}>{card.metric}</span>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Center Column: Clean Floating 3D Orb (No concentric radar circles, drag-to-spin only) */}
          <div className={styles.centerOrbColumn}>
            <div className={styles.orbStage}>
              <div className={styles.orbViewport}>
                <OrbViewer />
              </div>
            </div>
          </div>

          {/* Right Column Cards */}
          <div className={styles.rightColumn}>
            {capabilities
              .filter((c) => c.side === "right")
              .map((card, idx) => (
                <motion.div
                  key={card.id}
                  className={`${styles.capabilityCard} ${styles[`glow_${card.glowColor}`]}`}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: idx * 0.12 }}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIconWrap}>{card.icon}</div>
                    <span className={styles.cardTag}>{card.tag}</span>
                  </div>

                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardDesc}>{card.desc}</p>

                  <div className={styles.cardMetricRow}>
                    <span className={styles.cardMetricBadge}>{card.metric}</span>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default RevLabsSection;
