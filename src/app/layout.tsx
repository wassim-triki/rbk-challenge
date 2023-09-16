import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import { Toaster } from "./components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevLinks",
  description: "Link sharing app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-muted min-h-screen p-5 ${inter.className}`}>
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
