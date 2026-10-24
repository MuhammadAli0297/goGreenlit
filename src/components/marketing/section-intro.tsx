import { Reveal } from "@/components/marketing/reveal";
import { SectionHeading } from "@/components/marketing/section-heading";
import { cn } from "@/lib/utils";

/**
 * The opening of a content section: a mono eyebrow, the headline with its
 * italic accent word, and an optional lead paragraph, fading in together.
 * `tone="dark"` is for sections on a deep ground (cream text, Sandy Brown
 * accent), and `align="center"` centers it. Used by every subpage section.
 */
export function SectionIntro({
  eyebrow,
  title,
  description,
  tone = "light",
  align = "left",
  className,
}: {
  eyebrow: string;
  /** Wrap one word in asterisks for the italic accent. */
  title: string;
  description?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p
        className={cn(
          "font-label text-xs tracking-widest uppercase",
          dark ? "text-navajo" : "text-deep",
        )}
      >
        {eyebrow}
      </p>
      <SectionHeading
        className={cn("mt-4", dark && "text-paper [&_em]:text-sandy")}
      >
        {title}
      </SectionHeading>
      {description ? (
        <p className={cn("mt-5 text-lg", dark && "text-navajo")}>
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
