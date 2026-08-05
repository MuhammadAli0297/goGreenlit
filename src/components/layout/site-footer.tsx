import { Logo } from "@/components/layout/logo";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border/60 bg-background border-t">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
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

        <div className="border-border/60 text-muted-foreground mt-10 border-t pt-6 text-sm">
          &copy; {year} {siteConfig.legalName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
