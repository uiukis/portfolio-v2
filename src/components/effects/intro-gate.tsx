"use client";

/**
 * Runs while the HTML is parsed, before the first paint, so the page never shows ahead of the intro.
 * The timeout releases the cover if the app never hydrates.
 */
const script = `(function(){try{
if(location.pathname!=="/"||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
var d=document.documentElement;d.dataset.intro="playing";d.dataset.build="pending";d.dataset.cover="1";
setTimeout(function(){if(d.dataset.cover){delete d.dataset.cover;delete d.dataset.intro;delete d.dataset.build}},8000);
}catch(e){}})()`;

export function IntroGate() {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}
