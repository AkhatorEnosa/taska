import { useState } from "react";
import AddTaskModal from "./AddTaskModal";

interface ButtonProps {
  status: string;
  addTask: () => void;
  taskTitle: string;
  description: string;
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Button = ({ status, addTask, taskTitle, description, handleTitleChange, handleDescriptionChange }: ButtonProps) => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(!showModal);
  return (
    <>
        <button className={`flex gap-1 text-white ${status == 'done' ? "bg-green-400 hover:bg-green-500" : status == 'doing' ? "bg-amber-400 hover:bg-amber-500" : status == 'review' ? "bg-purple-400 hover:bg-purple-500" : "bg-blue-400 hover:bg-blue-500"} text-sm py-2 px-2 rounded-md cursor-pointer transition-all duration-150`} type="button" onClick={handleShowModal}>
        <i className="bi bi-plus-lg"></i>Add
        </button>

        <AddTaskModal 
            showModal={showModal}
            handleCloseModal={handleShowModal}
            addTask={addTask}
            taskTitle={taskTitle}
            description={description}
            handleTitleChange={handleTitleChange}
            handleDescriptionChange={handleDescriptionChange}
        />
    </>
  )
}

export default Button