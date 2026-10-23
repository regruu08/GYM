# Verification record

22 October 2026

- Production build and TypeScript: passed (eight public pages, branded not-found page and icon route).
- ESLint: passed.
- Security regression suite: five test groups passed, covering email header injection, malformed email local parts, phone digit validation, unsafe URL forms, plain-text normalization, and production security headers.
- Responsive browser sweep: all eight public pages at 320px, 390px and 1440px; no document-level horizontal overflow in 24 checks.
- Full-width hero: verified rendered width 1425px in a 1440px viewport (15px scrollbar); local hero photograph loaded successfully.
- Enquiry review/edit, membership billing preselection, calculator invalid-input handling, mobile menu and program filtering were exercised during implementation.
- All 20 local JPEG files decoded successfully.
- Motion uses CSS and IntersectionObserver/Web Animations; reduced-motion handling is included. Content remains present without JavaScript.

Limitations: this is not a penetration-test certification. Dependency advisory checks could not finish because registry audit endpoints rejected or timed out. Existing sample business identities, credentials, pricing, policies and stock portraits require client approval. The enquiry flow prepares email drafts; it has no reservation or email-delivery backend. See README.md for launch requirements.
