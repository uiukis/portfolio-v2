"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { blip, scale, setSound, soundEnabled, subscribeSound } from "@/lib/sound";
import { useI18n } from "@/providers/i18n-provider";

const hoverTargets = ".project-stage, .project-link, .project-detail, .career-entry summary, .contact-email, header a, .hero-strip a";

/** Optional interface sounds: a soft note on hover and a pad note when a new section takes over. */
export function SoundToggle() {
  const { locale } = useI18n();
  const on = useSyncExternalStore(subscribeSound, soundEnabled, () => false);

  useEffect(() => {
    if (!on) return;
    let last: Element | null = null;
    const over = (event: PointerEvent) => {
      const target = (event.target as Element).closest(hoverTargets);
      if (!target || target === last) return;
      last = target;
      blip(scale[Math.floor(target.getBoundingClientRect().top / 40) % scale.length], .16, .03);
    };
    const click = () => blip(196, .2, .05);
    const sections = [...document.querySelectorAll("section[id]")];
    const seen = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) blip(scale[sections.indexOf(entry.target) % scale.length] / 2, .5, .03);
      }
    }, { threshold: .5 });
    sections.forEach((section) => seen.observe(section));
    document.addEventListener("pointerover", over);
    document.addEventListener("click", click);
    return () => {
      seen.disconnect();
      document.removeEventListener("pointerover", over);
      document.removeEventListener("click", click);
    };
  }, [on]);

  const label = locale === "pt" ? (on ? "Desligar sons" : "Ligar sons") : (on ? "Turn sounds off" : "Turn sounds on");
  return (
    <button type="button" className="sound-toggle focus-ring" aria-pressed={on} aria-label={label} title={label} onClick={() => setSound(!on)}>
      {on ? <Volume2 size={16} aria-hidden="true" /> : <VolumeX size={16} aria-hidden="true" />}
    </button>
  );
}
