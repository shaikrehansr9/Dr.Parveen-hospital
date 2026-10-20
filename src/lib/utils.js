import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines conditional class names with Tailwind merge
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Clean phone number for tel: links
 */
export function cleanPhoneNumber(phone) {
  if (!phone) return "";
  return phone.replace(/[^\d+]/g, "");
}

/**
 * Format WhatsApp click-to-chat URL with pre-filled message
 */
export function getWhatsAppUrl(phone = "919170150500", customText = "") {
  const cleanNum = phone.replace(/[^\d]/g, "");
  const defaultMsg = "Hello Dr. Parween's Hospital, I would like to inquire about medical consultations and appointments.";
  const text = encodeURIComponent(customText || defaultMsg);
  return `https://wa.me/${cleanNum}?text=${text}`;
}

/**
 * Quick date formatter
 */
export function formatDate(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
