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
      "Manual testing services that catch what automation can’t",
      "software-testing-services",
    ),
    { ...size, fonts },
  );
}
