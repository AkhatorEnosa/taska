import { useState } from "react";

interface DropAreaProps {
    onDrop: () => void;
    status: string;
}

const DropArea = ({ onDrop, status }: DropAreaProps) => {
    const [showDropArea, setShowDropArea] = useState(false);
  return (
    <section className={`w-full ${status == 'done' ? "bg-green-200" : status == 'doing' ? "bg-amber-200" : status == 'review' ? "bg-purple-200" : "bg-blue-200"} opacity-0 rounded-md ${showDropArea ? "py-5 animate-pulse opacity-100" : "opacity-0 py-[3px]"} transition-all duration-150`}
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