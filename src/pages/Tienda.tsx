import { useEffect } from "react";

const Tienda = () => {
  useEffect(() => {
    window.location.href = "https://www.edicionesdauro.com/";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirigiendo a la tienda...</h1>
        <p className="text-muted-foreground">
          Si no eres redirigido automáticamente, 
          <a 
            href="https://www.edicionesdauro.com/" 
            className="text-primary hover:underline ml-1"
          >
            haz clic aquí
          </a>
        </p>
      </div>
    </div>
  );
};

export default Tienda;
