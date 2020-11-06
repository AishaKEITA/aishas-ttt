// "HTML"
<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm"></div>
        <div class="col-sm"></div>
      </div>
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm"></div>
        <div class="col-sm"></div>
      </div>
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm"></div>
        <div class="col-sm"></div>
      </div>
    </div>
    <div class="col -md- 12 text-center">
      <button type="button" class="btn btn-primary btn-lg">RESTART GAME</button>
    </div>
    <!-- <div><v-btn depressed color="primary"> RESTART GAME</v-btn></div> -->
  </div>
</template>

// Javascript
<script>
export default {
  name: "Home",
  data() {
    return {
      currentPlayer: "x", // is  between x and o
      draw: "", // no win or after everything is click
      board: [
        //an array of an array and each array is represing a row
        ["1", "2", "3"], //the  values inside the array is representing a column
        ["4", "5", "6"],
        ["7", "8", "9"]
      ],
      methods: {
          //for loop 
      }
    };
  },
  created() {
    console.log(this.board[2][2]);
    console.log(this.board[1][1]);
  }
};
</script>

// Styling
<style lang="scss" scoped>
.container,
.row {
  background-color: lightgray;
}

.col-sm {
  border: 5px solid black;
  //border-top-style: none;
  padding: 10%;
  font-size: 30px;
  text-align: center;
  cursor: pointer;
  //border-bottom-width: 0;
}

.home {
  padding: 20px;
  background-color: white;
  height: 100vh;
}

.btn-primary,
button {
  background-color: #bde;
  padding: 1%;
  font-size: 34px;
}
</style>