import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { CardContext } from "../context/CardContext";
import EditModal from "./EditModal";

interface CardProps {
  title: string;
  desc: string;
  index: number;
  status: string;
}

const Card = ({ title, index, status, desc }: CardProps) => {
    const [dragging, setDragging] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    
    const {  
      taskTitle, 
      description, 
      taskStatus, 
      showEditModal,
      setTaskStatus, 
      setTaskTitle, 
      setDescription, 
      setActiveCard, 
      setShowEditModal,
      getTask, 
      handleEditTask, 
      handleDelete
    } = useContext(CardContext);

    useEffect(() => {
      setTaskTitle(taskTitle);
      setDescription(description);
      setTaskStatus(taskStatus);
    }, [taskTitle, description, taskStatus]);

    // Define color based on status
    const getBorderColor = () => {
      if (!dragging) return "border-gray-300/70";
      switch (status) {
        case 'done': return "border-green-200";
        case 'doing': return "border-amber-200";
        case 'review': return "border-purple-200";
        case 'todo': return "border-blue-200";
        default: return "border-gray-300/70";
      }
    };
  return (
    <motion.div
        layout
        transition={{ duration: 0.3 }}
        className={`flex flex-col bg-white gap-6 p-2 rounded-md border-[1px] ${getBorderColor()} cursor-auto group shadow-sm hover:shadow-none`} 
        
        draggable={showEditModal ? false : true}
    
        onDragStart={() => { setActiveCard(index); setDragging(true); }}
        onDragEnd={() => {setActiveCard(null); setDragging(false);}}
    >
        <div className="flex w-full justify-between items-center gap-10">
            <div className="w-full flex flex-col gap-2">
              <div className="relative flex items-start justify-between gap-2">
                <h2 className="text-sm font-semibold leading-4">{title}</h2>
                <i className="bi bi-three-dots-vertical text-gray-400 hover:text-black size-5 p-2 active:bg-gray-200 rounded-full flex justify-center items-center cursor-pointer" onClick={() => setShowOptions(true)}></i>
                
                  {showOptions && (
                    <>
                      <div className="w-screen h-screen fixed top-0 left-0 z-30" onClick={() => setShowOptions(false)}></div>
                      <div className="absolute w-[100px] top-5 right-0 bg-white shadow-lg rounded-md text-xs z-50">
                        <p className="text-black hover:bg-gray-200 p-2 cursor-pointer" onClick={() => {
                            getTask(index);
                            setShowEditModal(true);
                           setShowOptions(false)}
                          }>Edit</p>
                        <p className="text-red-500 hover:bg-gray-200 p-2 cursor-pointer" onClick={() => handleDelete(index)}>Delete</p>
                      </div>
                    </>
                  )}

                  {showEditModal && (
                    <>
                      <EditModal
                        // status={status}
                        // index={index}
                        showModal={showEditModal}
                        // handleCloseModal={() => setShowEditModal(false)}
                        updateTask={(taskTitle, description, taskStatus) => handleEditTask(taskTitle, description, taskStatus)}
                      />
                    </>
                  )}
              </div>
                <p className="text-gray-400 line-clamp-1 group-hover:line-clamp-none text-xs">{desc}</p>
            </div>
            {/* <p>Creator Image</p> */}
        </div>
        {/* <div className="w-full">
            <p className="w-fit p-2 rounded-md text-white font-semibold text-sm bg-gray-400/50"><i className="bi bi-clock"></i> time</p>
        </div> */}
    </motion.div>
  )
}

export default Card