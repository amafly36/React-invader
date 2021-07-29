import React from "react";
import Entity from "./Entity";

import image from "../Images/invader.png"


const Invader = p =>

    <Entity
        x={p.x} y={p.y}
        width={5}
        heigth={5}
        source={image}
    />


export default Invader
