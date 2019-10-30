// Board
var bodyRect = document.body.getBoundingClientRect();
var boardRect;

var newGame = document.querySelector(".newgame");
var bMargin = 16;
var bSx; //ilość kwadratów w poziomie
var bSy; //ilość kwadratów w pionie
var bW; //board width
var bH; //board height
var bWpx; //board width in px
var bHpx; //board height in px
var boardCoordX; // współrzędna board
var boardCoordY; // współrzędna board
var bSX = ""; // square X number
var bSY = ""; // square Y number
var leftDashed = " leftDashed"; // linie przerywane
var topDashed = " topDashed"; // linie przerywane
var rightDashed = " rightDashed"; // linie przerywane
var bottomDashed = " bottomDashed"; // linie przerywane
var leftSolid = " leftSolid"; // linie pełne
var topSolid = " topSolid"; // linie pełne
var rightSolid = " rightSolid"; // linie pełne
var bottomSolid = " bottomSolid"; // linie pełne
var leftX = " leftX"; //znak X
var topX = " topX"; //znak X
var rightX = " rightX"; //znak X
var bottomX = " bottomX"; //znak X

newGame.addEventListener('click', function(){
    //Setting width and height of board
    bSX = prompt("Wysokość pola:", "10");
    while(isNaN(bSX)) {
        bSX = prompt("Wysokość pola: (podaj liczbę)");
    };
    bW = bSX * 32 + 2 + bMargin * 2;
    bWpx = bW + 'px';

    bSY = prompt("Szerokość pola:", "10");
    while(isNaN(bSY)) {
        bSY = prompt("Szerokość pola: (podaj liczbę)");
    };
    bH = bSY * 32 + 2 + bMargin * 2;
    bHpx = bH + 'px';

    createB();
});

function createB() {
    var data = {
        squares: ""
    };
    
    var squareId;
    var square = " square";
    var sTop;
    var sLeft;
    var sRight;
    var sBottom;
    
    function dataSquares() {
        data.squares = data.squares + "<div id=\"" + squareId + "\" class=\"" + square + sTop + sLeft + sRight + sBottom + "\"><div class=\"top\"></div class=\"left\"><div></div></div>";
    };
    
    var squaresAll = bSX * bSY;

    // Id and classes for squares
    for(i=1;i<(squaresAll + 1);i++){
        var idX;
        var idY;
        idX = i % bSX;
        if(idX === 0) {idX = bSX};
        idY = Math.floor(i/bSX + 1);
        if(Number.isInteger(i/bSX)) {idY = Math.floor(i/bSX)}
        squareId = idX + ":" + idY;
        
        sLeft = leftDashed;
        sTop = topDashed;
        if(((i % bSY) === 0) && (i > bSX * bSY - bSY)) {
            sRight = rightDashed;
            sBottom = bottomDashed;
        }
        else if((i % bSX) === 0) {
            sRight = rightDashed;
            sBottom = "";
        } 
        else if(i > bSX * bSY - bSX) {
            sRight = "";
            sBottom = bottomDashed;
        }
        else{
            sRight = "";
            sBottom = "";
        }
        dataSquares();
    }
    
    // Rendering B
    var bTemp = document.getElementById("board-temp").innerHTML;
    Mustache.parse(bTemp);
    var bRend = Mustache.render(bTemp, data);
    var bRend = Mustache.render(bTemp, data);
    var bTarget = document.getElementById("board-target");
    bTarget.innerHTML = bRend;

    // Board coordinates
    document.getElementById("board").style.height = bHpx;
    document.getElementById("board").style.width = bWpx;
    function getBoardCoords() {
        boardRect = document.getElementById("board").getBoundingClientRect();
        boardCoordX = boardRect.left - bodyRect.left;
        boardCoordY = boardRect.top - bodyRect.top;
    }
    getBoardCoords();
}

var OnBoard; // yes or no
var mouseX;
var mouseY;
var boardX;
var boardY;
var boardInnerX;
var boardInnerY;
var relativeDistanceX;
var relativeDistanceY;
var clickedSquareIdX;
var clickedSquareIdY;
var clickedBorderIdX;
var clickedBorderIdY;
var choosenId;
var squareState = 0;
var side;

