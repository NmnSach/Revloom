"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const aspectRatios = {
  "3/4": "3 / 4",
  "1/1": "1 / 1",
  "4/3": "4 / 3",
  "3/2": "3 / 2",
};

function wrapIndex(index, length) {
  return ((index % length) + length) % length;
}

function shortestOffset(index, rotation, length) {
  let offset = index - rotation;
  while (offset > length / 2) offset -= length;
  while (offset < -length / 2) offset += length;
  return offset;
}

export function WheelCarousel({
  items = [],
  mode = "custom",
  photoSide = "left",
  photoWidth = 0, // Default to 0 for text-only mode
  photoAspect = "4/3",
  contentWidth = 1100,
  gap = 40,
  photoRadius = 18,
  crossfadeDuration = 0.4,
  radius = 380,
  spacing = 16,
  visibleItems = 7,
  apexInset = 35,
  textColor = "rgba(26, 22, 37, 0.35)",
  selectedColor = "#6C2BD9",
  showMarker = true,
  markerColor = "#C6FF3D",
  markerSize = 14,
  markerGap = 22,
  background = "#FFFFFF",
  panelColor = "#F1EEF7",
  scrollSpeed = 0.008,
  dragSpeed = 0.02,
  snap = true,
  momentum = true,
  interactive = true,
  appear = true,
  edgeFade = true,
  edgeFadeSize = 25,
  initialIndex = 0,
  activeIndex,
  onActiveChange,
  className = "",
  photoClassName = "",
  itemClassName = "",
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const instanceId = useId();
  const carouselItems = useMemo(
    () => (items.length ? items : [{ label: "Service" }]),
    [items]
  );
  const itemCount = carouselItems.length;
  const startingIndex = wrapIndex(activeIndex ?? initialIndex, itemCount);
  const [rotation, setRotation] = useState(startingIndex);
  const [selectedIndex, setSelectedIndex] = useState(startingIndex);
  const [isDragging, setIsDragging] = useState(false);
  const stageRef = useRef(null);
  const rotationRef = useRef(startingIndex);
  const selectedRef = useRef(startingIndex);
  const appliedActiveIndexRef = useRef(null);
  const velocityRef = useRef(0);
  const draggingRef = useRef(false);
  const dragOriginRef = useRef({ y: 0, rotation: startingIndex });
  const previousDragRotationRef = useRef(startingIndex);
  const frameRef = useRef(null);

  useEffect(() => {
    const normalizedIndex = wrapIndex(selectedRef.current, itemCount);
    if (normalizedIndex === selectedRef.current) return;
    selectedRef.current = normalizedIndex;
    rotationRef.current = normalizedIndex;
    setSelectedIndex(normalizedIndex);
    setRotation(normalizedIndex);
  }, [itemCount]);

  const palette = useMemo(() => {
    if (mode === "dark") {
      return {
        background: "#000000",
        text: "rgba(255, 255, 255, 0.35)",
        selected: "#FFFFFF",
        marker: "#C6FF3D",
        panel: "#141414",
      };
    }
    if (mode === "light") {
      return {
        background: "#FFFFFF",
        text: "rgba(26, 22, 37, 0.35)",
        selected: "#6C2BD9",
        marker: "#C6FF3D",
        panel: "#F1EEF7",
      };
    }
    return {
      background,
      text: textColor,
      selected: selectedColor,
      marker: markerColor,
      panel: panelColor ?? background,
    };
  }, [background, markerColor, panelColor, mode, selectedColor, textColor]);

  const commitRotation = useCallback(
    (nextRotation) => {
      rotationRef.current = nextRotation;
      setRotation(nextRotation);
      const nextIndex = wrapIndex(Math.round(nextRotation), itemCount);
      if (nextIndex !== selectedRef.current) {
        selectedRef.current = nextIndex;
        setSelectedIndex(nextIndex);
        onActiveChange?.(carouselItems[nextIndex], nextIndex);
      }
    },
    [carouselItems, itemCount, onActiveChange]
  );

  const commitRotationRef = useRef(commitRotation);

  useEffect(() => {
    commitRotationRef.current = commitRotation;
  }, [commitRotation]);

  const runAnimation = useCallback(() => {
    if (frameRef.current !== null) return;

    const tick = () => {
      let keepAnimating = false;

      if (!draggingRef.current && Math.abs(velocityRef.current) > 0.0008) {
        commitRotation(rotationRef.current + velocityRef.current);
        velocityRef.current *=
          momentum && !reduceMotion ? (snap ? 0.88 : 0.94) : 0.8;
        keepAnimating = true;
      } else if (!draggingRef.current && snap) {
        velocityRef.current = 0;
        const target = Math.round(rotationRef.current);
        const delta = target - rotationRef.current;
        if (Math.abs(delta) > 0.001 && !reduceMotion) {
          commitRotation(rotationRef.current + delta * 0.28);
          keepAnimating = true;
        } else {
          commitRotation(target);
        }
      } else if (!draggingRef.current) {
        velocityRef.current = 0;
      }

      if (keepAnimating) frameRef.current = requestAnimationFrame(tick);
      else frameRef.current = null;
    };

    frameRef.current = requestAnimationFrame(tick);
  }, [commitRotation, momentum, reduceMotion, snap]);

  useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    },
    []
  );

  useEffect(() => {
    if (!interactive) return;
    const stage = stageRef.current;
    if (!stage) return;

    const handleWheel = (event) => {
      if (event.ctrlKey || event.metaKey) return;
      event.preventDefault();
      const delta = event.deltaY * scrollSpeed;
      commitRotation(rotationRef.current + delta);
      velocityRef.current = delta * 0.2;
      runAnimation();
    };

    stage.addEventListener("wheel", handleWheel, { passive: false });
    return () => stage.removeEventListener("wheel", handleWheel);
  }, [commitRotation, interactive, runAnimation, scrollSpeed]);

  useEffect(() => {
    if (activeIndex === undefined) return;
    const controlledIndex = wrapIndex(activeIndex, itemCount);
    if (appliedActiveIndexRef.current === controlledIndex) return;
    appliedActiveIndexRef.current = controlledIndex;
    const currentIndex = wrapIndex(Math.round(rotationRef.current), itemCount);
    let delta = controlledIndex - currentIndex;
    if (delta > itemCount / 2) delta -= itemCount;
    if (delta < -itemCount / 2) delta += itemCount;
    selectedRef.current = controlledIndex;
    setSelectedIndex(controlledIndex);
    commitRotationRef.current(rotationRef.current + delta);
    runAnimation();
  }, [activeIndex, itemCount, runAnimation]);

  const moveBy = (amount) => {
    velocityRef.current = 0;
    commitRotation(rotationRef.current + amount);
    runAnimation();
  };

  const handlePointerDown = (event) => {
    if (!interactive) return;
    if (!event.isPrimary || event.button !== 0) return;
    draggingRef.current = true;
    setIsDragging(true);
    velocityRef.current = 0;
    dragOriginRef.current = { y: event.clientY, rotation: rotationRef.current };
    previousDragRotationRef.current = rotationRef.current;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!interactive || !draggingRef.current) return;
    const distance = event.clientY - dragOriginRef.current.y;
    const nextRotation = dragOriginRef.current.rotation - distance * dragSpeed;
    velocityRef.current = nextRotation - previousDragRotationRef.current;
    previousDragRotationRef.current = nextRotation;
    commitRotation(nextRotation);
  };

  const handlePointerEnd = (event) => {
    if (!interactive || !draggingRef.current) return;
    draggingRef.current = false;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    runAnimation();
  };

  const handleKeyDown = (event) => {
    if (!interactive) return;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      moveBy(1);
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      moveBy(-1);
    }
  };

  const safeSelectedIndex = wrapIndex(selectedIndex, itemCount);
  const selectedItem = carouselItems[safeSelectedIndex] || carouselItems[0];
  const mask = edgeFade
    ? `linear-gradient(to bottom, transparent 0%, black ${edgeFadeSize}%, black ${100 - edgeFadeSize}%, transparent 100%)`
    : undefined;

  const hasPhoto = photoWidth > 0 && selectedItem?.image;

  return (
    <motion.div
      initial={appear && !reduceMotion ? { opacity: 0, y: 16 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex h-full w-full items-center justify-center overflow-hidden select-none",
        className
      )}
      style={{ backgroundColor: palette.background }}
    >
      <div
        ref={stageRef}
        role="listbox"
        aria-label="Wheel carousel"
        tabIndex={interactive ? 0 : -1}
        className={cn(
          "flex h-full w-full touch-none items-stretch overflow-hidden outline-none",
          photoSide === "right" && "flex-row-reverse",
          interactive && (isDragging ? "cursor-grabbing" : "cursor-grab")
        )}
        style={{ maxWidth: contentWidth, gap: hasPhoto ? gap : 0 }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onKeyDown={handleKeyDown}
      >
        {/* Photo Column (Optional, hidden when photoWidth is 0) */}
        {hasPhoto && (
          <div
            className="flex h-full shrink-0 items-center justify-center"
            style={{
              width: `${photoWidth}%`,
              backgroundColor: palette.background,
            }}
          >
            <div
              className={cn(
                "relative w-full max-h-full overflow-hidden shadow-xl",
                photoClassName
              )}
              style={{
                aspectRatio: aspectRatios[photoAspect] || "4 / 3",
                borderRadius: photoRadius,
                backgroundColor: palette.panel,
                border: "1px solid rgba(108, 43, 217, 0.12)",
              }}
            >
              <AnimatePresence initial={false} mode="sync">
                <motion.img
                  key={`${safeSelectedIndex}-${selectedItem.image}`}
                  src={selectedItem.image}
                  alt={selectedItem.imageAlt || selectedItem.label}
                  initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : crossfadeDuration }}
                  className="absolute inset-0 h-full w-full object-cover"
                  draggable={false}
                />
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Labels Wheel Container */}
        <div
          className="relative h-full min-w-0 flex-1 overflow-hidden flex items-center"
          style={{ maskImage: mask, WebkitMaskImage: mask }}
        >
          {showMarker && (
            <span
              aria-hidden="true"
              className="absolute top-1/2 z-10 -translate-y-1/2 rounded-full"
              style={{
                left: `calc(${apexInset}% - ${markerGap}px)`,
                width: markerSize,
                height: markerSize,
                marginLeft: -markerSize,
                backgroundColor: palette.marker,
                boxShadow: `0 0 14px ${palette.marker}`,
              }}
            />
          )}

          {carouselItems.map((item, index) => {
            const offset = shortestOffset(index, rotation, itemCount);
            if (Math.abs(offset) > visibleItems + 1) return null;

            const angle = offset * spacing;
            const radians = (angle * Math.PI) / 180;
            const x = -radius * (1 - Math.cos(radians));
            const y = radius * Math.sin(radians);
            const distance = Math.min(Math.abs(offset) / visibleItems, 1);
            const opacity = Math.cos((distance * Math.PI) / 2);
            const scale = 1 - Math.min(Math.abs(offset) * 0.05, 0.35);
            const selected = Math.abs(offset) < 0.5;

            return (
              <div
                id={`${instanceId}-item-${index}`}
                key={`${item.label}-${index}`}
                role="option"
                aria-selected={selected}
                className={cn(
                  "pointer-events-none absolute top-1/2 origin-left whitespace-nowrap",
                  itemClassName
                )}
                style={{
                  left: `${apexInset}%`,
                  color: selected ? palette.selected : palette.text,
                  opacity,
                  transform: `translate(${x}px, ${y}px) translateY(-50%) rotate(${angle}deg) scale(${scale})`,
                  fontFamily: "var(--font-headline)",
                  fontWeight: selected ? 800 : 700,
                  fontSize: selected
                    ? "clamp(2rem, 4.5vw, 3.5rem)"
                    : "clamp(1.5rem, 3.2vw, 2.5rem)",
                  letterSpacing: "-0.03em",
                  transition: "color 0.2s ease, font-size 0.2s ease",
                }}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      </div>

      <span className="sr-only" aria-live="polite">
        {selectedItem.label}, item {safeSelectedIndex + 1} of {itemCount}
      </span>
    </motion.div>
  );
}
