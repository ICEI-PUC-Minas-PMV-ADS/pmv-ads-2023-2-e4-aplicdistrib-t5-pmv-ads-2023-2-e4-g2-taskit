"use client";

import { useRouter } from "next/navigation";
import { AiOutlinePlus } from "react-icons/ai";
import { FormEventHandler, useState } from "react";

import Modal from "@/app/tasks/components/Modal";
import { addTodo } from "@/app/api";

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: new Crypto().randomUUID(),
      text: newTaskValue,
    });
    setNewTaskValue("");
    setModalOpen(false);
    router.refresh();
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-primary w-full"
      >
        Adicionar Tarefa <AiOutlinePlus className="ml-2" size={18} />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form
          className="flex flex-col items-center justify-center gap-5"
          onSubmit={handleSubmitNewTodo}
        >
          <h3 className="font-bold text-lg">Adicionar Tarefa</h3>
          <div className="modal-action">
            <input
              value={newTaskValue}
              onChange={(e) => setNewTaskValue(e.target.value)}
              type="text"
              placeholder="Escreva aqui"
              className="input input-bordered w-full max-w-xs"
            />

            <textarea
              className="textarea textarea-bordered w-full max-w-xs"
              placeholder="Bio"
            ></textarea>
            <input
              type="number"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />

            <button type="submit" className="btn">
              Avançar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
