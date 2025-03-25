import { useState } from "react";

interface DropAreaProps {
    onDrop: () => void;
    status: string;
}

const DropArea = ({ onDrop, status }: DropAreaProps) => {
    const [showDropArea, setShowDropArea] = useState(false);
  return (
    <section className={`w-full py-[3px] ${status == 'done' ? "bg-green-200" : status == 'doing' ? "bg-amber-200" : status == 'review' ? "bg-purple-200" : "bg-blue-200"} opacity-0 ${showDropArea ? "opacity-100" : "opacity-0"} transition-all duration-150`}
        onDragEnter={() => setShowDropArea(true)}
        onDragLeave={() => setShowDropArea(false)}
        onDrop={() => {
            onDrop()
            setShowDropArea(false)
        }}
        onDragOver={(e) => e.preventDefault()}
    ></section>
  )
}

export default DropArea