/**
 * GA4 click classification. Pure functions, no browser globals, so the
 * rules can be unit tested and the component stays a thin wrapper.
 *
 * Three custom events, named to match what the GA4 setup guide tells the
 * site owner to mark as key events and register as custom dimensions:
 *   book_call_click    any link to the Calendly booking page
 *   email_click        any mailto: link
 *   internal_link_click  a click that moves between two pages of this site
 */

export type AnalyticsEventName =
  "book_call_click" | "email_click" | "internal_link_click";

export interface AnalyticsEvent {
  name: AnalyticsEventName;
  params: {
    link_url: string;
    link_text: string;
    page_path: string;
  };
}

const MAX_TEXT_LENGTH = 100;

function cleanText(text: string | null | undefined): string {
  return (text ?? "").replace(/\s+/g, " ").trim().slice(0, MAX_TEXT_LENGTH);
}

/**
 * Decide which event, if any, a click on a link should produce.
 * `href` is the anchor's resolved absolute URL (`anchor.href`),
 * `siteOrigin` is `location.origin`, `currentPath` is `location.pathname`.
 */
export function classifyLinkClick(
  href: string,
  text: string | null | undefined,
  siteOrigin: string,
  currentPath: string,
): AnalyticsEvent | null {
  if (!href) return null;
  const link_text = cleanText(text);

  if (href.toLowerCase().startsWith("mailto:")) {
    // The address itself is never sent: GA redacts emails and there is no
    // reason to put a personal address in an analytics payload.
    return {
      name: "email_click",
      params: { link_url: "mailto", link_text, page_path: currentPath },
    };
  }

  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return null;
  }

  if (
    url.hostname === "calendly.com" ||
    url.hostname.endsWith(".calendly.com")
  ) {
    return {
      name: "book_call_click",
      params: {
        link_url: `${url.origin}${url.pathname}`,
        link_text,
        page_path: currentPath,
      },
    };
  }

  if (url.origin === siteOrigin) {
    // A same-page anchor jump (the contents pill, skip link) is not a
    // move between pages, so it does not count.
    if (url.pathname === currentPath) return null;
    return {
      name: "internal_link_click",
      params: { link_url: url.pathname, link_text, page_path: currentPath },
    };
  }

  return null;
}
