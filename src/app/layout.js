import "./globals.css";
import AppLayoutShell from "@/components/common/AppLayoutShell";
import { HOSPITAL_INFO } from "@/lib/constants";

export const metadata = {
  metadataBase: new URL("https://drparweens.originsoftwares.com"),
  title: `${HOSPITAL_INFO.name} – Best Gynecologist & Multi-Specialty Hospital in Sangareddy`,
  description:
    "Dr. Parween's Hospital in Sangareddy, Telangana. Specializing in Obstetrics & Gynecology, High-Risk Pregnancy Care, Laparoscopic Surgery, Internal Medicine, Pediatrics, Physiotherapy, and Diagnostics.",
  keywords: [
    "Dr Parween Hospital",
    "Best Gynecologist in Sangareddy",
    "Maternity Hospital Sangareddy",
    "Dr Parween Saba",
    "Normal Delivery Hospital Telangana",
    "Laparoscopic Surgery Sangareddy",
    "Pediatrician Sangareddy",
    "24/7 Emergency Hospital Sangareddy"
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  twitter: { card: "summary_large_image", title: `${HOSPITAL_INFO.name} – Hospital in Sangareddy`, description: "Hospital services and contact information for Dr. Parween’s Hospital in Sangareddy, Telangana.", images: ["/assets/gallery/hospital.png"] },
  authors: [{ name: "Dr. Parween's Hospital" }],
  creator: "Dr. Parween Saba",
  publisher: "Dr. Parween's Hospital",
  openGraph: {
    title: `${HOSPITAL_INFO.name} – Leading Gynecologist & Multi-Specialty Hospital`,
    description:
      "Compassionate, ethical, and transparent healthcare for women, children, and families in Sangareddy, Telangana.",
    url: "https://drparweens.originsoftwares.com/",
    siteName: HOSPITAL_INFO.name,
    images: [
      {
        url: "/assets/gallery/hospital.png",
        width: 1200,
        height: 630,
        alt: "Dr. Parween's Hospital Sangareddy",
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
  themeColor: "#0f766e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const hospitalSchema = {
  "@context": "https://schema.org",
  "@type": "Hospital",
  "@id": "https://drparweens.originsoftwares.com/#hospital",
  name: "Dr. Parween’s Hospital",
  url: "https://drparweens.originsoftwares.com/",
  image: "https://drparweens.originsoftwares.com/assets/gallery/hospital.png",
  telephone: ["+919170150500", "+919696873169", "+919515403547", "+916281577301"],
  email: "drparweenhospital@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "3-5-108/A/1, Near FRS, Fateh Khan Dargah, Bharat Gas Godam Line, FRS to Rajampet Road",
    addressLocality: "Sangareddy",
    addressRegion: "Telangana",
    postalCode: "502001",
    addressCountry: "IN"
  },
  medicalSpecialty: ["Obstetric", "Gynecologic"],
  employee: {
    "@type": "Physician",
    name: "Dr. Parween Saba",
    hasCredential: ["MBBS", "DGO (AMU)"],
    medicalSpecialty: ["Obstetrics and Gynecology", "Infertility"]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-brand-500 selection:text-white bg-slate-50 text-slate-800">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hospitalSchema).replace(/</g, "\\u003c") }} />
        <AppLayoutShell>{children}</AppLayoutShell>
      </body>
    </html>
  );
}
