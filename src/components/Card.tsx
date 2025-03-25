import { useState } from "react";
import { motion } from "framer-motion";

interface CardProps {
  title: string;
  handleDelete?: (id: number) => void;
  index: number;
  setActiveCard: React.Dispatch<React.SetStateAction<number | null>>;
}

const Card = ({ title, setActiveCard, index }: CardProps) => {
    const [dragging, setDragging] = useState(false);
  return (
    <motion.div
        layout
        // layoutId={JSON.stringify(index)}
        className={`flex flex-col gap-6 p-3 rounded-md border-[1px] border-gray-300/50 ${dragging ? "opacity-45" : "opacity-100"} hover:shadow cursor-grab`} draggable
    
        onDragStart={() => { setActiveCard(index); setDragging(true); }}
        onDragEnd={() => {setActiveCard(null); setDragging(false);}}
    >
        <div className="flex w-full justify-between items-center gap-10">
            <div>
                <h2 className="text-sm">{title}</h2>
                {/* <p className="text-gray-400 text-sm">Project</p> */}
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