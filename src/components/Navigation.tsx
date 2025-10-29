import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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
    {
      name: "Servicios",
      path: "/servicios",
      submenu: [
        { name: "Servicios Editoriales", path: "/servicios/editoriales" },
        { name: "Servicios Musicales", path: "/servicios/musicales" },
        { name: "Servicios de Cine", path: "/servicios/cine" },
        { name: "Servicios de Arte", path: "/servicios/arte" },
      ],
    },
    {
      name: "Tienda",
      path: "/tienda",
      submenu: [
        { name: "Libros", path: "/tienda/libros" },
        { name: "Arte", path: "/tienda/arte" },
        { name: "Música", path: "/tienda/musica" },
      ],
    },
    { name: "Blog", path: "/blog" },
    { name: "Contacto", path: "/contacto" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight hover:opacity-70 transition-opacity">
              DAURO
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.submenu && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.path}
                  className="text-sm uppercase tracking-wide text-foreground/70 hover:text-foreground transition-colors"
                >
                  {item.name}
                </Link>
                {item.submenu && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-4 w-48 bg-card border border-border rounded-sm shadow-lg overflow-hidden">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.name}
                        to={subitem.path}
                        className="block px-4 py-3 text-sm text-card-foreground hover:bg-muted transition-colors"
                      >
                        {subitem.name}
                      </Link>
                    ))}
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
