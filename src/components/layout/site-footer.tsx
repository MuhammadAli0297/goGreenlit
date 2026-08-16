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
    <footer className="border-border/60 bg-background border-t">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="text-muted-foreground mt-3 max-w-sm text-sm">
              {siteConfig.footerDescription}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-muted-foreground hover:text-foreground mt-3 inline-block text-sm"
            >
              {siteConfig.email}
            </a>
          </div>

          {footerNavGroups.map((group) => (
            <nav key={group.href} aria-label={group.label}>
              <h3 className="text-foreground text-sm font-semibold">
                <Link href={group.href} className="hover:underline">
                  {group.label}
                </Link>
              </h3>
              <ul className="mt-3 space-y-2">
                {group.items?.map((sub) => (
                  <li key={sub.href}>
                    <Link
                      href={sub.href}
                      className="text-muted-foreground hover:text-foreground text-sm"
                    >
                      {sub.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <nav aria-label="Company">
            <h3 className="text-foreground text-sm font-semibold">Company</h3>
            <ul className="mt-3 space-y-2">
              {aboutItem ? (
                <li>
                  <Link
                    href={aboutItem.href}
                    className="text-muted-foreground hover:text-foreground text-sm"
                  >
                    {aboutItem.label}
                  </Link>
                </li>
              ) : null}
              {blogItem ? (
                <li>
                  <Link
                    href={blogItem.href}
                    className="text-muted-foreground hover:text-foreground text-sm"
                  >
                    {blogItem.label}
                  </Link>
                </li>
              ) : null}
              <li>
                <Link
                  href={siteConfig.links.calendar}
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Book a call
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="border-border/60 text-muted-foreground mt-10 border-t pt-6 text-sm">
          &copy; {year} {siteConfig.legalName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
