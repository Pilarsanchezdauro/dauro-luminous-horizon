import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import mascotLogo from "@/assets/mascot.png";
import { SEO } from "@/components/SEO";

const almacenamiento = [
  {
    nombre: "exitIntentShown",
    tipo: "Almacenamiento de sesión (sessionStorage)",
    titular: "Propia",
    finalidad: "Técnica. Recuerda que ya se le ha mostrado el aviso que aparece al ir a salir de la página, para no repetirlo.",
    duracion: "Hasta que cierra la pestaña",
  },
  {
    nombre: "sb-…-auth-token",
    tipo: "Almacenamiento local (localStorage)",
    titular: "Propia (servicio Supabase)",
    finalidad: "Técnica. Mantiene la sesión abierta en el área privada (descarga de ebooks y administración). Solo se crea si usted inicia sesión.",
    duracion: "Hasta que cierra la sesión",
  },
  {
    nombre: "YSC, VISITOR_INFO1_LIVE, VISITOR_PRIVACY_METADATA y similares",
    tipo: "Cookies y almacenamiento local",
    titular: "Terceros (YouTube, de Google)",
    finalidad: "Reproducción de vídeos, estadísticas de YouTube y preferencias del reproductor. Solo se instalan si usted pulsa «Reproducir vídeo».",
    duracion: "Desde el cierre del navegador hasta 6 meses, según la cookie",
  },
];

