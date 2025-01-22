"use client";
import React from "react";
import { motion } from "framer-motion"; // npm install framer-motion
// if you don't have a `cn` function, define it here:
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function AuroraText({
  className,
  children,
  as: Component = "span",
  ...props
}) {
  // We'll just do motion.span for everything
  const MotionSpan = motion.span;

  return (
    <MotionSpan
      className={cn("relative inline-flex overflow-hidden", className)}
      {...props}
    >
      {children}
      {/* The highlight overlay with blue hues */}
      <span className="pointer-events-none absolute inset-0 mix-blend-lighten dark:mix-blend-darken">
        {/* If you want multiple color stops, you can define them below */}
        <span className="pointer-events-none absolute -top-1/2 left-0 h-[30vw] w-[30vw] bg-[#0984e3] opacity-60 blur-[1rem]" />
        <span className="pointer-events-none absolute right-0 top-0 h-[30vw] w-[30vw] bg-[#074291] opacity-50 blur-[1rem]" />
        <span className="pointer-events-none absolute bottom-0 left-0 h-[30vw] w-[30vw] bg-[#4ea1f3] opacity-40 blur-[1rem]" />
        <span className="pointer-events-none absolute -bottom-1/2 right-0 h-[30vw] w-[30vw] bg-[#0b94e7] opacity-40 blur-[1rem]" />
      </span>
    </MotionSpan>
  );
}
