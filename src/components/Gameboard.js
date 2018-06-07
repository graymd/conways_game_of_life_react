import React, { Component } from 'react';
// import BoardPiece from './BoardPiece';
import GameRow from './GameRow';
import Button from './Button';

class Gameboard extends Component {

    state = {
      boardHeight: 14,
      boardWidth: 30,
      currentCells: [],
      previousCells: [],
      startGameButton: true,
      gameOver: false
  }

  initializeBoard(state) {
    var boardHeightArray = [...Array(this.state.boardHeight)];
    var boardWidthArray = [...Array(this.state.boardWidth)];
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
    var aliveCount = this.countAlive();
    this.interval = setInterval(() => {
      if (!this.state.gameOver && aliveCount !== 0) {
        this.tickGame();
        aliveCount = this.countAlive();
      } else {
        this.setState({gameOver: true})
      }
    }, 1000)
  }

  countAlive() {
    var currentCells = this.state.currentCells;
    var flattenedCurrentCells = currentCells.reduce((acc, val) => acc.concat(val), []);
    return flattenedCurrentCells.reduce((acc, val) => acc + val, 0);
  }

  tickGame() {
    var updatedCells = this.checkCells();
    console.log(updatedCells);
    this.setState({ currentCells: updatedCells })
  }

  checkCells() {
    this.setPreviousCellsToCurrentCells();
    var currentCells = this.state.currentCells;
    var updatedCells = [];
    return currentCells.map((row, rowIndex) => {
      return row.map((cell, cellIndex) => this.checkCell(rowIndex, cellIndex, currentCells));
    })
  }

  checkCell(rowIndex, columnIndex, currentCells) {

    var cellAndNeighborInfo = {
      currentCellState: currentCells[rowIndex][columnIndex],
      aliveNeighbors: 0,
      deadNeighbors: 0
    }
    // check north
    var northRowIndex = rowIndex - 1;
    var northColumnIndex = columnIndex;

    if (this.isCheckCellInbounds(northRowIndex, northColumnIndex)) {
        currentCells[northRowIndex][northColumnIndex] == 1 ? cellAndNeighborInfo.aliveNeighbors++ : cellAndNeighborInfo.deadNeighbors++
    }

    //check north-east
    var northEastRowIndex = rowIndex - 1;
    var northEastColumnIndex = columnIndex + 1;

    if (this.isCheckCellInbounds(northEastRowIndex, northEastColumnIndex)) {
      currentCells[northEastRowIndex][northEastColumnIndex] == 1 ? cellAndNeighborInfo.aliveNeighbors++ : cellAndNeighborInfo.deadNeighbors++
    }

    // check east
    var eastRowIndex = rowIndex;
    var eastColumnIndex = columnIndex + 1;

    if (this.isCheckCellInbounds(eastRowIndex, eastColumnIndex)) {
      currentCells[eastRowIndex][eastColumnIndex] == 1 ? cellAndNeighborInfo.aliveNeighbors++ : cellAndNeighborInfo.deadNeighbors++
        }

    // check south-east
    var southEastRowIndex = rowIndex + 1;
    var southEastColumnIndex = columnIndex + 1;

    if (this.isCheckCellInbounds(southEastRowIndex, southEastColumnIndex)) {
      currentCells[southEastRowIndex][southEastColumnIndex] == 1 ? cellAndNeighborInfo.aliveNeighbors++ : cellAndNeighborInfo.deadNeighbors++
    }

    // check south
    var southRowIndex = rowIndex + 1;
    var southColumnIndex = columnIndex;

    if (this.isCheckCellInbounds(southRowIndex, southColumnIndex)) {
      currentCells[southRowIndex][southColumnIndex] == 1 ? cellAndNeighborInfo.aliveNeighbors++ : cellAndNeighborInfo.deadNeighbors++
    }

    // check south-west
    var southWestRowIndex = rowIndex + 1;
    var southWestColumnIndex = columnIndex - 1;

    if (this.isCheckCellInbounds(southWestRowIndex, southWestColumnIndex)) {
      currentCells[southWestRowIndex][southWestColumnIndex] == 1 ? cellAndNeighborInfo.aliveNeighbors++ : cellAndNeighborInfo.deadNeighbors++
    }

    // check west
    var westRowIndex = rowIndex;
    var westColumnIndex = columnIndex - 1;

    if (this.isCheckCellInbounds(westRowIndex, westColumnIndex)) {
      currentCells[westRowIndex][westColumnIndex] == 1 ? cellAndNeighborInfo.aliveNeighbors++ : cellAndNeighborInfo.deadNeighbors++
    }

    // check north-west
    var northWestRowIndex = rowIndex - 1;
    var northWestColumnIndex = columnIndex - 1;

    if (this.isCheckCellInbounds(northWestRowIndex, northWestColumnIndex)) {
      currentCells[northWestRowIndex][northWestColumnIndex] == 1 ? cellAndNeighborInfo.aliveNeighbors++ : cellAndNeighborInfo.deadNeighbors++
    }

        return this.checkGameRulesAgainst(cellAndNeighborInfo);
  }

  checkGameRulesAgainst(cellAndNeighborInfo) {
    var cellState = cellAndNeighborInfo.currentCellState;
    var numAliveNeighbors = cellAndNeighborInfo.aliveNeighbors;
    var numDeadNeighbors = cellAndNeighborInfo.deadNeighbors;
    var finalCellState = cellState;
    // 1. Any live cell with fewer than two live neighbours dies, as if caused by under - population.
      if (cellState == 1 && numAliveNeighbors < 2) finalCellState = 0;
    // 2. Any live cell with two or three live neighbours lives on to the next generation.
      if (cellState == 1 && numAliveNeighbors >= 2 && numAliveNeighbors <= 3) finalCellState = 1;
    // 3. Any live cell with more than three live neighbours dies, as if by over - population.
      if (cellState == 1 && numAliveNeighbors > 3) finalCellState = 0;
    // 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
      if (cellState == 0 && numAliveNeighbors == 3) finalCellState = 1;
      return finalCellState;
  }

  isCheckCellInbounds(rowIndex, columnIndex) {
    return rowIndex >= 0 &&
            rowIndex <= this.state.currentCells.length - 1 &&
            columnIndex >= 0 &&
            columnIndex <= this.state.currentCells[0].length - 1
  }


  setPreviousCellsToCurrentCells() {
    this.setState({previousCells: this.state.currentCells});
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
        <div className = "box">
          { currentCells.map(row => <GameRow row={row} />) }
        </div>
      </div>
    )
  }
}

export default Gameboard;