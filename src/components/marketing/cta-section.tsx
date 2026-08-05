import Link from "next/link";

import { Reveal } from "@/components/marketing/reveal";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export function CtaSection({
  title = "Ready to ship with confidence?",
  description = "Tell us what you're building and where quality is slipping. We'll scope an engagement in one call, with no long-term contract required.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal className="border-border/60 rounded-2xl border bg-[#8fa175] px-6 py-14 text-center sm:px-16">
        <h2 className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {title}
        </h2>
        <p className="text-foreground/80 mx-auto mt-4 max-w-xl text-balance">
          {description}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3">
          <Link
            href={siteConfig.links.calendar}
            className={buttonVariants({ size: "lg" })}
          >
            Book a call
          </Link>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-foreground/80 hover:text-foreground text-sm"
          >
            or email {siteConfig.email}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
