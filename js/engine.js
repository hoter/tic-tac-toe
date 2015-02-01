/* Pseudo-class Player */
function Player() {
    
}

/* Pseudo-class Game */
function Game(player1, player2, field) {
    this.player1 = player1 || new Player;
    this.player2 = player2 || new Player;
    this.field = field || new Array(9);
}

onReady(function() {
   
});