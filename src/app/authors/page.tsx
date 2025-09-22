import AuthorsList from "@/components/authorsList";

export default function AuthorsPage() {
  return (
    <div className="py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Autores</h1>
      <AuthorsList />
    </div>
  );
}
