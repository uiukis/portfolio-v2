type TweenVars = Record<string, unknown>;
type TweenTarget = Element | Element[] | NodeListOf<Element> | object;

export interface SceneTimeline {
  play(): SceneTimeline;
  kill(): void;
  pause(): SceneTimeline;
  seek(time: number): SceneTimeline;
  to(target: TweenTarget, vars: TweenVars, position?: number | string): SceneTimeline;
  fromTo(target: TweenTarget, from: TweenVars, to: TweenVars, position?: number | string): SceneTimeline;
}

export interface SceneGsap {
  context(setup: () => void, scope: Element): { revert(): void };
  timeline(options?: TweenVars): SceneTimeline;
  to(target: TweenTarget, vars: TweenVars): unknown;
}

declare global {
  interface Window {
    gsap?: SceneGsap;
  }
}

let runtime: Promise<SceneGsap> | undefined;

/** Load the same GSAP runtime used by the HyperFrames compositions. */
export function loadGsap(): Promise<SceneGsap> {
  if (window.gsap) return Promise.resolve(window.gsap);
  if (!runtime) {
    runtime = new Promise<SceneGsap>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "/vendor/gsap.min.js";
      script.async = true;
      script.onload = () => {
        if (window.gsap) resolve(window.gsap);
        else reject(new Error("GSAP did not initialize"));
      };
      script.onerror = () => reject(new Error("GSAP could not load"));
      document.head.appendChild(script);
    }).catch((error) => {
      runtime = undefined;
      throw error;
    });
  }
  return runtime;
}
