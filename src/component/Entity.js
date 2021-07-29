import React from "react"



function Entity({ x = 0, y = 0, width = null, heigth = null, source = null }) {

	const MAX_WIDTH = window.innerWidth
	const MAX_HEIGHT = window.innerHeight

	let style = {


		position	: "absolute",
		left		: `${x}vh`,
		bottom		: `${y}vh`,
		width		: `${width}vh`,
		height		: `${heigth}vh`,
	}

	return (
		<img style={style} src={source} />
	)
}

export default Entity
