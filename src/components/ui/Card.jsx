import React from "react";
import { cn } from "@/lib/utils";

export default function Card({
  children,
  className,
  variant = "glass",
  hover = true,
  ...props
}) {
  const variants = {
    glass:
      "bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-luxury text-slate-800",
    darkGlass:
      "bg-navy-900/80 backdrop-blur-2xl border border-white/10 shadow-luxury text-white",
    flat:
      "bg-white border border-slate-200 shadow-sm text-slate-800",
    gradient:
      "bg-gradient-to-br from-white via-brand-50/30 to-teal-50/20 border border-brand-100 shadow-luxury text-slate-800",
  };

  const hoverStyle = hover
    ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-luxury-hover hover:border-brand-400/50"
    : "";

  return (
    <div
      className={cn("rounded-2xl overflow-hidden", variants[variant], hoverStyle, className)}
      {...props}
    >
      {children}
    </div>
  );
}
