import React from "react"

import './App.css';

const GAME = {
  player: { w: 0, h: 0 },
  invader: { w: 0, h: 0 },
  bullet: { w: 0, h: 0 }
}

class App extends React.Component {

  constructor() {
    super()

    this.state = {

      isStarted: false,
      player: {
        x: 4,
        toLeft: false,
        toRight: false,
      },
      invaders: [
      ]
    }
  }

  componentDidMount() {

    document.addEventListener("keydown", e => {
      this.handleKeyPress(e.key)
    })

    setInterval(this.thread.bind(this), 30)
  }

  thread() {
    console.log("Vie du jeu")
  }

  handleKeyPress = key => {
    let player = { ...this.state.player }

    switch (key) {
      case "ArrowLeft":
        console.log("vers la gauche")
        player.x -= player.x - 1 < 0 ? 0 : player.x - 1;
        break;
      case "ArrowRight":
        player.x += 1;
        break;
      case "Space":
        console.log("Piou piou");
        break;
      default:
        break;
    }


    this.setState(prevState => {

      return ({
        ...prevState,
        player: player
      })
    })
  }

  handleCollision = (type, entity, bullet) => {

  }


  render() {

    return (
      <div>
        {this.state.isStarted
          ? this.renderHome()
          : this.state.isOver
            ? this.renderOver()
            :
            <div>
              {/* Afficher les Invaders */}

              {/* Afficher le vaisseau */}
            </div>


        }
      </div>
    )
  }
}

export default App;
