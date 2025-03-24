import { useState, useEffect } from "react";
import Column from "./Column";
import DEFAULT_CARDS from "../constants/tasks.ts";

// const oldTasks = localStorage.getItem("tasks");

const Content: React.FC = () => {
  const [tasks, setTasks] = useState(DEFAULT_CARDS);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (index: string) => {
    const newTasks = tasks.filter((task) => task.id !== JSON.stringify(index));
    setTasks(newTasks);
  };

  return (
    <section className="flex w-full h-full p-10 gap-6 justify-center">
      <Column 
        title="To do"
        tasks={tasks}
        status="todo"
        handleDelete={handleDelete}
      />
      <Column
        title="In Progress"
        tasks={tasks}
        status="doing"
        handleDelete={handleDelete}
      />
      <Column
        title="Review"
        tasks={tasks}
        status="review"
        handleDelete={handleDelete}
      />
      <Column
        title="Done"
        tasks={tasks}
        status="done"
        handleDelete={handleDelete}
      />
    </section>
  );
};

export default Content;