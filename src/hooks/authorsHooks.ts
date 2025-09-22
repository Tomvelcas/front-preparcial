"use client";

import { useEffect, useState } from "react";

export interface Author {
  id: number;
  name: string;
  birthDate: string;
  description: string;
  image: string;
  books: Book[];
}

export interface Book {
  name: string;
  isbn: string;
  image: string;
  publishingDate: string; 
  description: string;

}

export function useAuthors() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // cargar autores desde la API
  const loadAuthors = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("http://127.0.0.1:8080/api/authors");
      if (!res.ok) throw new Error("Error al cargar autores");

      const data: Author[] = await res.json();
      setAuthors(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message ?? "Error desconocido");
      } else {
        setError("Error desconocido");
      }
    } finally {
      setLoading(false);
    }
  };
  // crear autor (POST al backend)
  const createAuthor = async (author: Omit<Author, "id" | "books">) => {
    try {
      const res = await fetch("http://127.0.0.1:8080/api/authors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(author),
      });

      if (!res.ok) throw new Error("Error al crear autor");

      const newAuthor: Author = await res.json();

      // actualizar el estado local sin esperar a recargar todo
      setAuthors((prev) => [...prev, newAuthor]);
    } catch (err) {
      console.error(err);
    }
  };

  // actualizar autor (PUT al backend)
  const updateAuthor = async (id: number, author: Partial<Omit<Author, "id" | "books">>) => {
    try {
      const res = await fetch(`http://127.0.0.1:8080/api/authors/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(author),
      });

      if (!res.ok) throw new Error("Error al actualizar autor");

      const updatedAuthor: Author = await res.json();

      // actualizar el estado local sin esperar a recargar todo
      setAuthors((prev) => prev.map((a) => (a.id === id ? updatedAuthor : a)));
    } catch (err) {
      console.error(err);
    }
  };


  // eliminar autor
  const deleteAuthor = async (id: number) => {
    try {
      const res = await fetch(`http://127.0.0.1:8080/api/authors/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar autor");

      // actualizar estado local quitando el autor eliminado
      setAuthors((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error(err);
    }
  };


  //  cargar al montar
  useEffect(() => {
    loadAuthors();
  }, []);

  return {
    authors,
    loading,
    error,
    reload: loadAuthors, 
    createAuthor,
    updateAuthor,
    deleteAuthor

  };
}
