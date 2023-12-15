"use client";

import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/shared/auth/context/AuthContext";
import { Input } from "@/shared/components/Input/Input";
import { TextArea } from "@/shared/components/TextArea";
import { Button } from "@/shared/components/Button";
import { useTask } from "../context/TaskContext";

import { AddTaskContainer } from "./AddTask.style";

const AddTask = ({ goBack }: { goBack: () => void }) => {
  const router = useRouter();
  const { add } = useTask();
  const { userData } = useAuth();  
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [timer, setTimer] = useState<string>("");

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await add(userData.token, {
      text: title,
    }, userData.id).then((result) => {
      if (result) {
        setTitle("");
        router.refresh();        
      }
    });
  };

  return (
    <AddTaskContainer>
      <form className="flex flex-col items-center justify-center gap-5" onSubmit={handleSubmitNewTodo}>
        <h3 className='font-bold text-lg'>Nova Tarefa</h3>
        <div className='modal-action'>
          <Input
            id="title"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
            type='text'
            placeholder='Titulo'
            className='input input-bordered w-full max-w-xs'
          />

          <TextArea defaultValue={description} onChange={(e) => setDescription(e.target.value)} className="textarea textarea-bordered w-full max-w-xs" placeholder="Descrição"></TextArea>

        </div>
        <footer>
          <label htmlFor="timer">Prazo:
            <Input id="timer" type="time" defaultValue={timer} onChange={(e) => setTimer(e.target.value)} className="input input-bordered w-full max-w-xs" pattern="[0-9]{2}:[0-9]{2}" />
          </label>

          <Button type='submit' className='btn'>
            Criar Tarefa
          </Button>
        </footer>
      </form>
      <Button $variant='tertiary' onClick={() => goBack()}>Retornar</Button>
    </AddTaskContainer>
  );
};

export default AddTask;