function boardMouseClick() {
    //clicked line:

    boardX = mouseX - boardCoordX;
    boardY = mouseY - boardCoordY;
    boardInnerX = boardX - bMargin; // first dot is 0:0
    boardInnerY = boardY - bMargin;

    if(boardInnerX % 32 > 16){relativeDistanceX = boardInnerX % 32 - 32}
    else{relativeDistanceX = boardInnerX % 32};
    if(boardInnerY % 32 > 16){relativeDistanceY = boardInnerY % 32 - 32}
    else{relativeDistanceY = boardInnerY % 32};

    clickedSquareIdX = Math.floor(boardX / 32) + 1;
    clickedSquareIdY = Math.floor(boardY / 32) + 1;

    if(Math.abs(relativeDistanceX) <= 7 && Math.abs(relativeDistanceY) > 7) {
        if(Number.isInteger(boardX / 32)) {clickedBorderIdX = Math.floor(boardX / 32)}
        else{clickedBorderIdX = Math.floor(boardX / 32) + 1};
        if(Number.isInteger((boardY - bMargin) / 32)) {clickedBorderIdY = Math.floor((boardY - bMargin) / 32)}
        else{clickedBorderIdY = Math.floor((boardY - bMargin) / 32) + 1};
        choosenId = clickedBorderIdX + ":" + clickedBorderIdY;
        side = "left";
        changeBorder(side);
    }

    if(Math.abs(relativeDistanceX) > 7 && Math.abs(relativeDistanceY) <= 7) {
        if(Number.isInteger((boardX - bMargin) / 32)) {clickedBorderIdX = Math.floor((boardX - bMargin) / 32)}
        else{clickedBorderIdX = Math.floor((boardX - bMargin) / 32) + 1};
        if(Number.isInteger(boardY / 32)) {clickedBorderIdY = Math.floor(boardY / 32)}
        else{clickedBorderIdY = Math.floor(boardY / 32) + 1};
        choosenId = clickedBorderIdX + ":" + clickedBorderIdY;
        console.log(choosenId);
        side = "top";
        changeBorder(side);
    }

    
}

function changeBorder(side) {
    console.log("changeBorder() - is working");
    if(document.getElementById(choosenId).classList.contains(side + "Dashed")) {borderSolid(side)}
    else if(document.getElementById(choosenId).classList.contains(side + "Solid")) {borderX(side)}
    else if(document.getElementById(choosenId).classList.contains(side + "X")) {borderDashed(side)};
};

function borderDashed(side) {
    document.getElementById(choosenId).classList.add(side + "Dashed");
    document.getElementById(choosenId).classList.remove(side + "Solid");
    document.getElementById(choosenId).classList.remove(side + "X");
}
function borderSolid() {
    document.getElementById(choosenId).classList.remove(side + "Dashed");
    document.getElementById(choosenId).classList.add(side + "Solid");
    document.getElementById(choosenId).classList.remove(side + "X");
}
function borderX() {
    document.getElementById(choosenId).classList.remove(side + "Dashed");
    document.getElementById(choosenId).classList.remove(side + "Solid");
    document.getElementById(choosenId).classList.add(side + "X");
}




var comMouseCoords;
var comOnBoardCoords;
document.body.addEventListener("click", function(event){
    mouseX = event.clientX;
    mouseY = event.clientY;
    if((mouseX >= boardCoordX && mouseX <= boardCoordX + bW)
    && (mouseY >= boardCoordY && mouseY <= boardCoordY + bH)){
        onBoard = "yes";
        boardMouseClick();
    }
    else{
        onBoard = "no";
    }

    comMouseCoords = mouseX + " : " + mouseY;
    comOnBoardCoords =" ; " + boardX + ":" + boardY;
    document.querySelector(".comment").innerHTML = comMouseCoords + " ; " + comOnBoardCoords + " || " + "Board coords: " + boardCoordY + "= board.top: " + boardRect.top + "-" + bodyRect.top;
    document.querySelector(".comment2").innerHTML = boardCoordX + ":" + boardCoordY + " ; " + boardRect.top + " - " + bodyRect.top+ " ; " + onBoard + " " + choosenId;
});

//Change Edge By Click





