'use client'

import type { User } from '@prisma/client';
import { useState } from 'react'
import Image from 'next/image';
import style from "./user.module.scss";
import { useTheme } from "@/shared/hooks/Theme";
import Link from "next/link";


<header>
  <Image
    src="/logo.svg"
    width={120}
    height={64}
    alt="TaskIt" />
</header>
interface UserProps {
  params: {
    id: number;
    token: string;
  }
}

async function getUser(id: number) {
  return await fetch(`/api/v1/users/${id}`).then(res => res.json())

}


export default function User({ params }: UserProps) {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string>();
  const { setTheme } = useTheme();
  setTheme('dark')

  if (!user) {
    getUser(params.id).then(data => {
      if (data.message) {
        setError(data.message);
      } else {
        setUser(data)
      }
    });
  }

 
  //Caso dê erro na solicitação!
  if (!user) {
    if (error) {
      return <div>

        <div className='container'>
          <div id="img" className='style.Img'>

            <Image  src="/logo.svg"
              width='300' height='20' alt="logo do taskit reloginho flutuante"
            />
          </div>
        </div>
   
          <form>
            <h2> Bem vindo a sua tela de perfil!</h2>
            <h3> Por favor, preencha os campos abaixo</h3>

            <label htmlFor="name" />
            <input id="name" type="text" placeholder="Nome" />
            <label htmlFor="surname" />
            <input id="surname" type="text" placeholder="Sobrenome" />
            <button >
              <Link href='/login'>submit</Link>
            </button>

          </form>

        </div>
        {error}
    
    }
    return <div>
      <Image src="/logo.svg"
        width='200' height='200' alt="logo do taskit reloginho flutuante"
      />
      Loading...

    </div>;
  }

  return <div>User {user.name}</div>;
}
