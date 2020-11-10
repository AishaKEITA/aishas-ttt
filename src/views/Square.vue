<template>
  <div class="square">
    <v-card @click="squareEmit" class="pa-2 square-cell" outlined tile>
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
  },
  created() {
    //console.log(this.num);
  }
};
</script>
<style lang="scss" scoped>
</style>