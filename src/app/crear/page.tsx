"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { userSchema } from "../../validations/userSchema";
import { useAuthors } from "../../hooks/authorsHooks";

type UserFormData = z.infer<typeof userSchema>;

export default function CrearPage() {
  const { createAuthor } = useAuthors();

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
      await createAuthor(data); 
      alert("Author created successfully!");
      reset();
    } catch (err) {
      console.error("Error al crear autor:", err);
      alert("Hubo un error al crear el autor");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Crear Autor</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        <div>
          <label htmlFor="name" className="block font-medium mb-1">Name</label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="w-full border rounded-lg px-3 py-2"
          />
          {errors.name?.message && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="birthDate" className="block font-medium mb-1">Birth Date</label>
          <input
            type="date"
            id="birthDate"
            {...register("birthDate")}
            className="w-full border rounded-lg px-3 py-2"
          />
          {errors.birthDate?.message && (
            <p className="text-red-500 text-sm">{errors.birthDate.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block font-medium mb-1">Description</label>
          <textarea
            id="description"
            {...register("description")}
            className="w-full border rounded-lg px-3 py-2"
          />
          {errors.description?.message && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="image" className="block font-medium mb-1">Image URL</label>
          <input
            type="text"
            id="image"
            {...register("image")}
            className="w-full border rounded-lg px-3 py-2"
          />
          {errors.image?.message && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        <button 
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
