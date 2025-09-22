// app/page.tsx
"use client";

import Link from "next/link";

const authors = [
  {
    id: 1000,
    name: "J.K. Rowling",
    books: [
      {
        id: 1000,
        name: "Harry Potter and the Philosopher's Stone",
        image:
          "https://images-na.ssl-images-amazon.com/images/I/81-Q4oeHicL.jpg",
      },
      {
        id: 1008,
        name: "Harry Potter and the Cursed Child",
        image: "https://m.media-amazon.com/images/I/51G+WN7UghL.jpg",
      },
    ],
  },
  {
    id: 1001,
    name: "Stephen King",
    books: [
      {
        id: 1001,
        name: "The Shining",
        image:
          "https://highclass.com.py/wp-content/uploads/2020/09/the-shining-cover.jpg",
      },
      {
        id: 1012,
        name: "Billy Summers",
        image:
          "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781982173616/billy-summers-9781982173616_hr.jpg",
      },
    ],
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12 bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Hero */}
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-4 flex items-center justify-center gap-2">
          Bookstore
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Practica preparcial de Desarrollo Web con Next.js y TypeScript
        </p>
        <p className="text-gray-600 mb-8">
          Explora nuestra colección de autores y sus libros. Puedes ver la
          lista de autores existentes o crear uno nuevo.
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
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl">
        {authors.flatMap((author) =>
          author.books.map((book) => (
            <div
              key={book.id}
              className="flex flex-col items-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={book.image}
                alt={book.name}
                className="w-28 h-40 object-cover rounded-md mb-3"
              />
              <p className="text-sm font-medium text-gray-700 text-center">
                {book.name}
              </p>
              <p className="text-xs text-gray-500">by {author.name}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
