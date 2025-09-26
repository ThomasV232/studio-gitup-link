import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ArrowUpRight, Languages, Menu, MoonStar, Search, SunMedium } from "lucide-react";

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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { CTA, CATEGORIES, MAIN_NAV, type CategorySlug } from "./nav.config";

const progressStyles =
  "pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 overflow-hidden";

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

  const applyTheme = useCallback((value: "light" | "dark") => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", value === "dark");
    document.documentElement.style.colorScheme = value;
  }, []);

  // Apply and persist theme
  useEffect(() => {
    applyTheme(theme);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("studio-theme", theme);
    }
  }, [applyTheme, theme]);

  // Persist language
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("studio-lang", language);
  }, [language]);

  // Fallback initial theme sync on first mount (SSR safety)
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (typeof window === "undefined") {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
      return;
    }
    const stored = window.localStorage.getItem("studio-theme");
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
    const value =
      stored === "light" || stored === "dark" ? stored : prefersDark ? "dark" : "light";
    document.documentElement.classList.toggle("dark", value === "dark");
    document.documentElement.style.colorScheme = value;
  }, []);

  // ⌘/Ctrl+K opens command dialog
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

  // Scroll progress
  useEffect(() => {
    const updateProgress = () => {
      if (typeof document === "undefined") return;
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const max = Math.max(scrollHeight - clientHeight, 1);
      setScrollProgress(Math.min(scrollTop / max, 1));
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  const toggleTheme = useCallback(
    () => setTheme((current) => (current === "dark" ? "light" : "dark")),
    [],
  );

  const toggleLanguage = useCallback(
    () => setLanguage((current) => (current === "FR" ? "EN" : "FR")),
    [],
  );

  const commandGroups = useMemo(() => {
    const primary = MAIN_NAV.map((item) => ({ label: item.label, href: item.href }));
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

  const serviceSlugFromPath = location.pathname.match(
    /^\/services\/(?<slug>[^/]+)/,
  )?.groups?.slug;
  const serviceSlugFromQuery = new URLSearchParams(location.search).get("service");
  const activeService = useMemo(() => {
    const preferred = (serviceSlugFromPath || serviceSlugFromQuery) as CategorySlug | null;
    return CATEGORIES.find((category) => category.slug === preferred);
  }, [serviceSlugFromPath, serviceSlugFromQuery]);

  const ctaLabel = activeService ? `Devis ${activeService.label}` : CTA.label;
  const ctaHref = activeService ? `/contact?service=${activeService.slug}` : CTA.href;

  const isRealisations = location.pathname.startsWith("/realisations");
  const isServices = location.pathname.startsWith("/services");

  const subNavItems = useMemo(() => {
    if (!isRealisations && !isServices) return [] as { label: string; href: string }[];
    const base = isRealisations ? "/realisations" : "/services";
    return CATEGORIES.map((category) => ({
      label: category.label,
      href: `${base}/${category.slug}`,
    }));
  }, [isRealisations, isServices]);

  const activeSubnavSlug =
    location.pathname.match(/^\/(?:services|realisations)\/(?<slug>[^/]+)/)?.groups?.slug ?? "";

  return (
    <Fragment>
      {/* Top progress bar */}
      <span className={progressStyles} aria-hidden>
        <span
          className="block h-full w-full origin-left scale-x-0 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-violet-500 transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </span>

      <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
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
              <SheetContent side="left" className="w-full max-w-sm border-white/10 bg-slate-950/95 p-0 text-white">
                <SheetHeader className="space-y-2 border-b border-white/10 px-6 pb-4 pt-6 text-left">
                  <SheetTitle className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.35em] text-white/60">
                    Studio VBG
                  </SheetTitle>
                  <p className="text-xs text-white/50">Navigation principale</p>
                </SheetHeader>

                <div className="flex h-full flex-col gap-8 px-6 py-8">
                  <nav className="space-y-4 text-sm font-medium text-white/85">
                    {MAIN_NAV.map((item) => {
                      const hasNested = Boolean(item.children?.length || item.mega?.length);

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

                      const nestedLinks = item.children ?? item.mega ?? [];
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
                                      <p className="pt-1 text-[0.65rem] normal-case text-white/60">{link.excerpt}</p>
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
                        {theme === "dark" ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
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
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-white transition hover:bg-white/10"
            >
              <span className="rounded-full border border-white/20 px-2 py-1">VBG</span>
              <span className="hidden sm:inline">Studio VBG</span>
            </Link>
          </div>

          {/* Desktop nav */}
          <NavigationMenu className="hidden flex-1 justify-center lg:flex">
            <NavigationMenuList className="flex items-center gap-6">
              {MAIN_NAV.map((item) => {
                const hasNested = Boolean(item.children?.length || item.mega?.length);

                if (!hasNested) {
                  return (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuLink asChild>
                        <NavLink
                          to={item.href}
                          className={({ isActive }) =>
                            cn(
                              "relative text-sm font-medium uppercase tracking-[0.3em] text-white/70 transition hover:text-white",
                              isActive && "text-white",
                            )
                          }
                        >
                          {({ isActive }) => (
                            <span className="inline-flex flex-col items-center gap-1">
                              <span>{item.label}</span>
                              <span
                                aria-hidden
                                className={cn(
                                  "h-[2px] w-full origin-left scale-x-0 rounded-full bg-white/70 transition-transform duration-300",
                                  isActive ? "scale-x-100" : "group-hover:scale-x-100",
                                )}
                              />
                            </span>
                          )}
                        </NavLink>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                }

                if (item.children?.length) {
                  return (
                    <NavigationMenuItem key={item.label}>
                      <NavigationMenuTrigger
                        className="border border-white/10 bg-transparent text-sm font-medium uppercase tracking-[0.3em] text-white/70 hover:border-white/20 hover:bg-white/10 hover:text-white data-[state=open]:border-white/30 data-[state=open]:bg-white/10 data-[state=open]:text-white"
                      >
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="mt-2 w-80 rounded-3xl border border-slate-900/10 bg-white/90 p-3 text-slate-900 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-slate-950/95 dark:text-white">
                        <NavigationMenuLink asChild>
                          <Link
                            to={item.href ?? "#"}
                            className="mb-2 flex items-center justify-between rounded-2xl border border-slate-900/10 bg-slate-900/5 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-900/70 transition hover:border-slate-900/20 hover:bg-slate-900/10 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-white"
                          >
                            Voir tout
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </Link>
                        </NavigationMenuLink>
                        <ul className="grid gap-2">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                to={child.href}
                                className="block rounded-2xl border border-slate-900/10 bg-slate-900/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-900/70 transition hover:border-slate-900/20 hover:bg-slate-900/10 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-white"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                }

                return (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuTrigger
                      className="border border-white/10 bg-transparent text-sm font-medium uppercase tracking-[0.3em] text-white/70 hover:border-white/20 hover:bg-white/10 hover:text-white data-[state=open]:border-white/30 data-[state=open]:bg-white/10 data-[state=open]:text-white"
                    >
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="mt-3 w-[720px] rounded-[2rem] border border-slate-900/10 bg-white/90 p-6 text-slate-900 shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-slate-950/95 dark:text-white">
                      <NavigationMenuLink asChild>
                        <Link
                          to={item.href ?? "#"}
                          className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-slate-900/5 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-900/70 transition hover:border-slate-900/20 hover:bg-slate-900/10 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-white"
                        >
                          Voir tout
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </NavigationMenuLink>
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {item.mega?.map((entry) => (
                          <Link
                            key={entry.href}
                            to={entry.href}
                            className="group flex flex-col gap-2 rounded-2xl border border-slate-900/10 bg-slate-900/5 p-4 transition hover:border-slate-900/20 hover:bg-slate-900/10 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/10"
                          >
                            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-900/70 transition group-hover:text-slate-900 dark:text-cyan-200/80 dark:group-hover:text-cyan-100">
                              {entry.label}
                            </span>
                            <p className="text-sm text-slate-900/70 transition group-hover:text-slate-900 dark:text-white/70 dark:group-hover:text-white">
                              {entry.excerpt}
                            </p>
                            <span className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-slate-900/60 transition group-hover:translate-x-1 group-hover:text-slate-900 dark:text-white/60 dark:group-hover:text-white">
                              Explorer
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </span>
                          </Link>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right: actions */}
          <div className="ml-auto hidden items-center gap-2 lg:flex">
            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <Search className="h-4 w-4" />
              Rechercher
              <span className="rounded-full border border-white/10 px-2 py-0.5 text-[0.6rem]">⌘K</span>
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:bg-white/10 hover:text-white"
              aria-label="Changer de thème"
            >
              {theme === "dark" ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <Languages className="h-4 w-4" />
              {language}
            </button>
            <Button
              asChild
              className="rounded-full bg-white px-5 text-xs font-semibold uppercase tracking-[0.35em] text-slate-950 hover:bg-white/90"
            >
              <Link to={ctaHref}>{ctaLabel}</Link>
            </Button>
          </div>
        </div>

        {/* Secondary subnav */}
        {subNavItems.length > 0 && (
          <div className="border-t border-white/10 bg-slate-950/80">
            <div className="mx-auto max-w-6xl px-4">
              <nav className="flex gap-3 overflow-x-auto py-3">
                {subNavItems.map((item) => {
                  const isActive = item.href.endsWith(`/${activeSubnavSlug}`);
                  return (
                    <NavLink
                      key={item.href}
                      to={item.href}
                      className={({ isActive: routeActive }) =>
                        cn(
                          "inline-flex items-center rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/60 transition hover:bg-white/10 hover:text-white",
                          (isActive || routeActive) && "border-white/40 text-white",
                        )
                      }
                    >
                      {item.label}
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
