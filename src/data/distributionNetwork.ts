/**
 * Red de distribución internacional de Grupo Dauro.
 * Fuente: Quares (distribuidora internacional).
 * - América: impresión bajo demanda (POD) en cada país con distribuidor local y tienda propia.
 * - Europa: impresión en España y envío a domicilio en toda Europa (sin aduanas) vía Quares.
 * Última actualización: noviembre 2026 (ampliación a los países europeos de Quares).
 */

export type Region = "España" | "Europa" | "Latinoamérica" | "Norteamérica";

export interface SalesChannel {
  name: string;
  url?: string;
}

export interface CountryDistribution {
  flag: string;
  country: string;
  /** Nombre corto para badges / banners */
  short: string;
  /** Continente / zona para agrupar en la web */
  region: Region;
  distributor: string;
  channels: SalesChannel[];
  /** Nota extra visible al usuario */
  note?: string;
  /** true cuando aún estamos construyendo la red */
  expanding?: boolean;
  /** URL de la tienda Quares (si existe) */
  storeUrl?: string;
}

export const DISTRIBUTION_NETWORK: CountryDistribution[] = [
  // ───────────────────────── ESPAÑA ─────────────────────────
  {
    flag: "🇪🇸",
    country: "España",
    short: "España",
    region: "España",
    distributor: "Logista (Logista Libros), Azeta, Arnoia y Distriforma",
    channels: [],
    note: "Librerías: pedidos con depósito y derecho a devolución.",
    storeUrl: "https://tiendaspain.grupodauro.com",
  },

  // ───────────────────────── EUROPA ─────────────────────────
  // Impresión en España; envío a domicilio en toda Europa, sin aduanas, vía Quares.
  { flag: "🇩🇪", country: "Alemania", short: "Alemania", region: "Europa", distributor: "Envío a domicilio desde España", channels: [] },
  { flag: "🇦🇩", country: "Andorra", short: "Andorra", region: "Europa", distributor: "Envío a domicilio desde España", channels: [] },
  { flag: "🇦🇹", country: "Austria", short: "Austria", region: "Europa", distributor: "Envío a domicilio desde España", channels: [] },
  { flag: "🇧🇪", country: "Bélgica", short: "Bélgica", region: "Europa", distributor: "Envío a domicilio desde España", channels: [] },
  { flag: "🇨🇾", country: "Chipre", short: "Chipre", region: "Europa", distributor: "Envío a domicilio desde España", channels: [] },
  { flag: "🇩🇰", country: "Dinamarca", short: "Dinamarca", region: "Europa", distributor: "Envío a domicilio desde España", channels: [] },
  { flag: "🇪🇪", country: "Estonia", short: "Estonia", region: "Europa", distributor: "Envío a domicilio desde España", channels: [] },
  { flag: "🇫🇮", country: "Finlandia", short: "Finlandia", region: "Europa", distributor: "Envío a domicilio desde España", channels: [] },
  { flag: "🇫🇷", country: "Francia", short: "Francia", region: "Europa", distributor: "Envío a domicilio desde España", channels: [] },
  { flag: "🇬🇷", country: "Grecia", short: "Grecia", region: "Europa", distributor: "Envío a domicilio desde España", channels: [] },
  { flag: "🇳🇱", country: "Países Bajos", short: "Países Bajos", region: "Europa", distributor: "Envío a domicilio desde España", channels: [] },
  { flag: "🇭🇺", country: "Hungría", short: "Hungría", region: "Europa", distributor: "Envío a domicilio desde España", channels: [] },
  { flag: "🇮🇪", country: "Irlanda", short: "Irlanda", region: "Europa", distributor: "Envío a domicilio desde España", channels: [] },
  { flag: "🇮🇹", country: "Italia", short: "Italia", region: "Europa", distributor: "Envío a domicilio desde España", channels: [] },
  { flag: "🇱🇺", country: "Luxemburgo", short: "Luxemburgo", region: "Europa", distributor: "Envío a domicilio desde España", channels: [] },
  { flag: "🇵🇱", country: "Polonia", short: "Polonia", region: "Europa", distributor: "Envío a domicilio desde España", channels: [] },
  { flag: "🇵🇹", country: "Portugal", short: "Portugal", region: "Europa", distributor: "Envío a domicilio desde España", channels: [] },
  { flag: "🇸🇪", country: "Suecia", short: "Suecia", region: "Europa", distributor: "Envío a domicilio desde España", channels: [] },
  { flag: "🇨🇭", country: "Suiza", short: "Suiza", region: "Europa", distributor: "Envío a domicilio desde España", channels: [] },

  // ───────────────────── NORTEAMÉRICA ──────────────────────
  {
    flag: "🇺🇸",
    country: "Estados Unidos",
    short: "EE.UU.",
    region: "Norteamérica",
    distributor: "Distribución mediante acuerdos locales",
    channels: [],
    expanding: true,
    storeUrl: "https://usa.grupodauro.com",
  },

  // ───────────────────── LATINOAMÉRICA ─────────────────────
  {
    flag: "🇲🇽",
    country: "México",
    short: "México",
    region: "Latinoamérica",
    distributor: "Omniprom",
    channels: [
      { name: "Amazon" },
      { name: "Gonvill" },
      { name: "Mercado Libre" },
      { name: "Buscalibre" },
    ],
    note: "También disponible en librerías independientes.",
    storeUrl: "https://mexico.grupodauro.com",
  },
  {
    flag: "🇦🇷",
    country: "Argentina",
    short: "Argentina",
    region: "Latinoamérica",
    distributor: "Boldt Impresores",
    channels: [
      { name: "Mercado Libre" },
      { name: "Lectus" },
      { name: "Mundo Cristiano" },
      { name: "Salerno" },
    ],
    storeUrl: "https://argentina.grupodauro.com",
  },
  {
    flag: "🇬🇹",
    country: "Guatemala",
    short: "Guatemala",
    region: "Latinoamérica",
    distributor: "Piedrasanta",
    channels: [
      { name: "Librería Piedrasanta" },
    ],
    note: "Próximamente en más librerías.",
    storeUrl: "https://guatemala.grupodauro.com",
  },
  {
    flag: "🇧🇴",
    country: "Bolivia",
    short: "Bolivia",
    region: "Latinoamérica",
    distributor: "Verdad para Vivir",
    channels: [
      { name: "Librería VPV" },
    ],
    expanding: true,
    note: "Ampliando red de librerías.",
    storeUrl: "https://bolivia.grupodauro.com",
  },
  {
    flag: "🇨🇴",
    country: "Colombia",
    short: "Colombia",
    region: "Latinoamérica",
    distributor: "Hipertexto",
    channels: [
      { name: "Librería de la U" },
      { name: "Mercado Libre" },
    ],
    note: "Próximamente también en Buscalibre.",
    storeUrl: "https://colombia.grupodauro.com",
  },
  {
    flag: "🇨🇷",
    country: "Costa Rica",
    short: "Costa Rica",
    region: "Latinoamérica",
    distributor: "Recursos Bíblicos / Bodeguita Cultural",
    channels: [
      { name: "Recursos Bíblicos" },
      { name: "Bodeguita Cultural" },
    ],
    note: "Próximamente en más librerías.",
    storeUrl: "https://costarica.grupodauro.com",
  },
  {
    flag: "🇨🇱",
    country: "Chile",
    short: "Chile",
    region: "Latinoamérica",
    distributor: "Dpiprint",
    channels: [],
    note: "Próximamente en librerías.",
    expanding: true,
    storeUrl: "https://chile.grupodauro.com",
  },
  {
    flag: "🇻🇪",
    country: "Venezuela",
    short: "Venezuela",
    region: "Latinoamérica",
    distributor: "Araca",
    channels: [],
    note: "Próximamente en más librerías.",
    expanding: true,
    storeUrl: "https://venezuela.grupodauro.com",
  },
  {
    flag: "🇪🇨",
    country: "Ecuador",
    short: "Ecuador",
    region: "Latinoamérica",
    distributor: "Distribución mediante acuerdos locales",
    channels: [],
    expanding: true,
    storeUrl: "https://ecuador.grupodauro.com",
  },
  {
    flag: "🇳🇮",
    country: "Nicaragua",
    short: "Nicaragua",
    region: "Latinoamérica",
    distributor: "Distribución mediante acuerdos locales",
    channels: [],
    expanding: true,
  },
  {
    flag: "🇭🇳",
    country: "Honduras",
    short: "Honduras",
    region: "Latinoamérica",
    distributor: "Distribución mediante acuerdos locales",
    channels: [],
    expanding: true,
  },
];

/** Países europeos con envío a domicilio (producción en España) */
export const EUROPE_COUNTRIES = DISTRIBUTION_NETWORK.filter(c => c.region === "Europa");

/** América: países con distribuidor local y/o tienda propia nombrada */
export const AMERICA_COUNTRIES = DISTRIBUTION_NETWORK.filter(
  c => c.region === "Latinoamérica" || c.region === "Norteamérica"
);

/** España + América con distribuidor nombrado (no europeo de solo envío) */
export const ACTIVE_COUNTRIES = DISTRIBUTION_NETWORK.filter(
  c => !c.expanding && c.region !== "Europa"
);

/** Total de países en la red (incluyendo los que están en expansión) */
export const TOTAL_COUNTRIES = DISTRIBUTION_NETWORK.length;

/** Número de países europeos cubiertos con envío a domicilio */
export const EUROPE_COUNT = EUROPE_COUNTRIES.length;

/** Países que ya tienen tienda Quares propia */
export const COUNTRIES_WITH_STORE = DISTRIBUTION_NETWORK.filter(c => c.storeUrl);
