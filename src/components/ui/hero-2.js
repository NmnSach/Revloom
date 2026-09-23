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

const GLOBE_DOTS = [
  [244, 449, 0.08, 1.1, 0], [248, 449, 0.15, 1.2, 0], [256, 449, 0.21, 1.3, 0], [268, 449, 0.26, 1.4, 0], [283, 449, 0.3, 1.5, 0], [299, 449, 0.32, 1.6, 0], [317, 449, 0.32, 1.6, 0], [334, 449, 0.3, 1.5, 0], [349, 449, 0.27, 1.5, 0], [362, 449, 0.22, 1.4, 0], [371, 449, 0.16, 1.2, 0], [376, 449, 0.09, 1.1, 0], [236, 443, 0.21, 1.3, 0], [277, 443, 0.36, 1.7, 0], [295, 443, 0.53, 2.1, 2], [314, 443, 0.54, 2.1, 2], [333, 443, 0.53, 2.1, 2], [351, 443, 0.5, 2, 2], [379, 443, 0.25, 1.4, 0], [299, 434, 0.6, 2.3, 2], [320, 434, 0.6, 2.3, 2], [341, 434, 0.59, 2.2, 2], [360, 434, 0.55, 2.1, 2], [195, 425, 0.12, 1.2, 0], [224, 425, 0.36, 1.7, 0], [280, 425, 0.5, 2, 0], [302, 425, 0.67, 2.4, 2], [324, 425, 0.67, 2.4, 2], [346, 425, 0.65, 2.3, 2], [366, 425, 0.61, 2.3, 2], [400, 425, 0.35, 1.6, 0], [425, 425, 0.1, 1.1, 0], [184, 414, 0.2, 1.3, 0], [219, 414, 0.43, 1.8, 0], [278, 414, 0.71, 2.5, 2], [301, 414, 0.73, 2.5, 2], [323, 414, 0.73, 2.5, 2], [346, 414, 0.71, 2.5, 2], [367, 414, 0.68, 2.4, 2], [404, 414, 0.42, 1.8, 0], [437, 414, 0.18, 1.3, 0], [295, 402, 0.78, 2.6, 1], [317, 402, 0.78, 2.6, 1], [340, 402, 0.77, 2.6, 1], [362, 402, 0.75, 2.6, 2], [382, 402, 0.71, 2.5, 2], [417, 402, 0.59, 2.2, 2], [431, 402, 0.52, 2.1, 2], [442, 402, 0.44, 1.9, 2], [450, 402, 0.35, 1.7, 2], [454, 402, 0.26, 1.5, 2], [153, 389, 0.08, 1.1, 0], [156, 389, 0.18, 1.3, 0], [163, 389, 0.28, 1.5, 0], [174, 389, 0.37, 1.7, 0], [188, 389, 0.45, 1.8, 0], [204, 389, 0.52, 2, 0], [224, 389, 0.58, 2.1, 0], [246, 389, 0.63, 2.2, 0], [269, 389, 0.66, 2.3, 0], [293, 389, 0.83, 2.7, 1], [318, 389, 0.84, 2.7, 1], [342, 389, 0.82, 2.7, 1], [366, 389, 0.8, 2.7, 1], [388, 389, 0.75, 2.6, 2], [409, 389, 0.55, 2, 0], [427, 389, 0.63, 2.3, 2], [442, 389, 0.55, 2.1, 2], [454, 389, 0.46, 2, 2], [462, 389, 0.37, 1.8, 2], [466, 389, 0.27, 1.5, 2], [148, 375, 0.24, 1.4, 0], [180, 375, 0.49, 1.9, 0], [236, 375, 0.66, 2.3, 0], [280, 375, 0.87, 2.8, 1], [304, 375, 0.88, 2.8, 1], [327, 375, 0.88, 2.8, 1], [351, 375, 0.86, 2.8, 1], [373, 375, 0.83, 2.7, 1], [394, 375, 0.79, 2.7, 1], [431, 375, 0.53, 2, 0], [446, 375, 0.6, 2.3, 2], [459, 375, 0.52, 2.1, 2], [469, 375, 0.44, 1.9, 2], [475, 375, 0.34, 1.7, 2], [478, 375, 0.25, 1.5, 2], [133, 360, 0.15, 1.2, 0], [158, 360, 0.43, 1.8, 0], [210, 360, 0.65, 2.3, 0], [279, 360, 0.91, 2.9, 1], [303, 360, 0.92, 2.9, 1], [328, 360, 0.92, 2.9, 1], [353, 360, 0.9, 2.9, 1], [377, 360, 0.87, 2.8, 1], [399, 360, 0.83, 2.7, 1], [420, 360, 0.62, 2.2, 0], [455, 360, 0.63, 2.3, 2], [468, 360, 0.54, 2.1, 2], [478, 360, 0.45, 1.9, 2], [485, 360, 0.35, 1.7, 2], [489, 360, 0.25, 1.5, 2], [138, 344, 0.36, 1.7, 0], [184, 344, 0.61, 2.2, 0], [252, 344, 0.77, 2.5, 0], [277, 344, 0.95, 3, 1], [303, 344, 0.96, 3, 1], [329, 344, 0.96, 3, 1], [355, 344, 0.94, 3, 1], [380, 344, 0.91, 2.9, 1], [404, 344, 0.86, 2.8, 1], [462, 344, 0.65, 2.3, 2], [476, 344, 0.56, 2.2, 2], [487, 344, 0.46, 2, 2], [494, 344, 0.36, 1.7, 2], [498, 344, 0.25, 1.5, 2], [122, 327, 0.27, 1.5, 0], [160, 327, 0.56, 2.1, 0], [224, 327, 0.76, 2.5, 0], [276, 327, 0.98, 3, 1], [303, 327, 0.99, 3.1, 1], [330, 327, 0.99, 3.1, 1], [357, 327, 0.97, 3, 1], [383, 327, 0.93, 3, 1], [407, 327, 0.89, 2.9, 1], [450, 327, 0.6, 2.2, 0], [468, 327, 0.67, 2.4, 2], [482, 327, 0.57, 2.2, 2], [494, 327, 0.47, 2, 2], [501, 327, 0.37, 1.8, 2], [505, 327, 0.26, 1.5, 2], [111, 309, 0.16, 1.2, 0], [139, 309, 0.48, 1.9, 0], [197, 309, 0.72, 2.4, 0], [275, 309, 1, 3.1, 1], [303, 309, 1.01, 3.1, 1], [331, 309, 1.01, 3.1, 1], [358, 309, 0.99, 3.1, 1], [385, 309, 0.96, 3, 1], [410, 309, 0.91, 2.9, 1], [434, 309, 0.69, 2.4, 0], [473, 309, 0.68, 2.4, 2], [488, 309, 0.58, 2.2, 2], [499, 309, 0.48, 2, 2], [507, 309, 0.37, 1.8, 2], [511, 309, 0.26, 1.5, 2], [122, 292, 0.39, 1.7, 0], [172, 292, 0.67, 2.3, 0], [246, 292, 0.84, 2.7, 0], [274, 292, 1.02, 3.1, 1], [302, 292, 1.03, 3.2, 1], [331, 292, 1.03, 3.2, 1], [359, 292, 1.01, 3.1, 1], [387, 292, 0.97, 3, 1], [413, 292, 0.92, 2.9, 1], [476, 292, 0.69, 2.4, 2], [492, 292, 0.59, 2.2, 2], [503, 292, 0.49, 2, 2], [511, 292, 0.37, 1.8, 2], [515, 292, 0.26, 1.5, 2], [109, 274, 0.28, 1.5, 0], [150, 274, 0.59, 2.1, 0], [218, 274, 0.81, 2.6, 0], [273, 274, 1.03, 3.2, 1], [302, 274, 1.04, 3.2, 1], [331, 274, 1.04, 3.2, 1], [360, 274, 1.02, 3.1, 1], [388, 274, 0.98, 3.1, 1], [414, 274, 0.93, 3, 1], [460, 274, 0.64, 2.2, 0], [479, 274, 0.7, 2.5, 2], [494, 274, 0.6, 2.2, 2], [506, 274, 0.49, 2, 2], [514, 274, 0.38, 1.8, 2], [518, 274, 0.26, 1.5, 2], [102, 255, 0.17, 1.2, 0], [132, 255, 0.5, 2, 0], [192, 255, 0.75, 2.5, 0], [273, 255, 1.04, 3.2, 1], [302, 255, 1.05, 3.2, 1], [332, 255, 1.05, 3.2, 1], [360, 255, 1.02, 3.1, 1], [388, 255, 0.99, 3.1, 1], [415, 255, 0.94, 3, 1], [439, 255, 0.72, 2.4, 0], [480, 255, 0.7, 2.5, 2], [495, 255, 0.6, 2.2, 2], [507, 255, 0.49, 2, 2], [515, 255, 0.38, 1.8, 2], [519, 255, 0.26, 1.5, 2], [108, 237, 0.43, 1.9, 2], [118, 237, 0.54, 2.1, 2], [132, 237, 0.65, 2.3, 2], [149, 237, 0.74, 2.6, 2], [169, 237, 0.83, 2.7, 1], [192, 237, 0.9, 2.9, 1], [218, 237, 0.96, 3, 1], [245, 237, 1.01, 3.1, 1], [273, 237, 1.04, 3.2, 1], [302, 237, 1.05, 3.2, 1], [332, 237, 1.04, 3.2, 1], [414, 237, 0.79, 2.6, 0], [479, 237, 0.7, 2.5, 2], [495, 237, 0.6, 2.2, 2], [507, 237, 0.49, 2, 2], [515, 237, 0.38, 1.8, 2], [519, 237, 0.26, 1.5, 2], [110, 219, 0.43, 1.9, 2], [120, 219, 0.54, 2.1, 2], [134, 219, 0.64, 2.3, 2], [151, 219, 0.74, 2.5, 2], [171, 219, 0.82, 2.7, 1], [194, 219, 0.9, 2.9, 1], [219, 219, 0.95, 3, 1], [245, 219, 1, 3.1, 1], [274, 219, 1.03, 3.2, 1], [302, 219, 1.04, 3.2, 1], [331, 219, 1.04, 3.2, 1], [387, 219, 0.83, 2.7, 0], [459, 219, 0.64, 2.2, 0], [478, 219, 0.7, 2.4, 2], [493, 219, 0.6, 2.2, 2], [505, 219, 0.49, 2, 2], [513, 219, 0.38, 1.8, 2], [517, 219, 0.26, 1.5, 2], [108, 201, 0.16, 1.2, 0], [114, 201, 0.43, 1.9, 2], [123, 201, 0.53, 2.1, 2], [137, 201, 0.64, 2.3, 2], [153, 201, 0.73, 2.5, 2], [173, 201, 0.81, 2.7, 1], [196, 201, 0.88, 2.8, 1], [220, 201, 0.94, 3, 1], [247, 201, 0.99, 3.1, 1], [274, 201, 1.01, 3.1, 1], [302, 201, 1.03, 3.1, 1], [331, 201, 1.02, 3.1, 1], [359, 201, 0.85, 2.7, 0], [435, 201, 0.7, 2.4, 0], [475, 201, 0.69, 2.4, 2], [490, 201, 0.59, 2.2, 2], [502, 201, 0.48, 2, 2], [510, 201, 0.37, 1.8, 2], [514, 201, 0.26, 1.5, 2], [111, 183, 0.09, 1.1, 0], [115, 183, 0.22, 1.4, 0], [124, 183, 0.49, 2, 2], [137, 183, 0.6, 2.3, 2], [155, 183, 0.71, 2.5, 2], [176, 183, 0.8, 2.7, 1], [201, 183, 0.88, 2.8, 1], [229, 183, 0.94, 3, 1], [258, 183, 0.98, 3, 1], [289, 183, 1, 3.1, 1], [320, 183, 1, 3.1, 1], [351, 183, 0.84, 2.7, 0], [381, 183, 0.8, 2.6, 0], [409, 183, 0.75, 2.5, 0], [435, 183, 0.68, 2.3, 0], [458, 183, 0.74, 2.5, 2], [477, 183, 0.64, 2.3, 2], [492, 183, 0.53, 2.1, 2], [502, 183, 0.41, 1.8, 2], [508, 183, 0.29, 1.6, 2], [130, 166, 0.48, 2, 2], [143, 166, 0.59, 2.2, 2], [160, 166, 0.69, 2.4, 2], [181, 166, 0.78, 2.6, 1], [205, 166, 0.85, 2.8, 1], [231, 166, 0.91, 2.9, 1], [260, 166, 0.95, 3, 1], [290, 166, 0.97, 3, 1], [320, 166, 0.98, 3, 1], [453, 166, 0.72, 2.5, 2], [471, 166, 0.63, 2.3, 2], [486, 166, 0.52, 2.1, 2], [496, 166, 0.4, 1.8, 2], [501, 166, 0.28, 1.6, 2], [133, 150, 0.4, 1.8, 2], [144, 150, 0.53, 2.1, 2], [161, 150, 0.64, 2.3, 2], [182, 150, 0.74, 2.5, 2], [207, 150, 0.82, 2.7, 1], [235, 150, 0.88, 2.8, 1], [265, 150, 0.92, 2.9, 1], [297, 150, 0.94, 3, 1], [329, 150, 0.94, 3, 1], [391, 150, 0.72, 2.4, 0], [463, 150, 0.62, 2.3, 2], [478, 150, 0.51, 2, 2], [489, 150, 0.38, 1.8, 2], [494, 150, 0.25, 1.5, 2], [137, 134, 0.16, 1.2, 0], [145, 134, 0.44, 1.9, 2], [160, 134, 0.56, 2.2, 2], [180, 134, 0.67, 2.4, 2], [204, 134, 0.76, 2.6, 1], [233, 134, 0.84, 2.7, 1], [264, 134, 0.88, 2.8, 1], [297, 134, 0.91, 2.9, 1], [331, 134, 0.9, 2.9, 1], [364, 134, 0.72, 2.4, 0], [446, 134, 0.5, 1.9, 0], [464, 134, 0.53, 2.1, 2], [477, 134, 0.41, 1.8, 2], [484, 134, 0.28, 1.6, 2], [160, 119, 0.47, 2, 2], [177, 119, 0.59, 2.2, 2], [200, 119, 0.69, 2.4, 2], [228, 119, 0.78, 2.6, 1], [259, 119, 0.83, 2.7, 1], [293, 119, 0.86, 2.8, 1], [327, 119, 0.86, 2.8, 1], [460, 119, 0.47, 2, 2], [471, 119, 0.34, 1.7, 2], [158, 105, 0.07, 1, 0], [175, 105, 0.49, 2, 2], [195, 105, 0.6, 2.3, 2], [220, 105, 0.7, 2.5, 2], [250, 105, 0.77, 2.6, 1], [283, 105, 0.81, 2.7, 1], [318, 105, 0.82, 2.7, 1], [384, 105, 0.59, 2.1, 0], [451, 105, 0.43, 1.9, 2], [460, 105, 0.3, 1.6, 2], [172, 93, 0.11, 1.1, 0], [180, 93, 0.4, 1.8, 2], [197, 93, 0.53, 2.1, 2], [222, 93, 0.64, 2.3, 2], [253, 93, 0.71, 2.5, 2], [288, 93, 0.76, 2.6, 1], [324, 93, 0.76, 2.6, 1], [360, 93, 0.58, 2.1, 0], [392, 93, 0.51, 2, 0], [418, 93, 0.41, 1.8, 0], [437, 93, 0.43, 1.9, 2], [447, 93, 0.29, 1.6, 2], [202, 81, 0.45, 1.9, 2], [226, 81, 0.57, 2.2, 2], [259, 81, 0.66, 2.4, 2], [297, 81, 0.7, 2.5, 2], [424, 81, 0.41, 1.8, 2], [434, 81, 0.25, 1.5, 2], [207, 71, 0.35, 1.7, 2], [228, 71, 0.5, 2, 2], [262, 71, 0.6, 2.2, 2], [302, 71, 0.64, 2.3, 2], [407, 71, 0.26, 1.4, 0], [267, 62, 0.39, 1.7, 0], [391, 62, 0.24, 1.4, 0]
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
                segmentClassName={styles.gradientSegment}
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

      {/* Bento Grid */}
      <div id="explore-architecture" className={styles.bentoGridWrapper}>
        {/* Bento Card 1: Done-For-You Content Engine (Span 7) */}
        <BentoCard className={styles.card1}>
          {/* Top Visual: 3 Connected Tiles with Circuit Trace */}
          <div className={styles.pipelineGraphicWrapper}>
            <svg
              className={styles.circuitSvg}
              viewBox="0 0 600 430"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#6C2BD9" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#C6FF3D" stopOpacity="0.8" />
                </linearGradient>
                <filter id="circuitGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {/* Circuit Trace Path linking tiles */}
              <path
                d="M 30 110 H 130 V 215 C 190 215 220 120 300 215 C 380 310 410 215 470 215 H 570"
                stroke="url(#circuitGrad)"
                strokeWidth="2"
                filter="url(#circuitGlow)"
              />
              <path
                d="M 30 110 H 130 V 215 C 190 215 220 120 300 215 C 380 310 410 215 470 215 H 570"
                stroke="#FFFFFF"
                strokeWidth="1"
                strokeDasharray="4 8"
                opacity="0.6"
              />
            </svg>

          {/* 3 Connected Pipeline Tiles */}
          <div className={styles.pipelineTilesRow}>
            {/* Tile 1: 15-Min Voice Memo */}
            <div className={styles.pipelineTile}>
              <div className={styles.terminalHeader}>
                <span className={styles.termDotRed} />
                <span className={styles.termDotYellow} />
                <span className={styles.termDotGreen} />
              </div>
              <div className={styles.terminalCode}>
                <p><span className={styles.codeDim}>input:</span> <span className={styles.codeWhite}>15-min memo</span></p>
                <p><span className={styles.codeDim}>topic:</span> <span className={styles.codeLime}>&quot;Pricing error&quot;</span></p>
                <p><span className={styles.codeDim}>voice:</span> <span className={styles.codeCyan}>captured ✓</span></p>
              </div>
              <div className={styles.waveBarContainer}>
                <span className={styles.waveBar} />
                <span className={styles.waveBar} />
                <span className={styles.waveBar} />
                <span className={styles.waveBar} />
                <span className={styles.waveBar} />
              </div>
            </div>

            {/* Tile 2: Revloom Strategy / LinkedIn Core Tile */}
            <div className={`${styles.pipelineTile} ${styles.pipelineTileCenter}`}>
              <div className={styles.brandCenterGlow} />
              <svg className={styles.tileLinkedinIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span className={styles.brandCenterLabel}>Strategic Core</span>
            </div>

            {/* Tile 3: Live Authority Post Tile */}
            <div className={styles.pipelineTile}>
              <div className={styles.tileLiveHeader}>
                <span className={styles.livePulseDot} />
                <span className={styles.liveText}>live post ✨</span>
              </div>
              <div className={styles.livePostContent}>
                <div className={styles.livePostAuthor}>
                  <span className={styles.liveAuthorDot} />
                  <span>Nadia P. • CEO</span>
                </div>
                <p className={styles.livePostQuote}>&quot;3 rules to 10x pipeline...&quot;</p>
                <div className={styles.livePostStats}>
                  <span className={styles.codeLime}>48.2k views</span>
                  <span className={styles.codePink}>840 reposts</span>
                </div>
              </div>
            </div>
          </div>
      </div>

      {/* Bottom Content */}
      <div className={styles.cardBottomText}>
        <h3 className={styles.bentoTitleDark}>Content, Fully Managed</h3>
        <p className={styles.bentoSubDark}>
          Captions, comments, hooks — your presence stays active and on-brand without you touching a keyboard. From a 15-minute voice note to viral LinkedIn authority.
        </p>
      </div>
    </BentoCard>

        {/* Bento Card 2: Data-Driven Iteration (Span 5) */ }
  <BentoCard className={styles.card2}>
    {/* Top Content */}
    <div className={styles.cardTopText}>
      <h3 className={styles.bentoTitleDark}>Data-Driven Iteration</h3>
      <p className={styles.bentoSubDark}>
        We don&apos;t guess. Every post is a test; every result shapes the next one. Real-time visibility into compounding impressions and warm inbound pipeline.
      </p>
    </div>

    {/* Bottom Visual: Overflowing White Dashboard Mockup */}
    <div className={styles.dashboardMockupCard2}>
      {/* Header bar of mockup */}
      <div className={styles.mockupHeaderRow}>
        <div className={styles.mockupBrand}>
          <div className={styles.mockupLogoCircle}>R</div>
          <span className={styles.mockupTitleText}>Growth Dashboard</span>
        </div>
        <div className={styles.mockupFilterPills}>
          <span className={styles.filterPill}>Day</span>
          <span className={styles.filterPill}>Week</span>
          <span className={`${styles.filterPill} ${styles.filterPillActive}`}>Month</span>
        </div>
      </div>

      {/* Split Content Grid */}
      <div className={styles.mockupGrid2}>
        {/* Left Column: Your Posts & Reach */}
        <div className={styles.mockupCol}>
          <div className={styles.statMiniCard}>
            <div className={styles.statMiniHeader}>
              <span className={styles.statMiniLabel}>Your Reach</span>
              <span className={styles.statGrowthBadge}>+48.2%</span>
            </div>
            <div className={styles.statBigNumber}>242,000</div>
            <span className={styles.statMiniSub}>Total impressions</span>

            {/* Spline Area Chart */}
            <div className={styles.splineGraphWrap}>
              <svg viewBox="0 0 160 65" className={styles.splineSvg} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="splineArea" x1="0%" y1="0%" x2="0%" y2="1">
                    <stop offset="0%" stopColor="#6C2BD9" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d="M 0 55 Q 35 48, 60 30 T 115 15 T 160 5 L 160 65 L 0 65 Z" fill="url(#splineArea)" />
                <path d="M 0 55 Q 35 48, 60 30 T 115 15 T 160 5" fill="none" stroke="#6C2BD9" strokeWidth="2.5" />
                <circle cx="115" cy="15" r="4" fill="#6C2BD9" stroke="#FFFFFF" strokeWidth="2" />
              </svg>
              <div className={styles.splineTooltip}>
                <span>March</span>
                <strong>40,200 Engagements</strong>
              </div>
            </div>
          </div>

          {/* Donut Chart: Posts Breakdown */}
          <div className={styles.donutCardMini}>
            <div className={styles.donutHeader}>
              <span className={styles.statMiniLabel}>Posts Breakdown</span>
            </div>
            <div className={styles.donutGraphicWrap}>
              <svg viewBox="0 0 80 80" className={styles.donutSvg}>
                {/* Ring segments */}
                <circle cx="40" cy="40" r="30" fill="none" stroke="#E2E8F0" strokeWidth="10" />
                <circle cx="40" cy="40" r="30" fill="none" stroke="#6C2BD9" strokeWidth="10" strokeDasharray="95 188" strokeDashoffset="0" />
                <circle cx="40" cy="40" r="30" fill="none" stroke="#FF4FCE" strokeWidth="10" strokeDasharray="42 188" strokeDashoffset="-95" />
                <circle cx="40" cy="40" r="30" fill="none" stroke="#C6FF3D" strokeWidth="10" strokeDasharray="30 188" strokeDashoffset="-137" />
                <circle cx="40" cy="40" r="30" fill="none" stroke="#38BDF8" strokeWidth="10" strokeDasharray="21 188" strokeDashoffset="-167" />
              </svg>
              <div className={styles.donutCenterText}>
                <span className={styles.donutCenterVal}>$85k</span>
              </div>
            </div>
            <div className={styles.donutLegend}>
              <span><i style={{ background: "#6C2BD9" }} /> Carousels</span>
              <span><i style={{ background: "#FF4FCE" }} /> Hot Takes</span>
              <span><i style={{ background: "#C6FF3D" }} /> Case Studies</span>
            </div>
          </div>
        </div>

        {/* Right Column: Inbound Deals & Pipeline */}
        <div className={styles.mockupCol}>
          {/* Transactions / Deals List */}
          <div className={styles.transactionsMini}>
            <div className={styles.txHeader}>
              <span className={styles.statMiniLabel}>Latest Inbound Deals</span>
              <span className={styles.viewAllLink}>View all</span>
            </div>
            <div className={styles.txList}>
              <div className={styles.txItem}>
                <div className={`${styles.txIcon} ${styles.txIconBlue}`}>📄</div>
                <div className={styles.txDetails}>
                  <div className={styles.txTitle}>Series B SaaS Lead</div>
                  <div className={styles.txSub}>Inbound Discovery Call</div>
                </div>
                <div className={styles.txAmount}>$48,000</div>
              </div>
              <div className={styles.txItem}>
                <div className={`${styles.txIcon} ${styles.txIconPurple}`}>🎙️</div>
                <div className={styles.txDetails}>
                  <div className={styles.txTitle}>Keynote Speaker Invite</div>
                  <div className={styles.txSub}>Fintech Summit 2026</div>
                </div>
                <div className={styles.txAmount}>Confirmed</div>
              </div>
              <div className={styles.txItem}>
                <div className={`${styles.txIcon} ${styles.txIconLime}`}>🤝</div>
                <div className={styles.txDetails}>
                  <div className={styles.txTitle}>Enterprise Advisory</div>
                  <div className={styles.txSub}>Managing Director, VC</div>
                </div>
                <div className={styles.txAmount}>$120,000</div>
              </div>
            </div>
          </div>

          {/* Monetisation Details */}
          <div className={styles.monetisationMini}>
            <div className={styles.txHeader}>
              <span className={styles.statMiniLabel}>Pipeline Influenced</span>
              <span className={styles.growthGreen}>+18.4%</span>
            </div>
            <div className={styles.monetisationVal}>$142,000</div>
            <span className={styles.statMiniSub}>Total pipeline influenced</span>
            {/* Mini sparkline */}
            <svg viewBox="0 0 120 28" className={styles.sparklineSvg}>
              <path d="M 0 24 Q 30 18, 50 12 T 90 6 T 120 2" fill="none" stroke="#10B981" strokeWidth="2.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </BentoCard>

  {/* Bento Card 3: Positioning First (Span 5) */ }
  <BentoCard className={styles.card3}>
    {/* Top Content */}
    <div className={styles.cardTopText}>
      <h3 className={styles.bentoTitleDark}>Positioning First</h3>
      <p className={styles.bentoSubDark}>
        Before we write a word, we nail down what makes you different and who needs to hear it — positioning your brand across global tech and investment hubs.
      </p>
    </div>

    {/* Bottom Visual: Dotted Earth Sphere */}
    <div className={styles.globeGraphicContainer}>
      {/* Ambient Atmosphere Rim Glow */}
      <div className={styles.globeAtmosphereGlow} />

      <svg viewBox="0 0 450 360" className={styles.globeSvg}>
        <defs>
          <linearGradient id="crescentRim" x1="0%" y1="100%" x2="70%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#38BDF8" stopOpacity="0.8" />
            <stop offset="80%" stopColor="#6C2BD9" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#6C2BD9" stopOpacity="0" />
          </linearGradient>
          <filter id="rimBloom" x="-20%" y="-20%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="8" result="blur1" />
            <feGaussianBlur stdDeviation="3" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Sphere Background Dark Body */}
        <circle cx="310" cy="250" r="210" fill="#0C0A15" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

        {/* Crescent Atmosphere Light Edge */}
        <path
          d="M 102 274 A 210 210 0 0 1 424 81"
          fill="none"
          stroke="url(#crescentRim)"
          strokeWidth="3.5"
          filter="url(#rimBloom)"
        />

        {/* Precomputed Orthographic Globe Dots */}
        {GLOBE_DOTS.map(([x, y, o, r, c], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={r}
            fill={c === 1 ? "#38BDF8" : c === 2 ? "#60A5FA" : c === 0 ? "rgba(148, 163, 184, 0.45)" : "#818CF8"}
            opacity={o}
          />
        ))}

        {/* Glowing Distribution Hub Beacon */}
        <g className={styles.beaconGroup}>
          <circle cx="273" cy="237" r="18" fill="none" stroke="#38BDF8" strokeWidth="1.5" opacity="0.6" className={styles.beaconRing} />
          <circle cx="273" cy="237" r="9" fill="#38BDF8" opacity="0.35" />
          <circle cx="273" cy="237" r="4.5" fill="#FFFFFF" />
        </g>

        {/* Secondary Beacon & Connection Beam */}
        <g>
          <circle cx="176" cy="183" r="3.5" fill="#C6FF3D" />
          <path d="M 176 183 Q 220 190 273 237" fill="none" stroke="#C6FF3D" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.75" />
        </g>
      </svg>

      {/* Floating edge badges */}
      <div className={styles.globeBadgesOverlay}>
        <span className={styles.globePill}>⚡️ 6.6M+ Impressions Generated</span>
        <span className={styles.globePill}>🌐 50+ Global Founders Scaled</span>
      </div>
    </div>
  </BentoCard>

  {/* Bento Card 4: A Profile That Sells (Span 7) */ }
  <BentoCard className={styles.card4}>
    {/* Top Content */}
    <div className={styles.cardTopText}>
      <h3 className={styles.bentoTitleDark}>A Profile That Sells</h3>
      <p className={styles.bentoSubDark}>
        Your LinkedIn page becomes a high-converting landing page. Built to turn casual profile visitors into inbound DMs, investor calls, and enterprise pipeline.
      </p>
    </div>

    {/* Bottom Visual: Wide Desktop Dashboard Mockup */}
    <div className={styles.dashboardMockupCard4}>
      {/* Sidebar + Main App Split */}
      <div className={styles.card4DashboardInner}>
        {/* Mini Icon Sidebar */}
        <div className={styles.card4Sidebar}>
          <div className={styles.card4LogoBadge}>R</div>
          <div className={styles.card4NavIcons}>
            <button className={`${styles.card4NavBtn} ${styles.card4NavBtnActive}`} aria-label="Overview">
              <svg viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
            </button>
            <button className={styles.card4NavBtn} aria-label="Analytics">
              <svg viewBox="0 0 20 20" fill="currentColor"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>
            </button>
            <button className={styles.card4NavBtn} aria-label="Messages">
              <svg viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
            </button>
            <button className={styles.card4NavBtn} aria-label="Settings">
              <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className={styles.card4Main}>
          {/* Header */}
          <div className={styles.card4HeaderBar}>
            <div className={styles.card4Breadcrumb}>
              <span className={styles.card4BreadcrumbParent}>Workspace</span>
              <span className={styles.card4BreadcrumbSlash}>/</span>
              <span className={styles.card4BreadcrumbActive}>Inbound Pipeline Engine</span>
            </div>
            <div className={styles.card4SearchBox}>
              <span className={styles.card4SearchIcon}>🔍</span>
              <span className={styles.card4SearchPlaceholder}>Search hooks, topics, transcripts...</span>
            </div>
            <div className={styles.card4UserPill}>
              <span className={styles.card4AvatarDot} />
              <span>Active Sprint</span>
            </div>
          </div>

          {/* 4 Metric Stats Cards */}
          <div className={styles.card4MetricsRow}>
            <div className={styles.card4MetricCard}>
              <span className={styles.card4MetricLabel}>Hook Score</span>
              <div className={styles.card4MetricNumWrap}>
                <span className={styles.card4MetricVal}>98.4%</span>
                <span className={styles.badgeLime}>Top 1%</span>
              </div>
            </div>
            <div className={styles.card4MetricCard}>
              <span className={styles.card4MetricLabel}>Avg Reposts</span>
              <div className={styles.card4MetricNumWrap}>
                <span className={styles.card4MetricVal}>2,480</span>
                <span className={styles.badgePurple}>+34%</span>
              </div>
            </div>
            <div className={styles.card4MetricCard}>
              <span className={styles.card4MetricLabel}>Inbound Calls</span>
              <div className={styles.card4MetricNumWrap}>
                <span className={styles.card4MetricVal}>42 Calls</span>
                <span className={styles.badgePink}>Qualified</span>
              </div>
            </div>
            <div className={styles.card4MetricCard}>
              <span className={styles.card4MetricLabel}>Closed Pipeline</span>
              <div className={styles.card4MetricNumWrap}>
                <span className={styles.card4MetricVal}>$340k</span>
                <span className={styles.badgeBlue}>Q3 Record</span>
              </div>
            </div>
          </div>

          {/* Inbound Deals / Transactions Table */}
          <div className={styles.card4TableContainer}>
            <div className={styles.card4TableHeader}>
              <span>Inbound Deals & Speaking Pipeline</span>
              <span className={styles.card4TableCount}>4 Deals this month</span>
            </div>
            <table className={styles.card4Table}>
              <thead>
                <tr>
                  <th>LEAD / FOUNDER</th>
                  <th>COMPANY</th>
                  <th>DEAL VALUE</th>
                  <th>STAGE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className={styles.tableUser}>
                      <div className={`${styles.tableAvatar} ${styles.tableAvatar1}`}>MC</div>
                      <div>
                        <div className={styles.tableName}>Marcus Chen</div>
                        <div className={styles.tableSub}>VP Growth</div>
                      </div>
                    </div>
                  </td>
                  <td><span className={styles.companyBadge}>Series B SaaS</span></td>
                  <td><strong className={styles.dealVal}>$48,000</strong></td>
                  <td><span className={styles.stageTagGreen}>Call Booked ✓</span></td>
                </tr>
                <tr>
                  <td>
                    <div className={styles.tableUser}>
                      <div className={`${styles.tableAvatar} ${styles.tableAvatar2}`}>ER</div>
                      <div>
                        <div className={styles.tableName}>Elena Rostova</div>
                        <div className={styles.tableSub}>Managing Partner</div>
                      </div>
                    </div>
                  </td>
                  <td><span className={styles.companyBadge}>Horizon Capital VC</span></td>
                  <td><strong className={styles.dealVal}>$120,000</strong></td>
                  <td><span className={styles.stageTagPurple}>Inbound DM ✓</span></td>
                </tr>
                <tr>
                  <td>
                    <div className={styles.tableUser}>
                      <div className={`${styles.tableAvatar} ${styles.tableAvatar3}`}>JV</div>
                      <div>
                        <div className={styles.tableName}>Julian Vance</div>
                        <div className={styles.tableSub}>Co-Founder & CEO</div>
                      </div>
                    </div>
                  </td>
                  <td><span className={styles.companyBadge}>Omnistack Cloud</span></td>
                  <td><strong className={styles.dealVal}>$60,000</strong></td>
                  <td><span className={styles.stageTagLime}>Contract Sent ✓</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </BentoCard>
</div>
</section>
  );
}

export default Hero2;
