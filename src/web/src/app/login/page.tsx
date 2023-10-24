'use client'

import Link from "next/link";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";

import { useForm } from "@/shared/hooks/useForm";

import style from "./login.module.scss";

export default function Login() {
  const [action, setAction] = useState('login');
  const { form, handleInput, setForm, isValid } = useForm({
    name: { value: '', label: 'name', placeholder: 'Nome', type: 'text' },
    lastname: { value: '', label: 'lastname', placeholder: 'Sobrenome', type: 'text' },
    email: { value: '', required: true, label: 'email', placeholder: 'E-mail', type: 'email' },
    password: { value: '', required: true, label: 'password', placeholder: 'Senha', type: 'password' },
    checkpassword: { value: '', label: 'checkpassword', placeholder: 'Confirme a senha', type: 'password' }
  });

  useEffect(() => {
    setForm({
      ...form,
      name: { ...form.name, required: action === 'signin' },
      lastname: { ...form.lastname, required: action === 'signin' },
      checkpassword: { ...form.checkpassword, required: action === 'signin', value: '' },
    });

  }, [action]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (action === 'login' && isValid()) {
      fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({
          email: form.email.value,
          password: form.password.value
        })
      })
    }
  }

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
        <form onSubmit={handleSubmit}>
          <h1>{action === 'login' ? 'Entre' : 'Cadastre-se'}</h1>
          <div className={style.inputgroup}>
            {Object.values(form).map((item) => item.required ? (
              <label key={item.label} className={style.label} htmlFor={item.label}>
                <input id={item.label} type={item.type} name={item.label} placeholder={item.placeholder} defaultValue={item.value} required={item.required} onChange={handleInput} />
              </label>
            ) : <Fragment key={item.label}></Fragment>)}
            <div>
              <button type="button" onClick={() => setAction(action === 'login' ? 'signin' : 'login')}>Registrar</button>
              <button type="submit">Entrar</button>
            </div>
          </div>
        </form>
      </main>
      <br />
      <Link href='/'>Go Home</Link>
    </div>
  )
}





