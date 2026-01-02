"use client";

import { FiSun, FiMoon } from "react-icons/fi";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";

export default function ToggleTheme() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark" || theme === undefined; // default 'system' to dark for rotation

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      className="relative w-10 h-10 outline-none border-none bg-transparent cursor-pointer"
      aria-label="Toggle theme"
      style={{ WebkitTapHighlightColor: "transparent" }}
      onClick={toggleTheme}
      type="button"
    >
      <AnimatePresence initial={false} mode="wait">
        {isDark ? (
          <motion.span
            key="sun"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ rotate: 180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -180, opacity: 0 }}
            transition={{
              rotate: { type: "spring", stiffness: 300, damping: 20 },
              opacity: { duration: 0.2 }
            }}
          >
            <FiSun size={22} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 180, opacity: 0 }}
            transition={{
              rotate: { type: "spring", stiffness: 300, damping: 20 },
              opacity: { duration: 0.2 }
            }}
          >
            <FiMoon size={22} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
