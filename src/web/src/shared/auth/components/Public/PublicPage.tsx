'use client';

import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";

import { Input } from "@/shared/components/Input/Input";
import { Button } from "@/shared/components/Button";

import { AuthForm } from "./PublicPage.style";
import { useAuth } from "../../context/AuthContext";

export function PublicPage() {
  const { Login, Register, error } = useAuth();
  const [action, setAction] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkpassword, setCheckPassword] = useState("");  

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();    
    if (action === "login") {
      await Login(email, password);
    } else {
      await Register(name, email, password);
    }
  }

  return (
    <AuthForm onSubmit={handleSubmit}>
      {action === "signin" ? <h1>Cadastre-se</h1> : <></>}

      {action === "signin" && <Input
        borderless
        id='name'
        type='text'
        placeholder='Name'
        defaultValue={name}
        required
        minLength={3}
        onChange={e => setName(e.target.value)}
      />}

      <Input
        borderless
        id='email'
        type='email'
        placeholder='Email'
        defaultValue={email}
        required
        onChange={e => setEmail(e.target.value)}
      />

      <Input
        borderless
        id='password'
        type='password'
        placeholder='Password'
        defaultValue={password}
        minLength={6}
        required
        onChange={e => setPassword(e.target.value)}
      />

      {action === "signin" && <Input
        borderless
        id='checkpassword'
        type='password'
        placeholder='Check Password'
        defaultValue={checkpassword}
        minLength={6}
        required
        onChange={e => setCheckPassword(e.target.value)}
      />}

      {error && <p>{error}</p>}

      <div>
        <Button
          type="submit"
          $variant={action === "login" ? "primary" : "secondary"}
        >
          {action === "signin" ? "Próximo" : "Entre"}
          {action === "signin" && <FaChevronRight />}
        </Button>
        <Button
          $variant={"transparent"}
          onClick={(e) => { e.preventDefault(); setAction(action === "login" ? "signin" : "login") }}
        >
          {action === "signin" ? "ou acesse sua conta" : "ou Cadastre-se"}
        </Button>
      </div>
    </AuthForm>
  )
}
