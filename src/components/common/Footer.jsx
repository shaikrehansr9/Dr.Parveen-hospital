"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Heart,
  ChevronUp,
  MessageCircle,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { HOSPITAL_INFO, MEDICAL_SERVICES } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";

export default function Footer({ onOpenBooking }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const whatsappUrl = getWhatsAppUrl(
    HOSPITAL_INFO.whatsappPhone,
    "Hello Dr. Parween's Hospital, I would like to inquire about medical consultations."
  );

  return (
    <footer className="bg-navy-950 text-slate-300 relative overflow-hidden pt-16 pb-24 md:pb-12 border-t border-white/10">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Emergency CTA Strip */}
        <div className="bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-white/10 rounded-3xl p-6 sm:p-8 mb-12 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-brand-500/15 border border-brand-400/30 flex items-center justify-center text-brand-400 shrink-0 mx-auto sm:mx-0">
                <Clock className="w-7 h-7" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
                  24x7 Emergency Care &amp; Labor Ward
                </span>

                <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                  Need Urgent Medical Attention or Maternity Care?
                </h3>

                <p className="text-sm text-slate-400 mt-1">
                  Our emergency triage and labor ward are staffed 24 hours a
                  day, 7 days a week.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0 w-full sm:w-auto">
              <a
                href={`tel:${HOSPITAL_INFO.rawPhone}`}
                className="footer-emergency-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-bold text-sm transition-all active:scale-95"
              >
                <Phone className="w-4 h-4 animate-pulse" />
                <span>Call {HOSPITAL_INFO.phone}</span>
              </a>

              <Button
                variant="primary"
                size="lg"
                onClick={onOpenBooking}
                icon={Calendar}
                className="w-full sm:w-auto shadow-lg shadow-brand-500/25"
              >
                Request Appointment
              </Button>
            </div>
          </div>
        </div>

        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Column 1: Hospital Info & Branding */}
          <div className="lg:col-span-4 space-y-5">
            <div className="relative h-14 w-60">
              <Image
                src="/assets/logo/logo-white.png"
                alt={HOSPITAL_INFO.name}
                fill
                sizes="240px"
                quality={95}
                className="object-contain object-left"
              />
            </div>

            <p className="text-sm text-slate-400 leading-relaxed text-justify">
              Dr Parween’s Hospital is a state-of-the-art healthcare facility
              located in Sangareddy, Telangana. Our mission is to provide
              ethical, transparent, and compassionate care to every patient,
              with leading expertise in maternity, gynecology, and
              multispecialty medicine.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/20 flex items-center justify-center transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={`tel:${HOSPITAL_INFO.rawPhone}`}
                className="w-10 h-10 rounded-xl bg-brand-500/10 hover:bg-brand-500 text-brand-400 hover:text-white border border-brand-500/20 flex items-center justify-center transition-all"
                aria-label="Call Hospital"
              >
                <Phone className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${HOSPITAL_INFO.email}`}
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/10 flex items-center justify-center transition-all"
                aria-label="Email Hospital"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Patient Care Specialties */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-400" />
              <span>Patient Care</span>
            </h4>

            <ul className="space-y-2.5 text-sm">
              {MEDICAL_SERVICES.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                      window.history.pushState(null, "", "#services");
                      setTimeout(() => {
                        window.dispatchEvent(
                          new CustomEvent("open-service-modal", { detail: { slug: s.slug } })
                        );
                      }, 300);
                    }}
                    className="text-slate-400 hover:text-brand-300 transition-colors flex items-center gap-2 group cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-brand-400 transition-transform group-hover:translate-x-1" />
                    <span>{s.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-400" />
              <span>Quick Links</span>
            </h4>

            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
                    window.history.pushState(null, "", "#home");
                  }}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                    window.history.pushState(null, "", "#about");
                  }}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                    window.history.pushState(null, "", "#services");
                  }}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Specialties &amp; Care
                </a>
              </li>
              <li>
                <a
                  href="#why-us"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("why-us")?.scrollIntoView({ behavior: "smooth" });
                    window.history.pushState(null, "", "#why-us");
                  }}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Why Choose Us
                </a>
              </li>
              <li>
                <a
                  href="#doctors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("doctors")?.scrollIntoView({ behavior: "smooth" });
                    window.history.pushState(null, "", "#doctors");
                  }}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Specialist Doctors
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
                    window.history.pushState(null, "", "#gallery");
                  }}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Cabins &amp; OT Gallery
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" });
                    window.history.pushState(null, "", "#testimonials");
                  }}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Patient Reviews
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
                    window.history.pushState(null, "", "#faq");
                  }}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    window.history.pushState(null, "", "#contact");
                  }}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Contact &amp; Location
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Schedule Info */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-pink" />
              <span>Contact &amp; Visit</span>
            </h4>

            <div className="space-y-3.5 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-1" />
                <p className="leading-relaxed text-xs sm:text-sm">
                  {HOSPITAL_INFO.address.line1}, <br />
                  {HOSPITAL_INFO.address.line2}, <br />
                  {HOSPITAL_INFO.address.city}, {HOSPITAL_INFO.address.state} –{" "}
                  {HOSPITAL_INFO.address.pincode}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <a
                  href={`tel:${HOSPITAL_INFO.rawPhone}`}
                  className="hover:text-brand-300 font-semibold text-white transition-colors"
                >
                  {HOSPITAL_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <a
                  href={`mailto:${HOSPITAL_INFO.email}`}
                  className="hover:text-brand-300 text-xs text-slate-300 transition-colors break-all"
                >
                  {HOSPITAL_INFO.email}
                </a>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-brand-400" />
                  <span>OPD Consultation Hours:</span>
                </div>

                <p className="text-xs text-slate-400 pl-5">
                  Mon – Sat: 9:00 AM – 6:00 PM <br />
                  <span className="footer-sunday-highlight font-medium">
                    Sunday: Emergency Only (24/7)
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="text-center sm:text-left">
            <span>© 2025 </span>
            <strong className="text-white font-semibold">DR Parweens.</strong>
            <span> All Rights Reserved by </span>
            <a
              href="https://originsoftwares.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-brand-300 font-semibold underline underline-offset-2 transition-colors"
            >
              OriginSoftwares
            </a>
          </p>

          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">
              Terms &amp; Conditions
            </span>

            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-500 hover:text-white text-slate-300 flex items-center justify-center transition-all ml-2"
              aria-label="Back to top"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}