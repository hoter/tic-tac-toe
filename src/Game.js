import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View
} from 'react-native';
var Menu = require('./Menu');
var GameBoard = require('./GameBoard');

var Game = React.createClass({
  getInitialState: function() {
    return {
      isMenuPage: true,
    };
  },

  startGame: function() {
    this.setState({isMenuPage: false});
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
      <View>
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
