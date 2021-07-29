import React from "react";
import Entity from "../Entity/Entity";

// Image : 
import invaders from "../../Images/Invaders.png"

// CSS : 
import "./Invader.css"


const Invader = p => {

    <Entity
        x="x" y={p.y}
        width="50px" heigth="50px"
        source={invaders}
    />
}

export default Invader
