import React from "react";
import Entity from "../Entity/Entity";

import image from "../../Images/Invaders.png"

// CSS : 
import "./Invader.css"


const Invader = p =>

    <Entity
        x={p.x} y={p.y}
        width="50px" heigth="50px"
        source={image}
    />


export default Invader
