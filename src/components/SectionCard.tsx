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
          <h2 className="text-5xl lg:text-7xl font-extrabold leading-none tracking-tighter">
            <span className="gradient-text glow-effect">Dauro {title}</span>
          </h2>
          <p className="text-lg lg:text-xl text-foreground/80 leading-relaxed">
            {description}
          </p>
          <Link to={link}>
            <Button
              size="lg"
              className="group bg-primary/20 hover:bg-primary text-primary hover:text-white border-2 border-primary text-base font-bold px-8 py-6 rounded-full transition-all duration-300 hover:shadow-[0_0_40px_hsl(354_85%_62%/0.6)]"
            >
              Descubrir más
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </div>

      <div className={reversed ? "lg:col-start-1 lg:row-start-1" : ""}>
        <div className="relative group">
          <div className="aspect-[4/3] overflow-hidden rounded-3xl border-2 border-primary/20 group-hover:border-primary/40 transition-all duration-500 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_20px_80px_-15px_hsl(354_85%_62%/0.4)]">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover grayscale-image group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
            />
          </div>
          {/* Glow effect */}
          <div className={`absolute ${reversed ? '-left-32 -bottom-32' : '-right-32 -top-32'} w-64 h-64 bg-primary/20 rounded-full blur-[100px] -z-10 group-hover:bg-primary/30 transition-all duration-500`} />
        </div>
      </div>
    </div>
  );
};

export default SectionCard;
