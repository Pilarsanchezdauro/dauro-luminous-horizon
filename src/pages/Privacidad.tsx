import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Mail, MapPin, Phone } from "lucide-react";
import mascotLogo from "@/assets/mascot.png";

const Privacidad = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-32 pb-16 relative overflow-hidden">
        {/* Floating mascot logos */}
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute top-24 right-12 w-20 h-20 opacity-[0.025] animate-float-diagonal pointer-events-none"
          style={{ animationDelay: '1s' }}
        />
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute top-96 left-8 w-16 h-16 opacity-[0.03] animate-float-horizontal pointer-events-none"
          style={{ animationDelay: '4s' }}
        />
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute bottom-96 right-1/4 w-24 h-24 opacity-[0.035] animate-float-vertical pointer-events-none"
          style={{ animationDelay: '7s' }}
        />
        <img 
          src={mascotLogo} 
          alt="" 
          className="absolute bottom-48 left-1/3 w-20 h-20 opacity-[0.04] animate-float-circle pointer-events-none"
          style={{ animationDelay: '10s' }}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-playfair font-bold mb-6 text-foreground">
              Política de Privacidad
            </h1>
            <p className="text-muted-foreground mb-12">
              Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="prose prose-lg max-w-none space-y-8">
              {/* Información del responsable */}
              <section className="bg-card p-6 rounded-xl border border-border">
                <h2 className="text-2xl font-playfair font-bold mb-4">1. Responsable del tratamiento</h2>
                <div className="space-y-3 text-card-foreground">
                  <p><strong>Identidad:</strong> LEGAL INTERNATIONAL &amp; FINANCES EXPERTS GROUP, S.L. (Grupo Dauro) · NIF B-19661685</p>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <p><strong>Dirección:</strong> Calle Almajara 11, 18008 Granada, España</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                    <p><strong>Email:</strong> <a href="mailto:info@grupodauro.com" className="text-primary hover:underline">info@grupodauro.com</a></p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                    <p><strong>Teléfono:</strong> <a href="tel:+34958281183" className="text-primary hover:underline">+34 958 28 11 83</a></p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                    <p><strong>Contacto de Protección de Datos (Dauro Guard):</strong> <a href="mailto:dpo@grupodauro.com" className="text-primary hover:underline">dpo@grupodauro.com</a></p>
                  </div>
                </div>
              </section>

              {/* Finalidad */}
              <section>
                <h2 className="text-2xl font-playfair font-bold mb-4">2. Finalidad del tratamiento de datos</h2>
                <p className="mb-4">
                  En Grupo Dauro tratamos la información que nos facilitan las personas interesadas con las siguientes finalidades:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Gestionar las consultas y solicitudes realizadas a través de nuestros formularios de contacto</li>
                  <li>Evaluar y gestionar propuestas editoriales enviadas por autores</li>
                  <li>Enviar información sobre nuestros servicios editoriales, artísticos, cinematográficos y culturales</li>
                  <li>Gestionar la relación comercial con nuestros clientes y proveedores</li>
                  <li>Cumplir con las obligaciones legales aplicables</li>
                </ul>
              </section>

              {/* Base legal */}
              <section>
                <h2 className="text-2xl font-playfair font-bold mb-4">3. Base legal para el tratamiento</h2>
                <p className="text-muted-foreground">
                  La base legal para el tratamiento de sus datos personales es:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4 text-muted-foreground">
                  <li>El consentimiento del interesado al enviar sus datos a través de nuestros formularios</li>
                  <li>La ejecución de un contrato en el que el interesado es parte</li>
                  <li>El interés legítimo del responsable</li>
                  <li>El cumplimiento de obligaciones legales</li>
                </ul>
              </section>

              {/* Datos recopilados */}
              <section>
                <h2 className="text-2xl font-playfair font-bold mb-4">4. Datos personales recopilados</h2>
                <p className="mb-4 text-muted-foreground">
                  Los tipos de datos personales que podemos recopilar incluyen:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Datos identificativos: nombre, apellidos</li>
                  <li>Datos de contacto: dirección de correo electrónico, número de teléfono</li>
                  <li>Datos académicos y profesionales: currículum vitae (en caso de propuestas editoriales)</li>
                  <li>Documentos: manuscritos y obras literarias enviadas para evaluación editorial</li>
                  <li>Datos de navegación: cookies y datos de uso del sitio web</li>
                </ul>
              </section>

              {/* Conservación */}
              <section>
                <h2 className="text-2xl font-playfair font-bold mb-4">5. Conservación de datos</h2>
                <p className="text-muted-foreground">
                  Los datos personales proporcionados se conservarán mientras se mantenga la relación 
                  comercial o durante los años necesarios para cumplir con las obligaciones legales. 
                  Una vez finalizada la relación, los datos se mantendrán bloqueados durante el plazo 
                  en que puedan derivarse responsabilidades legales.
                </p>
              </section>

              {/* Destinatarios */}
              <section>
                <h2 className="text-2xl font-playfair font-bold mb-4">6. Destinatarios de datos</h2>
                <p className="text-muted-foreground">
                  Sus datos no serán cedidos a terceros salvo obligación legal. No se realizarán 
                  transferencias internacionales de datos.
                </p>
              </section>

              {/* Derechos */}
              <section>
                <h2 className="text-2xl font-playfair font-bold mb-4">7. Derechos del interesado</h2>
                <p className="mb-4 text-muted-foreground">
                  Cualquier persona tiene derecho a obtener confirmación sobre si en Grupo Dauro 
                  estamos tratando datos personales que les conciernan, o no. Las personas interesadas 
                  tienen derecho a:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li><strong>Acceder</strong> a sus datos personales</li>
                  <li><strong>Solicitar la rectificación</strong> de los datos inexactos</li>
                  <li><strong>Solicitar su supresión</strong> cuando, entre otros motivos, los datos ya no sean necesarios</li>
                  <li><strong>Solicitar la limitación</strong> de su tratamiento en determinadas circunstancias</li>
                  <li><strong>Solicitar la portabilidad</strong> de los datos en los casos previstos en la normativa</li>
                  <li><strong>Oponerse</strong> al tratamiento de sus datos</li>
                  <li><strong>Retirar el consentimiento</strong> prestado en cualquier momento</li>
                </ul>
                <p className="mt-4 text-muted-foreground">
                  Para ejercer estos derechos, puede contactar con nuestro responsable de protección de datos (Dauro Guard) en <a href="mailto:dpo@grupodauro.com" className="text-primary hover:underline">dpo@grupodauro.com</a> o
                  en la dirección postal indicada anteriormente, adjuntando copia de su DNI o documento equivalente.
                </p>
                <p className="mt-4 text-muted-foreground">
                  Asimismo, le informamos del derecho a presentar una reclamación ante la Agencia Española 
                  de Protección de Datos (AEPD) si considera que el tratamiento no se ajusta a la normativa vigente.
                </p>
              </section>

              {/* Seguridad */}
              <section>
                <h2 className="text-2xl font-playfair font-bold mb-4">8. Seguridad de los datos</h2>
                <p className="text-muted-foreground">
                  Grupo Dauro ha adoptado las medidas técnicas y organizativas necesarias para 
                  garantizar la seguridad e integridad de los datos de carácter personal que trata, así 
                  como para evitar su pérdida, alteración y/o acceso por parte de terceros no autorizados.
                </p>
              </section>

              {/* Cookies */}
              <section>
                <h2 className="text-2xl font-playfair font-bold mb-4">9. Uso de cookies</h2>
                <p className="text-muted-foreground">
                  Este sitio web utiliza cookies propias y de terceros para mejorar nuestros servicios 
                  y mostrarle publicidad relacionada con sus preferencias mediante el análisis de sus 
                  hábitos de navegación. Para más información puede consultar nuestra Política de Cookies.
                </p>
              </section>

              {/* Actualización */}
              <section>
                <h2 className="text-2xl font-playfair font-bold mb-4">10. Actualización de la política</h2>
                <p className="text-muted-foreground">
                  Grupo Dauro se reserva el derecho a modificar la presente Política de Privacidad 
                  para adaptarla a novedades legislativas o jurisprudenciales, así como a prácticas de la industria. 
                  En dichos supuestos, anunciará en esta página los cambios introducidos con razonable antelación 
                  a su puesta en práctica.
                </p>
              </section>

              {/* Contacto */}
              <section className="bg-gradient-to-br from-primary/5 to-accent/5 p-6 rounded-xl border border-primary/20">
                <h2 className="text-2xl font-playfair font-bold mb-4">11. Contacto</h2>
                <p className="mb-4 text-muted-foreground">
                  Para cualquier cuestión relacionada con esta Política de Privacidad, puede contactar con nosotros a través de:
                </p>
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <a href="mailto:info@grupodauro.com" className="text-primary hover:underline">info@grupodauro.com</a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <a href="tel:+34958281183" className="text-primary hover:underline">+34 958 28 11 83</a>
                  </p>
                  <p className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-primary mt-1" />
                    <span className="text-muted-foreground">Calle Almajara 11, 18008 Granada, España</span>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacidad;
