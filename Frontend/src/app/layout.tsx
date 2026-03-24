import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meu Projeto - Login",
  description: "Sistema de Login Corporativo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      {/* O className do inter garante que a fonte seja aplicada, 
          e 'antialiased' ajuda a deixar as letras mais nítidas */}
      <body className={`${inter.className} antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}