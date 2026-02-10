import { promises as fs } from "fs";
import path from "path";
import AlbumViewer from "./AlbumViewer";

export default async function Album() {
  const filePath = path.join(process.cwd(), "public", "data", "image.json");
  const json = await fs.readFile(filePath, "utf8");
  const image: { name: string; id: number; image: string }[] = JSON.parse(json);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
      {/* Album Viewer Below */}
      <div style={{ paddingBottom: "2rem" }}>
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
          Browse Gallery
        </h2>
        <AlbumViewer images={image} />
      </div>
    </div>
  );
}
