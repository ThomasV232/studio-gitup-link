import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ArrowUpRight, Menu, MoonStar, Search, SunMedium } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

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

import { CTA, CATEGORIES, MAIN_NAV } from "./nav.config";

type Theme = "light" | "dark";
type Language = "FR" | "EN";

const easing = [0.22, 1, 0.36, 1] as const;

const indicatorTransition = {
  type: "spring",
  stiffness: 420,
  damping: 36,
  mass: 0.65,
};

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      if (typeof document === "undefined") return;
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const max = Math.max(scrollHeight - clientHeight, 1);
      setProgress(Math.min(scrollTop / max, 1));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return progress;
}

function useLanguage(): [Language, Dispatch<SetStateAction<Language>>] {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return "FR";
    const stored = window.localStorage.getItem("studio-lang");
    return stored === "EN" ? "EN" : "FR";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("studio-lang", language);
  }, [language]);

  return [language, setLanguage];
}

function useTheme(): [Theme, Dispatch<SetStateAction<Theme>>] {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    const stored = window.localStorage.getItem("studio-theme");
    if (stored === "light" || stored === "dark") return stored;
    const prefersDark =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("studio-theme", theme);
  }, [theme]);

  return [theme, setTheme];
}

export function HeaderRoot() {
  const location = useLocation();
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [language, setLanguage] = useLanguage();
  const [theme, setTheme] = useTheme();

  const scrollProgress = useScrollProgress();

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
      href: `/portfolio/${category.slug}`,
    }));

    return { primary, services, works };
  }, []);

  const ctaLabel = CTA.label;
  const ctaHref = CTA.href;

  const isPortfolio = location.pathname.startsWith("/portfolio");
  const isServices = location.pathname.startsWith("/services");

  const subNavItems = useMemo(() => {
    if (!isPortfolio && !isServices) return [] as { label: string; href: string }[];
    const base = isPortfolio ? "/portfolio" : "/services";
    return CATEGORIES.map((category) => ({
      label: category.label,
      href: `${base}/${category.slug}`,
    }));
  }, [isPortfolio, isServices]);

  const activeSubnavSlug =
    location.pathname.match(
      /^\/(?:services|portfolio)\/(?<slug>[^/]+)/,
    )?.groups?.slug ?? "";

  const dropdownMotion = {
    initial: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 8,
      scale: prefersReducedMotion ? 1 : 0.98,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.24, ease: easing },
    },
    exit: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 4,
      scale: prefersReducedMotion ? 1 : 0.98,
      transition: { duration: 0.18, ease: easing },
    },
  };

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, [setTheme]);

  const toggleLanguage = useCallback(() => {
    setLanguage((current) => (current === "FR" ? "EN" : "FR"));
  }, [setLanguage]);

  const handleCommandSelect = useCallback(
    (value: string) => {
      setCommandOpen(false);
      navigate(value);
    },
    [navigate],
  );

  return (
    <Fragment>
      <span
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent"
      >
        <motion.span
          className="block h-full w-full origin-left rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500"
          initial={false}
          animate={{ scaleX: Math.max(scrollProgress, 0.001) }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 32,
            mass: 0.7,
          }}
          style={{ transformOrigin: "left" }}
        />
      </span>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
          <div className="flex flex-1 items-center gap-3">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 lg:hidden"
                  aria-label="Ouvrir la navigation"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-full max-w-sm border-white/10 bg-slate-950/90 p-0 text-white"
              >
                <SheetHeader className="space-y-2 border-b border-white/10 px-6 pb-4 pt-6 text-left">
                  <SheetTitle className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                    Studio VBG
                  </SheetTitle>
                  <p className="text-sm text-white/50">Navigation principale</p>
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
                              className="block rounded-xl border border-white/15 bg-white/5 px-4 py-3 uppercase tracking-[0.28em] text-white transition hover:bg-white/10"
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
                          className="rounded-xl border border-white/15 bg-white/[0.04]"
                        >
                          <AccordionItem value={item.href ?? item.label}>
                            <AccordionTrigger className="px-4 py-3 text-left text-xs uppercase tracking-[0.28em] text-white">
                              {item.label}
                            </AccordionTrigger>
                            <AccordionContent className="space-y-2 px-4 pb-4">
                              {item.href && (
                                <SheetClose asChild>
                                  <Link
                                    to={item.href}
                                    className="block rounded-lg border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/80 transition hover:bg-white/15 hover:text-white"
                                  >
                                    Voir tout
                                  </Link>
                                </SheetClose>
                              )}
                              {nestedLinks.map((link) => (
                                <SheetClose asChild key={link.href}>
                                  <Link
                                    to={link.href}
                                    className="block rounded-lg border border-white/5 bg-white/[0.08] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/75 transition hover:bg-white/12 hover:text-white"
                                  >
                                    <div>{link.label}</div>
                                    {"excerpt" in link && link.excerpt ? (
                                      <p className="pt-1 text-[0.7rem] normal-case text-white/60">
                                        {String(link.excerpt)}
                                      </p>
                                    ) : null}
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
                    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs uppercase tracking-[0.28em] text-white/70">
                      <button
                        type="button"
                        onClick={() => setCommandOpen(true)}
                        className="inline-flex items-center gap-2 text-white/80 transition hover:text-white"
                      >
                        <Search className="h-4 w-4" />
                        Rechercher (⌘K)
                      </button>
                      <button
                        type="button"
                        onClick={toggleTheme}
                        className="rounded-full border border-white/10 p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
                        aria-label="Changer de thème"
                      >
                        {theme === "dark" ? (
                          <SunMedium className="h-4 w-4" />
                        ) : (
                          <MoonStar className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs uppercase tracking-[0.28em] text-white/70">
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
                        className="block rounded-full border border-white/20 bg-white px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.3em] text-slate-950 transition hover:bg-white/90"
                      >
                        {ctaLabel}
                      </Link>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white/30 hover:bg-white/10"
            >
              Studio VBG
            </Link>
          </div>

          <DesktopNavigation
            dropdownMotion={dropdownMotion}
            indicatorTransition={indicatorTransition}
          />

          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 px-4 text-xs font-semibold uppercase tracking-[0.28em] text-white/70 transition hover:text-white"
            >
              <Search className="h-4 w-4" />
              Rechercher
            </button>
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex h-10 items-center rounded-full border border-white/10 px-3 text-xs font-semibold uppercase tracking-[0.28em] text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              {language}
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-10 items-center justify-center rounded-full border border-white/10 px-3 text-white/70 transition hover:bg-white/10 hover:text-white"
              aria-label="Changer de thème"
            >
              {theme === "dark" ? (
                <SunMedium className="h-4 w-4" />
              ) : (
                <MoonStar className="h-4 w-4" />
              )}
            </button>
            <Button
              asChild
              className="rounded-full border border-transparent bg-white px-5 text-xs font-semibold uppercase tracking-[0.3em] text-slate-950 hover:bg-white/90"
            >
              <Link to={ctaHref}>{ctaLabel}</Link>
            </Button>
          </div>
        </div>

        {subNavItems.length > 0 && (
          <div className="border-t border-white/10 bg-slate-950/75">
            <div className="mx-auto max-w-6xl px-4">
              <nav className="flex gap-3 overflow-x-auto py-3">
                {subNavItems.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className="group relative inline-flex focus:outline-none"
                  >
                    {({ isActive }) => {
                      const active =
                        isActive || item.href.endsWith(`/${activeSubnavSlug}`);

                      return (
                        <span
                          className={cn(
                            "relative inline-flex items-center justify-center rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] transition",
                            active
                              ? "border-white/40 text-white"
                              : "border-white/15 text-white/60 hover:border-white/25 hover:text-white",
                          )}
                        >
                          <AnimatePresence>
                            {active ? (
                              <motion.span
                                layoutId="subnav-indicator"
                                className="absolute inset-0 rounded-full bg-white/10"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={indicatorTransition}
                              />
                            ) : null}
                          </AnimatePresence>
                          <span className="relative z-10">{item.label}</span>
                        </span>
                      );
                    }}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>

      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="Rechercher une page, un service ou une réalisation..." />
        <CommandList>
          <CommandEmpty>Aucun résultat</CommandEmpty>
          <CommandGroup heading="Navigation">
            {commandGroups.primary.map((item) => (
              <CommandItem
                key={item.href}
                value={item.href}
                onSelect={handleCommandSelect}
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
                value={item.href}
                onSelect={handleCommandSelect}
              >
                {item.label}
                <CommandShortcut>↵</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Réalisations">
            {commandGroups.works.map((item) => (
              <CommandItem
                key={item.href}
                value={item.href}
                onSelect={handleCommandSelect}
              >
                {item.label}
                <CommandShortcut>↵</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </Fragment>
  );
}

type DesktopNavigationProps = {
  dropdownMotion: {
    initial: Record<string, unknown>;
    animate: Record<string, unknown>;
    exit: Record<string, unknown>;
  };
  indicatorTransition: typeof indicatorTransition;
};

function DesktopNavigation({
  dropdownMotion,
  indicatorTransition,
}: DesktopNavigationProps) {
  const location = useLocation();

  return (
    <NavigationMenu className="hidden flex-1 justify-center lg:flex">
      <NavigationMenuList className="flex items-center gap-6">
        {MAIN_NAV.map((item) => {
          const hasNested = Boolean(
            ("children" in item && item.children?.length) ||
              ("mega" in item && item.mega?.length),
          );

          if (!hasNested) {
            return (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild>
                  <NavLink
                    to={item.href}
                    className="relative inline-flex flex-col items-center gap-1 text-sm font-semibold uppercase tracking-[0.26em] text-white/70 transition hover:text-white"
                  >
                    {({ isActive }) => (
                      <span className="relative">
                        {item.label}
                        <AnimatePresence>
                          {isActive ? (
                            <motion.span
                              layoutId="nav-indicator"
                              className="absolute -bottom-1 left-1/2 h-0.5 w-full -translate-x-1/2 rounded-full bg-white"
                              initial={{ opacity: 0, scaleX: 0.6 }}
                              animate={{ opacity: 1, scaleX: 1 }}
                              exit={{ opacity: 0, scaleX: 0.6 }}
                              transition={indicatorTransition}
                              style={{ transformOrigin: "center" }}
                            />
                          ) : null}
                        </AnimatePresence>
                      </span>
                    )}
                  </NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          }

          const nestedLinks =
            ("children" in item && item.children) ||
            ("mega" in item && item.mega) ||
            [];

          return (
            <NavigationMenuItem key={item.label}>
              <NavigationMenuTrigger className="inline-flex flex-col items-center gap-1 rounded-full border border-transparent bg-transparent px-3 py-2 text-sm font-semibold uppercase tracking-[0.26em] text-white/70 transition hover:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white">
                <span>{item.label}</span>
                <AnimatePresence>
                  {typeof item.href === "string" &&
                  location.pathname.startsWith(item.href) ? (
                    <motion.span
                      layoutId="nav-indicator"
                      className="h-0.5 w-full rounded-full bg-white"
                      initial={{ opacity: 0, scaleX: 0.6 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      exit={{ opacity: 0, scaleX: 0.6 }}
                      transition={indicatorTransition}
                      style={{ transformOrigin: "center" }}
                    />
                  ) : null}
                </AnimatePresence>
              </NavigationMenuTrigger>
              <NavigationMenuContent asChild>
                <motion.div
                  {...dropdownMotion}
                  className={cn(
                    "mt-3",
                    "w-[min(28rem,90vw)]",
                    "rounded-2xl",
                    "border border-white/10",
                    "bg-slate-950/95",
                    "p-5",
                    "shadow-lg",
                    "backdrop-blur"
                  )}
                >
                  <div className="flex flex-col gap-4">
                    {item.href ? (
                      <NavigationMenuLink asChild>
                        <Link
                          to={item.href}
                          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-white/80 transition hover:text-white"
                        >
                          Tout voir
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </NavigationMenuLink>
                    ) : null}

                    <div className="grid gap-3 sm:grid-cols-2">
                      {nestedLinks.map((link) => (
                        <NavigationMenuLink asChild key={link.href}>
                          <Link
                            to={link.href}
                            className="group flex h-full flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-left transition hover:border-white/25 hover:bg-white/10"
                          >
                            <span className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-200/70">
                              {link.label}
                            </span>
                            {"excerpt" in link && link.excerpt ? (
                              <p className="text-sm text-white/70">
                                {link.excerpt}
                              </p>
                            ) : null}
                            <span className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.26em] text-white/60 transition group-hover:text-white">
                              Explorer
                              <ArrowUpRight className="h-3 w-3" />
                            </span>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
