"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./logo-cloud.module.css";

// Real client logos — dark: true means the logo has a dark background
const CLIENT_LOGOS = [
  { id: "pivot-health",  name: "Pivot Health", src: "/Logo_s under header section/Pivot Health.png",  dark: false },
  { id: "zintlr",       name: "Zintlr",       src: "/Logo_s under header section/Zintlr_.svg",        dark: false },
  { id: "nimblebiz",    name: "Nimblebiz AI",  src: "/Logo_s under header section/Nimblebiz AI.png",   dark: false },
  { id: "skit-media",   name: "Skit Media",   src: "/Logo_s under header section/Skit Media.png",     dark: false },
  { id: "mailsmojo",    name: "Mailsmojo",    src: "/Logo_s under header section/mailsmojo.webp",      dark: false },
  { id: "meavana",      name: "MeaVana",      src: "/Logo_s under header section/MEAVANA.jpeg",       dark: false },
  { id: "78-design",    name: "78 Design",    src: "/Logo_s under header section/78 Deisgns.png",     dark: true  },
  { id: "kamp1",        name: "Kamp1",        src: "/Logo_s under header section/Kamp1.jpeg",         dark: true  },
  { id: "nika-world",   name: "Nika 1.0",     src: "/Logo_s under header section/Nika World.png",    dark: false },
  { id: "maayasthra",   name: "Maayasthra",   src: "/Logo_s under header section/Maayasthra.jpg",    dark: true  },
];

const ROW_1 = CLIENT_LOGOS.slice(0, 5);
const ROW_2 = CLIENT_LOGOS.slice(5, 10);

function LogoCard({ logo }) {
  return (
    <div className={`${styles.slotCard} ${logo.dark ? styles.slotCardDark : ""}`}>
      <Image
        src={logo.src}
        alt={logo.name}
        fill
        unoptimized
        className={styles.logoImg}
        style={{ objectFit: "contain" }}
        sizes="(max-width: 768px) 140px, 220px"
      />
    </div>
  );
}

export function LogoCloud() {
  return (
    <section
      className={styles.sectionWrapper}
      aria-label="Companies trusted by Revloom"
    >
      <div className={styles.backgroundGrid} />
      <div className={styles.ambientAura} />

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.headerArea}>
          <div className={styles.pillBadge}>
            <span className={styles.pulseDot} />
            <span>Trusted By Modern Leaders</span>
          </div>
          <h2 className={styles.heading}>
            Powering Authority For Next-Gen Tech Teams
          </h2>
          <p className={styles.subHeading}>
            From stealth seed to hyper-growth SaaS — our content engines
            position founders at the forefront of their industry.
          </p>
        </div>

        {/* Desktop 5×2 grid */}
        <div className={styles.desktopLogoGrid}>
          {CLIENT_LOGOS.map((logo, index) => {
            const col = index % 5;
            const row = Math.floor(index / 5);
            return (
              <motion.div
                key={logo.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{
                  duration: 0.45,
                  delay: col * 0.05 + row * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <LogoCard logo={logo} />
              </motion.div>
            );
          })}
        </div>

        {/* Mobile dual-row marquee */}
        <div className={styles.mobileMarqueeContainer} aria-hidden="true">
          <div className={styles.marqueeRow}>
            <div className={styles.marqueeTrack}>
              {[...ROW_1, ...ROW_1, ...ROW_1].map((logo, idx) => (
                <div key={`m1-${logo.id}-${idx}`} className={styles.marqueeItem}>
                  <LogoCard logo={logo} />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.marqueeRow}>
            <div className={styles.marqueeTrackReverse}>
              {[...ROW_2, ...ROW_2, ...ROW_2].map((logo, idx) => (
                <div key={`m2-${logo.id}-${idx}`} className={styles.marqueeItem}>
                  <LogoCard logo={logo} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
