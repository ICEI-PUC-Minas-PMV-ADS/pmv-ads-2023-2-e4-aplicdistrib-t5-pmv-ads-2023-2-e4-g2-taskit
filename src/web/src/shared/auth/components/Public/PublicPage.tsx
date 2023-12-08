'use client';

import { Fragment, useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { useForm } from "@/shared/hooks/useForm";

import { Input } from "@/shared/components/Input/Input";
import { Button } from "@/shared/components/Button";

import { AuthForm } from "./PublicPage.style";
import { useAuth } from "../../context/AuthContext";

export function PublicPage() {
  const { Login, Register } = useAuth();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValid()) return;
    if (action === "login") {
      await Login(form.email.value, form.password.value);
    } else {
      await Register(form.name.value, form.email.value, form.password.value);
    }
  }

  return (
    <AuthForm onSubmit={handleSubmit}>
      {action === "signin" ? <h1>Cadastre-se</h1> : <></>}

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
          onClick={(e) => { e.preventDefault(); setAction(action === "login" ? "signin" : "login") }}
        >
          {action === "signin" ? "ou acesse sua conta" : "ou Cadastre-se"}
        </Button>
      </div>
    </AuthForm>
  )
}
