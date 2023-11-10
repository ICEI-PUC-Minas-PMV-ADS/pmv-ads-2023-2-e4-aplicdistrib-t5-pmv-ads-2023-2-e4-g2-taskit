"use client";

import { useState, useEffect, Fragment } from "react";
import { FaChevronRight } from "react-icons/fa";

import { useForm } from "@/shared/hooks/useForm";
import { Input } from "@/shared/components/Input/Input";
import { Button } from "@/shared/components/Button";

import Tasks from "./tasks/page";

import { AuthForm } from "./home.style";

export default function Home() {
  const [token, setToken] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [error, setError] = useState<string>("");
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValid()) return;

    if (action === "login") {
      const userdata = await fetch("/api/v1/auth/login", {
        method: "PUT",
        body: JSON.stringify({
          email: form.email.value,
          password: form.password.value,
        }),
      }).then((res) => res.json());
      setToken(userdata.token);
      setUserId(userdata.id);
    } else {
      const newuser = await fetch("/api/v1/users", {
        method: "POST",
        body: JSON.stringify({
          name: form.name.value,
          email: form.email.value,
          password: form.password.value,
        }),
      })
        .then((res) => res.json())
        .catch((err) => setError("Algo deu errado, tente novamente."));
      if (newuser.id) {
        setAction("login");
      } else {
        setError(newuser.message);
      }
    }
  }

  return !token ? (
    <AuthForm onSubmit={handleSubmit}>
      {action === "sigin" ? <h1>Cadastre-se</h1> : <></>}
      {Object.values(form).map((item) =>
        item.required ? (
          <Input
            borderless
            key={item.label}
            name={item.label}
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
      {error && <p>{error}</p>}
    </AuthForm>
  ) : (
    <Tasks token={token} userId={userId} />
  );
}
