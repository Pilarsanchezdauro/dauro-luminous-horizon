import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

/**
 * Bloque reutilizable que desactiva el malentendido "editorial tradicional = gratis".
 * Distingue, con dignidad para ambos casos, al autor cuyo libro ya está terminado
 * (edición a cuenta de Dauro, sin coste) del autor cuya obra necesita trabajo
 * (servicios editoriales, con presupuesto).
 * Colocar allá donde pueda haber confusión: home, Editorial, Servicios editoriales, Valoración.
 */
export const PuertasEditorial = () => {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full my-20 md:my-28">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-5">
          ¿Quieres publicar tu libro?{" "}
          <span className="text-primary">Hay dos caminos, y te los contamos claros.</span>
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Todo depende de en qué punto esté tu manuscrito. Si ya está terminado,{" "}
          <strong className="text-foreground">apostamos por él</strong>: lo editamos, lo
          publicamos y lo llevamos a las librerías, <strong className="text-foreground">sin
          coste para ti</strong>. Si todavía necesita trabajo —corrección, estructura,
          estilo—, de ese trabajo se encarga nuestro equipo editorial: son{" "}
          <strong className="text-foreground">servicios editoriales</strong>, con un
          presupuesto cerrado. Mira en cuál de los dos casos estás:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
        {/* A · El libro está hecho */}
        <div className="bg-card rounded-3xl border-2 border-primary/20 p-8 lg:p-10 flex flex-col hover:border-primary/40 transition-colors duration-300">
          <span className="self-start text-xs font-semibold uppercase tracking-wider text-primary border border-primary/30 rounded-full px-3 py-1 mb-5">
            Edición tradicional · sin coste
          </span>
          <h3 className="text-2xl font-playfair font-bold mb-3">Tu obra ya está terminada</h3>
          <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
            Lo has releído, corregido y reescrito hasta dejarlo en pie. El trabajo de
            escritor está hecho. Entonces <strong className="text-foreground">apostamos por
            tu obra</strong>: la publicamos bajo el sello Dauro y la llevamos a las
            librerías. A ti no te cuesta nada y percibes tus derechos de autor.
          </p>
          <Link to="/contacto" className="mt-auto">
            <Button variant="outline" className="w-full border-2 hover:border-primary/60">
              Cuéntanos tu obra
            </Button>
          </Link>
        </div>

        {/* B · El libro necesita una vuelta */}
        <div className="bg-card rounded-3xl border-2 border-primary/20 p-8 lg:p-10 flex flex-col hover:border-primary/40 transition-colors duration-300">
          <span className="self-start text-xs font-semibold uppercase tracking-wider text-primary border border-primary/30 rounded-full px-3 py-1 mb-5">
            Servicios editoriales · con presupuesto
          </span>
          <h3 className="text-2xl font-playfair font-bold mb-3">Tu obra necesita trabajo editorial</h3>
          <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
            Le pasa a casi todos los manuscritos. Si hay que corregirlo, estructurarlo o
            intervenirlo, eso son <strong className="text-foreground">servicios
            editoriales</strong>: los hacemos nosotros, con un{" "}
            <strong className="text-foreground">precio claro que conoces desde el
            principio</strong>. Ninguna editorial reescribe gratis un texto sin terminar.
          </p>
          <Link to="/servicios-editoriales" className="mt-auto">
            <Button className="w-full bg-primary hover:bg-primary/90">
              Calcula tu presupuesto
            </Button>
          </Link>
        </div>
      </div>

      <p className="text-center text-muted-foreground mt-10 max-w-2xl mx-auto">
        <span className="font-playfair italic text-foreground text-lg">¿En cuál estás?</span>{" "}
        Saberlo antes de empezar nos ahorra el malentendido a los dos.
      </p>
    </section>
  );
};

export default PuertasEditorial;
