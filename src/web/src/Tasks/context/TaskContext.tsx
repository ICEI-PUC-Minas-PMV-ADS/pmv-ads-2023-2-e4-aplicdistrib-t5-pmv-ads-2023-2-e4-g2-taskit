'use client';

import { ITask } from "../models/ITask";
import { createContext, useContext, useEffect, useState } from 'react';

export const TaskContext = createContext({
  tasks: [] as ITask[],
  add: async (token: string, task: ITask, ownerId: string) => false,
  edit: async (token: string, task: ITask) => false,
  remove: async (token: string, id: string) => false,
  getAll: async (token: string) => [] as ITask[],
  getById: async (token: string, id: string) => undefined as ITask | undefined,
});

export const useTask = () => useContext(TaskContext);

export const TaskProvider = ({ children }: any) => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  async function add(token: string, task: ITask, ownerId: string) {
    const data = await fetch('/api/v1/tasks/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...task, ownerId }),
    }).then(res => res.status === 200 ? true : false).finally(async () => {
      const updatedTasks = await getAll(token);
      setTasks(updatedTasks);
    });
    return data;
  }

  async function edit(token: string, task: ITask) {
    return await fetch('/api/v1/tasks/' + task.id, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res => res.status === 200 ? true : false).finally(async () => {
      const updatedTasks = await getAll(token);
      setTasks(updatedTasks);
    });
  }

  async function remove(token: string, id: string) {
    return await fetch('/api/v1/tasks/' + id, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res => res.status === 200 ? true : false).finally(async () => {
      const updatedTasks = await getAll(token);
      setTasks(updatedTasks);
    });
  }

  async function getAll(token: string): Promise<ITask[]> {
    const data = await fetch('/api/v1/tasks', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json()).then((res) => { setTasks(res); return res });

    if (data.message) {
      return [];
    }

    return data as ITask[];
  }

  async function getById(token: string, id: string): Promise<ITask | undefined> {
    const data = await fetch('/api/v1/tasks/' + id, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    if (data.message) {
      return undefined
    }

    return data as ITask;
  }

  return (
    <TaskContext.Provider value={{ tasks, add, edit, remove, getAll, getById }}>
      {children}
    </TaskContext.Provider>
  );
};
