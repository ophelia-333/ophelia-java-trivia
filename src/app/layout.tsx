import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Ophelia's Java Trivia",
  description: "Quiz interativo de Java e OOP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" data-theme="ophelia">
      <body className="min-h-screen bg-base-100 text-base-content">
        <Header />
        {children}
      </body>
    </html>
  );
}
