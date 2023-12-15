import { getAllTodos } from "@/app/api";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";

export async function Tarefas() {
  const tasks = await getAllTodos();

  return (
    <main className='max-w-4xl mx-auto mt-4'>
      <div className='text-center my-5 flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>Tarefas</h1>
        <AddTask />
      </div>
      <TodoList tasks={tasks} />
    </main>
  );
}
