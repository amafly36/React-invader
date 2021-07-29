import React from "react"

// CSS :
import './App.css';

// Component :
import Ship from "./component/Ship/Ship.js";

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
			player: {
				x: 4,
				speed : 10,
				toLeft: false,
				toRight: true
			},
			invaders: [
			]
		}
	}


	componentDidMount() {

		document.addEventListener("keydown", e => {
			this.handleKeyPress(e.key)
		})

		setInterval(this.thread, 16)
	}
	

	thread = () => {
		let player = {...this.state.player}

		if (player.toRight) {
			player.x += player.speed;
		}

		if (this.state.player.x !== player.x) {
			this.setState(state => {

				return({
					...state,
					player : player
				})
			})
		}
	}

	handleKeyPress = key => {
		let player = { ...this.state.player }

		switch (key) {
			case "ArrowLeft":
				player.x -= player.x - 1 < 0 ? 0 : player.x - 1;
				break;
			case "ArrowRight":
				player.x += 1;
				break;
			case "Space":
				console.log("Piou piou");
				break;
			default:
				break;
		}


		this.setState(prevState => {

			return ({
				...prevState,
				player: player
			})
		})
	}

	handleCollision = (type, entity, bullet) => {

	}


	render() {

		return (
			<div>
				{this.state.isStarted
					? this.renderHome()
					: this.state.isOver
						? this.renderOver()
						:
						<div>

							<Ship x={this.state.player.x} />
							{/* Afficher les Invaders */}

							{/* Afficher le vaisseau */}
						</div>


				}
			</div>
		)
	}
}

export default App;
