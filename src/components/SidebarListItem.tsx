interface SidebarListItemProps {
  miniSidebar: boolean;
  title: string;
  icon: string;
}

const SidebarListItem = ({miniSidebar, title, icon}: SidebarListItemProps) => {
  return (
    <p className="w-full flex items-center gap-2 px-5 py-4 hover:bg-gray-100 text-gray-500 hover:text-black/90 bg-white transition-all duration-150 cursor-pointer"><i className={`bi ${icon} text-xl`}></i><span className={`${!miniSidebar ? "w-0 opacity-0":"opacity-100 w-fit"} transition-all duration-300`}>{title}</span></p>
  )
}

export default SidebarListItem