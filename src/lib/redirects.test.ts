import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config";

describe("next.config redirects", () => {
  it("sends the mistyped agile sprint cycles URL to the real post, permanently", async () => {
    const redirects = (await nextConfig.redirects?.()) ?? [];
    expect(redirects).toContainEqual({
      source: "/blog/agile-agile-sprint-cycles",
      destination: "/blog/agile-qa-sprint-cycles",
      permanent: true,
    });
  });

  it("never points a redirect at itself", async () => {
    const redirects = (await nextConfig.redirects?.()) ?? [];
    for (const r of redirects) expect(r.source).not.toBe(r.destination);
  });
});
