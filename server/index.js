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

//using a single dimensional array for the game board
let board = [
    "", "", "",
    "", "", "",
    "", "", "",
];

//utility function
function checkForEqual(value1, value2, value3) {
    return value1 &&
        value1 === value2 &&
        value2 === value3;
}
function checkWin() {
    const rows = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Iterate over array with winning combinations
    for (let i = 0; i < rows.length; i++) {
        const [a, b, c] = rows[i];
        // Check if the game board contains winning combination
        if (checkForEqual(board[a], board[b], board[c])) {
            // Return the winner ("X" or "O")
            return { gameover: true, winner: board[a] };
        }
    }
    // Otherwise do nothing
    return { gameover: false, winner: null };
}

function checkDraw(gameOverObject) {
    if (!gameOverObject.gameover && counter >= 9) {
        return { gameover: true, winner: null };
    }

    return { gameover: false, winner: null };
}

function checkGameOver() {
    let gameOverObject = checkWin();
    if (gameOverObject.gameover === false) {
        gameOverObject = checkDraw(gameOverObject);
    }

    return gameOverObject;
}

//here you can do different request: post, delete, put, patch etc.
//basically for testing your backend on post man, or the web.
//for this line of code we are doing a get request method
//board will be use to get to the endpoint
// Simply get Board API. Gets a list of all the Squares
app.get('/board', (req, res) => {
    res.send({ board: board });
});
//put update data in the server
//here you can set square to see what is clicked on the client
//req.params request a parameter of an id
// Set Square API. Set the value of a single Square
app.put('/board/id/:id', (req, res) => {
    //if the game is over, return error
    let gameOverObject = checkGameOver();
    if (gameOverObject.gameover) {
        return res.status(400).send({error: 'the game is over'});
    }

    //check if square is not found, then return HTTP error
    const id = Number(req.params.id);
    if (id < 0 || id >= board.length) {
        return res.status(400).send({error:'invalid square id'});
    }

    //handle the case where the client does not specify a value
    if (!req.body.value) {
        return res.status(400).send({error: 'value was not specified'});
    }

    //check if the value is X or O, else return HTTP error
    if (req.body.value !== "X" && req.body.value !== "O") {
        return res.status(400).send({error: 'value has to be X or O'});
    }

    //check that the first move in a new game is 'X', else return HTTP error
    if (counter === 0 && req.body.value !== "X") {
        return res.status(400).send({error: 'first move has to be X'});
    }

    //here we check if square is not clicked by accessing the square object property
    if (board[id] != "") {
        return res.status(400).send({error: 'square already has a value'});
    }

    //check that the same player do not play two times, return HTTP error
    if (req.body.value === lastPlayer) {
        return res.status(400).send({error: `it is not player ${lastPlayer}'s turn`});
    }

    board[id] = req.body.value;
    lastPlayer = board[id];
    counter++;

    res.send({ value: board[id] });
});
// Get Square API. Gets the value of a single Square for example, id/1 etc
app.get('/board/id/:id', (req, res) => {
    //check if square is not found, then return HTTP error
    const id = Number(req.params.id);
    if (id < 0 || id >= board.length) {
        return res.status(400).send({error:'invalid square id'});
    }

    res.send(board[id]);
});
//this is a post request for the reset of the board
app.post('/board/reset', (req, res) => {
    for (let i = 0; i < board.length; i++) {
        board[i] = "";
    }
    lastPlayer = null;
    counter = 0;

    res.send({ board: board });
});
//checks if there is a win or a draw
app.get('/board/checkGameOver', (req, res) => {
    let gameOverObject = checkGameOver();

    res.send(gameOverObject);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
