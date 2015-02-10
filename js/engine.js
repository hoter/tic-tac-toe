/* Pseudo-class Player */
function Player() {
    this.step = function() {
        
    }
}

/* Pseudo-class PC Player */
function PCPlayer() {
    
}
PCPlayer.prototype = Player;

/* Pseudo-class Game */
function Game(player1, player2, field, step) {
    this.player1 = player1 || new PCPlayer;
    this.player2 = player2 || new Player;
    this.field = field || new Array(9);
    this.step = step || 0;
    
    this.start = function() {
        if (this.step) {
            this.player2.step();
        }
        else {
            this.player1.step();
        }
    }
}

onReady(function() {
   
});