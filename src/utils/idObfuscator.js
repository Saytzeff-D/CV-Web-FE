// src/utils/idObfuscator.js

const SALT_PREFIX = "cv-prop-v1";

/**
 * Obfuscates a numeric ID into a URL-safe hash string
 * e.g., 63 -> "cv-p-NjN8Y2Fm"
 */
export const encodePropertyId = (id) => {
  if (!id && id !== 0) return "";
  try {
    const raw = `${SALT_PREFIX}:${id}`;
    // Simple base64 encoding with URL-safe replacements
    const encoded = btoa(raw)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
    return `cvp_${encoded}`;
  } catch (err) {
    return String(id);
  }
};

/**
 * Decodes the obfuscated hash back into the original ID.
 * Returns null if the token has been tampered with or is invalid.
 */
export const decodePropertyId = (hash) => {
  if (!hash) return null;

  // Support legacy plain numeric IDs if old links are clicked
  if (/^\d+$/.test(hash)) {
    return Number(hash);
  }

  try {
    let cleanHash = hash;
    if (cleanHash.startsWith("cvp_")) {
      cleanHash = cleanHash.slice(4);
    }

    // Reconstruct base64 padding
    let base64 = cleanHash.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }

    const decoded = atob(base64);
    const parts = decoded.split(":");

    // Verify salt integrity
    if (parts.length === 2 && parts[0] === SALT_PREFIX) {
      const numId = Number(parts[1]);
      return isNaN(numId) ? null : numId;
    }

    return null;
  } catch (err) {
    // Return null if invalid Base64 or corrupted string
    return null;
  }
};