import type { BlogContentBlock } from "@/lib/blog-data";

export function ArticleBody({ blocks }: { blocks: BlogContentBlock[] }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-6">
        {blocks.map((block, index) => {
          if (block.type === "heading") {
            return (
              <h2
                key={index}
                className="pt-4 text-2xl font-semibold tracking-tight text-balance"
              >
                {block.text}
              </h2>
            );
          }

          if (block.type === "subheading") {
            return (
              <h3
                key={index}
                className="pt-2 text-lg font-semibold tracking-tight text-balance"
              >
                {block.text}
              </h3>
            );
          }

          if (block.type === "list") {
            return (
              <ul key={index} className="space-y-2 pl-1">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="text-foreground/90 flex gap-3 text-base leading-relaxed"
                  >
                    <span
                      aria-hidden
                      className="bg-primary mt-2.5 size-1.5 shrink-0 rounded-full"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          }

          return (
            <p
              key={index}
              className="text-foreground/90 text-base leading-relaxed"
            >
              {block.text}
            </p>
          );
        })}
      </div>
    </div>
  );
}
