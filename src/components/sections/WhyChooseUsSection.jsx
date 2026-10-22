"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Award,
  Heart,
  Building2,
  Clock,
  CheckCircle2,
  ReceiptText,
  ArrowRight,
} from "lucide-react";
import { TRUST_PILLARS } from "@/lib/constants";

const ICON_MAP = {
  Award,
  Heart,
  Building2,
  ReceiptCheck: ReceiptText,
  Clock,
  CheckCircle2,
};

const smoothEase = [0.22, 1, 0.36, 1];

const headerVariants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: smoothEase,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 45,
    scale: 0.96,
  },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      delay: index * 0.12,
      ease: smoothEase,
    },
  }),
};

export default function WhyChooseUsSection({ onOpenBooking }) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-60px",
  });

  return (
    <section
      id="why-us"
      ref={ref}
      className="relative isolate overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      {/* Animated background decoration */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <motion.div
          className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-500/5 blur-3xl"
          animate={{
            x: [0, -25, 0],
            y: [0, 25, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -bottom-20 -left-24 h-80 w-80 rounded-full bg-secondary/5 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mx-auto mb-12 max-w-3xl text-center sm:mb-14"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              inView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.8 }
            }
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: smoothEase,
            }}
            className="why-us-badge mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
          >
            <motion.span
              className="why-us-badge-dot h-2 w-2 rounded-full"
              animate={{
                scale: [1, 1.35, 1],
                opacity: [1, 0.65, 1],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            Why Choose Us
          </motion.span>

          <h2 className="text-3xl font-extrabold tracking-tight text-dark sm:text-4xl lg:text-5xl">
            Excellence You Can{" "}
            <span className="text-primary-600">Trust</span>
          </h2>

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={
              inView
                ? { width: 76, opacity: 1 }
                : { width: 0, opacity: 0 }
            }
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: smoothEase,
            }}
            className="why-us-accent-bar mx-auto mt-5 h-1 rounded-full"
          />

          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            At Dr. Parween&apos;s Hospital, every aspect of care is designed to
            put you first — with proven expertise, modern infrastructure, and
            heartfelt compassion.
          </p>
        </motion.div>

        {/* Trust pillars grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {TRUST_PILLARS.map((pillar, idx) => {
            const Icon = ICON_MAP[pillar.icon] || CheckCircle2;
            const isBlue = idx % 2 === 0;

            return (
              <motion.div
                key={pillar.title}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                whileHover={{
                  y: -9,
                  transition: {
                    duration: 0.25,
                    ease: smoothEase,
                  },
                }}
                className={`why-us-card group relative overflow-hidden rounded-2xl p-6 sm:p-7 ${
                  isBlue ? "why-us-card-blue" : "why-us-card-pink"
                }`}
              >
                {/* Animated top accent */}
                <motion.div
                  className={`absolute left-0 top-0 h-1 w-full origin-left ${
                    isBlue ? "bg-primary-600" : "bg-secondary"
                  }`}
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{
                    duration: 0.65,
                    delay: 0.25 + idx * 0.12,
                    ease: smoothEase,
                  }}
                />

                {/* Subtle hover glow */}
                <motion.div
                  className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl ${
                    isBlue ? "bg-brand-500/10" : "bg-secondary/10"
                  }`}
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Icon */}
                <motion.div
                  className={`relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm ${
                    isBlue ? "why-us-icon-blue" : "why-us-icon-pink"
                  }`}
                  whileHover={{
                    rotate: [0, -8, 8, 0],
                    scale: 1.08,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <Icon className="h-6 w-6 text-white" strokeWidth={2.1} />
                </motion.div>

                {/* Card content */}
                <h3 className="relative text-lg font-bold text-dark transition-colors duration-300 sm:text-xl">
                  {pillar.title}
                </h3>

                <p className="relative mt-3 text-sm leading-7 text-slate-600">
                  {pillar.description}
                </p>

                {/* Animated bottom indicator */}
                <motion.div
                  className={`mt-5 h-0.5 w-10 rounded-full ${
                    isBlue ? "bg-primary-600" : "bg-secondary"
                  }`}
                  initial={{ width: 32 }}
                  whileHover={{ width: 64 }}
                  transition={{ duration: 0.3, ease: smoothEase }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Animated appointment banner */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          animate={
            inView
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 35, scale: 0.98 }
          }
          transition={{
            duration: 0.75,
            delay: 0.35,
            ease: smoothEase,
          }}
          className="why-us-banner relative mt-12 overflow-hidden rounded-2xl p-7 shadow-xl sm:mt-14 sm:p-9 lg:p-10"
        >
          {/* Moving highlight */}
          <motion.div
            className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent"
            animate={{ x: ["-120%", "420%"] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
          />

          {/* Decorative circles */}
          <motion.div
            className="pointer-events-none absolute -right-8 -top-20 h-48 w-48 rounded-full border border-white/20"
            animate={{ rotate: 360 }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <motion.div
            className="pointer-events-none absolute -right-1 -top-12 h-32 w-32 rounded-full border border-white/15"
            animate={{ rotate: -360 }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <div className="relative flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
            <div className="max-w-2xl">
              <h3 className="text-xl font-bold leading-snug text-white sm:text-2xl lg:text-3xl">
                Ready to experience exceptional care?
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-white/90 sm:text-base">
                Book your appointment today — Mon to Sat, 9AM – 6PM.
              </p>
            </div>

            <motion.button
              type="button"
              onClick={onOpenBooking}
              whileHover={{
                scale: 1.04,
                y: -3,
              }}
              whileTap={{ scale: 0.97 }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 18,
              }}
              className="why-us-banner-btn group inline-flex shrink-0 items-center justify-center gap-3 rounded-xl px-6 py-4 text-sm font-bold shadow-lg transition-shadow duration-300 hover:shadow-xl sm:px-7"
            >
              Book Appointment

              <motion.span
                className="inline-flex"
                animate={{ x: [0, 3, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
