import React from "react";
import HumansView from "./humans-view";

export default function Game(myStarship) {
  return (
    <div>
      <span> I am a starship </span>
      <button onClick={() => myStarship.start()}> Start time </button>
      <button onClick={() => myStarship.stop()}> Stop time </button>
      <span> the timer says it is now: {myStarship.timer.secondsPassed} </span>
      <HumansView starship={myStarship} />
    </div>
  );
}
