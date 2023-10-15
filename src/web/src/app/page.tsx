'use client'
import { GlobalStyle } from "./global.style";
import { useTheme } from "@/shared/hooks/Theme";
import Link from "next/link";

export default function Home() {
  const { setTheme } = useTheme();
  setTheme('dark');
  return (
    <>
      <GlobalStyle />
      <h1>Hello World - Tema</h1>
      <Link href='/login'>Login</Link>
    </>
  )
}
