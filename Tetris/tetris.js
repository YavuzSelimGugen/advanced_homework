const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");
var gameSpeed = 800;
var score = 0;
var level = 0;
var pScore = document.getElementById('score')
var pLevel = document.getElementById('level')
const ROW = 20;
const COL = COLUMN = 10;
const SQ = squareSize = 20;
// color of an empty square
const VACANT = ["#999999", "#bfbfbf"];

// draw a square
function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * SQ, y * SQ, SQ, SQ);

    ctx.strokeStyle = "BLACK";
    ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
}

// create the board

var board = [];
function constructBoard() {
    for (r = 0; r < ROW; r++) {
        board[r] = [];
        for (c = 0; c < COL; c++) {
            if (c % 2 == 0) {
                board[r][c] = VACANT[0];
            } else {
                board[r][c] = VACANT[1];
            }

        }
    }
}



// draw the board
function drawBoard() {
    //console.log("===DrawBoard F===");
    //console.log(board);
    //console.log("===DrawBoard F===");
    for (r = 0; r < ROW; r++) {
        for (c = 0; c < COL; c++) {
            drawSquare(c, r, board[r][c]);
        }
    }
}



// the pieces and their colors

const PIECES = [
    [Z, "#b300b3"],
    [S, "#66cc00"],
    [T, "teal"],
    [O, "violet"],
    [L, "#0066ff"],
    [I, "yellow"],
    [J, "#e34234"]
];


// The Object Piece

class Piece {
    constructor(tetromino, color) {

        this.tetromino = tetromino;
        this.color = color;
        this.tetrominoN = 0; // we start from the first pattern
        this.activeTetromino = this.tetromino[this.tetrominoN];
        // we need to control the pieces
        this.x = 3;
        this.y = -2;
    }

    fill(color) {
        if (color[0] == VACANT[0]) {
            for (r = 0; r < this.activeTetromino.length; r++) {
                for (c = 0; c < this.activeTetromino.length; c++) {
                    // we draw only occupied squares
                    if (this.activeTetromino[r][c]) {
                        if ((this.x + c) % 2 == 0) {
                            drawSquare(this.x + c, this.y + r, color[0]);
                        } else {
                            drawSquare(this.x + c, this.y + r, color[1]);
                        }
                    }
                }
            }
        } else {
            for (r = 0; r < this.activeTetromino.length; r++) {
                for (c = 0; c < this.activeTetromino.length; c++) {
                    // we draw only occupied squares
                    if (this.activeTetromino[r][c]) {
                        drawSquare(this.x + c, this.y + r, color);
                    }
                }
            }
        }
    }

    draw() {
        this.fill(this.color);
    }
    unDraw() {
        this.fill(VACANT);
    }

    moveDown() {
        if (!this.collision(0, 1, this.activeTetromino)) {

            this.unDraw();
            this.y++;
            this.draw();
        } else {
            // we lock the piece and generate a new one
            //console.log("Gonna Lock");
            this.lock();
            p = randomPiece();
        }
    }

    moveRight() {
        if (!this.collision(1, 0, this.activeTetromino)) {
            this.unDraw();
            this.x++;
            this.draw();
        }
    }
    moveLeft() {
        if (!this.collision(-1, 0, this.activeTetromino)) {
            this.unDraw();
            this.x--;
            this.draw();
        }
    }
    rotate() {
        let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
        let kick = 0;

        if (this.collision(0, 0, nextPattern)) {
            if (this.x > COL / 2) {
                // it's the right wall
                kick = -1; // we need to move the piece to the left
            } else {
                // it's the left wall
                kick = 1; // we need to move the piece to the right
            }
        }

        if (!this.collision(kick, 0, nextPattern)) {
            this.unDraw();
            this.x += kick;
            this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length; // (0+1)%4 => 1
            this.activeTetromino = this.tetromino[this.tetrominoN];
            this.draw();
        }
    }

    lock() {
        top:
        for (r = 0; r < this.activeTetromino.length; r++) {
            for (c = 0; c < this.activeTetromino.length; c++) {
                // we skip the vacant squares
                if (!this.activeTetromino[r][c]) {
                    continue;
                }
                // pieces to lock on top = game over
                if (this.y + r < 0) {
                    
                    //alert("Game Over");
                    // stop request animation frame
                    gameOver = true;
                    gameOverF();
                    break top;
                }
                // we lock the piece
                //console.log((this.y + r)+"|"+(this.x + c)+"="+", "+this.color);
                // !!!HATA BURADA BOARD DEĞİŞMİYOR!!!
                board[this.y + r][this.x + c] = this.color;
                //console.log("===LOCK===");
                //console.log(board[this.y + r][this.x + c]);
                //console.log("===LOCK===");
            }
        }
        //console.log("===LOCK===");
        //console.log(board);
        //console.log("===LOCK===");
        // remove full rows

        let y = this.y;
        for (r = 0; r < ROW; r++) {
            let isRowFull = true;
            for (c = 0; c < COL; c++) {
                isRowFull = isRowFull && (board[r][c] != VACANT[0] && board[r][c] != VACANT[1]);
            }
            if (isRowFull) {
                console.log("ROW FULL")
                // if the row is full
                // we move down all the rows above it
                for (y = r; y > 1; y--) {
                    for (c = 0; c < COL; c++) {
                        board[y][c] = board[y - 1][c];
                    }
                }
                // the top row board[0][..] has no row above it
                for (c = 0; c < COL; c++) {
                    if (c % 2 == 0) {
                        board[0][c] = VACANT[0];
                    } else {
                        board[0][c] = VACANT[1];
                    }

                }
                score += 10;
                if (score % 50 == 0) {
                    gameSpeed = gameSpeed / 1.3;
                    level++;
                }
                pScore.innerHTML = "Score: " + score;
                pLevel.innerHTML = "Level: " + level;
            }
        }

        // update the board
        drawBoard();

    }

