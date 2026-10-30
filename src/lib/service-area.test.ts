import { describe, expect, it } from "vitest";
import { serviceAreaSchema } from "./service-area";

describe("serviceAreaSchema", () => {
  it("names Chicago, Illinois and the United States", () => {
    expect(serviceAreaSchema).toEqual([
      { "@type": "City", name: "Chicago, Illinois" },
      { "@type": "Country", name: "United States" },
    ]);
  });

  it("no longer says Remote", () => {
    expect(JSON.stringify(serviceAreaSchema)).not.toContain("Remote");
  });
});
