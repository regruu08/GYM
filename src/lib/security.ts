const invalid = { isValid: false, sanitized: "" };
export function sanitizeHtml(value: string): string {
  const entities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
    "`": "&#x60;",
    "=": "&#x3D;",
  };
  return typeof value === "string"
    ? value.replace(/[&<>"'`=/]/g, (c) => entities[c])
    : "";
}
export function stripCrlf(value: string): string {
  return typeof value === "string"
    ? value.replace(/[\r\n\0]/g, " ").trim()
    : "";
}
export function sanitizeEmail(value: string): {
  isValid: boolean;
  sanitized: string;
} {
  if (typeof value !== "string" || value.length > 254 || /[\r\n\0]/.test(value))
    return invalid;
  const email = value.trim();
  const parts = email.split("@");
  if (parts.length !== 2) return invalid;
  const [local, domain] = parts;
  if (
    !local ||
    local.length > 64 ||
    local.startsWith(".") ||
    local.endsWith(".") ||
    local.includes("..")
  )
    return invalid;
  if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local)) return invalid;
  const labels = domain.split(".");
  if (
    labels.length < 2 ||
    labels.some(
      (label) => !/^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/.test(label),
    )
  )
    return invalid;
  return { isValid: true, sanitized: `${local}@${domain.toLowerCase()}` };
}
export function sanitizePhone(value: string): {
  isValid: boolean;
  sanitized: string;
} {
  if (typeof value !== "string" || value.length > 25 || /[\r\n\0]/.test(value))
    return invalid;
  const phone = value.trim();
  const digits = phone.replace(/\D/g, "");
  if (
    !/^\+?[0-9 ().-]+$/.test(phone) ||
    digits.length < 7 ||
    digits.length > 15
  )
    return invalid;
  return { isValid: true, sanitized: phone };
}
export function clampText(value: string, maxLength = 2000): string {
  return typeof value === "string"
    ? value.slice(
        0,
        Math.max(
          0,
          Math.min(10000, Number.isFinite(maxLength) ? maxLength : 2000),
        ),
      )
    : "";
}
// React escapes text during rendering; keep plain-text names intact for email drafts.
export function sanitizeUserInput(value: string, maxLength = 2000): string {
  return stripCrlf(clampText(value, maxLength));
}
export function isSafeProtocol(value: string): boolean {
  if (typeof value !== "string" || /[\u0000-\u0020\u007f\\]/.test(value))
    return false;
  if (value.startsWith("/")) return !value.startsWith("//");
  try {
    const url = new URL(value);
    return (
      ["https:", "http:", "mailto:", "tel:"].includes(url.protocol) &&
      !url.username &&
      !url.password
    );
  } catch {
    return false;
  }
}
