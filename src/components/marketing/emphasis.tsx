import { Fragment, type ReactNode } from "react";

const EMPHASIS_PATTERN = /\*([^*]+)\*/g;

/**
 * Turns `*word*` inside a plain string into an `<em>`, the one italic
 * accent word per headline of the Live Build language. For components
 * whose title is a `string` prop (CtaSection) so a page can add the accent
 * without switching the prop to JSX. A string with no asterisks comes back
 * unchanged, so every existing title is unaffected. The `<em>` takes its
 * color and weight from the parent heading's `[&_em]` classes.
 */
export function renderWithEmphasis(text: string): ReactNode {
  const parts = text.split(EMPHASIS_PATTERN);
  if (parts.length === 1) return text;

  return (
    <Fragment>
      {parts.map((part, i) =>
        i % 2 === 1 ? <em key={i}>{part}</em> : part || null,
      )}
    </Fragment>
  );
}
