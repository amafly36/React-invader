import React from "react"
import Entity from "../Entity/Entity";

// Image :
import vaisseau from "../../Images/player.jpg"

// CSS :
import "./Ship.css"

const Ship = p =>

    <Entity
        x={p.x} y="0"
        width="125px" heigth="80px"
        source={vaisseau}
    />

export default Ship;
