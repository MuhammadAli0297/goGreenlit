import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-32 text-center sm:px-6">
      <p className="text-primary font-mono text-sm">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        Page not found
      </h1>
      <p className="text-muted-foreground mt-3">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link href="/" className={buttonVariants({ className: "mt-8" })}>
        Back to home
      </Link>
    </section>
  );
}
