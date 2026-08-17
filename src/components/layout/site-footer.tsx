import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import { siteConfig } from "@/lib/site-config";

/** Services and QA Consulting each carry a full set of subpages, mirror them as footer link columns. */
const footerNavGroups = siteConfig.nav.filter(
  (item) => item.label === "Services" || item.label === "QA Consulting",
);
const aboutItem = siteConfig.nav.find((item) => item.label === "About");
const blogItem = siteConfig.nav.find((item) => item.label === "Blog");

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#354639]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo variant="onDark" />
            <p className="mt-2.5 max-w-sm text-sm text-[#f9f4eb]/70">
              {siteConfig.footerDescription}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-2.5 inline-block text-sm text-[#f9f4eb]/70 hover:text-[#ee9e58]"
            >
              {siteConfig.email}
            </a>
          </div>

          {footerNavGroups.map((group) => (
            <nav key={group.href} aria-label={group.label}>
              <h3 className="text-sm font-semibold text-[#f9f4eb]">
                <Link href={group.href} className="hover:text-[#ee9e58]">
                  {group.label}
                </Link>
              </h3>
              <ul className="mt-2.5 space-y-1.5">
                {group.items?.map((sub) => (
                  <li key={sub.href}>
                    <Link
                      href={sub.href}
                      className="text-sm text-[#f9f4eb]/70 hover:text-[#ee9e58]"
                    >
                      {sub.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <nav aria-label="Company">
            <h3 className="text-sm font-semibold text-[#f9f4eb]">Company</h3>
            <ul className="mt-2.5 space-y-1.5">
              {aboutItem ? (
                <li>
                  <Link
                    href={aboutItem.href}
                    className="text-sm text-[#f9f4eb]/70 hover:text-[#ee9e58]"
                  >
                    {aboutItem.label}
                  </Link>
                </li>
              ) : null}
              {blogItem ? (
                <li>
                  <Link
                    href={blogItem.href}
                    className="text-sm text-[#f9f4eb]/70 hover:text-[#ee9e58]"
                  >
                    {blogItem.label}
                  </Link>
                </li>
              ) : null}
              <li>
                <Link
                  href={siteConfig.links.calendar}
                  className="text-sm text-[#f9f4eb]/70 hover:text-[#ee9e58]"
                >
                  Book a call
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-8 border-t border-[#f9f4eb]/15 pt-5 text-sm text-[#f9f4eb]/60">
          &copy; {year} {siteConfig.legalName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
