"use client";

import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2, FiClock } from "react-icons/fi";

import { useAuth } from "@/shared/auth/context/AuthContext";
import { useTask } from "../context/TaskContext";
import { ITask } from "../models/ITask";
import Modal from "./Modal";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const { userData } = useAuth();
  const { edit, remove } = useTask();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await edit(userData.token, {
      id: task.id,
      text: taskToEdit,
    });
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await remove(userData.token, id);
    setOpenModalDeleted(false);
    router.refresh();
  };

  return (
    <tr key={task.id}>
      <td className='w-full'>{task.text}</td>

      <td className='flex gap-5'>
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor='pointer'
          className='text-blue-500'
          size={25}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className='font-bold text-lg'>Editar tarefa</h3>
            <div className='modal-action'>
              <input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                type='text'
                placeholder='Type here'
                className='input input-bordered w-full'

              />

              <textarea
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                placeholder='bio'
                className='textarea textarea-bordered'
              />

              <button type='submit' className='btn'>
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash2
          onClick={() => setOpenModalDeleted(true)}
          cursor='pointer'
          className='text-red-500'
          size={25}
        />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className='text-lg'>
            Tem certeza que você quer deletar?
          </h3>
          <div className='modal-action'>
            <button onClick={() => handleDeleteTask(task.id || '')} className='btn'>
              Sim
            </button>
          </div>
        </Modal>

        <FiClock
          onClick={() => router.push("/timer")}
          cursor='pointer'
          className='text-green-500'
          size={25}
        />

      </td>
    </tr>
  );
};

export default Task;
