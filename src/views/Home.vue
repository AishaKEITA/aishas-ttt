// "HTML"
<template>
  <div class="home">
    <v-container class="grey lighten-5">
      <v-row no-gutters>
        <v-col v-for="n in 3" :key="n">
          <Square
            v-on:square-click="squareClick"
            v-bind:id="board[0][n - 1].id"
            v-bind:value="board[0][n - 1].value"
          />
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col v-for="n in 3" :key="n">
          <Square
            v-on:square-click="squareClick"
            v-bind:id="board[1][n - 1].id"
            v-bind:value="board[1][n - 1].value"
          />
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col v-for="n in 3" :key="n">
          <Square
            v-on:square-click="squareClick"
            v-bind:id="board[2][n - 1].id"
            v-bind:value="board[2][n - 1].value"
          />
        </v-col>
      </v-row>
    </v-container>
    <div class="text-sm-center btn" align="center" justify="center">
      <v-btn color="primary round">RESTART GAME</v-btn>
    </div>
  </div>
</template>

// Javascript
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

      board: [
        [
          { id: 1, value: null }, //is either "X" or "O
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
      //check horizontal - 3 if statements
      //check vertical - 3 if statements
      //check diag - 2 if statements
    },
    squareClick(squareId) {
      const clickedSquare = this.board
        .flat()
        .find(square => square.id === squareId);
      console.log(clickedSquare);
      clickedSquare.value = this.currentPlayer;

      //checkWin();
      // currentPlayer won!!!!
      ////checkDraw();

      if (this.currentPlayer === "X") {
        this.currentPlayer = "O";
      } else {
        this.currentPlayer = "X";
      }
    }
  }
};
</script>

// Styling
<style lang="scss" scoped>
.text-sm-center {
}
</style>