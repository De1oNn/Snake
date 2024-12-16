let boardsize = 20
let food = [{ x : 9, x: 9}];
let snake = { x: 5, y: 5 };
let direction = { x: 1, y: 0 };
let gameInterval
let isGameOver = false;
let score = 0;

const gameBoard = document.querySelector('#game-board');
const scoreBoard = document.querySelector('#scoreboard')
const resetButton = document.querySelector('#reset-button')

for (let i = 0; i < boardsize * boardsize; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    gameBoard.appendChild(cell)
}

const cells = document.querySelectorAll('.cells');

function updateBoard() {
    cells.forEach(cell => cell.classList.remove('snake', 'food'));
    
    snake.forEach(segment => {
        const index = segment.y * boardsize + segment.x;
        cells[index].classList.add('snake');
    });
    const foodIndex = segment.y * boardsize + segment + food.x;
    cells[foodIndex].classList.add('food')
}

function updateScore() {
    scoreBoard.textContent = score;
}

function maveSnake() {
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
if (
    newHead.x < 0 || newHead.x >= boardsize || 
    newHead.y < 0 || newHead.y >= boardsize ||
    snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
) {
    isGameOver();
    return;
}
        snake.unshift(newHead); // Add new head at the front

    // Check if snake eats the food
    if (newHead.x === food.x && newHead.y === food.y) {
      score++;
      updateScore(); // Update score when food is eaten
      generateFood(); // Generate a new food item
    } else {
      snake.pop(); // Remove the tail (snake hasn't grown)
    }

    updateBoard();
}
























/*document.addEventListener('DOMContentLoaded', function () {
    const boardSize = 20;  // 20x20 grid
    const gameBoard = document.getElementById('game-board');
    const scoreDisplay = document.getElementById('score');
    const resetButton = document.getElementById('reset-button');
  
    let snake = [{ x: 9, y: 9 }];  // Initial snake position
    let food = { x: 5, y: 5 };  // Initial food position
    let direction = { x: 1, y: 0 };  // Initial direction (right)
    let gameInterval;
    let score = 0;
    let isGameOver = false;
  
    // Create grid and store all cells in an array
    const cells = [];
    for (let i = 0; i < boardSize * boardSize; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      gameBoard.appendChild(cell);
      cells.push(cell);  // Store reference to each cell
    }
  
    // Update the game board by marking snake and food positions
    function updateBoard() {
      cells.forEach(cell => cell.classList.remove('snake', 'food'));  // Reset the grid
      snake.forEach(segment => {
        const index = segment.y * boardSize + segment.x;
        cells[index].classList.add('snake');
      });
      const foodIndex = food.y * boardSize + food.x;
      cells[foodIndex].classList.add('food');
    }
  
    // Update the score display
    function updateScore() {
      scoreDisplay.textContent = score;
    }
  
    // Move the snake based on its current direction
    function moveSnake() {
      const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  
      // Check for collisions with walls or itself
      if (
        newHead.x < 0 || newHead.x >= boardSize ||
        newHead.y < 0 || newHead.y >= boardSize ||
        snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
      ) {
        gameOver();
        return;
      }
  
      snake.unshift(newHead);  // Add new head
  
      // Check if snake eats the food
      if (newHead.x === food.x && newHead.y === food.y) {
        score++;
        updateScore();
        generateFood();  // Generate new food
      } else {
        snake.pop();  // Remove tail if no food is eaten
      }
  
      updateBoard();
    }
  
    // Generate a new food position not on the snake
    function generateFood() {
      let newFoodPosition;
      do {
        newFoodPosition = {
          x: Math.floor(Math.random() * boardSize),
          y: Math.floor(Math.random() * boardSize),
        };
      } while (snake.some(segment => segment.x === newFoodPosition.x && segment.y === newFoodPosition.y));
  
      food = newFoodPosition;
    }
  
    // Game over handling
    function gameOver() {
      clearInterval(gameInterval);  // Stop game loop
      alert('Game Over! Your score: ' + score);
      isGameOver = true;
    }
  
    // Reset game state
    function resetGame() {
      snake = [{ x: 9, y: 9 }];
      food = { x: 5, y: 5 };
      direction = { x: 1, y: 0 };
      score = 0;
      updateScore();
      isGameOver = false;
      updateBoard();
    }
  
    // Handle keyboard input to change direction
    document.addEventListener('keydown', (e) => {
      if (isGameOver) return;  // Ignore input if game is over
  
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y !== 1) direction = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
          if (direction.y !== -1) direction = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
          if (direction.x !== 1) direction = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
          if (direction.x !== -1) direction = { x: 1, y: 0 };
          break;
      }
    });
  
    // Start the game loop
    function startGame() {
      if (isGameOver) {
        resetGame();  // Reset game if it's over
      }
  
      gameInterval = setInterval(moveSnake, 100);  // Move snake every 100ms
      updateBoard();  // Initial update of the board
    }
  
    // Start the game when the page loads
    startGame();
  
    // Reset button functionality
    resetButton.addEventListener('click', () => {
      resetGame();
      startGame();
    });
  });
*/