import "./globals.css";
import { Outfit, DM_Sans } from "next/font/google";
import AppLayoutShell from "@/components/common/AppLayoutShell";
//import { HOSPITAL_INFO, LEAD_DOCTOR, FAQS } from "@/lib/constants";
//import { HOSPITAL_INFO, LEAD_DOCTOR } from "@/lib/constants";
 import {
  HOSPITAL_INFO,
  LEAD_DOCTOR,
  HOSPITAL_FAQS,
} from "@/lib/constants";


/* Headings: distinctive, modern typography */
const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

/* Body: comfortable, highly readable typography */
const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata = {
  metadataBase: new URL("https://drparweens.originsoftwares.com"),

  title: {
    default: `${HOSPITAL_INFO.name} – Best Gynecologist & Maternity Hospital in Sangareddy`,
    template: `%s | ${HOSPITAL_INFO.name}`,
  },

  description:
    "Dr. Parween’s Hospital in Sangareddy, Telangana. Led by Dr. Parween Saba (MBBS, DGO AMU). Specializing in 24/7 painless normal deliveries, high-risk maternity care, laparoscopic surgery, pediatrics, and computerized diagnostics on FRS Road near Fateh Khan Dargah.",

  keywords: [
    "Dr Parween Hospital Sangareddy",
    "Best Gynecologist in Sangareddy",
    "Dr Parween Saba Gynecologist",
    "Maternity Hospital in Sangareddy",
    "Painless Normal Delivery Sangareddy",
    "Female Gynecologist Near Me Sangareddy",
    "Laparoscopic Surgeon Sangareddy",
    "High Risk Pregnancy Specialist Telangana",
    "Pediatrician Sangareddy",
    "24/7 Emergency Hospital Sangareddy",
    "FRS Road Hospital Sangareddy",
    "Fateh Khan Dargah Hospital",
    "Private AC Cabins Maternity Sangareddy",
    "Cashless Health Insurance Hospital Sangareddy",
  ],

  alternates: {
    canonical: "/",
  },

  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  twitter: {
    card: "summary_large_image",
    title: `${HOSPITAL_INFO.name} – Best Maternity & Gynecologist Hospital in Sangareddy`,
    description:
      "Compassionate, ethical, and modern healthcare for mothers, children, and families in Sangareddy, Telangana. 24/7 emergency care.",
    images: ["/assets/gallery/hospital.png"],
  },

  authors: [{ name: "Dr. Parween Saba", url: "https://drparweens.originsoftwares.com" }],
  creator: "Dr. Parween Saba",
  publisher: "Dr. Parween's Hospital",

  openGraph: {
    title: `${HOSPITAL_INFO.name} – Leading Gynecologist & Maternity Hospital in Sangareddy`,
    description:
      "Compassionate, ethical, and transparent healthcare for women, children, and families in Sangareddy, Telangana. Specialized in painless normal deliveries and advanced keyhole surgeries.",
    url: "https://drparweens.originsoftwares.com/",
    siteName: HOSPITAL_INFO.name,
    images: [
      {
        url: "/assets/gallery/hospital.png",
        width: 1200,
        height: 630,
        alt: "Dr. Parween's Hospital Building on FRS Road Sangareddy",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  themeColor: "#1866AE",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/* Rich Structured JSON-LD Data for SEO */
const structuredSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Hospital",
    "@id": "https://drparweens.originsoftwares.com/#hospital",
    name: "Dr. Parween’s Hospital",
    alternateName: ["Dr Parween Saba Hospital", "Dr Parween Hospital Sangareddy"],
    legalName: "Dr. Parween's Hospital & Maternity Center",
    url: "https://drparweens.originsoftwares.com/",
    image: "https://drparweens.originsoftwares.com/assets/gallery/hospital.png",
    logo: "https://drparweens.originsoftwares.com/assets/logo/logo.png",
    telephone: [
      "+919170150500",
      "+919696873169",
      "+919515403547",
      "+916281577301",
    ],
    email: "drparweenhospital@gmail.com",
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Credit Card, Debit Card, UPI",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "3-5-108/A/1, Near FRS, Fateh Khan Dargah, Bharat Gas Godam Line, FRS to Rajampet Road",
      addressLocality: "Sangareddy",
      addressRegion: "Telangana",
      postalCode: "502001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 17.6190,
      longitude: 78.0817,
    },
    hasMap: HOSPITAL_INFO.address.googleMapsDirectionsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
        description: "24/7 Emergency and Maternity Delivery Services",
      },
    ],
    medicalSpecialty: [
      "Obstetric",
      "Gynecologic",
      "Pediatric",
      "Surgical",
      "Emergency",
    ],
    availableLanguage: ["English", "Hindi", "Telugu", "Urdu"],
    employee: {
      "@type": "Physician",
      name: "Dr. Parween Saba",
      jobTitle: "Medical Director & Senior Consultant Obstetrician and Gynecologist",
      hasCredential: ["MBBS", "DGO (AMU)"],
      alumniOf: "Aligarh Muslim University (AMU)",
      medicalSpecialty: [
        "Obstetrics and Gynecology",
        "Infertility Specialist",
        "High-Risk Pregnancy",
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOSPITAL_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://drparweens.originsoftwares.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Obstetrics & Gynecology",
        item: "https://drparweens.originsoftwares.com/#services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Dr. Parween Saba",
        item: "https://drparweens.originsoftwares.com/#doctors",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Facilities & Cabins",
        item: "https://drparweens.originsoftwares.com/#gallery",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Contact & Appointments",
        item: "https://drparweens.originsoftwares.com/#contact",
      },
    ],
  },
];

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${dmSans.variable}`}
    >
      <body className="antialiased selection:bg-brand-500 selection:text-white bg-white text-dark">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredSchemas).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />

        <AppLayoutShell>{children}</AppLayoutShell>
      </body>
    </html>
  );
}
