import React from "react";
import Card from "./Card";
import DropArea from "./DropArea";
import Button from "./Button";

interface ColumnProps {
  title: string;
  tasks: {
    id: number;
    title: string;
    description: string;
    status: string;
  }[];
  status: string;
  handleDelete: (id: number) => void;
  setActiveCard: React.Dispatch<React.SetStateAction<number | null>>;
  onDrop: (status: string, position: number) => void;
  includeButton?: boolean;
}

const Column: React.FC<ColumnProps> = ({ title, tasks, status, handleDelete, setActiveCard, onDrop, includeButton }) => {
  const [taskTitle, setTaskTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

    const filteredTasks = tasks.filter((task) => task.status === status);

    const handleAddTask = (taskTitle: string, description: string) => {
      console.log(taskTitle, description);
        // const newTask = {
        //     id: tasks.length + 1,
        //     title: taskTitle,
        //     description,
        //     status,
        // };
        // tasks.push(newTask);
        // setTaskTitle("");
        // setDescription("");
    };
  return (
    <div className={`w-72 h-fit flex flex-col gap-5 rounded-sm shadow border-t-4 bg-white ${status == 'done' ? "border-t-green-200" : status == 'doing' ? "border-t-amber-200" : status == 'review' ? "border-t-purple-200" : "border-t-blue-200"} border-[1px] border-gray-300/20 pt-2 px-2 shrink-0`}>
        <header className="flex justify-between items-center">
            <p className="font-semibold">{title} <span className="font-normal text-gray-400">{`(${filteredTasks.length})`}</span></p>
            {includeButton 
              && 
              <Button 
                status={status}
                taskTitle={taskTitle}
                description={description}
                handleTitleChange={(e) => setTaskTitle(e.target.value)}
                handleDescriptionChange={(e) => setDescription(e.target.value)}
                addTask={() => handleAddTask(title, description)}
              />
            }
        </header>

        <div className="flex flex-col">
            <DropArea onDrop={() => onDrop(status, 0)} status={status}/>
            {filteredTasks.length < 1 ? <h2 className="w-full text-center text-xs font-bold text-gray-500">No task in field</h2> : tasks.map(
                (task, index) =>
                  task.status === status && (
                        <React.Fragment key={index}>
                            <Card
                                title={task.title}
                                desc={task.description}
                                handleDelete={handleDelete}
                                index={index}
                                status={status}
                                setActiveCard={setActiveCard}
                            />
                            <DropArea onDrop={() => onDrop(status, index + 1)} status={status}/>
                        </React.Fragment>
                    )
            )}
        </div>
    </div>
  )
}

export default Column;

