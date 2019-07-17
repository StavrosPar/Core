<template>
  <v-container fluid>
    <loader v-if="loading"></loader>

    <v-container v-if="!loading">
      <v-layout row wrap>
        <v-flex xs12 v-if="sections[0]===undefined">
          <v-card class="mt-5" width="50%" style="margin:auto">
            <v-card-title class="headline">No Data Available</v-card-title>
          </v-card>
        </v-flex>

        <v-flex xs12 sm10 md5 lg4 v-for="(section, i) in sections" v-bind:key="i">
          <v-card xs12 id="contC" class="mb-3 ma-3" height="350">
            <v-container fluid>
              <v-card-title>
                <div>
                  <h3>Title : {{section.title}}</h3>
                  <p>Id: {{section.id}}</p>
                  <p style="text-align:justify">
                    Description: {{section.description}}
                    <br />
                  </p>
                </div>
              </v-card-title>
            </v-container>

            <v-container fluid style="align-items:center; display:flex; justify-content:center; ">
              <v-layout row wrap style="position:absolute; bottom:5%; ">
                <v-flex xs6>
                  <v-btn medium color="blue lighten-3" style="color:white;">View</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted: function() {
    this.$store.dispatch("getSections");
  },

  computed: {
    sections() {
      return this.$store.getters.sections;
    },
    loading() {
      return this.$store.getters.loading;
    },
    user() {
      return this.$store.getters.user;
    }
  },
  watch: {},
  methods: {
    // loadSection(parentId) {
    //   this.$store.dispatch("getLessons", parentId);
    //   this.$router.push("/section/" + parentId);
    // }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#contC {
  background-color: #e8e8e8;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

#float {
  position: fixed;
  bottom: 5%;
  right: 1%;
}
</style>
