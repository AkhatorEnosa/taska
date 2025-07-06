import React from "react";
import Card from "./Card";
import DropArea from "./DropArea";
import Button from "./Button";
import { useContext } from "react";
import { CardContext } from "../context/CardContext";
import { motion } from "framer-motion"; 

interface ColumnProps {
  title: string;
  status: string;
  includeButton?: boolean;
}

const Column: React.FC<ColumnProps> = ({ title, status, includeButton }) => {

  const {onDrop, tasks} = useContext(CardContext);

    const filteredTasks = tasks?.filter((task) => task.status === status);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      layout
      className={`w-72 h-fit flex flex-col gap-5 rounded-[14px] shadow border-t-4 bg-white ${status == 'done' ? "border-t-green-200" : status == 'doing' ? "border-t-amber-200" : status == 'review' ? "border-t-purple-200" : "border-t-blue-200"} border-[1px] border-gray-300/20 p-2 shrink-0`}>
        <header className="flex justify-between items-center">
            <p className="font-semibold">{title} <span className="font-normal text-gray-400">{`(${filteredTasks.length})`}</span></p>
            {includeButton 
              && 
              <Button 
                status={status}
              />
            }
        </header>

        <div className="relative flex flex-col">
            <DropArea onDrop={() => onDrop(status, 0)} status={status}/>
            {filteredTasks.length < 1 ? <h2 className="w-full text-center text-xs p-3 font-bold text-gray-500 bg-black/5 rounded-md">No task in field</h2> : filteredTasks.sort((a,b) => a.id - b.id).map(
                (task, index) =>
                  task.status === status && (
                        <React.Fragment key={index}>
                            <Card
                                title={task.title}
                                desc={task.description}
                                index={index}
                                status={status}
                            />
                            <DropArea onDrop={() => onDrop(status, index + 1)} status={status}/>
                        </React.Fragment>
                    )
            )}
        </div>
    </motion.div>
  )
}

export default Column;

