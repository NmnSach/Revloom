"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
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

export const WheelCarousel = forwardRef(function WheelCarousel(
  {
    items = [],
    mode = "custom",
    photoSide = "left",
    photoWidth = 32,
    photoAspect = "3/4",
    contentWidth = 1080,
    gap = 48,
    photoRadius = 18,
    crossfadeDuration = 0.45,
    radius = 340,
    spacing = 15,
    visibleItems = 7,
    apexInset = 16,
    textColor = "rgba(26, 22, 37, 0.35)",
    selectedColor = "#6C2BD9",
    showMarker = true,
    markerColor = "#C6FF3D",
    markerSize = 12,
    markerGap = 20,
    background = "#FFFFFF",
    panelColor = "#F1EEF7",
    scrollSpeed = 0.008,
    dragSpeed = 0.02,
    snap = true,
    momentum = true,
    interactive = true,
    appear = true,
    edgeFade = true,
    edgeFadeSize = 28,
    initialIndex = 0,
    activeIndex,
    onActiveChange,
    autoSpinTo,
    spinDuration = 3400,
    onSpinComplete,
    className = "",
    photoClassName = "",
    itemClassName = "",
  },
  ref
) {
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
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isSmallMobile = windowWidth < 420;

  // Responsive spiral geometry
  const effectiveRadius = useMemo(() => {
    if (!isMobile) return radius;
    return Math.min(220, Math.max(175, Math.round(windowWidth * 0.52)));
  }, [isMobile, radius, windowWidth]);

  const effectiveSpacing = useMemo(() => {
    if (!isMobile) return spacing;
    return isSmallMobile ? 12.5 : 13.5;
  }, [isMobile, isSmallMobile, spacing]);

  // Compute the max horizontal excursion of the spiral arc to ensure the ends NEVER get cut off on the left
  const effectiveApexInset = useMemo(() => {
    if (!isMobile) return apexInset;
    const maxOffset = Math.min(Math.floor(visibleItems / 2), 3);
    const maxAngleRad = ((maxOffset * effectiveSpacing) * Math.PI) / 180;
    const maxCurveLeft = effectiveRadius * (1 - Math.cos(maxAngleRad));
    const minPadding = isSmallMobile ? 16 : 22;
    return Math.round(maxCurveLeft + minPadding);
  }, [apexInset, effectiveRadius, effectiveSpacing, isMobile, isSmallMobile, visibleItems]);

  const effectiveEdgeFadeSize = isMobile ? 16 : edgeFadeSize;
  const stageRef = useRef(null);
  const rotationRef = useRef(startingIndex);
  const selectedRef = useRef(startingIndex);
  const appliedActiveIndexRef = useRef(null);
  const velocityRef = useRef(0);
  const draggingRef = useRef(false);
  const dragOriginRef = useRef({ y: 0, rotation: startingIndex });
  const previousDragRotationRef = useRef(startingIndex);
  const frameRef = useRef(null);
  const isSpinningRef = useRef(false);

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

  // Inertial momentum and snapping loop (Componentry physics)
  const runAnimation = useCallback(() => {
    if (frameRef.current !== null || isSpinningRef.current) return;

    const tick = () => {
      let keepAnimating = false;

      if (!draggingRef.current && Math.abs(velocityRef.current) > 0.0008) {
        commitRotation(rotationRef.current + velocityRef.current);
        velocityRef.current *=
          momentum && !reduceMotion ? (snap ? 0.9 : 0.94) : 0.8;
        keepAnimating = true;
      } else if (!draggingRef.current && snap) {
        velocityRef.current = 0;
        const target = Math.round(rotationRef.current);
        const delta = target - rotationRef.current;
        if (Math.abs(delta) > 0.001 && !reduceMotion) {
          commitRotation(rotationRef.current + delta * 0.22);
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

  // Silky-smooth programmatic spin animation (for cinematic auto-scrolling)
  const spinTo = useCallback(
    (targetIndex, duration = 3400, onDone) => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      isSpinningRef.current = true;
      const startRotation = rotationRef.current;
      const distance = targetIndex - startRotation;
      const startTime = performance.now();

      const animate = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Smooth cubic ease-in-out: gradual start, fast continuous glide, gentle deceleration
        const eased =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        const currentRot = startRotation + distance * eased;
        commitRotation(currentRot);

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        } else {
          commitRotation(targetIndex);
          isSpinningRef.current = false;
          frameRef.current = null;
          onDone?.();
        }
      };

      frameRef.current = requestAnimationFrame(animate);
    },
    [commitRotation]
  );

  // Expose imperative handle for external control
  useImperativeHandle(
    ref,
    () => ({
      spinTo,
      commitRotation,
      getRotation: () => rotationRef.current,
      getSelectedIndex: () => selectedRef.current,
    }),
    [spinTo, commitRotation]
  );

  useEffect(() => {
    if (autoSpinTo !== undefined) {
      spinTo(autoSpinTo, spinDuration, onSpinComplete);
    }
  }, [autoSpinTo, spinDuration, onSpinComplete, spinTo]);

  useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    },
    []
  );

  // Interactive mouse wheel handler
  useEffect(() => {
    if (!interactive) return;
    const stage = stageRef.current;
    if (!stage) return;

    const handleWheel = (event) => {
      if (event.ctrlKey || event.metaKey) return;
      event.preventDefault();
      isSpinningRef.current = false;
      const delta = event.deltaY * scrollSpeed;
      commitRotation(rotationRef.current + delta);
      velocityRef.current = delta * 0.2;
      runAnimation();
    };

    stage.addEventListener("wheel", handleWheel, { passive: false });
    return () => stage.removeEventListener("wheel", handleWheel);
  }, [commitRotation, interactive, runAnimation, scrollSpeed]);

  // Controlled activeIndex update
  useEffect(() => {
    if (activeIndex === undefined || isSpinningRef.current) return;
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

  const handlePointerDown = (event) => {
    if (!interactive) return;
    if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return;
    isSpinningRef.current = false;
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
    isSpinningRef.current = false;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      velocityRef.current = 0;
      commitRotation(rotationRef.current + 1);
      runAnimation();
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      velocityRef.current = 0;
      commitRotation(rotationRef.current - 1);
      runAnimation();
    }
  };

  const safeSelectedIndex = wrapIndex(selectedIndex, itemCount);
  const selectedItem = carouselItems[safeSelectedIndex] || carouselItems[0];
  const mask = edgeFade
    ? `linear-gradient(to bottom, transparent 0%, black ${effectiveEdgeFadeSize}%, black ${100 - effectiveEdgeFadeSize}%, transparent 100%)`
    : undefined;

  const hasDesktopPhoto = !isMobile && photoWidth > 0 && selectedItem?.image;
  const hasMobileBgPhoto = isMobile && photoWidth > 0 && selectedItem?.image;

  return (
    <motion.div
      initial={appear && !reduceMotion ? { opacity: 0, y: 16 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
      suppressHydrationWarning
      className={cn(
        "flex h-full w-full items-center justify-center overflow-hidden select-none",
        className
      )}
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        userSelect: "none",
        backgroundColor: palette.background,
      }}
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
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          maxWidth: contentWidth,
          gap: hasDesktopPhoto ? gap : 0,
          touchAction: "none",
          alignItems: "stretch",
          overflow: "hidden",
          outline: "none",
          flexDirection: photoSide === "right" ? "row-reverse" : "row",
          cursor: interactive ? (isDragging ? "grabbing" : "grab") : "default",
          padding: isMobile ? "0 0.85rem" : "0 2rem",
          position: "relative",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onKeyDown={handleKeyDown}
      >
        {/* On mobile: Ambient backdrop card that crossfades with the services */}
        {hasMobileBgPhoto && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            <div
              style={{
                position: "relative",
                width: "70vw",
                height: "70dvh",
                borderRadius: 0,
                overflow: "hidden",
                opacity: 0.16,
                border: "1px solid rgba(108, 43, 217, 0.12)",
                boxShadow: "0 20px 48px rgba(108, 43, 217, 0.18)",
              }}
            >
              <AnimatePresence initial={false} mode="sync">
                <motion.img
                  key={`mob-bg-${safeSelectedIndex}-${selectedItem.image}`}
                  src={selectedItem.image}
                  alt=""
                  initial={reduceMotion ? false : { opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{
                    duration: reduceMotion ? 0 : crossfadeDuration,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 0,
                  }}
                  draggable={false}
                />
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Desktop Photo Column on the left (Componentry styled) */}
        {hasDesktopPhoto && (
          <div
            className="flex h-full shrink-0 items-center justify-center"
            style={{
              display: "flex",
              height: "100%",
              flexShrink: 0,
              alignItems: "center",
              justifyContent: "center",
              width: `${photoWidth}%`,
              backgroundColor: palette.background,
            }}
          >
            <div
              className={cn(
                "relative w-full max-h-[75vh] overflow-hidden",
                photoClassName
              )}
              style={{
                position: "relative",
                width: "100%",
                maxHeight: "75vh",
                overflow: "hidden",
                aspectRatio: aspectRatios[photoAspect] || "3 / 4",
                borderRadius: photoRadius,
                backgroundColor: palette.panel,
                border: "1px solid rgba(108, 43, 217, 0.14)",
                boxShadow:
                  "0 24px 48px -12px rgba(108, 43, 217, 0.2), 0 8px 24px -4px rgba(26, 22, 37, 0.08)",
              }}
            >
              <AnimatePresence initial={false} mode="sync">
                <motion.img
                  key={`${safeSelectedIndex}-${selectedItem.image}`}
                  src={selectedItem.image}
                  alt={selectedItem.imageAlt || selectedItem.label}
                  initial={reduceMotion ? false : { opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{
                    duration: reduceMotion ? 0 : crossfadeDuration,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  draggable={false}
                />
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Curved Labels Wheel Container */}
        <div
          className="relative h-full min-w-0 flex-1 overflow-hidden flex items-center"
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            minWidth: 0,
            flex: 1,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            maskImage: mask,
            WebkitMaskImage: mask,
            zIndex: 1,
          }}
        >
          {/* Active selection indicator (Electric Lime dot) */}
          {showMarker && (
            <span
              aria-hidden="true"
              className="absolute top-1/2 z-10 -translate-y-1/2 rounded-full"
              style={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                left: isMobile
                  ? `calc(${effectiveApexInset}px - ${isSmallMobile ? 14 : markerGap}px)`
                  : `calc(${apexInset}% - ${markerGap}px)`,
                width: isSmallMobile ? 9 : markerSize,
                height: isSmallMobile ? 9 : markerSize,
                marginLeft: isSmallMobile ? -9 : -markerSize,
                borderRadius: "50%",
                backgroundColor: palette.marker,
                boxShadow: `0 0 16px ${palette.marker}, 0 0 6px ${palette.marker}`,
                zIndex: 10,
                pointerEvents: "none",
              }}
            />
          )}

          {carouselItems.map((item, index) => {
            const offset = shortestOffset(index, rotation, itemCount);
            if (Math.abs(offset) > visibleItems + 1) return null;

            const angle = offset * effectiveSpacing;
            const radians = (angle * Math.PI) / 180;
            const x = -effectiveRadius * (1 - Math.cos(radians));
            const y = effectiveRadius * Math.sin(radians);
            const distance = Math.min(Math.abs(offset) / visibleItems, 1);
            const opacity = Math.cos((distance * Math.PI) / 2);
            const scale = 1 - Math.min(Math.abs(offset) * 0.04, 0.45);
            const selected = Math.abs(offset) < 0.5;

            const xFormatted = Math.round(x * 100) / 100;
            const yFormatted = Math.round(y * 100) / 100;
            const angleFormatted = Math.round(angle * 10) / 10;
            const scaleFormatted = Math.round(scale * 1000) / 1000;
            const opacityFormatted = Math.round(opacity * 1000) / 1000;

            const leftPos = isMobile
              ? `${effectiveApexInset}px`
              : `${apexInset}%`;

            return (
              <div
                id={`${instanceId}-item-${index}`}
                key={`${item.label}-${index}`}
                role="option"
                aria-selected={selected}
                suppressHydrationWarning
                className={cn(
                  "pointer-events-none absolute top-1/2 origin-left whitespace-nowrap",
                  itemClassName
                )}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: leftPos,
                  transformOrigin: "left center",
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                  color: selected ? palette.selected : palette.text,
                  opacity: opacityFormatted,
                  transform: `translate(${xFormatted}px, ${yFormatted}px) translateY(-50%) rotate(${angleFormatted}deg) scale(${scaleFormatted})`,
                  fontFamily: "var(--font-headline)",
                  fontWeight: selected ? 800 : 700,
                  fontSize: selected
                    ? isSmallMobile
                      ? "clamp(1.05rem, 4.3vw, 1.32rem)"
                      : isMobile
                      ? "clamp(1.15rem, 4.2vw, 1.5rem)"
                      : "clamp(1.75rem, 3.6vw, 2.75rem)"
                    : isSmallMobile
                    ? "clamp(0.82rem, 3.2vw, 0.98rem)"
                    : isMobile
                    ? "clamp(0.9rem, 3.0vw, 1.05rem)"
                    : "clamp(1.15rem, 2.2vw, 1.75rem)",
                  letterSpacing: isMobile ? "-0.035em" : "-0.025em",
                  maxWidth: isMobile ? `calc(100vw - ${effectiveApexInset + 28}px)` : undefined,
                }}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
});
