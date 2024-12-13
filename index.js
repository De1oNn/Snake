document.addEventListener('DOMContentLoaded', function () {
    const boardSize = 20; // 20x20 grid
    let snake = [{ x: 10, y: 10 }]; // Snake starting position (head at (9, 9))
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
      // Clear the board by removing snake and food from the grid
      cells.forEach(cell => cell.classList.remove('snake', 'food'));
  
      // Mark the snake on the grid
      snake.forEach(segment => {
        const index = segment.y * boardSize + segment.x;
        cells[index].classList.add('snake');
      });
  
      // Mark the food on the grid
      const foodIndex = food.y * boardSize + food.x;
      cells[foodIndex].classList.add('food');
    }
  
    // Function to move the snake
    function moveSnake() {
      // Calculate the new head position
      const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  
      // Check if the snake hits the wall
      if (
        newHead.x < 0 || newHead.x >= boardSize || 
        newHead.y < 0 || newHead.y >= boardSize ||
        snake.some(segment => segment.x === newHead.x && segment.y === newHead.y) // Check for collision with itself
      ) {
        gameOver();
        return;
      }
  
      // Add the new head to the snake
      snake.unshift(newHead);
  
      // Check if snake eats the food
      if (newHead.x === food.x && newHead.y === food.y) {
        score++;
        generateFood();
      } else {
        // Remove the last segment of the snake (tail)
        snake.pop();
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
      alert('Game Over! Your score: ' + score);
      isGameOver = true;
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
        // Reset the game state if the game is over
        snake = [{ x: 9, y: 9 }];
        food = { x: 5, y: 5 };
        direction = { x: 1, y: 0 };
        score = 0;
        isGameOver = false;
      }
  
      gameInterval = setInterval(moveSnake, 100); // Move snake every 100ms
      updateBoard(); // Initial board update
    }
  
    // Start the game when the page loads
    startGame();
  });