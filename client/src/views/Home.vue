
<template>
  <div
    v-if="board"
    class="home"
  >
    //the render of 3x3 grid with square components
    <v-container class="grey lighten-5 square-container fluid ma-0 pa-0">
      <v-row
        dense
        no-gutters
      >
        <v-col width="100">
          <Square
            :id="0"
            :value="board[0]"
            @square-click="squareClick"
          />
        </v-col>
        <v-col width="100">
          <Square
            :id="1"
            :value="board[1]"
            @square-click="squareClick"
          />
        </v-col>
        <v-col width="100">
          <Square
            :id="2"
            :value="board[2]"
            @square-click="squareClick"
          />
        </v-col>
      </v-row>
      <v-row
        dense
        no-gutters
      >
        <v-col width="100">
          <Square
            :id="3"
            :value="board[3]"
            @square-click="squareClick"
          />
        </v-col>
        <v-col width="100">
          <Square
            :id="4"
            :value="board[4]"
            @square-click="squareClick"
          />
        </v-col>
        <v-col width="100">
          <Square
            :id="5"
            :value="board[5]"
            @square-click="squareClick"
          />
        </v-col>
      </v-row>
      <v-row
        dense
        no-gutters
      >
        <v-col width="100">
          <Square
            :id="6"
            :value="board[6]"
            @square-click="squareClick"
          />
        </v-col>
        <v-col width="100">
          <Square
            :id="7"
            :value="board[7]"
            @square-click="squareClick"
          />
        </v-col>
        <v-col width="100">
          <Square
            :id="8"
            :value="board[8]"
            @square-click="squareClick"
          />
        </v-col>
      </v-row>
    </v-container>

    <div
      class="text-sm-center btn rounded small"
      align="center"
      justify="center"
    >
      <v-btn
        color="normal"
        @click="resetGame"
      >
        RESTART GAME
      </v-btn>
    </div>
    <div class="text-center">
      <v-dialog
        v-model="dialog"
        width="300"
      >
        <v-card>
          <v-card-title class="headline grey lighten-2">
            {{ gameOverText }}
          </v-card-title>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              text
              @click="
                dialog = false;
                resetGame();
              "
            >
              <div class="play-color">
                Play Again
              </div>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
<script>
import Square from "./Square.vue";
export default {
    name: "Home",
    //component for the square
    components: {
        Square: Square
    },

    data() {
        return {
            currentPlayer: "X",
            dialog: false,
            gameOverText: "",

            //array for the board number for each square
            board: null
        };
    },
    //use created to call the fetchBoard function in method
    created() {
        this.fetchBoard();
    },
    methods: {
        //created a fetchBoard function to fetch the board Api from the server and assigned it to the board variable in the template
        fetchBoard() {
            fetch("http://localhost:3000/board")
                .then(response => response.json())
                .then(data => {
                    this.board = data.board;
                    //TODO: use async/await + check response.ok after json()
                });
        },
        async checkGameOver() {
            try {
                const response = await fetch("http://localhost:3000/board/checkGameOver");
                const data = await response.json();

                if (!response.ok) {
                    console.log(`Got error code: ${response.status} Error: ${data.error}`);
                    return;
                }

                //check the return from checkGameOver and set gameOverText
                if (data.gameover) {
                    if (data.winner != null) {
                        this.gameOverText = "Player: " + this.currentPlayer + " Won!";
                    } else if (data.winner == null) {
                        this.gameOverText = "IT'S A DRAW!!!";
                    }
                    this.dialog = true;
                }
            } catch (err) {
                console.log(err)
            }
        },
        async setSquareBackend(squareId, newValue) {
            try {
                const response = await fetch(`http://localhost:3000/board/id/${squareId}`, {
                    method: "PUT",
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                    body: JSON.stringify({ value: newValue })
                });
                const data = await response.json();

                if (!response.ok) {
                    console.log(`Got error code: ${response.status} Error: ${data.error}`);
                    return;
                }

                //set square to the value returned in the response
                const squares = this.board.slice();
                squares[squareId] = data.value;
                this.board = squares;

                //this if statement checks to alternate between player x and player o
                if (this.currentPlayer === "X") {
                    this.currentPlayer = "O";
                } else {
                    this.currentPlayer = "X";
                }
                this.checkGameOver();
            } catch (err) {
                console.log(err)
            }
        },
        //this function resets the game by using a for of loop to access board
        resetGame() {
            //TODO: use async/await + check response.ok
            fetch("http://localhost:3000/board/reset", {
                method: "POST"
            }).then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        this.board = data.board;

                        //this resets the current player x, dialog to false, and game over text
                        this.currentPlayer = "X";
                        this.dialog = false;
                        this.gameOverText = "";
                    })
                }
            })
        },
        //this function checks when a square is clicked. The squareId is a parameter
        squareClick(squareId) {
            //call the api from the server here
            this.setSquareBackend(squareId, this.currentPlayer);
        }
    }
};
</script>

<style lang="scss" scoped>
.home {
  background-color: #000;
  height: 100vh;
  padding: 20%;
}
.square-container,
.grey {
  padding: 30%;
}
.text-sm-center,
.btn {
  padding: 2%;
}
.play-color {
  color: red;
}
</style>