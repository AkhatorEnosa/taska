import { useState } from "react";
import { motion } from "framer-motion";
import SidebarListItem from "../components/SidebarListItem";

const Sidebar = () => {
  const [miniSidebar, setMiniSidebar] = useState(false);
  
  return (
    <motion.section
      initial={{ width: "20%" }}
      animate={{ width: !miniSidebar ? "20%" : "fit-content" }}
      transition={{ duration: 0.2 }}
      className={`flex flex-col justify-between py-10 bg-white text-black mt-10 shadow-lg`}>
      <div className="flex flex-col w-full">
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
      <div className="relative flex justify-end w-full h-fit px-5 text-xl" onClick={() => setMiniSidebar(!miniSidebar)}>
        <i className={`absolute bottom-10 -right-5 flex bi ${miniSidebar ? "bi-chevron-right" : "bi bi-chevron-left"} justify-center items-center size-8 rounded-full bg-white shadow transition-all duration-200 cursor-pointer`}></i>
      </div>
    </motion.section>
  )
}

export default Sidebar