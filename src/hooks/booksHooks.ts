"use client";

import { create } from "zustand";

interface BookState {
  books: Book[];
  loading: boolean;
  error: string | null;
  loadBooks: () => Promise<void>;
}
export interface Review {
  id: number;
  source: string;
  description: string;
}

export interface Book {
  id: number;
  name: string;
  isbn: string;
  image: string;
  publishingDate: string;
  description: string;
  reviews?: Review[];
}

export const useBooksStore = create<BookState>((set) => ({
  books: [],
  loading: false,
  error: null,

  loadBooks: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("http://127.0.0.1:8080/api/books");
      if (!res.ok) throw new Error("Error al cargar libros");

      const data: Book[] = await res.json();
      set({ books: data, loading: false });
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ error: err.message ?? "Error desconocido", loading: false });
      } else {
        set({ error: "Error desconocido", loading: false });
      }
    }
  },
}));
