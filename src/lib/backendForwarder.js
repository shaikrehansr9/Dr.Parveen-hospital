/**
 * Server-only forwarding helper for patient form submissions.
 * Keeps upstream validation, timeout, transport security, and error handling
 * consistent across the appointment and contact API routes.
 */
const ALLOWED_ENDPOINTS = new Set(["/api/appointments", "/api/contact"]);
const REQUEST_TIMEOUT_MS = 10_000;
const INVALID_BACKEND_MESSAGE =
  "Online form submission is not available yet. Please call the hospital directly at +91 9170150500.";
const UPSTREAM_FAILURE_MESSAGE =
  "The hospital server could not save your request. Please call +91 9170150500 to contact the hospital directly.";

function getBackendUrl() {
  const configuredUrl = (process.env.NODE_BACKEND_URL || "").trim();
  if (!configuredUrl) return null;

  let backendUrl;
  try {
    backendUrl = new URL(configuredUrl);
  } catch {
    return null;
  }

  if (
    !["http:", "https:"].includes(backendUrl.protocol) ||
    backendUrl.username ||
    backendUrl.password ||
    backendUrl.search ||
    backendUrl.hash
  ) {
    return null;
  }

  const isLoopback = ["localhost", "127.0.0.1", "::1"].includes(backendUrl.hostname);
  if (process.env.NODE_ENV === "production" && backendUrl.protocol !== "https:" && !isLoopback) {
    return null;
  }

  return backendUrl.toString().replace(/\/+$/, "");
}

export async function forwardToHospitalBackend(endpoint, record) {
  if (!ALLOWED_ENDPOINTS.has(endpoint)) {
    return {
      success: false,
      status: 500,
      message: "The form endpoint is not configured correctly. Please call +91 9170150500.",
    };
  }

  const backendBaseUrl = getBackendUrl();
  if (!backendBaseUrl) {
    return {
      success: false,
      status: 503,
      message: INVALID_BACKEND_MESSAGE,
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${backendBaseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(record),
      cache: "no-store",
      redirect: "error",
      signal: controller.signal,
    });

    let responseData = null;
    try {
      responseData = await response.json();
    } catch {
      // A successful HTTP status without a valid JSON success response must
      // not be treated as proof that a patient request was persisted.
    }

    if (
      !response.ok ||
      !responseData ||
      typeof responseData !== "object" ||
      Array.isArray(responseData) ||
      responseData.success !== true
    ) {
      return {
        success: false,
        status: 502,
        message: UPSTREAM_FAILURE_MESSAGE,
      };
    }

    return { success: true, status: response.status, data: responseData };
  } catch {
    return {
      success: false,
      status: 502,
      message: "We could not connect to the hospital server. Your request has not been confirmed. Please call +91 9170150500.",
    };
  } finally {
    clearTimeout(timeoutId);
  }
}
