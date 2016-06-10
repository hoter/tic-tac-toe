import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

const numberOfRows = 3, numberOfCols = 3;

var GameBoard = React.createClass({
  render: function() {
    var board = [];
    for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      board.push(<GameBoardRow key={'row-' + rowIndex} rowIndex={rowIndex} />);
    }
    return (
      <View style={styles.gameBoard} >
        {board}
      </View>
    );
  }
});

var GameBoardRow = React.createClass({
  render: function() {
    var row = [];
    for (var colIndex = 0; colIndex < numberOfCols; colIndex++) {
      row.push(<GameBoardCell key={'cell-' + this.props.rowIndex + '-' + colIndex} />);
    }

    return (
      <View style={styles.gameBoardRow} >
        {row}
      </View>);
  }
});

var GameBoardCell = React.createClass({
  getInitialState: function() {
    return {
      value: '',
    };
  },

  chooseCell: function() {
    if (!this.state.value) {
      this.setState({value: 'x'});
    }
  },

  render: function() {
    return (
      <TouchableHighlight onPress={this.chooseCell} style={styles.gameBoardCell} >
        <Text style={styles.gameBoardCellValue} >{this.state.value}</Text>
      </TouchableHighlight>
    );
  }
});

var styles = StyleSheet.create({
  gameBoard: {
    flex: 1,
  },
  gameBoardRow: {
    flex: 1,
    flexDirection: 'row',
  },
  gameBoardCell: {
    flex: 1,
    borderStyle: 'solid',
    borderColor: '#F4F4F4',
    borderWidth: 2,
    backgroundColor: '#FF3366',
    justifyContent: 'center',
  },
  gameBoardCellValue: {
    color: '#FFF',
    fontSize: 160,
    margin: 0,
    lineHeight: 250,
    textAlign: 'center',
  },
});

module.exports = GameBoard;
