"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { userSchema } from "../../validations/userSchema";
import { useAuthorsStore } from "../../hooks/authorsHooks";

type UserFormData = z.infer<typeof userSchema>;

export default function CrearPage() {
  const createAuthor = useAuthorsStore((state) => state.createAuthor);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: UserFormData) => {
    try {
      // Separar la información en autor, libro y premio
      const author = {
        name: data.name,
        birthDate: data.birthDate,
        description: data.description,
        image: data.image,
      };

      const book = {
        name: data.bookName,
        isbn: data.isbn,
        image: data.bookImage,
        publishingDate: data.publishingDate,
        description: data.bookDescription,
      };

      const prize = {
        name: data.prizeName,
        description: data.prizeDescription,
        premiationDate: data.premiationDate,
      };

      await createAuthor(author, book, prize);
      alert("Autor, libro y premio creados correctamente ✅");
      reset();
    } catch (err) {
      console.error("Error al crear autor:", err);
      alert("Hubo un error al crear el autor");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Crear Autor, Libro y Premio</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* ---------- Autor ---------- */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Autor</h2>

          <input
            type="text"
            placeholder="Nombre"
            {...register("name")}
            className="w-full border rounded-lg px-3 py-2"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <input
            type="date"
            {...register("birthDate")}
            className="w-full border rounded-lg px-3 py-2"
          />
          {errors.birthDate && <p className="text-red-500">{errors.birthDate.message}</p>}

          <textarea
            placeholder="Descripción"
            {...register("description")}
            className="w-full border rounded-lg px-3 py-2"
          />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}

          <input
            type="text"
            placeholder="URL de la imagen"
            {...register("image")}
            className="w-full border rounded-lg px-3 py-2"
          />
          {errors.image && <p className="text-red-500">{errors.image.message}</p>}
        </section>

        {/* ---------- Libro ---------- */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Libro</h2>

          <input
            type="text"
            placeholder="Título"
            {...register("bookName")}
            className="w-full border rounded-lg px-3 py-2"
          />
          {errors.bookName && <p className="text-red-500">{errors.bookName.message}</p>}

          <input
            type="text"
            placeholder="ISBN"
            {...register("isbn")}
            className="w-full border rounded-lg px-3 py-2"
          />
          {errors.isbn && <p className="text-red-500">{errors.isbn.message}</p>}

          <input
            type="text"
            placeholder="URL de la imagen"
            {...register("bookImage")}
            className="w-full border rounded-lg px-3 py-2"
          />
          {errors.bookImage && <p className="text-red-500">{errors.bookImage.message}</p>}

          <input
            type="date"
            {...register("publishingDate")}
            className="w-full border rounded-lg px-3 py-2"
          />
          {errors.publishingDate && <p className="text-red-500">{errors.publishingDate.message}</p>}

          <textarea
            placeholder="Descripción del libro"
            {...register("bookDescription")}
            className="w-full border rounded-lg px-3 py-2"
          />
          {errors.bookDescription && <p className="text-red-500">{errors.bookDescription.message}</p>}
        </section>

        {/* ---------- Premio ---------- */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Premio</h2>

          <input
            type="text"
            placeholder="Nombre del premio"
            {...register("prizeName")}
            className="w-full border rounded-lg px-3 py-2"
          />
          {errors.prizeName && <p className="text-red-500">{errors.prizeName.message}</p>}

          <textarea
            placeholder="Descripción del premio"
            {...register("prizeDescription")}
            className="w-full border rounded-lg px-3 py-2"
          />
          {errors.prizeDescription && <p className="text-red-500">{errors.prizeDescription.message}</p>}

          <input
            type="date"
            {...register("premiationDate")}
            className="w-full border rounded-lg px-3 py-2"
          />
          {errors.premiationDate && <p className="text-red-500">{errors.premiationDate.message}</p>}
        </section>

        {/* ---------- Botón ---------- */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Crear
        </button>
      </form>
    </div>
  );
}
