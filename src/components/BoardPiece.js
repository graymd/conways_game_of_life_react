import React from 'react';

const BoardPiece = ({col}) => {

  var theClasses = ["column"];
  if (col === 1) {
    theClasses.push('has-background-black');
  }

  return (
    <div className={theClasses.join(' ')}>
      {col}
    </div>
  )
}

export default BoardPiece;