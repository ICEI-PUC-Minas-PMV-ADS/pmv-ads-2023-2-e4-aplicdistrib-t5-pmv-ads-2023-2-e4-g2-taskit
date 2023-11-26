"use client";

import { useState, useEffect, Fragment } from "react";
import { FaChevronRight, FaKey } from "react-icons/fa";
import { useRouter } from 'next/navigation';

import { useForm } from "@/shared/hooks/useForm";
import { Input } from "@/shared/components/Input/Input";
import { Button } from "@/shared/components/Button";

import { AuthForm } from "./home.style";

export default function Home() {
  const [action, setAction] = useState("login");
  const { form, handleInput, setForm, isValid } = useForm({
    name: { value: "", label: "name", placeholder: "Nome", type: "text" },
    email: {
      value: "",
      required: true,
      label: "email",
      placeholder: "E-mail",
      type: "email",
    },
    password: {
      value: "",
      required: true,
      label: "password",
      placeholder: "Senha",
      type: "password",
    },
    checkpassword: {
      value: "",
      label: "checkpassword",
      placeholder: "Confirme a senha",
      type: "password",
    },
  });

  useEffect(() => {
    setForm({
      ...form,
      name: { ...form.name, required: action === "signin" },
      checkpassword: {
        ...form.checkpassword,
        required: action === "signin",
        value: "",
      },
    });
  }, [action]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //if (!isValid()) return;
    console.log("teste", isValid(), e);
    router.push("/tarefas");
    if (action === "login") {
      fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          email: form.email.value,
          password: form.password.value,
        }),
      });
    } else {
      fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
          name: form.name.value,
          email: form.email.value,
          password: form.password.value,
        }),
      });
    }
  }

  const router = useRouter();

  return (
    <div>
      <AuthForm onSubmit={handleSubmit}>
        {action === "sigin" ? <h1>Cadastre-se</h1> : <></>}

        {Object.values(form).map((item) =>
          item.required ? (
            <Input
              borderless
              key={item.label}
              id={item.label}
              type={item.type}
              placeholder={item.placeholder}
              defaultValue={item.value}
              required={item.required}
              onChange={handleInput}
            />
          ) : (
            <Fragment key={item.label}></Fragment>
          )
        )}
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
            onClick={() => setAction(action === "login" ? "signin" : "login")}
          >
            {action === "signin" ? "ou acesse sua conta" : "ou Cadastre-se"}
          </Button>


        </div>
      </AuthForm>
          <Button
          onClick={() => router.push("/timer")}
          >
            Timer
          </Button>
    </div>
  );
}
