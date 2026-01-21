import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ArrowLeft, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/logo.png";
import mascot from "@/assets/mascot.png";

interface BookItem {
  name: string;
  path: string;
}

interface AuthorItem {
  name: string;
  books: BookItem[];
}

interface NestedSubmenuItem {
  name: string;
  path: string;
  nestedSubmenu?: AuthorItem[];
}

interface SubmenuItem {
  name: string;
  path: string;
  external?: boolean;
  nestedSubmenu?: AuthorItem[];
}

interface MenuItem {
  name: string;
  path: string;
  external?: boolean;
  submenu?: SubmenuItem[];
}

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const isHomePage = location.pathname === "/";

  const menuItems: MenuItem[] = [
    { name: "Inicio", path: "/" },
    {
      name: "Grupo Dauro",
      path: "/grupo-dauro",
      submenu: [
        { name: "Dauro Editorial", path: "/grupo-dauro/editorial" },
        { name: "Publica tu libro", path: "/autoedicion" },
        { name: "Dauro Ciencia", path: "/dauro-ciencia" },
        { name: "Dauro Arte", path: "/grupo-dauro/arte" },
        { name: "Dauro Cine", path: "/grupo-dauro/cine" },
        { name: "Dauro Música", path: "/grupo-dauro/musica" },
        { name: "Dauro IA", path: "/grupo-dauro/ia" },
        { 
          name: "Webs de Libros", 
          path: "/webs-de-libros",
          nestedSubmenu: [
            { 
              name: "Carlos Blanco", 
              books: [
                { name: "Leonardo da Vinci", path: "/webs-de-libros/carlos-blanco/leonardo-da-vinci" },
              ]
            },
          ]
        },
      ],
    },
    { name: "Servicios", path: "/servicios" },
    {
      name: "Portafolio",
      path: "/portafolio",
      submenu: [
        { name: "Ver Todo", path: "/portafolio" },
        { name: "Webs", path: "/portafolio?categoria=webs" },
        { name: "Booktrailers", path: "/portafolio?categoria=booktrailers" },
        { name: "Imagen Corporativa", path: "/portafolio?categoria=imagen-corporativa" },
        { name: "Obras de Arte", path: "/portafolio?categoria=obras-arte" },
      ],
    },
    {
      name: "Artistas",
      path: "/portafolio?categoria=artistas",
      submenu: [
        { name: "Cantantes", path: "/portafolio?categoria=artistas-cantantes" },
        { name: "Pintores", path: "/portafolio?categoria=artistas-pintores" },
        { name: "Quiero ser representado", path: "/artistas/solicitud" },
      ],
    },
    { name: "Tienda", path: "/tienda" },
    {
      name: "Blog",
      path: "/blog",
      submenu: [
        { name: "Blog Actual", path: "/blog" },
        { name: "Antiguo Blog", path: "https://grupodauro.wpcomstaging.com/", external: true },
      ],
    },
    { name: "Contacto", path: "/contacto" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[70] bg-background/80 backdrop-blur-sm border-b border-border">
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
            <Link to="/" className="flex items-center gap-4">
              <img 
                src={mascot} 
                alt="Mascota Dauro" 
                className="h-16 w-16 hover:opacity-80 transition-opacity"
              />
              <img 
                src={logo} 
                alt="Grupo Cultural Dauro" 
                className="h-24 w-auto hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {user && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut()}
                className="text-foreground/70 hover:text-foreground"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            )}
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => item.submenu && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.external ? (
                  <a
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm uppercase tracking-wide text-foreground/70 hover:text-foreground transition-colors inline-block py-2"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    to={item.path}
                    className="text-sm uppercase tracking-wide text-foreground/70 hover:text-foreground transition-colors inline-block py-2"
                  >
                    {item.name}
                  </Link>
                )}
                {item.submenu && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 pt-2 w-56 z-50">
                    <div className="bg-card border border-border rounded-lg shadow-xl overflow-hidden">
                      {item.submenu.map((subitem) => (
                        subitem.nestedSubmenu ? (
                          <div key={subitem.name} className="relative group/nested">
                            <Link
                              to={subitem.path}
                              className="flex items-center justify-between px-6 py-4 text-sm text-card-foreground hover:bg-muted hover:text-primary transition-colors"
                            >
                              <span>{subitem.name}</span>
                              <ChevronDown className="h-4 w-4 -rotate-90" />
                            </Link>
                            <div className="absolute left-full top-0 ml-1 w-56 opacity-0 invisible group-hover/nested:opacity-100 group-hover/nested:visible transition-all z-50">
                              <div className="bg-card border border-border rounded-lg shadow-xl overflow-hidden">
                                {subitem.nestedSubmenu.map((author) => (
                                  <div key={author.name} className="relative group/author">
                                    <div className="flex items-center justify-between px-6 py-4 text-sm text-card-foreground hover:bg-muted hover:text-primary transition-colors cursor-default">
                                      <span>{author.name}</span>
                                      <ChevronDown className="h-4 w-4 -rotate-90" />
                                    </div>
                                    <div className="absolute left-full top-0 ml-1 w-56 opacity-0 invisible group-hover/author:opacity-100 group-hover/author:visible transition-all z-50">
                                      <div className="bg-card border border-border rounded-lg shadow-xl overflow-hidden">
                                        {author.books.map((book) => (
                                          <Link
                                            key={book.name}
                                            to={book.path}
                                            className="block px-6 py-4 text-sm text-card-foreground hover:bg-muted hover:text-primary transition-colors"
                                          >
                                            {book.name}
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : subitem.external ? (
                          <a
                            key={subitem.name}
                            href={subitem.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-6 py-4 text-sm text-card-foreground hover:bg-muted hover:text-primary transition-colors"
                          >
                            {subitem.name}
                          </a>
                        ) : (
                          <Link
                            key={subitem.name}
                            to={subitem.path}
                            className="block px-6 py-4 text-sm text-card-foreground hover:bg-muted hover:text-primary transition-colors"
                          >
                            {subitem.name}
                          </Link>
                        )
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
          <div className="lg:hidden py-4 animate-fade-in max-h-[calc(100vh-7rem)] overflow-y-auto">
            {user && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}
                className="w-full justify-start mb-3 text-foreground/70 hover:text-foreground"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            )}
            <Accordion type="single" collapsible className="w-full">
              {menuItems.map((item, index) => (
                item.submenu ? (
                  <AccordionItem key={item.name} value={`item-${index}`} className="border-none">
                    <AccordionTrigger className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-accent/20 rounded-lg hover:no-underline [&[data-state=open]>svg]:rotate-180">
                      {item.name}
                    </AccordionTrigger>
                    <AccordionContent className="pb-0">
                      <div className="pl-4 space-y-1">
                        {item.submenu.map((subitem, subIndex) => (
                          subitem.nestedSubmenu ? (
                            <Accordion key={subitem.name} type="single" collapsible className="w-full">
                              <AccordionItem value={`subitem-${subIndex}`} className="border-none">
                                <AccordionTrigger className="px-4 py-2 text-xs font-medium text-muted-foreground hover:text-primary hover:bg-accent/20 rounded-lg hover:no-underline [&[data-state=open]>svg]:rotate-180">
                                  {subitem.name}
                                </AccordionTrigger>
                                <AccordionContent className="pb-0">
                                  <div className="pl-4 space-y-1">
                                    {subitem.nestedSubmenu.map((author, authorIndex) => (
                                      <Accordion key={author.name} type="single" collapsible className="w-full">
                                        <AccordionItem value={`author-${authorIndex}`} className="border-none">
                                          <AccordionTrigger className="px-4 py-2 text-xs font-medium text-muted-foreground/90 hover:text-primary hover:bg-accent/20 rounded-lg hover:no-underline [&[data-state=open]>svg]:rotate-180">
                                            {author.name}
                                          </AccordionTrigger>
                                          <AccordionContent className="pb-0">
                                            <div className="pl-4 space-y-1">
                                              {author.books.map((book) => (
                                                <Link
                                                  key={book.name}
                                                  to={book.path}
                                                  className="block px-4 py-2 text-xs text-muted-foreground/70 hover:text-primary hover:bg-accent/20 rounded-lg transition-colors duration-200"
                                                  onClick={() => setIsOpen(false)}
                                                >
                                                  → {book.name}
                                                </Link>
                                              ))}
                                            </div>
                                          </AccordionContent>
                                        </AccordionItem>
                                      </Accordion>
                                    ))}
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          ) : subitem.external ? (
                            <a
                              key={subitem.name}
                              href={subitem.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-4 py-2 text-xs text-muted-foreground hover:text-primary hover:bg-accent/20 rounded-lg transition-colors duration-200"
                              onClick={() => setIsOpen(false)}
                            >
                              {subitem.name}
                            </a>
                          ) : (
                            <Link
                              key={subitem.name}
                              to={subitem.path}
                              className="block px-4 py-2 text-xs text-muted-foreground hover:text-primary hover:bg-accent/20 rounded-lg transition-colors duration-200"
                              onClick={() => setIsOpen(false)}
                            >
                              {subitem.name}
                            </Link>
                          )
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ) : (
                  <div key={item.name} className="mb-1">
                    {item.external ? (
                      <a
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-accent/20 rounded-lg transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        to={item.path}
                        className="block px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-accent/20 rounded-lg transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                )
              ))}
            </Accordion>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
