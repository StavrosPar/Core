<template>
   <!-- <v-app light>  nai nai naihg -->
    <v-content  style="padding:0px; " id="allcont">
      <section>
        <v-parallax    src="static/home1.png" height="600"  >
          <v-layout column align-center justify-center class="white--text">
            <!-- <img src="assets/vuetify.png" alt="Vuetify.js" height="200"> -->
           <!-- <h1>test sql github v2</h1> -->
            <!-- <div class="subheading mb-3 text-xs-center">Powered by Vuetify</div> -->
            <!-- <v-btn class="blue lighten-2 mt-5" dark large href="/pre-made-themes">
              Get Started
            </v-btn> -->
          </v-layout>
        </v-parallax>
      </section>
      <section>
        <v-layout column wrap class="my-6" align-center>
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h2 class="headline">The best way to learn Java online</h2>
              <!-- <span class="subheading">
                Enhance your knowledge !!!
              </span> -->
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">build</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Tecnologies</div>
                    </v-card-title>
                    <v-card-text style="text-align:justify">
                      The tecnologies that were used are  Vue.js, Vuetify, Node.js, Express.js, Axios.js, mySQL,
                      Firebase(for authentication) .
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">desktop_windows</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Game</div>
                    </v-card-title>
                    <v-card-text style="text-align:justify ">
                      The game serves a purpose of teaching a user coding in Java  and testing his language 
                      skills  through a series of lessons.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">videogame_asset</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Nile</div>
                    </v-card-title>
                    <v-card-text style="text-align:justify">
                      Nile is a Gaming laboratory that is based in educational games. 
                      The games are being developed in various platforms and programming languages 
                      and serve a purpose of educating or expanding the knowledge of a player
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section>
        <v-parallax src="static/home1.png" height="400">
          <v-layout column align-center justify-center>
            <!-- <div class="headline white--text mb-3 text-xs-center">Web development has never been easier</div>
            <em>Kick-start your application today</em> -->
            <!-- <v-btn class="blue lighten-2 mt-5" dark large href="/pre-made-themes">
              Get Started
            </v-btn> -->
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-5">
            <v-flex xs12 sm4 offset-sm1>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title >
                  <div class="headline"><h3>Contact Me :</h3></div>
                </v-card-title>
                <v-card-text style="font-size:20px;">
                  Νταντινάκης Νίκος                    
                </v-card-text>
                <v-list class="transparent">
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">phone</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>- - - - - - - - - - - -</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-spacer></v-spacer>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">place</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>T.E.I Crete </v-list-tile-title>
                      <v-list-tile-title>  Heraklion, GR</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-spacer></v-spacer>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">email</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>TP4199@edu.teicrete.gr</v-list-tile-title>
                      <v-list-tile-title>TreNikosD13@gmail.com</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
             <v-flex xs12 sm4>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title >
                  <!-- <div class="headline">Nile lab </div> -->
                </v-card-title>
                <!-- <v-card-text>
                </v-card-text> -->
                <img src="static/NileLab-logo.png" alt="Vuetify.js" height="130">
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>

    </v-content>
  <!-- </v-app> -->
  
</template>
     

<script>
  export default {
    data() {
      return {};
    }
  }
        //#edf5f5
</script>


<style>
.main{
  background-color:#e1ecf1;
  
}
#allcont{
  font-family: "Times New Roman", Times, serif;  
  font-size: 17px;
}
</style>
