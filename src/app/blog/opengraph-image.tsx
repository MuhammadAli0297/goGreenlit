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
      "Straight talk on shipping quality software",
      "blog-index",
    ),
    { ...size, fonts },
  );
}
