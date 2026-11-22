import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — Mouse y teclados gaming`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const img = await readFile(join(process.cwd(), "public/images/home/portada-mouse.png"));
  const src = `data:image/png;base64,${img.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#020101", position: "relative" }}>
        <img src={src} width={900} height={562} style={{ position: "absolute", right: -120, top: 40 }} alt="" />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, #020101 30%, rgba(2,1,1,0.6) 55%, rgba(2,1,1,0) 75%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 80px", color: "white" }}>
          <div style={{ fontSize: 22, letterSpacing: 8, color: "#4c8dff", textTransform: "uppercase" }}>Mouse y teclados gaming</div>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3, marginTop: 18, lineHeight: 1 }}>
            {siteConfig.name.toUpperCase()}
          </div>
          <div style={{ fontSize: 30, color: "rgba(255,255,255,0.55)", marginTop: 26, maxWidth: 560 }}>
            El Top 3 de las mejores marcas, elegido modelo por modelo.
          </div>
        </div>
      </div>
    ),
    size
  );
}
