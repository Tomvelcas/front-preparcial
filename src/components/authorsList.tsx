"use client";

import { useState } from "react";
import { useAuthors, Author } from "@/hooks/authorsHooks";
import Image from "next/image";

export default function AuthorsList() {
  const { authors, loading, error, updateAuthor, deleteAuthor } = useAuthors();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Author>>({});

  if (loading) return <p className="text-gray-600">Cargando autores...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const handleEditClick = (author: Author) => {
    setEditingId(author.id);
    setFormData({
      name: author.name,
      birthDate: author.birthDate,
      description: author.description,
      image: author.image,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
  };

  const handleSave = async (id: number) => {
    await updateAuthor(id, formData);
    setEditingId(null);
    setFormData({});
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <ul className="space-y-6">
      {authors.map((author) => (
        <li
          key={author.id}
          className="flex gap-6 border border-gray-300 rounded-xl p-6 shadow-sm"
        >
          {/* Imagen del autor */}
          <div className="flex-shrink-0">
            <img
              src={author.image}
              alt={author.name}
              width={150}
              height={150}
              className="rounded-xl object-contain bg-gray-100"
            />
          </div>

          {/* Info o Formulario */}
          <div className="flex flex-col flex-1">
            {editingId === author.id ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={formData.name ?? ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 mb-2"
                />
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate ?? ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 mb-2"
                />
                <textarea
                  name="description"
                  value={formData.description ?? ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 mb-2"
                />
                <input
                  type="text"
                  name="image"
                  value={formData.image ?? ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 mb-2"
                />

                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave(author.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-400 text-white px-3 py-1 rounded-lg hover:bg-gray-500 transition"
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-800">
                  {author.name}
                </h2>
                <p className="text-sm text-gray-500 mb-2">
                  <strong>Fecha de nacimiento:</strong> {author.birthDate}
                </p>
                <p className="text-gray-700 mb-4">{author.description}</p>

                {/* Libros */}
                {author.books?.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Libros:
                    </h3>
                    <ul className="space-y-4">
                      {author.books.map((book, idx) => (
                        <li
                          key={idx}
                          className="flex gap-4 border border-gray-200 rounded-lg p-3"
                        >
                          {book.image && (
                            <img
                              src={book.image}
                              alt={book.name}
                              width={70}
                              height={100}
                              className="rounded-md object-contain bg-gray-50"
                            />
                          )}
                          <div>
                            <p className="font-medium text-gray-800">
                              {book.name}{" "}
                              <span className="text-sm text-gray-500">
                                ({book.isbn})
                              </span>
                            </p>
                            <p className="text-sm text-gray-600">
                              {book.description}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(author)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteAuthor(author.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
                  >
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
