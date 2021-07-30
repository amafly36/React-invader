import React from "react"

// CSS :
import './App.css';

// Component :
import Player from "./component/Player.js";
import Invader from "./component/Invader";

const GAME = {
	player: { w: 0, h: 0 },
	invader: { w: 0, h: 0 },
	bullet: { w: 0, h: 0 }
}

class App extends React.Component {

	constructor() {
		super()

		this.state = {

			isStarted: false,
			count : 0,
			threshold : 240,
			player: {
				x: 97,
				speed: 0.25,
				toLeft: false,
				toRight: false
			},
			invaders: [
			]
		}
	}


	componentDidMount() {
		let player = { ...this.state.player }

		document.addEventListener("keydown", key => {

			switch (key.code) {
				case "ArrowLeft":
					player.toLeft = true
					break;
				case "ArrowRight":
					player.toRight = true
					break;
				case "Space":
					console.log("Piou piou");
					break;
				default:
					break;
			}

			this.setState(state => {

				return({
					...state,
					player : player
				})
			})
		})

		document.addEventListener("keyup", key => {
			switch (key.code) {
				case "ArrowLeft":
					player.toLeft = false
					break;
				case "ArrowRight":
					player.toRight = false
					break;
				case "Space":
					console.log("Piou piou");
					break;
				default:
					break;
			}

			this.setState(state => {

				return({
					...state,
					player : player
				})
			})
		})

		let invaders = []
		let ID = 0
		
		for (let y = 0; y < 3; y++) {

			for (let x = 0; x < 6; x++) {

				invaders.push({
					ID : ID++,
					alive : true,
					x : x * 20 + 40,
					y : y * 15 + 50,
				})
			}
		}

		this.setState(state => {

			return ({
				...state,
				invaders : invaders
			});
		});

		setInterval(this.thread, 4)
	}

	thread = () => {
		let { count, player, threshold } = this.state

		count++
		if (count >= threshold) {
			count = 0
			
			this.state.invaders.map(invader => {

				if (invader.alive) {
					invader.x = invader.x < 150 ? invader.x + 2 : 45
				}
	
				return invader
			})

		}	this.setState({ count : count })

		if (player.toRight) {
			player.x = player.x + player.speed
		} else if (player.toLeft) {
			player.x = player.x - player.speed
		}

		if (this.state.player.x !== player.x) {
			this.setState(state => {

				return ({
					...state,
					player: player
				})
			})
		}
	}

	handleCollision = (type, entity, bullet) => {
	}

	render() {

		return (

			<div>
				{
					this.state.isStarted
						? this.renderHome()
						: this.state.isOver
							? this.renderOver()
							:
							<div>

								<div>
									{
										this.state.invaders.map(invader => 
											invader.alive
											?
												<Invader
													x ={invader.x}
													y ={invader.y}
												/>
											: null
										)
									}
								</div>
								
								<Player x={this.state.player.x} />
							</div>
				}
			</div>
		)
	}
}

export default App;
