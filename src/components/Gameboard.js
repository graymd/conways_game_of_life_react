import React, { Component } from 'react';
// import BoardPiece from './BoardPiece';
import GameRow from './GameRow';

class Gameboard extends Component {
  state = {
    boardHeight: 5,
    boardWidth: 5,
    currentCells: [],
    previousCells: []
  }

  initializeBoard() {
    var boardHeightArray = [...Array(this.state.boardHeight)];
    //Array(this.state.boardHeight).fill().map((x,i) => i);
    var boardWidthArray = [...Array(this.state.boardWidth)];
    //Array(this.state.boardWidth).fill().map((x, i) => i);
    boardHeightArray.forEach(h => {
      var tempArr = []
      boardWidthArray.forEach(w => {
        tempArr.push(this.getRandomBoolean());
      });
      this.state.currentCells.push(tempArr);
    })
  }

  componentWillMount() {
    this.initializeBoard()
  }

  getRandomBoolean() {
    return Math.floor(Math.random() * Math.floor(2));
  }

  render() {
    var currentCells = this.state.currentCells;

    return  (
      <div className="container">
        { currentCells.map(row => <GameRow row={row} />) }
      </div>
    )
  }
}

export default Gameboard;

// {
//   return row.map(col => < GameRow / > )
// })
// }