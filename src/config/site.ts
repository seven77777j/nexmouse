/**
 * Configuración central de la marca.
 * Cambia aquí el nombre, textos y enlaces; se propagan a toda la web.
 */
export const siteConfig = {
  name: "Yamli Store",
  tagline: "Precision is everything.",
  description:
    "Mouse y teclados gaming seleccionados por @yamli_store. Lo mejor para tu setup.",
  currency: "USD",
  locale: "es-ES",
  /**
   * Dónde se consulta el precio de un producto.
   * Si defines `whatsapp` (solo dígitos con código de país, p. ej. "51999999999"),
   * el botón "Consultar precio" abrirá WhatsApp con un mensaje ya escrito.
   */
  consult: {
    whatsapp: "",
    tiktokUrl: "https://www.tiktok.com/@yamli_store",
    tiktokHandle: "@yamli_store",
  },
  /** URL pública del sitio (para SEO, sitemap e imágenes al compartir). */
  url: "https://nexmouse.vercel.app",
  /** Datos de contacto opcionales: solo se muestran si están rellenos. */
  contact: {
    email: "",
    phone: "",
    address: "",
  },
  socials: [
    { label: "TikTok", href: "https://www.tiktok.com/@yamli_store" },
  ],
  nav: [
    { label: "Inicio", href: "/" },
    { label: "Mouse", href: "/products?category=mouse" },
    { label: "Teclados", href: "/products?category=keyboard" },
    { label: "Colección", href: "/products" },
    { label: "Cómo comprar", href: "/#como-comprar" },
    { label: "Nosotros", href: "/#nosotros" },
  ],
  cartStorageKey: "nexmouse-cart-v1",
} as const;
