import React from "react";
import { observer } from "mobx-react";
import { VictoryLine, VictoryChart, VictoryTheme } from "victory";
import "./atmosphere-panel.css";

const FORECAST_DAYS = 30;

export default observer(
  class AtmospherePanel extends React.Component {
    zeroGradLineData(y) {
      const data = [];
      for (var day = 0; day < FORECAST_DAYS + 1; day++) {
        data.push({ x: day, y: y });
      }
      return data;
    }

    getForecastDataForGas(inhabitants, air, gas) {
      const data = [];
      const TOTAL_GAS = air[gas];
      const TOTAL_VOLUME_AIR = Object.values(air).reduce((a, b) => a + b, 0);
      var GAS_CHANGE_IN_DAY = 0;
      for (var inhabitant of inhabitants) {
        const numBreathsPerDay =
          (24 * 60 * 60) / inhabitant.getBreathPeriodInSeconds();
        GAS_CHANGE_IN_DAY =
          GAS_CHANGE_IN_DAY +
          inhabitant.getRespirationResult()[gas] * numBreathsPerDay;
      }

      for (var day = 0; day < FORECAST_DAYS + 1; day++) {
        data.push({
          x: day,
          y: ((TOTAL_GAS + day * GAS_CHANGE_IN_DAY) * 100) / TOTAL_VOLUME_AIR,
        });
      }
      return data;
    }

    drawLine(data, color) {
      ƒ;
      return (
        <VictoryLine
          style={{
            data: { stroke: color },
            parent: { border: "1px solid" },
          }}
          data={data}
        />
      );
    }

    drawOxygenForecastLine(inhabitants, air) {
      return this.drawLine(
        this.getForecastDataForGas(inhabitants, air, "OXYGEN"),
        "blue"
      );
    }

    drawOptimalLine(y) {
      return this.drawLine(this.zeroGradLineData(y), "green");
    }

    drawDangerLine(y) {
      return this.drawLine(this.zeroGradLineData(y), "orange");
    }

    drawDeathLine(y) {
      return this.drawLine(this.zeroGradLineData(y), "red");
    }

    render() {
      const starship = this.props.starship;
      return (
        <div className="atmospherePanel">
          Atmosphere composition:
          <div className="graphs">
            <VictoryChart
              theme={VictoryTheme.material}
              domain={{ x: [0, FORECAST_DAYS], y: [0, 25] }}
            >
              {this.drawOxygenForecastLine(starship.inhabitants, starship.air)}
              {this.drawOptimalLine(21)}
              {this.drawDangerLine(16)}
              {this.drawDeathLine(6)}
            </VictoryChart>
          </div>
        </div>
      );
    }
  }
);
