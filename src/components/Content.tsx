import { useEffect, useState } from "react";
import Column from "./Column";
import DEFAULT_CARDS from "../constants/tasks.ts";

interface Task {
  id: number;
  title: string;
  status: string;
}

const oldTasks = localStorage.getItem("tasks");

const Content: React.FC = () => {
  const [tasks, setTasks] = useState(oldTasks ? JSON.parse(oldTasks) : DEFAULT_CARDS);
  const [activeCard, setActiveCard] = useState<number | null>(null);

//   useEffect(() => {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   }, [tasks]);

useEffect(() => {
  console.log(tasks)
}, [tasks])

  const handleDelete = (index: number) => {
    const newTasks = tasks.filter((task: Task) => task.id !== index);
    setTasks(newTasks);
  };

  const onDrop = (status: string, position: number) => {
    console.log(`${activeCard} dropped at column ${status} in position ${position}`);

    if(activeCard === null || activeCard === undefined) return;

    const taskToMove = tasks[activeCard];
    console.log(taskToMove);
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

  return (
    <section className="flex w-full h-full p-10 gap-3 overflow-scroll">
      <Column 
        title="To do"
        tasks={tasks}
        status="todo"
        handleDelete={handleDelete}
        setActiveCard={setActiveCard}
        onDrop={onDrop}
      />
      <Column
        title="In Progress"
        tasks={tasks}
        status="doing"
        handleDelete={handleDelete}
        setActiveCard={setActiveCard}
        onDrop={onDrop}
      />
      <Column
        title="Review"
        tasks={tasks}
        status="review"
        handleDelete={handleDelete}
        setActiveCard={setActiveCard}
        onDrop={onDrop}
      />
      <Column
        title="Done"
        tasks={tasks}
        status="done"
        handleDelete={handleDelete}
        setActiveCard={setActiveCard}
        onDrop={onDrop}
      />

      {/* <h1>Active card - {activeCard} </h1> */}
    </section>
  );
};

export default Content;