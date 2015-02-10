/* Pseudo-class Player */
function Player() {
    
}

/* Pseudo-class PC Player */
function PCPlayer() {
    
}
PCPlayer.prototype = Player;

/* Pseudo-class User Player */
function UserPlayer() {
    
}
UserPlayer.prototype = Player;

/* Pseudo-class Game */
function Game(player1, player2, field) {
    this.player1 = player1 || new PCPlayer;
    this.player2 = player2 || new UserPlayer;
    this.field = field || new Array(9);
}

onReady(function() {
   
});