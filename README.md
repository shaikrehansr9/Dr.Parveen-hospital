# Dr. Parween's Hospital – Enterprise Frontend Platform

Production-ready enterprise web platform for **Dr. Parween's Hospital (Sangareddy, Telangana)** rebuilt from WordPress into a modern **Next.js (App Router)** platform using pure **JavaScript (JSX)** and **Tailwind CSS**.

---

## 🏥 Hospital Overview
* **Hospital Name:** Dr. Parween's Hospital
* **Founder & Medical Director:** Dr. Parween Saba (MBBS, MD - Obstetrics & Gynecology)
* **Tagline:** Best Gynecologist & Multi-Specialty Hospital in Sangareddy
* **Helpline / Emergency (24/7):** +91 9170150500
* **Email:** drparweenhospital@gmail.com
* **Address:** H NO: 3, 5-108/2/A/1, FRS ROAD, near Fateh Khan Dargah, ATABAL, RAJAMPET, Sangareddy, Telangana – 502001
* **Consultation Hours:** Monday – Saturday: 9:00 AM – 6:00 PM (Sunday: Emergency & Labor Ward 24/7)

---

## 🚀 Key Features & Architectural Highlights

1. **Mobile-First & Cross-Device Ergonomics:**
   - Sticky Emergency Action Bar on mobile screens for thumb reach (Call 24/7, WhatsApp, Instant Booking, Map Directions).
   - Full slide-in mobile navigation drawer with touch targets exceeding 48px.
   - Zero horizontal overflow, fluid responsive layouts tested across mobile, tablet, and desktop.

2. **100% Medical Services & Treatment Equivalence:**
   - Obstetrics & Gynecology (Complete maternity, natural delivery advocacy, painless epidural delivery, PCOS/PCOD)
   - High-Risk Pregnancy Management (Preeclampsia, gestational diabetes, twin pregnancy, fetal Doppler)
   - Laparoscopic & General Surgery (Keyhole hysterectomy, ovarian cystectomy, gallbladder, appendectomy, hernia)
   - Internal Medicine (Chronic diabetes, hypertension, infectious fevers)
   - Pediatrics & Child Care (Newborn care, immunizations, developmental milestones)
   - Physiotherapy & Rehabilitation (Pelvic floor conditioning, orthopedic rehab, pain management)
   - Diagnostics & 24x7 Lab Tests (High-resolution ultrasound, digital pathology, hormone testing)

3. **Node.js Backend Integration Layer:**
   - Shared API adapter in `src/services/api.js` keeps the UI separate from backend endpoint details.
   - Read-only hospital content can fall back to bundled constants when the optional content API is unavailable.
   - Appointment and contact submissions never report a simulated success: the Next.js API routes forward submissions to the configured Node.js backend and return an error if the backend is missing or rejects the request.
   - `src/lib/backendForwarder.js` centralizes upstream URL handling, timeout, and error responses for both form routes.

4. **Interactive Features:**
   - Interactive Appointment Booking Modal with real-time validation, emergency triage flag, and instant WhatsApp follow-up.
   - Interactive Cabin & Infrastructure Gallery with category filters and full-screen lightbox preview.
   - Interactive Google Maps embed with one-click navigation to FRS Road, Rajampet, Sangareddy.
   - Authentic Patient Testimonials and FAQ Accordion.

---

## 📁 Directory Structure

