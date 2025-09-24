"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Book, Review } from "../../../hooks/booksHooks";

export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newReview, setNewReview] = useState({ source: "", description: "" });
  const [submitting, setSubmitting] = useState(false);

  const fetchBook = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8080/api/books/${id}`);
      if (!res.ok) throw new Error("Error al cargar el libro");
      const data: Book = await res.json();
      setBook(data);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchBook();
  }, [id]);

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !newReview.source || !newReview.description) return;

    setSubmitting(true);
    try {
      const res = await fetch(`http://127.0.0.1:8080/api/books/${id}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });

      if (!res.ok) throw new Error("Error al agregar reseña");

      const createdReview: Review = await res.json();

      // actualizar libro con la nueva reseña
      setBook((prev) =>
        prev
          ? { ...prev, reviews: [...(prev.reviews || []), createdReview] }
          : prev
      );

      setNewReview({ source: "", description: "" });
    } catch (err) {
      console.error(err);
      alert("Error al agregar la reseña");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-gray-500">Cargando libro...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!book) return <p className="text-gray-600">No se encontró el libro</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={book.image}
          alt={book.name}
          className="w-48 h-64 object-cover rounded-md shadow"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{book.name}</h1>
          <p className="text-gray-600 mb-2">
            <strong>ISBN:</strong> {book.isbn}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Fecha de publicación:</strong> {book.publishingDate}
          </p>
          <p className="text-gray-700 mb-4">{book.description}</p>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">Reseñas</h2>
        {book.reviews && book.reviews.length > 0 ? (
          <ul className="space-y-3">
            {book.reviews.map((review) => (
              <li
                key={review.id}
                className="p-3 border rounded-lg shadow-sm bg-gray-50"
              >
                <p className="text-gray-800">{review.description}</p>
                <p className="text-sm text-gray-500">Fuente: {review.source}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Este libro aún no tiene reseñas.</p>
        )}
      </div>

      {/* Formulario para agregar review */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Agregar una reseña</h3>
        <form onSubmit={handleAddReview} className="space-y-3">
          <input
            type="text"
            placeholder="Fuente (ej: Goodnotes)"
            value={newReview.source}
            onChange={(e) =>
              setNewReview((prev) => ({ ...prev, source: e.target.value }))
            }
            className="w-full border px-3 py-2 rounded-lg"
          />
          <textarea
            placeholder="Escribe tu reseña"
            value={newReview.description}
            onChange={(e) =>
              setNewReview((prev) => ({ ...prev, description: e.target.value }))
            }
            className="w-full border px-3 py-2 rounded-lg"
          />
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {submitting ? "Guardando..." : "Agregar Reseña"}
          </button>
        </form>
      </div>
    </div>
  );
}
