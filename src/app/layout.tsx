import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/header";

export const metadata: Metadata = {
  title: "Autores App",
  description: "Gestión de autores y libros",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900">
        {/* 👇 Header siempre visible */}
        <Header />
        <main className="max-w-4xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
