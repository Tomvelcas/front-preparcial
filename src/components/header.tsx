"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const navegacion_actual = usePathname();

  const linkClasses = (pagina: string) =>
    `px-4 py-2 rounded-full transition ${
      navegacion_actual === pagina ? "bg-white text-blue-600 font-semibold shadow-md" : "text-white hover:bg-blue-500/40"
    }`;

  return (
    <header className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white shadow-md sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <Link href="/" className="text-2xl font-bold tracking-wide">
          📚 Bookstore
        </Link>

        <div className="flex gap-3">
          <Link href="/authors" className={linkClasses("/authors")}>
            Lista de Autores
          </Link>
          <Link href="/crear" className={linkClasses("/crear")}>
            Crear Autor
          </Link>
        </div>
      </nav>
    </header>
  );
}
