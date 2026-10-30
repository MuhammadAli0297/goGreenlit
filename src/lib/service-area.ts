import { siteConfig } from "@/lib/site-config";

// schema.org areaServed for the sitewide ProfessionalService block. The team
// is Chicago based but works remotely with clients across the country, so the
// area is the home city plus the whole country, not "Remote" and not Chicago
// alone.
export const serviceAreaSchema = [
  {
    "@type": "City",
    name: `${siteConfig.location.locality}, Illinois`,
  },
  {
    "@type": "Country",
    name: "United States",
  },
];
