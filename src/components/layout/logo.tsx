import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2 text-lg font-semibold tracking-tight",
        className,
      )}
    >
      <span
        aria-hidden
        className="bg-primary size-2.5 rounded-full shadow-[0_0_0_3px_var(--accent)]"
      />
      <span className="text-foreground">
        go<span className="text-primary">Greenlit</span>
      </span>
    </Link>
  );
}
