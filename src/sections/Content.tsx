// import { useEffect, useState } from "react";
import Column from "../components/Column.tsx";
// import DEFAULT_CARDS from "../constants/tasks.ts";
import Navbar from "../nav/Navbar.tsx";
import DeleteZone from "../components/DeleteZone.tsx";
import Sidebar from "../nav/Sidebar.tsx";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";


const Content: React.FC = () => {
  const scrollContainerRef = useRef<HTMLButtonElement>(null);
  const [showButton, setShowButton] = useState(false);

  const handleScrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current;
  
    const handleScroll = () => {
      // console.log(container?.scrollTop);
      if (container && container.scrollTop > 50) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
  
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
  
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex w-full h-full overflow-clip">
        <Sidebar />
        <div className="relative w-full h-full flex flex-col gap-10 py-20 mt-20 pt-10 px-5 overflow-scroll">
          <h3 className="bg-white p-3 rounded-md text-gray-500">
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Welcome, User
            </motion.span>
          </h3>
          <section
            ref={scrollContainerRef}
            className="group flex lg:grid grid-cols-4 gap-3 h-full w-full overflow-scroll pb-10 justify-start lg;pr-0">
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

          {showButton && (
            <div className="fixed flex items-center justify-center w-full bottom-0 z-50">
              <button
                onClick={()=> handleScrollToTop()}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-t-full shadow-lg transition-all duration-200"
                title="Back to top"
                aria-label="Back to top"
              >
                <i className="bi bi-arrow-up"></i>
              </button>
            </div>
          )}

            <DeleteZone />
          </section>
        </div>
      </div>
    </>
  );
};

export default Content;