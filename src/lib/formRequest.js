const MAX_REQUEST_BYTES = 16 * 1024;

/**
 * Read a bounded JSON request body for public form endpoints.
 * Streaming the body with a byte limit prevents oversized payloads from being
 * fully buffered before validation.
 */
export async function readJsonRequest(request) {
  const contentType = request.headers.get("content-type") || "";
  if (!/^application\/json(?:\s*;|$)/i.test(contentType)) {
    return {
      ok: false,
      status: 415,
      message: "Please submit the form using a supported request format.",
    };
  }

  const contentLengthHeader = request.headers.get("content-length");
  if (contentLengthHeader && /^\d+$/.test(contentLengthHeader)) {
    if (Number(contentLengthHeader) > MAX_REQUEST_BYTES) {
      return {
        ok: false,
        status: 413,
        message: "Your submission is too large. Please shorten the message and try again.",
      };
    }
  }

  const reader = request.body?.getReader();
  if (!reader) {
    return {
      ok: false,
      status: 400,
      message: "Please submit a valid form.",
    };
  }

  const chunks = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      totalBytes += value.byteLength;
      if (totalBytes > MAX_REQUEST_BYTES) {
        try {
          await reader.cancel();
        } catch {
          // The request may already have been closed by the client.
        }
        return {
          ok: false,
          status: 413,
          message: "Your submission is too large. Please shorten the message and try again.",
        };
      }

      chunks.push(value);
    }

    const bytes = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }

    let data;
    try {
      data = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
    } catch {
      return {
        ok: false,
        status: 400,
        message: "Please submit a valid form.",
      };
    }

    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return {
        ok: false,
        status: 400,
        message: "Please submit a valid form.",
      };
    }

    return { ok: true, data };
  } catch {
    return {
      ok: false,
      status: 400,
      message: "We could not read your submission. Please try again.",
    };
  } finally {
    try {
      reader.releaseLock();
    } catch {
      // A cancelled or closed stream may already have released its lock.
    }
  }
}

/** Return a trimmed, bounded string field or a safe validation message. */
export function readStringField(body, key, { label, maxLength, required = false, defaultValue = "" }) {
  if (body[key] === undefined && !required) {
    return { ok: true, value: defaultValue };
  }

  if (typeof body[key] !== "string") {
    return { ok: false, message: `${label} must be provided as text.` };
  }

  const value = body[key].trim();
  if (required && !value) {
    return { ok: false, message: `${label} is required.` };
  }
  if (value.length > maxLength) {
    return { ok: false, message: `${label} must be ${maxLength} characters or fewer.` };
  }

  return { ok: true, value: value || defaultValue };
}

export function isValidPhoneNumber(phone) {
  if (typeof phone !== "string" || phone.length > 32) return false;
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export function isValidIsoDate(value) {
  if (typeof value !== "string" || !value) return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}
