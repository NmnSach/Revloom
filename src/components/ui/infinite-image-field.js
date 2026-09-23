"use client";

import { useEffect, useRef, useState } from "react";

export const LINKEDIN_GROWTH_IMAGES = [
  "/field-images/linkedin-growth-overview.jpg",
  "/field-images/linkedin-pipeline-funnel.jpg",
  "/field-images/linkedin-ssi-score.jpg",
  "/field-images/linkedin-pipeline-roi.jpg",
  "/field-images/linkedin-profile-views.jpg",
  "/field-images/linkedin-content-matrix.jpg",
  "/field-images/linkedin-3d-badge.jpg",
  "/field-images/analytics-screen-users.jpg",
  "/field-images/marketing-conversion-metrics.jpg",
  "/field-images/market-candlestick-chart.jpg",
  "/field-images/crypto-stock-growth-desk.jpg",
  "/field-images/saas-analytics-dashboard.jpg",
  "/field-images/traffic-funnel-breakdown.jpg",
  "/field-images/candlestick-night-city.jpg",
  "/field-images/handdrawn-growth-graph.jpg",
  "/field-images/campaign-performance-tablet.jpg",
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

            // Card shadow & base
            ctx.save();
            ctx.shadowColor = "rgba(0, 0, 0, 0.65)";
            ctx.shadowBlur = 22;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 8;

            drawRoundedRect(ctx, sx, sy, imageWidth, imageHeight, borderRadius);
            ctx.fillStyle = "#13101C";
            ctx.fill();
            ctx.restore();

            // Draw image or placeholder
            ctx.save();
            drawRoundedRect(ctx, sx, sy, imageWidth, imageHeight, borderRadius);
            ctx.clip();

            if (img && img.complete && img.naturalWidth > 0) {
              ctx.drawImage(img, sx, sy, imageWidth, imageHeight);
            } else {
              // Placeholder fill with dark violet tone
              ctx.fillStyle = "#1A1627";
              ctx.fillRect(sx, sy, imageWidth, imageHeight);
            }
            ctx.restore();

            // Sleek glowing border overlay
            ctx.save();
            drawRoundedRect(ctx, sx, sy, imageWidth, imageHeight, borderRadius);
            ctx.strokeStyle = "rgba(108, 43, 217, 0.35)";
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