const Cookies = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Política de Cookies"
        description="Qué cookies y qué almacenamiento del navegador utiliza la web de Grupo Dauro, para qué sirven y cómo puede gestionarlos."
      />
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
              Política de Cookies
            </h1>
            <p className="text-muted-foreground mb-12">
              Última actualización: 24 de octubre de 2026
            </p>

            <div className="prose prose-lg max-w-none space-y-8">
              {/* Responsable */}
              <section className="bg-card p-6 rounded-xl border border-border">
                <h2 className="text-2xl font-playfair font-bold mb-4">1. Responsable</h2>
                <div className="space-y-3 text-card-foreground">
                  <p><strong>Grupo Dauro</strong></p>
                  <p>LEGAL INTERNATIONAL &amp; FINANCES EXPERTS GROUP, S.L. · NIF B-19661685</p>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <p><strong>Dirección:</strong> Calle Almajara 11, 18008 Granada, España</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                    <p><strong>Email:</strong> <a href="mailto:info@grupodauro.com" className="text-primary hover:underline">info@grupodauro.com</a></p>
                  </div>
                </div>
              </section>

              {/* Qué son */}
              <section>
                <h2 className="text-2xl font-playfair font-bold mb-4">2. Qué son las cookies</h2>
                <p className="text-muted-foreground">
                  Las cookies son pequeños archivos que una web guarda en su navegador. Con el mismo fin
                  se usan otras técnicas, como el almacenamiento local (localStorage) o de sesión
                  (sessionStorage). Esta política explica todas las que puede usar la web grupodauro.com,
                  conforme al artículo 22.2 de la Ley 34/2002, de Servicios de la Sociedad de la
                  Información (LSSI), y a la Guía sobre el uso de las cookies de la Agencia Española de
                  Protección de Datos.
                </p>
              </section>

              {/* Resumen */}
              <section className="bg-gradient-to-br from-primary/5 to-accent/5 p-6 rounded-xl border border-primary/20">
                <h2 className="text-2xl font-playfair font-bold mb-4">3. En resumen</h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Esta web <strong>no instala cookies de publicidad ni de seguimiento</strong>, ni propias ni de terceros.</li>
                  <li>Al navegar por ella solo se guarda en su navegador lo <strong>estrictamente necesario</strong> para que funcione (punto 4). Para eso la ley no exige consentimiento.</li>
                  <li>Los <strong>vídeos de YouTube</strong> no se cargan hasta que usted pulsa «Reproducir vídeo». Solo entonces YouTube puede instalar sus cookies. Pulsar ese botón es su consentimiento para ese vídeo.</li>
                  <li>Las <strong>estadísticas de visitas</strong> se obtienen sin cookies y sin guardar nada en su dispositivo (punto 5).</li>
                </ul>
              </section>

              {/* Tabla */}
              <section>
                <h2 className="text-2xl font-playfair font-bold mb-4">4. Cookies y almacenamiento que usa esta web</h2>
                {/* Móvil: una ficha por fila */}
                <div className="not-prose space-y-4 md:hidden">
                  {almacenamiento.map((fila) => (
                    <div key={fila.nombre} className="bg-card p-4 rounded-xl border border-border text-sm space-y-2">
                      <p className="font-mono text-xs text-foreground break-words">{fila.nombre}</p>
                      <p className="text-muted-foreground"><strong className="text-foreground">Tipo:</strong> {fila.tipo}</p>
                      <p className="text-muted-foreground"><strong className="text-foreground">Titular:</strong> {fila.titular}</p>
                      <p className="text-muted-foreground"><strong className="text-foreground">Finalidad:</strong> {fila.finalidad}</p>
                      <p className="text-muted-foreground"><strong className="text-foreground">Duración:</strong> {fila.duracion}</p>
                    </div>
                  ))}
                </div>
                <div className="not-prose hidden md:block overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-foreground">
                      <tr>
                        <th className="p-3 font-semibold">Nombre</th>
                        <th className="p-3 font-semibold">Tipo</th>
                        <th className="p-3 font-semibold">Titular</th>
                        <th className="p-3 font-semibold">Finalidad</th>
                        <th className="p-3 font-semibold">Duración</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      {almacenamiento.map((fila) => (
                        <tr key={fila.nombre} className="border-t border-border align-top">
                          <td className="p-3 font-mono text-xs text-foreground break-words">{fila.nombre}</td>
                          <td className="p-3">{fila.tipo}</td>
                          <td className="p-3">{fila.titular}</td>
                          <td className="p-3">{fila.finalidad}</td>
                          <td className="p-3">{fila.duracion}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-muted-foreground">
                  Las cookies de YouTube las gestiona Google. Puede consultar cuáles usa y para qué en su{" "}
                  <a href="https://policies.google.com/technologies/cookies?hl=es" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">política de cookies</a>{" "}
                  y en su{" "}
                  <a href="https://policies.google.com/privacy?hl=es" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">política de privacidad</a>.
                  Los vídeos se reproducen desde youtube-nocookie.com, el modo de privacidad mejorada de YouTube.
                </p>
              </section>

              {/* Estadísticas */}
              <section>
                <h2 className="text-2xl font-playfair font-bold mb-4">5. Estadísticas de visitas sin cookies</h2>
                <p className="mb-4 text-muted-foreground">
                  Para saber cuántas personas visitan la web y qué páginas consultan usamos dos herramientas,
                  y ninguna de ellas guarda nada en su dispositivo:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>
                    <strong>Vercel Web Analytics</strong> (Vercel Inc., que aloja la web): cuenta visitas de forma
                    agregada, sin cookies y sin identificarle de un día para otro.
                  </li>
                  <li>
                    <strong>Estadísticas propias</strong>: cuando usa el asistente de la web, envía un formulario o lee
                    un artículo del blog, anotamos el tipo de acción, la página, la página de procedencia y el
                    navegador utilizado. El identificador de visita solo existe mientras la página está abierta
                    y no se guarda en su navegador.
                  </li>
                </ul>
              </section>

              {/* Otros servicios */}
              <section>
                <h2 className="text-2xl font-playfair font-bold mb-4">6. Otros servicios externos que no instalan cookies</h2>
                <p className="text-muted-foreground">
                  Las tipografías de la web se descargan de Google Fonts y las miniaturas de los vídeos, de los
                  servidores de YouTube. Para servirlas, Google recibe la dirección IP de su conexión, pero no
                  instala cookies. Los formularios y el asistente de la web envían la información a nuestros
                  servidores (Supabase) sin instalar cookies.
                </p>
              </section>

              {/* Gestionar */}
              <section>
                <h2 className="text-2xl font-playfair font-bold mb-4">7. Cómo gestionar o eliminar las cookies</h2>
                <p className="mb-4 text-muted-foreground">
                  Si no quiere que YouTube instale cookies, basta con no reproducir los vídeos de la web.
                  También puede ver y borrar en cualquier momento las cookies y el almacenamiento de su
                  navegador desde su configuración:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li><a href="https://support.google.com/chrome/answer/95647?hl=es" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a></li>
                  <li><a href="https://support.mozilla.org/es/kb/Borrar%20cookies" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a></li>
                  <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari</a></li>
                  <li><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge</a></li>
                </ul>
                <p className="mt-4 text-muted-foreground">
                  Si borra el almacenamiento técnico, la web seguirá funcionando: solo tendrá que volver a
                  iniciar sesión en el área privada.
                </p>
              </section>

              {/* Otras webs */}
              <section>
                <h2 className="text-2xl font-playfair font-bold mb-4">8. Enlaces a otras webs</h2>
                <p className="text-muted-foreground">
                  Esta política se refiere solo a grupodauro.com. La tienda online (tiendaspain.grupodauro.com),
                  las redes sociales, WhatsApp y las demás webs a las que enlazamos tienen sus propias políticas
                  de cookies, que le recomendamos consultar al visitarlas.
                </p>
              </section>

              {/* Cambios */}
              <section>
                <h2 className="text-2xl font-playfair font-bold mb-4">9. Cambios en esta política</h2>
                <p className="text-muted-foreground">
                  Si incorporamos nuevas cookies o cambiamos su uso, actualizaremos esta página y su fecha.
                  Si alguna vez usamos cookies que requieran consentimiento al entrar en la web, se lo
                  pediremos antes de instalarlas, con la opción de rechazarlas. Para el resto del tratamiento
                  de sus datos, consulte nuestra{" "}
                  <Link to="/privacidad" className="text-primary hover:underline">Política de Privacidad</Link>.
                </p>
              </section>

              {/* Contacto */}
              <section className="bg-gradient-to-br from-primary/5 to-accent/5 p-6 rounded-xl border border-primary/20">
                <h2 className="text-2xl font-playfair font-bold mb-4">10. Contacto</h2>
                <p className="mb-4 text-muted-foreground">
                  Para cualquier cuestión sobre esta Política de Cookies puede escribirnos a:
                </p>
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <a href="mailto:info@grupodauro.com" className="text-primary hover:underline">info@grupodauro.com</a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Protección de datos (Dauro Guard):</span>
                    <a href="mailto:dpo@grupodauro.com" className="text-primary hover:underline">dpo@grupodauro.com</a>
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

export default Cookies;
