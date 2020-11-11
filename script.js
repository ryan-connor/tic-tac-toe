//Tic Tac Toe Script
//gameboard module
const gameboard = (() => {
let container=document.getElementById("container");
//array to represent 9 by 9 board
let grid = [ "A", "B", ,"C" , ,"D" , ,"E" , ""];

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

//function to return value at given grid location
const gridValue = (index) => {
    if (index>=0 && index<=8) {
        return grid[index];
    }
    else {
        return "N";
    }
};

//put check win/tie function on gameboard and then just call it from gameflow
const gameWin = (arr) => {
    if (grid[arr[0]]+grid[arr[1]]+grid[arr[2]]=== "XXX" || grid[arr[0]]+grid[arr[1]]+grid[arr[2]]==="OOO") {
        return grid[arr[0]];
    }
    else {
        return false;
    }
}

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

//create element/display in DOM
const div =document.createElement("div");
div.classList.toggle("squares");
console.log(grid[i]);
div.textContent= grid[i] ;
div.setAttribute("id",i)
container.appendChild(div);
}

};

//public values to return, think about more
return {grid, gameWin, clearBoard, gridValue, renderBoard};

})();



//player factory function

const Player = (name) => {
    
    return {name};
};

//game flow module

const gameFlow = (() => {

//function to check if any wins or ties
const checkStatus = () => {    
let toCheck=[[0,1,2],[0,3,6],[0,4,8],[3,4,5],[6,7,8],[6,4,2],[2,5,8]];
let winner="";
for (let i=0; i<toCheck.length; i++) {
    console.log(toCheck[i]);
    if(gameboard.gameWin(toCheck[i])) {
        winner=gameboard.gameWin(toCheck[i]);
        console.log("Winner Exists");
        return winner;
    }
    else {
        winner=false;
    }
}
if (!winner && gameboard.gameTie) {
    winner="Tie";
}
console.log(winner);
return winner;
};

const endGame = (value) => {
    let champion="No One";
if (value==="X") {
    champion="Player1"; //add in player name here
}
else {
    champion="Player2"; //add in player name here
}
console.log("The Winner is "+champion+"!");
console.log("end game");

};

const newGame = () => {

//reset board, remove all divs, read it all, reset mark, reset grid array
turn=0;
mark="X";

gameboard.clearBoard();
gameboard.renderBoard();
gameFlow.addClickEvents(".squares");
console.log("new game");

};

//next turn function
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
}

//function to play a turn
const playTurn = () => {

//after user clicks
//check whos turn it is
//get that marker
//set the text content to that marker on click
//increment turn
incrementTurn();

if(whoTurn() === 1){
    mark="X";
}
else if (whoTurn() ===2){
    mark="O";
}

//when user clicks value will change

//check if win/tie
let status= checkStatus();
console.log("Win Status is "+status);
if (status) {
    console.log("Winner Chosen "+status);
    endGame(status);
}

}

//function to add event listeners
const addClickEvents = (itemClass) => {
    const allItems = document.querySelectorAll(itemClass);
    allItems.forEach(( toggle) => {
        toggle.addEventListener("click", () => {

            if (toggle.getAttribute("data") !== "clicked") {
            xOrO(toggle.getAttribute("id"));
            gameboard.grid[toggle.getAttribute("id")]=mark;
            playTurn();
            console.log("Clicked on "+ toggle.getAttribute("id"));
            toggle.setAttribute("data","clicked");
            }
        });
    });
    };

const xOrO = (id) => {
    let display=mark;
    let div= document.getElementById(id);
    console.log(display);
    div.textContent = display;

};

//make a full play game function that takes 2 players as arguments and then lets them play a full game
//play game
const playGame = (player1, player2) => {
    gameboard.renderBoard();
    gameFlow.addClickEvents(".squares");
    renderButtons();
    

};

const renderButtons = () => {
    let openForm= document.getElementById("newGame");
let formPopup= document.getElementById("formPopup");
let inputForm= document.getElementById("startGame");
inputForm.addEventListener("click", function () {
    let inputname1 = document.getElementById("player1").value;
    let inputname2= document.getElementById("player2").value;
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
};



//public things to return
return { whoTurn, incrementTurn, checkStatus, addClickEvents, playGame, newGame};

})();

let mark="X";

//initialize players?

gameFlow.playGame(); //add in players as parameters so can grab their names for the end


