import { useState } from "react";
import { useContext } from "react";
import { CardContext } from "../context/CardContext";

const DeleteZone = () => {
    const [deleteAreaActive, setDeleteAreaActive] = useState(false);
    const {activeCard, handleDelete} = useContext(CardContext);

  return (
    <div className={`fixed bg-white bottom-40 right-40 size-20 ${deleteAreaActive ? "scale-[250%]" : "scale-100"} text-center flex justify-center items-center rounded-full text-gray-400 transition-all duration-150`}
        onDragOver={(e) => {
            e.preventDefault();
            setDeleteAreaActive(true)}
        }
        onDragLeave={() => setDeleteAreaActive(false)}
        onDrop={() => {
            if(activeCard !== null){
                handleDelete(activeCard);
                setDeleteAreaActive(false)
            }
        }}
    >
        <div className={`absolute w-full h-full border-2 border-dashed ${deleteAreaActive ? "border-red-500 bg-red-500/10 text-red-500 spin" : "border-gray-400/50 bg-transparent"} rounded-full z-40 transition-all duration-150`}></div>
        <i className={`bi bi-trash z-50 ${deleteAreaActive ? "text-red-500 text-3xl animate-bounce" : "text-gray-400/50 text-xl"} transition-all duration-150`}></i>
    </div>
  )
}

export default DeleteZone