//required express from the node package
const express = require('express')
//middleware that helps us parse incoming HTTP requests
const bodyParser = require('body-parser');
//allows you to manage access to your API from other domains
const cors = require('cors');
//buidling the express server
const app = express()
const port = 3000
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


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

//here you can do dfferent request: post, delete, put, patch etc.
//basically for testing your backend on post man, web etc.
app.get('/board', (req, res) => {
    res.send(board);// defining the reuter and sending a result
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
