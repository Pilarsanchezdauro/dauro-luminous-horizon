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
  icon,
  reversed = false,
}: SectionCardProps) => {
  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-16 ${
        reversed ? "lg:grid-flow-dense" : ""
      }`}
    >
      <div className={reversed ? "lg:col-start-2" : ""}>
        <div className="space-y-6">
          {icon && <div className="text-primary">{icon}</div>}
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-foreground leading-tight">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
          <Link to={link}>
            <Button
              size="lg"
              className="group bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Descubrir más
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>

      <div className={reversed ? "lg:col-start-1 lg:row-start-1" : ""}>
        <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <img
            src={image}
            alt={title}
            className="w-full h-[400px] lg:h-[500px] object-cover transform hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default SectionCard;
