"use client";

import React from "react";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import DoctorSection from "@/components/sections/DoctorSection";
import CabinGallerySection from "@/components/sections/CabinGallerySection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FaqSection from "@/components/sections/FaqSection";
import ContactSection from "@/components/sections/ContactSection";
import { useBooking } from "@/context/BookingContext";

export default function HomePage() {
  const { openBookingModal } = useBooking();

  return (
    <div className="home-page">
      <HeroSection onOpenBooking={openBookingModal} />
      <AboutSection onOpenBooking={openBookingModal} />
      <ServicesSection onOpenBooking={openBookingModal} />
      <WhyChooseUsSection onOpenBooking={openBookingModal} />
      <DoctorSection onOpenBooking={openBookingModal} />
      {/* <CabinGallerySection onOpenBooking={openBookingModal} /> */}
      <TestimonialsSection />
      <FaqSection onOpenBooking={openBookingModal} />
      <ContactSection />
    </div>
  );
}
