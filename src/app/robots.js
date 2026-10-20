const BASE_URL = "https://drparweens.originsoftwares.com";
export default function robots() {
  return { rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }], sitemap: `${BASE_URL}/sitemap.xml`, host: BASE_URL };
}
