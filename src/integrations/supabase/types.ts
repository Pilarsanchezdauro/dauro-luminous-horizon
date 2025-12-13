export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ai_rate_limits: {
        Row: {
          created_at: string
          function_name: string
          id: string
          ip_address: string
          request_count: number
          window_start: string
        }
        Insert: {
          created_at?: string
          function_name: string
          id?: string
          ip_address: string
          request_count?: number
          window_start?: string
        }
        Update: {
          created_at?: string
          function_name?: string
          id?: string
          ip_address?: string
          request_count?: number
          window_start?: string
        }
        Relationships: []
      }
      analytics_events: {
        Row: {
          created_at: string
          event_category: string
          event_name: string
          event_type: string
          id: string
          metadata: Json | null
          page_url: string | null
          referrer: string | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_category: string
          event_name: string
          event_type: string
          id?: string
          metadata?: Json | null
          page_url?: string | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_category?: string
          event_name?: string
          event_type?: string
          id?: string
          metadata?: Json | null
          page_url?: string | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      artist_submissions: {
        Row: {
          apellidos: string
          categoria_artistica: string
          created_at: string
          curriculum_file_path: string | null
          descripcion: string
          email: string
          experiencia_profesional: string | null
          id: string
          nombre: string
          portfolio_file_path: string | null
          redes_sociales: Json | null
          referencias: string | null
          telefono: string
          web_personal: string | null
        }
        Insert: {
          apellidos: string
          categoria_artistica: string
          created_at?: string
          curriculum_file_path?: string | null
          descripcion: string
          email: string
          experiencia_profesional?: string | null
          id?: string
          nombre: string
          portfolio_file_path?: string | null
          redes_sociales?: Json | null
          referencias?: string | null
          telefono: string
          web_personal?: string | null
        }
        Update: {
          apellidos?: string
          categoria_artistica?: string
          created_at?: string
          curriculum_file_path?: string | null
          descripcion?: string
          email?: string
          experiencia_profesional?: string | null
          id?: string
          nombre?: string
          portfolio_file_path?: string | null
          redes_sociales?: Json | null
          referencias?: string | null
          telefono?: string
          web_personal?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author: string
          category: string
          content: string
          created_at: string
          excerpt: string
          id: string
          image_url: string | null
          meta_description: string | null
          meta_title: string | null
          published_at: string | null
          published_to_social: boolean | null
          slug: string
          social_publish_error: string | null
          status: string
          tags: string[] | null
          title: string
          updated_at: string
          zapier_webhook_url: string | null
        }
        Insert: {
          author?: string
          category: string
          content: string
          created_at?: string
          excerpt: string
          id?: string
          image_url?: string | null
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          published_to_social?: boolean | null
          slug: string
          social_publish_error?: string | null
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string
          zapier_webhook_url?: string | null
        }
        Update: {
          author?: string
          category?: string
          content?: string
          created_at?: string
          excerpt?: string
          id?: string
          image_url?: string | null
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          published_to_social?: boolean | null
          slug?: string
          social_publish_error?: string | null
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          zapier_webhook_url?: string | null
        }
        Relationships: []
      }
      book_cover_requests: {
        Row: {
          apellidos: string
          autor: string
          created_at: string
          descripcion: string
          dimensiones: string | null
          email: string
          estilo_preferido: string | null
          genero: string | null
          id: string
          nombre: string
          plazo: string | null
          presupuesto: string | null
          referencia_visual_path: string | null
          telefono: string
          titulo_libro: string
        }
        Insert: {
          apellidos: string
          autor: string
          created_at?: string
          descripcion: string
          dimensiones?: string | null
          email: string
          estilo_preferido?: string | null
          genero?: string | null
          id?: string
          nombre: string
          plazo?: string | null
          presupuesto?: string | null
          referencia_visual_path?: string | null
          telefono: string
          titulo_libro: string
        }
        Update: {
          apellidos?: string
          autor?: string
          created_at?: string
          descripcion?: string
          dimensiones?: string | null
          email?: string
          estilo_preferido?: string | null
          genero?: string | null
          id?: string
          nombre?: string
          plazo?: string | null
          presupuesto?: string | null
          referencia_visual_path?: string | null
          telefono?: string
          titulo_libro?: string
        }
        Relationships: []
      }
      booktrailer_requests: {
        Row: {
          apellidos: string
          autor: string
          created_at: string
          elementos_visuales: string | null
          email: string
          genero: string | null
          id: string
          imagen_portada_path: string | null
          material_adicional_paths: string[] | null
          nombre: string
          plazo: string | null
          presupuesto: string | null
          referencias: string | null
          sinopsis: string
          telefono: string
          titulo_libro: string
          tono: string | null
        }
        Insert: {
          apellidos: string
          autor: string
          created_at?: string
          elementos_visuales?: string | null
          email: string
          genero?: string | null
          id?: string
          imagen_portada_path?: string | null
          material_adicional_paths?: string[] | null
          nombre: string
          plazo?: string | null
          presupuesto?: string | null
          referencias?: string | null
          sinopsis: string
          telefono: string
          titulo_libro: string
          tono?: string | null
        }
        Update: {
          apellidos?: string
          autor?: string
          created_at?: string
          elementos_visuales?: string | null
          email?: string
          genero?: string | null
          id?: string
          imagen_portada_path?: string | null
          material_adicional_paths?: string[] | null
          nombre?: string
          plazo?: string | null
          presupuesto?: string | null
          referencias?: string | null
          sinopsis?: string
          telefono?: string
          titulo_libro?: string
          tono?: string | null
        }
        Relationships: []
      }
      cover_credits: {
        Row: {
          created_at: string
          credits_remaining: number
          email: string
          id: string
          shopify_order_id: string | null
          stripe_customer_id: string | null
          stripe_payment_intent_id: string | null
          total_credits_purchased: number
        }
        Insert: {
          created_at?: string
          credits_remaining?: number
          email: string
          id?: string
          shopify_order_id?: string | null
          stripe_customer_id?: string | null
          stripe_payment_intent_id?: string | null
          total_credits_purchased?: number
        }
        Update: {
          created_at?: string
          credits_remaining?: number
          email?: string
          id?: string
          shopify_order_id?: string | null
          stripe_customer_id?: string | null
          stripe_payment_intent_id?: string | null
          total_credits_purchased?: number
        }
        Relationships: []
      }
      cover_generation_usage: {
        Row: {
          created_at: string
          email: string | null
          generations_count: number
          id: string
          ip_address: string | null
          last_generated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          generations_count?: number
          id?: string
          ip_address?: string | null
          last_generated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          generations_count?: number
          id?: string
          ip_address?: string | null
          last_generated_at?: string
        }
        Relationships: []
      }
      dauro_arte_contacts: {
        Row: {
          apellidos: string
          created_at: string
          descripcion: string
          documento_file_path: string | null
          email: string
          enlace_web: string | null
          id: string
          nombre: string
          servicio: string
          telefono: string
        }
        Insert: {
          apellidos: string
          created_at?: string
          descripcion: string
          documento_file_path?: string | null
          email: string
          enlace_web?: string | null
          id?: string
          nombre: string
          servicio: string
          telefono: string
        }
        Update: {
          apellidos?: string
          created_at?: string
          descripcion?: string
          documento_file_path?: string | null
          email?: string
          enlace_web?: string | null
          id?: string
          nombre?: string
          servicio?: string
          telefono?: string
        }
        Relationships: []
      }
      editorial_submissions: {
        Row: {
          apellidos: string
          created_at: string
          curriculum_file_path: string | null
          email: string
          id: string
          nombre: string
          obra_file_path: string | null
          telefono: string
          tipo_obra: string
          titulo_obra: string
        }
        Insert: {
          apellidos: string
          created_at?: string
          curriculum_file_path?: string | null
          email: string
          id?: string
          nombre: string
          obra_file_path?: string | null
          telefono: string
          tipo_obra: string
          titulo_obra: string
        }
        Update: {
          apellidos?: string
          created_at?: string
          curriculum_file_path?: string | null
          email?: string
          id?: string
          nombre?: string
          obra_file_path?: string | null
          telefono?: string
          tipo_obra?: string
          titulo_obra?: string
        }
        Relationships: []
      }
      portfolio_inquiries: {
        Row: {
          apellidos: string
          categoria: string
          created_at: string
          descripcion: string
          email: string
          empresa: string | null
          id: string
          nombre: string
          plazo: string | null
          presupuesto: string | null
          telefono: string
        }
        Insert: {
          apellidos: string
          categoria: string
          created_at?: string
          descripcion: string
          email: string
          empresa?: string | null
          id?: string
          nombre: string
          plazo?: string | null
          presupuesto?: string | null
          telefono: string
        }
        Update: {
          apellidos?: string
          categoria?: string
          created_at?: string
          descripcion?: string
          email?: string
          empresa?: string | null
          id?: string
          nombre?: string
          plazo?: string | null
          presupuesto?: string | null
          telefono?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          category: string
          client: string | null
          created_at: string
          description: string | null
          featured: boolean | null
          gallery_images: Json | null
          id: string
          links: Json | null
          main_image_url: string | null
          published: boolean | null
          services: string[] | null
          slug: string
          summary: string
          tags: string[] | null
          title: string
          updated_at: string
          year: number | null
        }
        Insert: {
          category: string
          client?: string | null
          created_at?: string
          description?: string | null
          featured?: boolean | null
          gallery_images?: Json | null
          id?: string
          links?: Json | null
          main_image_url?: string | null
          published?: boolean | null
          services?: string[] | null
          slug: string
          summary: string
          tags?: string[] | null
          title: string
          updated_at?: string
          year?: number | null
        }
        Update: {
          category?: string
          client?: string | null
          created_at?: string
          description?: string | null
          featured?: boolean | null
          gallery_images?: Json | null
          id?: string
          links?: Json | null
          main_image_url?: string | null
          published?: boolean | null
          services?: string[] | null
          slug?: string
          summary?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          year?: number | null
        }
        Relationships: []
      }
      services_contacts: {
        Row: {
          apellidos: string
          created_at: string
          descripcion: string
          documento_file_path: string | null
          email: string
          enlace_web: string | null
          id: string
          nombre: string
          servicio: string
          telefono: string
        }
        Insert: {
          apellidos: string
          created_at?: string
          descripcion: string
          documento_file_path?: string | null
          email: string
          enlace_web?: string | null
          id?: string
          nombre: string
          servicio: string
          telefono: string
        }
        Update: {
          apellidos?: string
          created_at?: string
          descripcion?: string
          documento_file_path?: string | null
          email?: string
          enlace_web?: string | null
          id?: string
          nombre?: string
          servicio?: string
          telefono?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      web_requests: {
        Row: {
          apellidos: string
          created_at: string
          descripcion: string
          documento_file_path: string | null
          email: string
          empresa: string | null
          funcionalidades: string | null
          id: string
          nombre: string
          plazo: string | null
          presupuesto: string | null
          referencia_web: string | null
          telefono: string
          tipo_web: string
        }
        Insert: {
          apellidos: string
          created_at?: string
          descripcion: string
          documento_file_path?: string | null
          email: string
          empresa?: string | null
          funcionalidades?: string | null
          id?: string
          nombre: string
          plazo?: string | null
          presupuesto?: string | null
          referencia_web?: string | null
          telefono: string
          tipo_web: string
        }
        Update: {
          apellidos?: string
          created_at?: string
          descripcion?: string
          documento_file_path?: string | null
          email?: string
          empresa?: string | null
          funcionalidades?: string | null
          id?: string
          nombre?: string
          plazo?: string | null
          presupuesto?: string | null
          referencia_web?: string | null
          telefono?: string
          tipo_web?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "staff" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "staff", "user"],
    },
  },
} as const
