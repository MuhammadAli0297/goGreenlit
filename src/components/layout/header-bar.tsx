"use client";

import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

import { ctaVariants } from "@/components/brand/cta-variants";
import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { cn } from "@/lib/utils";

export interface HeaderNavItem {
  label: string;
  href: string;
  overviewLabel?: string;
  items?: readonly { label: string; href: string; description?: string }[];
}

export interface BlogMenuData {
  total: number;
  categories: {
    slug: string;
    label: string;
    href: string;
    count: number;
    /** The category's cover classes (swatch background plus the text color that reads on it), from blog-data. */
    coverClass: string;
  }[];
  latest: {
    title: string;
    href: string;
    categoryLabel: string;
    excerpt: string;
  };
}

const triggerBase =
  "group/trigger inline-flex h-10 items-center gap-1 rounded-full px-3.5 text-[15px] font-medium whitespace-nowrap transition-colors duration-200";

function itemClass(active: boolean) {
  return cn(
    triggerBase,
    active
      ? "bg-ink text-paper"
      : "hover:bg-leaf/35 data-popup-open:bg-leaf/50 text-ink",
  );
}

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * The floating pill header's content, desktop and mobile. A client
 * component because the mega menu anchors its popup to the pill element
 * and the current-page highlight reads the pathname. The data it shows
 * (nav structure, blog counts, latest post) is computed on the server in
 * SiteHeader and passed in as plain props, so none of blog-data's post
 * bodies reach the client bundle.
 */
export function HeaderBar({
  nav,
  blog,
  bookingHref,
}: {
  nav: readonly HeaderNavItem[];
  blog: BlogMenuData;
  bookingHref: string;
}) {
  const pill = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  return (
    <div
      ref={pill}
      className="border-ink bg-paper/95 text-ink supports-backdrop-filter:bg-paper/90 flex items-center justify-between gap-3 rounded-full border-[1.5px] py-2 pr-2 pl-5 backdrop-blur-md"
    >
      <Logo />

      <div className="hidden items-center gap-2 md:flex">
        <NavigationMenu.Root
          aria-label="Main"
          delay={80}
          closeDelay={160}
          className="relative"
        >
          <NavigationMenu.List className="flex items-center gap-1">
            {nav.map((item) =>
              item.items ? (
                <NavigationMenu.Item key={item.href} value={item.href}>
                  <NavigationMenu.Trigger
                    className={itemClass(isActive(pathname, item.href))}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className="size-3.5 transition-transform duration-300 group-data-popup-open/trigger:rotate-180"
                    />
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content className="w-[min(1100px,calc(100vw-2rem))] p-4 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0">
                    {item.href === "/blog" ? (
                      <BlogPanel item={item} blog={blog} />
                    ) : (
                      <ServicePanel
                        item={item}
                        bookingHref={bookingHref}
                        tone={item.href === "/qa-consulting" ? "olive" : "leaf"}
                      />
                    )}
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
              ) : (
                <NavigationMenu.Item key={item.href}>
                  <NavigationMenu.Link
                    closeOnClick
                    render={<Link href={item.href} />}
                    active={isActive(pathname, item.href)}
                    className={itemClass(isActive(pathname, item.href))}
                  >
                    {item.label}
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              ),
            )}
          </NavigationMenu.List>

          <NavigationMenu.Portal>
            <NavigationMenu.Positioner
              anchor={pill}
              side="bottom"
              align="center"
              sideOffset={10}
              collisionPadding={16}
              positionMethod="fixed"
              className="z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-instant:transition-none"
            >
              <NavigationMenu.Popup
                data-slot="mega-menu"
                className="border-ink bg-paper text-ink h-(--popup-height) w-(--popup-width) origin-(--transform-origin) rounded-[28px] border-[1.5px] shadow-[10px_10px_0_var(--deep)] transition-[opacity,transform,width,height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0"
              >
                <NavigationMenu.Viewport className="relative size-full overflow-hidden rounded-[26px]" />
              </NavigationMenu.Popup>
            </NavigationMenu.Positioner>
          </NavigationMenu.Portal>
        </NavigationMenu.Root>

        <Link
          href={bookingHref}
          className={ctaVariants({ variant: "cta", size: "md" })}
        >
          Book a call
        </Link>
      </div>

      <div className="md:hidden">
        <MobileNav />
      </div>
    </div>
  );
}

