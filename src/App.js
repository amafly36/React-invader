import React from "react"

// CSS :
import './App.css';

// Component :
import Player from "./component/Player.js";
import Invader from "./component/Invader";
import Bullet from "./component/Bullet";
import Header from "./component/Header";
import Landing from "./component/Landing"

const GAME = {
	player: { w: 0, h: 0 },
	invader: { w: 0, h: 0 },
	bullet: { w: 0, h: 0 },
	window : {
		min : {
			w : 45
		},
		max : {
			w : 150
		}
	}
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
				toRight: false,
				fire: {
					active : false,
					x : 0,
					y : 0,
				}
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

					if (!player.fire.active) {
						player.fire.active =true
						player.fire.x = player.x + 2.65
						player.fire.y = 7
					}
					
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
		
		for (let y = 0; y < 5; y++) {

			for (let x = 0; x < 11; x++) {

				invaders.push({
					ID : ID++,
					alive : true,
					x : x * 5 + 50,
					y : y * 5 + 60,
					toRight : true
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
		let goDown = false

		count++
		if (count >= threshold) {
			count = 0
			
			this.state.invaders.map(invader => {
				
				if (invader.alive) {
					invader.x += 2

					if (invader.x >= GAME.window.max.w) {
						goDown = true
					}
				}
	
				return invader
			})

			if (goDown) {
				
				this.state.invaders.map(invader => {
					invader.x -= 60
					invader.y -= 4

					return invader
				})
			}

		} this.setState({ count : count })

		if (player.toRight) {
			player.x = (player.x +player.speed) <= GAME.window.max.w ? player.x + player.speed : GAME.window.max.w
		} else if (player.toLeft) {
			player.x = (player.x -player.speed) >= GAME.window.min.w ? player.x - player.speed : GAME.window.min.w
		}

		if (this.state.player.x !== player.x) {
			this.setState(state => {

				return ({
					...state,
					player: player
				})
			})
		}

		if (player.fire.active) {

			player.fire.y += 1

			if (player.fire.y * (window.innerHeight *0.0001) > 9) {
				player.fire.active = false
				player.fire.x = 0
				player.fire.y = 7
			}
			this.setState(state => {

				return({
					...state,
					player : player
				})
			})
		}
	}

	handleCollision = (type, entity, bullet) => {
	}

	render() {

		return (

			<div>
				<Header />
				{
					this.state.isStarted
						? this.renderHome()
						: this.state.isOver
							? <Landing />
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

								{
									this.state.player.fire.active
									?
										<Bullet
											x ={this.state.player.fire.x}
											y ={this.state.player.fire.y}
										/>
									: null
								}
							</div>
				}
			</div>
		)
	}
}

export default App;
