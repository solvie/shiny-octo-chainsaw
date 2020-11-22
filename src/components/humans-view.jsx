import React from "react";
import { observer } from "mobx-react";
import "./humans-view.css";

export default observer(
  class HumansView extends React.Component {
    renderHumans() {
      return;
    }

    render() {
      const starship = this.props.starship;
      return (
        <div className="humansbox">
          <span>Humans panel</span>
          <span>Population: {starship.inhabitants.length}</span>
          <ul id="humans">
            {starship.inhabitants.map((human) => (
              <li>{human.name}</li>
            ))}
          </ul>
          <button onClick={() => starship.addHuman()}>Add human</button>
        </div>
      );
    }
  }
);
