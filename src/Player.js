class Player{
  constructor(type, blockGameBoardCallback) {
    this.type = type;
    this.blockGameBoardCallback = blockGameBoardCallback;
  }

  step() {
    if (this.type) {
      this.blockGameBoardCallback(true);
    }
  }
}

module.exports = Player;
