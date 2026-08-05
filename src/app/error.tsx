"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-32 text-center sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">
        Something went wrong
      </h1>
      <p className="text-muted-foreground mt-3">
        An unexpected error occurred. Try again, or head back to the homepage.
      </p>
      <Button onClick={reset} className="mt-8">
        Try again
      </Button>
    </section>
  );
}
