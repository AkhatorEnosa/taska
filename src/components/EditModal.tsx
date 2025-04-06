import React from 'react';
import { useContext } from "react";
import { CardContext } from "../context/CardContext";

interface EditModalProps {
  index: number;
  showModal: boolean;
  handleCloseModal: () => void;
  updateTask: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ showModal, handleCloseModal, updateTask }) => {

    const { error, taskTitle, description, taskStatus, setTaskStatus, setTaskTitle, setDescription} = useContext(CardContext)

  return (
    <dialog className={`fixed flex top-0 left-0 w-screen h-screen bg-transparent justify-center items-center z-[60] ${showModal ? "scale-100 opacity-100" : "scale-0 opacity-0"} transition-all duration-150 ease-in-out overflow-clip`}>
        <div className="absolute w-full h-full bg-white/90 z-40" onClick={handleCloseModal}></div>

        <div className={`w-[70%] md:w-[50%] lg:w-[30%] flex flex-col gap-5 p-4 bg-white rounded-md shadow-lg border-[1px] border-gray-200 z-50`}>
            <div className="bg-white rounded-md">
                <h2 className="text-lg font-semibold">Add Task</h2>
            </div>

            {error !== "" && <div className='w-full flex justify-center items-center px-2 py-3 bg-red-100 border-[1px] border-red-500 text-red-500 text-sm font-semibold rounded-md'>
                <i className="bi bi-exclamation-triangle-fill"></i>
                <span className="ml-2">Please fill in all fields</span>
            </div>}

            <div className="flex flex-col gap-2 text-xs">
                <label className="font-semibold" htmlFor="taskName">Title</label>
                <input 
                    className="border border-gray-300 rounded-md p-2" 
                    type="text" 
                    name="taskName" 
                    defaultValue={taskTitle}
                    onChange={(e) =>{ setTaskTitle(e.target.value);
                        console.log(taskTitle)}}
                />
                <label className="font-semibold" htmlFor="taskDescription">Description</label>
                <textarea 
                    className="border border-gray-300 rounded-md p-2" 
                    id="taskDescription"
                    name="taskDescription" 
                    maxLength={100} 
                    rows={3}
                    onChange={(e) => setDescription(e.target.value)}
                    defaultValue={description}
                ></textarea>
                <label className="font-semibold" htmlFor="status">Status</label>
                <select className="border border-gray-300 rounded-md p-2" name="status" id="status" 
                  defaultValue={taskStatus} 
                  onChange={(e) => setTaskStatus(e.target.value)}>
                    <option value="todo">To do</option>
                    <option value="doing">In Progress</option>
                    <option value="review">Review</option>
                    <option value="done">Done</option>
                </select>
                <button className="bg-blue-400 hover:bg-blue-500 text-white text-sm py-2 px-2 rounded-md cursor-pointer transition-all duration-150" type="submit" onClick={() => { updateTask(); handleCloseModal(); }}>Add</button>
            </div>
        </div>
    </dialog>
  )
}

export default EditModal