onReady(function() {
    var help = document.getElementById('help'),
        helpPage = document.getElementById('help-page'),
        menuPage = document.getElementById('menu-page');

    help.addEventListener('click', function() {
        menuPage.style.display = 'none';
        helpPage.style.display = 'block';
    });
});