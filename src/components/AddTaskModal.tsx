interface ModalProps {
    showModal: boolean;
    handleCloseModal: () => void;
    addTask: () => void;
    taskTitle: string;
    description: string;
    handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleDescriptionChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const AddTaskModal = ({showModal, handleCloseModal, addTask, taskTitle, description, handleTitleChange, handleDescriptionChange} : ModalProps) => {
  return (
    <dialog className={`fixed flex top-0 left-0 w-screen h-screen bg-transparent justify-center items-center z-[60] ${showModal ? "scale-100 opacity-100" : "scale-0 opacity-0"} transition-all duration-150 ease-in-out overflow-clip`}>
        <div className="absolute w-full h-full bg-white/90 z-40" onClick={handleCloseModal}></div>

        <div className={`w-[30%] flex flex-col gap-5 p-4 bg-white rounded-md shadow-lg border-[1px] border-gray-200 z-50`}>
            <div className="bg-white rounded-md">
                <h2 className="text-lg font-semibold">Add Task</h2>
            </div>

            <div className="flex flex-col gap-2 text-xs">
                <label className="font-semibold" htmlFor="taskName">Title</label>
                <input 
                    className="border border-gray-300 rounded-md p-2" 
                    type="text" 
                    name="taskName" 
                    value={taskTitle}
                    onChange={handleTitleChange}
                />
                <label className="font-semibold" htmlFor="taskDescription">Description</label>
                <textarea 
                    className="border border-gray-300 rounded-md p-2" 
                    id="taskDescription"
                    name="taskDescription" 
                    maxLength={100} 
                    rows={3}
                    onChange={handleDescriptionChange}
                    value={description}
                ></textarea>
                <button className="bg-blue-400 hover:bg-blue-500 text-white text-sm py-2 px-2 rounded-md cursor-pointer transition-all duration-150" type="submit" onClick={() => { addTask(); handleCloseModal(); }}>Add</button>
            </div>
        </div>
    </dialog>
  )
}

export default AddTaskModal