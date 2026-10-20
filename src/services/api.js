import {
  HOSPITAL_INFO,
  LEAD_DOCTOR,
  MEDICAL_SERVICES,
  HOSPITAL_INFRASTRUCTURE,
  PATIENT_TESTIMONIALS,
  HOSPITAL_FAQS,
} from "@/lib/constants";

/**
 * Hospital API adapter.
 * Read-only content can use local constants when an optional remote content API
 * is unavailable. Patient submissions never use a simulated-success fallback.
 *
 * NEXT_PUBLIC_API_URL: optional remote content API base URL (browser-visible).
 * NODE_BACKEND_URL: server-only base URL used by Next.js form forwarding routes.
 */
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");

class HospitalApiService {
  async _request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const defaultHeaders = {
      Accept: "application/json",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(url, {
        ...options,
        cache: "no-store",
        signal: controller.signal,
        headers: { ...defaultHeaders, ...options.headers },
      });
      const responseData = await response.json().catch(() => null);

      if (!response.ok || responseData?.success === false) {
        throw new Error(responseData?.message || `Request failed with status ${response.status}`);
      }
      if (!responseData || typeof responseData !== "object") {
        throw new Error("The server returned an invalid response.");
      }

      return responseData;
    } catch (error) {
      console.warn(`[HospitalApiService] Request to ${url} failed:`, error.message);
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async _submit(endpoint, formData, fallbackMessage) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    let response;

    try {
      response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
        cache: "no-store",
        signal: controller.signal,
      });
    } catch (error) {
      if (error?.name === "AbortError") {
        throw new Error("The request timed out. Your submission has not been confirmed. Please call +91 9170150500.");
      }
      throw new Error("Unable to connect to the hospital server. Your request has not been confirmed. Please call +91 9170150500.");
    } finally {
      clearTimeout(timeoutId);
    }

    const responseData = await response.json().catch(() => null);
    if (!response.ok || responseData?.success !== true) {
      throw new Error(responseData?.message || fallbackMessage);
    }

    return responseData;
  }

  async getHospitalDetails() {
    if (API_BASE_URL) {
      try { return await this._request("/api/hospital-info"); } catch { /* Use bundled content below. */ }
    }
    return { success: true, data: HOSPITAL_INFO };
  }

  async getServices() {
    if (API_BASE_URL) {
      try { return await this._request("/api/services"); } catch { /* Use bundled content below. */ }
    }
    return { success: true, data: MEDICAL_SERVICES };
  }

  async getServiceBySlug(slug) {
    if (API_BASE_URL) {
      try { return await this._request(`/api/services/${encodeURIComponent(slug)}`); } catch { /* Use bundled content below. */ }
    }
    const service = MEDICAL_SERVICES.find((item) => item.slug === slug);
    return { success: Boolean(service), data: service || null };
  }

  async getDoctors() {
    if (API_BASE_URL) {
      try { return await this._request("/api/doctors"); } catch { /* Use bundled content below. */ }
    }
    return { success: true, data: [LEAD_DOCTOR] };
  }

  async getGallery(category = "All") {
    if (API_BASE_URL) {
      try { return await this._request(`/api/gallery?category=${encodeURIComponent(category)}`); } catch { /* Use bundled content below. */ }
    }
    const data = !category || category === "All"
      ? HOSPITAL_INFRASTRUCTURE
      : HOSPITAL_INFRASTRUCTURE.filter((item) => item.category === category);
    return { success: true, data };
  }

  async getTestimonials() {
    if (API_BASE_URL) {
      try { return await this._request("/api/testimonials"); } catch { /* Use bundled content below. */ }
    }
    return { success: true, data: PATIENT_TESTIMONIALS };
  }

  async getFaqs() {
    if (API_BASE_URL) {
      try { return await this._request("/api/faqs"); } catch { /* Use bundled content below. */ }
    }
    return { success: true, data: HOSPITAL_FAQS };
  }

  async bookAppointment(formData) {
    if (!formData?.name?.trim() || !formData?.phone?.trim()) {
      throw new Error("Full name and phone number are required.");
    }
    return this._submit(
      "/api/appointments",
      formData,
      "We couldn't submit your appointment request. Please call +91 9170150500."
    );
  }

  async submitContactInquiry(formData) {
    if (!formData?.name?.trim() || !formData?.phone?.trim()) {
      throw new Error("Please provide your name and phone number.");
    }
    return this._submit(
      "/api/contact",
      formData,
      "We couldn't submit your message. Please call +91 9170150500."
    );
  }
}

export const api = new HospitalApiService();
export default api;
