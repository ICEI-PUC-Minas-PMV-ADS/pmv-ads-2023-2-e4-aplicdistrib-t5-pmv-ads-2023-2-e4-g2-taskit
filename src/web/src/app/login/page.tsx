'use client'
import Link from "next/link";
import { useTheme } from "@/shared/hooks/Theme";

export default function Login() {
  const { setTheme } = useTheme();
  setTheme('light');
  return (
  <>
    <h1>Login</h1>
    <Link href='/'>Go Home</Link>
  </>
  )
}
