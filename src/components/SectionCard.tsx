import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
  reversed = false,
}: SectionCardProps) => {
  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-20 lg:py-30 ${
        reversed ? "lg:grid-flow-dense" : ""
      }`}
    >
      <div className={reversed ? "lg:col-start-2" : ""}>
        <div className="space-y-8">
          <h2 className="text-5xl lg:text-7xl font-black text-primary leading-none tracking-tight">
            {title}
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light">
            {description}
          </p>
          <Link to={link}>
            <Button
              size="lg"
              variant="ghost"
              className="group text-primary hover:text-primary hover:bg-transparent text-lg font-semibold px-0"
            >
              Descubrir más
              <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </div>

      <div className={reversed ? "lg:col-start-1 lg:row-start-1" : ""}>
        <div className="relative">
          <div className="aspect-[4/3] overflow-hidden rounded-3xl">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover grayscale-image hover:grayscale-0 transition-all duration-700"
            />
          </div>
          {/* Organic shape overlay */}
          <div className={`absolute ${reversed ? '-left-16 -bottom-16' : '-right-16 -top-16'} w-48 h-48 bg-secondary/40 organic-shape -z-10`} />
        </div>
      </div>
    </div>
  );
};

export default SectionCard;