function ServicePanel({
  item,
  bookingHref,
  tone,
}: {
  item: HeaderNavItem;
  bookingHref: string;
  tone: "leaf" | "olive";
}) {
  const isConsulting = tone === "olive";
  return (
    <div className="grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-4">
      <div>
        <p className="font-label text-deep px-3 pb-2 text-xs tracking-widest uppercase">
          {item.label}
        </p>
        <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
          {item.items?.map((sub) => (
            <li key={sub.href}>
              <NavigationMenu.Link
                closeOnClick
                render={<Link href={sub.href} />}
                className="group/row hover:border-ink hover:bg-surface block rounded-2xl border-[1.5px] border-transparent px-3 py-3 transition-[background-color,border-color,transform] duration-200 hover:translate-x-1"
              >
                <span className="flex items-center justify-between gap-2 text-[17px] font-semibold">
                  {sub.label}
                  <span
                    aria-hidden="true"
                    className="opacity-0 transition-opacity group-hover/row:opacity-100"
                  >
                    &rarr;
                  </span>
                </span>
                {sub.description ? (
                  <span className="text-deep mt-0.5 block text-sm">
                    {sub.description}
                  </span>
                ) : null}
              </NavigationMenu.Link>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={cn(
          "border-ink flex flex-col rounded-[22px] border-[1.5px] p-6",
          isConsulting ? "bg-olive" : "bg-leaf",
        )}
      >
        <p className="font-label text-xs tracking-widest uppercase">
          Not sure where to start?
        </p>
        <p className="mt-3 text-[28px] leading-[1.1] font-medium tracking-tight">
          {isConsulting
            ? "A short call is enough to find the right first step."
            : "Tell us what hurts. We will tell you which service fits."}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
          <Link
            href={bookingHref}
            className={ctaVariants({ variant: "cta", size: "md" })}
          >
            Book a call
          </Link>
          <NavigationMenu.Link
            closeOnClick
            render={<Link href={item.href} />}
            className="text-ink text-[15px] font-semibold underline decoration-2 underline-offset-4"
          >
            {item.overviewLabel ?? `All ${item.label}`}
          </NavigationMenu.Link>
        </div>
      </div>
    </div>
  );
}

function BlogPanel({
  item,
  blog,
}: {
  item: HeaderNavItem;
  blog: BlogMenuData;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-4">
      <div>
        <p className="font-label text-deep px-1 pb-3 text-xs tracking-widest uppercase">
          Browse by topic
        </p>
        <ul className="grid grid-cols-3 gap-3">
          {blog.categories.map((cat) => (
            <li key={cat.slug}>
              <NavigationMenu.Link
                closeOnClick
                render={<Link href={cat.href} />}
                className={cn(
                  "border-ink flex min-h-32 flex-col justify-between rounded-[18px] border-[1.5px] p-4 transition-[transform,box-shadow] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--deep)]",
                  cat.coverClass,
                )}
              >
                <span className="font-label text-xs tracking-widest uppercase">
                  {cat.count} {cat.count === 1 ? "article" : "articles"}
                </span>
                <span className="text-xl leading-tight font-semibold tracking-tight">
                  {cat.label}
                </span>
              </NavigationMenu.Link>
            </li>
          ))}
          <li>
            <NavigationMenu.Link
              closeOnClick
              render={<Link href={item.href} />}
              className="border-ink bg-surface flex min-h-32 flex-col justify-between rounded-[18px] border-[1.5px] p-4 transition-[transform,box-shadow] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--deep)]"
            >
              <span className="font-label text-xs tracking-widest uppercase">
                {blog.total} articles
              </span>
              <span className="text-xl leading-tight font-semibold tracking-tight">
                {item.overviewLabel ?? "All articles"} &rarr;
              </span>
            </NavigationMenu.Link>
          </li>
        </ul>
      </div>
      <NavigationMenu.Link
        closeOnClick
        render={<Link href={blog.latest.href} />}
        className="border-ink bg-surface group/latest flex flex-col rounded-[22px] border-[1.5px] p-6 transition-transform duration-300 hover:-translate-y-0.5"
      >
        <span className="font-label text-deep text-xs tracking-widest uppercase">
          Latest / {blog.latest.categoryLabel}
        </span>
        <span className="mt-3 text-[26px] leading-[1.1] font-semibold tracking-tight">
          {blog.latest.title}
        </span>
        <span className="text-deep mt-3 line-clamp-3 text-[15px] leading-snug">
          {blog.latest.excerpt}
        </span>
        <span className="mt-auto pt-5 font-semibold">Read now &rarr;</span>
      </NavigationMenu.Link>
    </div>
  );
}
