"use client";

import * as React from "react";
import { motion } from "framer-motion";

/**
 * CircuitBoard - Interactive circuit board layout component with animated
 * electricity paths that pulse between connected nodes.
 * Based on: https://componentry.dev/docs/components/circuit-board
 */
export function CircuitBoard({
  nodes = [],
  connections = [],
  width = 600,
  height = 400,
  gridSize = 20,
  showGrid = true,
  traceColor,
  pulseColor,
  pulseSpeed = 2,
  traceWidth = 2,
  className = "",
  onNodeClick,
  activeNodeId,
  style = {},
  ...props
}) {
  const [isDark, setIsDark] = React.useState(true);

  React.useEffect(() => {
    const checkTheme = () => {
      const doc = document.documentElement;
      const dataTheme = doc.getAttribute("data-theme");
      const hasDarkClass = doc.classList.contains("dark") || document.body.classList.contains("dark");
      setIsDark(dataTheme ? dataTheme === "dark" : hasDarkClass);
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
    return () => observer.disconnect();
  }, []);

  const computedGridColor = "rgba(163, 163, 163, 0.08)";
  const computedTraceColor = traceColor || "rgba(163, 163, 163, 0.25)";
  const computedPulseColor = pulseColor || "rgba(163, 163, 163, 0.6)";
  const activeGlow = "#C6FF3D";

  const nodeMap = React.useMemo(() => {
    return new Map(nodes.map((node) => [node.id, node]));
  }, [nodes]);

  const getNodeRadius = React.useCallback((size) => {
    switch (size) {
      case "sm": return 18;
      case "lg": return 28;
      default: return 22;
    }
  }, []);

  const calculatePath = React.useCallback(
    (from, to) => {
      const fromR = getNodeRadius(from.size) + 2;
      const toR = getNodeRadius(to.size) + 2;
      const dx = to.x - from.x;
      const dy = to.y - from.y;

      if (Math.abs(dy) < 4) {
        const startX = from.x + (dx > 0 ? fromR : -fromR);
        const endX = to.x + (dx > 0 ? -toR : toR);
        return `M ${startX} ${from.y} H ${endX}`;
      }

      if (Math.abs(dx) < 4) {
        const startY = from.y + (dy > 0 ? fromR : -fromR);
        const endY = to.y + (dy > 0 ? -toR : toR);
        return `M ${from.x} ${startY} V ${endY}`;
      }

      if (Math.abs(dx) > Math.abs(dy)) {
        const startX = from.x + (dx > 0 ? fromR : -fromR);
        const endX = to.x + (dx > 0 ? -toR : toR);
        const midX = (startX + endX) / 2;
        return `M ${startX} ${from.y} H ${midX} V ${to.y} H ${endX}`;
      } else {
        const startY = from.y + (dy > 0 ? fromR : -fromR);
        const endY = to.y + (dy > 0 ? -toR : toR);
        const midY = (startY + endY) / 2;
        return `M ${from.x} ${startY} V ${midY} H ${to.x} V ${endY}`;
      }
    },
    [getNodeRadius]
  );

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        userSelect: "none",
        ...style,
      }}
      {...props}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height="100%"
        style={{ display: "block", overflow: "visible" }}
      >
        <defs>
          <filter id="cbGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="cbNodeGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {showGrid && (
            <pattern
              id="cbGrid"
              width={gridSize}
              height={gridSize}
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx={gridSize / 2}
                cy={gridSize / 2}
                r="0.5"
                fill={computedGridColor}
              />
            </pattern>
          )}

          {nodes.map((node) => (
            <linearGradient
              key={`grad-${node.id}`}
              id={`cbActiveGrad-${node.id}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#6C2BD9" />
              <stop offset="100%" stopColor="#4C1D95" />
            </linearGradient>
          ))}
        </defs>

        {showGrid && (
          <rect width={width} height={height} fill="url(#cbGrid)" rx="16" />
        )}

        {connections.map((conn, i) => {
          const fromNode = nodeMap.get(conn.from);
          const toNode = nodeMap.get(conn.to);
          if (!fromNode || !toNode) return null;

          const path = conn.path || calculatePath(fromNode, toNode);
          const segLen = 500;

          return (
            <g key={`conn-${i}`}>
              <motion.path
                d={path}
                fill="none"
                stroke={conn.color || computedTraceColor}
                strokeWidth={traceWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              />

              {conn.animated !== false && (
                <motion.path
                  d={path}
                  fill="none"
                  stroke={computedPulseColor}
                  strokeWidth={traceWidth + 2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#cbGlow)"
                  strokeDasharray={`${segLen * 0.10} ${segLen * 0.90}`}
                  initial={{ strokeDashoffset: segLen }}
                  animate={{ strokeDashoffset: -segLen }}
                  transition={{
                    duration: pulseSpeed,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.35,
                  }}
                />
              )}

              {conn.bidirectional && (
                <motion.path
                  d={path}
                  fill="none"
                  stroke={computedPulseColor}
                  strokeWidth={traceWidth + 2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#cbGlow)"
                  strokeDasharray={`${segLen * 0.10} ${segLen * 0.90}`}
                  initial={{ strokeDashoffset: -segLen }}
                  animate={{ strokeDashoffset: segLen }}
                  transition={{
                    duration: pulseSpeed,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.35 + pulseSpeed / 2,
                  }}
                />
              )}
            </g>
          );
        })}

        {nodes.map((node, i) => {
          const r = getNodeRadius(node.size);
          const isActive = activeNodeId
            ? activeNodeId === node.id
            : node.status === "active";

          const boxSize = r * 2;
          const cornerRadius = 10;
          const nodeX = node.x - r;
          const nodeY = node.y - r;

          return (
            <g
              key={node.id}
              onClick={() => { if (onNodeClick) onNodeClick(node, i); }}
              style={{ cursor: "pointer" }}
            >
              {isActive && (
                <motion.rect
                  x={nodeX - 7}
                  y={nodeY - 7}
                  width={boxSize + 14}
                  height={boxSize + 14}
                  rx={cornerRadius + 5}
                  fill="none"
                  stroke={activeGlow}
                  strokeWidth="1"
                  animate={{ opacity: [0.7, 0, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}

              {isActive && (
                <rect
                  x={nodeX - 2}
                  y={nodeY - 2}
                  width={boxSize + 4}
                  height={boxSize + 4}
                  rx={cornerRadius + 2}
                  fill={`url(#cbActiveGrad-${node.id})`}
                  opacity="0.35"
                  filter="url(#cbNodeGlow)"
                />
              )}

              <rect
                x={nodeX}
                y={nodeY}
                width={boxSize}
                height={boxSize}
                rx={cornerRadius}
                fill={isActive ? `url(#cbActiveGrad-${node.id})` : "rgba(18, 14, 28, 0.92)"}
                stroke={isActive ? activeGlow : "rgba(108, 43, 217, 0.4)"}
                strokeWidth="1.5"
              />

              {node.stepNumber && (() => {
                const badgeAbove = node.labelPosition !== "above";
                const bx = node.x + r - 14;
                const by = badgeAbove ? node.y - r - 10 : node.y + r - 3;
                const ty = badgeAbove ? node.y - r - 3.5 : node.y + r + 3;
                return (
                  <>
                    <rect
                      x={bx}
                      y={by}
                      width={18}
                      height={13}
                      rx={6}
                      fill={isActive ? activeGlow : "rgba(25, 20, 36, 0.95)"}
                      stroke={isActive ? activeGlow : "rgba(108, 43, 217, 0.4)"}
                      strokeWidth="0.75"
                    />
                    <text
                      x={node.x + r - 5}
                      y={ty}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      style={{
                        fontSize: "6.5px",
                        fontWeight: 800,
                        fontFamily: "sans-serif",
                        fill: isActive ? "#0E0A1A" : "#A78BFA",
                      }}
                    >
                      {node.stepNumber}
                    </text>
                  </>
                );
              })()}

              <foreignObject
                x={nodeX + r / 2}
                y={nodeY + r / 2}
                width={r}
                height={r}
                style={{ overflow: "visible", pointerEvents: "none" }}
              >
                <div
                  style={{
                    width: r,
                    height: r,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.75)",
                  }}
                >
                  {node.icon}
                </div>
              </foreignObject>

              {node.label && (
                <text
                  x={node.x}
                  y={node.labelPosition === "above" ? node.y - r - 32 : node.y + r + 14}
                  textAnchor="middle"
                  dominantBaseline="hanging"
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    fontFamily: "sans-serif",
                    fill: isActive ? "#FFFFFF" : "rgba(255,255,255,0.85)",
                    letterSpacing: "-0.3px",
                  }}
                >
                  {node.label}
                </text>
              )}

              {node.timeline && (
                <text
                  x={node.x}
                  y={node.labelPosition === "above" ? node.y - r - 18 : node.y + r + 30}
                  textAnchor="middle"
                  dominantBaseline="hanging"
                  style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    fontFamily: "sans-serif",
                    fill: isActive && isDark ? "#C6FF3D" : "#A78BFA",
                  }}
                >
                  {node.timeline}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default CircuitBoard;
