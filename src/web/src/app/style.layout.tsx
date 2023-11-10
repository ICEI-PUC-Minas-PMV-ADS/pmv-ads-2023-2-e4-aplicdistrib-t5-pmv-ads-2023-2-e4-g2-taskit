"use client";

import Image from "next/image";

import StyledComponentsRegistry from "@/shared/configs/registry";
import { ThemeProvider } from "@/shared/hooks/Theme";

import { GlobalStyle, Layout, Header } from "./global.style";
import Link from "next/link";

export default function StyleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider>
        <GlobalStyle />
        <Header>
          <Link href="/">
            <Image src="/logo.svg" width={120} height={64} alt="TaskIt" />
          </Link>
        </Header>
        <Layout>{children}</Layout>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
