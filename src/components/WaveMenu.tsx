import { Link, useLocation } from "react-router-dom";
import { navigationItems } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { useStudio } from "@/context/StudioContext";

export const WaveMenu = () => {
  const location = useLocation();
  const { user } = useStudio();

  // Si pas connecté·e, on masque l'entrée /dashboard
  const items = user ? navigationItems : navigationItems.filter((item) => item.to !== "/dashboard");

  return (
    <>
      <div className="pointer-events-none fixed left-1/2 top-6 z-50 flex w-full max-w-5xl -translate-x-1/2 flex-col gap-3 px-4">
        <div className="pointer-events-auto overflow-hidden rounded-full border border-white/20 bg-slate-950/70 text-white shadow-[0_25px_60px_rgba(15,118,110,0.25)] backdrop-blur">
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "linear-gradient(120deg, hsla(var(--visual-accent)/0.35), hsla(var(--visual-secondary)/0.3), hsla(var(--visual-tertiary)/0.35))",
              backgroundSize: "200% 200%",
              animation: "bandAurora 18s ease-in-out infinite",
            }}
          />
          <div className="relative flex flex-wrap items-center gap-4 px-6 py-3">
            <div className="flex min-w-0 flex-1 items-center">
              <div className="relative flex w-full items-center gap-2 overflow-hidden">
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                    animation: "bandShimmer 6s linear infinite",
                  }}
                />
                <div className="relative flex w-full items-center gap-2 overflow-x-auto whitespace-nowrap pb-2 pt-2">
                  {items.map((item) => {
                    const active =
                      location.pathname === item.to ||
                      location.pathname.startsWith(`${item.to}/`);
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        className={cn(
                          "group relative flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.25em] transition",
                          "hover:border-white/40 hover:bg-white/15",
                          active
                            ? "border-cyan-300/80 bg-white/25 text-white shadow-[0_10px_40px_rgba(56,189,248,0.35)]"
                            : "text-slate-200/90"
                        )}
                      >
                        <span className="text-lg">{item.emoji}</span>
                        <span>{item.label}</span>
                        <span className="pointer-events-none absolute inset-0 -z-10 translate-x-[-120%] rounded-full bg-gradient-to-r from-white/10 via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-0" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                to={user ? "/dashboard" : "/auth?mode=login"}
                className="group relative overflow-hidden rounded-full border border-white/20 bg-white/15 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white transition hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="text-base">{user ? "📊" : "🔐"}</span>
                  {user ? "Tableau de bord" : "Connexion"}
                </span>
                <span className="pointer-events-none absolute inset-0 -z-0 translate-y-full bg-white/20 transition-all duration-500 group-hover:translate-y-0" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
