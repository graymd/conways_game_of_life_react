import React from 'react';

const Button = ( {text, onClick, enabled} ) =>
  <button onClick={onClick} disabled={enabled}>
    {text}
  </button>

export default Button;