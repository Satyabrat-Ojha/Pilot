import { useState } from "react";
import axios from "axios";
import Plane from "./Plane";
import List from "./List";
import { MdDeleteOutline } from "react-icons/md";
import { RxTriangleRight } from "react-icons/rx";
import { FaStopCircle } from "react-icons/fa";
import { Oval } from "react-loader-spinner";

const coordinate = (x, y) => {
  const [select, setSelect] = useState(0);
  return { x, y, select, setSelect };
};

const Simulator = () => {
  // idle - taking inputs, loading - fetching trajectories, ready - ready to simulate, running - simulation in progress
  const [status, setStatus] = useState("idle");
  const [duration, setDuration] = useState(20);
  const [finalDuration, setFinalDuration] = useState(20);
  const [speed, setSpeed] = useState(6);
  const [finalSpeed, setFinalSpeed] = useState(6);
  const [trajectories, setTrajectories] = useState([]);

  const coordinates = [];
  for (let x = -1000; x <= 1000; x += 50) {
    for (let y = -1000; y <= 1000; y += 50) {
      if (x * x + y * y >= 1000 * 1000 || (x === 0 && y === 0)) continue;
      coordinates.push(coordinate(x, y));
    }
  }

  const sampleTrajectories = [
    [
      [100, 100],
      [-100, 100],
      [-100, -100],
      [100, -100],
      [0, 0],
    ],
    [
      [100, 100],
      [-300, 100],
      [-100, -300],
      [100, -100],
      [0, 0],
    ],
  ];

  const simulate = async () => {
    clearSimulation();
    setFinalDuration(duration);
    setFinalSpeed(speed);
    setStatus("loading");

    const listOfCoordinates = [];
    coordinates.forEach(({ x, y, select }) => {
      if (select) listOfCoordinates.push([x, y]);
    });

    // API call to fetch trajectories
    try {
      const response = await fetch("https://tour-finder.onrender.com/solve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coordinates: listOfCoordinates,
          time: finalDurationduration * 60,
          speed: (finalSpeed * 5) / 18,
        }),
      });

      const data = await response.json();
      const { new_coordinates } = data;
      const newTrajectories = [];
      newTrajectories.push(new_coordinates);
      console.log("SIMULATE_SUCCESS", newTrajectories);
      setTrajectories(newTrajectories);
      setStatus("ready");
    } catch (error) {
      console.log("SIMULATE_ERROR", error);
      setStatus("idle");
    }
  };

  const clearSimulation = () => {
    setTrajectories([]);
    setStatus("idle");
  };

  const run = () => {
    setStatus("running");
  };

  const stop = () => {
    setStatus("ready");
  };

  return (
    <div className="h-full w-full p-5 flex justify-center space-x-10">
      <Plane
        coordinates={coordinates}
        trajectories={trajectories}
        speed={finalSpeed}
        status={status}
      />
      <List coordinates={coordinates} status={status} />
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
            {...(status !== "idle" && { disabled: true })}
          />
        </div>
        <div className="border flex">
          <div className="bg-gray-200 py-3 w-[130px] text-center">
            Speed {"(kmph)"}
          </div>
          <input
            type="number"
            className="w-[80px] text-center bg-gray-50 outline-none"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            {...(status !== "idle" && { disabled: true })}
          />
        </div>

        {status === "idle" && (
          <button
            className="h-[40px] bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            onClick={simulate}
          >
            Simulate
          </button>
        )}

        {status === "loading" && (
          <div className="h-[40px] bg-blue-600 text-white rounded-md flex items-center justify-center">
            <Oval
              visible={true}
              height="25"
              width="25"
              color="#fff"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}

        {status !== "idle" && status !== "loading" && (
          <div className="h-[40px] rounded-md flex items-center justify-center overflow-hidden">
            {status === "ready" && (
              <button
                className="flex-[3] bg-slate-300 h-full flex justify-center items-center text-green-600 hover:text-green-500"
                onClick={run}
              >
                <RxTriangleRight className="text-3xl" />
                <span className="font-semibold relative bottom-[0.5px]">
                  Run
                </span>
              </button>
            )}
            {status === "running" && (
              <button
                className="flex-[3] bg-slate-300 h-full flex justify-center items-center text-red-700 hover:text-red-600 space-x-2"
                onClick={stop}
              >
                <FaStopCircle className="text-lg" />
                <span className="font-semibold relative bottom-[0.5px]">
                  Stop
                </span>
              </button>
            )}
            <button
              className="flex-[1] bg-slate-400 bg-slate h-full flex justify-center items-center text-xl text-red-700 hover:text-red-600"
              onClick={clearSimulation}
            >
              <MdDeleteOutline />
            </button>
          </div>
        )}

        <div className="pt-5">
          <div className="border flex flex-col">
            <div className="bg-gray-200 py-3 text-center">Number of drones</div>
            <div className="text-center bg-gray-50 text-lg py-1">
              {trajectories.length ? trajectories.length : "-"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
