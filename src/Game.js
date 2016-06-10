import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View
} from 'react-native';
var Menu = require('./Menu');
var GameBoard = require('./GameBoard');
var Player = require('./Player');

var Game = React.createClass({
  players = [];

  getInitialState: function() {
    return {
      isMenuPage: true,
    };
  },

  blockGameBoard: function() {
    Alert.alert('TEST', 'test');
  }

  startGame: function(mode) {
    this.setState({isMenuPage: false});
    this.setState({mode: mode});
    if (mode) {
      this.players = [new Player(0, this.blockGameBoard), new Player(0, this.blockGameBoard)];
    }
    else {
      this.players = [new Player(0, this.blockGameBoard), new Player(1, this.blockGameBoard)];
    }
  },

  render: function() {
    if (this.state.isMenuPage) {
      return (
        <View style={styles.game} >
        	<Menu startGameCallback={this.startGame} />
        </View>
      );
    }

    return (
      <View style={styles.game} >
        <GameBoard />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  game: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
});

module.exports = Game;
