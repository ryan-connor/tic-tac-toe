//Tic Tac Toe Script

//gameboard module
const gameboard = (() => {
let container=document.getElementById("container");
//array to represent 9 by 9 board
let grid = [ "", "", "","" , "","" , "","" , ""];

const clearBoard = () => {
    for (let j=0; j<grid.length; j++) {
        grid[j]="";
    };

//delete all the divs
const toDelete = document.querySelectorAll(".squares");
toDelete.forEach(( toggle) => {
    container.removeChild(toggle);
});

};

const gameWin = (arr) => {
    if (grid[arr[0]]+grid[arr[1]]+grid[arr[2]]=== "XXX" || grid[arr[0]]+grid[arr[1]]+grid[arr[2]]==="OOO") {
        return grid[arr[0]];
    }
    else {
        return false;
    }
};

const gameTie = () => {
    let counter="";
    for (let i=0; i<9; i++) {
        counter+=grid[i];
    }
    if (counter==="XXXXXXXXX" || counter==="OOOOOOOOO") {
        return true;
    }
    else {
        return false;
    }
};

//function for rendering gameboard to DOM
const renderBoard = () => {
//create 9 divs with class squares
for (let i=0; i<grid.length; i++) {

const div =document.createElement("div");
div.classList.toggle("squares");
div.textContent= grid[i] ;
div.setAttribute("id",i)
container.appendChild(div);
}

};

return {grid, gameWin, gameTie, clearBoard, renderBoard};

})();

//player factory function
const Player = (name) => {
    return {name};
};

//game flow module

const gameFlow = (() => {

let mark="X";
let playCount=0;
//check if win or tie
const checkStatus = () => {    
playCount++;
let toCheck=[[0,1,2],[0,3,6],[0,4,8],[3,4,5],[6,7,8],[6,4,2],[2,5,8],[1,4,7]];
let winner="";
for (let i=0; i<toCheck.length; i++) {
    if(gameboard.gameWin(toCheck[i])) {
        winner=gameboard.gameWin(toCheck[i]);
        return winner;
    }
    else {
        winner=false;
    }
}
if (!winner && playCount===9) {
    winner="Tie";
}
return winner;
};

const endGame = (value) => {
    let champion="No One";
if (value==="X") {
    champion= player1.name; 
}
else if (value==="O"){
    champion= player2.name; 
}
else {
    champion="Tie";
}
let winPopup = document.getElementById("winPopup");
winPopup.style.display= "block";

if (champion==="Tie") {
    winPopup.textContent = `It's a Tie!`;
}
else {
    winPopup.textContent = `Congratulations the winner is ${champion}!`;
}
};

const newGame = () => {

let winPopup = document.getElementById("winPopup");
winPopup.style.display= "none";
//reset board and values
turn=0;
mark="X";
winFlag=false;
playCount=0;

gameboard.clearBoard();
gameboard.renderBoard();
gameFlow.addClickEvents(".squares");
};

//increment turn function
let turn=0;
const incrementTurn = () => {
turn++;
};

//whos turn is it function
const whoTurn = () => {
    if (turn%2===0) {
        return 1;
    }
    else {
        return 2;
    }
};

let winFlag=false;
//play a turn
const playTurn = () => {
//increment turn
incrementTurn();

if(whoTurn() === 1){
    mark="X";
}
else if (whoTurn() ===2){
    mark="O";
}

//check if win/tie
let status= checkStatus();
if (status) {
    winFlag=true;
    endGame(status);

};
};

//add event listeners
const addClickEvents = (itemClass) => {
    const allItems = document.querySelectorAll(itemClass);
    allItems.forEach(( toggle) => {
        toggle.addEventListener("click", () => {

            if (toggle.getAttribute("data") !== "clicked" && !winFlag) {
            xOrO(toggle.getAttribute("id"));
            gameboard.grid[toggle.getAttribute("id")]=mark;
            playTurn();
            toggle.setAttribute("data","clicked");
            }
        });
    });
    };

const xOrO = (id) => {
    let display=mark;
    let div= document.getElementById(id);
    div.textContent = display;

};

const playGame = () => {
    gameboard.renderBoard();
    gameFlow.addClickEvents(".squares");
    renderButtons();
};

const renderButtons = () => {
    let openForm= document.getElementById("newGame");
let formPopup= document.getElementById("formPopup");
let inputForm= document.getElementById("startGame");
inputForm.addEventListener("click", function () {
    let inputname1 = document.getElementById("play1").value;
    let inputname2= document.getElementById("play2").value;
    if (inputname1 !== "") {
        player1.name = inputname1;
    }
    else if (inputname1 === "") {
        player1.name="Player1";
    }
    if (inputname2 !== "") {
        player2.name= inputname2;
    }
    else if (inputname2 === "") {
        player2.name= "Player2";
    }

    formPopup.style.display= "none";
});
openForm.addEventListener("click", function () {
    let popupStatus= formPopup.style.display;
    if (popupStatus==="block") {
        formPopup.style.display= "none";
    }
    else {
        formPopup.style.display= "block";
    }
});

let gameButton = document.getElementById("newGame");
gameButton.addEventListener("click", function () {
    newGame();
});
};

return { whoTurn, incrementTurn, checkStatus, addClickEvents, playGame, newGame, mark};
})();

//initialize players
const player1 = Player("Player1");
const player2= Player("Player2");

//start game
gameFlow.playGame();


