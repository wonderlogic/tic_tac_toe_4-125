document.addEventListener("DOMContentLoaded", function() {
    // Initialize the board and current player
    let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    let currentPlayer = 'X';

    // Get all the cells
    const cells = document.querySelectorAll('.cell');

    // Loop through each cell to add a click event listener
    cells.forEach(function(cell, index) {
        cell.addEventListener('click', function() {
            if (cell.textContent === '') {
                cell.textContent = currentPlayer;
                cell.dataset.content = currentPlayer;

                const row = Math.floor(index / 3);
                const col = index % 3;
                board[row][col] = currentPlayer;

                // Check if the current player wins
                const winningCells = checkWinner(row, col, currentPlayer, board);
                if (winningCells !== null) {
                    for (let i = 0; i < winningCells.length; i++) {
                        // Get the row and column values from the current item in the winningCells array
                        let currentWinningCell = winningCells[i];
                        let row = currentWinningCell[0];
                        let column = currentWinningCell[1];
                    
                        // Calculate the index of the cell in the 1D cells array
                        let indexFor1DArray = (row * 3) + column;
                    
                        // Change the text color of the winning cell to red
                        cells[indexFor1DArray].style.color = 'red';
                    }                    
                    alert(currentPlayer + ' is the winner');
                } else if (isBoardFull(board)) {
                    alert('The match is draw');
                } else {
                    // Change the current player
                    if (currentPlayer === 'X') {
                        currentPlayer = 'O';
                    } else {
                        currentPlayer = 'X';
                    }
                }
            }
        });
    });

    function checkWinner(row, col, player, board) {
        let winningCells = null;

        if (checkRow(row, player, board)) {
            winningCells = [];
            for (let col = 0; col < 3; col++) {
                winningCells.push([row, col]);
            }
        } else if (checkCol(col, player, board)) {
            winningCells = [];
            for (let row = 0; row < 3; row++) {
                winningCells.push([row, col]);
            }
        } else if (checkDiagonals(player, board)) {
            winningCells = [];
            if (board[0][0] === player && board[2][2] === player) {
                winningCells.push([0, 0]);
                winningCells.push([1, 1]);
                winningCells.push([2, 2]);
            } else {
                winningCells.push([0, 2]);
                winningCells.push([1, 1]);
                winningCells.push([2, 0]);
            }
        }

        return winningCells;
    }

    function isBoardFull(board) {
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                if (board[row][col] === '') {
                    return false;
                }
            }
        }
        return true;
    }

    function checkRow(row, player, board) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] !== player) {
                return false;
            }
        }
        return true;
    }

    function checkCol(col, player, board) {
        for (let row = 0; row < 3; row++) {
            if (board[row][col] !== player) {
                return false;
            }
        }
        return true;
    }

    function checkDiagonals(player, board) {
        if ((board[0][0] === player && board[1][1] === player && board[2][2] === player) ||
            (board[0][2] === player && board[1][1] === player && board[2][0] === player)) {
            return true;
        }
        return false;
    }

});