import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.77.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const ALLOWED_EXTENSIONS = new Set(["pdf", "doc", "docx"]);

type UploadedFileInfo = {
  path: string;
  signedUrl: string;
};

type UploadResponse = {
  curriculum?: UploadedFileInfo;
  obra?: UploadedFileInfo;
};

function safeExtFromName(name: string): string | null {
  const parts = name.split(".");
  const ext = parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "";
  return ALLOWED_EXTENSIONS.has(ext) ? ext : null;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceRoleKey) {
      return new Response(JSON.stringify({ error: "Server misconfigured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const form = await req.formData();
    const curriculum = form.get("curriculum");
    const obra = form.get("obra");

    const client = createClient(supabaseUrl, serviceRoleKey);

    const uploadOne = async (
      file: File,
      kind: "curriculum" | "obra",
    ): Promise<UploadedFileInfo> => {
      if (file.size > MAX_FILE_SIZE) {
        throw new Error("El archivo no puede superar los 20MB");
      }

      const ext = safeExtFromName(file.name);
      if (!ext) {
        throw new Error("Solo se permiten archivos PDF o Word (.doc, .docx)");
      }

      const id = crypto.randomUUID();
      const path = `dauro-ciencia/${kind}-${Date.now()}-${id}.${ext}`;

      const { error: uploadError } = await client.storage
        .from("editorial-submissions")
        .upload(path, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type || undefined,
        });

      if (uploadError) {
        throw new Error("Error al subir el archivo");
      }

      // Signed link for email (30 days)
      const expiresIn = 60 * 60 * 24 * 30;
      const { data: signed, error: signedError } = await client.storage
        .from("editorial-submissions")
        .createSignedUrl(path, expiresIn);

      if (signedError || !signed?.signedUrl) {
        throw new Error("Error al generar enlace de descarga");
      }

      return { path, signedUrl: signed.signedUrl };
    };

    const resp: UploadResponse = {};

    if (curriculum instanceof File) {
      resp.curriculum = await uploadOne(curriculum, "curriculum");
    }
    if (obra instanceof File) {
      resp.obra = await uploadOne(obra, "obra");
    }

    return new Response(JSON.stringify(resp), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
