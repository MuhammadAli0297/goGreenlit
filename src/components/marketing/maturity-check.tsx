"use client";

import Link from "next/link";
import { useId, useState } from "react";

import { ctaVariants } from "@/components/brand/cta-variants";
import { StickerCard } from "@/components/brand/sticker-card";
import { cn } from "@/lib/utils";

export interface CheckQuestion {
  /** A statement the visitor ticks when it is true today. */
  text: string;
  /** What to do when this is the first untrue statement. */
  advice: { title: string; body: string; cta: string; href: string };
}

export interface CheckAllGood {
  title: string;
  body: string;
  cta: string;
  href: string;
}

/**
 * The one-minute maturity check: tick what is true about your QA today, and
 * the card points to the best place to start, a real subpage for each gap.
 * The first statement left unticked decides the advice, so the order of
 * `questions` is the order of priority. Ticking all of them points to the
 * audit instead. No email, nothing is stored or sent.
 *
 * Each statement is a real checkbox (keyboard and screen reader friendly),
 * and the result sits in a polite live region. The score is the visitor's
 * own tally of their answers, not a claim about anyone's QA.
 */
export function MaturityCheck({
  questions,
  allGood,
}: {
  questions: readonly CheckQuestion[];
  allGood: CheckAllGood;
}) {
  const [ticked, setTicked] = useState<boolean[]>(() =>
    questions.map(() => false),
  );
  const base = useId();

  const score = ticked.filter(Boolean).length;
  const firstMissing = ticked.findIndex((value) => !value);
  const advice =
    firstMissing === -1 ? allGood : questions[firstMissing]!.advice;

  function toggle(index: number) {
    setTicked((current) => current.map((v, i) => (i === index ? !v : v)));
  }

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
      <fieldset className="flex flex-col gap-3.5">
        <legend className="sr-only">Tick every statement that is true</legend>
        {questions.map((question, index) => {
          const id = `${base}-q${index}`;
          return (
            <label
              key={question.text}
              htmlFor={id}
              className={cn(
                "text-ink border-ink flex cursor-pointer items-start gap-4 rounded-[18px] border-[1.5px] px-5 py-4 text-lg leading-snug font-medium transition-[transform,background-color] duration-200 hover:translate-x-1 motion-reduce:transition-none motion-reduce:hover:translate-x-0",
                "has-[:focus-visible]:outline-navajo has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-3",
                ticked[index] ? "bg-olive" : "bg-surface",
              )}
            >
              <input
                id={id}
                type="checkbox"
                checked={ticked[index]}
                onChange={() => toggle(index)}
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className="border-ink bg-paper peer-checked:bg-deep mt-0.5 inline-flex size-[26px] shrink-0 items-center justify-center rounded-lg border-[1.5px]"
              >
                <svg
                  viewBox="0 0 16 16"
                  className={cn(
                    "text-navajo size-3.5",
                    ticked[index] ? "opacity-100" : "opacity-0",
                  )}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 8.5 6.5 12 13 4.5" />
                </svg>
              </span>
              <span>{question.text}</span>
            </label>
          );
        })}
      </fieldset>

      <StickerCard
        tone="navajo"
        interactive={false}
        className="p-7 shadow-[6px_6px_0_var(--ink)] lg:sticky lg:top-28"
      >
        <div aria-live="polite">
          <p className="font-label text-xs tracking-widest uppercase">
            Your tally
          </p>
          <p className="mt-2 flex items-baseline gap-2 leading-none tabular-nums">
            <span className="text-7xl tracking-[-0.04em]">{score}</span>
            <span className="text-3xl">of {questions.length} true</span>
          </p>
          <div
            aria-hidden="true"
            className="border-ink bg-paper mt-4 h-4 overflow-hidden rounded-full border-[1.5px]"
          >
            <div
              className="bg-olive border-ink h-full border-r-[1.5px] transition-[width] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none"
              style={{
                width: `${(score / questions.length) * 100}%`,
                borderRightWidth: score === 0 ? 0 : undefined,
              }}
            />
          </div>
          <p className="mt-5 text-2xl leading-tight font-medium tracking-[-0.02em]">
            {advice.title}
          </p>
          <p className="mt-2 text-[17px] leading-relaxed">{advice.body}</p>
        </div>
        <Link
          href={advice.href}
          className={cn(ctaVariants({ variant: "cta", size: "md" }), "mt-6")}
        >
          {advice.cta} <span aria-hidden="true">&rarr;</span>
        </Link>
      </StickerCard>
    </div>
  );
}
