import React from "react";

const ResponsiveMenu = ({ showMenu }) => {
  return (
    <div
      className={`${
        showMenu ? "top-20 opacity-100" : "top-[-100%] opacity-0"
      } h-auto w-full bg-white/40 backdrop-blur-md fixed top-0 z-40`}
    >
      <nav className="my-10 text-2xl font-semibold text-center">
        <ul className="space-y-10">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Algorithm</a>
          </li>
          <li>
            <a href="#">Simulate</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ResponsiveMenu;
