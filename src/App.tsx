addPortfolioItem({
  title: newProject.title,
  tagline: newProject.tagline,
  category: newProject.category || "Création",
  year: Number(newProject.year),
  duration: newProject.duration,
  description: newProject.description,
  thumbnail:
    newProject.thumbnail ||
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200",
  aiTools: newProject.aiTools
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  deliverables: newProject.deliverables
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  socialStack: newProject.socialStack
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
});
