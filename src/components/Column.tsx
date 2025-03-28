import React from "react";
import Card from "./Card";
import DropArea from "./DropArea";

interface ColumnProps {
  title: string;
  tasks: {
    id: number;
    title: string;
    status: string;
  }[];
  status: string;
  handleDelete: (id: number) => void;
  setActiveCard: React.Dispatch<React.SetStateAction<number | null>>;
  onDrop: (status: string, position: number) => void;
}

const Column: React.FC<ColumnProps> = ({ title, tasks, status, handleDelete, setActiveCard, onDrop }) => {
    const filteredTasks = tasks.filter((task) => task.status === status);
  return (
    <div className={`w-72 h-fit flex flex-col gap-5 rounded-sm shadow border-t-4 bg-white ${status == 'done' ? "border-t-green-200" : status == 'doing' ? "border-t-amber-200" : status == 'review' ? "border-t-purple-200" : "border-t-blue-200"} border-[1px] border-gray-300/20 py-5 px-2 shrink-0`}>
        <header className="flex justify-between items-center">
            <p className="font-semibold">{title} <span className="font-normal text-gray-400">{`(${filteredTasks.length})`}</span></p>
            {/* <Button /> */}
        </header>

        <div className="flex flex-col">
            <DropArea onDrop={() => onDrop(status, 0)} status={status}/>
            {filteredTasks.length < 1 ? <h2 className="w-full text-center text-xs font-bold text-gray-500">No task in field</h2> : tasks.map(
                (task, index) =>
                  task.status === status && (
                        <React.Fragment key={index}>
                            <Card
                                title={task.title}
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

