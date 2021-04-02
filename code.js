// Your Code Here.

const boardModel = [ 
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
];


let player = 1;

function addDiscToBoard(column) {
    let slot = {
        x: column,
        y: null
    }
    for (i = boardModel.length - 1; i >= 0; i--) {
        if (boardModel[i][column] === null) {
            slot.y = i;
            break;
        }
    }
    if (slot.y === null) {
        console.log('Too full.');
    } else {
        if (player === 1) {
            event.target.parentElement.parentElement.children[slot.y].children[column].style.backgroundColor = 'red';
            boardModel[slot.y][slot.x] = 1;
        } else {
            event.target.parentElement.parentElement.children[slot.y].children[column].style.backgroundColor = 'black';
            boardModel[slot.y][slot.x] = 2;
        }
    }
    return slot.y;
}

// Win condition
function checkForWin(slot) {
    function checkHorizontal() {
        // Have a way to determine how many discs are connected.
        let counter = 0; // This will increment up every time a player's disc is in the row.

        let row = slot.y; // This will come from whatever slot is passed in. (Not necessary, but helpful)

        // Since this is horizontal, we can check every element in one sub-array of the boardModel.
        for (let i = 0; i < boardModel[row].length; i++) {
            if (boardModel[row][i] === player) { // If this spot in the boardModel has a the player's disc in it...
                counter++; // Add null to counter.
                // Then, before moving to the next iteration of the loop:
                if (counter >= 4) { // If the counter has not been reset 4 times in a row, that means...
                    return true; // The player wins.
                } // Do NOT return false as an else statement here, because we're still inside the loop, checking more slots.

            } else { // If it doesn't have the player's disc (empty or opponent's disc instead)...
                counter = 0; // Restart the count.
            }
        }
        return false; // If the loop went through all of the possibilities and never got the counter to 4, then there was no horizontal win condition met.
    }

    function checkVertical() {
        // Same exact idea as horizontal, but it needs to add the extra dimension of arrays (so it's looping through the boardModel and checking a specific element inside instead of just looping through a single array.)
        let column = slot.x // This represents the vertical slots in the game
        let counter = 0; // This counts the how many of the same pieces in a row going up
        
        // Create a loop that goes thru the board model tha checks every element
        for (let i = 0; i < boardModel.length; i++) {
            if (boardModel[i][column] === player) {
                counter++;
                if (counter >= 4) {
                    return true
                }    
            } else {
                counter = 0

            }
        } 
    }

    function checkForwardDiagonal() {
        let counter = 0;
        let originSpace = {x: slot.x, y: slot.y};
        while (originSpace.x > 0 && originSpace.y < 5) {
            originSpace.x--;
            originSpace.y++;
        }
        while (originSpace.y >= 0) {
            if (boardModel[originSpace.y] && boardModel[originSpace.y][originSpace.x] === player) {
                counter++;
                if (counter >= 4) {
                    console.log('diagonal win')
                    return true;
                }
            } else if (boardModel[originSpace.y] && boardModel[originSpace.y][originSpace.x] !== player) {
                counter = 0;
            }
            originSpace.x++;
            originSpace.y--;
        }
        return false;
    }

    function checkBackwardDiagonal() {
        let counter = 0;
        let originSpace = slot;
        while (originSpace.x < 6 && originSpace.y < 5) {
            originSpace.x++;
            originSpace.y++;
        }
        while (originSpace.y >= 0) {
            if (boardModel[originSpace.y] && boardModel[originSpace.y][originSpace.x] === player) {
                counter++;
                if (counter >= 4) {
                    console.log('diagonal win')
                    return true;
                }
            } else if (boardModel[originSpace.y] && boardModel[originSpace.y][originSpace.x] !== player) {
                counter = 0;
            }
            originSpace.x--;
            originSpace.y--;
        }
        return false;
    }

    // Return true if player wins, else return false.
    if (checkHorizontal() || checkVertical() || checkForwardDiagonal() || checkBackwardDiagonal()) {
        return true;
    } else {
        return false;
    }
}

function checkTie() {
    for (let i = 0; i < boardModel.length; i++) {
        for (let j = 0; j < boardModel[i].length; j++) {
            if (boardModel[i][j] === null) {
                return false;
            }
        }
    }
    console.log('tie')
    return true;
}

function displayResult(win) {
    let displayWindow = document.getElementById('result-display');
    if (win) {
        displayWindow.innerHTML = `Player ${player} wins!`;
    } else {
        displayWindow.innerHTML = `It's a tie!`;
    }
    displayWindow.style.display = 'block';
}

// This functions switches between players
function changePlayer() {
    let playerTurn = document.getElementById('player-turn');
    if (player === 1) {
        player++; // Changed this to increment and decrement because for some reason just setting the value wasn't working.
        playerTurn.innerHTML = `Player 2`;
        playerTurn.style.color = 'black';
    } else {
        player--;
        playerTurn.innerHTML = `Player 1`;
        playerTurn.style.color = 'red';
    }
}

// Create function, that recognize when a column is click to run everything
function handleGame(column) {
    let slot = { 
        x: column,
        y: addDiscToBoard(column)
    }
    if (checkForWin(slot)) {
        displayResult(true);
    }
    if (checkTie()) {
        displayResult(false);
    }
    changePlayer();
}

// inspire by Krystal Briggs
let selectedColumn = document.getElementsByTagName("tr");
for (let i = 0; i < selectedColumn.length; i++) {
    selectedColumn[i].addEventListener("click", (event) => {
        handleGame(event.target.cellIndex);
    })
}

let button = document.querySelector('.button');
button.addEventListener('click', reset);
function reset() {
    window.location.reload();
}