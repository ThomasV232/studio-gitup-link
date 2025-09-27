import {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  MoonStar,
  Search,
  SunMedium,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useStudio } from "@/context/StudioContext";
import { CTA, CATEGORIES, MAIN_NAV, type CategorySlug } from "./nav.config";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const progressStyles =
  "pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 overflow-hidden";

const progressTransition = {
  type: "spring",
  stiffness: 210,
  damping: 32,
  mass: 0.8,
} as const;

const instantTransition = { duration: 0.001 } as const;

const brandPalettes = {
  light: "Palette Solstice",
  dark: "Palette Nebula",
} as const;

const navUnderlineTransition = {
  type: "spring",
  stiffness: 360,
  damping: 32,
} as const;

const subnavHighlightTransition = {
  type: "spring",
  stiffness: 320,
  damping: 34,
} as const;

const floatingPanelClass =
  "relative z-20 overflow-visible rounded-[2.5rem] border border-white/12 bg-slate-950/88 text-white shadow-[0_26px_90px_rgba(12,18,37,0.72)] backdrop-blur-[30px] before:pointer-events-none before:absolute before:inset-[1.5px] before:-z-10 before:rounded-[2.4rem] before:bg-slate-950/75 before:shadow-[0_0_60px_rgba(59,130,246,0.2)] before:content-[''] after:pointer-events-none after:absolute after:inset-0 after:-z-20 after:rounded-[2.9rem] after:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_58%)] after:opacity-80 after:blur-[60px] after:content-['']";

const floatingPanelGlow =
  "pointer-events-none absolute -inset-[140px] rounded-[3.8rem] bg-[conic-gradient(at_top_left,_theme(colors.sky.400/20),_transparent_40%,_theme(colors.fuchsia.400/15),_transparent_75%,_theme(colors.violet.500/22))] opacity-75 blur-[82px] mix-blend-screen";

const frostedCapsClass =
  "rounded-full border border-white/15 bg-white/7 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white/80 transition duration-300 hover:border-white/35 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30";

const frostedTileClass =
  "rounded-[1.9rem] border border-white/12 bg-white/6 px-4 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-white/80 transition duration-300 hover:border-white/35 hover:bg-white/10 hover:text-white";

const navButtonBaseClass = cn(
  "group/nav nav-item relative inline-flex !h-auto !w-auto flex-col items-center gap-1 !rounded-full !px-2 !py-1.5 text-white/65 transition-colors duration-300",
  "hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 group-data-[state=open]/nav:text-white"
);
const navButtonActiveClass =
  "nav-item-active text-white drop-shadow-[0_0_18px_rgba(59,130,246,0.35)]";

type HeaderNavLabelProps = {
  label: string;
  active?: boolean;
  open?: boolean;
  showChevron?: boolean;
  reduceMotion: boolean;
};

function HeaderNavLabel({
  label,
  active = false,
  open = false,
  showChevron = false,
  reduceMotion,
}: HeaderNavLabelProps) {
  const state = active || open ? "active" : "idle";
  const highlightTransition = reduceMotion
    ? instantTransition
    : { duration: 0.42, ease: [0.22, 1, 0.36, 1] };

  return (
    <motion.span
      className="relative inline-flex flex-col items-center gap-1"
      initial={false}
      animate={state}
      whileHover="hover"
      variants={{
        idle: { opacity: 1 },
        hover: { opacity: 1 },
        active: { opacity: 1 },
      }}
    >
      <span className="relative inline-flex items-center gap-2 px-3 py-1.5">
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.38),_rgba(236,72,153,0.24)_40%,_rgba(14,165,233,0.18)_78%)] opacity-0"
          variants={{
            idle: { opacity: 0, scale: 0.7 },
            hover: { opacity: 0.24, scale: 1 },
            active: { opacity: 0.38, scale: 1 },
          }}
          transition={highlightTransition}
        />
        <span className="relative z-10 text-[0.78rem] font-semibold uppercase tracking-[0.42em] leading-none">
          {label}
        </span>
        {showChevron && (
          <motion.span
            aria-hidden
            className="relative z-10 mt-[1px] flex items-center justify-center text-white/60"
            animate={{ rotate: open ? 180 : 0, opacity: open ? 1 : 0.75 }}
            transition={
              reduceMotion
                ? instantTransition
                : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
            }
          >
            <ChevronDown className="h-3 w-3" />
          </motion.span>
        )}
      </span>
      <motion.span
        aria-hidden
        className="pointer-events-none h-[2px] w-full rounded-full bg-gradient-to-r from-cyan-300/80 via-fuchsia-400/80 to-purple-500/80"
        variants={{
          idle: { scaleX: 0, opacity: 0 },
          hover: { scaleX: 1, opacity: 0.35 },
          active: { scaleX: 1, opacity: 1 },
        }}
        transition={reduceMotion ? instantTransition : navUnderlineTransition}
        style={{ transformOrigin: "center" }}
      />
    </motion.span>
  );
}

