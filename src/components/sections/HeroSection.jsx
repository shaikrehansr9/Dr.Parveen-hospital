"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Stethoscope,
  Calendar,
} from "lucide-react";
import { HOSPITAL_INFRASTRUCTURE } from "@/lib/constants";

const HERO_IMAGE =
  "/assets/hero/Golden%20Hour%20Maternity%20Portrait.png";

const PANEL_BUTTON_CLASS =
  "hero-panel-btn sm:h-11 sm:text-xs";

const PANEL_BUTTON_LABEL_CLASS =
  "flex items-center px-5 sm:px-6";

const PANEL_BUTTON_ARROW_CLASS =
  "hero-panel-btn-arrow";

const INTERIOR_SLIDES = HOSPITAL_INFRASTRUCTURE.filter((item) => {
  const imagePath = String(item.image || "").toLowerCase();
  const title = String(item.title || "").toLowerCase();
  const id = String(item.id || "").toLowerCase();

  return (
    id !== "hospital-exterior" &&
    !imagePath.includes("reception") &&
    !imagePath.includes("pamplat") &&
    !imagePath.includes("pamphlet") &&
    !imagePath.includes("a5") &&
    !title.includes("reception") &&
    !title.includes("pamphlet")
  );
}).map((item) => ({
  id: item.id,
  image: item.image,
  alt: item.title,
  position: "center center",
}));

const HERO_SLIDES = [
  {
    id: "maternity-hero",
    image: HERO_IMAGE,
    alt: "Expectant mother in warm golden-hour light",
    position: "76% center",
  },
  ...INTERIOR_SLIDES,
];

