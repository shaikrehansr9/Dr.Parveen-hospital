"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Phone,
  CheckCircle2,
  Star,
  Award,
  Clock,
  Sparkles,
  Stethoscope,
  HeartPulse,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { LEAD_DOCTOR, HOSPITAL_INFO } from "@/lib/constants";
import { useBooking } from "@/context/BookingContext";

export default function DoctorsPage() {
  const { openBookingModal } = useBooking();

  const allDoctors = [
    {
      name: LEAD_DOCTOR.name,
      title: "Senior Consultant Obstetrician & Gynecologist",
      degrees: "MBBS, DGO (AMU)",
      experience: "Senior Consultant",
      availability: "Pamphlet OP timings: 11:00 AM–02:00 PM and 07:00 PM–09:00 PM",
      image: "/assets/doctors/dr-parween.png",
      bio: "Dr. Parween Saba is listed as a Senior Consultant Obstetrician & Gynecologist and Infertility Specialist.",
      isDirector: true,
      services: [
        "Normal Delivery",
        "Caesarean Section",
        "High-Risk Pregnancy",
        "Infertility",
        "PCOD",
        "Ovarian Cyst",
        "Laparoscopic Surgeries",
        "Family Planning",
      ],
    },
  ];

  return (
    <div className="py-10 lg:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="cyan" size="md" dot>
            Medical Faculty & Consultants
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-950 tracking-tight">
            Our Specialist Doctors
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Meet the accomplished clinical specialists at Dr. Parween&apos;s Hospital dedicated to delivering ethical, patient-first healthcare in Sangareddy.
          </p>
        </div>

        {/* Doctor Profiles List */}
        <div className="space-y-8">
          {allDoctors.map((doc, idx) => (
            <Card
              key={idx}
              className={`p-6 sm:p-8 rounded-3xl transition-all duration-300 border ${
                doc.isDirector
                  ? "bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white border-white/10 shadow-2xl"
                  : "bg-white border-slate-200/80 shadow-md text-slate-800"
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Image */}
                <div className="lg:col-span-4 flex justify-center">
                  <div
                    className={`relative w-full max-w-xs aspect-[3.5/4] rounded-2xl overflow-hidden ${
                      doc.isDirector
                        ? "bg-gradient-to-b from-brand-900/50 to-navy-950 border border-brand-400/30"
                        : "bg-slate-100 border border-slate-200"
                    }`}
                  >
                    <Image
                      src={doc.image}
                      alt={doc.name}
                      fill
                      quality={90}
                      sizes="(max-width: 1024px) 90vw, 320px"
                      className="object-cover object-top"
                    />

                    {doc.isDirector && (
                      <div className="absolute top-3 left-3">
                        <Badge variant="glow" size="sm" dot>
                          Medical Director
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="lg:col-span-8 space-y-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`text-xs font-bold uppercase tracking-wider ${
                          doc.isDirector ? "text-brand-300" : "text-brand-600"
                        }`}
                      >
                        {doc.title}
                      </span>
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                          doc.isDirector
                            ? "bg-white/10 text-slate-200"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {doc.experience}
                      </span>
                    </div>

                    <h2
                      className={`text-2xl sm:text-3xl font-extrabold mt-1 tracking-tight ${
                        doc.isDirector ? "text-white" : "text-navy-950"
                      }`}
                    >
                      {doc.name}
                    </h2>
                    <p
                      className={`text-xs sm:text-sm font-semibold font-mono mt-0.5 ${
                        doc.isDirector ? "text-brand-200" : "text-slate-500"
                      }`}
                    >
                      {doc.degrees}
                    </p>
                  </div>

                  <p
                    className={`text-sm leading-relaxed ${
                      doc.isDirector ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    {doc.bio}
                  </p>

                  {/* Clinical Scope */}
                  <div>
                    <h4
                      className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                        doc.isDirector ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      Key Focus Areas & Treatments
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {doc.services.map((item, i) => (
                        <div
                          key={i}
                          className={`flex items-center gap-2 text-xs p-2 rounded-xl ${
                            doc.isDirector
                              ? "bg-white/5 border border-white/10 text-slate-200"
                              : "bg-slate-50 border border-slate-100 text-slate-700"
                          }`}
                        >
                          <CheckCircle2
                            className={`w-3.5 h-3.5 shrink-0 ${
                              doc.isDirector ? "text-brand-400" : "text-teal-600"
                            }`}
                          />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Schedule & Action */}
                  <div
                    className={`pt-4 border-t flex flex-wrap items-center justify-between gap-4 ${
                      doc.isDirector ? "border-white/10" : "border-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <Clock
                        className={`w-4 h-4 ${
                          doc.isDirector ? "text-brand-300" : "text-brand-600"
                        }`}
                      />
                      <span className={doc.isDirector ? "text-slate-300" : "text-slate-600"}>
                        OPD Hours: <strong>{doc.availability}</strong>
                      </span>
                    </div>

                    <Button
                      variant={doc.isDirector ? "primary" : "luxury"}
                      size="md"
                      onClick={openBookingModal}
                      icon={Calendar}
                    >
                      Book Consultation
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
