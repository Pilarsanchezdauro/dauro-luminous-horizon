import { Link } from "react-router-dom";
import { Mail, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Grupo Dauro */}
          <div>
            <h3 className="font-playfair font-bold text-lg mb-4 text-primary">
              Grupo Cultural Dauro
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
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
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Grupo Dauro
                </Link>
              </li>
              <li>
                <Link
                  to="/servicios"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link
                  to="/tienda"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Tienda
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-muted-foreground hover:text-primary transition-colors"
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
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Dauro Editorial
                </Link>
              </li>
              <li>
                <Link
                  to="/grupo-dauro/arte"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Dauro Arte
                </Link>
              </li>
              <li>
                <Link
                  to="/grupo-dauro/cine"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Dauro Cine
                </Link>
              </li>
              <li>
                <Link
                  to="/grupo-dauro/ia"
                  className="text-muted-foreground hover:text-primary transition-colors"
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
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                info@grupodauro.com
              </a>
              <div className="flex gap-3 pt-2">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Youtube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2025 Grupo Cultural Dauro. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <Link to="/privacidad" className="hover:text-primary transition-colors">
                Política de privacidad
              </Link>
              <Link to="/terminos" className="hover:text-primary transition-colors">
                Términos y condiciones
              </Link>
              <a
                href="https://archivo.grupodauro.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Archivo histórico
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
