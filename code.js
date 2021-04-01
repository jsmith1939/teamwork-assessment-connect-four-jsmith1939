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

function addDiscToBoard() { //Medium difficulty
    let slotPlace = document.getElementsByTagName("td")
    // Create a for loop tht loops thru the td
    for (let i = 0; i < slotPlace.length; i++) {
        slotPlace[i].addEventListener("click", (event) => {
            console.log(
                `${event.target.parentElement.rowIndex}, ${event.target.cellIndex}}`
            )
// line 18 - 20 code was inspire by Krystal Briggs
        })

        }
    }
console.log(addDiscToBoard())


// Win condition
// Needs to know what slot a disc is played in, and what player did it. (parameters: slot/location, player)
// Needs to check horizontally, vertically, and diagonally (both diagonal directions different functions?).
// Has to be able to check all possible spaces, not just from the location provided in the parameters.
function checkForWin(slot) {
    // Horizontal
    function checkHorizontal() {
        // Have a way to determine how many discs are connected.
        let counter = 0; // This will increment up every time a player's disc is in the row.

        let row = 0; // This will come from whatever slot is passed in. (Not necessary, but helpful)

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

    // Vertical
    function checkVertical() {
        // Same exact idea as horizontal, but it needs to add the extra dimension of arrays (so it's looping through the boardModel and checking a specific element inside instead of just looping through a single array.)
        // Stub
        let column = 0 // This represents the vertical slots in the game
        let counter = 0 // This counts the how many of the same pieces in a row going up
        
        // Create a loop that goes thru the board model tha checks every element
        for (let i = 0; i < boardModel.length; i++) {
            if (boardModel[i][column] === player) {
                counter++;
                console.log(boardModel[i][column])
                console.log(counter)
                if (counter >= 4) {
                    console.log("We Have A Winner !")
                    return true
                }    
            } else {
                counter = 0

            }
        } 
    }

    // Diagonal

    // Return true if player wins, else return false.
    if (
        checkHorizontal() 
        || checkVertical()
        // || checkDiagonal() // Uncomment when checkDiagonal is finished.
    ) {
        return true;
    }
}

// Create a function that checks for a tie
function checkTie() { // Easy

}
console.log(checkForWin())

// When a player clicks empty slot, disc appears. Then program alternates to the other player.
function changePlayer() {
    if (player === 1) {
        player = 1;
    } else if (player === 2) {
        player = 2;
    }
    // TO-DO: Render on the page to say whose turn it is.
}

function handleGame() { // Medium
// this function is another add event listener function that renders everything unto the page
    
    
}


function reset() {
    
}