import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const menuItems = [
    { name: "Inicio", path: "/" },
    {
      name: "Grupo Dauro",
      path: "/grupo-dauro",
      submenu: [
        { name: "Dauro Editorial", path: "/grupo-dauro/editorial" },
        { name: "Dauro Arte", path: "/grupo-dauro/arte" },
        { name: "Dauro Cine", path: "/grupo-dauro/cine" },
        { name: "Dauro IA", path: "/grupo-dauro/ia" },
      ],
    },
    { name: "Servicios", path: "/servicios" },
    {
      name: "Tienda",
      path: "/tienda",
      submenu: [
        { name: "Libros", path: "/tienda/libros" },
        { name: "Arte", path: "/tienda/arte" },
        { name: "Música", path: "/tienda/musica" },
      ],
    },
    {
      name: "Blog",
      path: "/blog",
      submenu: [
        { name: "Blog Actual", path: "/blog" },
        { name: "Antiguo Blog", path: "#" }, // Configurar enlace aquí
      ],
    },
    { name: "Contacto", path: "/contacto" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-28">
          <div className="flex items-center gap-4">
            {!isHomePage && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="text-foreground/70 hover:text-foreground"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">Volver</span>
              </Button>
            )}
            <Link to="/" className="flex items-center">
              <img 
                src={logo} 
                alt="Grupo Cultural Dauro" 
                className="h-24 w-auto hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => item.submenu && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.path}
                  className="text-sm uppercase tracking-wide text-foreground/70 hover:text-foreground transition-colors inline-block py-2"
                >
                  {item.name}
                </Link>
                {item.submenu && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 pt-2 w-56 z-50">
                    <div className="bg-card border border-border rounded-lg shadow-xl overflow-hidden">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          to={subitem.path}
                          className="block px-6 py-4 text-sm text-card-foreground hover:bg-muted hover:text-primary transition-colors"
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-6 animate-fade-in">
            {menuItems.map((item) => (
              <div key={item.name} className="mb-3">
                <Link
                  to={item.path}
                  className="block px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-accent/20 rounded-lg transition-colors duration-200"
                  onClick={() => !item.submenu && setIsOpen(false)}
                >
                  {item.name}
                </Link>
                {item.submenu && (
                  <div className="pl-4 mt-2 space-y-2">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.name}
                        to={subitem.path}
                        className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-accent/20 rounded-lg transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        {subitem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
