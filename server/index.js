const express = require('express')
const app = express() //buidling the express server
const port = 3000

app.get('/', (req, res) => {
  res.send('<h1>Expess server <h1/>')// defining the reuter and sending a result
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})