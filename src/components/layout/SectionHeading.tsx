import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
};

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) => {
  return (
    <div
      className={cn(
        "section-heading",
        align === "center" && "section-heading--center",
        align === "right" && "section-heading--right",
        className,
      )}
    >
      {eyebrow ? <div className="section-eyebrow">{eyebrow}</div> : null}
      <h2 className="section-title">{title}</h2>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  );
};

SectionHeading.displayName = "SectionHeading";

export default SectionHeading;
