import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { FaqAccordion } from "@/components/marketing/faq-accordion";

const faqs = [
  {
    question: "Do I have to buy every service?",
    answer: "No. Most teams start with one.",
  },
  {
    question: "Is there a long-term contract?",
    answer:
      "No. Read about our [embedded QA team](/qa-consulting/embedded-qa-team).",
  },
];

describe("FaqAccordion", () => {
  it("renders every question as a button, all closed by default", () => {
    render(<FaqAccordion faqs={faqs} />);
    for (const { question } of faqs) {
      const trigger = screen.getByRole("button", { name: question });
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    }
  });

  it("opens a question on click and shows its answer", async () => {
    const user = userEvent.setup();
    render(<FaqAccordion faqs={faqs} />);
    const trigger = screen.getByRole("button", {
      name: "Do I have to buy every service?",
    });
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("No. Most teams start with one.")).toBeVisible();
  });

  it("renders inline [label](/path) links in an answer as real links", async () => {
    const user = userEvent.setup();
    render(<FaqAccordion faqs={faqs} />);
    await user.click(
      screen.getByRole("button", { name: "Is there a long-term contract?" }),
    );
    expect(
      screen.getByRole("link", { name: "embedded QA team" }),
    ).toHaveAttribute("href", "/qa-consulting/embedded-qa-team");
  });

  it("draws its own plus icon and hides the primitive's chevrons", () => {
    const { container } = render(<FaqAccordion faqs={faqs} />);
    const trigger = container.querySelector("[data-slot='accordion-trigger']")!;
    expect(trigger.className).toContain(
      "**:data-[slot=accordion-trigger-icon]:hidden!",
    );
    expect(trigger.querySelector("span[aria-hidden='true']")).not.toBeNull();
  });
});
