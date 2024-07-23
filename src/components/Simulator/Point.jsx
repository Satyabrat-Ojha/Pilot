import React from "react";

const Point = ({ x, y, select, setSelect, status }) => {
  // x and y are in the range of [0, 1000m]
  const X = x * 0.3;
  const Y = y * -0.3;

  return (
    <>
      <div
        className={`${
          select ? "opacity-100" : "hover:opacity-30"
        } absolute w-[10px] h-[10px] z-20 opacity-0 rounded-full flex justify-center items-center bg-black`}
        style={{ transform: `translate(${X}px, ${Y}px)` }}
        onClick={() => status === "idle" && setSelect(!select)}
      />
    </>
  );
};

export default Point;
