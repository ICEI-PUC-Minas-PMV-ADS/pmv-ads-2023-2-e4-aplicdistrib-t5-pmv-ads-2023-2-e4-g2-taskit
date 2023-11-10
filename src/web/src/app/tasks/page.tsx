"use client";
import { getAllTodos } from "@/app/api";

import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
import { TaskContainer } from "./Task.style";

export default async function Tarefas({
  token,
  userId,
}: {
  token: string;
  userId: string;
}) {
  const tasks = await getAllTodos();

  return (
    <TaskContainer className="text-center my-5 flex flex-col gap-4">
      <main className="max-w-4xl mx-auto mt-4 w-full">
        <AddTask />
        <TodoList tasks={tasks} />
      </main>
    </TaskContainer>
  );
}
