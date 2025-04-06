// import { useEffect, useState } from "react";
import Column from "../components/Column.tsx";
// import DEFAULT_CARDS from "../constants/tasks.ts";
import Navbar from "../nav/Navbar.tsx";
import DeleteZone from "../components/DeleteZone.tsx";
import Sidebar from "../nav/Sidebar.tsx";
import { motion } from "framer-motion";


const Content: React.FC = () => {

  return (
    <>
      <Navbar />
      <div className="flex w-full h-full overflow-scroll">
        <Sidebar />
        <div className="w-full h-full flex flex-col gap-10 py-20 mt-20 pt-10 px-10  overflow-scroll">
          <h3 className="bg-white p-3 rounded-md text-gray-500">
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Welcome, User
            </motion.span>
          </h3>
          <section className="flex gap-3 h-full w-full overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <Column 
              title="To do"
              status="todo"
              includeButton={true}
            />
            <Column
              title="In Progress"
              status="doing"
            />
            <Column
              title="Review"
              status="review"
            />
            <Column
              title="Done"
              status="done"
            />

            <DeleteZone />
          </section>
        </div>
      </div>
    </>
  );
};

export default Content;