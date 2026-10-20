"use client";

import React from "react";
import Topbar from "@/components/common/Topbar";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import EmergencyActionBar from "@/components/common/EmergencyActionBar";
import { BookingProvider, useBooking } from "@/context/BookingContext";

function ShellInner({ children }) {
  const { openBookingModal } = useBooking();

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />
      <Navbar onOpenBooking={openBookingModal} />
      <main className="flex-1">{children}</main>
      <Footer onOpenBooking={openBookingModal} />
      <EmergencyActionBar onOpenBooking={openBookingModal} />
    </div>
  );
}

export default function AppLayoutShell({ children }) {
  return (
    <BookingProvider>
      <ShellInner>{children}</ShellInner>
    </BookingProvider>
  );
}
