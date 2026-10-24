import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

import { CarouselTrack } from "@/components/marketing/carousel-track";

export interface CarouselService {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

/**
 * "Six ways in": every service as a wide card in a sideways scroll-snap
 * carousel. Each card is a real link to its subpage (an in-content link
 * with the service name as anchor text), an `<h3>` inside, and flips to
 * Dark Slate Grey with the arrow nudging forward on hover or keyboard
 * focus. The cards are server-rendered, only the scroll controls are a
 * client component (`CarouselTrack`).
 */
export function ServiceCarousel({
  services,
  label,
}: {
  services: readonly CarouselService[];
  label: string;
}) {
  return (
    <CarouselTrack label={label}>
      {services.map(({ icon: Icon, title, description, href }) => (
        <li
          key={title}
          className="w-[min(82vw,21rem)] shrink-0 snap-start sm:w-[22rem]"
        >
          <Link
            href={href}
            className="group/card border-ink bg-surface text-ink hover:bg-deep hover:text-navajo focus-visible:bg-deep focus-visible:text-navajo flex h-full min-h-72 flex-col rounded-[22px] border-[1.5px] p-7 shadow-[6px_6px_0_var(--deep)] transition-[background-color,color,box-shadow] duration-300 hover:shadow-[6px_6px_0_var(--ink)] motion-reduce:transition-none"
          >
            <span className="border-ink bg-olive text-ink flex size-11 items-center justify-center rounded-xl border-[1.5px] transition-transform duration-300 group-hover/card:scale-110 group-hover/card:-rotate-6 motion-reduce:transition-none">
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <h3 className="mt-5 text-2xl leading-tight font-semibold tracking-tight">
              {title}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed">{description}</p>
            <span className="mt-auto pt-6">
              <ArrowRight
                aria-hidden="true"
                className="size-7 transition-transform duration-300 group-hover/card:translate-x-2 motion-reduce:transition-none"
              />
            </span>
          </Link>
        </li>
      ))}
    </CarouselTrack>
  );
}
