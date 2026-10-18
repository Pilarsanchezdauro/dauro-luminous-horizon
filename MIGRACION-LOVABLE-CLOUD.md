# Migración de Lovable Cloud al servidor propio (OVH + Supabase autoalojado)

Ficha preparada el 5/10/2026 tras revisar el código y el panel *Cloud* de Lovable.
**Estado: pendiente.** Se hará después de contratar el VPS (OVH VPS-3) y de migrar
primero los proyectos de Supabase normales.

## Qué hay hoy en Lovable Cloud

- **Proyecto Lovable:** `fddadfec-6377-4dcb-816f-d999f87842db`
- **Backend:** `rnrsfzgmgjdzufqrsnhd.supabase.co` (gestionado por Lovable; no aparece en supabase.com)
- **Código:** GitHub `Pilarsanchezdauro/dauro-luminous-horizon`, web publicada en Vercel.
- **Consumo:** ~12 créditos en 30 días (uso muy bajo).

### Base de datos — 19 tablas

analytics_events (22.773 filas), blog_posts (1.705), projects (51), editorial_submissions (27),
artist_submissions, book_cover_requests, booktrailer_requests, catalog_products, cover_credits,
cover_generation_usage, dauro_arte_contacts, ebook_purchases, mirlo_key_purchases,
portfolio_inquiries, product_ebooks, services_contacts, user_roles, web_requests, ai_rate_limits.

Enum `app_role` (admin, staff, user). Funciones SQL: has_role, update_updated_at_column,
update_blog_post_updated_at, increment_ebook_download.

### Usuarios — 2

Habrá que restablecer sus contraseñas tras la migración (la exportación oficial no las trae).
Después, volver a darle el rol `admin` a la cuenta de Pilar en `user_roles`.

### Archivos — 6 carpetas (buckets)

| Bucket | Visibilidad |
|---|---|
| project-images | Pública |
| dauro-arte-documents | Pública |
| booktrailer-files | Pública |
| editorial-submissions | Privada |
| artist-submissions | Privada |
| ebooks | Privada |

### Funciones — 18 desplegadas

En el código (migrar las 16): publish-to-social, generate-rss, generate-book-cover,
shopify-webhook, audio-sinopsis, qa-externo, qa-interno, create-mirlo-key-checkout,
mirlo-key-webhook, sync-shopify-products, associate-shopify-images, read-cover-titles,
increment-ebook-download, update-shopify-genres, verify-ebook-download, dauro-ciencia-upload-files.

**No migrar:** `create-cover-checkout` y `stripe-webhook`. Siguen desplegadas en Lovable, pero
ya no están en el código y la web no las llama.

Respetar `verify_jwt = false` de `supabase/config.toml`.

### Claves secretas — 9 (los valores no se pueden ver: sacarlos de cada servicio)

SHOPIFY_ACCESS_TOKEN, SHOPIFY_STOREFRONT_ACCESS_TOKEN, SHOPIFY_WEBHOOK_SECRET,
STRIPE_SECRET_KEY, OPENAI_API_KEY, IDEOGRAM_API_KEY, PPLX_API_KEY, FORMSPREE_EBOOK_FORM_ID,
LOVABLE_API_KEY (esta desaparece, ver abajo).

Cuando se retome Mirlo Key, añadir también `STRIPE_MIRLO_WEBHOOK_SECRET`.

### Tareas programadas — 1

`cleanup-old-rate-limits`, cada hora.

## Puntos que se rompen si no se tocan

1. **`read-cover-titles` usa la IA de Lovable** (`ai.gateway.lovable.dev`, LOVABLE_API_KEY).
   Hay que pasarla a OpenAI o a Claude directamente.
2. **Stripe:** hay que cambiar la URL del webhook en el panel de Stripe a la del servidor nuevo.
3. **Shopify:** hay que cambiar la URL del webhook en Shopify.
4. **URLs escritas a mano:** `vercel.json` (RSS → `functions/v1/generate-rss`) y
   `public/hemeroteca-galeria.json` (imágenes de `project-images`).
5. **Vercel:** cambiar VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY y VITE_SUPABASE_PROJECT_ID.
6. **Auth:** Site URL, Redirect URLs y el envío de correos (registro y recuperación de contraseña).

## Orden

1. Exportación oficial: *Cloud → Overview → Advanced settings → Export project data*
   (máximo 5 GB y una exportación al día). Alternativa: exportador gratuito de Dreamlit.
2. Descargar las 6 carpetas de archivos.
3. Crear la instancia Supabase en el VPS (Coolify), cargar el esquema y los datos, subir
   los archivos, desplegar las 16 funciones, poner las claves y crear la tarea programada.
4. Probar una copia de la web (preview de Vercel) contra el servidor nuevo: login, admin,
   formularios, tienda/Shopify, descarga de ebooks, generador de portadas y RSS.
5. Cambio definitivo en un momento tranquilo: última copia de datos, variables en Vercel
   y webhooks de Stripe/Shopify.
6. Dejar Lovable Cloud **pausado, sin borrar**, 3–4 semanas. *Remove Lovable Cloud* es
   irreversible: solo al final.
7. A partir de ahí la web ya no se edita en Lovable, sino desde el código.

## Historial

- **5/10/2026** — Arreglado el webhook de Mirlo Key (commit `8f708f4`): aceptaba avisos de pago
  sin verificar porque faltaba `STRIPE_MIRLO_WEBHOOK_SECRET`. Ahora rechaza todo aviso sin firma.
  Lovable NO despliega solo las funciones al subir código a GitHub: hubo que pedírselo en su
  chat. Comprobado el 6/10/2026: responde 503 "Webhook not configured".
  Mirlo Key está parado por ahora; al retomarlo, poner esa clave (Stripe → Developers → Webhooks
  → Signing secret).
