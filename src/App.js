import React, { Component } from 'react';
import logo from './logo.svg';
// import './App.css';
import 'bulma/css/bulma.css';
import Gameboard from './components/Gameboard';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Gameboard />
      </div>
    );
  }
}

export default App;