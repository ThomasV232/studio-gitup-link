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
            Studio VBG synchronise vos lancements vidéo IA avec vos équipes marketing.
          </p>
          <p className="hero-ribbon__subheadline">
            Planning prioritaire, scripts sur-mesure, rendu premium en 48h.
          </p>
        </div>
        <Link to="/quote" className="hero-ribbon__cta">
          Réserver un audit
        </Link>
      </div>
    </div>
  );
};

export default HeroRibbon;
