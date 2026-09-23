"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import styles from "./circuit-board.module.css";

export function CircuitBoard({
  nodes = [],
  connections = [],
  width = 1100,
  height = 320,
  gridSize = 24,
  showGrid = true,
  gridColor = "rgba(108, 43, 217, 0.05)",
  traceColor = "rgba(108, 43, 217, 0.22)",
  pulseColor = "#6C2BD9",
  nodeColor = "#6C2BD9",
  pulseSpeed = 2.2,
  traceWidth = 2.5,
  activeNodeId = null,
  onNodeClick = null,
  className = "",
}) {
  const nodeMap = useMemo(() => {
    return new Map(nodes.map((node) => [node.id, node]));
  }, [nodes]);

  const getNodeSize = useCallback((size) => {
    switch (size) {
      case "sm":
        return 32;
      case "lg":
        return 56;
      default:
        return 44;
    }
  }, []);

  const calculatePath = useCallback(
    (from, to) => {
      const fromSize = getNodeSize(from.size) / 2 + 6;
      const toSize = getNodeSize(to.size) / 2 + 6;

      const dx = to.x - from.x;
      const dy = to.y - from.y;

      let startX = from.x;
      let startY = from.y;
      let endX = to.x;
      let endY = to.y;

      if (Math.abs(dx) > Math.abs(dy)) {
        startX = from.x + (dx > 0 ? fromSize : -fromSize);
        endX = to.x + (dx > 0 ? -toSize : toSize);
        const midX = from.x + dx / 2;
        return `M ${startX} ${startY} H ${midX} V ${endY} H ${endX}`;
      } else {
        startY = from.y + (dy > 0 ? fromSize : -fromSize);
        endY = to.y + (dy > 0 ? -toSize : toSize);
        const midY = from.y + dy / 2;
        return `M ${startX} ${startY} V ${midY} H ${endX} V ${endY}`;
      }
    },
    [getNodeSize]
  );

  return (
    <div
      className={`${styles.circuitBoardContainer} ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className={styles.circuitSvg}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Glow filter for electric pulse */}
          <filter id="circuitElectricGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Micro dot grid pattern */}
          {showGrid && (
            <pattern
              id="circuitGridPattern"
              width={gridSize}
              height={gridSize}
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx={gridSize / 2}
                cy={gridSize / 2}
                r="1"
                fill={gridColor}
              />
            </pattern>
          )}

          {/* Linear gradient for connections */}
          <linearGradient id="circuitLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6C2BD9" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#FF4FCE" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#C6FF3D" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Grid Background */}
        {showGrid && (
          <rect width={width} height={height} fill="url(#circuitGridPattern)" />
        )}

        {/* Connection Traces */}
        {connections.map((conn, i) => {
          const fromNode = nodeMap.get(conn.from);
          const toNode = nodeMap.get(conn.to);
          if (!fromNode || !toNode) return null;

          const path = calculatePath(fromNode, toNode);
          const pathLength = 600;
          const isActive =
            activeNodeId === conn.from || activeNodeId === conn.to;

          return (
            <g key={`conn-${conn.from}-${conn.to}-${i}`}>
              {/* Static Base Trace */}
              <path
                d={path}
                fill="none"
                stroke={isActive ? "rgba(108, 43, 217, 0.45)" : traceColor}
                strokeWidth={isActive ? traceWidth + 1 : traceWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Animated Electric Signal Pulse */}
              {conn.animated !== false && (
                <motion.path
                  d={path}
                  fill="none"
                  stroke={conn.pulseColor || (isActive ? "#C6FF3D" : pulseColor)}
                  strokeWidth={traceWidth + 2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#circuitElectricGlow)"
                  strokeDasharray={`${pathLength * 0.08} ${pathLength * 0.92}`}
                  initial={{ strokeDashoffset: pathLength }}
                  animate={{ strokeDashoffset: -pathLength }}
                  transition={{
                    duration: pulseSpeed,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.25,
                  }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Nodes Layer */}
      <div className={styles.nodesOverlay}>
        {nodes.map((node, i) => {
          const size = getNodeSize(node.size);
          const isActive = activeNodeId === node.id;
          const leftPercent = (node.x / width) * 100;
          const topPercent = (node.y / height) * 100;

          return (
            <div
              key={node.id}
              className={`${styles.nodeAnchor} ${isActive ? styles.nodeAnchorActive : ""}`}
              style={{
                left: `${leftPercent}%`,
                top: `${topPercent}%`,
                width: size,
                height: size,
              }}
              onClick={() => onNodeClick?.(node.id)}
            >
              {/* Outer Radiant Glow when Active */}
              {isActive && (
                <motion.div
                  className={styles.nodeActiveHalo}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.2, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}

              {/* Node Card Shell */}
              <motion.div
                className={`${styles.nodeButton} ${isActive ? styles.nodeButtonActive : ""}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 450, damping: 24 }}
              >
                {/* Step Number Tag inside node */}
                {node.stepNumber && (
                  <span className={styles.nodeStepBadge}>{node.stepNumber}</span>
                )}

                {/* Node Icon */}
                {node.icon && <div className={styles.nodeIcon}>{node.icon}</div>}
              </motion.div>

              {/* Node Label Below */}
              {node.label && (
                <div
                  className={`${styles.nodeLabel} ${
                    isActive ? styles.nodeLabelActive : ""
                  }`}
                >
                  <span className={styles.nodeLabelText}>{node.label}</span>
                  {node.duration && (
                    <span className={styles.nodeDuration}>{node.duration}</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CircuitBoard;
