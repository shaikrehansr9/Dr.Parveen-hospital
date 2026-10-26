"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Phone, MessageCircle } from "lucide-react";

import {
  HOSPITAL_FAQS,
  HOSPITAL_INFO,
} from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1];

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
};

const faqList = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.08,
    },
  },
};

const faqItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease },
  },
};

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex((previous) => (previous === index ? -1 : index));
  };

  const whatsappUrl = getWhatsAppUrl(
    HOSPITAL_INFO.whatsappPhone,
    "Hello Dr. Parween's Hospital, I have a question regarding treatments and appointments."
  );

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      {/* Subtle section divider */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/40 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left column */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="min-w-0 space-y-6 lg:col-span-5"
          >
            {/* Heading */}
            <div className="space-y-4">
              <span className="faq-badge inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold">
                <span className="faq-badge-dot h-2 w-2 rounded-full" />
                Got a Question
              </span>

              <h2 className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-dark sm:text-4xl lg:text-5xl">
                Frequently Asked Questions
              </h2>

              <div className="faq-accent-bar h-1 w-16 origin-left rounded-full" />

              <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Find quick answers about our medical services,
                treatments, appointments, hospital hours, and
                patient care for your convenience.
              </p>
            </div>

            {/* Contact card */}
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.12 }}
              className="faq-contact-card max-w-sm rounded-2xl p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-6"
            >
              <div className="flex items-start gap-3">
                <div className="faq-contact-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                  <MessageCircle className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <h3 className="font-heading text-base font-extrabold text-dark">
                    Still have questions?
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    Call our reception desk or message us on
                    WhatsApp for guidance about treatments and
                    appointments.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <a
                  href={`tel:${HOSPITAL_INFO.rawPhone}`}
                  className="faq-call-btn inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>Call Desk</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="faq-whatsapp-btn inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column: FAQ accordion */}
          <motion.div
            variants={faqList}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="min-w-0 space-y-4 lg:col-span-7 lg:pt-2"
          >
            {HOSPITAL_FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              const answerId = `faq-answer-${index}`;

              return (
                <motion.div
                  key={index}
                  variants={faqItem}
                  className={`faq-accordion-item min-w-0 overflow-hidden rounded-2xl ${
                    isOpen ? "is-open" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    className="flex w-full select-none items-start justify-between gap-3 p-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-primary-600 sm:gap-4 sm:p-5 lg:p-6"
                  >
                    <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                      <span className="faq-number-badge mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-extrabold">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <h3 className="faq-question-text min-w-0 break-words pt-1 font-heading text-base font-bold leading-relaxed sm:text-lg">
                        {faq.question}
                      </h3>
                    </div>

                    <motion.span
                      animate={{
                        rotate: isOpen ? 180 : 0,
                      }}
                      transition={{ duration: 0.25, ease }}
                      className="faq-chevron-wrap flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.span>
                  </button>

                  {/* Animated answer panel */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        id={answerId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.35, ease },
                          opacity: { duration: 0.22 },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-slate-200/60 px-5 pb-6 pt-4 sm:px-6 sm:pb-6 sm:pl-[4.5rem]">
                          <p className="break-words text-sm leading-7 text-slate-600 sm:text-base">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}