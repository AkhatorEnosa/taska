interface CardProps {
  title: string;
  handleDelete?: (index: string) => void;
  index?: number;
}

const Card = ({ title }: CardProps) => {
  return (
    <div className="flex flex-col gap-6 p-3 rounded-md border-[1px] border-gray-300/50 hover:shadow cursor-pointe" draggable>
        <div className="flex w-full justify-between items0=-center gap-10">
            <div>
                <h2 className="font-semibold">{title}</h2>
                {/* <p className="text-gray-400 text-sm">Project</p> */}
            </div>
            {/* <p>Creator Image</p> */}
        </div>
        {/* <div className="w-full">
            <p className="w-fit p-2 rounded-md text-white font-semibold text-sm bg-gray-400/50"><i className="bi bi-clock"></i> time</p>
        </div> */}
    </div>
  )
}

export default Card