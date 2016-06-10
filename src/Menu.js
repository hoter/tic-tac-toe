import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

class Menu extends Component {
  render() {
    return (
      <View style={styles.menu} >
        <TouchableHighlight style={styles.buttonWrapper} >
          <View>
            <Text style={styles.button} >New single game</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.buttonWrapper} >
          <View>
            <Text style={styles.button} >New multiple game</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  menu: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonWrapper: {
    backgroundColor: '#FF3366',
    height: 55,
    width: 200,
    justifyContent: 'center',
    marginTop: 30,
  },
  button: {
    fontSize: 15,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});

module.exports = Menu;
