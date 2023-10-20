'use client'
import Link from "next/link";

import Image from "next/image";
import { useTheme } from "@/shared/hooks/Theme";
import style from "./login.module.scss";
import {FaKey} from "react-icons/fa"

export default function Login() {
  const { setTheme } = useTheme();
  setTheme('light');

  

  return (

    <div className={style.container}>
    
    <header>

        <Image
          src="/logo.svg"
          width={120}
          height={64}
          alt="TaskIt" />

    </header>

      <main>
        <h1>Login</h1>
        <form>
          <div className={style.inputgroup}>
          <label htmlFor="email">
            <input id="email" type="email" placeholder="E-mail" />
          </label>
          <label className={style.label} htmlFor="password">
            <FaKey/>
            <input id="password" type="password" placeholder="Password" />
          </label>
          
          <button type="submit">Login</button>
          </div>

        </form>
        
      </main>

      <Link href='/'>Go Home</Link>
    </div>
  )
}





