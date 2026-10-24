import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArtistSubmissionForm } from "@/components/ArtistSubmissionForm";
import { MusicProjectsCTA } from "@/components/MusicProjectsCTA";
import { Users, Star, TrendingUp, Shield } from "lucide-react";

const SolicitarRepresentacion = () => {
  return (
    <>
      <Helmet>
        <title>Artistas: trabaja con Grupo Dauro | Música con IA y Arte en línea</title>
        <meta
          name="description"
          content="Cantantes y músicos: producción musical con IA a partir de tu grabación, marca de artista y canciones por encargo con tu voz digital. Pintores y fotógrafos: promoción de tu obra en exposiciones virtuales. Todo en línea."
        />
        <meta property="og:title" content="Artistas: trabaja con Grupo Dauro | Música con IA y Arte en línea" />
        <meta
          property="og:description"
          content="Producción musical con IA, marca de artista, voz digital y exposiciones virtuales. Todo en línea."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        {/* Hero Section */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                ¿Eres artista? Trabaja con Grupo Dauro
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                <strong className="text-foreground">Si eres cantante o músico</strong>, en{" "}
                <Link to="/grupo-dauro/musica" className="text-primary hover:underline">Dauro Música</Link>{" "}
                producimos tu música con inteligencia artificial a partir de tu grabación, construimos tu
                marca de artista y, con tu autorización, creamos canciones por encargo para empresas y
                eventos con tu voz digital, con reparto de ingresos.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                <strong className="text-foreground">Si eres pintor, fotógrafo o artista plástico</strong>,{" "}
                <Link to="/grupo-dauro/arte" className="text-primary hover:underline">Dauro Arte</Link>{" "}
                promociona y gestiona tu obra en exposiciones virtuales.
              </p>
              <div className="bg-muted/50 border border-border rounded-lg p-4 max-w-2xl mx-auto">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Importante:</strong> No somos sello discográfico: no fichamos
                  artistas ni seleccionamos maquetas. Trabajamos por encargo y todo se hace en línea.
                  <span className="text-primary font-medium"> No hacemos conciertos, actuaciones en directo, eventos presenciales ni exposiciones físicas.</span>{" "}
                  <Link to="/servicios#marca-artista" className="text-primary hover:underline">Ver el servicio de música</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="text-center p-6">
                <Users className="h-10 w-10 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold text-foreground mb-2">Red de contactos</h3>
                <p className="text-sm text-muted-foreground">
                  Acceso a nuestra red de clientes y colaboradores
                </p>
              </div>
              <div className="text-center p-6">
                <Star className="h-10 w-10 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold text-foreground mb-2">Visibilidad</h3>
                <p className="text-sm text-muted-foreground">
                  Promoción en nuestros canales y plataformas
                </p>
              </div>
              <div className="text-center p-6">
                <TrendingUp className="h-10 w-10 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold text-foreground mb-2">Desarrollo</h3>
                <p className="text-sm text-muted-foreground">
                  Apoyo en el desarrollo de tu carrera artística
                </p>
              </div>
              <div className="text-center p-6">
                <Shield className="h-10 w-10 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold text-foreground mb-2">Profesionalidad</h3>
                <p className="text-sm text-muted-foreground">
                  Más de 20 años de experiencia en el sector
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
                  Formulario de solicitud
                </h2>
                <p className="text-muted-foreground text-center mb-8">
                  Cuéntanos quién eres y qué necesitas, y te respondemos con una propuesta por escrito
                </p>
                <ArtistSubmissionForm />
              </div>
            </div>
          </div>
        </section>

        {/* Music Projects CTA */}
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <MusicProjectsCTA />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default SolicitarRepresentacion;
