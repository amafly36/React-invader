import React from "react"

function Entity({ x = 0, y = 0, width = null, heigth = null, source = null }) {

    let style = {
        position: "absolute",
        bottom: y,
        left: x,
        width: width,
        height: heigth,
    }

    return (
        <img style={style} src={source} />
    )
}

export default Entity
