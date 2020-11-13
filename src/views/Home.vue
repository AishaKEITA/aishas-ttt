
<template>
  <div class="home ">
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
    Square: Square
  },

  data() {
    return {
      currentPlayer: "X",
      dialog: false,
      gameOverText: "",
      counter: 0,

      board: [
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
      ]
    };
  },

  methods: {
    checkWin() {
      if (
        this.board[0][0].value === this.currentPlayer &&
        this.board[0][0].value === this.board[0][1].value &&
        this.board[0][1].value === this.board[0][2].value
      ) {
        return true;
      }
      if (
        this.board[1][0].value === this.currentPlayer &&
        this.board[1][0].value === this.board[1][1].value &&
        this.board[1][1].value === this.board[1][2].value
      ) {
        return true;
      }
      if (
        this.board[2][0].value === this.currentPlayer &&
        this.board[2][0].value === this.board[2][1].value &&
        this.board[2][1].value === this.board[2][2].value
      ) {
        return true;
      }
      if (
        this.board[0][0].value === this.currentPlayer &&
        this.board[0][0].value === this.board[1][0].value &&
        this.board[1][0].value === this.board[2][0].value
      ) {
        return true;
      }
      if (
        this.board[0][1].value === this.currentPlayer &&
        this.board[0][1].value === this.board[1][1].value &&
        this.board[1][1].value === this.board[2][1].value
      ) {
        return true;
      }
      if (
        this.board[0][2].value === this.currentPlayer &&
        this.board[0][2].value === this.board[1][2].value &&
        this.board[1][2].value === this.board[2][2].value
      ) {
        return true;
      }
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

    squareClick(squareId) {
      let gameOver = false;
      const clickedSquare = this.board
        .flat()
        .find(square => square.id === squareId);

      if (clickedSquare.value != null) {
        return;
      }
      clickedSquare.value = this.currentPlayer;

      gameOver = this.checkWin();
      if (gameOver) {
        this.gameOverText = "Player: " + this.currentPlayer + " Won!";
        this.dialog = true;
      }

      this.counter++;
      if (!gameOver && this.counter >= 9) {
        this.gameOverText = "IT'S A DRAW!!!";
        this.dialog = true;
        gameOver = true;
      }

      if (this.currentPlayer === "X") {
        this.currentPlayer = "O";
      } else {
        this.currentPlayer = "X";
      }
    },

    resetGame() {
      for (let i = 0; i < this.board.length; i++) {
        for (let j = 0; j < this.board[i].length; j++) {
          this.board[i][j].value = null;
        }
      }
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