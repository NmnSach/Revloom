"use client";

import React from "react";

export class WebGLErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <WebGLFallback />;
    }
    return this.props.children;
  }
}

export function WebGLFallback({
  style = {},
  className = "",
  message = "Interactive WebGL content is unavailable on this device/browser.",
}) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0A0810 0%, #1A1625 100%)",
        padding: "1rem",
        textAlign: "center",
        fontSize: "0.875rem",
        color: "rgba(255, 255, 255, 0.7)",
        ...style,
      }}
      role="status"
      aria-live="polite"
    >
      <p>{message}</p>
    </div>
  );
}
