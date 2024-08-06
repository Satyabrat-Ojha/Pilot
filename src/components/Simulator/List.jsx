import React from "react";
import { FaRegCircleXmark } from "react-icons/fa6";

const List = ({ coordinates, status }) => {
  return (
    <div className="w-[220px]">
      <div className="flex justify-center items-center p-3 bg-gray-200">
        Selected Points
      </div>
      <div className="h-[500px] overflow-y-auto border-2">
        {coordinates
          .filter(({ select }) => select)
          .map(({ x, y, select, setSelect }, index) => (
            <div
              key={index}
              className="p-2 border-b flex justify-between items-center bg-gray-50"
            >
              <p>{`(${x}, ${y})`}</p>
              <p
                className="text-gray-400 hover:text-gray-500"
                onClick={() =>
                  status === "idle" && setSelect(select === 0 ? -1 : 0)
                }
              >
                <FaRegCircleXmark />
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default List;
