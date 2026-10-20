"use client";

import React, { useState } from "react";
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
  ArrowRight,
  CheckCircle2,
  Calendar,
  Search,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { MEDICAL_SERVICES } from "@/lib/constants";
import { useBooking } from "@/context/BookingContext";

export default function ServicesPage() {
  const { openBookingModal } = useBooking();
  const [searchQuery, setSearchQuery] = useState("");

  const iconMap = {
    "obstetrics-gynecology": HeartPulse,
    "high-risk-pregnancy": ShieldAlert,
    "laparoscopic-surgery": Activity,
    "internal-medicine": Stethoscope,
    "pediatrics-child-care": Baby,
    "physiotherapy-rehabilitation": Flame,
    "diagnostics-lab-tests": FlaskConical,
  };

  const filteredServices = MEDICAL_SERVICES.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="py-10 lg:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="cyan" size="md" dot>
            Clinical Specialties & Care Units
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-950 tracking-tight">
            Specialized Departments &amp; Medical Services
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Every department at Dr. Parween&apos;s Hospital is equipped with dedicated medical specialists, modern diagnostic equipment, and 24/7 emergency response protocols.
          </p>

          {/* Quick Search Bar */}
          <div className="max-w-md mx-auto pt-4 relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search treatments (e.g. Normal delivery, Laparoscopy, Ultrasound)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 shadow-sm"
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => {
            const Icon = iconMap[service.id] || HeartPulse;

            return (
              <Card
                key={service.id}
                className="group flex flex-col bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    quality={90}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />

                  <div className="absolute top-4 left-4 w-9 h-9 rounded-xl bg-white/90 backdrop-blur-md text-navy-950 font-extrabold text-xs flex items-center justify-center shadow-md">
                    0{index + 1}
                  </div>

                  <div className="absolute -bottom-5 right-5 w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-brand-400 text-white flex items-center justify-center shadow-lg shadow-brand-500/30">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <div className="p-7 flex-1 flex flex-col justify-between pt-8 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-navy-950 group-hover:text-brand-600 transition-colors">
                      <Link href={`/services/${service.slug}`}>{service.title}</Link>
                    </h3>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                      {service.shortDescription}
                    </p>

                    <div className="pt-4 space-y-2 border-t border-slate-100 mt-4">
                      {service.features.map((f, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 gap-2">
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-xs font-bold text-navy-900 hover:text-brand-600 flex items-center gap-1.5 transition-colors"
                    >
                      <span>Full Department Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 text-brand-500" />
                    </Link>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={openBookingModal}
                      icon={Calendar}
                    >
                      Book OPD
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8">
            <p className="text-slate-500 text-sm">
              No service matching &quot;{searchQuery}&quot;. Please contact our helpline directly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
