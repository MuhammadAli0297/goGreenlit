import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DevicePicker } from "@/components/marketing/device-picker";

describe("DevicePicker", () => {
  it("starts on iPhone with its checks shown", () => {
    render(<DevicePicker />);
    expect(screen.getByRole("tab", { name: "iPhone" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByText("Face ID and passcode flows")).toBeVisible();
  });

  it("keeps every device's checks in the document, one panel visible", () => {
    render(<DevicePicker />);
    expect(screen.getAllByRole("tabpanel", { hidden: true })).toHaveLength(3);
    expect(screen.getAllByRole("tabpanel")).toHaveLength(1);
  });

  it("morphs the phone to the tablet shape and swaps the checks", () => {
    const { container } = render(<DevicePicker />);
    const frame = container.querySelector<HTMLElement>(
      "[data-slot='device-frame']",
    )!;
    const phoneWidth = frame.style.width;
    fireEvent.click(screen.getByRole("tab", { name: "Tablet" }));
    expect(frame.style.width).not.toBe(phoneWidth);
    expect(screen.getByText("Split view and rotation")).toBeVisible();
  });

  it("supports arrow keys with wrap-around", () => {
    render(<DevicePicker />);
    fireEvent.keyDown(screen.getByRole("tab", { name: "iPhone" }), {
      key: "ArrowLeft",
    });
    expect(screen.getByRole("tab", { name: "Tablet" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("states no counts or percentages (no invented numbers)", () => {
    const { container } = render(<DevicePicker />);
    expect(container.textContent).not.toMatch(/\d/);
  });

  it("links to the mobile app testing page", () => {
    render(<DevicePicker />);
    expect(
      screen.getByRole("link", { name: /see mobile app testing/i }),
    ).toHaveAttribute("href", "/software-testing-services/mobile-app-testing");
  });
});
