interface SidebarListItemProps {
  miniSidebar: boolean;
  title: string;
  icon: string;
}

const SidebarListItem = ({miniSidebar, title, icon}: SidebarListItemProps) => {
  return (
    <p className="w-full flex gap-2 px-5 py-5 hover:bg-gray-100 bg-white transition-all duration-150 cursor-pointer"><i className={`bi ${icon}`}></i><span className={`${miniSidebar ? "w-0 opacity-0":"opacity-100 w-fit"} transition-all duration-200`}>{title}</span></p>
  )
}

export default SidebarListItem