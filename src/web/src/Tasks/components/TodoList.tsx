import React from "react";
import { useEffect } from "react";

import { useAuth } from "@/shared/auth/context/AuthContext";
import { useTask } from "@/Tasks/context/TaskContext";
import { useTheme } from "@/shared/hooks/Theme";
import Task from "./Task";

const TodoList: React.FC = () => {
  const { tasks, getAll } = useTask();
  const { userData } = useAuth();
  const { setTheme } = useTheme();
  setTheme('light');

  useEffect(() => {
    getAll(userData.token);
  }, [userData, getAll]);

  return (
    <div className='overflow-x-auto'>
      <table className='table w-full'>
        <thead>
          <tr>
            <th>Tarefas</th>
            <th>Ações</th>            
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
