import { CalendarClock } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import { buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="border-border/60 bg-background/80 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-1 px-4 sm:px-6 lg:px-8">
        <Logo className="gap-1 text-sm sm:gap-2 sm:text-lg" />
        <div className="flex items-center gap-0 sm:gap-6">
          <nav className="flex items-center gap-1.5 sm:gap-0">
            {siteConfig.nav.map((item) =>
              item.items ? (
                <NavigationMenu key={item.href}>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="text-foreground/80 hover:text-foreground px-0 text-xs sm:px-2.5 sm:text-sm [&_svg]:ml-0.5">
                        <span className="sm:hidden">
                          {item.shortLabel ?? item.label}
                        </span>
                        <span className="hidden sm:inline">{item.label}</span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="min-w-56">
                        <ul className="flex flex-col gap-0.5">
                          <li>
                            <NavigationMenuLink
                              render={<Link href={item.href} />}
                              className="font-medium"
                            >
                              {item.overviewLabel ?? `All ${item.label}`}
                            </NavigationMenuLink>
                          </li>
                          {item.items.map((sub) => (
                            <li key={sub.href}>
                              <NavigationMenuLink
                                render={<Link href={sub.href} />}
                              >
                                {sub.label}
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-foreground/80 hover:text-foreground px-0 py-1.5 text-xs font-medium whitespace-nowrap sm:px-2.5 sm:text-sm"
                >
                  <span className="sm:hidden">
                    {item.shortLabel ?? item.label}
                  </span>
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              ),
            )}
          </nav>
          <Link
            href={siteConfig.links.calendar}
            aria-label="Book a call"
            className={cn(
              buttonVariants({ size: "xs" }),
              "px-1.5 sm:h-8 sm:gap-1.5 sm:rounded-lg sm:px-2.5 sm:text-sm",
            )}
          >
            <CalendarClock aria-hidden="true" className="sm:hidden" />
            <span className="hidden sm:inline">Book a call</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
