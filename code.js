// Your Code Here.

const boardModel = [ 
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
];

let player = 1;

// When a player clicks empty slot, disc appears. Then program alternates to the other player.
function changePlayer() {
    // Call this function after checkForWin, assuming a player doesn't win?
    // Something like this? There's probably a better way to write this, and this also assumes that there is a currentPlayer global variable.
    // Since this would be the last step, it only needs to say "It it was this player's turn, change it to the other player's turn."
    if (currentPlayer === 1) {
        currentPlayer = 2;
    } else if (currentPlayer === 2) {
        currentPlayer = 1;
    }
}

// Win condition
// Needs to know what slot a disc is played in, and what player did it. (parameters: slot/location, player)
// Needs to check horizontally, vertically, and diagonally (both diagonal directions different functions?).
// Has to be able to check all possible spaces, not just from the location provided in the parameters.
function checkForWin(slot, player) {
    // Horizontal
    function checkHorizontal() {
        // Have a way to determine how many discs are connected.
        let counter = 0; // This will increment up every time a player's disc is in the row.

        let row = 0; // This will come from whatever slot is passed in. (Not necessary, but helpful)

        // Since this is horizontal, we can check every element in one sub-array of the boardModel.
        for (let i = 0; i < board[row].length; i++) {
            if (board[row][i] === player) { // If this spot in the boardModel has a the player's disc in it...
                counter++; // Add 1 to counter.
            } else { // If it doesn't have the player's disc (empty or opponent's disc instead)...
                counter = 0; // Restart the count.
            }
            // Then, before moving to the next iteration of the loop:
            if (counter >= 4) { // If the counter has not been reset 4 times in a row, that means...
                return true; // The player wins.
            } // Do NOT return false as an else statement here, because we're still inside the loop, checking more slots.
        }
        return false; // If the loop went through all of the possibilities and never got the counter to 4, then there was no horizontal win condition met.
    }

    // Vertical
    function checkVertical() {
        // Same exact idea as horizontal, but it needs to add the extra dimension of arrays (so it's looping through the boardModel and checking a specific element inside instead of just looping through a single array.)
        // Stub
    }

    // Diagonal
    function checkForwardDiagonal(start) {
        let counter = 0;
        let originSpace = {x: start.x, y: start.y}
        while (originSpace.x > 0 || originSpace.y < 5) {
            originSpace.x--;
            originSpace.y++;
        }
        while (originSpace.x < 6 || originSpace.y > 0) {
            originSpace.x++;
            originSpace.y--;
            if (board[originSpace.y] && board[originSpace.y][originSpace.x] === player) {
                counter++;
                if (counter >= 4) {
                    return true;
                }
            } else if (board[originSpace.y] && board[originSpace.y][originSpace.x] !== player) {
                counter = 0;
            }
        }
        return false;
    }
    function checkBackwardDiagonal(start) {
        let counter = 0;
        let originSpace = {x: start.x, y: start.y}
        while (originSpace.x > 0 || originSpace.y > 0) {
            originSpace.x--;
            originSpace.y--;
        }
        while (originSpace.x < 6 || originSpace.y < 5) {
            originSpace.x++;
            originSpace.y++;
            if (board[originSpace.y] && board[originSpace.y][originSpace.x] === player) {
                counter++;
                if (counter >= 4) {
                    return true;
                }
            } else if (board[originSpace.y] && board[originSpace.y][originSpace.x] !== player) {
                counter = 0;
            }
        }
        return false;
    }

    // Return true if player wins, else return false.
    if (
        checkHorizontal() 
        || checkVertical()
        || checkForwardDiagonal()
        || checkBackwardDiagonal()
    ) {
        return true;
    } else {
        return false;
    }
}

function checkTie() {
    for (let i = 0; i < boardModel.length; i++) {
        for (let index = 0; index < boardModel[i].length; i++) {
            if (boardModel[i][index] === null) {
                return false;
            }
        }
    }
    return true;
}

let button = document.querySelector('.button');
button.addEventListener('click', reset);
function reset() {
    window.location.reload();
}