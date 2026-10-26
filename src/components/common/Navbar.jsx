"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

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

const SERVICE_ICONS = {
  "obstetrics-gynecology": HeartPulse,
  "high-risk-pregnancy": ShieldAlert,
  "laparoscopic-surgery": Activity,
  "internal-medicine": Stethoscope,
  "pediatrics-child-care": Baby,
  "physiotherapy-rehabilitation": Dumbbell,
  "diagnostics-lab-tests": FlaskConical,
};

const NAV_ITEMS = [
  { href: "#home", label: "Home", id: "home" },
  { href: "#about", label: "About", id: "about" },
  { href: "#services", label: "Services", id: "services", dropdown: true },
  // { href: "#why-us", label: "Why Us", id: "why-us" },
  { href: "#doctors", label: "Doctors", id: "doctors" },
  // { href: "#gallery", label: "Facilities", id: "gallery" },
  { href: "#testimonials", label: "Reviews", id: "testimonials" },
  { href: "#faq", label: "FAQ", id: "faq" },
  { href: "#contact", label: "Contact", id: "contact" },
];

const smoothEase = [0.22, 1, 0.36, 1];

export default function Navbar({ onOpenBooking }) {
  const pathname = usePathname();

  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const closeTimer = useRef(null);
  const mobileMenuButtonRef = useRef(null);
  const mobileCloseButtonRef = useRef(null);

  /* Scroll shadow detection */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ScrollSpy IntersectionObserver for Single Page */
  useEffect(() => {
    const sectionIds = [
      "home",
      "about",
      "services",
      "why-us",
      "doctors",
      "gallery",
      "testimonials",
      "faq",
      "contact",
    ];

    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sectionElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    sectionElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname]);

  /* Hash sync on initial load */
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");

      if (hash) {
        setActiveSection(hash);
      }
    }
  }, []);

  /* Mobile keyboard handling and focus management */
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

      if (event.key !== "Tab") return;

      const drawer = document.getElementById("mobile-navigation-drawer");
      const focusable = drawer?.querySelectorAll(
        'a[href], button:not([disabled])'
      );

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
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      mobileMenuButtonRef.current?.focus();
    };
  }, [mobileOpen]);

  /* Clean up dropdown timers */
  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
      }
    };
  }, []);

  const closeMenu = () => {
    setMobileOpen(false);
    setDropdownOpen(false);
  };

  const handleDropdownEnter = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }

    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }

    closeTimer.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 180);
  };

  const scrollToAnchor = useCallback(
    (targetId) => {
      closeMenu();
      setActiveSection(targetId);

      if (pathname !== "/") {
        window.location.href = `/#${targetId}`;
        return;
      }

      const element = document.getElementById(targetId);

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `#${targetId}`);
      }
    },
    [pathname]
  );

  const handleNavClick = (event, item) => {
    event.preventDefault();
    scrollToAnchor(item.id);
  };

  const handleServiceSelect = (event, service) => {
    event.preventDefault();

    scrollToAnchor("services");

    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("open-service-modal", {
          detail: { slug: service.slug },
        })
      );
    }, 300);
  };

  const renderDesktopLink = (item) => {
    const active = activeSection === item.id;

    return (
      <a
        key={item.href}
        href={item.href}
        onClick={(event) => handleNavClick(event, item)}
        className={`hospital-navbar__link ${
          active ? "is-active" : ""
        }`}
        aria-current={active ? "page" : undefined}
        aria-haspopup={item.dropdown ? "true" : undefined}
        aria-expanded={item.dropdown ? dropdownOpen : undefined}
      >
        <span>{item.label}</span>

        {item.dropdown && (
          <ChevronDown
            className={`hospital-navbar__link-icon ${
              dropdownOpen ? "is-open" : ""
            }`}
          />
        )}
      </a>
    );
  };

  const renderMobileLink = (item) => {
    const active = activeSection === item.id;

    return (
      <a
        key={item.href}
        href={item.href}
        onClick={(event) => handleNavClick(event, item)}
        className={`hospital-mobile-link ${
          active ? "is-active" : ""
        }`}
        aria-current={active ? "page" : undefined}
      >
        <span>{item.label}</span>
        <ArrowRight size={20} aria-hidden="true" />
      </a>
    );
  };

  return (
    <>
      <header
        className={`hospital-navbar ${
          scrolled ? "is-scrolled" : ""
        }`}
      >
        <div className="hospital-navbar__container">
          <div className="hospital-navbar__inner">
            {/* Logo */}
            <div className="hospital-navbar__logo">
              <a
                href="#home"
                aria-label="Dr. Parween's Hospital — Home"
                className="hospital-navbar__logo-link"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToAnchor("home");
                }}
              >
                <div className="hospital-navbar__logo-frame">
                  <Image
                    src="/assets/logo/logo.png"
                    alt={HOSPITAL_INFO.name}
                    fill
                    priority
                    sizes="(max-width: 480px) 185px, (max-width: 1023px) 210px, 224px"
                    quality={95}
                    className="hospital-navbar__logo-image"
                  />
                </div>
              </a>
            </div>

            {/* Desktop navigation */}
            <nav
              className="hospital-navbar__desktop-nav"
              aria-label="Main navigation"
            >
              {NAV_ITEMS.map((item) => {
                if (!item.dropdown) {
                  return renderDesktopLink(item);
                }

                return (
                  <div
                    key={item.href}
                    className="hospital-navbar__services"
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                    onFocusCapture={handleDropdownEnter}
                    onBlurCapture={(event) => {
                      if (
                        !event.currentTarget.contains(
                          event.relatedTarget
                        )
                      ) {
                        handleDropdownLeave();
                      }
                    }}
                  >
                    {renderDesktopLink(item)}

                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          className="hospital-navbar__dropdown"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          transition={{
                            duration: 0.18,
                            ease: smoothEase,
                          }}
                          onMouseEnter={handleDropdownEnter}
                          onMouseLeave={handleDropdownLeave}
                          id="services-dropdown"
                        >
                          <div className="hospital-navbar__dropdown-header">
                            <div>
                              <p className="hospital-navbar__dropdown-heading">
                                Medical Departments
                              </p>

                              <p className="hospital-navbar__dropdown-subheading">
                                Explore our specialist care in Sangareddy
                              </p>
                            </div>

                            <a
                              href="#services"
                              className="hospital-navbar__dropdown-all"
                              onClick={(event) => {
                                event.preventDefault();
                                scrollToAnchor("services");
                              }}
                            >
                              All Services
                              <ArrowRight size={17} />
                            </a>
                          </div>

                          <div className="hospital-navbar__dropdown-list">
                            {MEDICAL_SERVICES.map((service, index) => (
                              <motion.div
                                key={service.id}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  duration: 0.18,
                                  delay: index * 0.02,
                                  ease: smoothEase,
                                }}
                              >
                                <a
                                  href="#services"
                                  onClick={(event) =>
                                    handleServiceSelect(event, service)
                                  }
                                  className="hospital-navbar__service-link"
                                >
                                  {/* Service image */}
                                  <span className="hospital-navbar__service-thumbnail">
                                    <Image
                                      src={service.image}
                                      alt=""
                                      fill
                                      sizes="48px"
                                      className="object-cover"
                                    />
                                  </span>

                                  {/* Service information */}
                                  <span className="min-w-0 flex-1">
                                    <span className="hospital-navbar__service-title block">
                                      {service.title}
                                    </span>

                                    <span className="hospital-navbar__service-description block">
                                      {service.shortDescription}
                                    </span>
                                  </span>
                                </a>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            {/* Desktop booking action */}
            <button
              type="button"
              onClick={onOpenBooking}
              className="hospital-navbar__booking"
            >
              <Calendar
                size={18}
                className="hospital-navbar__booking-icon"
                aria-hidden="true"
              />

              <span className="hospital-navbar__booking-text">
                Book Appointment
              </span>
            </button>

            {/* Mobile menu trigger */}
            <div className="hospital-navbar__mobile-actions">
              <button
                ref={mobileMenuButtonRef}
                type="button"
                onClick={() => setMobileOpen(true)}
                className="hospital-navbar__menu-toggle"
                aria-label="Open mobile navigation menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation-drawer"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div
            className="hospital-mobile-portal"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Drawer"
          >
            {/* Backdrop */}
            <motion.div
              className="hospital-mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24, ease: smoothEase }}
              onClick={closeMenu}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              id="mobile-navigation-drawer"
              className="hospital-mobile-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: smoothEase }}
            >
              {/* Drawer header */}
              <div className="hospital-mobile-drawer__header">
                <a
                  href="#home"
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToAnchor("home");
                  }}
                  className="hospital-navbar__logo-link"
                >
                  <Image
                    src="/assets/logo/logo.png"
                    alt={HOSPITAL_INFO.name}
                    width={180}
                    height={48}
                    quality={95}
                    className="hospital-navbar__logo-image"
                  />
                </a>

                <button
                  ref={mobileCloseButtonRef}
                  type="button"
                  onClick={closeMenu}
                  className="hospital-mobile-drawer__close"
                  aria-label="Close menu"
                >
                  <X size={23} />
                </button>
              </div>

              {/* Emergency contact pill */}
              <div className="hospital-mobile-drawer__emergency">
                <span className="hospital-mobile-drawer__emergency-label">
                  24/7 Emergency Available
                </span>

                <a
                  href={`tel:${HOSPITAL_INFO.rawPhone}`}
                  className="hospital-mobile-drawer__call-now"
                >
                  Call Now
                </a>
              </div>

              {/* Main mobile links */}
              <nav
                className="hospital-mobile-drawer__nav"
                aria-label="Mobile navigation links"
              >
                <div className="hospital-mobile-drawer__nav-list">
                  {[
                    { href: "#home", label: "Home", id: "home" },
                    {
                      href: "#about",
                      label: "About Hospital",
                      id: "about",
                    },
                  ].map(renderMobileLink)}

                  {/* Mobile services accordion */}
                  <div className="hospital-mobile-services">
                    <a
                      href="#services"
                      onClick={(event) => {
                        event.preventDefault();
                        scrollToAnchor("services");
                      }}
                      className={`hospital-mobile-services__heading ${
                        activeSection === "services" ? "is-active" : ""
                      }`}
                    >
                      <span>Medical Specialties</span>

                      <span className="hospital-mobile-services__count">
                        {MEDICAL_SERVICES.length}
                      </span>
                    </a>

                    <div className="hospital-mobile-services__list">
                      {MEDICAL_SERVICES.map((service) => {
                        const Icon =
                          SERVICE_ICONS[service.id] || HeartPulse;

                        return (
                          <a
                            key={service.id}
                            href="#services"
                            onClick={(event) =>
                              handleServiceSelect(event, service)
                            }
                            className="hospital-mobile-service-link"
                          >
                            <Icon size={20} aria-hidden="true" />
                            <span>{service.title}</span>
                          </a>
                        );
                      })}
                    </div>
                  </div>

                  {[
                    {
                      href: "#why-us",
                      label: "Why Choose Us",
                      id: "why-us",
                    },
                    {
                      href: "#doctors",
                      label: "Our Specialist Doctors",
                      id: "doctors",
                    },
                    {
                      href: "#gallery",
                      label: "Hospital Facilities & Cabins",
                      id: "gallery",
                    },
                    {
                      href: "#testimonials",
                      label: "Patient Reviews",
                      id: "testimonials",
                    },
                    {
                      href: "#faq",
                      label: "Frequently Asked Questions",
                      id: "faq",
                    },
                    {
                      href: "#contact",
                      label: "Contact & Location",
                      id: "contact",
                    },
                  ].map(renderMobileLink)}
                </div>
              </nav>

              {/* Mobile actions */}
              <div className="hospital-mobile-drawer__footer">
                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    onOpenBooking();
                  }}
                  className="hospital-mobile-drawer__booking"
                >
                  <Calendar size={20} aria-hidden="true" />
                  <span>Book Appointment</span>
                  <ArrowRight size={19} aria-hidden="true" />
                </button>

                <div className="hospital-mobile-drawer__actions">
                  <a
                    href={`tel:${HOSPITAL_INFO.rawPhone}`}
                    className="hospital-mobile-drawer__contact-action"
                  >
                    <Phone size={19} aria-hidden="true" />
                    Call Desk
                  </a>

                  <a
                    href={getWhatsAppUrl(HOSPITAL_INFO.whatsappPhone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hospital-mobile-drawer__contact-action"
                  >
                    <MessageCircle size={19} aria-hidden="true" />
                    WhatsApp
                  </a>
                </div>

                <div className="hospital-mobile-drawer__detail">
                  <MapPin
                    size={18}
                    className="shrink-0 text-brand-blue"
                    aria-hidden="true"
                  />
                  <span>
                    H NO: 3, FRS ROAD, Sangareddy, Telangana
                  </span>
                </div>

                <div className="hospital-mobile-drawer__detail">
                  <Clock
                    size={18}
                    className="shrink-0 text-brand-blue"
                    aria-hidden="true"
                  />
                  <span>
                    Mon–Sat: 9AM–6PM | Sunday: Emergency 24/7
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}