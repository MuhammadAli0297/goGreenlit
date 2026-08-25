import Link from "next/link";
import { Fragment, type ReactNode } from "react";

const INLINE_LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

/**
 * Shared by ArticleBody and FaqAccordion. Body/FAQ text is plain strings,
 * not markdown or HTML, so a link is written inline as `[anchor text](/path)`
 * and parsed here. Keeps every existing string backward compatible (no
 * brackets, no change) while letting a post add real in-content links
 * without a richer content model.
 */
export function renderWithInlineLinks(text: string): ReactNode {
  const parts = text.split(INLINE_LINK_PATTERN);

  if (parts.length === 1) {
    return text;
  }

  const nodes: ReactNode[] = [];
  for (let i = 0; i < parts.length; i += 3) {
    if (parts[i]) nodes.push(parts[i]);
    const label = parts[i + 1];
    const href = parts[i + 2];
    if (label && href) {
      nodes.push(
        <Link
          key={i}
          href={href}
          className="text-primary decoration-primary/40 hover:decoration-primary underline underline-offset-4 transition-colors"
        >
          {label}
        </Link>,
      );
    }
  }
  return <Fragment>{nodes}</Fragment>;
}

/**
 * Plain-text counterpart to renderWithInlineLinks, for contexts that need
 * a real string, not JSX, such as a JSON-LD `text` field. Strips the
 * `[label](/path)` syntax down to just the label.
 */
export function stripInlineLinks(text: string): string {
  return text.replace(INLINE_LINK_PATTERN, "$1");
}
