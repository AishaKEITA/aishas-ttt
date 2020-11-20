
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
        <v-col
          v-for="n in 3"
          :key="n"
          width="100"
        >
          <Square
            :id="board[0][n - 1].id"
            :value="board[0][n - 1].value"
            @square-click="squareClick"
          />
        </v-col>
      </v-row>
      <v-row
        dense
        no-gutters
      >
        <v-col
          v-for="n in 3"
          :key="n"
          width="100"
        >
          <Square
            :id="board[1][n - 1].id"
            :value="board[1][n - 1].value"
            @square-click="squareClick"
          />
        </v-col>
      </v-row>
      <v-row
        dense
        no-gutters
      >
        <v-col
          v-for="n in 3"
          :key="n"
          width="100"
        >
          <Square
            :id="board[2][n - 1].id"
            :value="board[2][n - 1].value"
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
            counter: 0,

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
                    this.board = data;
                    //TODO: only assign this.board if response.ok
                });
        },
        checkGameOver(){
            fetch("http://localhost:3000/board/checkGameOver")
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    //TODO: only assign this.board if response.ok
                });
        },
        //this function is calling the backend Api to ensure every click on the square is communicating to the server
        setSquareBackend(squareId, newValue) {
            fetch(`http://localhost:3000/board/id/${squareId}`, {
                method: "PUT",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify({ value: newValue })
            }).then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        const square = this.board
                            .flat()
                            .find(square => square.id === squareId);
                        square.value = json.value;

                        //this if statement checks to alternate between player x and player o
                        if (this.currentPlayer === "X") {
                            this.currentPlayer = "O";
                        } else {
                            this.currentPlayer = "X";
                        }
                    })
                }
            })
        },
        //this function resets the game by using a for of loop to access board
        resetGame() {
            fetch("http://localhost:3000/board/reset", {
                method: "POST"
            }).then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        this.board = json;

                        //this resets the current player x, counter, dialog to false, and game over text
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

            //this is the gameover function
            let gameOver = this.checkGameOver();

            //TODO: checks the return from checkGameOver and sets gameOverText
            if (gameOver) { //gameOver.gameover
                //if gameOver.gameover == true, gameOver.winner != null
                this.gameOverText = "Player: " + this.currentPlayer + " Won!";
                this.dialog = true;
                //else if (gameOver.gameover == true, gameOver.winner == null) {
                //  this.gameOverText = "IT'S A DRAW!!!";
                //  this.dialog = true;
                //}
            }
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