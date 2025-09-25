import { memo } from "react";
import { cn } from "@/lib/utils";

type AuroraBackdropProps = {
  className?: string;
  variant?: "nebula" | "solstice";
};

const layerConfig: Record<Required<AuroraBackdropProps>["variant"], string[]> = {
  nebula: [
    "bg-[radial-gradient(circle_at_18%_25%,hsla(var(--visual-accent)/0.38),transparent_60%)]",
    "bg-[radial-gradient(circle_at_82%_30%,hsla(var(--visual-secondary)/0.28),transparent_60%)]",
    "bg-[radial-gradient(circle_at_50%_82%,hsla(var(--visual-tertiary)/0.26),transparent_55%)]",
  ],
  solstice: [
    "bg-[radial-gradient(circle_at_20%_20%,hsla(var(--visual-accent)/0.42),transparent_58%)]",
    "bg-[radial-gradient(circle_at_80%_28%,hsla(var(--visual-secondary)/0.32),transparent_62%)]",
    "bg-[radial-gradient(circle_at_55%_85%,hsla(var(--visual-tertiary)/0.28),transparent_58%)]",
  ],
};

export const AuroraBackdrop = memo(({ className, variant = "nebula" }: AuroraBackdropProps) => {
  const layers = layerConfig[variant];

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsla(var(--visual-accent)/0.18),transparent_65%)] blur-3xl" />
      {layers.map((layer, index) => (
        <span
          key={`${variant}-${layer}`}
          className={cn(
            "absolute h-[120%] w-[120%] -translate-x-[10%] -translate-y-[10%] animate-[auroraDrift_24s_ease-in-out_infinite] blur-[80px]",
            layer
          )}
          style={{
            mixBlendMode: "screen",
            animationDelay: `${index * 8}s`,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-[conic-gradient(from_140deg_at_70%_30%,hsla(var(--visual-accent)/0.12),transparent_60%)] opacity-70" />
    </div>
  );
});

AuroraBackdrop.displayName = "AuroraBackdrop";
