<template>
  <div>
    <v-snackbar
      v-model="snackbar"
      multi-line="multi-line"
      right="right"
      :timeout="timeout"
      top="top"
      color="orange"
    >
      <v-icon>warning</v-icon>
      {{text}}
      <v-btn color="white" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-container fluid>
      <v-layout justify-center class="my-5">
        <v-flex xs12 sm9>
          <div style="background-color: #78909c; padding :20px;">
            <h2 style="  text-align: center; color:white;">Create New Course</h2>
          </div>
          <v-card id="newCourse">
            <v-container>
              <v-layout row wrap class="mb-4 ma-4"></v-layout>
              <h4>Which programming language you want to create a course</h4>
              <form>
                <v-text-field v-model="courseName" clearable required></v-text-field>
                <center>
                  <v-btn @click="createCourse" class="ma-2" color="#78909c" dark>
                    Create
                    <v-icon dark right>check_circle</v-icon>
                  </v-btn>
                </center>
              </form>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>




<script>
export default {
  data() {
    return {
      snackbar: false,
      text: "Please fill out the field!",
      timeout: 2000,
      courseName: ""
    };
  },
  methods: {
    createCourse() {
      if (!this.courseName.length == 0) {
        this.$store.dispatch("storeNewCourse", {
          name: this.courseName
        });
      } else {
        this.snackbar = true;
      }
    }
  }
};
</script>



<style scoped>
</style>
