import { NavLink } from 'react-router-dom';
import { FileText, Mail, BookOpen, LayoutDashboard, Newspaper, Briefcase, Video, Globe, FolderKanban, PenTool, ImageIcon, BarChart3, Bot, UserPlus, Library } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

const menuItems = [
  {
    title: 'Panel Principal',
    url: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Analytics',
    url: '/admin/analytics',
    icon: BarChart3,
  },
  {
    title: 'Monitoreo IA',
    url: '/admin/ai-monitoring',
    icon: Bot,
  },
  {
    title: 'Posts del Blog',
    url: '/admin/blog-posts',
    icon: Newspaper,
  },
  {
    title: 'Proyectos',
    url: '/admin/projects',
    icon: Briefcase,
  },
  {
    title: 'Catálogo Productos',
    url: '/admin/catalog-products',
    icon: Library,
  },
  {
    title: 'Solicitudes Web',
    url: '/admin/web-requests',
    icon: Globe,
  },
  {
    title: 'Solicitudes Booktrailer',
    url: '/admin/booktrailer-requests',
    icon: Video,
  },
  {
    title: 'Solicitudes Portadas',
    url: '/admin/book-cover-requests',
    icon: PenTool,
  },
  {
    title: 'SEO de Imágenes',
    url: '/admin/image-seo',
    icon: ImageIcon,
  },
  {
    title: 'Consultas Portafolio',
    url: '/admin/portfolio-inquiries',
    icon: FolderKanban,
  },
  {
    title: 'Solicitudes Artistas',
    url: '/admin/artist-submissions',
    icon: UserPlus,
  },
  {
    title: 'Contactos DauroArte',
    url: '/admin/dauro-arte',
    icon: Mail,
  },
  {
    title: 'Propuestas Editoriales',
    url: '/admin/editorial',
    icon: BookOpen,
  },
  {
    title: 'Contactos Servicios',
    url: '/admin/servicios',
    icon: FileText,
  },
];

export function AdminSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar>
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Administración</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        isActive
                          ? 'bg-muted text-primary font-medium'
                          : 'hover:bg-muted/50'
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
