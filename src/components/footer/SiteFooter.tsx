import { Link } from "react-router-dom";

import { CTA, CATEGORIES, MAIN_NAV } from "@/components/header/nav.config";
import { BrandMark } from "@/components/branding/BrandMark";

const FOOTER_CONTACT = {
  email: "hello@studio-vbg.com",
  phone: "+33 6 45 78 23 11",
  location: "Paris · Déplacements France & Europe",
} as const;

const FOOTER_SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "Instagram", href: "https://www.instagram.com" },
  { label: "YouTube", href: "https://www.youtube.com" },
] as const;

const year = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-slate-950/95 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="space-y-4 text-sm text-white/80">
          <BrandMark dual className="max-w-[15rem]" orientation="horizontal" />
          <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-white/60">Studio VBG</h3>
          <a
            href={`mailto:${FOOTER_CONTACT.email}`}
            className="block text-base font-semibold text-white transition hover:text-white/80"
          >
            {FOOTER_CONTACT.email}
          </a>
          <a
            href={`tel:${FOOTER_CONTACT.phone.replace(/\s+/g, "")}`}
            className="block text-sm text-white/80 transition hover:text-white"
          >
            {FOOTER_CONTACT.phone}
          </a>
          <p className="text-sm text-white/60">{FOOTER_CONTACT.location}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-white/15"
            >
              Contact & Devis
            </Link>
            <Link
              to={CTA.href}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              {CTA.label}
            </Link>
          </div>
        </div>

        <div className="space-y-3 text-sm text-white/70">
          <h3 className="text-xs font-semibold uppercase tracking-[0.4em] text-white/50">Réalisations</h3>
          <Link to="/portfolio" className="block transition hover:text-white">
            Index réalisations
          </Link>
          {CATEGORIES.map((category) => (
            <Link key={category.slug} to={`/portfolio/${category.slug}`} className="block transition hover:text-white">
              {category.label}
            </Link>
          ))}
        </div>

        <div className="space-y-3 text-sm text-white/70">
          <h3 className="text-xs font-semibold uppercase tracking-[0.4em] text-white/50">Services</h3>
          <Link to="/services" className="block transition hover:text-white">
            Index services
          </Link>
          {CATEGORIES.map((category) => (
            <Link key={category.slug} to={`/services/${category.slug}`} className="block transition hover:text-white">
              {category.label}
            </Link>
          ))}
        </div>

        <div className="space-y-3 text-sm text-white/70">
          <h3 className="text-xs font-semibold uppercase tracking-[0.4em] text-white/50">Ressources</h3>
          {MAIN_NAV.filter((item) => !["Réalisations", "Services"].includes(item.label)).map((item) => (
            <Link key={item.href} to={item.href} className="block transition hover:text-white">
              {item.label}
            </Link>
          ))}
          <Link to="/mentions-legales" className="block transition hover:text-white">
            Mentions légales
          </Link>
          <Link to="/politique-confidentialite" className="block transition hover:text-white">
            Politique de confidentialité
          </Link>
          <div className="flex gap-4 pt-2 text-xs uppercase tracking-[0.35em] text-white/40">
            {FOOTER_SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-white/80"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-[0.65rem] uppercase tracking-[0.35em] text-white/50">
        © {year} Studio VBG — Tous droits réservés.
      </div>
    </footer>
  );
}
