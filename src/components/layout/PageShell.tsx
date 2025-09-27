import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type PageShellProps = PropsWithChildren<{
  gradientStyle?: React.CSSProperties;
  gradientClassName?: string;
  contentClassName?: string;
  className?: string;
}>;

const defaultGradient: React.CSSProperties = {
  background:
    "radial-gradient(circle at 12% 20%, rgba(56,189,248,0.18), transparent 58%), radial-gradient(circle at 82% 28%, rgba(236,72,153,0.22), transparent 62%), radial-gradient(circle at 50% 90%, rgba(14,165,233,0.16), transparent 70%), linear-gradient(160deg, rgba(12,18,33,0.96), rgba(15,23,42,0.82))",
};

export const PageShell = ({
  children,
  gradientStyle,
  gradientClassName,
  contentClassName,
  className,
}: PageShellProps) => {
  return (
    <div className={cn("page-shell", className)}>
      <div
        aria-hidden
        className={cn("page-shell__backdrop", gradientClassName)}
        style={gradientStyle ?? defaultGradient}
      />
      <div className={cn("page-shell__content", contentClassName)}>{children}</div>
    </div>
  );
};

PageShell.displayName = "PageShell";

export default PageShell;
