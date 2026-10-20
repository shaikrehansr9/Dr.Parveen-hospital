import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { forwardToHospitalBackend } from "@/lib/backendForwarder";
import { isValidPhoneNumber, readJsonRequest, readStringField } from "@/lib/formRequest";

function jsonResponse(payload, status = 200) {
  return NextResponse.json(payload, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request) {
  const parsedRequest = await readJsonRequest(request);
  if (!parsedRequest.ok) {
    return jsonResponse({ success: false, message: parsedRequest.message }, parsedRequest.status);
  }

  const body = parsedRequest.data;
  const fields = {
    name: readStringField(body, "name", { label: "Name", maxLength: 120, required: true }),
    phone: readStringField(body, "phone", { label: "Phone number", maxLength: 32, required: true }),
    email: readStringField(body, "email", { label: "Email address", maxLength: 254 }),
    subject: readStringField(body, "subject", { label: "Subject", maxLength: 200, defaultValue: "General Inquiry" }),
    message: readStringField(body, "message", { label: "Message", maxLength: 5000, required: true }),
  };
  const invalidField = Object.values(fields).find((field) => !field.ok);
  if (invalidField) {
    return jsonResponse({ success: false, message: invalidField.message }, 400);
  }

  const { name, phone, email, subject, message } = Object.fromEntries(
    Object.entries(fields).map(([key, field]) => [key, field.value])
  );

  if (!isValidPhoneNumber(phone)) {
    return jsonResponse({ success: false, message: "Please provide a valid phone number." }, 400);
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse({ success: false, message: "Please provide a valid email address." }, 400);
  }

  const ticketId = `TKT-${Date.now().toString(36).toUpperCase()}-${randomBytes(4).toString("hex").toUpperCase()}`;
  const inquiryRecord = {
    ticketId,
    name,
    phone,
    email,
    subject,
    message,
    timestamp: new Date().toISOString(),
  };

  const forwarded = await forwardToHospitalBackend("/api/contact", inquiryRecord);
  if (!forwarded.success) {
    return jsonResponse({ success: false, message: forwarded.message }, forwarded.status);
  }

  const backendData = forwarded.data;
  const backendTicketId = typeof backendData.ticketId === "string" && backendData.ticketId.trim()
    ? backendData.ticketId.trim().slice(0, 100)
    : ticketId;

  return jsonResponse({
    success: true,
    ticketId: backendTicketId,
    message: "Your message was sent to the hospital successfully. A hospital representative will contact you shortly.",
  });
}
