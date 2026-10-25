import { ImageResponse } from "next/og";

import { buildHomeOgElement } from "@/lib/brand-og-cards";
import {
  loadMarketingOgFonts,
  marketingOgImageSize,
} from "@/lib/marketing-og-image";

export const size = marketingOgImageSize;
export const contentType = "image/png";
export const alt = "GoGreenlit: embedded QA teams for startups that ship fast";

export default async function Image() {
  const fonts = await loadMarketingOgFonts();
  return new ImageResponse(
    buildHomeOgElement(
      "Embedded QA teams for startups that ship fast",
      "ship fast",
    ),
    { ...size, fonts },
  );
}