```text
C:\Users\ASUS\OneDrive\Desktop\drparveen\
├── src/
│   ├── app/
│   │   ├── about/page.js              # Dedicated About Hospital & Leadership page
│   │   ├── api/
│   │   │   ├── appointments/route.js  # Appointment API handler (Node.js forwarder)
│   │   │   └── contact/route.js       # Contact API handler
│   │   ├── contact/page.js            # Dedicated Contact & Location page
│   │   ├── doctors/page.js            # Medical Specialists directory page
│   │   ├── gallery/page.js            # Cabin & Infrastructure Gallery page
│   │   ├── services/
│   │   │   ├── page.js                # All 7 Specialties directory
│   │   │   └── [slug]/page.js         # Dynamic individual service treatment guide
│   │   ├── globals.css                # Luxury clinical glassmorphic styling
│   │   ├── layout.js                  # Root layout with SEO metadata & OpenGraph
│   │   └── page.js                    # High-impact homepage assembling all sections
│   ├── components/
│   │   ├── common/
│   │   │   ├── AppLayoutShell.jsx     # Navigation shell & modal provider
│   │   │   ├── AppointmentModal.jsx   # Interactive appointment booking dialog
│   │   │   ├── EmergencyActionBar.jsx # Mobile sticky bottom emergency bar
│   │   │   ├── Footer.jsx             # Comprehensive multi-column hospital footer
│   │   │   ├── Navbar.jsx             # Responsive navigation with mega-dropdown & mobile drawer
│   │   │   └── Topbar.jsx             # Top announcement, OPD schedule & helpline bar
│   │   ├── sections/
│   │   │   ├── AboutSection.jsx       # About us with hospital & reception photos
│   │   │   ├── CabinGallerySection.jsx# Infrastructure and cabin gallery
│   │   │   ├── ContactSection.jsx     # Form with embedded Google Map
│   │   │   ├── DoctorSection.jsx      # Dr. Parween Saba & clinical faculty
│   │   │   ├── FaqSection.jsx         # Accordion with verified hospital FAQs
│   │   │   ├── HeroSection.jsx        # Luxury hero with stats counter & quick cards
│   │   │   ├── ServicesSection.jsx    # Complete 7 services with ticker
│   │   │   └── WhyChooseUsSection.jsx # 3 core trust pillars & video tour
│   │   └── ui/
│   │       ├── Badge.jsx              # Status & department pills
│   │       ├── Button.jsx             # Multi-variant responsive buttons
│   │       ├── Card.jsx               # Luxury glassmorphic card
│   │       ├── Input.jsx              # Ergonomic 48px touch inputs & select
│   │       └── Modal.jsx              # Framer motion animated modal
│   ├── context/
│   │   └── BookingContext.jsx         # Global booking modal trigger context
│   ├── lib/
│   │   ├── backendForwarder.js        # Shared server-side form forwarding and error handling
│   │   ├── constants.js               # Hospital data, services & doctors
│   │   └── utils.js                   # Class merging & WhatsApp link generators
│   └── services/
│       └── api.js                     # Shared API adapter (content fallback, real form submissions)
└── public/
    └── assets/
        ├── doctors/                   # Photos of Dr. Parween Saba
        ├── gallery/                   # Hospital exterior, reception, modular OT, cabins
        ├── logo/                      # Original hospital logo assets
        └── services/                  # Specialty graphics for each medical department
```

---

## 🛠️ How to Run Locally

### 1. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

### 2. Production Build
```bash
npm run build
npm start
```

### 3. Connect to a Node.js Backend
Create a `.env.local` file in the project root. Keep real production secrets out of source control.

```env
# Optional remote read/content API. This value is browser-visible.
NEXT_PUBLIC_API_URL=http://localhost:5000

# Required server-only base URL for appointment/contact submissions.
NODE_BACKEND_URL=http://localhost:5000
```

Restart the Next.js server after changing environment values. `NEXT_PUBLIC_API_URL` should point to an API that exposes the read endpoints below and, if called directly by a browser, must allow the website origin through CORS. `NODE_BACKEND_URL` is server-side only and is used by the Next.js proxy routes for patient submissions.

**Required backend endpoints**

| Method and path | Purpose | Expected behavior |
| --- | --- | --- |
| `POST /api/appointments` | Save an appointment request | Validate the payload, persist it, and return JSON with `success: true`; returning `bookingToken` and `message` is recommended. |
| `POST /api/contact` | Save a contact inquiry | Validate the payload, persist it, and return JSON with `success: true`; returning `ticketId` and `message` is recommended. |
| `GET /api/hospital-info` | Optional hospital content | Return `{ "success": true, "data": ... }`. |
| `GET /api/services` and `GET /api/services/:slug` | Optional service content | Return `{ "success": true, "data": ... }`. |
| `GET /api/doctors` | Optional doctor content | Return `{ "success": true, "data": ... }`. |
| `GET /api/gallery?category=All` | Optional gallery content | Return `{ "success": true, "data": ... }`. |
| `GET /api/testimonials` and `GET /api/faqs` | Optional page content | Return `{ "success": true, "data": ... }`. |

The Next.js routes validate the minimum required name and phone fields, forward patient submissions with a 10-second timeout, and only return success after the upstream endpoint responds successfully. If `NODE_BACKEND_URL` is missing or the backend is unreachable, the form displays an error and asks the visitor to call the hospital; no appointment or inquiry is stored by this frontend alone. The hospital backend must implement durable storage and its own access controls, validation, and retention rules before production use.

**Payloads sent to the Node.js backend**

`POST /api/appointments` receives a normalized record with `bookingToken`, `patientName`, `phone`, `service`, `doctor`, `preferredDate`, `timeSlot`, `notes`, `isEmergency`, `status`, and `timestamp`.

`POST /api/contact` receives `ticketId`, `name`, `phone`, `email`, `subject`, `message`, and `timestamp`.

For both endpoints, return a JSON object with `success: true` only after the record is accepted/persisted. The response can optionally include `message`, `bookingToken` or `ticketId`, and a `data` object. A non-2xx response or `{ "success": false }` is surfaced as an error in the website; the frontend will not invent a successful token when submission fails.

### Responsive typography and navigation notes

- `src/app/globals.css` sets a 17px body baseline, 16px standard small text, 14px utility small text, and 13px legacy micro-labels. Avoid adding smaller text classes for ordinary content.
- `src/lib/navigation.js` contains the shared active-link rule for route and homepage-anchor navigation.
- The mobile navigation drawer manages focus, supports Escape to close, and locks background scrolling while open. Keep interactive controls keyboard-accessible and preserve `aria-current` for active links.
