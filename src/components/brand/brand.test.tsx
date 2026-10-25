import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ctaVariants } from "@/components/brand/cta-variants";
import { StatusPill } from "@/components/brand/status-pill";
import { StickerCard } from "@/components/brand/sticker-card";

describe("ctaVariants", () => {
  it("defaults to the primary Sandy Brown pill", () => {
    const classes = ctaVariants();
    expect(classes).toContain("bg-sandy");
    expect(classes).toContain("rounded-full");
    expect(classes).toContain("shadow-[0_4px_0_var(--ink)]");
  });

  it("switches fill and text for the dark-ground outline", () => {
    const classes = ctaVariants({ variant: "outlineOnDark" });
    expect(classes).toContain("text-navajo");
    expect(classes).not.toContain("bg-sandy");
  });

  it("scales height with size", () => {
    expect(ctaVariants({ size: "md" })).toContain("h-11");
    expect(ctaVariants({ size: "xl" })).toContain("h-14");
  });

  it("never removes the focus outline", () => {
    expect(ctaVariants()).not.toContain("outline-none");
  });
});

describe("StatusPill", () => {
  it("renders the label with a pass tone and a hidden tick", () => {
    render(<StatusPill status="pass">passed</StatusPill>);
    const pill = screen.getByText("passed");
    expect(pill).toHaveAttribute("data-status", "pass");
    expect(pill.className).toContain("bg-pass");
    expect(pill.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("marks a bug with its own shape, not color alone", () => {
    render(<StatusPill status="bug">bug found</StatusPill>);
    const pill = screen.getByText("bug found");
    expect(pill.className).toContain("bg-bug");
    expect(pill.querySelector("svg")).not.toBeNull();
  });

  it("idle has no icon", () => {
    render(<StatusPill>queued</StatusPill>);
    const pill = screen.getByText("queued");
    expect(pill).toHaveAttribute("data-status", "idle");
    expect(pill.querySelector("svg")).toBeNull();
  });
});

describe("StickerCard", () => {
  it("is interactive by default and lifts on hover", () => {
    render(<StickerCard>card</StickerCard>);
    const card = screen.getByText("card");
    expect(card.className).toContain("hover:-translate-y-[3px]");
    expect(card.className).toContain("bg-surface");
  });

  it("can be static", () => {
    render(<StickerCard interactive={false}>static</StickerCard>);
    expect(screen.getByText("static").className).not.toContain("hover:");
  });

  it("uses an ink shadow on the deep tone so it stays visible", () => {
    render(<StickerCard tone="deep">deep</StickerCard>);
    const classes = screen.getByText("deep").className;
    expect(classes).toContain("bg-deep");
    expect(classes).toContain("shadow-[6px_6px_0_var(--ink)]");
    expect(classes).toContain("hover:shadow-[9px_9px_0_var(--ink)]");
  });
});
