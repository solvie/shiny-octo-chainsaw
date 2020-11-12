import React from "react";
import HumansView from "./humans-view";

export default function Game(myStarship) {
  return (
    <div>
      <span> Starship state is grounded </span>
      <button onClick={() => myStarship.start()}> Start time </button>
      <button onClick={() => myStarship.stop()}> Stop time </button>
      <span> The timer says it is now: {myStarship.timer.secondsPassed} </span>
      <span> Oxygen: {myStarship.air.OXYGEN} </span>
      <span> CO2: {myStarship.air.CARBON_DIOXIDE} </span>
      <span> Number of pods available: {myStarship.pods} </span>
      <HumansView starship={myStarship} />
    </div>
  );
}
