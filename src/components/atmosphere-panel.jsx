import React from "react";
import { observer } from "mobx-react";
import {
  VictoryLine,
  VictoryLabel,
  VictoryAxis,
  VictoryChart,
  VictoryTheme,
} from "victory";
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
      const SECONDS_IN_DAY = 24 * 60 * 60;
      const GAS_CHANGE_IN_DAY = inhabitants.reduce(
        (totalChangeInGas, inhabitant) =>
          totalChangeInGas +
          (inhabitant.getRespirationResult()[gas] * SECONDS_IN_DAY) /
            inhabitant.getBreathPeriodInSeconds(),
        0
      );

      const TOTAL_VOLUME_AIR = Object.values(air).reduce(
        (totalAir, component) => totalAir + component,
        0
      );
      const data = [];
      for (var day = 0; day < FORECAST_DAYS + 1; day++) {
        data.push({
          x: day,
          y: ((air[gas] + day * GAS_CHANGE_IN_DAY) * 100) / TOTAL_VOLUME_AIR,
        });
      }
      return data;
    }

    drawLine(data, color) {
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

    drawForecastLine(inhabitants, air, gas) {
      return this.drawLine(
        this.getForecastDataForGas(inhabitants, air, gas),
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

    renderXAxis() {
      return (
        <VictoryAxis
          crossAxis
          axisLabelComponent={<VictoryLabel dy={20} />}
          label={"Days from now"}
        />
      );
    }

    renderYAxis(gas) {
      return (
        <VictoryAxis
          dependentAxis
          axisLabelComponent={<VictoryLabel dy={-20} />}
          label={`Percent ${gas}`}
        />
      );
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
              {this.renderYAxis("Oxygen")}
              {this.renderXAxis()}
              {this.drawForecastLine(
                starship.inhabitants,
                starship.air,
                "OXYGEN"
              )}
              {this.drawOptimalLine(21)}
              {this.drawDangerLine(16)}
              {this.drawDeathLine(6)}
            </VictoryChart>
            <VictoryChart
              theme={VictoryTheme.material}
              domain={{ x: [0, FORECAST_DAYS], y: [0, 10] }}
            >
              {this.renderYAxis("Carbon dioxide")}
              {this.renderXAxis()}
              {this.drawForecastLine(
                starship.inhabitants,
                starship.air,
                "CARBON_DIOXIDE"
              )}
              {this.drawOptimalLine(0.05)}
              {this.drawDangerLine(4)}
              {this.drawDeathLine(10)}
            </VictoryChart>
          </div>
        </div>
      );
    }
  }
);
