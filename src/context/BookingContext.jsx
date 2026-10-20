"use client";

import React, { createContext, useContext, useState } from "react";
import AppointmentModal from "@/components/common/AppointmentModal";

const BookingContext = createContext({
  openBookingModal: () => {},
  closeBookingModal: () => {},
});

export function BookingProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openBookingModal = () => setIsOpen(true);
  const closeBookingModal = () => setIsOpen(false);

  return (
    <BookingContext.Provider value={{ openBookingModal, closeBookingModal }}>
      {children}
      <AppointmentModal isOpen={isOpen} onClose={closeBookingModal} />
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
