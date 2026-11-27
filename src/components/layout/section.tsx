"use client";

import { cn } from "@/lib/utils";
import { MotionScene } from "@/components/ui/motion-scene";

interface SectionProps {
  id?: string;
  index?: string;
  headingId?: string;
  children: React.ReactNode;
  className?: string;
  label?: string;
  title?: string;
  description?: string;
}

export function Section({
  id,
  headingId,
  children,
  className,
  label,
  title,
  description,
}: SectionProps) {
  const labelledBy = headingId ?? (title && id ? `${id}-heading` : undefined);

  return (
    <section id={id} className={cn("portfolio-section relative py-12 md:py-14", className)} aria-labelledby={labelledBy}>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {(label || title || description) && (
          <MotionScene stagger className="section-heading mb-7 max-w-2xl">
            <header>
              {label && <p data-scene-part className="mb-4 text-sm font-medium text-accent">{label}</p>}
              {title && (
                <h2 data-scene-part id={labelledBy} className="text-3xl font-semibold leading-[1.12] tracking-tight text-foreground md:text-[2.75rem]">
                  {title.split(" ").map((word, i) => (
                    <span key={`${word}-${i}`}>
                      <span className="w"><span className="w-i">{word}</span></span>{" "}
                    </span>
                  ))}
                </h2>
              )}
              {description && <p data-scene-part className="mt-5 max-w-xl text-base leading-relaxed text-muted">{description}</p>}
            </header>
          </MotionScene>
        )}
        {children}
      </div>
    </section>
  );
}
