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
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showEditModal: boolean;
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  getTask: (index: number) => void;
  onDrop: (status: string, position: number) => void;
  handleDelete: (activeCard: number) => void;
  handleEditTask: ( taskTitle: string, description: string, taskStatus: string) => void;
  handleAddTask: (title: string, desc: string) => void;
  handleCloseModal: () => void;
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
  error: false,
  setError: () => {},
  showModal: false,
  setShowModal: () => {},
  showEditModal: false,
  setShowEditModal: () => {},
  onDrop: () => {},
  handleDelete: () => {},
  handleEditTask: () => {},
  getTask: () => {},
  handleAddTask: () => {},
  handleCloseModal: () => {},
});

const oldTasks = localStorage.getItem("tasks");

export function CardProvider({ children }: { children: ReactNode }) {
    const [activeCard, setActiveCard] = useState<number | null>(null);
    const [tasks, setTasks] = useState(oldTasks ? JSON.parse(oldTasks) : []);
    const [taskTitle, setTaskTitle] = useState("");
    const [description, setDescription] = useState("");
    const [taskStatus, setTaskStatus] = useState("");
    const [error, setError] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);


  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleCloseModal = () => {
    setShowModal(false);
    setShowEditModal(false);
    setError(false);
    setTaskTitle("");
    setDescription("");
    setTaskStatus("");
  }

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

  const getTask = (activeCard: number) => {
    const task = tasks[activeCard];
    if (!task) return;
    setActiveCard(activeCard);
    setTaskTitle(task.title);
    setDescription(task.description);
    setTaskStatus(task.status);
}

  const handleEditTask = ( taskTitle: string, description: string, taskStatus: string) => {
    if(activeCard === null || activeCard === undefined) return;

    if(taskTitle.trim() !== "" && description.trim() !== "") {
      // console.log(activeCard)
      const taskToEdit = tasks[activeCard];
      const otherTasks: Task[] = tasks.filter((_: Task, index: number) => index !== activeCard);
      // console.log(otherTasks)
  
      otherTasks.splice(activeCard, 0, {
          ...taskToEdit,
          title: taskTitle,
          description: description,
          status: taskStatus,
      });
  
      setTasks(otherTasks);
      setActiveCard(null)

      setShowEditModal(false);
      setTaskTitle("");
      setDescription("");
      setTaskStatus("");
      setError(false);
      // setActiveCard(null);
    } else {
      setError(true);
      setShowEditModal(true)
    }
  };

  const handleAddTask = (title: string, desc: string) => {
    if(title.trim() === "" || desc.trim() === "") {
        setError(true);
        return;
    } else {
        setError(false);
        const newTask = {
            id: tasks.length + 1,
            title,
            description: desc,
            status: "todo",
        };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        setTaskTitle("");
        setDescription("");
        setShowModal(false)
    }
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
        showModal, setShowModal,
        showEditModal, setShowEditModal,
        onDrop, 
        handleEditTask,
        handleDelete,
        getTask,
        handleAddTask,
        handleCloseModal
    }}>
      {children}
    </CardContext.Provider>
  )
}

export default CardContext;