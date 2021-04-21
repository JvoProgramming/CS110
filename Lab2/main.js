var boardArray = new Array(9);
var aiArray = new Array(1,2,3,4,5,6,7,8,9);
var playerIcon = "X";
var playerTwo = true;
var gameEnd = false;
var item;
var turnElement;
var xScore = 0;
var yScore = 0;
var showWinner;
var aiCheckBox;
var AIswitch = false;    
var boardCount = 0;
var boardFull = false;
var playerWon = false;

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
    if(!playerTwo){
        playerIcon = "O";
        playerTwo = true;
        turnElement.innerHTML = playerIcon;
    }
    else{
        playerIcon = "X";
        playerTwo = false;
        turnElement.innerHTML = playerIcon;
    }
}

function insert(num){
    if(boardArray[num] == undefined){
        boardArray[num] = playerIcon;
        item.innerHTML = playerIcon;
    }
    else{
        alert("This slot is already taken. Choose another one!");
        return;
    }
    boardCount++;
    checkScore();
    if(!gameEnd){
        changePlayer();
    }
    if(AIswitch == true && playerTwo == true && gameEnd == false){
        showWinner.innerHTML = "AI is thinking of the next move...";
        turnElement.innerHTML = "";
        setTimeout(AIchoice, 2000);
    }
    else{
        showWinner.innerHTML = "It is your turn, "
    }
    var findIndex = aiArray.indexOf(num+1);
    if(findIndex > -1){
        aiArray.splice(findIndex, 1);
    }
    checkScore();
}

function checkScore(){
    showWinner = document.getElementById("displayWin");
    if(boardArray[0] == boardArray[1] && boardArray[1] == boardArray[2] && boardArray[0] != undefined || boardArray[3] == boardArray[4] && boardArray[4] == boardArray[5] && boardArray[3] != undefined || boardArray[6] == boardArray[7] && boardArray[7] == boardArray[8] && boardArray[6] != undefined || boardArray[0] == boardArray[3] && boardArray[3] == boardArray[6] && boardArray[0] != undefined || boardArray[1] == boardArray[4] && boardArray[4] == boardArray[7] && boardArray[1] != undefined || boardArray[2] == boardArray[5] && boardArray[5] == boardArray[8] && boardArray[2] != undefined || boardArray[0] == boardArray[4] && boardArray[4] == boardArray[8] && boardArray[0] != undefined || boardArray[2] == boardArray[4] && boardArray[4] == boardArray[6] && boardArray[2] != undefined){
        gameEnd = true;
        playerWon = true;
    }
    if(boardCount == 9){
        boardFull = true;
        gameEnd = true;
    }
    if(gameEnd == true && playerWon == true){
        showWinner.innerHTML = playerIcon + " WINS!!!";
        turnElement.innerHTML = '';
        if (playerIcon == "X"){
            xScore += .5;
            document.getElementById("xScore").innerHTML = xScore;
        }
        else{
            yScore += .5;
            document.getElementById("yScore").innerHTML = yScore;
        }
    }
    if(gameEnd == true && playerWon == false){
        showWinner.innerHTML = "It's a tie!";
        turnElement.innerHTML = "";
    }
}

function toggleAI(){
    var checkboxItem = document.getElementById("aiCheckBox").checked;
    if(checkboxItem == true){
        AIswitch = true;
        if(playerIcon == "O"){
            showWinner.innerHTML = "AI is thinking of the next move...";
            turnElement.innerHTML = "";
        }
        setTimeout(AIchoice, 2000);
    }
    else{
        AIswitch = false;
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
    playerTwo = false;
    aiArray = [1,2,3,4,5,6,7,8,9];
    boardFull = false;
    boardCount = 0;
    playerWon = false;
}

function AIchoice(){
    if(playerIcon == "X"){
        return;
    }
    var aiGenerate = aiArray[Math.floor(Math.random() * aiArray.length)];
    play(aiGenerate);
}