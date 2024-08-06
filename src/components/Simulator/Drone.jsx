import React, { useState, useEffect, useRef } from "react";
import { PiDroneDuotone } from "react-icons/pi";
import colour from "./colour";

const Drone = ({ trajectory, speed, status, index }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);
  const timeouts = useRef([]);

  const points = trajectory.map((point) => {
    return {
      x: point[0] * 0.3,
      y: point[1] * -0.3,
    };
  });

  const prev = [0, 0];
  let total = 0;

  const transitions = points.map((point) => {
    const dx = point.x - prev[0];
    const dy = point.y - prev[1];
    const distance = Math.sqrt(dx * dx + dy * dy);
    const time = calcTime(speed, distance);
    total += time;
    prev[0] = point.x;
    prev[1] = point.y;

    return {
      x: point.x,
      y: point.y,
      time,
      startTime: total - time,
    };
  });

  useEffect(() => {
    if (status === "running") {
      run();
    } else {
      stop();
    }
  }, [status]);

  const run = () => {
    setTime(0);
    setPosition({ x: 0, y: 0 });

    transitions.forEach((transition) => {
      const timeout = setTimeout(() => {
        setTime(transition.time);
        setPosition({ x: transition.x, y: transition.y });
      }, transition.startTime);
      timeouts.current.push(timeout);
    });
  };

  const stop = () => {
    setTime(0);
    timeouts.current.forEach((timeout) => clearTimeout(timeout));
    timeouts.current = [];
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      className="absolute text-gray-800 z-[999] text-xl"
      style={{
        transition: `left ${time}ms linear, top ${time}ms linear`,
        left: `${position.x}px`,
        top: `${position.y}px`,
        color: colour(index),
      }}
    >
      <PiDroneDuotone />
    </div>
  );
};

const calcTime = (speed, distance) => {
  // speed is in kmph and distance is in meters and time in minutes
  const speedInMpm = (speed * 1000) / 60;
  return (distance / speedInMpm) * 1000;
};

export default Drone;
