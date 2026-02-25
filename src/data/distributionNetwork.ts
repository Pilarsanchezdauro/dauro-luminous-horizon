/**
 * Red de distribución internacional de Grupo Dauro.
 * Fuente: Quares (distribuidora internacional).
 * Última actualización: febrero 2026.
 */

export interface SalesChannel {
  name: string;
  url?: string;
}

export interface CountryDistribution {
  flag: string;
  country: string;
  /** Nombre corto para badges / banners */
  short: string;
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
  {
    flag: "🇪🇸",
    country: "España",
    short: "España",
    distributor: "Arnoia, Azeta, Elkar y Cimadevilla",
    channels: [],
    storeUrl: "https://tienda.grupodauro.com",
  },
  {
    flag: "🇪🇺",
    country: "Europa (excepto Reino Unido)",
    short: "Europa",
    distributor: "Distribución mediante acuerdos locales",
    channels: [],
    note: "Envío a todos los países de la Unión Europea y países asociados.",
    storeUrl: "https://europa.grupodauro.com",
  },
  {
    flag: "🇲🇽",
    country: "México",
    short: "México",
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
    distributor: "Araca",
    channels: [],
    note: "Próximamente en más librerías.",
    expanding: true,
    storeUrl: "https://venezuela.grupodauro.com",
  },
  {
    flag: "🇺🇸",
    country: "Estados Unidos",
    short: "EE.UU.",
    distributor: "Distribución mediante acuerdos locales",
    channels: [],
    expanding: true,
    storeUrl: "https://usa.grupodauro.com",
  },
  {
    flag: "🇪🇨",
    country: "Ecuador",
    short: "Ecuador",
    distributor: "Distribución mediante acuerdos locales",
    channels: [],
    expanding: true,
    storeUrl: "https://ecuador.grupodauro.com",
  },
  {
    flag: "🇳🇮",
    country: "Nicaragua",
    short: "Nicaragua",
    distributor: "Distribución mediante acuerdos locales",
    channels: [],
    expanding: true,
  },
  {
    flag: "🇭🇳",
    country: "Honduras",
    short: "Honduras",
    distributor: "Distribución mediante acuerdos locales",
    channels: [],
    expanding: true,
  },
];

/** Países con distribuidor nombrado (no genérico) */
export const ACTIVE_COUNTRIES = DISTRIBUTION_NETWORK.filter(c => !c.expanding);

/** Total de países en la red (incluyendo los que están en expansión) */
export const TOTAL_COUNTRIES = DISTRIBUTION_NETWORK.length;

/** Países que ya tienen tienda Quares */
export const COUNTRIES_WITH_STORE = DISTRIBUTION_NETWORK.filter(c => c.storeUrl);
