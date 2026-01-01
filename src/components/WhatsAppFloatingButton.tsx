import { MessageCircle } from "lucide-react";

const WhatsAppFloatingButton = () => {
  return (
    <a
      href="https://whatsapp.com/channel/0029Vb7T73a2v1Iv9rL0U33K"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      aria-label="Únete a nuestro canal de WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-foreground text-background text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Únete a nuestro canal
      </span>
    </a>
  );
};

export default WhatsAppFloatingButton;
