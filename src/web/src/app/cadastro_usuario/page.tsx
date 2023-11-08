'use client'
import Link from "next/link";

import Image from "next/image";
import { useTheme } from "@/shared/hooks/Theme";
import style from "./cadastro_usuario.module.scss";
import { FaKey } from "react-icons/fa";
import { useState, useEffect, Fragment } from "react";
//import {useForm} from "@/shared/hooks/userForm"

const URL_API = "api/v1/users";

export default function cadastroUsuario() {

  /*const [action,setAction] = useState('cadastroUsuario');
  const {form,handleInput,setForm,isValid} = useForm({
  
    name:{value:'',label:'name',placeholder:'Nome', type:'text'},
    email:{value:'',required: true,label:'email', placeholder:'E-mail', type:'email'},
    password:{value:'', required:true,label:'password', placeholder:'Senha', type:'password'},
    checkpassword:{value:'',label:'checkpassword',placeholder:'Confirme a Senha', type: 'password'}
  
  });
  
  useEffect(() => {
  
    setForm({
  
  ...form,
  name:{ ...form.name, required: action === 'cadastrar'},
  email:{...form.email, required: action === 'cadastrar'},
  checkpassword: {...form.checkpassword, required: action === 'cadastrar', value:''},
  
    });
  
  },[action]);
  
  function handleSubmit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();
  
  if (action === 'cadastrar' && isValid()){
  
    fetch('/api/v1/users',{
  
      method:'POST',
      body: JSON.stringify({
  
        name: form.name.value,
        email: form.email.value,
        password: form.password.value
  
      })
    })
  }
  
  }
  
  }*/

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
            <h1>NOVO USUÁRIO</h1>
            <b />
            <label className={style.label}>
              <input id="name" type="text" placeholder="Nome de Usuário" />
            </label>
            <label className={style.label} htmlFor="email">
              <input id="email" type="email" placeholder="E-mail" />
            </label>
            <label className={style.label} htmlFor="password">

              <input id="password" type="password" placeholder="Digite a Senha" />
            </label>
            <label className={style.label} htmlFor="password">

              <input id="password" type="password" placeholder="Confirme a Senha" />
            </label>
            <button className={style.btnCad} type="button">Confirmar</button>
            <a className={style.btnCanc} href="http://localhost:3000/login" >Cancelar</a>
          </div>

        </form>

      </main>


    </div>
  )
}