export default function HeroSection({ onOpenBooking }) {
  const ref = useRef(null);
  const touchStartX = useRef(null);
  const navigationTargetRef = useRef(0);
  const requestIdRef = useRef(0);

  const inView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReducedMotion = useReducedMotion();

  const [activeSlide, setActiveSlide] = useState(0);

  // Preload before changing slides so the previous image stays visible.
  const showSlide = (index) => {
    if (typeof window === "undefined" || HERO_SLIDES.length < 2) return;

    const nextIndex =
      ((index % HERO_SLIDES.length) + HERO_SLIDES.length) %
      HERO_SLIDES.length;

    navigationTargetRef.current = nextIndex;

    const requestId = ++requestIdRef.current;
    const preload = new window.Image();

    preload.onload = () => {
      if (requestId !== requestIdRef.current) return;
      setActiveSlide(nextIndex);
    };

    preload.onerror = () => {
      if (requestId !== requestIdRef.current) return;

      // Keep the current image instead of switching to a broken image.
      navigationTargetRef.current = activeSlide;
    };

    preload.src = HERO_SLIDES[nextIndex].image;

    // Cached images may already be complete.
    if (preload.complete && preload.naturalWidth > 0) {
      setActiveSlide(nextIndex);
    }
  };

  const nextSlide = () => {
    showSlide(navigationTargetRef.current + 1);
  };

  const previousSlide = () => {
    showSlide(navigationTargetRef.current - 1);
  };

  // The timer restarts after a slide changes.
  useEffect(() => {
    if (HERO_SLIDES.length < 2) return undefined;

    const timer = window.setTimeout(() => {
      showSlide((activeSlide + 1) % HERO_SLIDES.length);
    }, 3500);

    return () => window.clearTimeout(timer);
  }, [activeSlide]);

  const handleTouchStart = (event) => {
    touchStartX.current = event.changedTouches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;

    const difference =
      event.changedTouches[0].clientX - touchStartX.current;

    if (difference > 50) {
      previousSlide();
    } else if (difference < -50) {
      nextSlide();
    }

    touchStartX.current = null;
  };

  const activeImage = HERO_SLIDES[activeSlide];

  return (
    <section
      id="home"
      ref={ref}
      className="relative isolate overflow-visible bg-white"
    >
      {/* Hero image slider */}
      <div
        className="hero-slider-wrap group relative h-[390px] sm:h-[470px] md:h-[520px] lg:h-[600px] xl:h-[620px]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        aria-label="Hospital image slider"
      >
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={activeImage.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.5,
              ease: "linear",
            }}
          >
            <Image
              src={activeImage.image}
              alt={activeImage.alt}
              fill
              priority={activeSlide === 0}
              quality={95}
              unoptimized
              sizes="100vw"
              className="object-cover"
              style={{
                objectPosition: activeImage.position || "center center",
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Subtle overlay to retain photograph detail */}
        <div
          className="hero-overlay-gradient pointer-events-none absolute inset-0"
          aria-hidden="true"
        />

        {/* Main heading and appointment button */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8 lg:px-10">
          <motion.div
            initial={
              prefersReducedMotion ? false : { opacity: 0, x: -18 }
            }
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full max-w-[760px]"
          >
            <h1 className="hero-headline md:whitespace-nowrap">
              Comprehensive Care
            </h1>

            <button
              type="button"
              onClick={onOpenBooking}
              className="hero-appointment-btn mt-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 sm:mt-7 sm:px-6 sm:text-sm"
            >
              <span>Appointment Request</span>
              <ArrowRight className="h-5 w-5 shrink-0" />
            </button>
          </motion.div>
        </div>

        {/* Navigation arrows */}
        {HERO_SLIDES.length > 1 && (
          <>
            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous hospital image"
              className="hero-nav-arrow left-3 h-10 w-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-5 sm:h-11 sm:w-11"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next hospital image"
              className="hero-nav-arrow right-3 h-10 w-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-5 sm:h-11 sm:w-11"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Slide indicators */}
            <div className="absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5">
              {HERO_SLIDES.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => showSlide(index)}
                  aria-label={`Show slide ${index + 1} of ${HERO_SLIDES.length}`}
                  aria-pressed={activeSlide === index}
                  className={`hero-indicator-dot ${activeSlide === index ? "is-active" : ""}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Three coordinated action panels */}
      <div className="relative z-30 mx-auto -mt-5 max-w-[1095px] px-4 sm:-mt-7 lg:-mt-[86px]">
        <div className="grid grid-cols-1 overflow-hidden rounded-sm shadow-xl md:grid-cols-3">
          {/* Our Locations */}
          <div className="hero-panel-locations flex min-h-[140px] min-w-0 flex-col items-start gap-4 px-4 pb-5 pt-5 sm:px-5 lg:px-[22px]">
            <div className="flex min-w-0 items-center gap-2.5 text-white sm:gap-3">
              <MapPin className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
              <p className="whitespace-nowrap text-sm font-bold leading-tight sm:text-base">
                Our Locations
              </p>
            </div>

            <Link href="/contact" className={PANEL_BUTTON_CLASS}>
              <span className={PANEL_BUTTON_LABEL_CLASS}>
                Learn More
              </span>
              <span className={PANEL_BUTTON_ARROW_CLASS}>
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>

          {/* Your First Visit */}
          <div className="hero-panel-visit flex min-h-[140px] min-w-0 flex-col items-start gap-4 px-4 pb-5 pt-5 sm:px-5 lg:px-[22px]">
            <div className="flex min-w-0 items-center gap-2.5 text-white sm:gap-3">
              <Stethoscope className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
              <p className="whitespace-nowrap text-sm font-bold leading-tight sm:text-base">
                Your First Visit
              </p>
            </div>

            <Link href="/about" className={PANEL_BUTTON_CLASS}>
              <span className={PANEL_BUTTON_LABEL_CLASS}>
                Learn More
              </span>
              <span className={PANEL_BUTTON_ARROW_CLASS}>
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>

          {/* Appointment Request */}
          <div className="hero-panel-appointment flex min-h-[140px] min-w-0 flex-col items-start gap-4 px-4 pb-5 pt-5 sm:px-5 lg:px-[22px]">
            <div className="flex min-w-0 items-center gap-2.5 text-white sm:gap-3">
              <Calendar className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
              <p className="whitespace-nowrap text-sm font-bold leading-tight sm:text-base">
                Appointment Request
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenBooking}
              className={PANEL_BUTTON_CLASS}
            >
              <span className={PANEL_BUTTON_LABEL_CLASS}>
                Learn More
              </span>
              <span className={PANEL_BUTTON_ARROW_CLASS}>
                <ArrowRight className="h-4 w-4" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Space below the panels */}
      <div className="h-6 sm:h-8 lg:h-12" />
    </section>
  );
}
