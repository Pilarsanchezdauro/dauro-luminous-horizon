import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Mail, MapPin, Phone } from "lucide-react";
import mascotLogo from "@/assets/mascot.png";

const Terminos = () => {
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
              Términos y Condiciones
            </h1>
            <p className="text-muted-foreground mb-12">
              Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="prose prose-lg max-w-none space-y-8">
              {/* Introducción */}
              <section>
                <h2 className="text-2xl font-playfair font-bold mb-4">1. Información general</h2>
                <p className="text-muted-foreground">
                  Los presentes términos y condiciones (en adelante, "Términos") regulan el acceso y uso del 
                  sitio web grupodauro.com (en adelante, el "Sitio Web"), propiedad de LEGAL INTERNATIONAL &amp; FINANCES EXPERTS GROUP, S.L.
                  (en adelante, "Grupo Dauro", "nosotros" o "nuestro").
                </p>
                <p className="mt-4 text-muted-foreground">
                  Al acceder y utilizar este Sitio Web, usted acepta quedar vinculado por estos Términos. 
                  Si no está de acuerdo con alguna parte de estos términos, le rogamos que no utilice nuestro Sitio Web.
                </p>
              </section>

              {/* Datos de contacto */}
              <section className="bg-card p-6 rounded-xl border border-border">
                <h2 className="text-2xl font-playfair font-bold mb-4">2. Datos del titular</h2>
                <div className="space-y-3 text-card-foreground">
                  <p><strong>Titular:</strong> LEGAL INTERNATIONAL &amp; FINANCES EXPERTS GROUP, S.L. (Grupo Dauro) · NIF B-19661685</p>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <p><strong>Domicilio:</strong> Calle Almajara 11, 18008 Granada, España</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                    <p><strong>Email:</strong> <a href="mailto:info@grupodauro.com" className="text-primary hover:underline">info@grupodauro.com</a></p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                    <p><strong>Teléfono:</strong> <a href="tel:+34958281183" className="text-primary hover:underline">+34 958 28 11 83</a></p>
                  </div>
                </div>
              </section>

              {/* Objeto */}
              <section>
                <h2 className="text-2xl font-playfair font-bold mb-4">3. Objeto</h2>
                <p className="text-muted-foreground">
                  El objeto de estos Términos es regular el acceso y uso del Sitio Web y sus contenidos. 
                  El Sitio Web proporciona información sobre los servicios editoriales, artísticos, 
                  cinematográficos y de inteligencia artificial que ofrece Grupo Dauro.
                </p>
              </section>

              {/* Uso del sitio */}
              <section>
                <h2 className="text-2xl font-playfair font-bold mb-4">4. Condiciones de uso</h2>
                <p className="mb-4 text-muted-foreground">
                  El usuario se compromete a utilizar el Sitio Web de conformidad con la ley, estos Términos, 
                  y con la moral y buenas costumbres generalmente aceptadas. En particular, el usuario se compromete a:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>No utilizar el Sitio Web con fines ilícitos o contrarios a lo establecido en estos Términos</li>
                  <li>No causar daños en los sistemas del Sitio Web o de terceros</li>
                  <li>No introducir o difundir virus informáticos o cualquier otro sistema que pueda causar daños</li>
                  <li>No intentar acceder a áreas restringidas del Sitio Web</li>
                  <li>No utilizar el Sitio Web para enviar publicidad no solicitada</li>
                </ul>
              </section>

              {/* Propiedad intelectual */}
              <section>
                <h2 className="text-2xl font-playfair font-bold mb-4">5. Propiedad intelectual e industrial</h2>
                <p className="text-muted-foreground mb-4">
                  Todos los contenidos del Sitio Web, incluyendo, a título enunciativo pero no limitativo, 
                  textos, fotografías, gráficos, imágenes, iconos, tecnología, software, así como su diseño 
                  gráfico y códigos fuente, constituyen una obra cuya propiedad pertenece a Grupo Dauro, 
                  sin que puedan entenderse cedidos al usuario ninguno de los derechos de explotación sobre 
                  los mismos más allá de lo estrictamente necesario para el correcto uso del Sitio Web.
                </p>
                <p className="text-muted-foreground">
                  Está prohibida la reproducción, distribución, comunicación pública y transformación de 
                  cualquier contenido del Sitio Web sin la autorización previa y por escrito de Grupo Dauro.
                </p>
              </section>

              {/* Envío de obras */}
              <section>
                <h2 className="text-2xl font-playfair font-bold mb-4">6. Propuestas editoriales</h2>
                <p className="text-muted-foreground mb-4">
                  Al enviar una propuesta editorial a través de nuestro formulario, el autor declara y garantiza que:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Es el autor original y propietario de todos los derechos de la obra enviada</li>
                  <li>La obra no infringe derechos de terceros, incluyendo derechos de autor, marcas registradas o cualquier otro derecho de propiedad intelectual</li>
                  <li>La obra no contiene contenido difamatorio, obsceno o ilegal</li>
                  <li>Acepta que Grupo Dauro evalúe la obra sin obligación de publicación</li>
                  <li>Entiende que el envío de la obra no establece ninguna relación contractual hasta que se firme un acuerdo formal</li>
                </ul>
                <p className="mt-4 text-muted-foreground">
                  Grupo Dauro se compromete a tratar todas las propuestas de forma confidencial y profesional, 
                  evaluándolas según criterios editoriales objetivos. No nos comprometemos a publicar ninguna obra 
                  enviada, ni a proporcionar retroalimentación detallada sobre cada propuesta rechazada.
                </p>
              </section>

              {/* Responsabilidad */}
              <section>
                <h2 className="text-2xl font-playfair font-bold mb-4">7. Exclusión de responsabilidad</h2>
                <p className="text-muted-foreground mb-4">
                  Grupo Dauro no garantiza la disponibilidad y continuidad del funcionamiento del Sitio Web 
                  ni se hace responsable de los posibles daños o perjuicios causados como consecuencia de:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>La falta de disponibilidad o accesibilidad del Sitio Web</li>
                  <li>Los fallos en el acceso a las distintas páginas web del Sitio Web</li>
                  <li>La interrupción en el funcionamiento del Sitio Web o fallos informáticos</li>
                  <li>Ataques de virus, troyanos u otros elementos dañinos</li>
                  <li>El uso no autorizado del Sitio Web por parte de terceros</li>
                </ul>
              </section>

              {/* Enlaces */}
              <section>
                <h2 className="text-2xl font-playfair font-bold mb-4">8. Enlaces a terceros</h2>
                <p className="text-muted-foreground">
                  El Sitio Web puede contener enlaces a sitios web de terceros. Grupo Dauro no se hace 
                  responsable del contenido, política de privacidad o prácticas de estos sitios web de 
                  terceros. Le recomendamos que lea los términos y condiciones y la política de privacidad 
                  de cualquier sitio web de terceros que visite.
                </p>
              </section>

              {/* Protección de datos */}
              <section>
                <h2 className="text-2xl font-playfair font-bold mb-4">9. Protección de datos personales</h2>
                <p className="text-muted-foreground">
                  El tratamiento de datos personales que Grupo Dauro realice se regirá por lo dispuesto en 
                  nuestra <a href="/privacidad" className="text-primary hover:underline">Política de Privacidad</a>, 
                  que el usuario declara conocer y aceptar expresamente.
                </p>
              </section>

              {/* Modificaciones */}
              <section>
                <h2 className="text-2xl font-playfair font-bold mb-4">10. Modificación de los términos</h2>
                <p className="text-muted-foreground">
                  Grupo Dauro se reserva el derecho de modificar en cualquier momento estos Términos. 
                  Las modificaciones entrarán en vigor desde su publicación en el Sitio Web. Es 
                  responsabilidad del usuario revisar periódicamente estos Términos para estar al tanto 
                  de cualquier cambio.
                </p>
              </section>

              {/* Legislación */}
              <section>
                <h2 className="text-2xl font-playfair font-bold mb-4">11. Legislación aplicable y jurisdicción</h2>
                <p className="text-muted-foreground">
                  Estos Términos se rigen por la legislación española. Para la resolución de cualquier 
                  controversia que pudiera surgir en relación con el Sitio Web o estos Términos, las partes 
                  se someten a los juzgados y tribunales de Granada, España, con renuncia expresa a cualquier 
                  otro fuero que pudiera corresponderles.
                </p>
              </section>

              {/* Política comercial y envíos */}
              <section id="politica-envios" className="bg-amber-50 dark:bg-amber-950/20 p-6 rounded-xl border border-amber-200 dark:border-amber-800">
                <h2 className="text-2xl font-playfair font-bold mb-4">12. Política comercial y gastos de envío</h2>
                <p className="text-muted-foreground mb-4">
                  En Ediciones Dauro aplicamos las siguientes condiciones para el envío de libros:
                </p>
                
                <h3 className="font-semibold text-lg mb-2 mt-4">Envíos nacionales</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li><strong>Libros con precio inferior a 15€:</strong> Se aplicará un cargo adicional en concepto de gastos de envío.</li>
                  <li><strong>Libros con precio igual o superior a 15€:</strong> Envío gratuito a España peninsular.</li>
                  <li><strong>Envíos a Canarias e Islas Baleares:</strong> Los gastos de transporte corren a cargo del cliente, independientemente del importe del pedido.</li>
                </ul>

                <h3 className="font-semibold text-lg mb-2 mt-4">Envíos internacionales</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  <li><strong>Unión Europea:</strong> Realizamos envíos a todos los países de la UE. Los gastos de transporte corren a cargo del cliente.</li>
                  <li><strong>Reino Unido:</strong> Debido al Brexit, los envíos a Reino Unido están sujetos a <strong>costes aduaneros elevados</strong> y aranceles de importación que deberá abonar el destinatario en destino. Estos costes adicionales son responsabilidad exclusiva del cliente.</li>
                  <li><strong>Resto del mundo:</strong> Realizamos envíos a todo el mundo. Los gastos de transporte siempre corren a cargo del cliente. En destinos con requisitos aduaneros (EE.UU., Latinoamérica, Asia, etc.), el cliente será responsable de abonar los <strong>aranceles, impuestos de importación y costes de tramitación aduanera</strong> que aplique el país de destino.</li>
                </ul>

                <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
                  <p className="text-sm text-red-800 dark:text-red-200">
                    <strong>⚠️ Importante sobre envíos internacionales:</strong> Los costes de aduanas, aranceles e impuestos de importación varían según el país de destino y son <strong>responsabilidad exclusiva del comprador</strong>. Ediciones Dauro no tiene control sobre estos costes ni puede estimarlos de antemano. Recomendamos consultar con las autoridades aduaneras de su país antes de realizar el pedido.
                  </p>
                </div>

                <p className="text-muted-foreground text-sm">
                  Los gastos de envío (sin incluir aduanas) se calcularán y mostrarán durante el proceso de compra antes de confirmar el pedido. 
                  Para cualquier consulta sobre envíos, no dude en contactarnos.
                </p>
              </section>

              {/* Contacto */}
              <section className="bg-gradient-to-br from-primary/5 to-accent/5 p-6 rounded-xl border border-primary/20">
                <h2 className="text-2xl font-playfair font-bold mb-4">13. Contacto</h2>
                <p className="mb-4 text-muted-foreground">
                  Si tiene alguna pregunta sobre estos Términos y Condiciones, puede contactarnos a través de:
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

export default Terminos;
