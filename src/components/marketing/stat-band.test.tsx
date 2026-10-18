import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StatBand } from "@/components/marketing/stat-band";

describe("StatBand", () => {
  it("shows only the four verified numbers, final values in the markup", () => {
    render(<StatBand />);
    for (const value of ["18+", "45%", "95%", "$1B+"]) {
      expect(
        screen.getByText(value, { selector: ".sr-only" }),
      ).toBeInTheDocument();
      // The visible digits start at the final value too, before any count.
      expect(
        screen.getByText(value, { selector: "[aria-hidden='true']" }),
      ).toBeInTheDocument();
    }
  });

  it("labels each number", () => {
    render(<StatBand />);
    for (const label of [
      "Years combined QA experience",
      "Reduction in escaped defects",
      "Release coverage achieved",
      "In revenue supported",
    ]) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it("is a labelled region", () => {
    render(<StatBand />);
    expect(
      screen.getByRole("region", { name: "Track record" }),
    ).toBeInTheDocument();
  });
});
