"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useBooksStore } from "../hooks/booksHooks";

export default function Home() {
  const { books, loadBooks, loading, error } = useBooksStore();

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  return (
    <main className="flex min-h-screen flex-col items-center p-12 bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Hero */}
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-4 flex items-center justify-center gap-2">
          Bookstore
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Práctica parcial de Desarrollo Web con Next.js y TypeScript
        </p>
        <p className="text-gray-600 mb-8">
          Explora nuestra colección de autores y sus libros. Puedes ver la lista de
          autores existentes o crear uno nuevo.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/authors"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Ver Autores
          </Link>
          <Link
            href="/crear"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300 transition"
          >
            Crear Autor
          </Link>
        </div>
      </div>

      {/* Grid de libros */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl w-full">
        {loading && <p className="text-gray-500">Cargando libros...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading &&
          !error &&
          books.map((book) => (
            <Link
              key={book.id}
              href={`/books/${book.id}`}
              className="flex flex-col items-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
            >
              <img
                src={book.image}
                alt={book.name}
                className="w-28 h-40 object-cover rounded-md mb-3"
              />
              <p className="text-sm font-medium text-gray-700 text-center">
                {book.name}
              </p>
              <p className="text-xs text-gray-500">
                Publicado: {book.publishingDate}
              </p>
              <p className="text-xs text-gray-500 text-center line-clamp-3">
                {book.description}
              </p>
            </Link>
          ))}
      </div>
    </main>
  );
}
