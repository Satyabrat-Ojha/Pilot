import React from "react";
import colour from "./colour";

const Point = ({ x, y, select, setSelect, status }) => {
  // x and y are in the range of [0, 1000m]
  const X = x * 0.3;
  const Y = y * -0.3;

  const handleColour = () => {
    if (status === "running" && select > 0) {
      return colour(select);
    }
    return "black";
  };

  return (
    <>
      <div
        className={`${
          select != 0 ? "opacity-100" : "hover:opacity-30"
        } absolute w-[10px] h-[10px] z-20 opacity-0 rounded-full flex justify-center items-center`}
        style={{
          transform: `translate(${X}px, ${Y}px)`,
          backgroundColor: handleColour(),
        }}
        onClick={() => status === "idle" && setSelect(select == 0 ? -1 : 0)}
      />
    </>
  );
};

export default Point;
