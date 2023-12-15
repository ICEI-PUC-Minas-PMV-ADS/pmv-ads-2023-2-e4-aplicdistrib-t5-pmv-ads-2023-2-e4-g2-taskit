'use client'

import { BsClock, BsPlus } from 'react-icons/bs'

import AddTask from "@/Tasks/components/AddTask";
import TodoList from "@/Tasks/components/TodoList";

import { ActionMenu, HomeContainer, RoundButton, RoundLink } from "./home.style";
import { useTask } from '@/Tasks/context/TaskContext';
import { Button } from '@/shared/components/Button';
import { useState } from 'react';
import { useTheme } from '@/shared/hooks/Theme';

export default function Home() {
  const { tasks } = useTask();
  const { setTheme } = useTheme();
  const [isCreatingTask, setIsCreatingTask] = useState<boolean>(false);

  setTheme('light'); 

  return (
    <HomeContainer>
      <main>
        {isCreatingTask && <AddTask goBack={() => setIsCreatingTask(false)}></AddTask>}
        {tasks.length === 0 && !isCreatingTask ? (
          <>
            <h3>
              Você ainda não tem tarefas...
            </h3>
            <Button onClick={() => setIsCreatingTask(true)}>Criar Tarefa</Button>
          </>
        ) : tasks.length === 0 && isCreatingTask ? <></> : <TodoList />}
      </main>

      <ActionMenu>
        <RoundLink href='/timer' title='Timer'>
          <BsClock />
        </RoundLink>

        <RoundButton title='Criar Tarefa' onClick={() => setIsCreatingTask(true)}>
          <BsPlus />
        </RoundButton>
      </ActionMenu>
    </HomeContainer>
  );
}
