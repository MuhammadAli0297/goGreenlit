import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PhaseTimeline } from "@/components/marketing/phase-timeline";

const phases = [
  { title: "Audit", description: "We read your product and pipeline." },
  { title: "Embed", description: "We join your sprint." },
  { title: "Gate", description: "A clear go or no-go." },
];

describe("PhaseTimeline", () => {
  it("renders an ordered list with one numbered step per phase", () => {
    render(<PhaseTimeline phases={phases} />);
    const items = within(screen.getByRole("list")).getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(items.map((li) => li.querySelector("span")!.textContent)).toEqual([
      "1",
      "2",
      "3",
    ]);
  });

  it("renders each phase title as an h3 with its description", () => {
    render(<PhaseTimeline phases={phases} />);
    expect(
      screen.getByRole("heading", { level: 3, name: "Embed" }),
    ).toBeInTheDocument();
    expect(screen.getByText("We join your sprint.")).toBeInTheDocument();
  });

  it("draws a scroll-linked progress line over a static track, both hidden from assistive tech", () => {
    const { container } = render(<PhaseTimeline phases={phases} />);
    const lines = container.querySelectorAll("[aria-hidden='true']");
    expect(lines).toHaveLength(2);
    expect(container.querySelector(".lb-draw")).not.toBeNull();
  });
});
