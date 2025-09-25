import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navigationItems } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { useStudio } from "@/context/StudioContext";

export const WaveMenu = () => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const { visualMode, cycleVisualMode, palette } = useStudio();

  return (
    <>
      <div className="pointer-events-none fixed right-2 top-0 z-50 hidden h-screen lg:flex">
        <div className="pointer-events-auto flex h-full flex-col justify-center gap-4">
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="group relative overflow-hidden rounded-full border border-white/20 bg-slate-900/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur transition hover:bg-slate-900/80"
          >
            <span className="relative inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              {expanded ? "Mode vague" : "Menu"}
            </span>
            <span className="absolute inset-0 animate-[pulse_2s_infinite] bg-gradient-to-r from-emerald-400/40 via-transparent to-cyan-500/40 opacity-0 transition group-hover:opacity-100" />
          </button>
          <button
            type="button"
            onClick={cycleVisualMode}
            className="group relative overflow-hidden rounded-full border border-cyan-200/40 visual-accent-border bg-cyan-500/20 visual-accent-bg px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-100 visual-accent-text shadow-[0_10px_30px_rgba(8,145,178,0.25)] visual-accent-shadow transition hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.35)]"
                style={{ background: `hsl(${palette.accent})` }}
              />
              {visualMode === "nebula" ? "Palette Solstice" : "Palette Nébula"}
            </span>
            <span className="absolute inset-0 -z-10 translate-x-[-120%] bg-gradient-to-r from-cyan-400 via-sky-300 to-fuchsia-400 visual-accent-gradient transition-transform duration-700 group-hover:translate-x-0" />
          </button>
          <nav
            aria-label="Menu nébuleux"
            className={cn(
              "relative flex w-72 origin-right flex-col gap-3 rounded-l-3xl border border-white/10 bg-gradient-to-b from-slate-950/80 via-slate-900/70 to-slate-950/80 p-4 text-sm text-white shadow-[0_0_60px_rgba(14,165,233,0.35)] transition-all duration-700",
              expanded ? "translate-x-0 opacity-100" : "translate-x-28 opacity-0"
            )}
          >
            <div className="pointer-events-none absolute -right-[60px] top-0 h-full w-[120px] overflow-hidden">
              <div
                className="absolute inset-0 blur-3xl"
                style={{ background: "radial-gradient(circle at 30% 50%, hsla(var(--visual-accent)/0.7), transparent 60%)" }}
              />
            </div>
            {navigationItems.map((item) => {
              const active = location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "group relative flex items-center justify-between overflow-hidden rounded-2xl border border-white/10 px-4 py-3 transition-all",
                    "hover:border-cyan-400/80 hover:bg-white/10 hover:text-white",
                    active ? "border-cyan-300 bg-white/20 text-white shadow-[0_0_30px_rgba(34,211,238,0.45)]" : "text-slate-200"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{item.emoji}</span>
                    <div>
                      <p className="text-base font-semibold uppercase tracking-[0.2em]">{item.label}</p>
                      <p className="text-[0.7rem] text-slate-300/80">{item.tooltip}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-cyan-300">{active ? "ON" : ".."}</span>
                  <span
                    className="absolute inset-0 -z-10 translate-x-[-80%] transition-transform duration-700 group-hover:translate-x-0"
                    style={{ background: "radial-gradient(circle at right, hsla(var(--visual-accent)/0.45), transparent 60%)" }}
                  />
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
      <div className="fixed bottom-4 right-4 z-50 pointer-events-none lg:hidden">
        <button
          type="button"
          onClick={cycleVisualMode}
          className="pointer-events-auto flex items-center gap-2 rounded-full border border-cyan-200/40 visual-accent-border bg-cyan-500/20 visual-accent-bg px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-100 visual-accent-text shadow-[0_10px_30px_rgba(8,145,178,0.25)] visual-accent-shadow backdrop-blur"
        >
          <span
            className="h-2.5 w-2.5 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.35)]"
            style={{ background: `hsl(${palette.accent})` }}
          />
          {visualMode === "nebula" ? "Solstice" : "Nébula"}
        </button>
      </div>
    </>
  );
};
