import React from "react";
import { observer } from "mobx-react";
import "./plants-view.css";
import Tree from "../models/tree";

export default observer(
  class PlantsView extends React.Component {
    countPlants(inhabitantsList) {
      return inhabitantsList.reduce(
        (totalNumPlants, inhabitant) =>
          inhabitant instanceof Tree ? totalNumPlants + 1 : totalNumPlants,
        0
      );
    }

    render() {
      const starship = this.props.starship;
      return (
        <div className="plantsbox">
          <span>Plants panel</span>
          <span>Number of trees: {this.countPlants(starship.inhabitants)}</span>
          <button onClick={() => starship.addPlant()}>Add tree</button>
        </div>
      );
    }
  }
);
