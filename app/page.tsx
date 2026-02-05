import Image from "next/image";
import Link from "next/link";
import { promises as fs } from 'fs';
import path from 'path';

export default async function Home() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'menu.json');
  const json = await fs.readFile(filePath, 'utf8');
  const menu: { path: string; name: string; id: number; menu: string, icon: string }[] = JSON.parse(json);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center bg-white dark:bg-black sm:items-start">
        <>
          <h1>Home</h1>
          <div className="mt-4 px-3 grid w-full grid-cols-3 gap-4 sm:grid-cols-3">
            {menu.map((item) => (
                <Link
                  key={item.id}
                  href={item.path}
                  className="block rounded-lg bg-(--color-secondary) p-6 text-center shadow hover:scale-105 active:scale-95 focus-visible:scale-105 transition-transform transform-gpu no-tap-highlight dark:bg-zinc-900"
                >
                  <Image src={item.icon} alt={item.name} width={40} height={40} className="mx-auto mb-2" />
                  {item.name}
                </Link>
            ))}
          </div>
        </>
      </main>
    </div>
  );
}
