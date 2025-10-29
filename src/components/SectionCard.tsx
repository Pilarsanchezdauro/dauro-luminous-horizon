import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface SectionCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  icon?: ReactNode;
  reversed?: boolean;
}

const SectionCard = ({
  title,
  description,
  image,
  link,
  icon,
  reversed = false,
}: SectionCardProps) => {
  return (
    <div className={`grid md:grid-cols-2 gap-16 items-center my-32 ${reversed ? 'md:grid-flow-dense' : ''}`}>
      <div className={`space-y-8 ${reversed ? 'md:col-start-2' : ''}`}>
        {icon && <div className="text-foreground text-6xl mb-6">{icon}</div>}
        <h2 className="text-5xl md:text-6xl font-bold leading-tight">
          <span className="text-accent">Dauro</span> {title}
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
        <Link to={link}>
          <Button 
            size="lg" 
            className="mt-6 text-sm uppercase tracking-wider px-8 py-6 border-2 border-accent bg-transparent text-accent hover:bg-accent hover:text-white transition-all"
          >
            Descubrir más
          </Button>
        </Link>
      </div>
      <div className={`relative overflow-hidden ${reversed ? 'md:col-start-1 md:row-start-1' : ''} group`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </div>
    </div>
  );
};

export default SectionCard;
