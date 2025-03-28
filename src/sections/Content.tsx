import { useEffect, useState } from "react";
import Column from "../components/Column.tsx";
import DEFAULT_CARDS from "../constants/tasks.ts";
import Navbar from "./Navbar.tsx";
import DeleteZone from "../components/DeleteZone.tsx";

interface Task {
  id: number;
  title: string;
  status: string;
}

const oldTasks = localStorage.getItem("tasks");

const Content: React.FC = () => {
  const [tasks, setTasks] = useState(oldTasks ? JSON.parse(oldTasks) : DEFAULT_CARDS);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

// useEffect(() => {
//   console.log(tasks)
// }, [tasks])

  const handleDelete = (activeCard: number) => {
    const newTasks = tasks.filter((_: Task, index: number) => index !== activeCard);
    setTasks(newTasks);
  };

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

  return (
    <>
      <Navbar />
      <section className="flex w-full h-full mt-20 p-10 gap-3 overflow-scroll">
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

        <DeleteZone
          handleDelete={() => activeCard !== null && handleDelete(activeCard)}
        />

        {/* <h1>Active card - {activeCard} </h1> */}
      </section>
    </>
  );
};

export default Content;