import React, { Component } from 'react';
import BoardPiece from './BoardPiece';

class Gameboard extends Component {
  render() {
    return  (
      <div className = "columns">
        <BoardPiece />
      </div>
    )
  }
}

export default Gameboard;