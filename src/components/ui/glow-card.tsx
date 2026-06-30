"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type GlowCardProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
};

export function GlowCard({ children, className, innerClassName }: GlowCardProps) {
  return (
    <div className={cn("glow-card transition-transform duration-300 hover:scale-[1.01]", className)}>
      <div className={cn("glow-card-inner", innerClassName)}>{children}</div>
    </div>
  );
}
