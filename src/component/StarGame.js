 import React from 'react';
import App from '../App';
 import Entity from './Entity';


export default class TitleScreen extends React.Component {
	render() {
		return (
			<div>
				<span className="centerScreen title">Space Invaders</span>
				<span className="centerScreen pressSpace">Press Enter to start the game!</span>
			</div>
			);
	}
}
