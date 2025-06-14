import { useState } from "react";
import { motion } from "framer-motion";
import SidebarListItem from "../components/SidebarListItem";

const Sidebar = () => {
  const [miniSidebar, setMiniSidebar] = useState(false);
  
  return (
    <motion.section
      // initial={{ width: "auto" }}
      // animate={{ width: miniSidebar ? "20%" : "fit-content" }}
      // transition={{ duration: 0.3 }}
      // onMouseEnter={() => setMiniSidebar(true)}
      // onMouseLeave={() => setMiniSidebar(false)}
      className={`relative flex flex-col h-full justify-between py-10 bg-white text-black top-20 shadow-lg z-50`}>
      <div className={`flex flex-col divide-y-[1px] divide-gray-200 border-t-[1px] border-b-[1px] border-gray-200`}>
        <SidebarListItem 
          title="Dashboard"
          icon="bi-house"
          miniSidebar={miniSidebar}
        />
        <SidebarListItem 
          title="Projects"
          icon="bi-database"
          miniSidebar={miniSidebar}
        />
        <SidebarListItem 
          title="Resources"
          icon="bi-folder"
          miniSidebar={miniSidebar}
        />
      </div>
      <div className={`relative flex justify-end w-full h-fit px-5 text-xl`} onClick={() => setMiniSidebar(!miniSidebar)}>
        <i className={`absolute bottom-20 -right-5 flex text-gray-500 bi bi-chevron-right ${miniSidebar ? "rotate-180" : "rotate-0"} justify-center items-center size-8 rounded-full bg-white shadow transition-all duration-300 cursor-pointer`}></i>
      </div>
    </motion.section>
  )
}

export default Sidebar