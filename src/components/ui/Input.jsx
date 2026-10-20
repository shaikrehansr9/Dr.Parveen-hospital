import React, { useId } from "react";
import { cn } from "@/lib/utils";

export function Input({
  label,
  error,
  icon: Icon,
  className,
  id,
  required,
  ...props
}) {
  const generatedId = useId();
  const labelId = label ? label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : "field";
  const inputId = id || (label ? `${labelId}-${generatedId.replace(/:/g, "")}` : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs sm:text-sm font-semibold text-slate-700 tracking-wide"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          id={inputId}
          required={required}
          className={cn(
            "w-full bg-slate-50/70 border border-slate-200 text-slate-900 text-sm sm:text-base rounded-xl transition-all duration-200",
            "focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 focus:outline-none",
            "placeholder:text-slate-400",
            "h-12 px-4",
            Icon ? "pl-10" : "",
            error ? "border-red-400 focus:border-red-500 focus:ring-red-500/10" : "",
            className
          )}
          {...props}
        />
      </div>

      {error && <p className="text-xs text-red-500 font-medium mt-1">{error}</p>}
    </div>
  );
}

export function Textarea({
  label,
  error,
  className,
  id,
  required,
  rows = 3,
  ...props
}) {
  const generatedId = useId();
  const labelId = label ? label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : "field";
  const inputId = id || (label ? `${labelId}-${generatedId.replace(/:/g, "")}` : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs sm:text-sm font-semibold text-slate-700 tracking-wide"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <textarea
        id={inputId}
        rows={rows}
        required={required}
        className={cn(
          "w-full bg-slate-50/70 border border-slate-200 text-slate-900 text-sm sm:text-base rounded-xl transition-all duration-200 p-3.5",
          "focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 focus:outline-none",
          "placeholder:text-slate-400 resize-none",
          error ? "border-red-400 focus:border-red-500 focus:ring-red-500/10" : "",
          className
        )}
        {...props}
      />

      {error && <p className="text-xs text-red-500 font-medium mt-1">{error}</p>}
    </div>
  );
}

export function Select({
  label,
  options = [],
  error,
  icon: Icon,
  className,
  id,
  required,
  placeholder = "Select an option",
  ...props
}) {
  const generatedId = useId();
  const labelId = label ? label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : "field";
  const inputId = id || (label ? `${labelId}-${generatedId.replace(/:/g, "")}` : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs sm:text-sm font-semibold text-slate-700 tracking-wide"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <select
          id={inputId}
          required={required}
          className={cn(
            "w-full bg-slate-50/70 border border-slate-200 text-slate-900 text-sm sm:text-base rounded-xl transition-all duration-200",
            "focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 focus:outline-none",
            "h-12 px-4 appearance-none cursor-pointer pr-10",
            Icon ? "pl-10" : "",
            error ? "border-red-400 focus:border-red-500 focus:ring-red-500/10" : "",
            className
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => {
            const val = typeof opt === "string" ? opt : opt.value;
            const labelText = typeof opt === "string" ? opt : opt.label;
            return (
              <option key={val} value={val}>
                {labelText}
              </option>
            );
          })}
        </select>

        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {error && <p className="text-xs text-red-500 font-medium mt-1">{error}</p>}
    </div>
  );
}