export function HeaderRoot() {
  const location = useLocation();
  const navigate = useNavigate();
  const { brandAssets } = useStudio();

  const headerRef = useRef<HTMLElement | null>(null);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [openItem, setOpenItem] = useState<string | null>(null);

  const [language, setLanguage] = useState<"FR" | "EN">(() => {
    if (typeof window === "undefined") return "FR";
    const stored = window.localStorage.getItem("studio-lang");
    return stored === "EN" ? "EN" : "FR";
  });

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "dark";
    const stored = window.localStorage.getItem("studio-theme");
    if (stored === "light" || stored === "dark") return stored;
    const prefersDark =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [navReady, setNavReady] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const shouldReduceMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();

  const blurAmount = useTransform(scrollY, [0, 220], [26, 40]);
  const glassOpacity = useTransform(scrollY, [0, 220], [0.92, 0.78]);
  const accentOffset = useTransform(scrollY, [0, 420], [0, 74]);
  const glassBackdrop = useMotionTemplate`blur(${blurAmount}px)`;
  const glassBackground = useMotionTemplate`rgba(10, 16, 38, ${glassOpacity})`;

  const applyTheme = useCallback((value: "light" | "dark") => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", value === "dark");
    document.documentElement.style.colorScheme = value;
  }, []);

  useEffect(() => {
    applyTheme(theme);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("studio-theme", theme);
    }
  }, [applyTheme, theme]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("studio-lang", language);
  }, [language]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
  });
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 24);
  });

  useEffect(() => {
    setOpenItem(null);
  }, [location.pathname]);

  useEffect(() => {
    if (typeof window === "undefined") {
      setNavReady(true);
      return;
    }
    const id = window.requestAnimationFrame(() => setNavReady(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  useLayoutEffect(() => {
    if (typeof document === "undefined" || typeof window === "undefined") return;
    if (!headerRef.current) return;
    const root = document.documentElement;
    const update = () => {
      if (!headerRef.current) return;
      const rect = headerRef.current.getBoundingClientRect();
      root.style.setProperty("--studio-header-height", `${rect.height}px`);
      root.style.setProperty(
        "--studio-header-float-offset",
        `${rect.height + 16}px`,
      );
      root.style.setProperty(
        "--studio-header-float-offset-lg",
        `${rect.height + 28}px`,
      );
    };
    update();
    const handleResize = () => update();
    const handleScroll = () => update();
    let observer: ResizeObserver | undefined;
    if (typeof ResizeObserver === "function") {
      observer = new ResizeObserver(() => update());
      observer.observe(headerRef.current);
    }
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      root.style.removeProperty("--studio-header-height");
      root.style.removeProperty("--studio-header-float-offset");
      root.style.removeProperty("--studio-header-float-offset-lg");
    };
  }, [navReady]);

  const toggleTheme = useCallback(
    () => setTheme((current) => (current === "dark" ? "light" : "dark")),
    [],
  );
  const toggleLanguage = useCallback(
    () => setLanguage((current) => (current === "FR" ? "EN" : "FR")),
    [],
  );

  // Dynamic CTA (keep from main)
  const serviceSlugFromPath =
    location.pathname.match(/^\/services\/(?<slug>[^/]+)/)?.groups?.slug;
  const serviceSlugFromQuery = new URLSearchParams(location.search).get(
    "service",
  );
  const activeService = useMemo(() => {
    const preferred = (serviceSlugFromPath ||
      serviceSlugFromQuery) as CategorySlug | null;
    return CATEGORIES.find((category) => category.slug === preferred);
  }, [serviceSlugFromPath, serviceSlugFromQuery]);

  const ctaLabel = activeService ? `Devis ${activeService.label}` : CTA.label;
  const ctaHref = activeService
    ? `/contact?service=${activeService.slug}`
    : CTA.href;

  const isRealisations = location.pathname.startsWith("/realisations");
  const isServices = location.pathname.startsWith("/services");

  const subNavItems = useMemo(() => {
    if (!isRealisations && !isServices)
      return [] as { label: string; href: string }[];
    const base = isRealisations ? "/realisations" : "/services";
    return CATEGORIES.map((category) => ({
      label: category.label,
      href: `${base}/${category.slug}`,
    }));
  }, [isRealisations, isServices]);

  const activeSubnavSlug =
    location.pathname.match(
      /^\/(?:services|realisations)\/(?<slug>[^/]+)/,
    )?.groups?.slug ?? "";

  const commandGroups = useMemo(() => {
    const primary = MAIN_NAV.map((item) => ({
      label: item.label,
      href: item.href,
    }));
    const services = CATEGORIES.map((category) => ({
      label: `Service · ${category.label}`,
      href: `/services/${category.slug}`,
    }));
    const works = CATEGORIES.map((category) => ({
      label: `Réalisations · ${category.label}`,
      href: `/realisations/${category.slug}`,
    }));
    return { primary, services, works };
  }, []);

  const headerShellClass = useMemo(
    () =>
      cn(
        "relative isolate sticky top-0 z-50 border-b border-white/12 transition-shadow duration-500 before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.18),_rgba(59,130,246,0.12),_rgba(15,23,42,0.92))] before:opacity-90 before:content-['']",
        isScrolled
          ? "shadow-[0_22px_60px_rgba(7,11,23,0.58)]"
          : "shadow-[0_0_35px_rgba(15,23,42,0.65)]",
      ),
    [isScrolled],
  );

  const accentDrift = shouldReduceMotion ? undefined : accentOffset;
  const brandSrc = theme === "dark" ? brandAssets.nebula : brandAssets.solstice;
  const brandPaletteLabel = brandPalettes[theme];

  return (
    <Fragment>
      {/* Top progress bar */}
      <span className={progressStyles} aria-hidden>
        <motion.span
          className="block h-full w-full origin-left rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-violet-500"
          initial={false}
          animate={{ scaleX: Math.max(scrollProgress, 0.001) }}
          transition={progressTransition}
          style={{ transformOrigin: "left" }}
        />
      </span>

      <motion.header
        ref={headerRef}
        data-scrolled={isScrolled ? "true" : "false"}
        className={headerShellClass}
        style={{
          backgroundColor: glassBackground,
          backdropFilter: glassBackdrop,
          WebkitBackdropFilter: glassBackdrop,
        }}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.div
            className="absolute -inset-x-32 -top-28 h-56 bg-gradient-to-r from-sky-400/30 via-fuchsia-400/16 to-transparent blur-3xl"
            animate={
              shouldReduceMotion
                ? { opacity: 0.65 }
                : { opacity: [0.55, 0.85, 0.55] }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  }
            }
            style={accentDrift ? { x: accentDrift as any } : {}}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </motion.div>

        <div
          className={cn(
            "relative z-10 mx-auto flex max-w-6xl items-center gap-3 px-4 sm:px-6 transition-[padding,transform] duration-500",
            isScrolled ? "py-2.5" : "py-3.5",
          )}
        >
          {/* Left: mobile menu + brand */}
          <div className="flex items-center gap-3">
            {/* Mobile drawer */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 lg:hidden"
                  aria-label="Ouvrir la navigation"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-full max-w-sm border-white/10 bg-slate-950/95 p-0 text-white"
              >
                <SheetHeader className="space-y-2 border-b border-white/10 px-6 pb-4 pt-6 text-left">
                  <SheetTitle className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.35em] text-white/60">
                    Studio VBG
                  </SheetTitle>
                  <p className="text-xs text-white/50">Navigation principale</p>
                </SheetHeader>

                <div className="flex h-full flex-col gap-8 px-6 py-8">
                  <nav className="space-y-4 text-sm font-medium text-white/85">
                    {MAIN_NAV.map((item) => {
                      const hasNested = Boolean(
                        ("children" in item && item.children?.length) ||
                          ("mega" in item && item.mega?.length),
                      );
                      if (!hasNested) {
                        return (
                          <SheetClose asChild key={item.href}>
                            <Link
                              to={item.href}
                              className="block rounded-2xl border border-white/10 bg-white/5 px-4 py-3 uppercase tracking-[0.3em] text-white transition hover:bg-white/10"
                            >
                              {item.label}
                            </Link>
                          </SheetClose>
                        );
                      }
                      const nestedLinks =
                        (("children" in item && item.children) ||
                          ("mega" in item && item.mega) ||
                          []) as { href: string; label: string; excerpt?: string }[];
                      return (
                        <Accordion
                          key={item.label}
                          type="single"
                          collapsible
                          className="rounded-2xl border border-white/10 bg-white/5"
                        >
                          <AccordionItem value={item.href ?? item.label}>
                            <AccordionTrigger className="px-4 py-3 text-left text-sm uppercase tracking-[0.3em] text-white">
                              {item.label}
                            </AccordionTrigger>
                            <AccordionContent className="space-y-2 px-4 pb-4">
                              {item.href && (
                                <SheetClose asChild>
                                  <Link
                                    to={item.href}
                                    className="block rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:bg-white/15 hover:text-white"
                                  >
                                    Voir tout
                                  </Link>
                                </SheetClose>
                              )}
                              {nestedLinks.map((link) => (
                                <SheetClose asChild key={link.href}>
                                  <Link
                                    to={link.href}
                                    className="block rounded-xl border border-white/5 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:bg-white/15 hover:text-white"
                                  >
                                    <div>{link.label}</div>
                                    {"excerpt" in link && link.excerpt && (
                                      <p className="pt-1 text-[0.65rem] normal-case text-white/60">
                                        {String(link.excerpt)}
                                      </p>
                                    )}
                                  </Link>
                                </SheetClose>
                              ))}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      );
                    })}
                  </nav>

                  <div className="mt-auto space-y-4">
                    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <button
                        type="button"
                        onClick={() => setCommandOpen(true)}
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:text-white"
                      >
                        <Search className="h-4 w-4" />
                        Rechercher (⌘K)
                      </button>
                      <button
                        type="button"
                        onClick={toggleTheme}
                        className="rounded-full border border-white/10 p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
                        aria-label="Changer de thème"
                      >
                        {theme === "dark" ? (
                          <SunMedium className="h-4 w-4" />
                        ) : (
                          <MoonStar className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs uppercase tracking-[0.3em] text-white/70">
                      <span>Langue</span>
                      <button
                        type="button"
                        onClick={toggleLanguage}
                        className="rounded-full border border-white/10 px-3 py-1 text-white/90 transition hover:bg-white/10"
                      >
                        {language}
                      </button>
                    </div>

                    <SheetClose asChild>
                      <Link
                        to={ctaHref}
                        className="block rounded-full border border-white/20 bg-white px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.35em] text-slate-950 transition hover:bg-white/90"
                      >
                        {ctaLabel}
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        to="/connexion"
                        className="block rounded-full border border-white/10 bg-white/5 px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:bg-white/10 hover:text-white"
                      >
                        Connexion
                      </Link>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Brand */}
            <Link
              to="/"
              className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/10">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={brandSrc}
                    src={brandSrc}
                    alt={`VBG Studio — ${brandPaletteLabel}`}
                    className="h-8 w-8"
                    initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotate: 8 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.45,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                  />
                </AnimatePresence>
              </span>
              <span className="relative hidden flex-col leading-tight text-left sm:flex">
                <AnimatePresence>
                  {navReady && (
                    <motion.span
                      aria-hidden
                      className="absolute -inset-y-1 -inset-x-2 rounded-full bg-white/35 opacity-0 blur-md"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 0.5, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: shouldReduceMotion ? 0 : 0.6,
                        ease: [0.25, 1, 0.5, 1],
                      }}
                    />
                  )}
                </AnimatePresence>
                <span className="relative z-10 text-xs font-semibold uppercase tracking-[0.35em]">
                  Studio VBG
                </span>
                <span className="relative z-10 text-[0.6rem] font-normal uppercase tracking-[0.5em] text-white/60">
                  Vidéo · IA · Diffusion
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={brandPaletteLabel}
                    className="relative z-10 pt-1 text-[0.55rem] font-medium uppercase tracking-[0.42em] text-white/40"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.35,
                      ease: [0.42, 0, 0.58, 1],
                    }}
                  >
                    {brandPaletteLabel}
                  </motion.span>
                </AnimatePresence>
              </span>
            </Link>
          </div>

          {/* Desktop nav */}
          <NavigationMenu
            className="hidden flex-1 justify-center lg:flex"
            value={openItem ?? undefined}
            onValueChange={(value) => setOpenItem(value || null)}
          >
            <NavigationMenuList className="flex items-center gap-6">
              {MAIN_NAV.map((item) => {
                const hasNested = Boolean(
                  ("children" in item && item.children?.length) ||
                    ("mega" in item && item.mega?.length),
                );
                const itemKey = item.href ?? item.label;
                const routeActive = Boolean(
                  item.href &&
                    (item.href === "/"
                      ? location.pathname === "/"
                      : location.pathname === item.href ||
                        location.pathname.startsWith(`${item.href}/`)),
                );
                const isOpen = openItem === itemKey;

                if (!hasNested) {
                  return (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuLink asChild>
                        <NavLink
                          to={item.href}
                          end={item.href === "/"}
                          className={({ isActive }) =>
                            cn(
                              navButtonBaseClass,
                              (isActive || routeActive) && navButtonActiveClass,
                            )
                          }
                        >
                          {({ isActive }) => (
                            <HeaderNavLabel
                              label={item.label}
                              active={isActive || routeActive}
                              reduceMotion={shouldReduceMotion}
                            />
                          )}
                        </NavLink>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                }

                if ("children" in item && item.children?.length) {
                  return (
                    <NavigationMenuItem key={item.label} value={itemKey}>
                      <NavigationMenuTrigger
                        hideChevron
                        className={cn(
                          navButtonBaseClass,
                          (isOpen || routeActive) && navButtonActiveClass,
                        )}
                      >
                        <HeaderNavLabel
                          label={item.label}
                          active={routeActive}
                          open={isOpen}
                          showChevron
                          reduceMotion={shouldReduceMotion}
                        />
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="pointer-events-none fixed left-1/2 top-[var(--studio-header-float-offset,92px)] z-[55] -translate-x-1/2 overflow-visible px-4 sm:px-0">
                        <motion.div
                          className={cn(
                            "pointer-events-auto",
                            floatingPanelClass,
                            "w-[min(22rem,calc(100vw-2.5rem))] p-5",
                          )}
                          initial={{ opacity: 0, y: 14, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 12, scale: 0.97 }}
                          transition={{
                            duration: shouldReduceMotion ? 0 : 0.38,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          layout
                        >
                          <motion.span
                            aria-hidden
                            className={floatingPanelGlow}
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: shouldReduceMotion ? 0 : 0.6,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          />
                          <div className="relative z-10 space-y-4">
                            <NavigationMenuLink asChild>
                              <Link
                                to={item.href ?? "#"}
                                className={cn(
                                  frostedCapsClass,
                                  "flex items-center justify-between gap-3",
                                )}
                              >
                                Voir tout
                                <ArrowUpRight className="h-3.5 w-3.5" />
                              </Link>
                            </NavigationMenuLink>
                            <motion.ul className="grid gap-3">
                              {item.children.map((child, index) => (
                                <motion.li
                                  key={child.href}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{
                                    duration: shouldReduceMotion ? 0 : 0.35,
                                    ease: [0.16, 1, 0.3, 1],
                                    delay: shouldReduceMotion ? 0 : index * 0.05,
                                  }}
                                >
                                  <Link
                                    to={child.href}
                                    className={cn("block", frostedTileClass)}
                                  >
                                    {child.label}
                                  </Link>
                                </motion.li>
                              ))}
                            </motion.ul>
                          </div>
                        </motion.div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                }

                // Mega menu
                return (
                  <NavigationMenuItem key={item.label} value={itemKey}>
                    <NavigationMenuTrigger
                      hideChevron
                      className={cn(
                        navButtonBaseClass,
                        (isOpen || routeActive) && navButtonActiveClass,
                      )}
                    >
                      <HeaderNavLabel
                        label={item.label}
                        active={routeActive}
                        open={isOpen}
                        showChevron
                        reduceMotion={shouldReduceMotion}
                      />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="pointer-events-none fixed left-1/2 top-[var(--studio-header-float-offset-lg,104px)] z-[55] -translate-x-1/2 overflow-visible px-4 sm:px-0">
                      <motion.div
                        className={cn(
                          "pointer-events-auto",
                          floatingPanelClass,
                          "w-[min(46rem,calc(100vw-2rem))] p-6",
                        )}
                        initial={{ opacity: 0, y: 18, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.97 }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.42,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        layout
                      >
                        <motion.span
                          aria-hidden
                          className={floatingPanelGlow}
                          initial={{ opacity: 0, rotate: -6, scale: 0.94 }}
                          animate={{ opacity: 1, rotate: 0, scale: 1 }}
                          transition={{
                            duration: shouldReduceMotion ? 0 : 0.75,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        />
                        <div className="relative z-10 space-y-5">
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.href ?? "#"}
                              className={cn(
                                frostedCapsClass,
                                "inline-flex items-center gap-2",
                              )}
                            >
                              Voir tout
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                          </NavigationMenuLink>
                          <motion.div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {"mega" in item &&
                              item.mega?.map((entry, index) => (
                                <motion.div
                                  key={entry.href}
                                  initial={{ opacity: 0, y: 12 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{
                                    duration: shouldReduceMotion ? 0 : 0.4,
                                    ease: [0.16, 1, 0.3, 1],
                                    delay: shouldReduceMotion ? 0 : index * 0.05,
                                  }}
                                >
                                  <Link
                                    to={entry.href}
                                    className="group flex h-full flex-col gap-3 rounded-[1.85rem] border border-white/12 bg-white/5 p-4 transition duration-300 hover:border-white/35 hover:bg-white/10"
                                  >
                                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-cyan-200/85">
                                      {entry.label}
                                    </span>
                                    <p className="text-sm text-white/70">
                                      {entry.excerpt}
                                    </p>
                                    <span className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.32em] text-white/60 transition group-hover:translate-x-1">
                                      Explorer
                                      <ArrowUpRight className="h-3.5 w-3.5" />
                                    </span>
                                  </Link>
                                </motion.div>
                              ))}
                          </motion.div>
                        </div>
                      </motion.div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right: actions */}
          <div className="ml-auto hidden items-center gap-2 lg:flex">
            <Button
              asChild
              className="rounded-full border border-white/10 bg-white/5 px-5 text-xs font-semibold uppercase tracking-[0.35em] text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <Link to={ctaHref}>{ctaLabel}</Link>
            </Button>
          </div>
        </div>

        {/* Secondary subnav */}
        {subNavItems.length > 0 && (
          <div className="relative z-10 border-t border-white/10 bg-slate-950/80">
            <div className="mx-auto max-w-6xl px-4">
              <nav className="flex gap-3 overflow-x-auto py-3">
                {subNavItems.map((item) => {
                  const isActive = item.href.endsWith(`/${activeSubnavSlug}`);
                  return (
                    <NavLink
                      key={item.href}
                      to={item.href}
                      className="group relative inline-flex focus:outline-none"
                    >
                      {({ isActive: routeActive }) => {
                        const active = isActive || routeActive;
                        return (
                          <span
                            className={cn(
                              "relative inline-flex items-center justify-center overflow-hidden rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition-colors duration-300 group-focus-visible:ring-2 group-focus-visible:ring-white/40 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-slate-950",
                              active
                                ? "border-white/40 text-white"
                                : "border-white/10 text-white/60 hover:border-white/20 hover:text-white",
                            )}
                          >
                            <AnimatePresence>
                              {active && (
                                <motion.span
                                  layoutId="subnav-highlight"
                                  className="absolute inset-0 rounded-full bg-white/10"
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  transition={
                                    shouldReduceMotion
                                      ? instantTransition
                                      : subnavHighlightTransition
                                  }
                                />
                              )}
                            </AnimatePresence>
                            <span className="relative z-10">{item.label}</span>
                          </span>
                        );
                      }}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          </div>
        )}
      </motion.header>

      {/* Command palette */}
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="Rechercher une page, un service ou une réalisation..." />
        <CommandList>
          <CommandEmpty>Aucun résultat pour cette recherche.</CommandEmpty>

          <CommandGroup heading="Navigation">
            {commandGroups.primary.map((item) => (
              <CommandItem
                key={item.href}
                value={item.label}
                onSelect={() => {
                  navigate(item.href);
                  setCommandOpen(false);
                }}
              >
                {item.label}
                <CommandShortcut>↵</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Services">
            {commandGroups.services.map((item) => (
              <CommandItem
                key={item.href}
                value={item.label}
                onSelect={() => {
                  navigate(item.href);
                  setCommandOpen(false);
                }}
              >
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Réalisations">
            {commandGroups.works.map((item) => (
              <CommandItem
                key={item.href}
                value={item.label}
                onSelect={() => {
                  navigate(item.href);
                  setCommandOpen(false);
                }}
              >
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </Fragment>
  );
}
