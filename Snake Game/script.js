var board = document.querySelector(".board");
var startbutton = document.querySelector(".btn-start")
var modal = document.querySelector(".modal")
var startGameModal = document.querySelector(".start-game")
var overGameModal = document.querySelector(".game-over")
var restartButton = document.querySelector(".btn-restart")

const highScoreElem = document.querySelector("#high-score")
const scoreElem = document.querySelector("#score")
const timeElem = document.querySelector("#time")


var blockWidth = 40;
var blockHeight = 40;

let highScore = localStorage.getItem("highScore") || 0
let score = 0
let time = `00:00`;

highScoreElem.innerText = highScore

var cols = Math.floor(board.clientWidth / blockWidth);
var rows = Math.floor(board.clientHeight / blockHeight);

let intervalId = null;
let timeIntervalId = null;
let blocks = []
let snake = [
    {
        x: 1, y: 3
    },
    {
        x: 1, y: 4
    },
]
let direction = 'down'
let food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement("div");
        block.classList.add("block");
        blocks[`${row}-${col}`] = block;
        board.appendChild(block);
    }
}

function render() {
    let head = null;

    blocks[`${food.x}-${food.y}`].classList.add("food")


    if (direction === 'left') {
        head = { x: snake[0].x, y: snake[0].y - 1 }
    }
    else if (direction === 'right') {
        head = { x: snake[0].x, y: snake[0].y + 1 }

    }
    else if (direction === 'down') {
        head = { x: snake[0].x + 1, y: snake[0].y }

    }
    else if (direction === 'up') {
        head = { x: snake[0].x - 1, y: snake[0].y }
    }
    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
        clearInterval(intervalId)
        modal.style.display = "flex"
        startGameModal.style.display = "none"
        overGameModal.style.display = "flex"
        return;
    }

    //food comsume logix
    if (head.x === food.x && head.y == food.y) {
        blocks[`${food.x}-${food.y}`].classList.remove("food")
        food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }
        blocks[`${food.x}-${food.y}`].classList.add("food")
        snake.unshift(head)

        score += 5
        scoreElem.innerText = score

        if (score > highScore) {
            highScore = score
            localStorage.setItem("highsScore", highScore.toString())
        }

    }

    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill")

    });
    snake.unshift(head)
    snake.pop()
    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.add("fill")

    });
}
// intervalId = setInterval(() => {
//     render()
// }, 500);

startbutton.addEventListener("click", () => {
    modal.style.display = "none";
    intervalId = setInterval(() => {
        render()
    }, 300)
    timeIntervalId = setInterval(() => {
        let [min, sec] = time.split(":").map(Number)
        if (sec == 59) {
            min += 1
            sec = 0
        } else {
            sec += 1
        }

        time = `${min} : ${sec}`
        timeElem.innerText = time
    }, 1000)
})
restartButton.addEventListener("click", restartGame)

function restartGame() {
    blocks[`${food.x}-${food.y}`].classList.remove("food")
    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill")

    });

    Score = 0
    Time = `00:00`
    scoreElem.innerText = score
    timeElem.innerText = time
    highScoreElem.innerText = highScore


    modal.style.display = "none"
    direction = "down"
    snake = [
        {
            x: 1, y: 3
        },
        {
            x: 1, y: 4
        },
    ]
    food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }
    intervalId = setInterval(() => {
        render()
    }, 300)

}

// function restartGame

addEventListener("keydown", (event) => {
    console.log(event.key)
    if (event.key == "ArrowUp") {
        direction = "up"
    } else if (event.key == "ArrowDown") {
        direction = "down"
    }
    else if (event.key == "ArrowLeft") {
        direction = "left"
    }
    else if (event.key == "ArrowRight") {
        direction = "right"
    }
})


