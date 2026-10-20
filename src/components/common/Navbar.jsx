"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Phone,
  Calendar,
  ChevronDown,
  HeartPulse,
  Activity,
  Baby,
  Stethoscope,
  FlaskConical,
  ShieldAlert,
  ArrowRight,
  MessageCircle,
  MapPin,
  Clock,
  Dumbbell,
} from "lucide-react";
import { HOSPITAL_INFO, MEDICAL_SERVICES } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";
import { isActiveNavigationLink } from "@/lib/navigation";

const SERVICE_ICONS = {
  "obstetrics-gynecology": HeartPulse,
  "high-risk-pregnancy": ShieldAlert,
  "laparoscopic-surgery": Activity,
  "internal-medicine": Stethoscope,
  "pediatrics-child-care": Baby,
  "physiotherapy-rehabilitation": Dumbbell,
  "diagnostics-lab-tests": FlaskConical,
};



export default function Navbar({ onOpenBooking }) {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const closeTimer = useRef(null);
  const mobileMenuButtonRef = useRef(null);
  const mobileCloseButtonRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const updateHash = () => setCurrentHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    window.addEventListener("popstate", updateHash);
    return () => {
      window.removeEventListener("hashchange", updateHash);
      window.removeEventListener("popstate", updateHash);
    };
  }, []);

  // Keep the drawer and specialty menu in sync with route changes.
  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
    setCurrentHash(window.location.hash);
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, [pathname]);

  // Escape closes the mobile drawer and prevents background-page scrolling while it is open.
  useEffect(() => {
    if (!mobileOpen) return undefined;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    mobileCloseButtonRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setDropdownOpen(false);
        return;
      }
      if (event.key === "Tab") {
        const drawer = document.getElementById("mobile-navigation-drawer");
        const focusable = drawer?.querySelectorAll('a[href], button:not([disabled])');
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      mobileMenuButtonRef.current?.focus();
    };
  }, [mobileOpen]);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  // Close dropdown after a short delay on pointer leave so movement into it feels continuous.
  const handleDropdownEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  };
  const handleDropdownLeave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 160);
  };

  const closeMenu = () => setMobileOpen(false);
  const isActiveLink = (href) => isActiveNavigationLink(href, pathname, currentHash);
  const desktopLinkClass = (href) => `px-3 py-2 text-sm font-extrabold rounded-lg hover:text-primary-600 hover:bg-primary-50 hover:ring-1 hover:ring-primary-200/80 hover:shadow-sm hover:shadow-primary-600/10 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 ease-out ${isActiveLink(href) ? "bg-primary-100 text-primary-800 ring-1 ring-primary-300 shadow-sm shadow-primary-600/10" : "text-dark-700"}`;
  const mobileLinkClass = (href) => `flex items-center justify-between rounded-xl p-3 font-extrabold hover:bg-primary-50 hover:text-primary-700 hover:ring-1 hover:ring-primary-200/80 hover:shadow-sm active:scale-[0.99] transition-all duration-200 ease-out ${isActiveLink(href) ? "bg-primary-100 text-primary-800 ring-1 ring-primary-300" : "text-dark-800"}`;

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-sm shadow-dark/5 border-b border-slate-100/80"
            : "bg-white border-b border-slate-100"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[68px] items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex shrink-0 items-center gap-2 group" aria-label="Dr. Parween's Hospital Home">
              <div className="relative h-12 w-48 transition-all duration-200 group-hover:opacity-90">
                <Image
                  src="/assets/logo/logo.png"
                  alt={HOSPITAL_INFO.name}
                  fill
                  className="object-contain object-left"
                  priority
                  sizes="192px"
                  quality={95}
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1" role="navigation" aria-label="Main navigation">
              <Link href="/" className={desktopLinkClass("/")} aria-current={isActiveLink("/") ? "page" : undefined}>
                Home
              </Link>
              <Link href="/about" className={desktopLinkClass("/about")} aria-current={isActiveLink("/about") ? "page" : undefined}>
                About
              </Link>

              {/* Services Dropdown */}
              <div
                ref={dropdownRef}
                className="relative"
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
                onFocusCapture={handleDropdownEnter}
                onBlurCapture={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) handleDropdownLeave();
                }}
              >
                <Link
                  href="/services"
                  className={`flex items-center gap-1 ${desktopLinkClass("/services")}`} aria-current={isActiveLink("/services") ? "page" : undefined} aria-expanded={dropdownOpen} aria-haspopup="true" aria-controls="services-dropdown"
                >
                  Specialties
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180 text-primary-600" : "text-slate-400"
                    }`}
                  />
                </Link>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.12, ease: "easeOut" }}
                      onMouseEnter={handleDropdownEnter}
                      onMouseLeave={handleDropdownLeave}
                      id="services-dropdown"
                      className="absolute left-0 top-full mt-2 w-[min(400px,calc(100vw-2rem))] rounded-2xl border border-slate-100 bg-white shadow-xl shadow-dark/10 overflow-hidden z-50"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 bg-primary-50/60 px-4 py-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-primary-700">Medical Departments</span>
                        <Link href="/services" className="flex items-center gap-1 text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors">
                          All Services <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>

                      <div className="p-2 space-y-0.5 max-h-80 overflow-y-auto">
                        {MEDICAL_SERVICES.map((s) => {
                          const Icon = SERVICE_ICONS[s.id] || HeartPulse;
                          return (
                            <Link
                              key={s.id}
                              href={`/services/${s.slug}`}
                              onClick={() => setDropdownOpen(false)}
                              className={`group flex items-start gap-3 rounded-xl p-2.5 hover:bg-primary-50/70 transition-all duration-150 ${isActiveLink(`/services/${s.slug}`) ? "bg-primary-50 text-primary-700" : ""}`}
                              aria-current={isActiveLink(`/services/${s.slug}`) ? "page" : undefined}
                            >
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all duration-150">
                                <Icon className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-xs font-bold text-dark-800 group-hover:text-primary-700 transition-colors leading-tight">
                                  {s.title}
                                </p>
                                <p className="mt-0.5 line-clamp-1 text-[11px] font-semibold text-slate-500">{s.shortDescription}</p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/doctors" className={desktopLinkClass("/doctors")} aria-current={isActiveLink("/doctors") ? "page" : undefined}>
                Doctors
              </Link>
              <Link href="/gallery" className={desktopLinkClass("/gallery")} aria-current={isActiveLink("/gallery") ? "page" : undefined}>
                Gallery
              </Link>
              <Link href="/#testimonials" className={desktopLinkClass("/#testimonials")} aria-current={isActiveLink("/#testimonials") ? "page" : undefined}>
                Reviews
              </Link>
              <Link href="/contact" className={desktopLinkClass("/contact")} aria-current={isActiveLink("/contact") ? "page" : undefined}>
                Contact
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <a
                href={`tel:${HOSPITAL_INFO.rawPhone}`}
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-dark-700 hover:bg-primary-50 hover:text-primary-700 hover:shadow-sm hover:shadow-primary-600/10 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 ease-out"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                  <Phone className="h-3.5 w-3.5" />
                </div>
                <div className="text-left">
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Call Us</span>
                  <span className="text-xs font-bold text-dark-800">{HOSPITAL_INFO.phone}</span>
                </div>
              </a>

              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex h-9 items-center gap-2 rounded-xl px-3 text-xs font-bold text-white shadow-md shadow-primary-600/20 transition-all duration-200 hover:shadow-lg hover:shadow-primary-600/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                style={{ backgroundColor: "#0f766e" }}
              >
                <Calendar className="h-4 w-4" />
                Book Appointment
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={`tel:${HOSPITAL_INFO.rawPhone}`}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary-100 bg-primary-50 text-primary-700 transition-all active:scale-95"
                aria-label="Call hospital"
              >
                <Phone className="h-4 w-4" />
              </a>
              <button
                type="button"
                ref={mobileMenuButtonRef}
                onClick={() => { setDropdownOpen(false); setMobileOpen(true); }}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-dark-700 transition-all hover:bg-slate-200 active:scale-95"
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation-drawer"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-dark/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              id="mobile-navigation-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
              className="relative z-10 flex h-full w-full max-w-[340px] flex-col overflow-y-auto bg-white shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-primary-50 to-white p-5">
                <div className="relative h-10 w-40">
                  <Image src="/assets/logo/logo.png" alt={HOSPITAL_INFO.name} fill className="object-contain object-left" sizes="160px" quality={95} />
                </div>
                <button
                  ref={mobileCloseButtonRef}
                  type="button"
                  onClick={closeMenu}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Emergency banner */}
              <div className="flex items-center justify-between bg-emergency-light border-b border-red-100 px-5 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-ping rounded-full bg-emergency" />
                  <span className="text-xs font-bold text-emergency">24/7 Emergency Available</span>
                </div>
                <a href={`tel:${HOSPITAL_INFO.rawPhone}`} className="text-xs font-bold text-emergency underline">
                  Call Now
                </a>
              </div>

              {/* Navigation */}
              <nav className="flex-1 space-y-1 p-4" role="navigation" aria-label="Mobile navigation">
                {[
                  { href: "/", label: "Home" },
                  { href: "/about", label: "About Hospital" },
                ].map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeMenu}
                    className={mobileLinkClass(href)}
                    aria-current={isActiveLink(href) ? "page" : undefined}
                  >
                    {label}
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  </Link>
                ))}

                {/* Services section */}
                <div className="rounded-xl border border-slate-100 overflow-hidden">
                  <Link
                    href="/services"
                    onClick={closeMenu}
                    className={`flex items-center justify-between p-3 font-extrabold hover:bg-primary-50 hover:text-primary-700 hover:ring-1 hover:ring-primary-200/80 hover:shadow-sm active:scale-[0.99] transition-all duration-200 ease-out ${isActiveLink("/services") ? "bg-primary-50 text-primary-700 ring-1 ring-primary-200/80" : "text-dark-800 bg-primary-50/50"}`}
                    aria-current={isActiveLink("/services") ? "page" : undefined}
                  >
                    <span>Medical Specialties</span>
                    <span className="rounded-full bg-primary-100 px-2 py-0.5 text-xs font-bold text-primary-700">7</span>
                  </Link>
                  <div className="divide-y divide-slate-50 bg-slate-50/50">
                    {MEDICAL_SERVICES.map((s) => {
                      const Icon = SERVICE_ICONS[s.id] || HeartPulse;
                      return (
                        <Link
                          key={s.id}
                          href={`/services/${s.slug}`}
                          onClick={closeMenu}
                          className={`flex min-h-11 items-center gap-2.5 px-4 py-3 text-sm font-bold hover:text-primary-600 hover:bg-primary-50/70 hover:shadow-sm active:scale-[0.99] transition-all duration-200 ease-out ${isActiveLink(`/services/${s.slug}`) ? "bg-primary-50 text-primary-700" : "text-dark-700"}`}
                          aria-current={isActiveLink(`/services/${s.slug}`) ? "page" : undefined}
                        >
                          <Icon className="h-3.5 w-3.5 text-primary-500 shrink-0" />
                          {s.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {[
                  { href: "/doctors", label: "Our Doctors" },
                  { href: "/gallery", label: "Gallery" },
                  { href: "/#testimonials", label: "Patient Reviews" },
                  { href: "/#faqs", label: "FAQs" },
                  { href: "/contact", label: "Contact & Location" },
                ].map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeMenu}
                    className={mobileLinkClass(href)}
                    aria-current={isActiveLink(href) ? "page" : undefined}
                  >
                    {label}
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  </Link>
                ))}
              </nav>

              {/* Drawer Footer */}
              <div className="space-y-3 border-t border-slate-100 bg-slate-50/50 p-4">
                <button
                  type="button"
                  onClick={() => { closeMenu(); onOpenBooking(); }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] active:opacity-90"
                  style={{ backgroundColor: "#0f766e" }}
                >
                  <Calendar className="h-4 w-4" />
                  Book Appointment
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${HOSPITAL_INFO.rawPhone}`}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-primary-100 bg-primary-50 py-3 text-xs font-bold text-primary-700 transition-all hover:bg-primary-100"
                  >
                    <Phone className="h-4 w-4" />
                    Call Desk
                  </a>
                  <a
                    href={getWhatsAppUrl(HOSPITAL_INFO.whatsappPhone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-100 bg-emerald-50 py-3 text-xs font-bold text-emerald-700 transition-all hover:bg-emerald-100"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <MapPin className="h-3 w-3 shrink-0" />
                  H NO: 3, FRS ROAD, Sangareddy, Telangana
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Clock className="h-3 w-3 shrink-0" />
                  Mon–Sat: 9AM–6PM | Sunday: Emergency 24/7
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
