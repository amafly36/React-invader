import React from "react"

import Invaders from "./component/Invaders";
import Ship from "./component/Ship/Ship";

import './App.css';

class App extends React.Component {

	constructor() {
		super()

		this.state = {
      		start: false,
			player : {

			},
			invaders : [
				{
					isDestroy : true,
					coords : []
				}
			]
		}
	}

	handleKeyPress = e => {
		let spaceShip = document.getElementById("spaceShip")

		document.addEventListener("keydown", e => {
			
			switch (e.keyCode) {
				case 37:
					console.log(spaceShip);
					break;
				case 39:
					console.log("Tourne à droite");
					break;
				case 32:
					console.log("Tire");
					break;
				default:
					break;
			}
		});
	}

	render() {

		
		return (
			<div id="window">
        		<Invaders />
				<Ship onKeyPress={this.handleKeyPress} />
			</div>
		)
	}
}

export default App;
