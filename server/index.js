//required express from the node package
const express = require('express');
//allows you to manage access to your API from other domains
const cors = require('cors');
//building the express server
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

let lastPlayer = null;
let counter = 0;

let board = [
    [
        { id: 1, value: null },
        { id: 2, value: null },
        { id: 3, value: null }
    ],
    [
        { id: 4, value: null },
        { id: 5, value: null },
        { id: 6, value: null }
    ],
    [
        { id: 7, value: null },
        { id: 8, value: null },
        { id: 9, value: null }
    ]
];

function checkWin() {
    //checking horizontal
    for (let i = 0; i < board.length; i++) {
        if (
            board[i][0].value != null &&
      board[i][0].value === board[i][1].value &&
      board[i][1].value === board[i][2].value
        ) {
            return { gameover: true, winner: board[i][0].value };
        }
    }

    //checking vertical
    for (let i = 0; i < board.length; i++) {
        if (
            board[0][i].value != null &&
      board[0][i].value === board[1][i].value &&
      board[1][i].value === board[2][i].value
        ) {
            return { gameover: true, winner: board[0][i].value };
        }
    }

    //checking diagonal
    if (
        board[0][0].value != null &&
    board[0][0].value === board[1][1].value &&
    board[1][1].value === board[2][2].value
    ) {
        return { gameover: true, winner: board[0][0].value };
    }
    if (
        board[2][0].value != null &&
    board[2][0].value === board[1][1].value &&
    board[1][1].value === board[0][2].value
    ) {
        return { gameover: true, winner: board[2][0].value };
    }

    return { gameover: false, winner: null };
}

function checkDraw(gameOver) {
    if (!gameOver && counter >= 9) {
    }
}

//here you can do different request: post, delete, put, patch etc.
//basically for testing your backend on post man, or the web.
//for this line of code we are doing a get request method
//board will be use to get to the endpoint
app.get('/board', (req, res) => {
    res.send(board);
});
//put update data in the server
//here you can set square to see what is clicked on the client
//req.params request a parameter of an id
app.put('/board/id/:id', (req, res) => {
    const id = Number(req.params.id);
    const square = board.flat().find(ele => ele.id === id);

    //handle the case where the client does not specify a value
    if (!req.body.value) {
        return res.status(400).send('value was not specified');
    }

    //check if the value is X or O, else return HTTP error
    if (req.body.value !== "X" && req.body.value !== "O") {
        return res.status(400).send('value has to be X or O');
    }

    //check if square is not found, then return HTTP error
    if (!square) {
        return res.status(400).send('invalid square id');
    }

    //here we check if square is not clicked by accessing the square object property
    if (square.value != null) {
        return res.status(400).send('square already has a value');
    }

    //check that the same player do not play two times, return HTTP error
    if (req.body.value === lastPlayer) {
        return res.status(400).send(`it is not player ${lastPlayer}'s turn`);
    }

    //TODO: if the game is over, return error
    square.value = req.body.value;
    lastPlayer = square.value;
    counter++;

    res.send(square);
});
//here you can get a single square from the board Api a parameter of for example, id :1 etc.
app.get('/board/id/:id', (req, res) => {
    const id = Number(req.params.id);
    const square = board.flat().find(ele => ele.id === id);
    //TODO: check if square is found, else return HTTP error
    res.send(square);
});
//this is a post request for the reset of the board
app.post('/board/reset', (req, res) => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            board[i][j].value = null;
        }
    }
    lastPlayer = null;

    res.send(board);
});

//who is the winner? is there a winner? if not, is there a draw?
app.get('/board/checkGameOver', (req, res) => {
    let aisha = checkWin();
    console.log(aisha);
    //TODO: if gameover: false, (no one won), call checkDraw(aisha.gameover) (which should return gameover: true, winner: null, if it is a draw)
    res.send(aisha);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
