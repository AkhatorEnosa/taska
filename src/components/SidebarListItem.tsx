interface SidebarListItemProps {
  miniSidebar: boolean;
  title: string;
  icon: string;
}

const SidebarListItem = ({miniSidebar, title, icon}: SidebarListItemProps) => {
  return (
    <p className="w-full flex items-center gap-2 px-5 py-4 hover:bg-gray-100 text-gray-500 text-sm font-semibold lg:text-base hover:text-black/90 bg-white hover:text-blue-500 duration-150 cursor-pointer"><i className={`bi ${icon} text-lg lg:text-xl`}></i><span className={`${!miniSidebar ? "text-[0px] pr-0":"text-inherit  pr-20"} duration-300`} title={title}>{title}</span></p>
  )
}

export default SidebarListItem