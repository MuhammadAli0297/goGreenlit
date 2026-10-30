"use client";

import Script from "next/script";
import { useEffect } from "react";

import { classifyLinkClick } from "@/lib/analytics";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Loads GA4 and reports three custom click events (see lib/analytics.ts).
 *
 * Renders nothing unless NEXT_PUBLIC_GA_MEASUREMENT_ID is set and the build
 * is production, so local development, tests and Vercel previews never send
 * data. Page views need no code here: GA4's enhanced measurement already
 * records a page_view on every client-side route change.
 */
export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const enabled =
    Boolean(measurementId) && process.env.NODE_ENV === "production";

  useEffect(() => {
    if (!enabled) return;

    function onClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const result = classifyLinkClick(
        anchor.href,
        anchor.textContent,
        window.location.origin,
        window.location.pathname,
      );
      if (!result) return;
      // No gtag means the script was blocked (ad blocker) or has not
      // loaded yet. Dropping the event is the right outcome.
      window.gtag?.("event", result.name, result.params);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${measurementId}');`}
      </Script>
    </>
  );
}
