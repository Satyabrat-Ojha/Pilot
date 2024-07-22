import React from "react";

const Axes = () => {
  const horizontalMarks = Array.from(
    { length: 19 },
    (_, i) => `${(i + 1) * 5}%`
  ).filter((val) => val !== "50%");
  const verticalMarks = Array.from(
    { length: 19 },
    (_, i) => `${(i + 1) * 5}%`
  ).filter((val) => val !== "50%");

  return (
    <>
      <div className="absolute w-full h-[1px] bg-white top-[calc(50%-0.5px)] z-10">
        {horizontalMarks.map((left) => (
          <div
            key={left}
            className="absolute h-[6px] w-[2px] bg-white"
            style={{ left: `calc(${left} - 1px)`, top: "-2.5px" }}
          />
        ))}
      </div>
      <div className="absolute h-full w-[1px] bg-white left-[calc(50%-0.5px)] z-10">
        {verticalMarks.map((top) => (
          <div
            key={top}
            className="absolute h-[2px] w-[6px] bg-white"
            style={{ top: `calc(${top} - 1px)`, left: "-2.5px" }}
          />
        ))}
      </div>
    </>
  );
};

const HorizontalAxis = ({ y }) => {
  const Y = ((1 - y) * 50).toFixed(1);

  return (
    <div
      className={`absolute w-full h-[1px] bg-[rgb(150,150,150)]`}
      style={{ top: `calc(${Y}% - 0.5px)` }}
    ></div>
  );
};

const VerticalAxis = ({ x }) => {
  const X = (x * 50).toFixed(1);

  return (
    <div
      className={`absolute h-full w-[1px] bg-[rgb(150,150,150)]`}
      style={{ left: `calc(${X}% - 0.5px)` }}
    ></div>
  );
};

export { Axes, HorizontalAxis, VerticalAxis };
