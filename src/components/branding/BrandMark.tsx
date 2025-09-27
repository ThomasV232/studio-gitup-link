import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useStudio } from "@/context/StudioContext";
import { cn } from "@/lib/utils";

type PaletteKey = "nebula" | "solstice";

const paletteLabels: Record<PaletteKey, string> = {
  nebula: "Palette Nebula",
  solstice: "Palette Solstice",
};

type BrandMarkProps = {
  palette?: "auto" | PaletteKey;
  dual?: boolean;
  orientation?: "horizontal" | "vertical";
  className?: string;
  showLabel?: boolean;
  showPalette?: boolean;
};

export function BrandMark({
  palette = "auto",
  dual = false,
  orientation = "horizontal",
  className,
  showLabel = true,
  showPalette = true,
}: BrandMarkProps) {
  const { brandAssets, visualMode } = useStudio();

  const sequences = useMemo(() => {
    if (dual) {
      return [
        { key: "solstice" as PaletteKey, src: brandAssets.solstice },
        { key: "nebula" as PaletteKey, src: brandAssets.nebula },
      ];
    }

    const activePalette: PaletteKey = palette === "auto" ? visualMode : palette;
    return [{ key: activePalette, src: brandAssets[activePalette] }];
  }, [brandAssets, dual, palette, visualMode]);

  const containerDirection = orientation === "vertical" ? "flex-col" : "flex-row";
  const labelAlignment = orientation === "vertical" ? "items-start text-left" : "items-center";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/8 p-4 text-white shadow-[0_24px_80px_rgba(59,130,246,0.22)] backdrop-blur-2xl",
        dual ? "md:p-6" : "md:p-5",
        className,
      )}
      aria-label="Identité visuelle Studio VBG"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-16 rounded-[3.5rem] bg-[conic-gradient(at_top_left,_rgba(56,189,248,0.25),transparent_45%,rgba(236,72,153,0.2),transparent_75%)] opacity-60 blur-3xl"
      />

      <div className={cn("relative z-10 flex gap-5", containerDirection, labelAlignment)}>
        <div className={cn("flex items-center gap-4", orientation === "vertical" ? "flex-col" : "flex-row")}> 
          <AnimatePresence initial={false}>
            {sequences.map((item) => (
              <motion.div
                key={item.key}
                className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-[0_16px_50px_rgba(148,163,233,0.18)]"
                initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotate: 6 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              >
                <motion.img
                  src={item.src}
                  alt={`Logo ${paletteLabels[item.key]}`}
                  className="h-12 w-12"
                  loading="lazy"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                />
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-2xl border border-white/30 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {(showLabel || showPalette) && (
          <div className="space-y-2">
            {showLabel && (
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/80">Studio VBG</p>
            )}
            {showPalette && (
              <div className="space-y-1 text-[0.65rem] uppercase tracking-[0.35em] text-white/50">
                {sequences.map((item) => (
                  <span key={`label-${item.key}`}>{paletteLabels[item.key]}</span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
