import React from "react";
import { observer } from "mobx-react";
import "./humans-view.css";
import Human from "../models/human";

export default observer(
  class HumansView extends React.Component {
    countHumans(inhabitantsList) {
      return inhabitantsList.reduce(
        (totalNumHumans, inhabitant) =>
          inhabitant instanceof Human ? totalNumHumans + 1 : totalNumHumans,
        0
      );
    }

    filterHumans(inhabitantsList) {
      return inhabitantsList.filter(
        (inhabitant) => inhabitant instanceof Human
      );
    }

    render() {
      const starship = this.props.starship;
      return (
        <div className="humansbox">
          <span>Humans panel</span>
          <span>Population: {this.countHumans(starship.inhabitants)}</span>
          <ul id="humans">
            {this.filterHumans(starship.inhabitants).map((human) => (
              <li>{human.name}</li>
            ))}
          </ul>
          <button onClick={() => starship.addHuman()}>Add human</button>
        </div>
      );
    }
  }
);
