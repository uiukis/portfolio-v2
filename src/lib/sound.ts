/** Opt-in interface sounds, synthesised with Web Audio so no asset is shipped. Off by default. */
const storageKey = "portfolio-sound";
const changeEvent = "portfolio-sound-change";
let enabled = false;
let loaded = false;
let context: AudioContext | undefined;

function load() {
  if (loaded) return;
  loaded = true;
  try { enabled = window.localStorage.getItem(storageKey) === "on"; } catch { /* storage is optional */ }
}

export function soundEnabled(): boolean {
  load();
  return enabled;
}

export function subscribeSound(onChange: () => void) {
  window.addEventListener(changeEvent, onChange);
  return () => window.removeEventListener(changeEvent, onChange);
}

export function setSound(next: boolean) {
  load();
  enabled = next;
  try { window.localStorage.setItem(storageKey, next ? "on" : "off"); } catch { /* storage is optional */ }
  if (next) {
    context ??= new AudioContext();
    void context.resume();
    blip(660, .18, .05);
  }
  window.dispatchEvent(new Event(changeEvent));
}

/** A short, soft sine note with a quick attack and exponential decay. */
export function blip(frequency: number, duration = .14, volume = .035) {
  if (!enabled || !context) return;
  const now = context.currentTime;
  const osc = context.createOscillator();
  const gain = context.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(frequency, now);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(volume, now + .012);
  gain.gain.exponentialRampToValueAtTime(.0001, now + duration);
  osc.connect(gain).connect(context.destination);
  osc.start(now);
  osc.stop(now + duration + .02);
}

/** Pentatonic steps keep hover sounds consonant whatever order they fire in. */
export const scale = [392, 440, 494, 587, 659, 784];
