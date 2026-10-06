// Envía un formulario al sistema propio de Grupo Dauro (lo registra en Odoo) y, durante la
// migración, también a Formspree como copia de seguridad. Misma firma que fetch():
// devuelve la primera respuesta correcta para que el código que la usa no cambie.

const FORMS_BASE = "https://formularios.grupodauro.com/f/";

export async function submitForm(formId: string, formspreeUrl: string, init: RequestInit): Promise<Response> {
  const [primary, backup] = await Promise.allSettled([
    fetch(FORMS_BASE + formId, init),
    fetch(formspreeUrl, init),
  ]);
  const ok = [primary, backup].find(
    (r): r is PromiseFulfilledResult<Response> => r.status === "fulfilled" && r.value.ok,
  );
  if (ok) return ok.value;
  if (primary.status === "fulfilled") return primary.value;
  if (backup.status === "fulfilled") return backup.value;
  throw primary.reason;
}
