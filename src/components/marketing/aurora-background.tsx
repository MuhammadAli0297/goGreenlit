/**
 * Ambient drifting-blob background for bold, full-bleed sections. Pure CSS
 * keyframes (see globals.css), no client JS, keeps callers Server
 * Components. Reused by the homepage hero and any future bold section
 * that wants the same on-brand ambient signature.
 *
 * The blobs are tuned so text over their brightest point keeps WCAG
 * contrast (Navajo White body text 4.5:1, large Sandy Brown accents 3:1),
 * and softer below `sm`, where the same blobs cover far more of a section
 * (gotcha #68). Raise an alpha only after rerunning the pixel contrast scan.
 */
export function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="aurora-a absolute -top-32 -left-24 size-96 animate-[aurora-drift-a_22s_ease-in-out_infinite] rounded-full bg-[#ee9e58]/30 blur-3xl max-sm:bg-[#ee9e58]/16" />
      <div className="aurora-b absolute -top-24 -right-20 size-[28rem] animate-[aurora-drift-b_26s_ease-in-out_infinite] rounded-full bg-[#b1c680]/28 blur-3xl max-sm:bg-[#b1c680]/14" />
      <div className="aurora-c absolute -bottom-32 left-1/3 size-96 animate-[aurora-drift-c_19s_ease-in-out_infinite] rounded-full bg-[#8fa175]/32 blur-3xl max-sm:bg-[#8fa175]/18" />
      <div className="aurora-d absolute right-1/4 -bottom-24 size-72 animate-[aurora-drift-d_24s_ease-in-out_infinite] rounded-full bg-[#ffe0ad]/18 blur-3xl max-sm:bg-[#ffe0ad]/10" />
    </div>
  );
}
