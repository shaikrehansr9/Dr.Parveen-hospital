"use client";

import React, { useState } from "react";
import {
  Calendar,
  User,
  Phone,
  Clock,
  CheckCircle2,
  AlertTriangle,
  MessageCircle,
  Stethoscope,
  Sparkles,
} from "lucide-react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { HOSPITAL_INFO, MEDICAL_SERVICES } from "@/lib/constants";
import api from "@/services/api";
import { getWhatsAppUrl } from "@/lib/utils";
import { getHospitalDateString } from "@/lib/date";

export default function AppointmentModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "Obstetrics & Gynecology",
    doctor: "Dr. Parween Saba",
    date: getHospitalDateString(),
    timeSlot: "Morning (11:00 AM – 02:00 PM)",
    message: "",
    isEmergency: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage(
        "Please enter both patient full name and valid phone number."
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.bookAppointment(formData);

      if (response && response.success) {
        setConfirmation(response);
      } else {
        throw new Error(
          response.message || "Failed to book appointment."
        );
      }
    } catch (err) {
      setErrorMessage(
        err.message || "Something went wrong. Please call directly."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setConfirmation(null);
    setErrorMessage("");
    onClose();
  };

  const serviceOptions = MEDICAL_SERVICES.map((s) => ({
    value: s.title,
    label: s.title,
  }));

  const doctorOptions = [
    {
      value: "Dr. Parween Saba",
      label:
        "Dr. Parween Saba — Senior Consultant Obstetrician & Gynecologist",
    },
  ];

  const timeSlotOptions = [
    {
      value: "Morning (11:00 AM – 02:00 PM)",
      label: "Morning (11:00 AM – 02:00 PM)",
    },
    {
      value: "Evening (07:00 PM – 09:00 PM)",
      label: "Evening (07:00 PM – 09:00 PM)",
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title={
        confirmation
          ? "Appointment Request Received!"
          : "Book Doctor Appointment"
      }
      subtitle={
        confirmation
          ? "Your token has been allocated. Our team will contact you shortly."
          : "Consult with Dr. Parween Saba & our multi-specialty clinical team."
      }
      maxWidth="max-w-xl"
    >
      {confirmation ? (
        <div className="text-center py-4 space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Booking Reference Token
            </span>

            <div className="text-3xl font-extrabold text-navy-950 tracking-wider font-mono bg-slate-50 border border-slate-200 py-3 px-6 rounded-2xl max-w-xs mx-auto">
              {confirmation.bookingToken}
            </div>

            <p className="text-sm text-slate-600 max-w-md mx-auto pt-2">
              {confirmation.message}
            </p>
          </div>

          {/* Quick Summary Pill */}
          <div className="p-4 rounded-2xl bg-brand-50/70 border border-brand-200/80 text-left text-xs space-y-1.5 max-w-md mx-auto">
            <div className="flex justify-between">
              <span className="text-slate-500">Patient:</span>
              <span className="font-bold text-navy-900">
                {formData.name}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Contact:</span>
              <span className="font-bold text-navy-900">
                {formData.phone}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Specialty:</span>
              <span className="font-bold text-navy-900">
                {formData.service}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Doctor:</span>
              <span className="font-bold text-navy-900">
                {formData.doctor}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Preferred Slot:</span>
              <span className="font-bold text-navy-900">
                {formData.date} • {formData.timeSlot.split(" ")[0]}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={getWhatsAppUrl(
                HOSPITAL_INFO.whatsappPhone,
                `Hello Dr. Parween's Hospital, I just booked an appointment online for ${formData.name}. Token: ${confirmation.bookingToken}. Please confirm my slot.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Confirm on WhatsApp</span>
            </a>

            <Button
              variant="outline"
              size="md"
              onClick={handleResetAndClose}
              className="w-full sm:w-auto"
            >
              Close & Done
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <div className="contact-alert-error p-3.5 rounded-xl text-xs flex items-center gap-2">
              <AlertTriangle className="contact-alert-icon w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Patient Full Name"
              name="name"
              placeholder="e.g. Ayesha Begum"
              value={formData.name}
              onChange={handleChange}
              icon={User}
              required
            />

            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="e.g. 9170150500"
              value={formData.phone}
              onChange={handleChange}
              icon={Phone}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Specialty Department"
              name="service"
              options={serviceOptions}
              value={formData.service}
              onChange={handleChange}
              icon={Stethoscope}
              required
            />

            <Select
              label="Consultant Specialist"
              name="doctor"
              options={doctorOptions}
              value={formData.doctor}
              onChange={handleChange}
              icon={User}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Preferred Date"
              name="date"
              type="date"
              min={getHospitalDateString()}
              value={formData.date}
              onChange={handleChange}
              icon={Calendar}
              required
            />

            <Select
              label="Preferred Time Slot"
              name="timeSlot"
              options={timeSlotOptions}
              value={formData.timeSlot}
              onChange={handleChange}
              icon={Clock}
              required
            />
          </div>

          <Textarea
            label="Symptoms / Medical Concern (Optional)"
            name="message"
            placeholder="Briefly mention your health concern, weeks of pregnancy, or reason for consultation..."
            value={formData.message}
            onChange={handleChange}
            rows={2}
          />

          {/* Emergency Priority Toggle */}
          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/90 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4" />
              </div>

              <div>
                <span className="text-xs font-bold text-amber-950 block">
                  Urgent / Maternity Case?
                </span>

                <span className="text-[11px] text-amber-800">
                  Flags emergency triage for priority hospital desk response
                </span>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                name="isEmergency"
                checked={formData.isEmergency}
                onChange={handleChange}
                className="sr-only peer"
              />

              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
            </label>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant={formData.isEmergency ? "emergency" : "primary"}
              size="lg"
              className="w-full shadow-lg"
              loading={isLoading}
              icon={Sparkles}
            >
              {formData.isEmergency
                ? "Submit Priority Emergency Request"
                : "Confirm Appointment Request"}
            </Button>
          </div>

          <p className="text-[11px] text-slate-400 text-center pt-1">
            For critical life-threatening situations, call immediately at{" "}
            <a
              href={`tel:${HOSPITAL_INFO.rawPhone}`}
              className="text-brand-600 font-bold underline"
            >
              {HOSPITAL_INFO.phone}
            </a>
          </p>
        </form>
      )}
    </Modal>
  );
}