import Image from "next/image";
import { promises as fs } from "fs";
import path from "path";

export default async function Album() {
  const filePath = path.join(process.cwd(), "public", "data", "image.json");
  const json = await fs.readFile(filePath, "utf8");
  const image: { name: string; id: number; image: string }[] = JSON.parse(json);

  return (
    <div>
      {image.map((item) => (
        <div className="mt-4 px-3 grid w-full grid-cols-3 gap-4 sm:grid-cols-3">
          <div className="block rounded-lg bg-(--color-secondary) p-6 text-center shadow hover:scale-105 active:scale-95 focus-visible:scale-105 transition-transform transform-gpu no-tap-highlight dark:bg-zinc-900">
            <Image
              src={item.image}
              alt={item.name}
              width={40}
              height={40}
              className="mx-auto mb-2"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
