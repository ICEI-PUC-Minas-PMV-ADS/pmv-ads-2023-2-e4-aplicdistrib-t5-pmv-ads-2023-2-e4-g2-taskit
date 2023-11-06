'use client'
import Link from "next/link";

import Image from "next/image";
import { useTheme } from "@/shared/hooks/Theme";
import style from "./login.module.scss";
import { FaKey } from "react-icons/fa"
import { AiFillMail } from "react-icons/ai"

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


        <form>
          <div className={style.inputgroup}>
            <h1>Login</h1>
            <b />
            <label className={style.label} htmlFor="email">
              <AiFillMail />
              <input id="email" type="email" placeholder="E-mail" />
            </label>
            <b />
            <label className={style.label} htmlFor="password">
              <FaKey />
              <input id="password" type="password" placeholder="Password" />
            </label>

            <b />
            <button className={style.login} type="submit">Entrar</button>
            <button className={style.registrar} type="submit"><Link href="/cadastro_usuario">Registrar</Link></button>

          </div>


        </form>

      </main>


    </div>
  )
}





