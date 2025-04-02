// import { useEffect, useState } from "react";
import Column from "../components/Column.tsx";
// import DEFAULT_CARDS from "../constants/tasks.ts";
import Navbar from "../nav/Navbar.tsx";
import DeleteZone from "../components/DeleteZone.tsx";
import Sidebar from "../nav/Sidebar.tsx";


const Content: React.FC = () => {

  return (
    <>
      <Navbar />
      <div className="flex w-full h-full overflow-scroll">
        <Sidebar />
        <section className="flex mt-20 pt-10 px-10 gap-3 overflow-scroll">
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
    </>
  );
};

export default Content;