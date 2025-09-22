"use client";

import { create } from "zustand";

export interface Book {
  name: string;
  isbn: string;
  image: string;
  publishingDate: string; 
  description: string;
}

export interface Author {
  id: number;
  name: string;
  birthDate: string;
  description: string;
  image: string;
  books: Book[];
}

interface AuthorState {
  authors: Author[];
  loading: boolean;
  error: string | null;
  loadAuthors: () => Promise<void>;
  createAuthor: (author: Omit<Author, "id" | "books">) => Promise<void>;
  updateAuthor: (id: number, author: Partial<Omit<Author, "id" | "books">>) => Promise<void>;
  deleteAuthor: (id: number) => Promise<void>;
}

export const useAuthorsStore = create<AuthorState>((set) => ({
  authors: [],
  loading: false,
  error: null,

  // cargar autores desde la API
  loadAuthors: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("http://127.0.0.1:8080/api/authors");
      if (!res.ok) throw new Error("Error al cargar autores");

      const data: Author[] = await res.json();
      set({ authors: data, loading: false });
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ error: err.message ?? "Error desconocido", loading: false });
      } else {
        set({ error: "Error desconocido", loading: false });
      }
    }
  },

  // crear autor
  createAuthor: async (author) => {
    try {
      const res = await fetch("http://127.0.0.1:8080/api/authors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(author),
      });

      if (!res.ok) throw new Error("Error al crear autor");

      const newAuthor: Author = await res.json();
      set((state) => ({ authors: [...state.authors, newAuthor] }));
    } catch (err) {
      console.error(err);
    }
  },

  // actualizar autor
  updateAuthor: async (id, author) => {
    try {
      const res = await fetch(`http://127.0.0.1:8080/api/authors/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(author),
      });

      if (!res.ok) throw new Error("Error al actualizar autor");

      const updatedAuthor: Author = await res.json();

      set((state) => ({
        authors: state.authors.map((a) => (a.id === id ? updatedAuthor : a)),
      }));
    } catch (err) {
      console.error(err);
    }
  },

  // eliminar autor
  deleteAuthor: async (id) => {
    try {
      const res = await fetch(`http://127.0.0.1:8080/api/authors/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar autor");

      set((state) => ({
        authors: state.authors.filter((a) => a.id !== id),
      }));
    } catch (err) {
      console.error(err);
    }
  },
}));
