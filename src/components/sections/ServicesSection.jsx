"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Baby,
  FlaskConical,
  HeartPulse,
  ShieldAlert,
  Stethoscope,
  Dumbbell,
  Calendar,
} from "lucide-react";
import { MEDICAL_SERVICES, HOSPITAL_INFO } from "@/lib/constants";

const ICON_MAP = {
  "obstetrics-gynecology": HeartPulse,
  "high-risk-pregnancy": ShieldAlert,
  "laparoscopic-surgery": Activity,
  "internal-medicine": Stethoscope,
  "pediatrics-child-care": Baby,
  "physiotherapy-rehabilitation": Dumbbell,
  "diagnostics-lab-tests": FlaskConical,
};

const ACCENT_COLORS = [
  { bg: "bg-primary-50", icon: "text-primary-600", border: "border-primary-200/60" },
  { bg: "bg-red-50", icon: "text-red-600", border: "border-red-200/60" },
  { bg: "bg-blue-50", icon: "text-blue-600", border: "border-blue-200/60" },
  { bg: "bg-amber-50", icon: "text-amber-600", border: "border-amber-200/60" },
  { bg: "bg-purple-50", icon: "text-purple-600", border: "border-purple-200/60" },
  { bg: "bg-emerald-50", icon: "text-emerald-600", border: "border-emerald-200/60" },
  { bg: "bg-cyan-50", icon: "text-cyan-600", border: "border-cyan-200/60" },
];

export default function ServicesSection({ onOpenBooking }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="services" className="relative bg-surface pt-10 pb-14 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-20 overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-primary-200 to-transparent" />
        <div className="absolute -right-32 top-1/4 h-[500px] w-[500px] rounded-full bg-primary-50/60 blur-3xl" />
        <div className="absolute -left-32 bottom-1/4 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
          className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            <span className="badge-pill bg-primary-100 text-primary-700 mb-4">
              Care Under One Roof
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-dark sm:text-4xl lg:text-5xl">
              The care you need,{" "}
              <span style={{ color: "#0f766e" }}>all in one place.</span>
            </h2>
            <p className="mt-4 max-w-xl text-base font-semibold leading-7 text-slate-600 sm:text-lg">
              Specialist-led care for women, children, and families at every stage of life.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex shrink-0 items-center gap-2 text-base font-bold transition-all hover:gap-3"
            style={{ color: "#0f766e" }}
          >
            Explore all services <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {MEDICAL_SERVICES.map((service, idx) => {
            const Icon = ICON_MAP[service.id] || HeartPulse;
            const accentIdx = idx % ACCENT_COLORS.length;
            const accent = ACCENT_COLORS[accentIdx];

            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: [0.22,1,0.36,1], delay: idx * 0.06 }}
                whileHover={{ y: -5, scale: 1.015, transition: { duration: 0.18, ease: "easeOut" } }}
                whileTap={{ scale: 0.995, transition: { duration: 0.08 } }}
                className="group card-elevated relative transition-[box-shadow,ring-color] duration-300 ease-out hover:shadow-[0_26px_54px_-12px_rgba(15,23,42,0.42)] hover:ring-2 hover:ring-primary-300 focus-within:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.28)] focus-within:ring-2 focus-within:ring-primary-300"
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="block"
                  aria-label={`Learn about ${service.title}`}
                >
                  {/* Image */}
                  <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-100">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      quality={90}
                      sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,(max-width:1280px) 33vw,25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.15] motion-reduce:transition-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-dark/10 to-transparent transition-opacity duration-300 group-hover:opacity-60 motion-reduce:transition-none" />
                    {/* Icon badge */}
                    <div className={`absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl border ${accent.border} ${accent.bg} shadow-sm transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-110`}>
                      <Icon className={`h-5 w-5 ${accent.icon}`} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-base font-bold tracking-tight text-dark transition-colors group-hover:text-primary-600 leading-tight">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600 line-clamp-3">
                      {service.shortDescription}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-primary-600">
                      Learn more
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            );
          })}

          {/* Last card: Book Appointment CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22,1,0.36,1], delay: MEDICAL_SERVICES.length * 0.06 }}
            className="rounded-[1.25rem] p-6 flex flex-col justify-between text-white"
            style={{ background: "linear-gradient(135deg, #0f766e 0%, #0f172a 100%)" }}
          >
            <div>
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-bold leading-tight text-white">
                Not sure where to start?
              </h3>
              <p className="mt-2 text-sm font-semibold text-white/75 leading-6">
                Speak with our team. We&apos;ll find the right care for you.
              </p>
            </div>
            <button
              onClick={onOpenBooking}
              type="button"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-bold transition-all hover:bg-white/90 hover:-translate-y-0.5"
              style={{ color: "#0f766e" }}
            >
              Book Appointment
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
