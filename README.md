# Yamli Store — tienda premium de mouse y teclados

Experiencia e-commerce dark premium para mouse **Gaming** y **Professional**.
Stack: Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · GSAP 3 + ScrollTrigger · Canvas · Lucide.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

> ⚠️ Todo el catálogo (nombres, precios, especificaciones) y todas las imágenes son **de demostración**.
> Los renders del mouse son provisionales y llevan la marca "PLACEHOLDER / DEMO RENDER".
> No hay pasarela de pago: el checkout nunca cobra ni confirma pedidos.

## Estructura

```
src/
  app/
    page.tsx                 Home: Hero → Secuencia 360° → Categorías → Colección → Nosotros
    layout.tsx               Fuentes, CartProvider, Navbar, Footer, CartDrawer
    products/page.tsx        Catálogo con filtros (?category, ?connectivity, ?price, ?sort, ?q)
    products/[slug]/page.tsx Detalle: galería, specs, cantidad, compra, secuencia (si existe), relacionados
    cart/page.tsx            Carrito completo
    checkout/page.tsx        Checkout preparado (sin pagos)
    checkout/actions.ts      Server Action: revalida carrito y delega en el proveedor de pago
    legal/{privacy,terms}    Páginas legales (pendientes de texto)
  components/
    layout/   Navbar, Footer, SearchOverlay
    sequence/ ScrollSequence (pin + scrub + capítulos de texto)
    home/     Hero, Categories, CollectionPreview, About, Reveal, SectionHeading
    product/  ProductCard, Catalog, ProductGallery, PurchasePanel, QuantitySelector, AddToCartButton
    cart/     CartDrawer, CartLineItem
    ui/       Button, Logo, DemoBadge
  config/
    site.ts       Nombre de marca, navegación, contacto, redes, moneda  ← cambiar marca aquí
    sequence.ts   Ruta y número de frames de la secuencia principal
  data/products.ts           Fuente única del catálogo (sustituible por API/CMS)
  hooks/useImageSequence.ts  Motor de precarga + dibujado en canvas
  lib/
    products.ts              Consultas, filtros, búsqueda, relacionados
    inventory.ts             Punto de integración de inventario
    checkout/payment-provider.ts  Contrato para Stripe / Mercado Pago / PayPal…
  store/cart.tsx             Carrito (Context + reducer + localStorage + sync entre pestañas)
  types/product.ts
scripts/render_mouse.py      Generador de los renders provisionales
```

## Secuencia de imágenes controlada por scroll

- `ScrollSequence` fija (pin) la escena con ScrollTrigger y mapea el progreso del scroll al frame (`scrub`), hacia delante y hacia atrás. No hay reproducción automática.
- `useImageSequence` dibuja en `<canvas>` con un único `requestAnimationFrame` por cambio, encaje *contain*, DPR limitado a 2 y redibujado en resize.
- Precarga progresiva: frame 0 → último → cada 16 → 8 → 4 → 2 → 1. Si un frame aún no ha llegado se dibuja el cargado más cercano (sin parpadeos).
- Lazy: la carga empieza cuando el canvas está cerca del viewport. Al desmontar se cancelan descargas y se liberan las imágenes.
- Los textos de cada tramo se definen en `product.sequence.chapters` (`from`/`to` en frames).

### Sustituir los frames provisionales

1. Exporta la rotación real como `frame_000.webp … frame_120.webp` (mismo encuadre, producto centrado, fondo #080808).
2. Cópialos a `public/images/mouse-sequence/`.
3. Si cambia el número o la proporción, edita `frameCount` y `aspect` en `src/config/sequence.ts` y ajusta los `chapters` en `src/data/products.ts`.
4. Pon `isPlaceholder: false` para quitar la etiqueta "Frames provisionales".

Cualquier producto puede tener su propia secuencia añadiendo `sequence` en `data/products.ts` (ver *Atelier Ergo*).

## Integrar pagos

Implementa `PaymentProvider` en `src/lib/checkout/payment-provider.ts` (en servidor) y devuélvelo en `getPaymentProvider()`.
`startCheckout` ya revalida productos, cantidades y precios contra el catálogo antes de llamarlo.
