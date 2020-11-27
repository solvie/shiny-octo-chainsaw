import React from "react";
import HumansView from "./humans-view";
import PlantsView from "./plants-view";
import AtmospherePanel from "./atmosphere-panel";
import "./game.css";

export default function Game(myStarship) {
  return (
    <div className="gamePanel">
      <div>
        Time
        <span> : {myStarship.timer.secondsPassed} </span>
        <button onClick={() => myStarship.start()}> Start </button>
        <button onClick={() => myStarship.stop()}> Stop </button>
      </div>
      <div>
        <span> Starship state: grounded </span>
        <AtmospherePanel starship={myStarship} />
        <HumansView starship={myStarship} />
        <PlantsView starship={myStarship} />
      </div>
    </div>
  );
}
