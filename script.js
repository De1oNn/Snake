document.addEventListener('DOMContentLoaded', function () {
    const boardSize = 20; // 20x20 grid
    let snake = [{ x: 9, y: 9 }]; // Snake starting position (head at (9, 9))
    let food = { x: 5, y: 5 }; // Starting food position
    let direction = { x: 1, y: 0 }; // Initial direction (moving right)
    let gameInterval; // Store the interval ID
    let isGameOver = false;
    let score = 0;
  
    // Get the game board element
    const gameBoard = document.getElementById('game-board');
  
    // Create the grid
    for (let i = 0; i < boardSize * boardSize; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      gameBoard.appendChild(cell);
    }
  
    // Get all cells of the grid
    const cells = document.querySelectorAll('.cell');
  
    // Function to update the game board
    function updateBoard() {
      cells.forEach(cell => cell.classList.remove('snake', 'food'));
  
      snake.forEach(segment => {
        const index = segment.y * boardSize + segment.x;
        cells[index].classList.add('snake');
      });
  
      const foodIndex = food.y * boardSize + food.x;
      cells[foodIndex].classList.add('food');
    }
  
    // Function to move the snake
    function moveSnake() {
      const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  
      // Check if the snake hits the wall or collides with itself
      if (
        newHead.x < 0 || newHead.x >= boardSize ||
        newHead.y < 0 || newHead.y >= boardSize ||
        snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
      ) {
        gameOver();
        return;
      }
  
      snake.unshift(newHead); // Add new head at the front
  
      // Check if snake eats the food
      if (newHead.x === food.x && newHead.y === food.y) {
        score++;
        generateFood(); // Generate a new food item
      } else {
        snake.pop(); // Remove the tail (snake hasn't grown)
      }
  
      updateBoard();
    }
  
    // Function to generate a new food position
    function generateFood() {
      let newFoodPosition;
      do {
        newFoodPosition = {
          x: Math.floor(Math.random() * boardSize),
          y: Math.floor(Math.random() * boardSize)
        };
      } while (snake.some(segment => segment.x === newFoodPosition.x && segment.y === newFoodPosition.y)); // Ensure food is not placed on the snake
  
      food = newFoodPosition;
    }
  
    // Game over function
    function gameOver() {
      clearInterval(gameInterval); // Stop the game loop
      alert('Game Over! Your score: ' + score); // Show game over message
      isGameOver = true;
      
      // Automatically restart after a 2-second delay
      setTimeout(() => {
        resetGame();
        startGame();
      }, 2000); // 2 seconds delay before restarting
    }
  
    // Reset the game state
    function resetGame() {
      snake = [{ x: 9, y: 9 }];
      food = { x: 5, y: 5 };
      direction = { x: 1, y: 0 };
      score = 0;
      isGameOver = false;
    }
  
    // Handle keyboard input to change snake direction
    document.addEventListener('keydown', (e) => {
      if (isGameOver) return;
  
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
        // Don't restart immediately unless game is over
        resetGame();
      }
      
      gameInterval = setInterval(moveSnake, 100); // Move snake every 100ms
      updateBoard(); // Initial board update
    }
  
    // Start the game when the page loads
    startGame();
  });