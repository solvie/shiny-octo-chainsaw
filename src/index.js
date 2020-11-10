import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { observer } from "mobx-react"
import Starship from './models/starship';
import Game from './components/game';
import Timer from './models/timer';

const timer = new Timer();
const myStarship = new Starship(timer);
myStarship.start();
const StarshipGame = observer(({starship}) => Game(starship));

ReactDOM.render(
  <StarshipGame starship={myStarship} />,
  document.getElementById('root')
);
