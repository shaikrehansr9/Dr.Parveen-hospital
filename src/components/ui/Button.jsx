"use client";

import React from "react";
import { clsx } from "clsx";

const VARIANTS = {
  primary: "bg-primary-600 text-white hover:bg-primary-700 shadow-md shadow-primary-600/20 hover:shadow-lg hover:shadow-primary-600/30 hover:-translate-y-0.5",
  secondary: "bg-secondary text-white hover:opacity-90 shadow-md hover:shadow-lg hover:-translate-y-0.5",
  outline: "border-2 border-primary-600 text-primary-600 bg-transparent hover:bg-primary-50 hover:-translate-y-0.5",
  white: "bg-white text-dark hover:bg-slate-50 shadow-sm hover:-translate-y-0.5",
  ghost: "text-primary-700 hover:bg-primary-50 hover:text-primary-800",
  danger: "bg-emergency text-white hover:bg-emergency-dark hover:shadow-lg hover:-translate-y-0.5",
};

const SIZES = {
  sm: "px-4 py-2 text-xs gap-1.5 rounded-lg",
  md: "px-5 py-2.5 text-sm gap-2 rounded-xl",
  lg: "px-6 py-3.5 text-sm gap-2.5 rounded-xl",
  xl: "px-8 py-4 text-base gap-3 rounded-2xl",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "right",
  className = "",
  disabled = false,
  loading = false,
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center font-bold transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none",
        VARIANTS[variant] || VARIANTS.primary,
        SIZES[size] || SIZES.md,
        className
      )}
      {...props}
    >
      {loading && (
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {!loading && Icon && iconPosition === "left" && <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />}
      <span>{children}</span>
      {!loading && Icon && iconPosition === "right" && <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />}
    </button>
  );
}
