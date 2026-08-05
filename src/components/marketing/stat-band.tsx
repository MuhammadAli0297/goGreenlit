import { AnimatedStatValue } from "@/components/marketing/animated-stat-value";
import { Reveal } from "@/components/marketing/reveal";

type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

const stats: Stat[] = [
  { value: 18, suffix: "+", label: "Years combined QA experience" },
  { value: 45, suffix: "%", label: "Reduction in escaped defects" },
  { value: 95, suffix: "%", label: "Release coverage achieved" },
  { value: 1, prefix: "$", suffix: "B+", label: "In revenue supported" },
];

export function StatBand() {
  return (
    <div className="border-border/60 border-y bg-[#8fa175]">
      <Reveal className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-10 sm:grid-cols-4 sm:px-6 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center sm:text-left">
            <AnimatedStatValue
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
            />
            <p className="text-foreground/80 mt-1 text-sm">{stat.label}</p>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
