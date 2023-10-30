'use client'

import type { User } from '@prisma/client';
import { useState } from 'react'
import Image from 'next/image';
import style from "./users.module.scss";
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
  }
}

async function getUser(id: number) {
  return await fetch(`/api/v1/users/${id}`).then(res => res.json())
}

export default function User({ params }: UserProps) {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string>();
  const{ setTheme } = useTheme();
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
        <div id='classdenied'>
        <Image src="/logo.svg"
width='200' height='50' alt="logo do taskit reloginho flutuante"
/>
</div>
<h2 id='texto'> Você precisa estar logado</h2>
<button>
<Link href='/login'>Login</Link>
</button>
        {error}
        </div>;
    }
    return <div>
      <Image src="/logo.svg"
width='200' height='50' alt="logo do taskit reloginho flutuante"
/>
      Loading...
     
      </div>;
  }

  return <div>User {user.name}</div>;
}
