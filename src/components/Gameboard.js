import React, { Component } from 'react';
// import BoardPiece from './BoardPiece';
import GameRow from './GameRow';
import Button from './Button';

class Gameboard extends Component {

    state = {
      boardHeight: 10,
      boardWidth: 10,
      currentCells: [],
      previousCells: [],
      startGameButton: true
  }




  initializeBoard(state) {
    var boardHeightArray = [...Array(this.state.boardHeight)];
    //Array(this.state.boardHeight).fill().map((x,i) => i);
    var boardWidthArray = [...Array(this.state.boardWidth)];
    //Array(this.state.boardWidth).fill().map((x, i) => i);
    var tempOuterArray = [];
    boardHeightArray.forEach(h => {

      var tempRowArr = []
      boardWidthArray.forEach(w => {
        tempRowArr.push(this.getRandomBoolean());
      });
      tempOuterArray.push(tempRowArr);
    })
    this.setState({currentCells: tempOuterArray});
  }

  componentWillMount() {
    this.initializeBoard()
  }

  getRandomBoolean() {
    return Math.floor(Math.random() * Math.floor(2));
  }

  startGame() {
    this.setState({startGameButton: false});
    console.log('starting game');
  }

  render() {
    var currentCells = this.state.currentCells;

    return  (
      <div className="container">
        <div className="columns">
          <div className="column">
            <Button
              text={'Start Game'}
              onClick={this.startGame.bind(this)}
              enabled={this.startGameButton}
            />
          </div>
        </div>
        { currentCells.map(row => <GameRow row={row} />) }
      </div>
    )
  }
}

export default Gameboard;