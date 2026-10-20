# Dr. Parween's Hospital — Final Review

Review date: 2026-10-20

## UI and navigation review

- The navbar includes active-route styling for standard pages, service-detail routes, and the homepage Reviews anchor.
- Existing hover/press feedback uses transitions in the navbar, buttons, and service cards. The service cards include a visible lift/shadow/ring, image zoom, and icon movement.
- The CSS includes a reduced-motion rule for CSS transitions. Framer Motion interactions should still be verified in the deployed browser with the user's operating-system reduced-motion setting.
- Global typography rules increase body and supporting-text readability; mobile navigation includes Escape handling, focus containment/return, and background-scroll locking.
- Existing preview-harness checks from 320px through 1920px showed no horizontal overflow or service-card image/title overlap. These are preview checks, not a full end-to-end run of the Next.js app.

## Checks run in this working environment

- `node node_modules/eslint/bin/eslint.js src` — passed using the dependencies supplied in the original archive. (`npm run lint` itself was blocked because the archived `node_modules/.bin/eslint` shim did not have executable permissions in this Linux environment.)
- Tailwind CSS CLI compilation — passed; key hover, motion-reduction, and responsive utility classes were present in generated CSS.
- Active-navigation helper — 7 path/anchor cases passed.
- Form/date validation — valid and invalid ISO dates, phone numbers, whitespace trimming, and India-time-zone date formatting passed.
- Mocked backend forwarding — missing configuration, endpoint allowlist, success, upstream rejection, and network failure cases passed.
- Package manifests — `package.json` and `package-lock.json` remain unchanged from the supplied archive.

## Verification limits

- A production build was attempted with the supplied Next.js 14.2.35 files. It stopped while trying to fetch the Linux SWC native package because network/DNS access to the npm registry was unavailable. No dependency was installed or updated to work around this.
- No live hospital backend URL or production environment variables were available. Live submission persistence and deployed navigation/animation behavior therefore remain unverified.
- The app must be installed and tested in a suitable deployment environment before it can be certified production-ready.

## Required before production deployment

1. Configure `NODE_BACKEND_URL` to the real server over HTTPS and verify that appointment/contact endpoints durably save records and return `{ "success": true }` only after persistence.
2. Resolve the framework security/support issue before deployment. The project is pinned to `next@14.2.35`, a major version listed as unsupported in the official Next.js support policy. An official critical advisory for the Next.js image optimization API lists affected versions through 15.5.27 (and 16.0.0 through 16.4.0), patched in 15.5.28 and 16.4.1. No dependency changes were made in this project because the owner's instruction was to keep dependencies unchanged.
3. On a network-enabled development/CI machine, run `npm ci`, `npm run lint`, `npm run build`, then `npm run start`; verify every route and form in desktop/mobile browsers, and review accessibility, headers, spam/rate limiting, logging, and patient-data retention with the backend owner.

Official references:
- Next.js support policy: https://nextjs.org/support-policy
- Critical image optimization advisory: https://github.com/vercel/next.js/security/advisories/GHSA-2464-fhr4-w9xw
