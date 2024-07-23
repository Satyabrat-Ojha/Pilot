import React from "react";
import { Axes, HorizontalAxis, VerticalAxis } from "./Axes";
import Point from "./Point";
import Drone from "./Drone";

const Plane = ({ coordinates, trajectories, speed, status }) => {
  return (
    <div className="h-[600px] w-[600px] rounded-[50%] bg-[rgb(130,130,130)] relative overflow-hidden flex justify-center items-center">
      <Axes />
      {/* 20 HorizontalAxis components */}
      {Array(40)
        .fill()
        .map((_, i) => (
          <HorizontalAxis key={i} y={1 - i / 20} />
        ))}
      {/* 20 VerticalAxis components */}
      {Array(40)
        .fill()
        .map((_, i) => (
          <VerticalAxis key={i} x={i / 20} />
        ))}

      {/* Point components : x, y in metres */}
      {coordinates.map(
        ({ x, y, select, setSelect }, index) =>
          x * x + y * y < 1000 * 1000 && (
            <Point
              key={index}
              x={x}
              y={y}
              select={select}
              setSelect={setSelect}
              status={status}
            />
          )
      )}
      {/* Trajectory components */}
      <div className="relative h-[20px] w-[20px]">
        {trajectories.map((trajectory, index) => (
          <Drone
            trajectory={trajectory}
            key={index}
            speed={speed}
            status={status}
          />
        ))}
      </div>
    </div>
  );
};

export default Plane;
