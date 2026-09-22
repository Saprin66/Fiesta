import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header"; // Или @/components/Header, если работает
import Footer from "../components/Footer"; // <-- Проверь эту строку


export const metadata: Metadata = {
  title: "Fiesta Store — Мебельный магазин",
  description: "Качественная мебель для вашего дома",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="flex-grow">
          {children}
        </div>
     <Footer/>
      </body>
    </html>
  );
}
