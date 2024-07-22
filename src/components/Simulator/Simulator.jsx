import { useState } from "react";
import Plane from "./Plane";
import List from "./List";

const coordinate = (x, y) => {
  const [select, setSelect] = useState(false);
  return { x, y, select, setSelect };
};

const Simulator = () => {
  const coordinates = [];
  for (let x = -1000; x <= 1000; x += 50) {
    for (let y = -1000; y <= 1000; y += 50) {
      if (x * x + y * y >= 1000 * 1000 || (x === 0 && y === 0)) continue;
      coordinates.push(coordinate(x, y));
    }
  }

  const [duration, setDuration] = useState(20);
  const [speed, setSpeed] = useState(10);

  const simulate = () => {
    console.log("Simulation started");
  };

  return (
    <div className="h-full w-full p-5 flex justify-center space-x-10">
      <Plane coordinates={coordinates} />
      <List coordinates={coordinates} />
      <div className="flex flex-col space-y-5">
        <div className="border flex">
          <div className="bg-gray-200 py-3 w-[130px] text-center">
            Duration {"(min)"}
          </div>
          <input
            type="number"
            className="w-[80px] text-center bg-gray-50 outline-none"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div className="border flex">
          <div className="bg-gray-200 py-3 w-[130px] text-center">
            Speed {"(m/s)"}
          </div>
          <input
            type="number"
            className="w-[80px] text-center bg-gray-50 outline-none"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white px-5 py-2 rounded-md"
          onClick={simulate}
        >
          Simulate
        </button>
      </div>
    </div>
  );
};

export default Simulator;
