const Navbar = () => {
    return (
      <div className="absolute text-sm w-full flex px-10 py-6 justify-between items-center bg-white gap-6 lg:gap-10">
          <h1 className="font-extrabold tracking-tighter text-2xl">Task<span>Ka</span></h1>
  
          <ul className="header-links gap-6 flex">
              <li className="font-bold underline w-20 text-center">Tasks</li>
              <li className="hover:font-bold hover:underline duration-150 transition-all w-20 text-center cursor-pointer">Projects</li>
              <li className="hover:font-bold hover:underline duration-150 transition-all w-20 text-center cursor-pointer">Resources</li>
          </ul>
  
          <div>
              <p className="p-5 rounded-full border-[1px]"></p>
          </div>
      </div>
    )
  }
  
  export default Navbar