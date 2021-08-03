import React from "react"
import { v4 as uuidv4 } from 'uuid';

// CSS :
import './App.css';
import shoot from "./Sounds/shoot.wav"

// Component :
import Player from "./component/Player.js";
import Invader from "./component/Invader";
import Bullet from "./component/Bullet";
import shootSound from "./Sounds/shoot.wav"
import moveInvader1 from "./Sounds/moveinvader1.ogg"
import moveInvader2 from "./Sounds/moveinvader2.ogg"
import moveInvader3 from "./Sounds/moveinvader3.ogg"
import moveInvader4 from "./Sounds/moveinvader4.ogg"

import TitleScreen from "./component/StarGame";
import { Howl } from "howler";
const GAME = {

	player: { w: 6, h: 7, sounds : shootSound },
	invader: { w: 4, h: 4, sounds : [ moveInvader1, moveInvader2, moveInvader3, moveInvader4 ] },
	bullet: { w: 0.8, h: 4 },
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
			sound : 0,
			thread : undefined,
			threshold : 1,
			player: {
				size : GAME.player,
				x: 97,
				y : 0,
				speed: 0.25,
				toLeft: false,
				toRight: false,
				fire: {
					active : false,
					x : 0,
					y : 0,
				}
			},
			invaders: []
		}
	}
	playSound(sound) {

		let player = new Howl(
			{
				src : [sound]
		 	}
		);
		  
		player.play('laser');
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
						this.playSound(GAME.player.sounds)

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
					size : GAME.invader,
					alive : true,
					x : x * 5 + 50,
					y : y * 5 + 50,
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

		this.tread = setInterval(this.thread, 4)
	}

	thread = () => {
		let { count, sound, invaders, player } = this.state
		let goDown = false

		count++
		if ( (count / 60 ) % 2 === 0 ) {
			count = 0
			console.log(sound)

			invaders.map(invader => {
				
				if (invader.alive) {

					this.playSound(GAME.invader.sounds[0])

					if (sound > 3) {
						console.log(sound, "plus grand que 3")
						sound = 0
					}

					if (
						( (player.x - GAME.player.w /2) < invader.x && (player.x + GAME.player.w /2) > invader.x ) &&
						( invader.y <= 2 + (GAME.player.h -2))
					) {
						this.setState(state => {
							
							return({
								...state,
								isOver : true
							});
						});
					}



					invader.x += 2


					if (invader.x >= GAME.window.max.w) {
						goDown = true
					}
				}
	
				return invader
			})

			if (goDown) {
				
				invaders.map(invader => {

					invader.x -= 60
					invader.y -= 4

					return invader
				});
			}

			this.setState({ sound : sound })

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

			} else {

				for (let i = 0; i < invaders.length; i++) {
					let invader = this.state.invaders[i]

					if (this.handleCollision({ type : "invader", entity : invader }, { type : "bullet", entity : player.fire })) {

						invaders[i].alive = false
						player.fire.active = false
					}
				}
			}

			this.setState(state => {

				return({
					
					...state,
					player : player
				})
			})
		}
	}

	handleCollision = (target, from) => {
		let w, h;

		switch (target.type) {

			case "invader":
			case "player":
				w = GAME[target.type].w;
				h = GAME[target.type].h;

				break;

			default:
				w = 0;
				h = 0;
		}

		return (
			target.type === "invader" && !target.entity.alive
			? null
			:
				( (target.entity.x - w /2) < from.entity.x && (target.entity.x + w / 2) > from.entity.x ) &&
				( (target.entity.y - h /2) < from.entity.y && (target.entity.y + h / 2) > from.entity.y)

		)
	}

	renderOver() {
		clearInterval(this.thread)
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
													key	= {uuidv4()}
													x	= {invader.x}
													y	= {invader.y}
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
