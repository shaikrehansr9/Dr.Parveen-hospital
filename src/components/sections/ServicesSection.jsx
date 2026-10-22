"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
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
  X,
  CheckCircle2,
  Phone,
  MessageCircle,
  Clock,
  Sparkles,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { MEDICAL_SERVICES, HOSPITAL_INFO } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";

const ICON_MAP = {
  "obstetrics-gynecology": HeartPulse,
  "high-risk-pregnancy": ShieldAlert,
  "laparoscopic-surgery": Activity,
  "internal-medicine": Stethoscope,
  "pediatrics-child-care": Baby,
  "physiotherapy-rehabilitation": Dumbbell,
  "diagnostics-lab-tests": FlaskConical,
};

const ACCENT_BADGE_CLASSES = [
  "service-badge-blue",
  "service-badge-pink",
  "service-badge-blue",
  "service-badge-pink",
  "service-badge-blue",
  "service-badge-pink",
  "service-badge-blue",
];

export default function ServicesSection({ onOpenBooking }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [selectedService, setSelectedService] = useState(null);

  // Close service modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedService(null);
    };
    if (selectedService) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedService]);

  // Listen to open-service events dispatched from Navbar or elsewhere
  useEffect(() => {
    const handleOpenService = (event) => {
      const slug = event.detail?.slug;
      if (slug) {
        const found = MEDICAL_SERVICES.find((s) => s.slug === slug || s.id === slug);
        if (found) {
          setSelectedService(found);
        }
      }
    };

    window.addEventListener("open-service-modal", handleOpenService);
    return () => window.removeEventListener("open-service-modal", handleOpenService);
  }, []);

  const getServiceWhatsAppUrl = (service) => {
    return getWhatsAppUrl(
      HOSPITAL_INFO.whatsappPhone,
      `Hello Dr. Parween's Hospital, I would like to inquire about ${service.title} consultations.`
    );
  };

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-white pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24"
      ref={ref}
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-500/25 to-transparent" />
        <div className="absolute -right-32 top-1/4 h-[500px] w-[500px] rounded-full bg-brand-500/5 blur-3xl" />
        <div className="absolute -left-32 bottom-1/4 h-[400px] w-[400px] rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl space-y-3">
            <Badge variant="cyan" size="md" dot>
              Care Under One Roof
            </Badge>

            <h2 className="text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl lg:text-5xl">
              Specialized Care,{" "}
              <span className="services-accent-title">All in One Place</span>
            </h2>

            <p className="max-w-xl text-base font-medium leading-relaxed text-slate-600 sm:text-lg">
              Specialist-led healthcare for women, children, and families with 24/7 emergency response in Sangareddy.
            </p>
          </div>

          <div className="shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-4 py-2 text-xs font-bold text-brand-blue border border-brand-200">
              <Sparkles className="h-4 w-4" />
              <span>7 Dedicated Clinical Units</span>
            </span>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {MEDICAL_SERVICES.map((service, idx) => {
            const Icon = ICON_MAP[service.id] || HeartPulse;
            const badgeClass = ACCENT_BADGE_CLASSES[idx % ACCENT_BADGE_CLASSES.length];

            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: idx * 0.05,
                }}
                whileHover={{
                  y: -5,
                  scale: 1.015,
                  transition: { duration: 0.18, ease: "easeOut" },
                }}
                whileTap={{
                  scale: 0.995,
                  transition: { duration: 0.08 },
                }}
                onClick={() => setSelectedService(service)}
                className="service-card group relative flex flex-col overflow-hidden rounded-[1.25rem] bg-white border border-slate-200/90 shadow-sm hover:border-brand-300 hover:shadow-xl cursor-pointer transition-all duration-300"
              >
                {/* Image & Overlay */}
                <div className="relative h-56 overflow-hidden bg-slate-100 sm:h-60">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    quality={90}
                    sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,(max-width:1280px) 33vw,25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent transition-opacity duration-300 group-hover:opacity-75" />

                  {/* Icon badge */}
                  <div
                    className={`absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl border shadow-sm transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-110 ${badgeClass}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Click indicator */}
                  <div className="absolute top-3 right-3 rounded-lg bg-navy-950/70 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h3 className="service-card-title text-base font-bold leading-tight tracking-tight text-navy-950 group-hover:text-brand-blue transition-colors">
                      {service.title}
                    </h3>

                    <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Footer Action link */}
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-bold text-primary-600">
                    <span>Clinical Scope &amp; Care</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom Consultation CTA Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="service-cta-card mt-12 rounded-3xl p-6 sm:p-8 shadow-xl text-white flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-brand-pink-light backdrop-blur-md">
              Need Clinical Guidance?
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold">
              Not sure which specialist or department you need?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl">
              Our front-desk coordination doctors will guide you to the right department based on your symptoms or previous reports.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenBooking}
              className="service-cta-btn inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Consultation</span>
            </button>
            <a
              href={`tel:${HOSPITAL_INFO.rawPhone}`}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-3 text-sm font-bold text-white transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>Help Desk</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Service Detail Modal (Zero detail loss on single-page) */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl bg-white text-slate-800 shadow-2xl flex flex-col max-h-[90vh] border border-slate-200"
            >
              {/* Header Banner */}
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-navy-950 shrink-0">
                <Image
                  src={selectedService.image}
                  alt={selectedService.title}
                  fill
                  quality={90}
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-navy-950"
                  aria-label="Close service details"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Department Info */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="inline-block rounded-md bg-brand-blue px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white mb-2">
                    Specialized Department
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              {/* Scrollable Content Body */}
              <div className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1">
                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Department Overview
                  </h4>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {selectedService.fullDescription || selectedService.shortDescription}
                  </p>
                </div>

                {/* Clinical Scopes & Treatments */}
                {selectedService.features && selectedService.features.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Treatments &amp; Clinical Focus Areas
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedService.features.map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 rounded-xl bg-slate-50 border border-slate-100 p-3 text-xs sm:text-sm font-semibold text-slate-700"
                        >
                          <CheckCircle2 className="h-4 w-4 text-brand-blue shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Consultation Doctor Info */}
                <div className="rounded-2xl bg-brand-50/60 border border-brand-200/60 p-4 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue">
                      Lead Department Consultant
                    </span>
                    <p className="text-sm font-bold text-navy-950">
                      {selectedService.doctor || "Dr. Parween Saba & Specialist Medical Team"}
                    </p>
                    <p className="text-xs text-slate-600">
                      {selectedService.doctorDegrees || "MBBS, DGO (AMU) • Senior Consultant"}
                    </p>
                  </div>
                  <div className="shrink-0 flex items-center gap-1.5 text-xs font-bold text-brand-blue bg-white px-3 py-1.5 rounded-xl border border-brand-200 shadow-sm">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Mon – Sat OPD</span>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 shrink-0">
                <a
                  href={getServiceWhatsAppUrl(selectedService)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition-colors shadow-sm"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp Query</span>
                </a>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedService(null)}
                    className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Close
                  </button>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setSelectedService(null);
                      onOpenBooking?.();
                    }}
                    icon={Calendar}
                    className="shadow-md shadow-brand-500/25"
                  >
                    Book Consultation
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
