import { cn } from "@/lib/utils";
import React from "react";

// SVG logo, matching your previous design ("blue circle + S / A mark")
const Logo = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("relative flex items-center justify-center", className)}
    aria-label="SmartCampusAI Logo"
    {...props}
  >
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        minWidth: "56px",
        minHeight: "56px",
        boxShadow: "0 2px 6px rgba(32,70,201,0.12)",
        borderRadius: "50%",
        display: "block"
      }}
    >
      <circle cx="28" cy="28" r="28" fill="#2046C9" />
      <path
        d="M38 18C37.2 16.2 34.1 13 27.7 13C21.4 13 18.3 16.55 18 20.25C17.78 23 20.44 24.21 22.78 25C23.86 25.34 27.09 26.18 30 27C33.64 28.05 35 29.6 35 31.05C35 33.14 31.71 34.13 28.92 34C24.82 33.81 22 31.01 22 28.5"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25.6 41L31.7 23.7M28.6 34.9L33 41M28.6 34.9L24.2 41"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
   <circle cx="36.1" cy="41.1" r="1.3" fill="#fff" />
    </svg>
  </div>
);

export default Logo;
