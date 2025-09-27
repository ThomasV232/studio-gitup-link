{/* SERVICES PHARES */}
<section className="space-y-10">
  <SectionHeading
    eyebrow="Services & Tarifs"
    title="Services phares"
    description="Un aperçu des offres les plus demandées : corporate, événementiel, social media et motion design pilotés avec une exigence constante."
  />
  <div className="grid gap-6 lg:grid-cols-2">
    {servicesData.slice(0, 4).map((service) => (
      <article key={service.slug} className="surface-card p-6">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-white/60">
          {service.slug.replace(/-/g, " ")}
        </p>
        <h3 className="mt-3 text-2xl font-semibold text-white">{service.title}</h3>
        <p className="mt-3 text-sm text-white/70">{service.subtitle}</p>
        <Link
          to={`/services/${service.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-sky-200"
        >
          Voir le détail
        </Link>
      </article>
    ))}
  </div>
</section>
