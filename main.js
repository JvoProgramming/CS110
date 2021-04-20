var boardArray = new Array(9);
var playerIcon = "X";
var playerOne = true;
var gameEnd = false;
var item;
var turnElement;
var xScore = 0;
var yScore = 0;
var showWinner;
var aiCheckBox;

function play(userChoice){
    if(gameEnd == true){
        alert("Game has already ended! Press New Game or Reset");
        return false;
    }
    
    switch(userChoice){
        case 1: 
            item = document.getElementById("xo1");
            insert(0);
            break;
        case 2: 
            item = document.getElementById("xo2");
            insert(1);
            break;
        case 3: 
            item = document.getElementById("xo3");
            insert(2);
            break;
        case 4: 
            item = document.getElementById("xo4");
            insert(3);
            break;
        case 5: 
            item = document.getElementById("xo5");
            insert(4);
            break;
        case 6: 
            item = document.getElementById("xo6");
            insert(5);
            break;
        case 7: 
            item = document.getElementById("xo7");
            insert(6);
            break;
        case 8: 
            item = document.getElementById("xo8");
            insert(7);
            break;
        case 9: 
            item = document.getElementById("xo9");
            insert(8);
            break;
    }
}

function changePlayer(){
    turnElement = document.getElementById("playerName");
    if(!playerOne){
        playerIcon = "O";
        playerOne = true;
        turnElement.innerHTML = playerIcon;
    }
    else{
        playerIcon = "X";
        playerOne = false;
        turnElement.innerHTML = playerIcon;
    }
}

function insert(num){
    var aiCheckBox = document.getElementById("aiCheck");
    if(boardArray[num] == undefined){
        boardArray[num] = playerIcon;
        item.innerHTML = playerIcon;
    }
    else{
        alert("This slot is already taken. Choose another one!");
    }
    //AI MOVES AFTER PLAYER INSERTS MOVE
    if(aiCheckBox.checked == true){
        console.log("AI is turned on!");
    }
    else{
        console.log("AI is turned off!");
    }
    checkScore();
    if(!gameEnd){
        changePlayer();
    }
}

function checkScore(){
    showWinner = document.getElementById("displayWin");
    if(boardArray[0] == boardArray[1] && boardArray[1] == boardArray[2] && boardArray[0] != undefined || boardArray[3] == boardArray[4] && boardArray[4] == boardArray[5] && boardArray[3] != undefined || boardArray[6] == boardArray[7] && boardArray[7] == boardArray[8] && boardArray[6] != undefined || boardArray[0] == boardArray[3] && boardArray[3] == boardArray[6] && boardArray[0] != undefined || boardArray[1] == boardArray[4] && boardArray[4] == boardArray[7] && boardArray[1] != undefined || boardArray[2] == boardArray[5] && boardArray[5] == boardArray[8] && boardArray[2] != undefined || boardArray[0] == boardArray[4] && boardArray[4] == boardArray[8] && boardArray[0] != undefined || boardArray[2] == boardArray[4] && boardArray[4] == boardArray[6] && boardArray[2] != undefined){
        gameEnd = true;
    }
    if(gameEnd){
        showWinner.innerHTML = turnElement.innerHTML + " WINS!!!";
        turnElement.innerHTML = '';
        if (playerIcon == "X"){
            xScore++;
            document.getElementById("xScore").innerHTML = xScore;
        }
        else{
            yScore++;
            document.getElementById("yScore").innerHTML = yScore;
        }
    }
}

function newGame(){
    $(".xo").html('');
    gameEnd = false;
    boardArray = [];
    showWinner = document.getElementById("displayWin");
    showWinner.innerHTML = "It's your turn, ";
    turnElement.innerHTML = "X";
    playerIcon = "X";
    playerOne = false;
}


function handleClick(cb) {
    display("Clicked, new value = " + cb.checked);
  }