import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
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

export function SiteHeader() {
  return (
    <header className="border-border/60 bg-background/80 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
        <Logo />
        <div className="hidden items-center gap-6 sm:flex">
          <nav className="flex items-center">
            {siteConfig.nav.map((item) =>
              item.items ? (
                <NavigationMenu key={item.href}>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="text-foreground/80 hover:text-foreground px-2.5 text-sm">
                        {item.label}
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
                  className="text-foreground/80 hover:text-foreground px-2.5 py-1.5 text-sm font-medium whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
          <Link
            href={siteConfig.links.calendar}
            className={buttonVariants({ size: "default" })}
          >
            Book a call
          </Link>
        </div>
        <div className="sm:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
