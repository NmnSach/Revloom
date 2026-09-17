"use client";

import { useEffect, useRef, useState } from "react";

export const LINKEDIN_GROWTH_IMAGES = [
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop&q=80",
];

function drawRoundedRect(ctx, x, y, w, h, r) {
  const clampedR = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + clampedR, y);
  ctx.lineTo(x + w - clampedR, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + clampedR);
  ctx.lineTo(x + w, y + h - clampedR);
  ctx.quadraticCurveTo(x + w, y + h, x + w - clampedR, y + h);
  ctx.lineTo(x + clampedR, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - clampedR);
  ctx.lineTo(x, y + clampedR);
  ctx.quadraticCurveTo(x, y, x + clampedR, y);
  ctx.closePath();
}

export function InfiniteImageField({
  className = "",
  images = LINKEDIN_GROWTH_IMAGES,
  imageWidth = 260,
  imageHeight = 350,
  gap = 28,
  maxSpeed = 4,
  smoothing = 0.07,
  borderRadius = 18,
  style = {},
  ...rest
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const loadedImagesRef = useRef([]);
  const dimsRef = useRef({ w: 0, h: 0 });
  const camRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const isInsideRef = useRef(false);
  const [loadTrigger, setLoadTrigger] = useState(0);

  // Pre-load images
  useEffect(() => {
    const imgs = images.map((src) => {
      const img = new Image();
      img.onload = () => {
        setLoadTrigger((prev) => prev + 1);
      };
      img.onerror = () => {
        console.warn("Failed to load image from:", src);
      };
      img.src = src;
      return img;
    });
    loadedImagesRef.current = imgs;
  }, [images]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let rafId = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      const w = rect.width || window.innerWidth;
      const h = rect.height || window.innerHeight;

      dimsRef.current = { w, h };
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    };

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    window.addEventListener("resize", resize);

    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        mouseRef.current = {
          x: Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)),
          y: Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height)),
        };
        isInsideRef.current = true;
      }
    };

    const onLeave = () => {
      isInsideRef.current = false;
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    const draw = () => {
      const currentCanvas = canvasRef.current;
      if (!currentCanvas) return;
      const ctx = currentCanvas.getContext("2d");
      if (!ctx) return;

      const { w: W, h: H } = dimsRef.current;
      if (W === 0 || H === 0) {
        rafId = requestAnimationFrame(draw);
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cellW = imageWidth + gap;
      const cellH = imageHeight + gap;
      const imgs = loadedImagesRef.current;
      const numImages = imgs.length;

      // Physics — cursor offset from center drives velocity
      const tx = isInsideRef.current
        ? (mouseRef.current.x - 0.5) * 2 * maxSpeed
        : 0;
      const ty = isInsideRef.current
        ? (mouseRef.current.y - 0.5) * 2 * maxSpeed
        : 0;

      velRef.current.x += (tx - velRef.current.x) * smoothing;
      velRef.current.y += (ty - velRef.current.y) * smoothing;

      camRef.current.x += velRef.current.x;
      camRef.current.y += velRef.current.y;

      const camX = camRef.current.x;
      const camY = camRef.current.y;

      ctx.clearRect(0, 0, W, H);

      if (numImages > 0) {
        // Compute visible cell range
        const colMin = Math.floor((camX - W / 2) / cellW) - 1;
        const colMax = Math.ceil((camX + W / 2) / cellW) + 1;
        const rowMin = Math.floor((camY - H / 2) / cellH) - 1;
        const rowMax = Math.ceil((camY + H / 2) / cellH) + 1;

        for (let row = rowMin; row <= rowMax; row++) {
          for (let col = colMin; col <= colMax; col++) {
            const sx = col * cellW - camX + W / 2 - imageWidth / 2;
            const sy = row * cellH - camY + H / 2 - imageHeight / 2;

            const imgIdx =
              Math.abs(col * 7 + row * 13 + ((col * row * 3) | 0)) % numImages;
            const img = imgs[imgIdx];

            // Card shadow
            ctx.save();
            ctx.shadowColor = "rgba(108, 43, 217, 0.12)";
            ctx.shadowBlur = 16;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 6;

            drawRoundedRect(ctx, sx, sy, imageWidth, imageHeight, borderRadius);
            ctx.fillStyle = "#EDE8F5";
            ctx.fill();
            ctx.restore();

            // Draw image or placeholder
            ctx.save();
            drawRoundedRect(ctx, sx, sy, imageWidth, imageHeight, borderRadius);
            ctx.clip();

            if (img && img.complete && img.naturalWidth > 0) {
              ctx.drawImage(img, sx, sy, imageWidth, imageHeight);
            } else {
              // Placeholder fill with soft violet tint
              ctx.fillStyle = "#E4DFED";
              ctx.fillRect(sx, sy, imageWidth, imageHeight);
            }
            ctx.restore();

            // Border overlay
            ctx.save();
            drawRoundedRect(ctx, sx, sy, imageWidth, imageHeight, borderRadius);
            ctx.strokeStyle = "rgba(108, 43, 217, 0.18)";
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [imageWidth, imageHeight, gap, maxSpeed, smoothing, borderRadius, loadTrigger]);

  return (
    <div
      ref={containerRef}
      {...rest}
      className={className}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "auto",
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "transparent",
        }}
      />
    </div>
  );
}
