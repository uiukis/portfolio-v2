"use client";

import { useEffect, useRef } from "react";
import { Bot, Braces, Check, Cloud, Database, GitBranch, Sparkles, Workflow } from "lucide-react";
import { loadGsap, type SceneTimeline } from "@/lib/gsap";
import { useI18n } from "@/providers/i18n-provider";

const copy = {
  pt: { prompt: "automatize esse fluxo", steps: ["lendo a API", "montando a fila", "rodando os testes"], done: "pronto para revisão" },
  en: { prompt: "automate this workflow", steps: ["reading the API", "wiring the queue", "running the tests"], done: "ready for review" },
};

/** Illustrative snippet, one array of [token class, text] per line. */
const code: [string, string][][] = [
  [["k", "const "], ["v", "agent"], ["p", " = "], ["k", "new "], ["f", "Agent"], ["p", "({"]],
  [["p", "  tools: ["], ["v", "api"], ["p", ", "], ["v", "db"], ["p", ", "], ["v", "queue"], ["p", "],"]],
  [["p", "});"]],
  [["k", "await "], ["v", "agent"], ["p", "."], ["f", "run"], ["p", "("], ["s", "\"deploy\""], ["p", ");"]],
];

const icons = [
  { Icon: Sparkles, label: "LLM" },
  { Icon: Bot, label: "Agents" },
  { Icon: Braces, label: "API" },
  { Icon: Database, label: "SQL" },
  { Icon: Workflow, label: "MCP" },
  { Icon: GitBranch, label: "Git" },
  { Icon: Cloud, label: "Cloud" },
];

/** Code and an AI agent at work, ringed by tool icons. Pointer and scroll move each layer by its depth. */
export function HeroStage() {
  const stage = useRef<HTMLDivElement>(null);
  const { locale } = useI18n();
  const text = copy[locale === "en" ? "en" : "pt"];

  useEffect(() => {
    const element = stage.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame: number | undefined;
    let x = 0;
    let y = 0;
    const apply = () => {
      frame = undefined;
      element.style.setProperty("--mx", x.toFixed(3));
      element.style.setProperty("--my", y.toFixed(3));
      element.style.setProperty("--sy", Math.min(1, window.scrollY / window.innerHeight).toFixed(3));
    };
    const queue = () => { frame ??= requestAnimationFrame(apply); };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x = event.clientX / window.innerWidth - .5;
      y = event.clientY / window.innerHeight - .5;
      queue();
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", queue, { passive: true });
    queue();
    return () => {
      if (frame !== undefined) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", queue);
    };
  }, []);

  // Loop: the code types itself, then the agent works through its steps. Without GSAP everything stays visible.
  useEffect(() => {
    const element = stage.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let disposed = false;
    let context: { revert(): void } | undefined;
    let timeline: SceneTimeline | undefined;
    let visible = true;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) timeline?.play();
      else timeline?.pause();
    });
    observer.observe(element);
    void loadGsap().then((gsap) => {
      if (disposed) return;
      context = gsap.context(() => {
        const tl = gsap.timeline({ repeat: -1, repeatDelay: .4 });
        element.querySelectorAll(".code-line").forEach((line, index) => {
          tl.fromTo(line, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: .7, ease: "steps(24)" }, .3 + index * .72);
        });
        tl.fromTo(element.querySelectorAll(".agent-prompt"), { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: .4, ease: "power3.out" }, .2);
        element.querySelectorAll(".agent-step").forEach((step, index) => {
          const at = 3.8 + index * .8;
          tl.fromTo(step, { x: -12, opacity: 0 }, { x: 0, opacity: 1, duration: .35, ease: "power3.out" }, at);
          tl.fromTo(step.querySelectorAll("svg"), { scale: 0, rotate: -90 }, { scale: 1, rotate: 0, duration: .4, ease: "back.out(2)" }, at + .4);
        });
        tl.fromTo(element.querySelectorAll(".agent-done"), { scale: .7, opacity: 0 }, { scale: 1, opacity: 1, duration: .5, ease: "back.out(1.8)" }, 6.4);
        tl.to(element.querySelectorAll(".code-line, .agent-prompt, .agent-step, .agent-done"), { opacity: 0, duration: .5, ease: "power1.in" }, 9.4);
        tl.to(element.querySelectorAll(".code-line"), { opacity: 1, duration: .01 }, 9.95);
        timeline = tl;
        if (!visible) tl.pause();
      }, element);
    }).catch(() => undefined);
    return () => {
      disposed = true;
      observer.disconnect();
      context?.revert();
    };
  }, [locale]);

  return (
    <div ref={stage} className="hero-stage" aria-hidden="true">
      <div className="hero-layer hero-layer-orbit"><span className="hero-orbit" /></div>
      <div className="hero-layer hero-layer-code">
        <div className="hero-card">
          <div className="hero-float hero-window">
            <div className="hero-window-bar"><i /><i /><i /><span>agent.ts</span></div>
            <pre>
              {code.map((line, index) => (
                <span key={index} className="code-line">
                  {line.map(([kind, value], position) => <span key={position} className={`tk-${kind}`}>{value}</span>)}
                </span>
              ))}
            </pre>
          </div>
        </div>
      </div>
      <div className="hero-layer hero-layer-agent">
        <div className="hero-card">
          <div className="hero-float hero-window hero-agent">
            <p className="agent-prompt"><Sparkles size={13} />{text.prompt}</p>
            <ul>
              {text.steps.map((step) => <li key={step} className="agent-step"><Check size={12} />{step}</li>)}
            </ul>
            <p className="agent-done">{text.done}</p>
          </div>
        </div>
      </div>
      {icons.map(({ Icon, label }, index) => (
        <div key={label} className={`hero-layer hero-layer-icon hero-icon-${index + 1}`}>
          <div className="hero-card">
            <span className="hero-float hero-icon"><Icon size={20} strokeWidth={1.6} /><small>{label}</small></span>
          </div>
        </div>
      ))}
    </div>
  );
}
