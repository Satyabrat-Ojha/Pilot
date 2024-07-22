import React from "react";
import Navbar from "./components/Navbar/Navbar";
// import Hero from "./components/Hero/Hero";
import Simulator from "./components/Simulator/Simulator";

const App = () => {
  return (
    <>
      <div>
        <Navbar />
        {/* <Hero /> */}
        <Simulator />
      </div>
    </>
  );
};

export default App;
