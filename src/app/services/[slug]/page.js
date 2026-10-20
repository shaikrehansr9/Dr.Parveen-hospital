"use client";

import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  HeartPulse,
  ShieldAlert,
  Activity,
  Stethoscope,
  Baby,
  Flame,
  FlaskConical,
  CheckCircle2,
  Calendar,
  Phone,
  MessageCircle,
  ArrowLeft,
  Clock,
  ShieldCheck,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { MEDICAL_SERVICES, HOSPITAL_INFO, LEAD_DOCTOR } from "@/lib/constants";
import { useBooking } from "@/context/BookingContext";
import { getWhatsAppUrl } from "@/lib/utils";

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params?.slug;
  const { openBookingModal } = useBooking();

  const service = MEDICAL_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4">
        <h2 className="text-2xl font-bold text-navy-950 mb-2">Service Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">
          The requested medical service could not be found or has moved.
        </p>
        <Button href="/services" variant="primary">
          Back to All Specialties
        </Button>
      </div>
    );
  }

  const iconMap = {
    "obstetrics-gynecology": HeartPulse,
    "high-risk-pregnancy": ShieldAlert,
    "laparoscopic-surgery": Activity,
    "internal-medicine": Stethoscope,
    "pediatrics-child-care": Baby,
    "physiotherapy-rehabilitation": Flame,
    "diagnostics-lab-tests": FlaskConical,
  };

  const Icon = iconMap[service.id] || HeartPulse;

  const whatsappUrl = getWhatsAppUrl(
    HOSPITAL_INFO.whatsappPhone,
    `Hello Dr. Parween's Hospital, I would like to inquire about ${service.title} consultations.`
  );

  const otherServices = MEDICAL_SERVICES.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <div className="py-10 lg:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-brand-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/services" className="hover:text-brand-600">
            Specialties
          </Link>
          <span>/</span>
          <span className="text-navy-950 font-bold">{service.title}</span>
        </div>

        {/* Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2">
              <Badge variant="cyan" size="md" dot>
                Specialized Department
              </Badge>
              <Badge variant="dark" size="sm">
                Sangareddy Facility
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight leading-tight">
              {service.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {service.fullDescription}
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={openBookingModal}
                icon={Calendar}
              >
                Book OPD Consultation
              </Button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Query</span>
              </a>

              <a
                href={`tel:${HOSPITAL_INFO.rawPhone}`}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-navy-900 font-semibold text-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-600" />
                <span>Call Desk</span>
              </a>
            </div>
          </div>

          {/* Department Graphic */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] w-full border-4 border-white bg-slate-900">
              <Image
                src={service.image}
                alt={service.title}
                fill
                quality={90}
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
                <div>
                  <span className="text-xs font-semibold text-brand-300 block">Available</span>
                  <span className="text-sm font-bold">Monday – Saturday</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-brand-500 text-white flex items-center justify-center shadow-lg">
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Procedures & Clinical Scopes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Detailed Procedures (8 cols) */}
          <div className="lg:col-span-8 bg-white p-7 sm:p-10 rounded-3xl border border-slate-200/80 shadow-md space-y-6">
            <h2 className="text-2xl font-bold text-navy-950">
              Procedures &amp; Clinical Focus Areas
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our clinical protocol strictly emphasizes patient safety, conservative medical therapy wherever indicated, and cutting-edge surgical techniques when intervention is needed.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {service.features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100"
                >
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-navy-900">{feature}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Administered by verified medical consultants with full post-care support.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-brand-50/70 border border-brand-200/80 space-y-2 mt-6">
              <h3 className="text-sm font-bold text-navy-950 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-600" />
                <span>Our Quality Guarantee</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                All procedures are conducted with high medical standards, certified sterilisation, transparent billing, and 24x7 emergency backup on-site.
              </p>
            </div>
          </div>

          {/* Sidebar: Doctor Spotlight & Helpline (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Consultant Spotlight */}
            <div className="bg-gradient-to-br from-navy-950 to-navy-900 text-white p-6 rounded-3xl shadow-xl border border-white/10 space-y-4">
              <Badge variant="glow" size="sm" dot>
                Department Lead
              </Badge>
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-white/10 shrink-0 border border-brand-400/30">
                  <Image
                    src="/assets/doctors/dr-parween-nobg.png"
                    alt={LEAD_DOCTOR.name}
                    fill
                    quality={90}
                    sizes="56px"
                    className="object-contain object-bottom"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{LEAD_DOCTOR.name}</h3>
                  <p className="text-xs text-brand-300">{LEAD_DOCTOR.degrees}</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Available for OPD consultations and second opinions regarding surgeries and high-risk maternity care.
              </p>
              <Button
                variant="primary"
                size="sm"
                onClick={openBookingModal}
                className="w-full text-xs font-bold"
              >
                Book with Dr. Parween
              </Button>
            </div>

            {/* Helpline Card */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span>24-Hour Emergency Desk</span>
              </div>
              <p className="text-xs text-slate-500">
                Facing severe pain, labor onset, or emergency complications? Reach our triage team right now.
              </p>
              <a
                href={`tel:${HOSPITAL_INFO.rawPhone}`}
                className="block text-center py-2.5 px-4 rounded-xl bg-red-600 text-white font-bold text-xs shadow-md shadow-red-600/20 hover:bg-red-500 transition-colors"
              >
                Call {HOSPITAL_INFO.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Other Specialties */}
        <div className="space-y-6 pt-8 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-navy-950">Other Medical Specialties</h3>
            <Link
              href="/services"
              className="text-xs font-bold text-brand-600 hover:text-brand-700"
            >
              View All 7 Services →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherServices.map((s) => (
              <Card
                key={s.id}
                className="p-6 bg-white border border-slate-200 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-base font-bold text-navy-950 hover:text-brand-600 transition-colors">
                    <Link href={`/services/${s.slug}`}>{s.title}</Link>
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{s.shortDescription}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-xs font-bold text-brand-600 hover:underline"
                  >
                    View Specialty →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
