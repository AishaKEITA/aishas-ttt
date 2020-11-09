// "HTML"
<template>
  <div class="home">
    <div class="checkWin"></div>
    <div class="checkDraw"></div>
    <v-container class="grey lighten-5">
      <v-row no-gutters>
        <v-col v-for="n in 3" :key="n">
            <Square 
            v-bind:num="board[0][n-1].num"
            v-bind:value="board[0][n-1].value"/>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col v-for="n in 3" :key="n">
            <Square 
            v-bind:num="board[1][n-1].num"
            v-bind:value="board[1][n-1].value"/>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col v-for="n in 3" :key="n">
            <Square 
            v-bind:num="board[2][n-1].num"
            v-bind:value="board[2][n-1].value"/>
        </v-col>
      </v-row>
    </v-container>
    <div class="text-sm-center">
      <v-btn color="primary">RESTART GAME</v-btn>
    </div>
  </div>
</template>

// Javascript
<script>
import Square from "./Square.vue";
export default {
  name: "Home",
  components: {
      Square: Square,
  },
  data() {
    return {
      currentPlayer: "x", // is  between x and o

      board: [
        [   { num: 1, value: null },
            { num: 2, value: null },
            { num: 3, value: null }
        ],   
        [   { num: 4, value: null },
            { num: 5, value: null },
            { num: 6, value: null }
        ],
        [   { num: 7, value: null },
            { num: 8, value: null },
            { num: 9, value: null }
        ]
      ],
      methods: {
        //checkWin()
        //checkDraw() {}
      }
    };
  },
  created() {
    //wins
    // console.log(this.board[0][0],this.board[0][1],this.board[0][2]);//123
    // console.log(this.board[1][0],this.board[1][1],this.board[1][2]);//456
    // console.log(this.board[2][0],this.board[2][1],this.board[2][2]);//789
    // console.log(this.board[0][0],this.board[1][1],this.board[2][2]); //159
    // console.log(this.board[2][2],this.board[1][1],this.board[0][0]);//951
    // console.log(this.board[0][2],this.board[1][1],this.board[2][0]); //358
    // console.log(this.board[2][0],this.board[1][1],this.board[0][2]);//758
    // console.log(this.board[0][2],this.board[0][1],this.board[0][0]);//321
    // console.log(this.board[1][2],this.board[1][1],this.board[1][0]);//654
    // console.log(this.board[2][2],this.board[2][1],this.board[2][0]);//951
    // if (this.currentPlayer === this.board[0][0] ||
    //     this.board[0][1] || this.board[0][2]) {
    // } else if (currentPlayer === this.board[1][0] ||
    //   this.board[1][1] || this.board[1][2]
    // ) {
    //   return youWonMessag;
    // } else if (
    //   currentPlayer === this.board[2][0] ||
    //   this.board[2][1] ||this.board[2][2]
    // ) {
    //   return youWonMessag;
    // } else if (
    //   currentPlayer === this.board[0][0] ||
    //   this.board[1][1] ||this.board[2][2]
    // ) {
    //   return youWonMessag;
    // } else if (this.board[0][2] || this.board[1][1] || this.board[2][0]) {
    //   return youWonMessag;
    // } else if (
    //   currentPlayer === this.board[2][0] ||
    //   this.board[1][1] ||
    //   this.board[0][2]
    // ) {
    //   return youWonMessag;
    // } else if (
    //   currentPlayer === this.board[0][2] ||
    //   this.board[0][1] ||
    //   this.board[0][0]
    // ) {
    //   return youWonMessag;
    // } else if (
    //   currentPlayer === this.board[1][2] ||
    //   this.board[1][1] ||
    //   this.board[1][0]
    // ) {
    //   return youWonMessag;
    // } else if (
    //   currentPlayer === this.board[2][2] ||
    //   this.board[2][1] ||
    //   this.board[2][0]
    // ) {
    //   return youWonMessag;
    // } else {
    //   draw;
    // }
  }
};
</script>

// Styling
<style lang="scss" scoped>
// .card-border {
//   border: 3px solid black;
//   border-top: none;
//   border-left: none;
//   //border-right: none;
//   border-bottom: none;
//   font-size: 30px;
//   text-align: center;
//   cursor: pointer;
//   padding: 20px;
// }

// .red {
//   border-bottom-style: none;
// }
// .text-sm-center {
//   font-size: 54px;
// }
</style>