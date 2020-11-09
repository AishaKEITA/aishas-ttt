<template>
  <div class="square">
    <v-card @click="printNum" class="pa-2 square-cell" outlined tile>{{
      this.value
    }}</v-card>
  </div>
</template>

<script>
export default {
  name: "Square",
  props: ["num"],
  data() {
    return {
      value: null
    };
  },
  methods: {
    printNum() {
      console.log(this.num);
      console.log(this.value);
      this.value = "O";
    }
  },
  created() {
    //console.log(this.num);
  }
};
</script>
<style lang="scss" scoped>
</style>