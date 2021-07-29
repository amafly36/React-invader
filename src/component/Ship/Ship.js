import React from "react"
import Entity from "../Entity/Entity";

// CSS :
import "./Ship.css"

const Ship = p =>

    <Entity
        x={p.x} y="0"
        width="125px" heigth="80px"
        source="./Image vaisseau2.png"
    />

export default Ship;
