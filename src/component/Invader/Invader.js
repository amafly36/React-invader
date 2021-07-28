import React from "react";
import "./Invader.css"


const Invader = etat =>

    !etat.isDestroy
        ?
            <div id={etat.id} class="invader" onClick={etat.onClick} />
        :
            null


export default Invader
