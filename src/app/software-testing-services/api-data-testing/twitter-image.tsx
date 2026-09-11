import { ImageResponse } from "next/og";

import {
  buildMarketingOgElement,
  loadMarketingOgFonts,
  marketingOgImageSize,
} from "@/lib/marketing-og-image";

export const size = marketingOgImageSize;
export const contentType = "image/png";

export default async function Image() {
  const fonts = await loadMarketingOgFonts();
  return new ImageResponse(
    buildMarketingOgElement(
      "API and data testing services built to catch problems at the source",
      "software-testing-services",
    ),
    { ...size, fonts },
  );
}
