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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary" />
              <h1 className="text-2xl font-black tracking-tight">
                grupo<span className="text-primary">dauro</span>
              </h1>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-2">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.path}
                  className="px-5 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1 uppercase tracking-wide"
                >
                  {item.name}
                  {item.submenu && <ChevronDown className="h-4 w-4" />}
                </Link>

                {item.submenu && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-border rounded-2xl shadow-xl py-3 animate-fade-in">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.name}
                        to={subitem.path}
                        className="block px-6 py-3 text-sm text-foreground hover:bg-accent/20 hover:text-primary transition-colors duration-200"
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
                  className="block px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-accent/20 rounded-lg transition-colors duration-200 uppercase tracking-wide"
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
