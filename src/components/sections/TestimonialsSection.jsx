"use client";

import React from "react";
import {
  Star,
  Quote,
  CheckCircle2,
} from "lucide-react";
import { PATIENT_TESTIMONIALS } from "@/lib/constants";

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="w-full max-w-full overflow-hidden bg-white py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-10 min-w-0 text-center">
          <span className="testimonials-badge mb-4 inline-flex max-w-full items-center rounded-full px-4 py-2 text-sm font-bold">
            Patient Testimonials
          </span>

          <h2 className="break-words font-heading text-3xl font-extrabold tracking-tight text-dark sm:text-4xl lg:text-5xl">
            Trusted by{" "}
            <span className="text-primary-600">Families</span>{" "}
            Across Sangareddy
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Real stories of healing, safe childbirth, and
            successful recoveries.
          </p>
        </div>

        {/* Patient review cards */}
        <div className="grid w-full min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PATIENT_TESTIMONIALS.map((item) => (
            <article
              key={item.id}
              className="testimonial-card flex min-w-0 flex-col justify-between overflow-hidden rounded-2xl p-5 shadow-sm sm:p-6"
            >
              <div className="min-w-0 space-y-4">
                {/* Rating and quote */}
                <div className="flex items-center justify-between gap-3">
                  <div
                    className="flex flex-wrap gap-0.5"
                    aria-label={`${item.rating} out of 5 stars`}
                  >
                    {Array.from(
                      { length: item.rating },
                      (_, index) => (
                        <Star
                          key={index}
                          aria-hidden="true"
                          className="testimonial-star h-4 w-4 shrink-0"
                        />
                      )
                    )}
                  </div>

                  <Quote
                    aria-hidden="true"
                    className="testimonial-quote-icon h-7 w-7 shrink-0 sm:h-8 sm:w-8"
                  />
                </div>

                {/* Review highlight */}
                <p className="testimonial-highlight break-words text-xs font-bold uppercase leading-relaxed tracking-wider [overflow-wrap:anywhere]">
                  {item.highlight}
                </p>

                {/* Review text */}
                <p className="break-words text-sm italic leading-7 text-slate-600 [overflow-wrap:anywhere]">
                  &ldquo;{item.comment}&rdquo;
                </p>
              </div>

              {/* Patient details */}
              <div className="mt-5 flex min-w-0 items-center gap-3 border-t border-slate-200/60 pt-5">
                <div
                  aria-hidden="true"
                  className="testimonial-avatar flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                >
                  {item.name.charAt(0)}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="flex min-w-0 flex-wrap items-center gap-1.5 break-words text-sm font-bold leading-snug text-dark [overflow-wrap:anywhere]">
                    <span>{item.name}</span>
                    <CheckCircle2
                      aria-label="Verified patient"
                      className="testimonial-verified-icon h-4 w-4 shrink-0"
                    />
                  </h3>

                  <p className="mt-1 break-words text-sm text-slate-500 [overflow-wrap:anywhere]">
                    {item.location}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Trust summary */}
        <div className="mt-12 flex min-w-0 justify-center">
          <div className="testimonial-summary-pill flex w-fit max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-2xl px-4 py-4 text-center text-xs font-semibold shadow-sm sm:rounded-full sm:px-6 sm:py-3 sm:text-sm">
            <span className="flex items-center gap-1 text-secondary">
              <Star
                aria-hidden="true"
                className="testimonial-star h-4 w-4 shrink-0"
              />
              <strong>4.9 / 5.0 Rating</strong>
            </span>

            <span className="hidden text-slate-300 sm:inline">
              •
            </span>

            <span>2,500+ Verified Consultations</span>

            <span className="hidden text-slate-300 sm:inline">
              •
            </span>

            <span className="font-bold text-primary-600">
              100% Patient Privacy
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
