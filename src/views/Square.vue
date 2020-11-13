<template>
  <div>
    <v-card
      @click="squareEmit"
      class="pa-2 square-cell red--text"
      outlined
      tile
    >
      {{ value }}
    </v-card>
  </div>
</template>
<script>
export default {
  name: "Square",
  props: ["id", "value"],
  data() {
    return {};
  },
  methods: {
    squareEmit() {
      this.$emit("square-click", this.id);
    }
  }
};
</script>
<style lang="scss" scoped>
.pa-2,
.square-cell {
  height: 80px;
  color: red;
  font-size: 50px;
  text-align: center;
}
</style>