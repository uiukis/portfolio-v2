"use client";

import { useSyncExternalStore } from "react";

const preference = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(preference);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(preference).matches,
    () => false,
  );
}
