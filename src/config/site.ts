/**
 * Configuración central de la marca.
 * Cambia aquí el nombre, textos y enlaces; se propagan a toda la web.
 */
export const siteConfig = {
  name: "NEXMOUSE",
  tagline: "Precision is everything.",
  description:
    "Mouse premium para gaming y uso profesional. Precisión, rendimiento y ergonomía.",
  currency: "USD",
  locale: "es-ES",
  contact: {
    email: "hola@nexmouse.example", // placeholder
    phone: "+00 000 000 000", // placeholder
    address: "Dirección pendiente de definir",
  },
  socials: [
    { label: "Instagram", href: "#" },
    { label: "X", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "Discord", href: "#" },
  ],
  nav: [
    { label: "Home", href: "/" },
    { label: "Gaming", href: "/products?category=gaming" },
    { label: "Professional", href: "/products?category=professional" },
    { label: "Colección", href: "/products" },
    { label: "Nosotros", href: "/#nosotros" },
  ],
  cartStorageKey: "nexmouse-cart-v1",
} as const;
