import React from "react"
import { v4 as uuidv4 } from 'uuid'

import Invader from "./component/Invader/Invader";
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
					ID : uuidv4(),
					isDestroy : false,
					coords : [2, 0]
				},	
				{
					ID : uuidv4(),
					isDestroy : false,
					coords : [3, 0]
				},
				{
					ID : uuidv4(),
					isDestroy : false,	
					coords : [4, 0]
				},	
				{
					ID : uuidv4(),
					isDestroy : false,
					coords : [5, 0]
				},
				{
					ID : uuidv4(),
					isDestroy : false,
					coords : [6, 0]
				},
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

	handleCollision = e => {
		let id =e.target.id

		this.state.invaders.map(invader => {
			if (id === invader.ID) {
				let element = document.getElementById(invader.ID)
			}
		})
	}

	render() {

		this.state.invaders.map(invader => {
			console.log("mon invader", invader)
		})
		
		return (
			<main>
				<div className="Invaders-container">
					{
						this.state.invaders.map(invader => 
							<Invader
								key = {invader.ID}
								id = {invader.ID}
								isDestroy = {invader.isDestroy}
								onClick = {this.handleCollision}
							/>
						)	
					}
				</div>
				<Ship onKeyPress={this.handleKeyPress} />
			</main>
		)
	}
}

export default App;
