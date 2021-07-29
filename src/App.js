import React from "react"

// CSS :
import './App.css';

// Component :
import Ship from "./component/Ship/Ship.js";
import Invader from "./component/Invader/Invader";

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
              <div>
                <Invader x="100px" y="700px" mooveToBottom />
                <Invader x="200px" y="700px" />
                <Invader x="300px" y="700px" />
                <Invader x="400px" y="700px" />
                <Invader x="500px" y="700px" />
                <Invader x="600px" y="700px" />
                <Invader x="700px" y="700px" />
                <Invader x="800px" y="700px" />
                <Invader x="900px" y="700px" />
                <Invader x="1000px" y="700px" />
                <Invader x="1100px" y="700px" />
                <Invader x="1200px" y="700px" />
                <Invader x="1300px" y="700px" />
                <Invader x="1400px" y="700px" />
              </div>

              {/* Afficher le vaiseau */}
              <Ship x="700px" style={{ backgroundColor: "black" }} />

            </div>


        }
      </div>
    )
  }
}

export default App;
