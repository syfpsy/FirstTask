"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";

type VibePreset = {
  id: string;
  name: string;
  description: string;
  gradient: {
    base: string;
    mid: string;
    end: string;
  };
  highlight: string;
  mood: string;
};

type Ritual = {
  title: string;
  steps: string[];
};

const VIBE_PRESETS: VibePreset[] = [
  {
    id: "aurora",
    name: "Aurora Bloom",
    description:
      "Ambient purples with neon sparks for when the night feels endless and ideas won’t sit still.",
    gradient: {
      base: "#1e1b4b",
      mid: "#6d28d9",
      end: "#fb7185",
    },
    highlight: "#60ffe2",
    mood: "Nocturnal focus",
  },
  {
    id: "sunrise",
    name: "Sunrise Lo-Fi",
    description:
      "Soft ambers and dusty oranges that feel like brewing coffee while the city yawns awake.",
    gradient: {
      base: "#422006",
      mid: "#f97316",
      end: "#facc15",
    },
    highlight: "#fff0b3",
    mood: "Slow momentum",
  },
  {
    id: "tidal",
    name: "Tidal Bloom",
    description:
      "Cerulean waves with coral pops—perfect for flow states and breezy shipping energy.",
    gradient: {
      base: "#0f172a",
      mid: "#2563eb",
      end: "#38bdf8",
    },
    highlight: "#5eead4",
    mood: "Flow state",
  },
  {
    id: "glitch",
    name: "Glitch Hop",
    description:
      "Electric magentas and acid greens that vibrate like a live synth session.",
    gradient: {
      base: "#240046",
      mid: "#9d174d",
      end: "#f97316",
    },
    highlight: "#a3ff00",
    mood: "High energy",
  },
];

const MICRO_RITUALS: Ritual[] = [
  {
    title: "Breathing Loop",
    steps: [
      "Inhale for 4 counts",
      "Hold for 4",
      "Exhale for 6",
      "Write the first idea that shows up",
    ],
  },
  {
    title: "Palette Reset",
    steps: [
      "Change the vibe palette",
      "Refactor one component",
      "Commit a micro improvement",
      "Drop a celebratory emoji",
    ],
  },
  {
    title: "Sensory Sync",
    steps: [
      "Touch something textured",
      "Change playlists",
      "Rename a variable to match the new vibe",
    ],
  },
];

const PROMPTS = [
  "Build a widget that reflects the palette mood in real-time.",
  "Refine a component to be as smooth as the current gradient.",
  "Sketch a micro-interaction inspired by the soundtrack in your head.",
  "Automate the most boring thing you touched today.",
  "Ship a UI polish that nobody asked for but everyone will feel.",
];

const QUICK_LOOPS = [
  "Drop a TODO in the idea queue before it fades.",
  "Run format/lint so future-you can breathe.",
  "Capture a screenshot or Loom of what just clicked.",
  "Pair with a friend or rubber duck for 10 focused minutes.",
];

export default function Home() {
  const [selectedVibe, setSelectedVibe] = useState<VibePreset>(VIBE_PRESETS[0]);
  const [promptIndex, setPromptIndex] = useState(0);

  const gradientStyle = useMemo(() => {
    const { gradient, highlight } = selectedVibe;
    return {
      background: `radial-gradient(circle at 20% 20%, ${highlight}33 0%, transparent 55%), radial-gradient(circle at 80% 0%, ${gradient.end}4d 0%, transparent 60%), linear-gradient(135deg, ${gradient.base} 0%, ${gradient.mid} 55%, ${gradient.end} 100%)`,
      boxShadow: `0 50px 140px -60px ${gradient.end}aa`,
    } satisfies CSSProperties;
  }, [selectedVibe]);

  const nextPrompt = () => {
    setPromptIndex((index) => (index + 1) % PROMPTS.length);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12">
        <header className="flex flex-col gap-3">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Vibe Coding Studio</p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Craft the energy you want to code in.
          </h1>
          <p className="max-w-2xl text-base text-slate-300 md:text-lg">
            Pick a palette, let the gradient set the mood, and give yourself a ritual so the work
            flows. This studio is a home base for improvisational shipping, late-night breakthroughs,
            and gentle creative loops.
          </p>
        </header>

        <section className="flex flex-col gap-8 lg:flex-row">
          <div className="relative flex-1 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40">
            <div className="absolute inset-0" style={gradientStyle} aria-hidden />
            <div className="pointer-events-none absolute inset-0 mix-blend-screen opacity-30" style={{
              backgroundImage:
                "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 0, transparent 45%), radial-gradient(circle at 75% 65%, rgba(255,255,255,0.25) 0, transparent 55%)",
            }}
            />
            <div className="relative z-10 flex h-full flex-col justify-between gap-10 p-10">
              <div className="space-y-5">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.35em] text-white/80">
                  {selectedVibe.mood}
                </span>
                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold sm:text-3xl">{selectedVibe.name}</h2>
                  <p className="max-w-xl text-sm text-slate-100/80 sm:text-base">
                    {selectedVibe.description}
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-4 rounded-2xl border border-white/10 bg-slate-950/40 p-6 backdrop-blur">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
                      Prompt Loop
                    </p>
                    <button
                      type="button"
                      onClick={nextPrompt}
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-medium text-white transition hover:border-white/40 hover:bg-white/20"
                    >
                      Shuffle prompt ↻
                    </button>
                  </div>
                  <p className="text-base font-medium text-white/90 sm:text-lg">
                    {PROMPTS[promptIndex]}
                  </p>
                </div>
                <div className="grid gap-3 text-sm text-slate-200 sm:grid-cols-2">
                  {QUICK_LOOPS.map((loop) => (
                    <div
                      key={loop}
                      className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur transition hover:border-white/30 hover:bg-white/10"
                    >
                      {loop}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className="flex w-full flex-col gap-6 lg:w-[22rem]">
            <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur">
              <h3 className="text-lg font-semibold text-white">Palettes</h3>
              <p className="text-sm text-slate-300">
                Tap a palette to swap the energy. Each one tunes the gradients and changes the vibe
                tags.
              </p>
              <div className="space-y-3">
                {VIBE_PRESETS.map((vibe) => {
                  const isActive = vibe.id === selectedVibe.id;
                  return (
                    <button
                      key={vibe.id}
                      type="button"
                      onClick={() => setSelectedVibe(vibe)}
                      className={`group flex w-full items-start justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                        isActive
                          ? "border-white/70 bg-white/10 text-white"
                          : "border-white/10 bg-white/5 text-slate-200 hover:border-white/30 hover:bg-white/10"
                      }`}
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-semibold">{vibe.name}</p>
                        <p className="text-xs text-slate-300 group-hover:text-slate-200">
                          {vibe.description}
                        </p>
                      </div>
                      <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/30 text-[0.6rem] font-semibold uppercase tracking-[0.2em]">
                        {isActive ? "ON" : "SET"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur">
              <h3 className="text-lg font-semibold text-white">Micro Rituals</h3>
              <p className="text-sm text-slate-300">
                Pick one ritual per session. The goal is to keep the loop grounded, playful, and
                intentional.
              </p>
              <div className="space-y-3">
                {MICRO_RITUALS.map((ritual) => (
                  <div key={ritual.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-semibold text-white">{ritual.title}</p>
                    <ul className="mt-2 space-y-1 text-xs text-slate-300">
                      {ritual.steps.map((step) => (
                        <li key={step} className="flex items-start gap-2">
                          <span className="mt-[0.35rem] h-1.5 w-1.5 rounded-full bg-white/50" aria-hidden />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
