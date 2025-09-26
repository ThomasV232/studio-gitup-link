import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ArrowUpRight, Menu, MoonStar, Search, SunMedium } from "lucide-react";
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
import { CTA, CATEGORIES, MAIN_NAV, type CategorySlug } from "./nav.config";
import { AnimatePresence, motion } from "framer-motion";

const progressStyles =
  "pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 overflow-hidden";

const progressTransition = {
  type: "spring",
  stiffness: 210,
  damping: 32,
  mass: 0.8,
};

const navUnderlineTransition = {
  type: "spring",
  stiffness: 360,
  damping: 32,
};

const subnavHighlightTransition = {
  type: "spring",
  stiffness: 320,
  damping: 34,
};

export function HeaderRoot() {
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

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

  useEffect(() => {
    const updateProgress = () => {
      if (typeof document === "undefined") return;
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const max = Math.max(scrollHeight - clientHeight, 1);
      setScrollProgress(Math.min(scrollTop / max, 1));
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      setNavReady(true);
      return;
    }
    const id = window.requestAnimationFrame(() => setNavReady(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const toggleTheme = useCallback(
    () => setTheme((current) => (current === "dark" ? "light" : "dark")),
    []
  );
  const toggleLanguage = useCallback(
    () => setLanguage((current) => (current === "FR" ? "EN" : "FR")),
    []
  );

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

  const serviceSlugFromPath =
    location.pathname.match(/^\/services\/(?<slug>[^/]+)/)?.groups?.slug;
  const serviceSlugFromQuery = new URLSearchParams(location.search).get(
    "service"
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
      /^\/(?:services|realisations)\/(?<slug>[^/]+)/
    )?.groups?.slug ?? "";

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

      <header className="relative sticky top-0 z-50 overflow-hidden border-b border-white/10 bg-slate-950/80 shadow-[0_0_35px_rgba(15,23,42,0.65)] backdrop-blur-xl">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute -inset-x-32 -top-24 h-48 bg-gradient-to-r from-cyan-400/30 via-fuchsia-400/15 to-transparent blur-3xl"
            animate={{ x: [0, 60, -40, 0] }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 18,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>

        <div className="relative z-10 mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
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
                          ("mega" in item && item.mega?.length)
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
                        ("children" in item && item.children) ||
                        ("mega" in item && item.mega) ||
                        [];
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
                                    {"excerpt" in link &&
                                      link.excerpt && (
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
              className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-white transition hover:border-white/30 hover:bg-white/10"
            >
              <span className="relative hidden sm:inline">
                <AnimatePresence>
                  {navReady && (
                    <motion.span
                      className="absolute -inset-y-1 -inset-x-2 rounded-full bg-white/40 opacity-0 blur-md"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 0.45, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                    />
                  )}
                </AnimatePresence>
                <span className="relative">Studio VBG</span>
              </span>
            </Link>
          </div>

          {/* Desktop nav */}
          <NavigationMenu className="hidden flex-1 justify-center lg:flex">
            <NavigationMenuList className="flex items-center gap-6">
              {MAIN_NAV.map((item) => {
                const hasNested = Boolean(
                  ("children" in item && item.children?.length) ||
                    ("mega" in item && item.mega?.length)
                );
                if (!hasNested) {
                  return (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuLink asChild>
                        <NavLink
                          to={item.href}
                          className={({ isActive }) =>
                            cn(
                              "group relative inline-flex flex-col items-center gap-2 text-sm font-medium uppercase tracking-[0.3em] text-white/70 transition-colors duration-300",
                              isActive && "text-white"
                            )
                          }
                        >
                          {({ isActive }) => (
                            <motion.span
                              className="relative inline-flex flex-col items-center gap-2"
                              initial="inactive"
                              animate={isActive ? "active" : "inactive"}
                              whileHover="hover"
                              variants={{
                                inactive: { opacity: 1 },
                                hover: { opacity: 1 },
                                active: { opacity: 1 },
                              }}
                            >
                              <span className="relative px-2 py-1">
                                <AnimatePresence>
                                  {isActive && (
                                    <motion.span
                                      layoutId="nav-label-glow"
                                      className="absolute inset-0 rounded-full bg-white/10 blur-md"
                                      initial={{ opacity: 0, scale: 0.85 }}
                                      animate={{ opacity: 0.45, scale: 1 }}
                                      exit={{ opacity: 0, scale: 0.9 }}
                                      transition={navUnderlineTransition}
                                    />
                                  )}
                                </AnimatePresence>
                                <span className="relative z-10">
                                  {item.label}
                                </span>
                              </span>
                              <motion.span
                                aria-hidden
                                className="h-[2px] w-full rounded-full bg-gradient-to-r from-cyan-400/80 via-fuchsia-400/80 to-purple-500/80"
                                variants={{
                                  inactive: { scaleX: 0, opacity: 0 },
                                  hover: { scaleX: 1, opacity: 0.4 },
                                  active: { scaleX: 1, opacity: 1 },
                                }}
                                transition={navUnderlineTransition}
                                style={{ transformOrigin: "center" }}
                              />
                            </motion.span>
                          )}
                        </NavLink>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                }

                if ("children" in item && item.children?.length) {
                  return (
                    <NavigationMenuItem key={item.label}>
                      <NavigationMenuTrigger className="group border border-white/10 bg-transparent text-sm font-medium uppercase tracking-[0.3em] text-white/70 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white data-[state=open]:border-white/40 data-[state=open]:bg-white/10 data-[state=open]:text-white">
                        <span className="relative inline-flex items-center gap-2 px-2 py-1">
                          <AnimatePresence>
                            {navReady && (
                              <motion.span
                                className="absolute inset-0 rounded-full bg-white/5"
                                initial={{ opacity: 0, scale: 0.85 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{
                                  duration: 0.45,
                                  ease: [0.25, 1, 0.5, 1],
                                }}
                              />
                            )}
                          </AnimatePresence>
                          <span className="relative z-10">{item.label}</span>
                        </span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="mt-3 overflow-visible">
                        <motion.div
                          className="relative w-80 overflow-hidden rounded-[1.85rem] border border-white/15 bg-slate-950/90 p-4 text-white shadow-[0_28px_70px_rgba(15,23,42,0.55)] backdrop-blur-2xl"
                          initial={{ opacity: 0, y: 14, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 12, scale: 0.97 }}
                          transition={{
                            duration: 0.38,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <motion.span
                            aria-hidden
                            className="pointer-events-none absolute -inset-px rounded-[2rem] bg-gradient-to-br from-cyan-400/25 via-fuchsia-400/10 to-indigo-500/15 opacity-50 blur-2xl"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.6,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          />
                          <div className="relative z-10 space-y-3">
                            <NavigationMenuLink asChild>
                              <Link
                                to={item.href ?? "#"}
                                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
                              >
                                Voir tout
                                <ArrowUpRight className="h-3.5 w-3.5" />
                              </Link>
                            </NavigationMenuLink>
                            <motion.ul className="grid gap-2">
                              {item.children.map((child, index) => (
                                <motion.li
                                  key={child.href}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{
                                    duration: 0.35,
                                    ease: [0.16, 1, 0.3, 1],
                                    delay: index * 0.05,
                                  }}
                                >
                                  <Link
                                    to={child.href}
                                    className="block rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
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

                return (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuTrigger className="group border border-white/10 bg-transparent text-sm font-medium uppercase tracking-[0.3em] text-white/70 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white data-[state=open]:border-white/40 data-[state=open]:bg-white/10 data-[state=open]:text-white">
                      <span className="relative inline-flex items-center gap-2 px-2 py-1">
                        <AnimatePresence>
                          {navReady && (
                            <motion.span
                              className="absolute inset-0 rounded-full bg-white/5"
                              initial={{ opacity: 0, scale: 0.85 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{
                                duration: 0.45,
                                ease: [0.25, 1, 0.5, 1],
                              }}
                            />
                          )}
                        </AnimatePresence>
                        <span className="relative z-10">{item.label}</span>
                      </span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="mt-4 overflow-visible">
                      <motion.div
                        className="relative w-[720px] overflow-hidden rounded-[2.25rem] border border-white/15 bg-slate-950/95 p-6 text-white shadow-[0_32px_80px_rgba(15,23,42,0.6)] backdrop-blur-2xl"
                        initial={{ opacity: 0, y: 18, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.97 }}
                        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <motion.span
                          aria-hidden
                          className="pointer-events-none absolute -inset-px rounded-[2.35rem] bg-[conic-gradient(at_top_left,_theme(colors.cyan.400/18),_transparent_35%,_theme(colors.fuchsia.400/14),_transparent_70%,_theme(colors.sky.400/18))] opacity-60 blur-3xl"
                          initial={{ opacity: 0, rotate: -8 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                        />
                        <div className="relative z-10 space-y-4">
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.href ?? "#"}
                              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
                            >
                              Voir tout
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                          </NavigationMenuLink>
                          <motion.div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {"mega" in item && item.mega
                              ? item.mega.map((entry, index) => (
                                  <motion.div
                                    key={entry.href}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                      duration: 0.4,
                                      ease: [0.16, 1, 0.3, 1],
                                      delay: index * 0.05,
                                    }}
                                  >
                                    <Link
                                      to={entry.href}
                                      className="group flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-white/40 hover:bg-white/10"
                                    >
                                      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/80">
                                        {entry.label}
                                      </span>
                                      <p className="text-sm text-white/70">
                                        {entry.excerpt}
                                      </p>
                                      <span className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-white/60 transition group-hover:translate-x-1">
                                        Explorer
                                        <ArrowUpRight className="h-3.5 w-3.5" />
                                      </span>
                                    </Link>
                                  </motion.div>
                                ))
                              : null}
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
              className="rounded-full border border-white/10 bg-white/5 px-5 text-xs font-semibold uppercase tracking-[0.35em] text-white/80 hover:bg-white/10 hover:text-white"
            >
              <Link to="/connexion">Connexion</Link>
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
                                : "border-white/10 text-white/60 hover:border-white/20 hover:text-white"
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
                                  transition={subnavHighlightTransition}
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
      </header>

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
