"use client";

import {
  useState,
  useRef,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import styles from "./orbit-card-stack.module.css";
import { cn } from "@/lib/utils";

// Vector Client Company Logos
export function CompanyLogo({ id, size = 18 }) {
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

function inRange(index, length) {
  return Math.min(Math.max(0, index), Math.max(0, length - 1));
}

function initialsFor(item) {
  return (
    item.initials ??
    item.name
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
  );
}

function Portrait({ item }) {
  const initials = initialsFor(item);
  const imageSrc = item.image || item.avatarImg;

  return (
    <div className={styles.portraitWrap}>
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={item.name || item.founder}
          fill
          sizes="(max-width: 640px) 280px, 340px"
          className={styles.portraitImg}
          priority
        />
      ) : (
        <div className={styles.fallbackPortrait}>
          <div className={styles.fallbackAvatarCircle}>{initials}</div>
        </div>
      )}

      {/* Top Left Company Badge */}
      {item.company && (
        <div className={styles.companyPill}>
          {item.logoId && (
            <div className={styles.companyLogoWrap}>
              <CompanyLogo id={item.logoId} size={15} />
            </div>
          )}
          <span>{item.company}</span>
        </div>
      )}

      {/* Top Right Action Arrow */}
      <div className={styles.arrowBtn} aria-hidden="true">
        <ArrowUpRight className={styles.arrowIcon} />
      </div>

      {/* Bottom Right Initials Tag */}
      <span className={styles.initialsTag}>{initials}</span>
    </div>
  );
}

export function OrbitCardStack({
  items = [],
  className,
  cardClassName,
  defaultActiveIndex = 2,
  spread = 156,
  lift = 38,
  onActiveChange,
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const cards = useMemo(() => (items.length ? items : []), [items]);
  const restingIndex = inRange(defaultActiveIndex, cards.length);
  const [activeIndex, setActiveIndex] = useState(restingIndex);
  const [open, setOpen] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(1200);
  const stageRef = useRef(null);
  const midpoint = (cards.length - 1) / 2;

  // Responsive spread tracking
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const responsiveSpread = useMemo(() => {
    if (viewportWidth < 480) return 36;
    if (viewportWidth < 680) return 50;
    if (viewportWidth < 1024) return 96;
    return spread;
  }, [viewportWidth, spread]);

  const layouts = useMemo(
    () =>
      cards.map((_, index) => {
        const orbit = index - midpoint;
        const stack = index - restingIndex;
        return {
          open: {
            x: orbit * responsiveSpread,
            y: Math.abs(orbit) * 28 + Math.max(0, Math.abs(orbit) - 1) * 8,
            rotation: orbit * 8.2,
          },
          closed: {
            x: stack * 10,
            y: Math.abs(stack) * 5,
            rotation: stack * 2.8,
          },
        };
      }),
    [cards, midpoint, restingIndex, responsiveSpread]
  );

  const activate = useCallback(
    (index) => {
      const next = inRange(index, cards.length);
      setOpen(true);
      setActiveIndex(next);
      onActiveChange?.(cards[next], next);
    },
    [cards, onActiveChange]
  );

  const close = useCallback(() => {
    setOpen(false);
    setActiveIndex(restingIndex);
    if (cards[restingIndex]) {
      onActiveChange?.(cards[restingIndex], restingIndex);
    }
  }, [cards, restingIndex, onActiveChange]);

  const leaveFocus = useCallback(
    (event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        close();
      }
    },
    [close]
  );

  const handlePrev = (e) => {
    e?.stopPropagation();
    const prev = activeIndex > 0 ? activeIndex - 1 : cards.length - 1;
    activate(prev);
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    const next = activeIndex < cards.length - 1 ? activeIndex + 1 : 0;
    activate(next);
  };

  return (
    <div className={cn(styles.stageContainer, className)}>
      <div
        ref={stageRef}
        className={styles.stage}
        onMouseLeave={close}
        onBlur={leaveFocus}
        role="list"
        aria-label="Testimonials card stack"
      >
        {cards.map((item, index) => {
          const position = open ? layouts[index].open : layouts[index].closed;
          const active = index === activeIndex;

          const style = {
            zIndex: active ? 80 : 50 - Math.abs(index - activeIndex),
            transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${
              position.y - (open && active ? lift : 0)
            }px)) rotate(${position.rotation}deg) scale(${open ? 0.99 : 0.97})`,
            transitionDuration: reduceMotion ? "0ms" : "420ms",
          };

          return (
            <article
              key={`${item.name || item.founder}-${index}`}
              role="listitem"
              tabIndex={0}
              aria-current={active ? "true" : undefined}
              className={cn(
                styles.card,
                active && styles.cardActive,
                cardClassName
              )}
              style={style}
              onMouseEnter={() => activate(index)}
              onFocus={() => activate(index)}
              onClick={() => activate(index)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                  event.preventDefault();
                  const next = (index + 1) % cards.length;
                  activate(next);
                  stageRef.current
                    ?.querySelectorAll("[role=listitem]")
                    [next]?.focus();
                }
                if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                  event.preventDefault();
                  const next = (index - 1 + cards.length) % cards.length;
                  activate(next);
                  stageRef.current
                    ?.querySelectorAll("[role=listitem]")
                    [next]?.focus();
                }
                if (event.key === "Escape") {
                  event.currentTarget.blur();
                  close();
                }
              }}
            >
              {/* Top Photo & Identity Badges */}
              <Portrait item={item} />

              {/* Text Meta Content */}
              <div className={styles.cardContent}>
                <p className={styles.roleText}>
                  {item.role} {item.stage ? `• ${item.stage}` : ""}
                </p>

                <h3 className={styles.nameText}>
                  {item.name || item.founder}
                </h3>

                <p className={styles.quoteText}>
                  &ldquo;{item.quote || item.description}&rdquo;
                </p>

                {/* Bottom Verified Stat Divider */}
                <div className={styles.statDivider}>
                  <div className={styles.statBadge}>
                    <span className={styles.statDot} />
                    <span>{item.stat || item.coreMetric || "VERIFIED RESULT"}</span>
                  </div>

                  <span className={styles.stageMeta}>
                    {item.metricLabel || item.hoverImpact || "Case Study"}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Subtle Bottom Controls (especially useful for touch/mobile devices) */}
      <div className={styles.controlsBar}>
        <button
          type="button"
          onClick={handlePrev}
          className={styles.deckNavBtn}
          aria-label="Previous Founder Testimonial"
        >
          <ChevronLeft size={18} />
        </button>

        <div className={styles.dotIndicators}>
          {cards.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => activate(idx)}
              className={cn(
                styles.dotBtn,
                activeIndex === idx && styles.dotBtnActive
              )}
              aria-label={`View testimonial by ${item.name || item.founder}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          className={styles.deckNavBtn}
          aria-label="Next Founder Testimonial"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default OrbitCardStack;
