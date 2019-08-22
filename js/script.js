var startButton = document.querySelector(".newgame");

startButton.addEventListener('click', function(){
    var boardHeight = prompt("Wysokość pola:", "7");
    while(isNaN(boardHeight)) {
        boardHeight = prompt("Wysokość pola: (podaj liczbę)")
    };
    var boardWidth = prompt("Szerokość pola:");
    while(isNaN(boardWidth)) {
        boardWidth = prompt("Szerokość pola: (podaj liczbę)")
    };
});