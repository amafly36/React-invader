import React from "react";
import invader from "./../Images/Invaders.png"


class Invaders extends React.Component {

    render() {

        return(
            <div style={{ width: "80%", backgroundColor: "blue", display: "flex" }}>
                <img src={invader} style={{width: "50px", height: "50px", margin: "0 10px 0 10px"}} />
            </div>
        )
    }
} 
// trop sylé je savais pas qu'on pouvait faire ça comme ça : ) 
export default Invaders
