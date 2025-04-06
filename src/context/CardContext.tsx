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
  taskTitle: string;
  setTaskTitle: React.Dispatch<React.SetStateAction<string>>;
  taskStatus: string;
  setTaskStatus: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  getTask: (index: number) => void;
  onDrop: (status: string, position: number) => void;
  handleDelete: (activeCard: number) => void;
  handleEditTask: (activeCard: number, taskTitle: string, description: string, taskStatus: string) => void;
  handleAddTask: (taskTitle: string, description: string) => void;
}>({
  activeCard: null,
  setActiveCard: () => {},
  tasks: [],
  setTasks: () => {},
  taskTitle: "",
  setTaskTitle: () => {},
  taskStatus: "",
  setTaskStatus: () => {},
  description: "",
  setDescription: () => {},
  error: "",
  setError: () => {},
  onDrop: () => {},
  handleDelete: () => {},
  handleEditTask: () => {},
  getTask: () => {},
  handleAddTask: () => {},
});

const oldTasks = localStorage.getItem("tasks");

export function CardProvider({ children }: { children: ReactNode }) {
    const [activeCard, setActiveCard] = useState<number | null>(null);
    const [tasks, setTasks] = useState(oldTasks ? JSON.parse(oldTasks) : DEFAULT_CARDS);
    const [taskTitle, setTaskTitle] = useState("");
    const [description, setDescription] = useState("");
    const [taskStatus, setTaskStatus] = useState("");
    const [error, setError] = useState("");


  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(tasks)
  }, [tasks]);


  const onDrop = (status: string, position: number) => {

      if(activeCard === null || activeCard === undefined) return;

      const taskToMove = tasks[activeCard];
      const otherTasks: Task[] = tasks.filter((_: Task, index: number) => index !== activeCard);
      
      if(position - activeCard === 1) return;
      otherTasks.splice(position, 0, {
          ...taskToMove,
          status: status,
      });

      setTasks(otherTasks);
      setActiveCard(null)
  };

  const getTask = (index: number) => {
    const task = tasks[index];
    setTaskTitle(task.title);
    setDescription(task.description);
    setTaskStatus(task.status);
}

  const handleEditTask = (activeCard: number, taskTitle: string, description: string, taskStatus: string) => {
    if(activeCard === null || activeCard === undefined) return;

    if(taskTitle !== "" || description !== "") {
      const taskToEdit = tasks[activeCard];
      const otherTasks: Task[] = tasks.filter((_: Task, index: number) => index !== activeCard);
  
      otherTasks.splice(activeCard, 0, {
          ...taskToEdit,
          title: taskTitle,
          description: description,
          status: taskStatus,
      });
  
      setTasks(otherTasks);
      setActiveCard(null)
    } else {
      setError("Please fill in the task title or description");
    }
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



  const handleAddTask = (title: string, desc: string) => {
    const newTask = {
        id: tasks.length + 1,
        title,
        description: desc,
        status: "todo",
    };
    tasks.push(newTask);
    console.log(tasks)
    setTaskTitle("");
    setDescription("");
};


  const handleDelete = (activeCard: number) => {
    const newTasks = tasks.filter((_: Task, index: number) => index !== activeCard);
    setTasks(newTasks);
  };

  return (
    <CardContext.Provider value={{
        activeCard, setActiveCard, 
        tasks, setTasks, 
        taskTitle, setTaskTitle,
        taskStatus, setTaskStatus,
        description, setDescription,
        error, setError,
        onDrop, 
        handleEditTask,
        handleDelete,
        getTask,
        handleAddTask
    }}>
      {children}
    </CardContext.Provider>
  )
}

export default CardContext;