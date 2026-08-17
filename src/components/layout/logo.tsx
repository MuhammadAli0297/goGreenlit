import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "default",
}: {
  className?: string;
  /** "onDark" swaps the mark for use inside a bold, dark-background section (see CLAUDE.md gotcha #7). */
  variant?: "default" | "onDark";
}) {
  const isOnDark = variant === "onDark";

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
        className={cn(
          "size-2.5 rounded-full",
          isOnDark
            ? "bg-[#ee9e58] shadow-[0_0_0_3px_rgba(255,224,173,0.2)]"
            : "bg-primary shadow-[0_0_0_3px_var(--accent)]",
        )}
      />
      <span className={isOnDark ? "text-[#f9f4eb]" : "text-foreground"}>
        go
        <span className={isOnDark ? "text-[#ee9e58]" : "text-primary"}>
          Greenlit
        </span>
      </span>
    </Link>
  );
}
