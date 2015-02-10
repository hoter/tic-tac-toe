onReady(function() {
    var newGame = document.getElementById('new-game'),
        game = document.getElementById('game'),
        gamePage = document.getElementById('game-page');
        menu = document.getElementById('menu'),
        menuPage = document.getElementById('menu-page');
        help = document.getElementById('help'),
        helpPage = document.getElementById('help-page'),

    help.addEventListener('click', function() {
        menuPage.style.display = 'none';
        helpPage.style.display = 'block';
    });
    
    game.addEventListener('click', function() {
        menuPage.style.display = 'none';
        gamePage.style.display = 'table';
    });
    
    newGame.addEventListener('click', function() {
        menuPage.style.display = 'none';
        gamePage.style.display = 'table';
        
        var tictactoe = new Game();
        tictactoe.start();
    });
});