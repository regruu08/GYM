import assert from "node:assert/strict";
import { test } from "node:test";
import {
  sanitizeEmail,
  sanitizePhone,
  sanitizeUserInput,
  isSafeProtocol,
  clampText,
} from "../src/lib/security.ts";
import config from "../next.config.mjs";

test("email validation rejects header injection and malformed local parts", () => {
  for (const value of [
    "x@example.com\r\nBcc:a@b.com",
    "a..b@example.com",
    ".a@example.com",
    "a.@example.com",
    "a@-example.com",
    "a".repeat(65) + "@example.com",
    "a@exam_ple.com",
  ])
    assert.equal(sanitizeEmail(value).isValid, false, value);
  assert.deepEqual(sanitizeEmail("Alex+gym@EXAMPLE.COM"), {
    isValid: true,
    sanitized: "Alex+gym@example.com",
  });
});
test("phone validation counts digits and rejects control characters", () => {
  for (const value of [
    ".......",
    "-------",
    "+12",
    "+1234567890123456",
    "+12345678\n",
  ])
    assert.equal(sanitizePhone(value).isValid, false, value);
  assert.equal(sanitizePhone("+1 (555) 789-4766").isValid, true);
});
test("URL policy rejects network-path, backslash, credentials and obfuscated schemes", () => {
  for (const value of [
    "//evil.example",
    "/\\evil.example",
    "java\nscript:alert(1)",
    "javascript:alert(1)",
    "data:text/html,hi",
    "https://user:pass@example.com",
  ])
    assert.equal(isSafeProtocol(value), false, value);
  for (const value of [
    "/programs",
    "https://example.com/path",
    "mailto:hello@example.com",
  ])
    assert.equal(isSafeProtocol(value), true, value);
});
test("plain-text names survive normalization without double escaping", () => {
  assert.equal(sanitizeUserInput("O'Connor & Sons"), "O'Connor & Sons");
  assert.equal(clampText("a".repeat(3000), 1000).length, 1000);
  assert.equal(clampText("abc", -1), "");
});
test("production headers restrict framing, plugins and eval", async () => {
  const headers = (await config.headers())[0].headers;
  const csp = headers.find((h) => h.key === "Content-Security-Policy").value;
  assert.ok(csp.includes("frame-ancestors 'none'"));
  assert.ok(csp.includes("object-src 'none'"));
  assert.ok(!csp.includes("unsafe-eval"));
  assert.equal(
    headers.find((h) => h.key === "X-Content-Type-Options").value,
    "nosniff",
  );
});
