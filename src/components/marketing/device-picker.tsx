"use client";

import Link from "next/link";
import { useId } from "react";

import { ctaVariants } from "@/components/brand/cta-variants";
import { useTabs } from "@/lib/use-tabs";
import { cn } from "@/lib/utils";

type Device = {
  id: string;
  label: string;
  /** Frame size in pixels and corner radius, the shape the phone morphs to. */
  width: number;
  height: number;
  radius: number;
  checks: readonly string[];
};

/**
 * What mobile testing looks at on each kind of device. Generic and
 * qualitative: no counts of devices or checks, and no coverage claims
 * (BRAND_GUIDELINES.md section 2).
 */
const devices: readonly Device[] = [
  {
    id: "iphone",
    label: "iPhone",
    width: 150,
    height: 290,
    radius: 32,
    checks: [
      "Face ID and passcode flows",
      "Dynamic Island and safe areas",
      "Low power mode behavior",
      "Offline and weak signal",
    ],
  },
  {
    id: "android",
    label: "Android",
    width: 150,
    height: 300,
    radius: 20,
    checks: [
      "Back gesture and system navigation",
      "Notch and punch-hole layouts",
      "Background kill and restore",
      "Permission prompts",
    ],
  },
  {
    id: "tablet",
    label: "Tablet",
    width: 224,
    height: 290,
    radius: 24,
    checks: [
      "Split view and rotation",
      "Large-screen layouts",
      "Keyboard and trackpad input",
      "Multitasking states",
    ],
  },
];

/**
 * "Pick a device. See the checks." Three tabs; the drawn phone morphs its
 * size and corner radius to the chosen device and the checklist beside it
 * swaps. All three panels are in the server HTML (inactive ones `hidden`),
 * the phone drawing is decorative, and it holds still with reduced motion.
 */
export function DevicePicker() {
  const { active, setActive, tabRef, onKeyDown } = useTabs(devices.length);
  const base = useId();
  const current = devices[active] ?? devices[0]!;

  return (
    <div>
      <div
        role="tablist"
        aria-label="Device type"
        className="flex flex-wrap gap-2.5"
      >
        {devices.map((device, index) => {
          const selected = index === active;
          return (
            <button
              key={device.id}
              ref={tabRef(index)}
              type="button"
              role="tab"
              id={`${base}-tab-${device.id}`}
              aria-selected={selected}
              aria-controls={`${base}-panel-${device.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={onKeyDown(index)}
              className={cn(
                "border-ink h-11 rounded-full border-[1.5px] px-5 text-[15px] font-semibold transition-colors duration-200",
                selected ? "bg-sandy text-ink" : "bg-surface hover:bg-olive",
              )}
            >
              {device.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:gap-12">
        <div className="flex h-[320px] w-56 shrink-0 items-center justify-center">
          <div
            aria-hidden="true"
            data-slot="device-frame"
            className="border-ink bg-navajo flex flex-col gap-2.5 border-[3px] px-3 py-4 transition-[width,height,border-radius] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none"
            style={{
              width: current.width,
              height: current.height,
              borderRadius: current.radius,
            }}
          >
            <div className="bg-ink mx-auto h-3 w-2/5 rounded-full" />
            <div className="bg-sandy h-11 rounded-[10px]" />
            <div className="bg-olive h-11 rounded-[10px]" />
            <div className="bg-leaf h-11 rounded-[10px]" />
            <div className="flex-1" />
            <div className="bg-deep h-7 rounded-full" />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          {devices.map((device, index) => (
            <div
              key={device.id}
              role="tabpanel"
              id={`${base}-panel-${device.id}`}
              aria-labelledby={`${base}-tab-${device.id}`}
              hidden={index !== active}
            >
              <ul className="flex flex-col gap-3.5">
                {device.checks.map((check) => (
                  <li
                    key={check}
                    className="flex items-center gap-3 text-[17px]"
                  >
                    <span
                      aria-hidden="true"
                      className="border-ink bg-olive inline-flex size-6 shrink-0 items-center justify-center rounded-full border-[1.5px]"
                    >
                      <svg
                        viewBox="0 0 16 16"
                        className="size-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 8.5 6.5 12 13 4.5" />
                      </svg>
                    </span>
                    {check}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Link
            href="/software-testing-services/mobile-app-testing"
            className={cn(ctaVariants({ size: "md" }), "mt-8")}
          >
            See mobile app testing <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
