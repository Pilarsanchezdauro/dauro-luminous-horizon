import { MessageCircle } from "lucide-react";

const WhatsAppFloatingButton = () => {
  return (
    <a
      href="https://wa.me/34640919090?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-50 group flex items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 sm:bottom-6 sm:right-6 bg-[hsl(var(--whatsapp))] hover:bg-[hsl(var(--whatsapp-hover))] text-[hsl(var(--whatsapp-foreground))] h-12 w-12 sm:h-14 sm:w-14 sm:animate-pulse-subtle"
      aria-label="Escríbenos por WhatsApp"
    >
      <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
      <span className="hidden sm:block absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-foreground text-background text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Escríbenos por WhatsApp
      </span>
      {/* Anillo de pulso exterior */}
      <span className="hidden sm:block absolute inset-0 rounded-full bg-[hsl(var(--whatsapp))] animate-ping-slow opacity-40" />
    </a>
  );
};

export default WhatsAppFloatingButton;
