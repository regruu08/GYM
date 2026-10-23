# IronForge Fitness

A Next.js 16 / React 19 fitness-club website. The visual system uses ink-black, cool silver, and restrained champagne accents, with a full-width photographic hero, translucent glass surfaces, responsive layouts, and reduced-motion-aware animation.

## Run locally

```sh
npm ci
npm run dev
```

Production: `npm run build`, then `npm start`.
Validation: `npm run lint`, `npm run test:security`, `npx tsc --noEmit`.

## Features

- Programs with category filters and a weekly schedule.
- Coach profiles and membership comparisons with monthly/annual pricing.
- Adult fitness estimates with metric/imperial inputs and invalid-input handling.
- Enquiry review, email draft, copy, and edit flows.
- First-visit guide, privacy information, keyboard navigation, reduced-motion support.

## Content and delivery

Business content lives in `src/data/gymData.ts`. The existing business address, phone number, coach identities, credentials, pricing, policies and schedule are sample content and must be approved or replaced by the client before launch. Photography is stock imagery from Unsplash, stored locally in public/images for reliable delivery; it is not verified photography of this facility. No testimonials, member statistics, or live spot counts are displayed on the homepage.

The enquiry form does not send messages or create reservations. It creates an email draft for the visitor to send. Confirm the destination email with the client. For automatic booking, integrate a real booking provider, server-side validation, abuse protection and delivery monitoring; never report success before a provider confirms it.

## Security boundaries

React handles text escaping. Email and phone validation reject control characters and malformed inputs; outbound URL checks reject network-path and backslash URLs. No secrets or form data are persisted by the application. Security headers prohibit framing and plugins, restrict resource origins, and disable production eval. Inline scripts remain allowed for Next.js static hydration; a nonce-based CSP would require a different rendering approach. Client validation is not a substitute for server validation if a backend is added.

The regression suite covers known input and header failures, not a comprehensive penetration test. Dependency audit was attempted, but npm’s legacy endpoint rejected the request and its bulk endpoint timed out. Known dependency vulnerabilities therefore remain unverified. Re-run the audit and check hosting behavior at release time.

## Layout

`src/app/home.module.css`: homepage composition.
`src/app/globals.css`: shared theme, navigation, forms, footer and accessibility.
`src/components`: shared navigation, pricing and section components.
`next.config.mjs`: production headers and allowed image origin.

Before public launch, verify ownership of the production domain and contact mailbox, replace sample business content and stock portraits, approve membership terms and privacy text, and validate the deployed site over HTTPS.
