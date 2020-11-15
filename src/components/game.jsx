import React from "react";
import HumansView from "./humans-view";
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
        <div className="atmospherePanel">
          Atmosphere composition:
          <span>
            {" "}
            Oxygen:{" "}
            {myStarship.getAtmosphereComponentAsPercentage(
              myStarship.air.OXYGEN
            )}
            %{" "}
          </span>
          <span>
            {" "}
            CO2:{" "}
            {myStarship.getAtmosphereComponentAsPercentage(
              myStarship.air.CARBON_DIOXIDE
            )}
            %{" "}
          </span>
        </div>
        <HumansView starship={myStarship} />
      </div>
    </div>
  );
}