    collision(x, y, piece) {
        for (r = 0; r < piece.length; r++) {
            for (c = 0; c < piece.length; c++) {
                // if the square is empty, we skip it
                if (!piece[r][c]) {

                    continue;
                }
                // coordinates of the piece after movement
                let newX = this.x + c + x;
                let newY = this.y + r + y;
                // console.log(newX + ", " + newY + "\n");

                // conditions
                if (newX < 0 || newX >= COL || newY >= ROW) {

                    return true;
                }
                // skip newY < 0; board[-1] will crush our game
                if (newY < 0) {

                    continue;
                }
                // check if there is a locked piece already in place
                if (board[newY][newX] != VACANT[0] && board[newY][newX] != VACANT[1]) {

                    return true;
                }
            }
        }
        return false;
    }
}

// generate random pieces

function randomPiece() {
    let r = randomN = Math.floor(Math.random() * PIECES.length) // 0 -> 6
    let piece = new Piece(PIECES[r][0], PIECES[r][1]);
    return piece;
}

let p = randomPiece();



// CONTROL the piece
document.addEventListener("keydown", CONTROL);

function CONTROL(event) {
    if (event.keyCode == 37) {
        p.moveLeft();
        //dropStart = Date.now();
    } else if (event.keyCode == 38) {
        p.rotate();
        //dropStart = Date.now();
    } else if (event.keyCode == 39) {
        p.moveRight();
        //dropStart = Date.now();
    } else if (event.keyCode == 40) {
        p.moveDown();
    }
}
// For mobile:
var touchX;
var touchY;
var touchId;

document.getElementById('tetris').addEventListener('touchstart', function (e) {
    // e.preventDefault();
    touchX = e.touches[0].pageX;
    touchY = e.touches[0].pageY;
    touchId = e.touches[0].identifier;
});

document.getElementById('tetris').addEventListener('touchend', function (e) {
    // e.preventDefault();
    var touchEndX;
    var touchEndY;
    var touch = e.changedTouches.item(0);
    try {
        touchEndX = touch.pageX;
        touchEndY = touch.pageY;
    } catch (err) {
        console.log(arr);
        return;
    }

    var difX = (touchEndX - touchX);
    var difY = (touchEndY - touchY);
    // console.log("DiffX: "+difX)
    // console.log("DiffY: "+difY)
    if (difX > 50) {
        p.moveRight();
    }
    else if (difX < -50) {
        p.moveLeft();
    }
    else if (difY < -50) {
        p.moveDown();
        p.moveDown();
        p.moveDown();
    }
    else if (difX == 0 && difY == 0) {
        p.rotate();
    }
})

// drop the piece every 1sec

let dropStart = Date.now();
let gameOver = false;
function drop() {
    let now = Date.now();
    let delta = now - dropStart;
    if (delta > gameSpeed) {
        p.moveDown();
        dropStart = Date.now();
        //console.log(gameOver)
    }
    if (!gameOver) {
        console.log("gameover değil")
        requestAnimationFrame(drop);
    }
}
function startGame() {
    if (nameInput.value == "") {
        t1 = { background: ["red", "purple"] };
        nameInput.animate(t1, {
            // timing options
            duration: 1000,
            iterations: 3
        })

    } else {
        document.getElementById("gameMenu").style.display = 'none';
        document.getElementById("stats").style.display = 'block';
        document.getElementById("referans").style.display = 'none';
        cvs.style.display = 'block';
        gameOver = false;
        gameSpeed = 800;
        score = 0;
        level = 1;
        pScore.innerHTML = "Score: " + score;
        pLevel.innerHTML = "Level: " + level;
        constructBoard()
        drawBoard();
        drop();
    }

}
function gameOverF() {
    var r = confirm("Restart game?!\nEither OK or Cancel.");
    if (r == true) {
        startGame();
    } else {
        document.getElementById("gameMenu").style.display = 'block';
        cvs.style.display = 'none';
        console.log("bitti")
    }
}
