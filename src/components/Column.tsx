import Card from "./Card";

interface ColumnProps {
  title: string;
  tasks: {
    id: string;
    title: string;
    status: string;
  }[];
  status: string;
  handleDelete: (index: string) => void;
}

const Column: React.FC<ColumnProps> = ({ title, tasks, status, handleDelete }) => {
    const filteredTasks = tasks.filter((task) => task.status === status);
  return (
    <div className={`w-full h-fit flex flex-col gap-5 rounded-sm shadow border-t-4 bg-white ${status == 'done' ? "border-t-green-200" : status == 'doing' ? "border-t-amber-200" : status == 'review' ? "border-t-purple-200" : "border-t-blue-200"} border-[1px] border-gray-300/20 p-5`}>
        <header className="flex justify-between items-center">
            <p className="font-semibold">{title} <span className="font-normal text-gray-400">{`(${filteredTasks.length})`}</span></p>
            {/* <Button /> */}
        </header>

        <div className="flex flex-col gap-3">

            {filteredTasks.map(
                (task, index) =>
                    (
                        <Card
                            key={index}
                            title={task.title}
                            handleDelete={handleDelete}
                            index={index}
                        />
                    )
            )}
        </div>
    </div>
  )
}

export default Column;

