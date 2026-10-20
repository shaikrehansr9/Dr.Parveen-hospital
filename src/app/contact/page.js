"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Navigation,
  CheckCircle2,
  AlertCircle,
  Building,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { HOSPITAL_INFO } from "@/lib/constants";
import api from "@/services/api";
import { getWhatsAppUrl } from "@/lib/utils";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "General Consultation Inquiry",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg("Please enter your name and phone number.");
      return;
    }

    setIsLoading(true);

    try {
      await api.submitContactInquiry(formData);
      setIsSuccess(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "General Consultation Inquiry",
        message: "",
      });
    } catch (err) {
      setErrorMsg(err.message || "Failed to submit message.");
    } finally {
      setIsLoading(false);
    }
  };

  const whatsappUrl = getWhatsAppUrl(
    HOSPITAL_INFO.whatsappPhone,
    "Hello Dr. Parween's Hospital, I would like to get in touch regarding medical consultation."
  );

  return (
    <div className="py-12 lg:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="cyan" size="md" dot>
            Contact &amp; Location
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-950 tracking-tight">
            Reach Out to Dr. Parween&apos;s Hospital
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Conveniently located on FRS Road near Fateh Khan Dargah in Rajampet, Sangareddy. Our medical coordination team is ready to assist you.
          </p>
        </div>

        {/* 4 Contact Channels Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-600 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                Telephone Helpline
              </h4>
              <p className="text-lg font-bold text-navy-950 mt-1">{HOSPITAL_INFO.phone}</p>
              <p className="text-xs text-slate-500 mt-1">24x7 Emergency &amp; OPD Desk</p>
            </div>
            <a
              href={`tel:${HOSPITAL_INFO.rawPhone}`}
              className="pt-4 text-xs font-bold text-brand-600 hover:text-brand-700 block"
            >
              Call Right Now →
            </a>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                WhatsApp Chat
              </h4>
              <p className="text-lg font-bold text-navy-950 mt-1">Fast Response</p>
              <p className="text-xs text-slate-500 mt-1">Text for quick report verification</p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pt-4 text-xs font-bold text-emerald-600 hover:text-emerald-700 block"
            >
              Open WhatsApp Chat →
            </a>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                Email Inquiry
              </h4>
              <p className="text-sm font-bold text-navy-950 mt-1 break-all">
                {HOSPITAL_INFO.email}
              </p>
              <p className="text-xs text-slate-500 mt-1">For records and official inquiries</p>
            </div>
            <a
              href={`mailto:${HOSPITAL_INFO.email}`}
              className="pt-4 text-xs font-bold text-teal-600 hover:text-teal-700 block"
            >
              Send Email →
            </a>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                OPD Schedule
              </h4>
              <p className="text-sm font-bold text-navy-950 mt-1">Mon – Sat: 9am – 6pm</p>
              <p className="text-xs text-slate-500 mt-1">Sunday: Emergency Only (24/7)</p>
            </div>
            <span className="pt-4 text-xs font-bold text-amber-600 block">
              24-Hour Labor Ward
            </span>
          </div>
        </div>

        {/* Map & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Map Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 aspect-[16/11] w-full bg-slate-200">
              <iframe
                src={HOSPITAL_INFO.address.googleMapsEmbedUrl}
                title="Dr. Parween's Hospital Map"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-base font-bold text-navy-950 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-brand-600" />
                <span>Physical Address &amp; Directions</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {HOSPITAL_INFO.address.full}
              </p>
              <div className="pt-2">
                <a
                  href={HOSPITAL_INFO.address.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold text-xs transition-colors"
                >
                  <Navigation className="w-4 h-4 text-brand-600" />
                  <span>Open in Google Maps Navigation</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-6 bg-white p-7 sm:p-10 rounded-3xl shadow-xl border border-slate-200/80">
            <div className="space-y-2 mb-6">
              <h3 className="text-2xl font-bold text-navy-950">Send an Inquiry / Message</h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Have a non-urgent medical inquiry or need consultation guidance? We will respond promptly.
              </p>
            </div>

            {isSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-emerald-950">Message Transmitted!</h4>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  Thank you for reaching out to Dr. Parween’s Hospital. Our administration coordinator will contact you shortly.
                </p>
                <Button variant="outline" size="sm" onClick={() => setIsSuccess(false)}>
                  Send Another Note
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
                    label="Your Name"
                    name="name"
                    placeholder="Full name*"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    placeholder="Mobile number*"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Email Address (Optional)"
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />

                  <Input
                    label="Subject"
                    name="subject"
                    placeholder="e.g. Maternity Package"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <Textarea
                  label="Your Message / Query"
                  name="message"
                  placeholder="How can we assist you today? Please share any details..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full shadow-lg shadow-brand-500/25"
                  loading={isLoading}
                  icon={Send}
                >
                  Send Inquiry Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
