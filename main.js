var x = new Array(9);
var y = new Array(9);
var playerIcon = "";
var playerOne = true;
var gameEnd = false;

function play(userChoice){
    if(gameEnd == false){
        return false;
    }
    switch(userChoice){
        case 'one': console.log("SWAG");


    }
}

function changePlayer(){
    if(playerOne){
        playerIcon = "X";
    }
    else{
        playerIcon = "Y";
    }
}