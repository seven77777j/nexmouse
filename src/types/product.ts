export type ProductCategory = "mouse" | "keyboard";
export type Availability = "consult" | "in_stock" | "low_stock" | "preorder" | "out_of_stock";

export interface SpecItem {
  label: string;
  value: string;
}

export interface SequenceChapter {
  /** Primer frame (incluido) en el que aparece el texto. */
  from: number;
  /** Último frame (incluido). */
  to: number;
  eyebrow: string;
  title: string;
  body: string;
  stats?: SpecItem[];
  /** Lado de la pantalla en escritorio. */
  align?: "left" | "right";
}

export interface ImageSequenceConfig {
  /** Carpeta pública, p. ej. "/images/mouse-sequence". */
  basePath: string;
  /** Número total de frames (frame_000 … frame_{n-1}). */
  frameCount: number;
  prefix?: string;
  pad?: number;
  extension?: "webp" | "jpg" | "png" | "avif";
  /** Relación de aspecto nativa de los frames (ancho / alto). */
  aspect: number;
  /** Indica que los frames son provisionales. */
  isPlaceholder?: boolean;
  chapters?: SequenceChapter[];
}

export interface Product {
  id: string;
  slug: string;
  /** Nombre del modelo sin la marca. */
  model: string;
  brand: string;
  category: ProductCategory;
  /** Precio en la moneda de la tienda. Sin precio → se muestra "Consultar precio". */
  price?: number;
  description: string;
  highlights: string[];
  specs: SpecItem[];
  /** Fotos del producto. Vacío → se muestra una ficha tipográfica. */
  images: { src: string; alt: string }[];
  availability: Availability;
  /** Stock disponible (preparado para integrar inventario). */
  stock: number;
  tags: string[];
  /** Puesto en el ranking "Top 3 por marca" de @yamli_store. */
  rank?: 1 | 2 | 3;
  /** Publicación de TikTok de donde sale el producto. */
  sourceUrl?: string;
  featured?: boolean;
  sequence?: ImageSequenceConfig;
}

export function productName(p: Pick<Product, "brand" | "model">) {
  return `${p.brand} ${p.model}`;
}
