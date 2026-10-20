"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  User,
  Calendar,
  Stethoscope,
  Navigation,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { HOSPITAL_INFO, MEDICAL_SERVICES } from "@/lib/constants";
import api from "@/services/api";
import { getWhatsAppUrl } from "@/lib/utils";
import { getHospitalDateString } from "@/lib/date";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "Obstetrics & Gynecology",
    doctor: "Dr. Parween Saba",
    date: getHospitalDateString(),
    timeSlot: "10:00 AM",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successResponse, setSuccessResponse] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg("Please provide your name and phone number.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await api.bookAppointment(formData);
      setSuccessResponse(res);
      setFormData({
        name: "",
        phone: "",
        service: "Obstetrics & Gynecology",
        doctor: "Dr. Parween Saba",
        date: getHospitalDateString(),
        timeSlot: "10:00 AM",
        message: "",
      });
    } catch (err) {
      setErrorMsg(err.message || "Failed to submit booking request.");
    } finally {
      setIsLoading(false);
    }
  };

  const serviceOptions = MEDICAL_SERVICES.map((s) => ({
    value: s.title,
    label: s.title,
  }));

  const doctorOptions = [
    { value: "Dr. Parween Saba", label: "Dr. Parween Saba (Gynaecologist & Obstetrician)" },
    { value: "Dr. A. Rahman", label: "Dr. A. Rahman (Laparoscopic Surgeon)" },
    { value: "Dr. K. Srinivas Rao", label: "Dr. K. Srinivas Rao (Internal Medicine)" },
    { value: "Dr. S. Fatima", label: "Dr. S. Fatima (Pediatrician)" },
  ];

  const timeOptions = [
    { value: "10:00 AM", label: "10:00 AM" },
    { value: "11:30 AM", label: "11:30 AM" },
    { value: "02:30 PM", label: "02:30 PM" },
    { value: "04:00 PM", label: "04:00 PM" },
    { value: "05:30 PM", label: "05:30 PM" },
  ];

  const whatsappUrl = getWhatsAppUrl(
    HOSPITAL_INFO.whatsappPhone,
    "Hello Dr. Parween's Hospital, I would like to get in touch regarding medical consultation."
  );

  return (
    <section id="contact" className="py-16 lg:py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <Badge variant="cyan" size="md" dot>
            Booking Now & Location
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight leading-tight">
            We Are Available, Book Here Now
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Fill out the form below to lock in your appointment slot or visit our hospital premises in Sangareddy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Interactive Form (6 cols) */}
          <div className="lg:col-span-6 bg-white p-7 sm:p-10 rounded-3xl shadow-xl border border-slate-200/80">
            <div className="space-y-2 mb-6">
              <h3 className="text-2xl font-bold text-navy-950">Book An Appointment</h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Directly connected to our hospital front desk coordinator.
              </p>
            </div>

            {successResponse ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-emerald-950">
                    Appointment Request Logged!
                  </h4>
                  <p className="text-xs text-emerald-800 mt-1">
                    Your Token ID is: <strong>{successResponse.bookingToken}</strong>
                  </p>
                  <p className="text-xs text-emerald-700 mt-2">
                    Our desk executive will call your phone number to confirm the exact time slot.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSuccessResponse(null)}
                >
                  Book Another Appointment
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Patient Full Name"
                    name="name"
                    placeholder="Name*"
                    value={formData.name}
                    onChange={handleChange}
                    icon={User}
                    required
                  />

                  <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    placeholder="Phone*"
                    value={formData.phone}
                    onChange={handleChange}
                    icon={Phone}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="Select Specialist"
                    name="doctor"
                    options={doctorOptions}
                    value={formData.doctor}
                    onChange={handleChange}
                    icon={User}
                    required
                  />

                  <Select
                    label="Type of Service"
                    name="service"
                    options={serviceOptions}
                    value={formData.service}
                    onChange={handleChange}
                    icon={Stethoscope}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Appointment Date"
                    name="date"
                    type="date"
                    min={getHospitalDateString()}
                    value={formData.date}
                    onChange={handleChange}
                    icon={Calendar}
                    required
                  />

                  <Select
                    label="Select Time"
                    name="timeSlot"
                    options={timeOptions}
                    value={formData.timeSlot}
                    onChange={handleChange}
                    icon={Clock}
                    required
                  />
                </div>

                <Textarea
                  label="Health Details / Note (Optional)"
                  name="message"
                  placeholder="Any details or previous consultation records..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={2}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full shadow-lg shadow-brand-500/25"
                  loading={isLoading}
                  icon={Send}
                >
                  Get in Touch & Book
                </Button>
              </form>
            )}
          </div>

          {/* Right Column: Google Maps & Direct Contact Cards (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Embedded Responsive Google Map */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 aspect-[16/11] w-full bg-slate-200">
              <iframe
                src={HOSPITAL_INFO.address.googleMapsEmbedUrl}
                title="Dr. Parween's Hospital Map Location"
                aria-label="Dr. Parween's Hospital Map Location"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Quick Contact & Address Information Box */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-brand-500/10 text-brand-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-950">Hospital Address:</h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                    {HOSPITAL_INFO.address.full}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Helpline
                    </span>
                    <a
                      href={`tel:${HOSPITAL_INFO.rawPhone}`}
                      className="text-sm font-bold text-navy-950 hover:text-brand-600 transition-colors"
                    >
                      {HOSPITAL_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={HOSPITAL_INFO.address.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 text-brand-600" />
                    <span>Get Directions</span>
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
