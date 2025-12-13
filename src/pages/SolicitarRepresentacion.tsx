import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArtistSubmissionForm } from "@/components/ArtistSubmissionForm";
import { MusicProjectsCTA } from "@/components/MusicProjectsCTA";
import { Users, Star, TrendingUp, Shield } from "lucide-react";

const SolicitarRepresentacion = () => {
  return (
    <>
      <Helmet>
        <title>Solicitar Representación Artística | Grupo Dauro</title>
        <meta
          name="description"
          content="¿Eres artista y buscas representación profesional? Envíanos tu portfolio y currículum. Representamos cantantes, pintores, fotógrafos y más."
        />
        <meta property="og:title" content="Solicitar Representación Artística | Grupo Dauro" />
        <meta
          property="og:description"
          content="¿Eres artista y buscas representación profesional? Envíanos tu portfolio y currículum."
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
                ¿Quieres que te representemos?
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                En Grupo Dauro buscamos talento artístico para proyectos empresariales y artísticos.
                Si eres cantante, pintor, fotógrafo o cualquier otro tipo de artista,
                envíanos tu portfolio y te contactaremos.
              </p>
              <div className="bg-muted/50 border border-border rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Importante:</strong> Nuestra representación se centra en el uso de tu voz e imagen para 
                  proyectos empresariales, grabaciones, producciones audiovisuales y colaboraciones artísticas. 
                  Las exposiciones que gestionamos son exclusivamente virtuales.
                  <span className="text-primary font-medium"> No gestionamos directos, conciertos ni exposiciones físicas.</span>
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
                  Completa el formulario con tu información y documentación artística
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
