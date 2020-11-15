import React from "react";
import HumansView from "./humans-view";
import "./game.css";
import { VictoryPie, VictoryLabel } from "victory";

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
        <div className="atmospherePanel">
          Atmosphere composition:
          <VictoryPie
            labelComponent={<VictoryLabel renderInPortal />} //prevents label getting clipped
            className="visualization"
            colorScale="heatmap"
            data={myStarship.getAtmosphereAsPieChart()}
          />
        </div>
        <HumansView starship={myStarship} />
      </div>
    </div>
  );
}
