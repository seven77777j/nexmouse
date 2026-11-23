import type { Metadata, Viewport } from "next";
import { Inter, Bodoni_Moda, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { CartProvider } from "@/store/cart";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { FloatingConsult } from "@/components/layout/FloatingConsult";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const bodoni = Bodoni_Moda({ variable: "--font-bodoni", subsets: ["latin"], display: "swap" });
const mono = JetBrains_Mono({ variable: "--font-mono-face", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} — Mouse y teclados gaming`, template: `%s · ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: ["mouse gaming", "teclado gaming", "teclado magnético", "Hall Effect", "mouse inalámbrico", "periféricos gamer", siteConfig.name],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_PE",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Mouse y teclados gaming`,
    description: siteConfig.description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: siteConfig.name, description: siteConfig.description },
  robots: { index: true, follow: true },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  sameAs: siteConfig.socials.map((s) => s.href),
};

export const viewport: Viewport = {
  themeColor: "#0b0a0a",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} ${bodoni.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-ink antialiased">
        <a href="#contenido" className="sr-only z-[100] rounded-full bg-white px-5 py-3 text-sm font-medium text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Saltar al contenido
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <CartProvider>
          <Navbar />
          <main id="contenido">{children}</main>
          <FloatingConsult />
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
