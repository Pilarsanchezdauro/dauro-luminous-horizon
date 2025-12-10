import { Link } from "react-router-dom";
import { Mail, Facebook, Instagram, Twitter, Youtube, Pin, Rss } from "lucide-react";
import logoNega from "@/assets/logo-nega.png";
import logoBpwMadrid from "@/assets/logo-bpw-madrid.png";
import logoIwfSpain from "@/assets/logo-iwf-spain.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background border-t border-background/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Grupo Dauro */}
          <div>
            <h3 className="font-playfair font-bold text-lg mb-4 text-primary">
              Grupo Cultural Dauro
            </h3>
            <p className="text-sm text-background/70 leading-relaxed">
              Arte, literatura, cine e inteligencia artificial unidos en una
              experiencia cultural contemporánea.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/grupo-dauro"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  Grupo Dauro
                </Link>
              </li>
              <li>
                <Link
                  to="/servicios"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link
                  to="/tienda"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  Tienda
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Áreas */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Áreas</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/grupo-dauro/editorial"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  Dauro Editorial
                </Link>
              </li>
              <li>
                <Link
                  to="/grupo-dauro/arte"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  Dauro Arte
                </Link>
              </li>
              <li>
                <Link
                  to="/grupo-dauro/cine"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  Dauro Cine
                </Link>
              </li>
              <li>
                <Link
                  to="/grupo-dauro/musica"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  Dauro Música
                </Link>
              </li>
              <li>
                <Link
                  to="/grupo-dauro/ia"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  Dauro IA
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Contacto</h4>
            <div className="space-y-3">
              <a
                href="mailto:info@grupodauro.com"
                className="flex items-center gap-2 text-sm text-background/70 hover:text-background transition-colors"
              >
                <Mail className="h-4 w-4" />
                info@grupodauro.com
              </a>
              <div className="flex gap-3 pt-2">
                <a
                  href="https://www.facebook.com/grupodauro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/70 hover:text-background transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/grupodauro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/70 hover:text-background transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://x.com/EdicionesDauro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/70 hover:text-background transition-colors"
                  aria-label="Twitter/X"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://es.pinterest.com/Grupoculturaldauro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/70 hover:text-background transition-colors"
                  aria-label="Pinterest"
                >
                  <Pin className="h-5 w-5" />
                </a>
                <a
                  href="https://www.youtube.com/@grupodauro2900"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/70 hover:text-background transition-colors"
                  aria-label="Youtube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
                <a
                  href="/feed.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/70 hover:text-primary transition-colors"
                  aria-label="RSS Feed"
                  title="Suscríbete vía RSS"
                >
                  <Rss className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-background/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/70">
            <p>© 2025 Grupo Cultural Dauro. Todos los derechos reservados.</p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/privacidad" className="hover:text-background transition-colors">
                Política de privacidad
              </Link>
              <Link to="/terminos" className="hover:text-background transition-colors">
                Términos y condiciones
              </Link>
              <Link to="/compromiso-etico" className="hover:text-background transition-colors">
                Compromiso Ético y Transparencia
              </Link>
              <Link to="/archivo-historico" className="hover:text-background transition-colors">
                Archivo histórico
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Institutional Strip */}
      <div className="bg-background border-t border-border/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
            <div className="flex items-center gap-6 md:gap-8">
              <img 
                src={logoNega} 
                alt="NEGA - Análisis forenses" 
                className="h-10 md:h-12 w-auto object-contain"
              />
              <img 
                src={logoBpwMadrid} 
                alt="BPW Madrid - Asociación de Empresarias y Profesionales" 
                className="h-10 md:h-12 w-auto object-contain"
              />
              <img 
                src={logoIwfSpain} 
                alt="IWF Spain - International Women's Forum" 
                className="h-10 md:h-12 w-auto object-contain"
              />
            </div>
            <p className="text-xs md:text-sm text-muted-foreground text-center md:text-left max-w-md">
              Grupo Dauro utiliza NEGA® para sus análisis forenses y pertenece a BPW Madrid e IWF Spain.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
