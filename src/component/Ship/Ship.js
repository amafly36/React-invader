import React from "react"

import "./Ship.css"

class Ship extends React.Component {

    constructor() {
        super()
    }

    componentDidMount() {
        this.props.onKeyPress()
    }

    render() {

        return(
            <div id="spaceShip" className="playerShip">

            </div>
        )
    }
}

export default Ship
