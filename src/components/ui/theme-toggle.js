"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { AnimatedThemeToggler } from "./animated-theme-toggler";
import styles from "./theme-toggle.module.css";

const emptySubscribe = () => () => {};

export { AnimatedThemeToggler };

export function ThemeToggle({ variant = "button", className = "", ...props }) {
  const { theme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const isDark = mounted ? (resolvedTheme === "dark" || theme === "dark") : false;

  if (variant === "drawer") {
    return (
      <div className={styles.drawerToggleRow}>
        <span className={styles.drawerToggleLabel}>
          <span>{isDark ? "🌙" : "☀️"}</span>
          <span>{isDark ? "Dark Mode" : "Light Mode"}</span>
        </span>
        <AnimatedThemeToggler duration={450} variant="circle" {...props} />
      </div>
    );
  }

  return (
    <AnimatedThemeToggler
      className={className}
      duration={450}
      variant="circle"
      {...props}
    />
  );
}
