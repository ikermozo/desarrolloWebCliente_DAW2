//Almacenar el estado de la partida
let gameState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// Combinaciones para ganar
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Tablero con createElement y appendChild
function createBoard() {
    const gameBoard = document.getElementById('game-board');
    
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        
        // Dataset para identificar cada celda
        cell.dataset.index = i;
        
        // Evento click
        cell.addEventListener('click', handleCellClick);
        
        gameBoard.appendChild(cell);
    }
}

// Click en celda
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.dataset.index);

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    // Actualizar el estado
    gameState[clickedCellIndex] = currentPlayer;

    // Actualizar visualmente
    clickedCell.textContent = currentPlayer;
    
    //Cambiael color de fondo segun jugador
    if (currentPlayer === 'X') {
        clickedCell.classList.add('player-x');
    } else {
        clickedCell.classList.add('player-o');
    }

    // Verificar resultado
    checkResult();
}

// Verificar victoria o empate
function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
            continue;
        }
        
        if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        document.getElementById('result').textContent = '¡Jugador ' + currentPlayer + ' ha ganado!';
        gameActive = false;
        return;
    }

    // Verificar empate
    if (!gameState.includes('')) {
        document.getElementById('result').textContent = '¡Empate!';
        gameActive = false;
        return;
    }

    // Cambiar turno
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('current-player').textContent = currentPlayer;
}

// Reiniciar con tecla R
document.addEventListener('keydown', function(event) {
    if (event.key === 'r' || event.key === 'R') {
        gameState = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        
        document.getElementById('current-player').textContent = currentPlayer;
        document.getElementById('result').textContent = '';

        const cells = document.querySelectorAll('.cell');
        cells.forEach(function(cell) {
            cell.textContent = '';
            cell.classList.remove('player-x', 'player-o');
        });
    }
});

// Cambio de color de fondo al redimensionar
window.addEventListener('resize', function() {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    document.body.style.backgroundColor = randomColor;
});

// Inicializar al cargar la página
window.addEventListener('DOMContentLoaded', function() {
    createBoard();
});