import React from "react";
import HumansView from "./humans-view";
import "./game.css";
import { VictoryPie } from "victory";

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
            className="visualization"
            colorScale="heatmap"
            height={200}
            innerRadius={100}
            data={[
              {
                x: `Oxygen: ${myStarship.getAtmosphereComponentAsPercentage(
                  myStarship.air.OXYGEN
                )}%`,
                y: myStarship.getAtmosphereComponentAsPercentage(
                  myStarship.air.OXYGEN
                ),
              },
              {
                x: `CO2: ${myStarship.getAtmosphereComponentAsPercentage(
                  myStarship.air.CARBON_DIOXIDE
                )}%`,
                y: myStarship.getAtmosphereComponentAsPercentage(
                  myStarship.air.CARBON_DIOXIDE
                ),
              },
              {
                x: `Nitrogen: ${myStarship.getAtmosphereComponentAsPercentage(
                  myStarship.air.NITROGEN
                )}%`,
                y: myStarship.getAtmosphereComponentAsPercentage(
                  myStarship.air.NITROGEN
                ),
              },
              {
                x: `Water Vapor: ${myStarship.getAtmosphereComponentAsPercentage(
                  myStarship.air.WATER_VAPOR
                )}%`,
                y: myStarship.getAtmosphereComponentAsPercentage(
                  myStarship.air.WATER_VAPOR
                ),
              },
            ]}
          />
        </div>
        <HumansView starship={myStarship} />
      </div>
    </div>
  );
}
