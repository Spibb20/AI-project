import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./_components/Header";

export const metadata: Metadata = {
  title: "AI Tools",
  description:
    "Image analysis, ingredient recognition, and image generation tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
