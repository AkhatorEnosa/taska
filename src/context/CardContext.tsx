import React, { createContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import DEFAULT_CARDS from "../constants/tasks";

interface Task {
  id: number;
  title: string;
  status: string;
  description: string;
}

export const CardContext = createContext<{
  activeCard: number | null;
  setActiveCard: React.Dispatch<React.SetStateAction<number | null>>;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  onDrop: (status: string, position: number) => void;
  handleDelete: (activeCard: number) => void;
  handleEditTask: (taskTitle: string, description: string) => void;
  taskTitle: string;
  setTaskTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}>({
  activeCard: null,
  setActiveCard: () => {},
  tasks: [],
  setTasks: () => {},
  taskTitle: "",
  setTaskTitle: () => {},
  description: "",
  setDescription: () => {},
  onDrop: () => {},
  handleDelete: () => {},
  handleEditTask: () => {},
});

const oldTasks = localStorage.getItem("tasks");

export function CardProvider({ children }: { children: ReactNode }) {
    const [activeCard, setActiveCard] = useState<number | null>(null);
    const [tasks, setTasks] = useState(oldTasks ? JSON.parse(oldTasks) : DEFAULT_CARDS);
    const [taskTitle, setTaskTitle] = React.useState("");
    const [description, setDescription] = React.useState("");


  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);


  const onDrop = (status: string, position: number) => {
      // console.log(`${activeCard} dropped at column ${status} in position ${position}`);

      if(activeCard === null || activeCard === undefined) return;

      const taskToMove = tasks[activeCard];
      // console.log(taskToMove);
      const otherTasks: Task[] = tasks.filter((_: Task, index: number) => index !== activeCard);

      // if(activeCard === position) return; 
      if(position - activeCard === 1) return;
      otherTasks.splice(position, 0, {
          ...taskToMove,
          status: status,
      });

      setTasks(otherTasks);
      setActiveCard(null)
  };


  const handleEditTask = (taskTitle: string, description: string) => {
    if(activeCard === null || activeCard === undefined) return;

    const taskToEdit = tasks[activeCard];
    const otherTasks: Task[] = tasks.filter((_: Task, index: number) => index !== activeCard);

    otherTasks.splice(activeCard, 0, {
        ...taskToEdit,
        title: taskTitle,
        description: description,
    });

    setTasks(otherTasks);
    setActiveCard(null)
  };


  // const handleColumn = (status: string) => {

  //   if(activeCard === null || activeCard === undefined) return;

  //   const taskToMove = tasks[activeCard];
  //   // console.log(taskToMove);
  //   const otherTasks: Task[] = tasks.filter((_: Task, index: number) => index !== activeCard);

  //   // if(activeCard === position) return; 
  //   // if(position - activeCard === 1) return;
  //   otherTasks.splice(position, 0, {
  //       ...taskToMove,
  //       status: status,
  //   });

  //   setTasks(otherTasks);
  //   setActiveCard(null)
  // };


  const handleDelete = (activeCard: number) => {
    const newTasks = tasks.filter((_: Task, index: number) => index !== activeCard);
    setTasks(newTasks);
  };

  return (
    <CardContext.Provider value={{
        activeCard, setActiveCard, 
        tasks, setTasks, 
        taskTitle, setTaskTitle,
        description, setDescription,
        onDrop, 
        handleEditTask, 
        handleDelete
    }}>
      {children}
    </CardContext.Provider>
  )
}

export default CardContext;