import { Metadata } from "next";
import { Inter } from "next/font/google";

import "./global.css";

import StyleLayout from "./style.layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaskIt",
  description: "Não perca nenhuma tarefa!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt_BR">
      <body className={inter.className}>
        <StyleLayout>{children}</StyleLayout>
      </body>
    </html>
  );
}
