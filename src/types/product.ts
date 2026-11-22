export type ProductCategory = "gaming" | "professional";
export type Connectivity = "wireless" | "wired";
export type Availability = "in_stock" | "low_stock" | "preorder" | "out_of_stock";

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
  /** Prefijo del archivo. */
  prefix?: string;
  /** Dígitos del número de frame (000 = 3). */
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
  name: string;
  category: ProductCategory;
  connectivity: Connectivity;
  price: number;
  compareAtPrice?: number;
  shortDescription: string;
  description: string;
  highlights: string[];
  specs: SpecItem[];
  images: { src: string; alt: string }[];
  availability: Availability;
  /** Stock disponible (preparado para integrar inventario). */
  stock: number;
  tags: string[];
  /** Los datos son de demostración y no corresponden a un producto real. */
  isDemo: boolean;
  featured?: boolean;
  sequence?: ImageSequenceConfig;
}
