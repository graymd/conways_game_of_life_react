import React from 'react';
import BoardPiece from './BoardPiece';

const GameRow = ({row}) => {


      return(
        <div className = "columns">
          {row.map(col => <BoardPiece />)}
        </div>
      )



}

export default GameRow;