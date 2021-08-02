import React, { Component } from 'react'

export class StarGame extends Component {
	render() {
		return (
			<div>
			<span className="centerScreen title">Space Invaders</span>
			<span className="centerScreen pressSpace">Press Enter to start the game!</span>	
			</div>
		)
	}
}

export default StarGame


//  import React from 'react';
// import App from '../App';


// export default class TitleScreen extends React.Component {
// 	render() {
// 		return (
// 			<div>
// 				<span className="centerScreen title">Space Invaders</span>
// 				<span className="centerScreen pressSpace">Press Enter to start the game!</span>
// 			</div>
// 			);
// 	}
// }

