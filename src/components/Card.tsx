import { useState } from "react";
import { motion } from "framer-motion";

interface CardProps {
  title: string;
  handleDelete?: (id: number) => void;
  index: number;
  setActiveCard: React.Dispatch<React.SetStateAction<number | null>>;
  status: string;
}

const Card = ({ title, setActiveCard, index, status }: CardProps) => {
    const [dragging, setDragging] = useState(false);

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
        // layoutId={"card"}
        className={`flex flex-col bg-white gap-6 p-3 rounded-md border-[1px] ${getBorderColor()} cursor-grabbing`} draggable
    
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