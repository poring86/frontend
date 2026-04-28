import "./globals.css";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";

import { CartProvider } from "./[slug]/menu/contexts/cart";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Code Burguer",
  description:
    "Code Burguer. Onde o código encontra o sabor! Escolha como prefere aproveitar sua refeição. Estamos aqui para oferecer praticidade e sabor em cada detalhe!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${poppins.className} mx-auto max-w-[1200px] bg-gray-100 antialiased`}
      >
        <div vaul-drawer-wrapper="" className="bg-background">
          <CartProvider>{children}</CartProvider>
        </div>

        <Toaster />
      </body>
    </html>
  );
}
