let a = 1
console.log(a);

console.log("help");

const gameContainer = document.querySelector("#gameContainer");
const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const gamescore = document.querySelector("#score");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "red"
const snakeColor = "green"
const snakeBorder = "black" 
const foodColor = "red"
const unitSize = 50; 
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
]

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();
createFood();

function gameStart(){};
function nextTick(){};
function clearBoard(){};
function createFood(){
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min))
        return randNum
    }
    randomFood(0, gameWidth - unitSize);
    foodX = randomFood(0, gameWidth - unitSize);
    console.log(foodX);
};
function drawFood(){};
function moveSnake(){};
function drawSnake(){};
function changeDirection(){};
function checkGameOver(){};
function displayGameOver(){};
function resetGame(){};





