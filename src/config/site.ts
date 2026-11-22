/**
 * Configuración central de la marca.
 * Cambia aquí el nombre, textos y enlaces; se propagan a toda la web.
 */
export const siteConfig = {
  name: "Jami Store",
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
  contact: {
    email: "hola@jamistore.example", // placeholder
    phone: "+00 000 000 000", // placeholder
    address: "Dirección pendiente de definir",
  },
  socials: [
    { label: "TikTok", href: "https://www.tiktok.com/@yamli_store" },
  ],
  nav: [
    { label: "Home", href: "/" },
    { label: "Mouse", href: "/products?category=mouse" },
    { label: "Teclados", href: "/products?category=keyboard" },
    { label: "Colección", href: "/products" },
    { label: "Nosotros", href: "/#nosotros" },
  ],
  cartStorageKey: "nexmouse-cart-v1",
} as const;
