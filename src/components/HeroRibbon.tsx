import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type HeroRibbonProps = {
  visible?: boolean;
};

export const HeroRibbon = ({ visible = true }: HeroRibbonProps) => {
  return (
    <div className={cn("hero-ribbon", !visible && "hidden")}>
      <div className="hero-ribbon__content">
        <span className="hero-ribbon__pulse" aria-hidden="true" />
        <div className="hero-ribbon__text">
          <p className="hero-ribbon__headline">
            Alex VBG · vidéaste freelance nouvelle génération pour vos films 2025.
          </p>
          <p className="hero-ribbon__subheadline">
            Studio mobile, IA créative et montage broadcast pour propulser vos histoires.
          </p>
        </div>
        <Link to="/quote" className="hero-ribbon__cta">
          Bloquer un créneau découverte
        </Link>
      </div>
    </div>
  );
};

export default HeroRibbon;
