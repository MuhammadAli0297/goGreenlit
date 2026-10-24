import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  AnswerBox,
  RedFlags,
  StatCallout,
} from "@/components/marketing/blog-callouts";
import { blogPosts } from "@/lib/blog-data";
import { verifiedStats } from "@/lib/verified-stats";

describe("AnswerBox", () => {
  it("labels itself and renders the answer with inline links", () => {
    render(<AnswerBox text="Hire a [coverage map](/qa-consulting) first." />);
    expect(screen.getByText("The short answer")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "coverage map" })).toHaveAttribute(
      "href",
      "/qa-consulting",
    );
  });
});

describe("StatCallout", () => {
  it.each(Object.keys(verifiedStats) as (keyof typeof verifiedStats)[])(
    "shows the verified %s stat with its own label",
    (key) => {
      render(<StatCallout stat={key} note="From a real engagement." />);
      expect(screen.getByText(verifiedStats[key].label)).toBeInTheDocument();
      expect(screen.getByText("From a real engagement.")).toBeInTheDocument();
    },
  );

  it("formats the figures the way the stat band does", () => {
    const { rerender } = render(<StatCallout stat="escapedDefects" note="x" />);
    expect(screen.getByText("45%")).toBeInTheDocument();
    rerender(<StatCallout stat="revenue" note="x" />);
    expect(screen.getByText("$1B+")).toBeInTheDocument();
    rerender(<StatCallout stat="experience" note="x" />);
    expect(screen.getByText("18+")).toBeInTheDocument();
  });
});

describe("RedFlags", () => {
  it("is a real list marked with the bug pill, so it is not color alone", () => {
    render(<RedFlags items={["One sign", "Another sign"]} title="Watch for" />);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("Red flags")).toBeInTheDocument();
    expect(screen.getByText("Watch for")).toBeInTheDocument();
  });
});

describe("callout blocks in the catalog", () => {
  it("every stat block names a verified stat and has a note", () => {
    for (const post of blogPosts) {
      for (const block of post.body) {
        if (block.type !== "stat") continue;
        expect(verifiedStats[block.stat], post.slug).toBeDefined();
        expect(block.note.length, post.slug).toBeGreaterThan(10);
      }
    }
  });

  it("an answer box always sits directly under a heading", () => {
    for (const post of blogPosts) {
      post.body.forEach((block, i) => {
        if (block.type === "answer") {
          expect(post.body[i - 1]?.type, post.slug).toBe("heading");
        }
      });
    }
  });
});
