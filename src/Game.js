import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
var Menu = require('./Menu');

class Game extends Component {
  render() {
    return (
      <View style={styles.game} >
      	<Menu />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  game: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
});

module.exports = Game;
