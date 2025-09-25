import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 text-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at top, hsla(var(--visual-secondary)/0.2), transparent 60%)" }}
      />
      <div
        className="pointer-events-none absolute inset-0 animate-[spin_30s_linear_infinite]"
        style={{ background: "conic-gradient(from 45deg, hsla(var(--visual-accent)/0.15), transparent 60%)" }}
      />
      <div className="relative max-w-xl space-y-6 rounded-[3rem] border border-white/10 bg-white/5 p-12 text-center shadow-[0_20px_120px_rgba(56,189,248,0.2)] visual-accent-veil">
        <span className="text-xs uppercase tracking-[0.35em] text-cyan-100/80 visual-accent-text-strong">
          Erreur 404
        </span>
        <h1 className="text-5xl font-black">Cette page tourne encore en post-prod</h1>
        <p className="text-lg text-slate-200/80">
          On dirait que vous avez trouvé un espace vide dans notre storyboard. Revenez à l'accueil et lançons une nouvelle scène.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-3 rounded-full border border-cyan-200/40 visual-accent-border bg-cyan-500/20 visual-accent-bg px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white"
        >
          Retour au vaisseau
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
