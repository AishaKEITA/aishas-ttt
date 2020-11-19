
<template>
  <div v-if="board" class="home ">
    //the render of 3x3 grid with square components
    <v-container class="grey lighten-5 square-container fluid ma-0 pa-0">
      <v-row dense no-gutters>
        <v-col width="100" v-for="n in 3" :key="n">
          <Square
            v-on:square-click="squareClick"
            v-bind:id="board[0][n - 1].id"
            v-bind:value="board[0][n - 1].value"
          />
        </v-col>
      </v-row>
      <v-row dense no-gutters>
        <v-col width="100" v-for="n in 3" :key="n">
          <Square
            v-on:square-click="squareClick"
            v-bind:id="board[1][n - 1].id"
            v-bind:value="board[1][n - 1].value"
          />
        </v-col>
      </v-row>
      <v-row dense no-gutters>
        <v-col width="100" v-for="n in 3" :key="n">
          <Square
            v-on:square-click="squareClick"
            v-bind:id="board[2][n - 1].id"
            v-bind:value="board[2][n - 1].value"
          />
        </v-col>
      </v-row>
    </v-container>

    <div
      class="text-sm-center btn rounded small"
      align="center"
      justify="center"
    >
      <v-btn @click="resetGame" color="normal">RESTART GAME</v-btn>
    </div>
    <div class="text-center">
      <v-dialog v-model="dialog" width="300">
        <v-card>
          <v-card-title class="headline grey lighten-2">
            {{ gameOverText }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="
                dialog = false;
                resetGame();
              "
            >
              <div class="play-color">Play Again</div>
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
  components: {
    //component for the square
    Square: Square
  },

  data() {
    return {
      currentPlayer: "X",
      dialog: false,
      gameOverText: "",
      counter: 0,

      //array for the board number for each square
      board: null,
    };
  },
  created() {
   this.fetchBoard();
  },
  methods: {
   fetchBoard() {
      fetch("http://localhost:3000/board")
      .then(response => response.json())
      .then(data => {
        this.board = data;
      });
    },
    //this function contains all the possible win conditions
    checkWin() {
      //checking horizontal
      for (let i = 0; i < this.board.length; i++) {
        if (
          this.board[i][0].value === this.currentPlayer &&
          this.board[i][0].value === this.board[i][1].value &&
          this.board[i][1].value === this.board[i][2].value
        ) {
          return true;
        }
      }

      //checking vertical
      for (let i = 0; i < this.board.length; i++) {
        if (
          this.board[0][i].value === this.currentPlayer &&
          this.board[0][i].value === this.board[1][i].value &&
          this.board[1][i].value === this.board[2][i].value
        ) {
          return true;
        }
      }

      //checking diagonal
      if (
        this.board[0][0].value === this.currentPlayer &&
        this.board[0][0].value === this.board[1][1].value &&
        this.board[1][1].value === this.board[2][2].value
      ) {
        return true;
      }
      if (
        this.board[2][0].value === this.currentPlayer &&
        this.board[2][0].value === this.board[1][1].value &&
        this.board[1][1].value === this.board[0][2].value
      ) {
        return true;
      }

      return false;
    },

    //this function checks when a square is clicked. The squareId is a parameter
    squareClick(squareId) {
      let gameOver = false;
      const clickedSquare = this.board
        .flat()
        .find(square => square.id === squareId);

      if (clickedSquare.value != null) {
        return;
      }
      clickedSquare.value = this.currentPlayer;

      //this is the gameover function
      gameOver = this.checkWin();

      //this if statement checks if won the game is won
      if (gameOver) {
        this.gameOverText = "Player: " + this.currentPlayer + " Won!";
        this.dialog = true;
      }
      this.counter++;

      //this if statement checks if the game is draw
      if (!gameOver && this.counter >= 9) {
        this.gameOverText = "IT'S A DRAW!!!";
        this.dialog = true;
        gameOver = true;
      }

      //this if statement checks to alternate between player x and player o
      if (this.currentPlayer === "X") {
        this.currentPlayer = "O";
      } else {
        this.currentPlayer = "X";
      }
    },

    //this function resets the game by using a for of loop to acess board
    resetGame() {
      for (let i = 0; i < this.board.length; i++) {
        for (let j = 0; j < this.board[i].length; j++) {
          this.board[i][j].value = null;
        }
      }
      //this resets the current player x, counter, dialog to false, and game over text
      this.currentPlayer = "X";
      this.counter = 0;
      this.dialog = false;
      this.gameOverText = "";
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