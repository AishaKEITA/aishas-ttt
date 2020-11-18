<template>
  <div class="about">
    <v-card class="mx-auto" max-width="mx-auto" tile>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>TIC TAC TOE</v-list-item-title>
          <v-list-item-subtitle>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            nesciunt quae assumenda neque. Eligendi debitis beatae ipsum.
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>RULES FOR TIC TAC TOE</v-list-item-title>
          <v-list-item-subtitle class="numbering">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            nesciunt quae assumenda neque. Eligendi debitis beatae
            ipsum.</v-list-item-subtitle
          >
          <v-list-item-subtitle>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            nesciunt quae assumenda neque. Eligendi debitis beatae
            ipsum.</v-list-item-subtitle
          >
          <v-list-item-subtitle>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            nesciunt quae assumenda neque. Eligendi debitis beatae
            ipsum.</v-list-item-subtitle
          >
          <v-list-item-subtitle>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            nesciunt quae assumenda neque. Eligendi debitis beatae
            ipsum.</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>

      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title>HOW CAN I WIN TIC TAC TOE?</v-list-item-title>
          <v-list-item-subtitle>
            Lorem ipsum dolor line text Lorem ipsum dolor sit amet,
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            Lorem ipsum dolor line text Lorem ipsum dolor sit amet,
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            Lorem ipsum dolor line text Lorem ipsum dolor sit amet,
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            consectetur adipiscing elit.
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <v-card height="200">
      <v-footer absolute class="font-weight-medium">
        <v-col class="text-center" cols="12">
          {{ new Date().getFullYear() }} —
          <strong>Designed by Aisha Keita</strong>
        </v-col>
      </v-footer>
    </v-card>
  </div>
</template>
<style lang="scss" scoped>
.about {
  background-color: #000;
  height: 100vh;
  padding: 10%;
  cursor: pointer;
}
</style>