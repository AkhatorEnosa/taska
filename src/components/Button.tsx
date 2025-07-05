import { useContext } from "react";
import AddTaskModal from "./AddTaskModal";
import CardContext from "../context/CardContext";

interface ButtonProps {
  status: string;
}

const Button = ({ status }: ButtonProps) => {
  const { showModal, setShowModal } = useContext(CardContext);

    const handleShowModal = () => setShowModal(!showModal);
  return (
    <>
        <button className={`flex gap-1 text-white ${status == 'done' ? "bg-green-400 hover:bg-green-500" : status == 'doing' ? "bg-amber-400 hover:bg-amber-500" : status == 'review' ? "bg-purple-400 hover:bg-purple-500" : "bg-blue-500 hover:bg-blue-600"} text-xs py-2 px-2 rounded-md transition-all duration-150`} type="button" onClick={handleShowModal}>
        <i className="bi bi-plus-lg"></i>Add
        </button>

        <AddTaskModal
        />
    </>
  )
}

export default Button