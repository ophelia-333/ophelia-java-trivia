import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Ophelia's Quizzes",
  description: "Interactive quizzes on Java, Cybersecurity, Linux, and more — by Ophelia.",
};

export const viewport: Viewport = {
  themeColor: "#9B2020",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="ophelia">
      <body className="min-h-screen bg-base-100 text-base-content">
        <Header />
        {children}
      </body>
    </html>
  );
}
