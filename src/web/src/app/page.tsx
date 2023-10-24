
'use client'
import { GlobalStyle } from "./global.style";
import { useTheme } from "@/shared/hooks/useTheme";
import Link from "next/link";
import Image from "next/image";


export default function Home() {
  const { setTheme } = useTheme();
  setTheme('dark');
  return (
    <>
<Image src="/logo.svg"
width='200' height='50' alt="logo do taskit reloginho flutuante"
/>
      <GlobalStyle />
      <h1>Hello World - Tema</h1>
      <Link href='/login'>Login</Link>
    </>
  )
}
