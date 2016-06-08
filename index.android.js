import React, {Component} from 'react';
import {AppRegistry} from 'react-native';

var Game = require('./src/Game');

class tictactoe extends Component {
  render() {
    return (
      <Game />
    );
  }
}

AppRegistry.registerComponent('tictactoe', () => tictactoe);
