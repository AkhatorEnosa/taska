import { useState } from "react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { CardContext } from "../context/CardContext";

interface CardProps {
  title: string;
  desc: string;
  index: number;
  // setActiveCard: React.Dispatch<React.SetStateAction<number | null>>;
  status: string;
}

const Card = ({ title, index, status, desc }: CardProps) => {
    const [dragging, setDragging] = useState(false);
    
    const {setActiveCard} = useContext(CardContext);

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
        whileTap={{ scale: 1.05, rotate: 2 }}
        transition={{ duration: 0.3 }}
        className={`flex flex-col bg-white gap-6 p-3 rounded-md border-[1px] ${getBorderColor()} cursor-grabbing group`} draggable
    
        onDragStart={() => { setActiveCard(index); setDragging(true); }}
        onDragEnd={() => {setActiveCard(null); setDragging(false);}}
    >
        <div className="flex w-full justify-between items-center gap-10">
            <div className="flex flex-col gap-2">
                <h2 className="text-sm font-semibold leading-4">{title}</h2>
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