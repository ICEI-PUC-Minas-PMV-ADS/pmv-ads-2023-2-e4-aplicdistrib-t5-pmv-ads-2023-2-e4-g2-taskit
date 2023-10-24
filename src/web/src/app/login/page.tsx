'use client'
import Link from "next/link";

import Image from "next/image";
import { useTheme } from "@/shared/hooks/Theme";
import style from "./login.module.scss";
import {FaKey} from "react-icons/fa";
import {AiFillMail} from "react-icons/ai"

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
          <label className={style.label} htmlFor="email">
            <AiFillMail/>
            <input id="email" type="email" placeholder="E-mail" />
          </label>
          <label className={style.label} htmlFor="password">
            <FaKey/>
            <input id="password" type="password" placeholder="Password" />
          </label>
          
          <button type="submit">Login</button>
          </div>
        </form>
<br />
        <h1>Cadastro</h1>
        <form>
          <div className={style.inputgroup}>
          <label className={style.label} htmlFor="Nome">
            <input id="name" type="name" placeholder="Name" />
          </label>
          <label className={style.label} htmlFor="LastName">
            <input id="lastname" type="lastname" placeholder="LastName" />
          </label>
          <label className={style.label} htmlFor="email">
            <input id="email" type="email" placeholder="E-mail" />
          </label>
          <label className={style.label} htmlFor="password">
            <input id="password" type="password" placeholder="Password" />
          </label>
          <label className={style.label} htmlFor="checkpassword">
            <input id="checkpassword" type="checkpassword" placeholder="CheckPassword" />
          </label>
          
          
          <button type="submit">Cadastrar</button>
          </div>
        </form>
        
      </main>
<br />
      <Link href='/'>Go Home</Link>
    </div>
  )
}





