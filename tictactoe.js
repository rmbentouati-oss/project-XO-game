// ========== GET ALL GAME CELLS ==========
const cells = document.querySelectorAll(".square");

// ========== GET THE RESULT DISPLAY AREA ==========
const statusText = document.querySelector("h1");

// ========== GET THE RESTART BUTTON ==========
const restartBtn = document.getElementById("resrart-game--button");

// ========== GAME VARIABLES ==========
let currentPlayer = "X";   // X always starts first
let gameBoard = ["", "", "", "", "", "", "", "", ""]; // empty board
let gameActive = true;     // game is running

// ========== WINNING COMBINATIONS ==========
const winConditions = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal top-left to bottom-right
    [2, 4, 6]  // diagonal top-right to bottom-left
];

// ========== HANDLE CELL CLICK ==========
function cellClick(event) {
    const cell = event.target;
    const index = cell.id.replace("item", "") - 1; // "item1" → 0, "item2" → 1 ...

    // Stop if: game is over, cell is already filled, or cell is winning cell
    if (!gameActive || gameBoard[index] !== "" || cell.classList.contains("winning-game-cell")) {
        return;
    }

    // Place the current player's mark
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;

    // Check if someone won
    checkWinner();

    // Switch turn to the other player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// ========== CHECK FOR WINNER OR TIE ==========
function checkWinner() {
    let roundWon = false;

    // Loop through all winning combinations
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = gameBoard[condition[0]];
        const cellB = gameBoard[condition[1]];
        const cellC = gameBoard[condition[2]];

        // If any cell is empty, skip this combination
        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }

        // If all three cells have the same value → winner!
        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            highlightWinningCells(condition);
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
        gameActive = false;
        return;
    }

    // If no winner and board is full → tie
    if (!gameBoard.includes("")) {
        statusText.textContent = "It's a Tie! 🤝";
        gameActive = false;
        return;
    }

    // Update status text to show whose turn it is
    statusText.textContent = `Tic Tac Toe - ${currentPlayer}'s Turn`;
}

// ========== HIGHLIGHT WINNING CELLS ==========
function highlightWinningCells(winningCombo) {
    for (let i = 0; i < winningCombo.length; i++) {
        const cellIndex = winningCombo[i];
        const cell = document.getElementById(`item${cellIndex + 1}`);
        cell.classList.add("winning-game-cell");
    }
}

// ========== RESTART THE GAME ==========
function restartGame() {
    currentPlayer = "X";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    statusText.textContent = "Tic Tac Toe - X's Turn";

    // Clear all cells and remove winning highlight
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("winning-game-cell");
    });
}

// ========== ADD EVENT LISTENERS ==========
cells.forEach(cell => cell.addEventListener("click", cellClick));
restartBtn.addEventListener("click", restartGame);

