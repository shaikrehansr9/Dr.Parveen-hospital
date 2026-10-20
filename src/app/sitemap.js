import { MEDICAL_SERVICES } from "@/lib/constants";

const BASE_URL = "https://drparweens.originsoftwares.com";
export default function sitemap() {
  const routes = ["", "/about", "/services", "/doctors", "/gallery", "/contact", ...MEDICAL_SERVICES.map((service) => `/services/${service.slug}`)];
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/services/") ? 0.65 : 0.7,
  }));
}
