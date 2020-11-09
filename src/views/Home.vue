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