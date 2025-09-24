import { z } from "zod";

export const userSchema = z.object({
  // ---------- Autor ----------
  name: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
    .max(200, { message: "El nombre debe tener como máximo 200 caracteres" }),

  birthDate: z
    .string()
    .refine((date: string) => !isNaN(Date.parse(date)), {
      message: "El formato de la fecha es inválido",
    }),

  description: z
    .string()
    .min(10, { message: "La descripción debe tener al menos 10 caracteres" })
    .max(500, {
      message: "La descripción debe tener como máximo 500 caracteres",
    }),

  image: z.string().url("La imagen debe ser una URL válida"),

  // ---------- Libro ----------
  bookName: z
    .string()
    .min(3, { message: "El título del libro debe tener al menos 3 caracteres" })
    .max(200, {
      message: "El título del libro debe tener como máximo 200 caracteres",
    }),

  isbn: z
    .string()
    .min(5, { message: "El ISBN debe tener al menos 5 caracteres" })
    .max(20, { message: "El ISBN debe tener como máximo 20 caracteres" }),

  bookImage: z.string().url("La imagen del libro debe ser una URL válida"),

  publishingDate: z
    .string()
    .refine((date: string) => !isNaN(Date.parse(date)), {
      message: "El formato de la fecha de publicación es inválido",
    }),

  bookDescription: z
    .string()
    .min(10, {
      message: "La descripción del libro debe tener al menos 10 caracteres",
    })
    .max(500, {
      message: "La descripción del libro debe tener como máximo 500 caracteres",
    }),

  // ---------- Premio ----------
  prizeName: z
    .string()
    .min(3, { message: "El nombre del premio debe tener al menos 3 caracteres" })
    .max(200, {
      message: "El nombre del premio debe tener como máximo 200 caracteres",
    }),

  prizeDescription: z
    .string()
    .min(10, {
      message: "La descripción del premio debe tener al menos 10 caracteres",
    })
    .max(500, {
      message: "La descripción del premio debe tener como máximo 500 caracteres",
    }),

  premiationDate: z
    .string()
    .refine((date: string) => !isNaN(Date.parse(date)), {
      message: "El formato de la fecha de premiación es inválido",
    }),
});
