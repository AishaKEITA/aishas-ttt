<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div
        style="cursor: pointer"
        @click="$router.push('/').catch(err => {})"
        class="d-flex align-center"
      >
        <v-icon class="mr-3" size="40">mdi-pound</v-icon>

        <span style="font-size: 28px">Aisha's Tic Tac Toe</span>
      </div>

      <v-spacer></v-spacer>
      <v-btn @click="$router.push('/').catch(() => {})" text>
        <span>Home</span>
        <!-- <v-icon>mdi-open-in-new</v-icon> -->
      </v-btn>
      <v-btn class="ml-2" @click="$router.push('/about').catch(() => {})" text>
        <span>About</span>
        <!-- <v-icon>mdi-open-in-new</v-icon> -->
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  })
};
</script>
<style lang="scss" scoped>
html {
  overflow-y: hidden !important;
}
* {
  box-sizing: border-box !important;
}
</style>