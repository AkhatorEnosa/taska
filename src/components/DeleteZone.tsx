import { useState } from "react";

interface DeleteZoneProps {
    handleDelete: () => void;
}

const DeleteZone = ({ handleDelete }: DeleteZoneProps) => {
    const [deleteAreaActive, setDeleteAreaActive] = useState(false);
  return (
    <div className={`absolute bg-white bottom-40 left-40 size-20 text-center flex justify-center items-center rounded-full text-gray-400 transition-all duration-150`}
        onDragOver={(e) => {
            e.preventDefault();
            setDeleteAreaActive(true)}
        }
        onDragLeave={() => setDeleteAreaActive(false)}
        onDrop={() => {
            handleDelete()
            setDeleteAreaActive(false)
        }}
    >
        <div className={`absolute w-full h-full border-2 border-dashed ${deleteAreaActive ? "border-red-500 bg-red-500/10 text-red-500 spin" : "border-gray-400/50 bg-transparent"} rounded-full z-40 transition-all duration-150`}></div>
        <i className={`bi bi-trash z-50 ${deleteAreaActive ? "text-red-500 text-3xl" : "text-gray-400/50 text-xl"} transition-all duration-150`}></i>
    </div>
  )
}

export default DeleteZone