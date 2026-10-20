import { MEDICAL_SERVICES } from "@/lib/constants";

export function generateMetadata({ params }) {
  const service = MEDICAL_SERVICES.find((item) => item.slug === params.slug);
  if (!service) return { title: "Service Not Found | Dr. Parween’s Hospital", robots: { index: false, follow: false } };
  const title = `${service.title} | Dr. Parween’s Hospital`;
  const description = service.shortDescription || `Information about ${service.title} at Dr. Parween’s Hospital, Sangareddy, Telangana.`;
  const url = `https://drparweens.originsoftwares.com/services/${service.slug}`;
  return { title, description, alternates: { canonical: `/services/${service.slug}` }, openGraph: { title, description, url, type: "article" }, twitter: { card: "summary_large_image", title, description } };
}
export default function ServiceLayout({ children }) { return children; }
