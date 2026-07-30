import { useQuery } from "@tanstack/react-query";

export type FotoGaleria = {
  /** Ruta de la foto dentro del almacén */
  u: string;
  /** Dirección del artículo al que pertenece */
  s: string;
  /** Título del artículo */
  t: string;
  /** Año */
  a: string;
};

type IndiceGaleria = {
  base: string;
  fotos: FotoGaleria[];
};

/**
 * Índice de las fotografías del archivo histórico.
 *
 * Es un fichero estático que se genera al convertir el blog antiguo, no una
 * consulta a la base de datos: son casi dos mil fotos y sacarlas del texto de
 * cada artículo en cada visita sería absurdo. Se descarga una vez y el
 * navegador lo cachea.
 */
export const useGaleriaHemeroteca = () =>
  useQuery({
    queryKey: ["hemeroteca-galeria"],
    queryFn: async (): Promise<IndiceGaleria> => {
      const respuesta = await fetch("/hemeroteca-galeria.json");
      if (!respuesta.ok) throw new Error("No se pudo cargar la galería");
      return respuesta.json();
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 2,
  });
