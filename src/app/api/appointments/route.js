import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { forwardToHospitalBackend } from "@/lib/backendForwarder";
import { isValidIsoDate, isValidPhoneNumber, readJsonRequest, readStringField } from "@/lib/formRequest";
import { getHospitalDateString } from "@/lib/date";

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
    name: readStringField(body, "name", { label: "Full name", maxLength: 120, required: true }),
    phone: readStringField(body, "phone", { label: "Phone number", maxLength: 32, required: true }),
    service: readStringField(body, "service", { label: "Service", maxLength: 120, defaultValue: "General Consultation" }),
    doctor: readStringField(body, "doctor", { label: "Doctor", maxLength: 120, defaultValue: "Dr. Parween Saba" }),
    date: readStringField(body, "date", { label: "Appointment date", maxLength: 10, required: true }),
    timeSlot: readStringField(body, "timeSlot", { label: "Preferred time", maxLength: 80, required: true }),
    message: readStringField(body, "message", { label: "Additional notes", maxLength: 5000 }),
  };
  const invalidField = Object.values(fields).find((field) => !field.ok);
  if (invalidField) {
    return jsonResponse({ success: false, message: invalidField.message }, 400);
  }

  const { name, phone, service, doctor, date, timeSlot, message } = Object.fromEntries(
    Object.entries(fields).map(([key, field]) => [key, field.value])
  );

  if (!isValidPhoneNumber(phone)) {
    return jsonResponse({ success: false, message: "Please provide a valid phone number." }, 400);
  }
  if (!isValidIsoDate(date)) {
    return jsonResponse({ success: false, message: "Please provide a valid appointment date." }, 400);
  }
  if (date < getHospitalDateString()) {
    return jsonResponse({ success: false, message: "Appointment date cannot be in the past." }, 400);
  }
  if (body.isEmergency !== undefined && typeof body.isEmergency !== "boolean") {
    return jsonResponse({ success: false, message: "Emergency status must be a valid yes/no value." }, 400);
  }

  const isEmergency = body.isEmergency === true;
  const bookingToken = `DPH-${Date.now().toString(36).toUpperCase()}-${randomBytes(4).toString("hex").toUpperCase()}`;
  const appointmentRecord = {
    bookingToken,
    patientName: name,
    phone,
    service,
    doctor,
    preferredDate: date,
    timeSlot,
    notes: message,
    isEmergency,
    status: isEmergency ? "Priority Immediate Triage" : "Pending Desk Confirmation",
    timestamp: new Date().toISOString(),
  };

  const forwarded = await forwardToHospitalBackend("/api/appointments", appointmentRecord);
  if (!forwarded.success) {
    return jsonResponse({ success: false, message: forwarded.message }, forwarded.status);
  }

  const backendData = forwarded.data;
  const backendToken = typeof backendData.bookingToken === "string" && backendData.bookingToken.trim()
    ? backendData.bookingToken.trim().slice(0, 100)
    : bookingToken;

  return jsonResponse({
    success: true,
    bookingToken: backendToken,
    message: isEmergency
      ? "Your emergency request was sent to the hospital. Please also call +91 9170150500 or proceed to the hospital for urgent care."
      : "Your appointment request was sent to the hospital. The team will contact you to confirm the time slot.",
  });
}
