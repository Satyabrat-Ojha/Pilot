import React, { useState } from "react";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { IoRocketSharp } from "react-icons/io5";
import ResponsiveMenu from "./ResponsiveMenu";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <>
      <nav className="bg-gray-500 text-white py-3 z-50 relative">
        <div className="container flex justify-center items-center">
          <h1 className="text-3xl font-semibold flex justify-center items-center gap-2">
            <IoRocketSharp />
            Pilot
          </h1>
          <p className="absolute text-gray-300 right-[10%] bottom-0 p-1 hover:text-yellow-500 cursor-pointer">
            Algorithm
          </p>
          <p className="absolute text-gray-300 left-[10%] bottom-0 p-1 hover:text-yellow-500 cursor-pointer">
            mTSP Problem
          </p>

          {/* Hamburger Menu */}
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              <HiMiniSquares2X2 className="text-2xl" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <ResponsiveMenu showMenu={showMenu} />
    </>
  );
};

export default Navbar;
