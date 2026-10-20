import React from "react";
import { clsx } from "clsx";

const VARIANTS = {
  default: "bg-slate-100 text-slate-700 border border-slate-200",
  primary: "bg-primary-100 text-primary-700 border border-primary-200/60",
  cyan: "bg-primary-100 text-primary-700 border border-primary-200/60",
  teal: "bg-primary-100 text-primary-700 border border-primary-200/60",
  green: "bg-emerald-100 text-emerald-700 border border-emerald-200/60",
  red: "bg-red-100 text-red-700 border border-red-200/60",
  amber: "bg-amber-100 text-amber-700 border border-amber-200/60",
  blue: "bg-blue-100 text-blue-700 border border-blue-200/60",
  glow: "bg-primary-600/80 text-white border border-primary-400/30 backdrop-blur-sm",
};

const SIZES = {
  sm: "text-[10px] px-2 py-0.5 gap-1",
  md: "text-xs px-3 py-1 gap-1.5",
  lg: "text-sm px-4 py-1.5 gap-2",
};

export default function Badge({ children, variant = "default", size = "md", dot = false, className = "" }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center font-bold rounded-full tracking-wider uppercase",
        VARIANTS[variant] || VARIANTS.default,
        SIZES[size] || SIZES.md,
        className
      )}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      )}
      {children}
    </span>
  );
}
