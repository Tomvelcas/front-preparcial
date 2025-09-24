"use client";

import { create } from "zustand";

export interface Book {
  id?: number;
  name: string;
  isbn: string;
  image: string;
  publishingDate: string;
  description: string;
  editorial?: Editorial;
}

export interface Editorial {
  id: number;
  name: string;
}

export interface Organization {
  id: number;
  name: string;
  tipo: string;
}

export interface Prize {
  id?: number;
  premiationDate: string;
  name: string;
  description: string;
  organization: Organization;
}

export interface Author {
  id: number;
  name: string;
  birthDate: string;
  description: string;
  image: string;
  books: Book[];
  prizes: Prize[];
}

const DEFAULT_ORGANIZATION: Organization = {
  id: 1000,
  name: "org1",
  tipo: "PUBLICA",
};

const DEFAULT_EDITORIAL: Editorial = {
  id: 1000,
  name: "Editorial Genérica",
};

interface AuthorState {
  authors: Author[];
  loading: boolean;
  error: string | null;
  loadAuthors: () => Promise<void>;
  createAuthor: (
    author: Omit<Author, "id" | "books" | "prizes">,
    book: Omit<Book, "id" | "editorial">,
    prize: Omit<Prize, "id" | "organization">
  ) => Promise<void>;
  updateAuthor: (
    id: number,
    author: Partial<Omit<Author, "id" | "books" | "prizes">>
  ) => Promise<void>;
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

  // crear autor con libro y premio
  createAuthor: async (author, book, prize) => {
    try {
      // 1. Crear autor
      const resAuthor = await fetch("http://127.0.0.1:8080/api/authors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(author),
      });
      if (!resAuthor.ok) throw new Error("Error al crear autor");
      const newAuthor: Author = await resAuthor.json();

      // 2. Crear libro (con editorial fija)
      const bookPayload = { ...book, editorial: DEFAULT_EDITORIAL };
      const resBook = await fetch("http://127.0.0.1:8080/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookPayload),
      });
      if (!resBook.ok) throw new Error("Error al crear libro");
      const newBook: Book = await resBook.json();

      // 3. Asociar libro al autor
      await fetch(
        `http://127.0.0.1:8080/api/authors/${newAuthor.id}/books/${newBook.id}`,
        { method: "POST" }
      );

      // 4. Crear premio (con organización fija)
      const prizePayload = { ...prize, organization: DEFAULT_ORGANIZATION };
      const resPrize = await fetch("http://127.0.0.1:8080/api/prizes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prizePayload),
      });
      if (!resPrize.ok) throw new Error("Error al crear premio");
      const newPrize: Prize = await resPrize.json();

      // 5. Asociar premio al autor
      await fetch(
        `http://127.0.0.1:8080/api/prizes/${newPrize.id}/author/${newAuthor.id}`,
        { method: "POST" }
      );

      // 6. Actualizar estado global
      set((state) => ({
        authors: [
          ...state.authors,
          { ...newAuthor, books: [newBook], prizes: [newPrize] },
        ],
      }));
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
